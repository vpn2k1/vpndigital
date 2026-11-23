import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const products = JSON.parse(readFileSync(new URL('../content/products.json', import.meta.url)));
const routes = ['/', '/ung-dung/', '/phan-mem/', '/cong-cu/', '/game/', ...products.map(p => '/san-pham/' + p.slug + '/')];
const viewports = [{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}];
const errors = [];
let checked = 0;
mkdirSync('test-artifacts', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, colorScheme: 'light' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(viewport.name + ' JS error: ' + error.message));
    for (const route of routes) {
      try {
        const response = await page.goto('http://127.0.0.1:4173' + route, { waitUntil:'networkidle' });
        assert(response?.ok(), 'HTTP fail ' + route);
        assert.equal(await page.locator('main h1').count(), 1, 'H1 count ' + route);
        if (route !== '/' && route !== '/game/') assert(await page.getByText('SẮP RA MẮT', {exact:true}).count() > 0, 'coming soon label ' + route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        if (overflow >= 3) {
          const offenders = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).map(el => {
            const r = el.getBoundingClientRect();
            return { element: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().replaceAll(' ', '.') : ''), right: Math.round(r.right), left: Math.round(r.left), width: Math.round(r.width) };
          }).filter(x => x.right > innerWidth + 2 || x.left < -2).slice(0, 8));
          console.error('OVERFLOW DIAGNOSTIC ' + viewport.name + ' ' + route + ': ' + JSON.stringify(offenders));
        }
        assert(overflow < 3, 'horizontal overflow ' + route + ' ' + overflow + 'px');
        const broken = await page.locator('img').evaluateAll(ims => ims.filter(im => getComputedStyle(im).display !== 'none' && im.complete && im.naturalWidth === 0).map(im => im.src));
        assert.deepEqual(broken, [], 'broken images ' + route);
        if(route === '/') assert(await page.locator('.button-contact svg.ui-lucide-icon').count() > 0, 'MapPin icon SVG missing');
        const activeBrand = page.locator('.brand-lockup-header');
        assert.equal((await activeBrand.locator('.brand-lockup-name').innerText()).trim(), 'VPN Digital', 'header text branding ' + route);
        assert.equal((await activeBrand.locator('.brand-lockup-tagline').innerText()).trim(), 'Ứng dụng · Phần mềm · Công cụ', 'brand tagline ' + route);
        if (route !== '/game/') {
          const artwork = page.locator('.theme-artwork');
          assert(await artwork.count() > 0, 'missing restored artwork ' + route);
          const first = artwork.first();
          assert.equal(await first.locator('img').count(), 2, 'missing light/dark variants ' + route);
          for (const theme of ['light', 'dark']) {
            await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
            const visible = first.locator(theme === 'light' ? '.theme-artwork-light' : '.theme-artwork-dark');
            const invisible = first.locator(theme === 'light' ? '.theme-artwork-dark' : '.theme-artwork-light');
            assert(await visible.isVisible(), 'theme ' + theme + ' has no visible image ' + route);
            assert(!await invisible.isVisible(), 'theme ' + theme + ' shows both images ' + route);
            const source = await visible.getAttribute('src');
            assert(source && source.endsWith(theme === 'dark' ? '-light.webp' : '.webp'), 'incorrect swapped image filename ' + theme + ': ' + source);
            if (theme === 'light') assert(!source.endsWith('-light.webp'), 'light theme must use original dark-family WebP during A/B swap');
            await visible.evaluate(async img => await img.decode());
            assert((await visible.evaluate(img => img.naturalWidth)) > 0, 'failed to decode ' + theme + ' asset ' + route);
          }
          await page.evaluate(() => { document.documentElement.removeAttribute('data-theme'); });
        }
        checked++;
        if (['/','/ung-dung/','/phan-mem/','/cong-cu/'].includes(route)) {
          const id = route === '/' ? 'home' : route.split('/')[1];
          await page.screenshot({path:'test-artifacts/' + viewport.name + '-' + id + '-swapped-light.png', fullPage:true});
          if (route === '/') {
            await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
            await page.locator('.hero-visual .theme-artwork-dark').evaluate(async img => await img.decode());
            await page.screenshot({path:'test-artifacts/' + viewport.name + '-' + id + '-swapped-dark.png', fullPage:true});
            await page.evaluate(() => { document.documentElement.removeAttribute('data-theme'); });
          }
        }
      } catch (error) { errors.push(viewport.name + ' ' + route + ': ' + error.message); }
    }
    try {
      await page.goto('http://127.0.0.1:4173/', {waitUntil:'networkidle'});
      if(viewport.name==='mobile') {
        const menu=page.locator('.menu-toggle');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'),'true');
      }
      await page.locator('.theme-toggle').click();
      assert(['light','dark'].includes(await page.locator('html').getAttribute('data-theme')));
      const selected = await page.locator('html').getAttribute('data-theme');
      const brand = page.locator('.brand-lockup-header').first();
      const icon = brand.locator(selected === 'light' ? '.brand-icon-light' : '.brand-icon-dark');
      assert(await icon.isVisible(), 'theme-specific icon not visible');
      assert.equal((await brand.locator('.brand-lockup-name').innerText()).trim(), 'VPN Digital');
      const activeArtwork = page.locator('.hero-visual .theme-artwork').first();
      const expectedArt = activeArtwork.locator(selected === 'light' ? '.theme-artwork-light' : '.theme-artwork-dark');
      assert(await expectedArt.isVisible(), 'hero artwork did not switch with theme ' + selected);
      assert((await expectedArt.getAttribute('src')).endsWith(selected === 'dark' ? '/hero-light.webp' : '/hero.webp'), 'hero A/B swap does not match theme '+selected);
      
    } catch(error) {errors.push(viewport.name + ' theme/menu: ' + error.message)}
    await context.close();
  }
} finally { await browser.close(); }
if(errors.length) {console.error(errors.join('\n')); process.exitCode=1;}
else console.log('PASS: ' + checked + ' route-viewports, responsive overflow, images, theme/menu, 8 screenshots');

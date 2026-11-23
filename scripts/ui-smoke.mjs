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
        if (route === '/') {
          const form = page.locator('.contact-form');
          assert.equal(await form.count(), 1, 'contact form missing');
          assert.equal(await form.locator('input').count(), 3, 'expected name phone email fields');
          assert.equal(await form.locator('input[name="name"]').getAttribute('type'), 'text');
          assert.equal(await form.locator('input[name="phone"]').getAttribute('type'), 'tel');
          assert.equal(await form.locator('input[name="email"]').getAttribute('type'), 'email');
        }
        const activeBrand = page.locator('.brand-lockup-header');
        assert.equal((await activeBrand.locator('.brand-lockup-name').innerText()).trim(), 'VPN Digital', 'header text branding ' + route);
        assert.equal((await activeBrand.locator('.brand-lockup-tagline').innerText()).trim(), 'Ứng dụng · Phần mềm · Công cụ', 'brand tagline ' + route);
        if (route !== '/game/') {
          const artwork = page.locator('.theme-artwork');
          assert(await artwork.count() > 0, 'missing restored artwork ' + route);
          const first = artwork.first();
          const image = first.locator('img');
          assert.equal(await image.count(), 1, 'one shared image expected per artwork ' + route);
          const expected = await image.getAttribute('src');
          assert(expected && expected.endsWith('.webp') && !expected.endsWith('-light.webp'), 'must use previous light mode image ' + route);
          const expectedSrcSet = await image.getAttribute('srcset');
          assert(expectedSrcSet.includes('-640.webp') && !expectedSrcSet.includes('-light-640.webp'), 'responsive images are not from the same source family');
          for (const theme of ['light', 'dark']) {
            await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
            assert(await image.isVisible(), 'shared artwork hidden in ' + theme + ' theme ' + route);
            assert.equal(await image.getAttribute('src'), expected, 'image src changed with theme ' + route);
            await image.evaluate(async img => await img.decode());
            assert((await image.evaluate(img => img.naturalWidth)) > 0, 'failed to decode shared asset ' + route);
          }
          await page.evaluate(() => { document.documentElement.removeAttribute('data-theme'); });
        }
        checked++;
        if (['/','/ung-dung/','/phan-mem/','/cong-cu/'].includes(route)) {
          const id = route === '/' ? 'home' : route.split('/')[1];
          await page.screenshot({path:'test-artifacts/' + viewport.name + '-' + id + '-single-light.png', fullPage:true});
          if (route === '/') {
            await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
            await page.locator('.hero-visual .theme-artwork img').evaluate(async img => await img.decode());
            await page.screenshot({path:'test-artifacts/' + viewport.name + '-' + id + '-single-dark.png', fullPage:true});
            await page.evaluate(() => { document.documentElement.removeAttribute('data-theme'); });
          }
        }
        if (route === '/') {
          const form = page.locator('.contact-form');
          const submits = [];
          const watch = request => { if (!['GET','HEAD'].includes(request.method())) submits.push(request.method() + ' ' + request.url()); };
          page.on('request', watch);
          await form.locator('input[name="name"]').fill('Nguyễn Văn A');
          await form.locator('input[name="phone"]').fill('0912345678');
          await form.locator('input[name="email"]').fill('nguyenvana@example.com');
          await form.locator('button[type="submit"]').click();
          for (const field of ['name','phone','email']) {
            assert.equal(await form.locator('input[name="' + field + '"]').inputValue(), '', 'field not cleared: ' + field);
          }
          assert.match(await form.locator('[role="status"]').innerText(), /chưa gửi dữ liệu/i, 'missing no-send confirmation');
          assert.deepEqual(submits, [], 'form made an unexpected network submission');
          assert.equal(new URL(page.url()).pathname, '/', 'form unexpectedly navigated');
          page.off('request', watch);
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
      const moon = page.locator('.theme-toggle .theme-icon-moon');
      const sun = page.locator('.theme-toggle .theme-icon-sun');
      assert(await (selected === 'dark' ? sun : moon).isVisible(), 'theme icon is not visible ' + selected);
      assert(!await (selected === 'dark' ? moon : sun).isVisible(), 'incorrect theme icon still visible ' + selected);
      const toggleBox = await page.locator('.theme-toggle').boundingBox();
      assert(toggleBox && toggleBox.width >= 44 && toggleBox.height >= 44, 'theme button must be easy to tap');
      const heroImage = page.locator('.hero-visual .theme-artwork img');
      assert.equal(await heroImage.count(), 1, 'hero must contain exactly one image');
      assert((await heroImage.getAttribute('src')).endsWith('/hero.webp'), 'shared hero image changed after toggling the theme');
      
    } catch(error) {errors.push(viewport.name + ' theme/menu: ' + error.message)}
    await context.close();
  }
} finally { await browser.close(); }
if(errors.length) {console.error(errors.join('\n')); process.exitCode=1;}
else console.log('PASS: ' + checked + ' route-viewports, responsive overflow, images, theme/menu, 8 screenshots');

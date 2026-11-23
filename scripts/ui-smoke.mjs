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
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
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
        const broken = await page.locator('img').evaluateAll(ims => ims.filter(im => getComputedStyle(im).display !== 'none' && (!im.complete || im.naturalWidth === 0)).map(im => im.src));
        assert.deepEqual(broken, [], 'broken images ' + route);
        if(route === '/') assert(await page.locator('.button-contact svg.ui-lucide-icon').count() > 0, 'MapPin icon SVG missing');
        if (route === '/' || route === '/ung-dung/' || route === '/phan-mem/' || route === '/cong-cu/') {
          const stages = page.locator('.brand-stage');
          assert(await stages.count() > 0, 'missing logo stage ' + route);
          const logo = await stages.first().locator('.brand-stage-wordmark').evaluate(el => getComputedStyle(el).backgroundImage);
          assert(logo.includes('wordmark-light.svg') || logo.includes('wordmark-dark.svg'), 'logo not visible ' + route);
        }
        const offBrandImages = await page.locator('main img').count();
        assert.equal(offBrandImages, 0, 'non-logo raster image found on page ' + route);
        checked++;
        if (['/','/ung-dung/','/phan-mem/','/cong-cu/'].includes(route)) {
          const id = route === '/' ? 'home' : route.split('/')[1];
          await page.screenshot({path:'test-artifacts/' + viewport.name + '-' + id + '.png', fullPage:true});
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
      const currentLogo = await page.locator('.brand-stage-wordmark').first().evaluate(el => getComputedStyle(el).backgroundImage);
      assert(currentLogo.includes(selected === 'light' ? 'wordmark-light.svg' : 'wordmark-dark.svg'), 'theme-specific logo not selected');
      
    } catch(error) {errors.push(viewport.name + ' theme/menu: ' + error.message)}
    await context.close();
  }
} finally { await browser.close(); }
if(errors.length) {console.error(errors.join('\n')); process.exitCode=1;}
else console.log('PASS: ' + checked + ' route-viewports, responsive overflow, images, theme/menu, 8 screenshots');

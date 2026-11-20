import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const products = JSON.parse(readFileSync(new URL('../content/products.json', import.meta.url)));
const routes = ['/', '/game/', '/phan-mem/', '/cong-cu/', ...products.map(p => '/san-pham/' + p.slug + '/')];
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
        if (route !== '/') assert(await page.getByText('SẮP RA MẮT', {exact:true}).count() > 0, 'coming soon label ' + route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        assert(overflow < 3, 'horizontal overflow ' + route + ' ' + overflow + 'px');
        const broken = await page.locator('img').evaluateAll(ims => ims.filter(im => !im.complete || im.naturalWidth === 0).map(im => im.src));
        assert.deepEqual(broken, [], 'broken images ' + route);
        checked++;
        if (['/','/game/','/phan-mem/','/cong-cu/'].includes(route)) {
          const id = route === '/' ? 'home' : route.split('/')[1];
          await page.screenshot({path:'test-artifacts/' + viewport.name + '-' + id + '.png', fullPage:true});
        }
      } catch (error) { errors.push(viewport.name + ' ' + route + ': ' + error.message); }
    }
    try {
      await page.goto('http://127.0.0.1:4173/', {waitUntil:'networkidle'});
      if(viewport.name==='mobile') {
        const menu=page.getByRole('button',{name:'Mở menu'});
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'),'true');
      }
      await page.locator('.theme-toggle').click();
      assert(['light','dark'].includes(await page.locator('html').getAttribute('data-theme')));
    } catch(error) {errors.push(viewport.name + ' theme/menu: ' + error.message)}
    await context.close();
  }
} finally { await browser.close(); }
if(errors.length) {console.error(errors.join('\n')); process.exitCode=1;}
else console.log('PASS: ' + checked + ' route-viewports, responsive overflow, images, theme/menu, 8 screenshots');

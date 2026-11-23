import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const products = JSON.parse(readFileSync(new URL('../content/products.json', import.meta.url)));
const categories = [
  ['apps','ung-dung'], ['software','phan-mem'], ['tools','cong-cu'],
];
const routes = [
  { path:'/en/', locale:'en', kind:'home' },
  { path:'/vi/', locale:'vi', kind:'home' },
  ...categories.flatMap(([en,vi]) => [
    { path:'/en/' + en + '/', locale:'en', kind:'category' },
    { path:'/vi/' + vi + '/', locale:'vi', kind:'category' },
  ]),
  ...products.flatMap(p => [
    { path:'/en/products/' + p.slug + '/', locale:'en', kind:'product' },
    { path:'/vi/san-pham/' + p.slug + '/', locale:'vi', kind:'product' },
  ]),
];
const redirectRoutes = [
  ['/', '/en/'],
  ['/game/','/vi/ung-dung/'],
  ['/ung-dung/','/vi/ung-dung/'],
  ['/phan-mem/','/vi/phan-mem/'],
  ['/cong-cu/','/vi/cong-cu/'],
  ['/san-pham/' + products[0].slug + '/', '/vi/san-pham/' + products[0].slug + '/'],
];
const viewports = [{ name:'desktop', width:1440, height:900 }, { name:'mobile', width:390, height:844 }];
const errors = [];
let checked = 0;
mkdirSync('test-artifacts', { recursive:true });
const browser = await chromium.launch({ headless:true });
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport:{ width:viewport.width, height:viewport.height }, colorScheme:'light' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(viewport.name + ' JavaScript error: ' + error.message));

    for (const route of routes) {
      try {
        const response = await page.goto('http://127.0.0.1:4173' + route.path, { waitUntil:'networkidle' });
        assert(response?.ok(), 'HTTP failed for ' + route.path);
        assert.equal(await page.locator('main h1').count(), 1, 'exactly one H1 expected at ' + route.path);
        assert.equal(await page.locator('html').getAttribute('lang'), route.locale, 'HTML document language incorrect at ' + route.path);
        assert.equal(await page.locator('.language-switcher select').inputValue(), route.locale, 'language select incorrect at ' + route.path);
        const tagline = route.locale === 'en' ? 'Apps · Software · Tools' : 'Ứng dụng · Phần mềm · Công cụ';
        assert.equal((await page.locator('.brand-lockup-header .brand-lockup-tagline').innerText()).trim(), tagline);
        assert.equal((await page.locator('.brand-lockup-header .brand-lockup-name').innerText()).trim(), 'VPN Digital');

        if (route.kind !== 'home') {
          const status = route.locale === 'en' ? 'COMING SOON' : 'SẮP RA MẮT';
          assert(await page.getByText(status, { exact:true }).count() > 0, 'translated release status missing ' + route.path);
        }
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        if (overflow > 2) {
          const offenders = await page.evaluate(() => Array.from(document.querySelectorAll('body *'))
            .map(el => ({ el: el.tagName.toLowerCase() + (typeof el.className === 'string' ? '.' + el.className.trim().replaceAll(' ', '.') : ''), right:Math.round(el.getBoundingClientRect().right) }))
            .filter(x => x.right > innerWidth + 2).slice(0,6));
          console.error('OVERFLOW ' + viewport.name + ' ' + route.path + ': ' + JSON.stringify(offenders));
        }
        assert(overflow < 3, 'horizontal overflow ' + route.path + ': ' + overflow + 'px');

        const artwork = page.locator('.theme-artwork');
        assert(await artwork.count() > 0, 'artwork not restored ' + route.path);
        const first = artwork.first().locator('img');
        assert.equal(await first.count(), 1, 'one shared WebP per artwork ' + route.path);
        const src = await first.getAttribute('src');
        assert(src?.endsWith('.webp') && !src.endsWith('-light.webp'), 'incorrect single WebP src ' + route.path);
        const srcSet = await first.getAttribute('srcset');
        assert(srcSet?.includes('-640.webp') && !srcSet.includes('-light-640.webp'), 'responsive image is not from the shared family ' + route.path);
        for (const theme of ['light','dark']) {
          await page.evaluate(value => { document.documentElement.dataset.theme = value; },theme);
          assert(await first.isVisible(), 'artwork hidden in theme ' + theme + ' ' + route.path);
          assert.equal(await first.getAttribute('src'), src, 'illustration changed with theme ' + route.path);
          await first.evaluate(async img => await img.decode());
          assert((await first.evaluate(img => img.naturalWidth)) > 0, 'undecodable artwork at ' + route.path);
        }
        await page.evaluate(() => document.documentElement.removeAttribute('data-theme'));
        const brokenImages = await page.locator('img').evaluateAll(imgs => imgs.filter(img => getComputedStyle(img).display !== 'none' && img.complete && img.naturalWidth === 0).map(img => img.src));
        assert.deepEqual(brokenImages, [], 'broken images ' + route.path);

        if (route.kind === 'home') {
          const companyName = route.locale === 'vi'
            ? 'Công ty TNHH Một Thành Viên Công Nghệ Số Phương Nam'
            : 'PhuongNam Digital';
          assert.equal((await page.locator('.about-company-name').innerText()).trim(), companyName,
            'company identity not localized ' + route.path);
          assert.equal(await page.locator('.company-panel, .company-facts').count(), 0,
            'obsolete detailed company profile must be removed');
          assert.equal(await page.locator('.panel-spark, .ticker-separator:has-text("✳"), .visual-cross:has-text("✳")').count(), 0,
            'Claude-like decorative star must not be visible');
          assert.equal(await page.locator('.footer-bottom').getByText(/0901258364/).count(), 0,
            'registered tax ID must not appear in footer');
          const form = page.locator('.contact-form');
          assert.equal(await form.count(), 1, 'contact form missing ' + route.path);
          for (const field of ['name','phone','email']) assert.equal(await form.locator('input[name="' + field + '"]').count(), 1);
          const requests = [];
          const watch = request => { if (!['GET','HEAD'].includes(request.method())) requests.push(request.method() + ' ' + request.url()); };
          page.on('request', watch);
          // Invalid input must show localized field errors, not the success toast.
          await form.locator('button[type="submit"]').click();
          assert.equal(await form.locator('.contact-field-error').count(), 3, 'empty form requires three field errors');
          assert.equal(await page.locator('.contact-toast').count(), 0, 'toast must not appear for invalid fields');
          await form.locator('input[name="name"]').fill('Example Name');
          await form.locator('input[name="phone"]').fill('123');
          await form.locator('input[name="email"]').fill('not-an-email');
          await form.locator('button[type="submit"]').click();
          assert((await form.locator('.contact-field-error').count()) >= 2, 'invalid phone/email must be rejected');
          assert.equal(await page.locator('.contact-toast').count(), 0, 'toast must not show for invalid data');
          // Valid fields show a success-style preview toast but remain unsent.
          await form.locator('input[name="phone"]').fill('0912345678');
          await form.locator('input[name="email"]').fill('test@example.com');
          await form.locator('button[type="submit"]').click();
          const toast = page.locator('.contact-toast');
          await toast.waitFor({ state:'visible', timeout:6000 });
          const successText = await toast.innerText();
          assert.match(successText, route.locale === 'en' ? /submitted successfully/i : /gửi thông tin thành công/i);
          assert.match(successText, route.locale === 'en' ? /demo only/i : /bản demo/i, 'must disclose simulated submission');
          assert.equal(await form.locator('.contact-field-error').count(), 0, 'validation errors did not clear');
          assert.equal(await form.locator('input[name="name"]').inputValue(), 'Example Name', 'valid submit must not silently clear fields');
          assert.deepEqual(requests, [], 'preview form must never send POST/PUT or other requests');
          await toast.locator('.contact-toast-dismiss').click();
          assert.equal(await page.locator('.contact-toast').count(), 0, 'toast close action failed');
          page.off('request', watch);
          assert.equal(new URL(page.url()).pathname, route.path);
        }

        checked++;
        if (route.kind === 'home' || route.kind === 'category') {
          const id = route.path.split('/').filter(Boolean).join('-');
          await page.screenshot({ path:'test-artifacts/' + viewport.name + '-' + id + '-light.png', fullPage:true });
          if (route.kind === 'home') {
            await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
            await page.screenshot({ path:'test-artifacts/' + viewport.name + '-' + id + '-dark.png', fullPage:true });
            await page.evaluate(() => { document.documentElement.removeAttribute('data-theme'); });
          }
        }
      } catch (error) { errors.push(viewport.name + ' ' + route.path + ': ' + error.message); }
    }

    for (const [from,to] of redirectRoutes) {
      try {
        await page.goto('http://127.0.0.1:4173' + from, { waitUntil:'networkidle' });
        await page.waitForURL(url => url.pathname === to, { timeout:12000 });
        assert.equal(new URL(page.url()).pathname, to, 'legacy redirect ' + from);
      } catch (error) { errors.push(viewport.name + ' legacy ' + from + ': ' + error.message); }
    }

    const switches = [
      ['/en/', 'vi', '/vi/', /Ý tưởng mới/i],
      ['/vi/', 'en', '/en/', /Fresh ideas/i],
      ['/en/apps/', 'vi', '/vi/ung-dung/', /Ứng dụng/i],
      ['/vi/phan-mem/', 'en', '/en/software/', /Software/i],
      ['/en/products/pn-workspace/', 'vi', '/vi/san-pham/pn-workspace/', /SẮP RA MẮT/i],
      ['/vi/san-pham/sprite-kit/', 'en', '/en/products/sprite-kit/', /COMING SOON/i],
    ];
    for (const [start, targetLocale, expectedPath, expectedText] of switches) {
      try {
        await page.goto('http://127.0.0.1:4173' + start, { waitUntil:'networkidle' });
        await page.locator('.language-switcher select').selectOption(targetLocale);
        await page.waitForURL(url => url.pathname === expectedPath, { timeout:15000 });
        await page.waitForFunction(value => document.documentElement.lang === value, targetLocale, { timeout:12000 });
        assert.match(await page.locator('main').innerText(), expectedText, 'translation missing');
      } catch (error) { errors.push(viewport.name + ' language switching ' + start + ': ' + error.message); }
    }

    try {
      await page.goto('http://127.0.0.1:4173/en/', { waitUntil:'networkidle' });
      if (viewport.name === 'mobile') {
        const menu=page.locator('.menu-toggle');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true', 'mobile menu failed');
      }
      await page.locator('.theme-toggle').click();
      const selected = await page.locator('html').getAttribute('data-theme');
      assert(['light','dark'].includes(selected), 'toggle not active');
      const icon = page.locator(selected === 'dark' ? '.theme-icon-sun' : '.theme-icon-moon');
      assert(await icon.isVisible(), 'theme icon invisible');
      const box = await page.locator('.theme-toggle').boundingBox();
      assert(box && box.width >= 44 && box.height >= 44, 'theme toggle too small');
      assert.equal(await page.locator('.hero-visual .theme-artwork img').getAttribute('src'), '/images/hero.webp');
    } catch (error) { errors.push(viewport.name + ' theme/menu: ' + error.message); }

    await context.close();
  }
} finally { await browser.close(); }
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1; }
else console.log('PASS: ' + checked + ' localized route-viewports, redirects, language switching, artwork, form, theme, overflow, screenshots');

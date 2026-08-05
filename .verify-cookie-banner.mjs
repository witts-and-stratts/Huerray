import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage();
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto('http://localhost:3033/en', { waitUntil: 'networkidle', timeout: 30000 });

// Wait for the cookie consent modal to appear
await page.waitForSelector('#cc-main .cm', { timeout: 10000 });

const bodyText = await page.locator('#cc-main .cm').innerText();
console.log('--- Consent modal text ---');
console.log(bodyText);

const hasRawKey = bodyText.includes('cookie-consent.');
console.log('--- Contains raw translation key? ---', hasRawKey);

await page.screenshot({ path: '/private/tmp/claude-501/-Users-grandinc-Myanos-Codebase-Huerray-huerray-web/31363317-7c2e-49f8-95c7-4204171fee00/scratchpad/consent-modal.png' });

// Check primary button styling
const primaryBtn = page.locator('#cc-main .cm__btn--primary, #cc-main button[data-role="all"]').first();
const primaryBtnExists = await primaryBtn.count();
console.log('--- Primary button count ---', primaryBtnExists);
if (primaryBtnExists > 0) {
  const bg = await primaryBtn.evaluate((el) => getComputedStyle(el).backgroundImage || getComputedStyle(el).backgroundColor);
  const radius = await primaryBtn.evaluate((el) => getComputedStyle(el).borderRadius);
  console.log('--- Primary button background ---', bg);
  console.log('--- Primary button border-radius ---', radius);
}

// Open preferences modal
const manageBtn = page.locator('#cc-main button:has-text("Manage preferences")');
if (await manageBtn.count() > 0) {
  await manageBtn.click();
  await page.waitForSelector('#cc-main .pm', { timeout: 10000 });
  const pmText = await page.locator('#cc-main .pm').innerText();
  console.log('--- Preferences modal contains raw key? ---', pmText.includes('cookie-consent.'));
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-grandinc-Myanos-Codebase-Huerray-huerray-web/31363317-7c2e-49f8-95c7-4204171fee00/scratchpad/preferences-modal.png' });
}

console.log('--- Console errors ---', JSON.stringify(consoleErrors, null, 2));

await browser.close();

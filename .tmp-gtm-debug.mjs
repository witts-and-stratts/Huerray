import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

const gtmRequests = [];
page.on('request', (req) => {
  if (req.url().includes('googletagmanager') || req.url().includes('google-analytics') || req.url().includes('/g/collect') || req.url().includes('analytics.google')) {
    gtmRequests.push({ url: req.url(), method: req.method(), time: Date.now() });
  }
});

await page.goto('http://localhost:3033/en', { waitUntil: 'networkidle' });
console.log('--- Requests during initial load ---');
console.log(JSON.stringify(gtmRequests, null, 2));

gtmRequests.length = 0; // reset, only care about post-click requests now

await page.getByText('Accept all', { exact: true }).click();
await page.waitForTimeout(4000);

console.log('--- New GTM/GA requests since clicking Accept all ---');
console.log(JSON.stringify(gtmRequests, null, 2));

const dataLayerAfter = await page.evaluate(() => window.dataLayer);
console.log('--- dataLayer after click ---');
console.log(JSON.stringify(dataLayerAfter, null, 2));

await browser.close();

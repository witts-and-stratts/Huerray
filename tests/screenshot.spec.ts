import { test, expect } from '@playwright/test';

test('take screenshot of brands page', async ({ page }) => {
  await page.goto('http://localhost:3000/en/brands');
  await page.screenshot({ path: 'brands-page-screenshot.png', fullPage: true });
});

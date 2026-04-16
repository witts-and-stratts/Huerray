import { test, expect } from '@playwright/test';

test.describe('Website - Screenshots', () => {
  test('take screenshot of brands page', async ({ page }) => {
    await page.goto('/en/brands');
    await expect(page.locator('main, .body-content, section').first()).toBeVisible();
    await page.screenshot({ path: '.playwright-results/brands-page-screenshot.png', fullPage: true });
  });
});

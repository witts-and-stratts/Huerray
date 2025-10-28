import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check that the page has loaded
    await expect(page).toHaveTitle(/huerray/i);
  });

  test('should display the header', async ({ page }) => {
    await page.goto('/');

    // Check for header navigation
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
  });

  test('should display the hero section', async ({ page }) => {
    await page.goto('/');

    // Check for body content
    const bodyContent = page.locator('.body-content, section');
    await expect(bodyContent.first()).toBeVisible();
  });

  test('should have a footer', async ({ page }) => {
    await page.goto('/');

    // Check for footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });
});

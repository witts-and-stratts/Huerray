import { expect, test } from '@playwright/test';

const publicPages = [
  '/',
  '/brands',
  '/creators',
  '/pricing',
  '/managed-services',
  '/about',
  '/careers',
  '/privacy-policy',
  '/terms-and-conditions',
];

test.describe('Website - Public Pages', () => {
  for (const path of publicPages) {
    test(`${path} renders primary content, header, and footer`, async ({ page }) => {
      await page.goto(path);

      await expect(page.locator('header').first()).toBeVisible();
      await expect(page.locator('main, .body-content, section').first()).toBeVisible({ timeout: 15000 });
      await expect(page.locator('footer')).toBeVisible();
    });
  }

  test('primary website navigation exposes the main destinations', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header').first();
    await expect(header.getByRole('link', { name: /Brands/i }).first()).toBeVisible();
    await expect(header.getByRole('link', { name: /Creators/i }).first()).toBeVisible();
    await expect(header.getByRole('link', { name: /Pricing/i }).first()).toBeVisible();
  });
});

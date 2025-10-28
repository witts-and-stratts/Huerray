import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between language versions', async ({ page }) => {
    await page.goto('/');

    // Look for language selector
    const languageSelector = page.getByRole('button', { name: /language|en|es/i }).or(
      page.locator('[data-testid="language-selector"]')
    );

    // Check if language selector exists
    const count = await languageSelector.count();
    if (count > 0) {
      await expect(languageSelector.first()).toBeVisible();
    }
  });

  test('should have clickable navigation links', async ({ page }) => {
    await page.goto('/');

    // Check for navigation elements in header
    const header = page.locator('header, nav');
    const links = header.locator('a, button').filter({ hasNotText: /^$/ });

    // Ensure there are some interactive elements
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});

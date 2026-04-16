import { expect, test } from '@playwright/test';

test.describe('Website - Brands Page', () => {
  test('hero Get Started button navigates to brand signup', async ({ page }) => {
    await page.goto('/en/brands');

    await page.getByRole('link', { name: /Get Started/i }).first().click();

    await expect(page).toHaveURL(/\/signup\?role=brand$/);
  });

  test('bottom CTA Get started button navigates to brand signup', async ({ page }) => {
    await page.goto('/en/brands');

    const bottomCta = page.locator('section.creators-cta').getByRole('link', { name: /Get started/i });
    await bottomCta.scrollIntoViewIfNeeded();
    await bottomCta.click();

    await expect(page).toHaveURL(/\/signup\?role=brand$/);
  });
});

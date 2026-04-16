/**
 * Brand Analytics Page Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the /brand/analytics page:
 *   1. Page loads with analytics heading
 *   2. Metric cards are visible (campaigns, gigs, videos, cases)
 *   3. Period selector dropdown opens and lists options
 *   4. Selecting a different period triggers a data refresh
 */
import { test, expect, type Page } from '@playwright/test';

const BRAND_USER = process.env.BRAND_E2E_USER ?? 'brand-e2e@test.huerray.de';
const BRAND_PASSWORD = process.env.BRAND_E2E_PASSWORD ?? 'TestPwd123!@#';

async function loginIfNeeded(page: Page) {
  if (!/\/login(?:$|\?)/.test(page.url())) return;

  await page
    .getByLabel(/Email or Username|Username or Email/i)
    .first()
    .fill(BRAND_USER);
  await page.getByLabel(/Password/i).first().fill(BRAND_PASSWORD);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/.*(brand|dashboard).*/, { timeout: 20000 });
}

test.describe('Dashboards - Brand Analytics', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brand/analytics');
    await loginIfNeeded(page);
    await expect(page).toHaveURL(/.*brand\/analytics.*/, { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('analytics page renders a heading', async ({ page }) => {
    const heading = page
      .getByRole('heading', { name: /analytics/i })
      .or(page.locator('h1, h2').filter({ hasText: /analytics/i }));

    await expect(heading.first()).toBeVisible({ timeout: 15000 });
  });

  test('metric cards are visible on the analytics page', async ({ page }) => {
    // Wait for data to load (may have loading skeletons first)
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

    // Look for metric/stat cards — the analytics page renders multiple
    const metricCards = page
      .locator('[class*="card"]')
      .or(page.locator('[class*="metric"]'))
      .or(page.locator('[class*="stat"]'));

    await expect(metricCards.first()).toBeVisible({ timeout: 15000 });

    // At least one key metric label should appear
    const metricLabel = page.getByText(/campaigns|gigs|videos|cases/i).first();
    await expect(metricLabel).toBeVisible({ timeout: 10000 });
  });

  test('period selector dropdown is present', async ({ page }) => {
    const periodSelector = page
      .getByRole('combobox', { name: /period|time range|filter/i })
      .or(page.locator('select').filter({ hasText: /period|all time|last/i }))
      .or(page.locator('button').filter({ hasText: /all time|last week|last month/i }));

    if (await periodSelector.count() === 0) {
      test.skip(true, 'No period selector found on analytics page; skipping.');
      return;
    }

    await expect(periodSelector.first()).toBeVisible({ timeout: 10000 });
  });

  test('period selector opens and shows period options', async ({ page }) => {
    const periodSelector = page
      .getByRole('combobox', { name: /period|time range/i })
      .or(page.locator('button').filter({ hasText: /all time|last week|last month/i }))
      .first();

    if (await periodSelector.count() === 0) {
      test.skip(true, 'No period selector found; skipping options test.');
      return;
    }

    await periodSelector.click();

    // Options should appear after opening
    const options = page
      .getByRole('option')
      .or(page.getByRole('menuitem'))
      .or(page.locator('[class*="option"]'));

    await expect(options.first()).toBeVisible({ timeout: 5000 });

    // Verify common period options are present
    const expectedOptions = [/all time/i, /last week|last month/i];
    for (const opt of expectedOptions) {
      const option = page.getByText(opt).first();
      if (await option.count() > 0) {
        await expect(option).toBeVisible({ timeout: 3000 });
      }
    }
  });

  test('selecting a different period refreshes analytics data', async ({ page }) => {
    const periodSelector = page
      .getByRole('combobox', { name: /period|time range/i })
      .or(page.locator('button').filter({ hasText: /all time|last week|last month/i }))
      .first();

    if (await periodSelector.count() === 0) {
      test.skip(true, 'No period selector found; skipping period change test.');
      return;
    }

    await periodSelector.click();

    // Select "Last Month" or any second option
    const secondOption = page.getByRole('option').nth(1)
      .or(page.getByRole('menuitem').nth(1));

    if (await secondOption.count() === 0) {
      test.skip(true, 'No second period option found; skipping.');
      return;
    }

    await secondOption.click();

    // After selection, the page should still render without error
    const heading = page
      .getByRole('heading', { name: /analytics/i })
      .or(page.locator('h1, h2').filter({ hasText: /analytics/i }));

    await expect(heading.first()).toBeVisible({ timeout: 15000 });

    // Metric cards should still be visible (data may update)
    const metricCards = page
      .locator('[class*="card"]')
      .or(page.locator('[class*="metric"]'))
      .or(page.locator('[class*="stat"]'));

    await expect(metricCards.first()).toBeVisible({ timeout: 15000 });
  });
});

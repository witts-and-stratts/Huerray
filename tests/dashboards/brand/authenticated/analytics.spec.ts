/**
 * Brand Analytics Page Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the /brand/analytics page:
 *   1. Page loads with analytics heading
 *   2. Metric cards are visible (campaigns, gigs, videos, cases)
 *   3. Period selector trigger is present and shows the default "All time" label
 *   4. Opening the period selector shows all five period options
 *   5. Selecting a different period updates the trigger label and keeps the page stable
 */
import { test, expect, type Page } from '@playwright/test';

const BRAND_USER = process.env.BRAND_E2E_USER ?? 'brand-e2e@test.huerray.de';
const BRAND_PASSWORD = process.env.BRAND_E2E_PASSWORD ?? 'TestPwd123!@#';

const PERIOD_OPTIONS = [
  'All time',
  'Last week',
  'Last month',
  'Last 3 months',
  'Last year',
];

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

/** Returns the period selector trigger button (shows the currently selected period label). */
function periodTrigger(page: Page) {
  return page.locator('button[type="button"]').filter({ hasText: /all time|last week|last month|last 3 months|last year/i }).first();
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
    const metricCards = page
      .locator('[class*="card"]')
      .or(page.locator('[class*="metric"]'))
      .or(page.locator('[class*="stat"]'));

    await expect(metricCards.first()).toBeVisible({ timeout: 15000 });

    const metricLabel = page.getByText(/campaigns|gigs|videos|cases/i).first();
    await expect(metricLabel).toBeVisible({ timeout: 10000 });
  });

  test('period selector trigger shows the default "All time" label', async ({ page }) => {
    const trigger = periodTrigger(page);
    await expect(trigger).toBeVisible({ timeout: 10000 });
    await expect(trigger).toContainText('All time');
  });

  test('period selector opens and lists all period options', async ({ page }) => {
    const trigger = periodTrigger(page);
    await expect(trigger).toBeVisible({ timeout: 10000 });
    await trigger.click();

    // Each period is rendered as a ghost button inside the popover
    for (const label of PERIOD_OPTIONS) {
      await expect(
        page.locator('[data-slot="popover-content"]').getByRole('button', { name: label })
      ).toBeVisible({ timeout: 5000 });
    }
  });

  test('selecting "Last month" updates the trigger label', async ({ page }) => {
    const trigger = periodTrigger(page);
    await expect(trigger).toBeVisible({ timeout: 10000 });
    await trigger.click();

    // Click the "Last month" option inside the popover
    await page
      .locator('[data-slot="popover-content"]')
      .getByRole('button', { name: 'Last month' })
      .click();

    // Popover closes and trigger reflects the new selection
    await expect(trigger).toContainText('Last month', { timeout: 5000 });

    // Page remains stable — heading and metric cards still visible
    await expect(
      page.getByRole('heading', { name: /analytics/i }).or(page.locator('h1, h2').filter({ hasText: /analytics/i })).first()
    ).toBeVisible({ timeout: 10000 });

    await expect(
      page.locator('[class*="card"]').or(page.locator('[class*="metric"]')).or(page.locator('[class*="stat"]')).first()
    ).toBeVisible({ timeout: 15000 });
  });
});

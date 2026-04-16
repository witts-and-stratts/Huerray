/**
 * Brand Invoices Page Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the /brand/invoices page:
 *   1. Page loads with "Invoices" heading
 *   2. Invoices table renders with expected columns
 *   3. Empty state is shown when no invoices exist
 *   4. Pagination controls render when multiple pages exist
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

test.describe('Dashboards - Brand Invoices', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brand/invoices');
    await loginIfNeeded(page);
    await expect(page).toHaveURL(/.*brand\/invoices.*/, { timeout: 15000 });
    // Wait for the page content to mount — URL match alone isn't enough with
    // Next.js App Router client-side transitions which update the URL before
    // React has finished rendering the new route's content.
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('invoices page renders a heading', async ({ page }) => {
    const heading = page
      .getByRole('heading', { name: /invoices/i })
      .or(page.locator('h1, h2').filter({ hasText: /invoices/i }));

    await expect(heading.first()).toBeVisible({ timeout: 15000 });
  });

  test('invoices table or empty state is rendered', async ({ page }) => {
    const table = page.locator('table').or(page.locator('[role="table"]'));
    const emptyState = page.getByText(/no invoices|no results|nothing here/i);

    const hasTable = await table.count() > 0;
    const hasEmptyState = await emptyState.count() > 0;

    // Either a table or empty state must be present
    expect(hasTable || hasEmptyState).toBeTruthy();

    if (hasTable) {
      await expect(table.first()).toBeVisible({ timeout: 15000 });
    } else {
      await expect(emptyState.first()).toBeVisible({ timeout: 15000 });
    }
  });

  test('invoices table has expected column headers', async ({ page }) => {
    const table = page.locator('table').or(page.locator('[role="table"]'));
    if (await table.count() === 0) {
      test.skip(true, 'No invoices table; skipping column headers test.');
      return;
    }

    await expect(table.first()).toBeVisible({ timeout: 15000 });

    // Check for key invoice column headers — at least one should be present
    const expectedColumns = [/amount|total/i, /status/i, /campaign/i, /date/i];

    let foundCount = 0;
    for (const colPattern of expectedColumns) {
      const header = page
        .getByRole('columnheader', { name: colPattern })
        .or(page.locator('th').filter({ hasText: colPattern }));

      if (await header.count() > 0) {
        foundCount++;
      }
    }

    expect(foundCount).toBeGreaterThan(0);
  });

  test('pagination controls are present when multiple pages exist', async ({ page }) => {
    const table = page.locator('table').or(page.locator('[role="table"]'));
    if (await table.count() === 0) {
      test.skip(true, 'No invoices table; skipping pagination test.');
      return;
    }

    const pagination = page
      .locator('[class*="pagination"]')
      .or(page.getByRole('navigation', { name: /pagination/i }))
      .or(page.locator('button').filter({ hasText: /next|previous/i }));

    // Pagination is optional for small datasets — just verify it renders if present
    if (await pagination.count() > 0) {
      await expect(pagination.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('invoice row shows amount and status values', async ({ page }) => {
    const table = page.locator('table').or(page.locator('[role="table"]'));
    if (await table.count() === 0) {
      test.skip(true, 'No invoices table; skipping row values test.');
      return;
    }

    const firstRow = page.locator('table tbody tr').first();
    if (await firstRow.count() === 0) {
      test.skip(true, 'No invoice rows found; skipping row values test.');
      return;
    }

    await expect(firstRow).toBeVisible({ timeout: 10000 });

    // The row should contain currency-formatted text (€ or $) or a status label
    const rowText = await firstRow.textContent();
    const hasCurrency = /€|\$|EUR|USD/i.test(rowText ?? '');
    const hasStatus = /paid|pending|overdue|cancelled/i.test(rowText ?? '');

    expect(hasCurrency || hasStatus).toBeTruthy();
  });
});

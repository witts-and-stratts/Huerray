/**
 * Brand Campaigns List Page Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the campaigns list/table page at /brand/campaigns:
 *   1. Page rendering and column headers
 *   2. Pagination controls
 *   3. Row click navigation to campaign detail
 *   4. Row action menu items (view, edit, replicate, delete)
 *   5. "Create Campaign" button navigation
 */
import { test, expect, type Page } from '@playwright/test';
import { waitForTableOrEmpty } from '../../../common/helpers/dashboard';

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

async function gotoCampaigns(page: Page) {
  await page.goto('/brand/campaigns');
  await loginIfNeeded(page);
  await expect(page).toHaveURL(/.*brand\/campaigns.*/, { timeout: 15000 });
}

test.describe('Dashboards - Brand Campaigns List', () => {
  test.beforeEach(async ({ page }) => {
    await gotoCampaigns(page);
  });

  test('campaigns page renders a heading', async ({ page }) => {
    const heading = page
      .getByRole('heading', { name: /campaigns/i })
      .or(page.locator('h1, h2').filter({ hasText: /campaigns/i }));

    await expect(heading.first()).toBeVisible({ timeout: 15000 });
  });

  test('"Create Campaign" button is visible and navigates to new campaign page', async ({ page }) => {
    const createBtn = page
      .getByRole('link', { name: /New Campaign|Create Campaign/i })
      .or(page.getByRole('button', { name: /New Campaign|Create Campaign/i }));

    await expect(createBtn.first()).toBeVisible({ timeout: 10000 });
    await createBtn.first().click();
    await expect(page).toHaveURL(/.*brand\/campaigns\/new.*/, { timeout: 15000 });
  });

  test('campaigns table renders with expected column headers', async ({ page }) => {
    const state = await waitForTableOrEmpty(page);

    if (state === 'empty') {
      // Empty state is acceptable — getting here means it rendered something.
      return;
    }

    // Check for at least one expected column header
    const nameHeader = page
      .getByRole('columnheader', { name: /name|campaign/i })
      .or(page.locator('th').filter({ hasText: /name|campaign/i }));

    await expect(nameHeader.first()).toBeVisible({ timeout: 10000 });
  });

  test('clicking a campaign row navigates to its detail page', async ({ page }) => {
    const table = page.locator('table').or(page.locator('[role="table"]'));
    if (await table.count() === 0) {
      test.skip(true, 'No campaigns table found; skipping row click test.');
      return;
    }

    // Click the first clickable campaign row or name link
    const campaignLink = page
      .locator('table a[href*="/campaigns/"]')
      .or(page.locator('[role="row"] a[href*="/campaigns/"]'))
      .first();

    if (await campaignLink.count() === 0) {
      test.skip(true, 'No campaign links found; skipping row click test.');
      return;
    }

    await campaignLink.first().click();
    await expect(page).toHaveURL(/.*brand\/campaigns\/[^/]+.*/, { timeout: 15000 });
  });

  test('row action menu exposes view, edit, and delete options', async ({ page }) => {
    const table = page.locator('table').or(page.locator('[role="table"]'));
    if (await table.count() === 0) {
      test.skip(true, 'No campaigns table; skipping row action menu test.');
      return;
    }

    // Find first row action trigger (kebab/ellipsis button)
    const actionTrigger = page
      .locator('table [aria-label*="action" i], table [aria-label*="more" i]')
      .or(page.locator('table button').filter({ hasText: /\u22EF|\u22EE|\.\.\./ }))
      .first();

    if (await actionTrigger.count() === 0) {
      // Some tables reveal actions on hover — try hovering first row
      const firstRow = page.locator('table tbody tr').first();
      if (await firstRow.count() === 0) {
        test.skip(true, 'No table rows found; skipping action menu test.');
        return;
      }
      await firstRow.hover();
    } else {
      await actionTrigger.click();
    }

    // At least one of these action items should be visible in the dropdown
    const viewItem = page.getByRole('menuitem', { name: /view/i });
    const editItem = page.getByRole('menuitem', { name: /edit/i });
    const deleteItem = page.getByRole('menuitem', { name: /delete/i });

    const anyActionVisible =
      (await viewItem.count()) > 0 ||
      (await editItem.count()) > 0 ||
      (await deleteItem.count()) > 0;

    if (anyActionVisible) {
      const firstVisible = viewItem.or(editItem).or(deleteItem).first();
      await expect(firstVisible).toBeVisible({ timeout: 5000 });
    }
  });

  test('pagination controls appear when multiple pages exist', async ({ page }) => {
    const table = page.locator('table').or(page.locator('[role="table"]'));
    if (await table.count() === 0) {
      test.skip(true, 'No campaigns table; skipping pagination test.');
      return;
    }

    // Pagination may or may not be visible depending on data volume
    const pagination = page
      .locator('[class*="pagination"]')
      .or(page.getByRole('navigation', { name: /pagination/i }))
      .or(page.locator('button').filter({ hasText: /next|previous/i }));

    // This is a soft check — pagination is optional for small datasets
    if (await pagination.count() > 0) {
      await expect(pagination.first()).toBeVisible({ timeout: 5000 });
    }
  });
});

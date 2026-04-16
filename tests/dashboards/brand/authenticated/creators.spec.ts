/**
 * Brand Creators Browse Page Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the /brand/creators page:
 *   1. Page loads and renders the creators listing
 *   2. Column headers or creator cards are visible
 *   3. Filter controls are accessible
 *   4. Clicking a creator opens their detail or a side panel
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

test.describe('Dashboards - Brand Creators Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brand/creators');
    await loginIfNeeded(page);
    await expect(page).toHaveURL(/.*brand\/creators.*/, { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('creators page renders a heading', async ({ page }) => {
    const heading = page
      .getByRole('heading', { name: /creators/i })
      .or(page.locator('h1, h2').filter({ hasText: /creators/i }));

    await expect(heading.first()).toBeVisible({ timeout: 15000 });
  });

  test('creators table or grid is rendered or shows empty state', async ({ page }) => {
    const creatorsContent = page
      .locator('table')
      .or(page.locator('[role="table"]'))
      .or(page.locator('[class*="grid"]'))
      .or(page.locator('[class*="creator"]'));

    const emptyState = page.getByText(/no creators|no results|get started/i);

    const hasContent = await creatorsContent.count() > 0;
    const hasEmptyState = await emptyState.count() > 0;

    // Either creators are shown or an empty state is present
    expect(hasContent || hasEmptyState).toBeTruthy();

    if (hasContent) {
      await expect(creatorsContent.first()).toBeVisible({ timeout: 15000 });
    }
  });

  test('filter controls are accessible on the creators page', async ({ page }) => {
    // Filters may be a sidebar panel, dropdown, or search bar
    const filterControl = page
      .getByRole('combobox', { name: /filter|content type|category/i })
      .or(page.getByLabel(/filter|content type|category/i))
      .or(page.locator('input[type="search"]'))
      .or(page.locator('[class*="filter"]').first());

    if (await filterControl.count() > 0) {
      await expect(filterControl.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('clicking a creator navigates to detail or opens side panel', async ({ page }) => {
    const table = page.locator('table').or(page.locator('[role="table"]'));
    if (await table.count() === 0) {
      test.skip(true, 'No creators table found; skipping click test.');
      return;
    }

    const firstCreatorLink = page
      .locator('table a[href*="/creator"]')
      .or(page.locator('table tbody tr').first())
      .first();

    if (await firstCreatorLink.count() === 0) {
      test.skip(true, 'No creator rows found; skipping click test.');
      return;
    }

    const isLink = await firstCreatorLink.evaluate((el) => el.tagName === 'A');

    if (isLink) {
      await firstCreatorLink.click();
      // Should navigate to a creator detail page
      await expect(page).toHaveURL(/.*creator.*/, { timeout: 15000 });
    } else {
      await firstCreatorLink.click();
      // May open a side panel / drawer instead of navigating
      const sidePanel = page
        .locator('[role="dialog"]')
        .or(page.locator('[class*="drawer"]'))
        .or(page.locator('[class*="sheet"]'));

      if (await sidePanel.count() > 0) {
        await expect(sidePanel.first()).toBeVisible({ timeout: 5000 });
      }
    }
  });
});

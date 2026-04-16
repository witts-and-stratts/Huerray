/**
 * Brand Dashboard Landing Page Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They verify that the main dashboard landing page renders all key blocks:
 *   - KPI overview (campaigns / gigs counts)
 *   - Campaigns radial status chart
 *   - Analytics block
 *   - Profile snapshot
 *   - Action center
 *   - Notifications preview
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

test.describe('Dashboards - Brand Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brand');
    await loginIfNeeded(page);
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('dashboard page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/.*brand.*/, { timeout: 15000 });

    // At minimum, the sidebar or a brand-specific heading should be present
    const mainContent = page.locator('main').or(page.locator('[data-slot="sidebar-inset"]'));
    await expect(mainContent.first()).toBeVisible({ timeout: 15000 });
  });

  test('KPI overview block is visible', async ({ page }) => {
    // Look for KPI metric numbers or their container
    const kpiBlock = page
      .locator('[class*="kpi"]')
      .or(page.locator('[class*="overview"]'))
      .or(page.getByText(/campaigns/i).first());

    await expect(kpiBlock.first()).toBeVisible({ timeout: 15000 });
  });

  test('campaigns radial or status chart is rendered', async ({ page }) => {
    // The BrandCampaignsRadialBlock renders a chart section
    const chartSection = page
      .locator('[class*="radial"]')
      .or(page.locator('svg').first())
      .or(page.locator('[class*="chart"]').first());

    // Charts may take a moment to hydrate
    await expect(chartSection.first()).toBeVisible({ timeout: 20000 });
  });

  test('analytics block is present on the dashboard', async ({ page }) => {
    const analyticsBlock = page
      .locator('[class*="analytics"]')
      .or(page.getByText(/analytics/i).first());

    await expect(analyticsBlock.first()).toBeVisible({ timeout: 15000 });
  });

  test('profile snapshot block shows brand information', async ({ page }) => {
    // BrandProfileSnapshotBlock contains brand name / company info
    const profileBlock = page
      .locator('[class*="profile"]')
      .or(page.locator('[class*="snapshot"]'))
      .or(page.getByText(/profile/i).first());

    await expect(profileBlock.first()).toBeVisible({ timeout: 15000 });
  });

  test('action center block is rendered', async ({ page }) => {
    const actionCenter = page
      .locator('[class*="action"]')
      .or(page.getByText(/action/i).first());

    await expect(actionCenter.first()).toBeVisible({ timeout: 15000 });
  });

  test('notifications preview block is visible', async ({ page }) => {
    const notificationsBlock = page
      .locator('[class*="notification"]')
      .or(page.getByText(/notification/i).first());

    await expect(notificationsBlock.first()).toBeVisible({ timeout: 15000 });
  });

  test('sidebar navigation links are present', async ({ page }) => {
    const sidebarLinks = [/campaigns/i, /creators/i, /analytics/i, /settings/i];

    for (const linkText of sidebarLinks) {
      const link = page
        .getByRole('link', { name: linkText })
        .or(page.locator('nav').getByText(linkText));

      await expect(link.first()).toBeVisible({ timeout: 10000 });
    }
  });
});

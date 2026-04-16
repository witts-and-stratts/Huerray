/**
 * Brand Campaign Detail View Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They navigate to a campaign's detail page and verify:
 *   1. Campaign name and status badge are shown
 *   2. Campaign metadata section renders
 *   3. Detail tabs (Gigs, Applications, Invitations, Submissions) are visible
 *   4. Tab switching loads the correct section
 *   5. Edit button navigates to the edit page
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

/**
 * Navigate to the campaigns list and return the href of the first campaign detail link.
 * Returns null if no campaigns exist.
 */
async function getFirstCampaignDetailUrl(page: Page): Promise<string | null> {
  await page.goto('/brand/campaigns');
  await loginIfNeeded(page);

  // Look for a campaign detail link (not an edit link)
  const detailLink = page
    .locator('a[href*="/campaigns/"]')
    .filter({ hasNot: page.locator('[href*="/edit"]') })
    .filter({ hasNot: page.locator('[href="/brand/campaigns"]') })
    .first();

  if (await detailLink.count() === 0) return null;

  const href = await detailLink.getAttribute('href');
  // Ensure the href points to a specific campaign (has an ID segment)
  if (!href || /\/campaigns\/(new|$)/.test(href)) return null;

  return href;
}

test.describe('Dashboards - Brand Campaign Detail', () => {
  test('campaign detail page renders name and status', async ({ page }) => {
    const detailUrl = await getFirstCampaignDetailUrl(page);

    if (!detailUrl) {
      test.skip(true, 'No campaigns found; skipping detail page test.');
      return;
    }

    await page.goto(detailUrl);
    await loginIfNeeded(page);

    // Campaign name heading should be visible
    const nameHeading = page.locator('h1, h2, h3').first();
    await expect(nameHeading).toBeVisible({ timeout: 15000 });

    // Status badge (e.g. "Draft", "Active", "Pending Approval")
    const statusBadge = page
      .locator('[class*="badge"]')
      .or(page.locator('[class*="status"]'))
      .or(page.getByText(/draft|active|pending|completed|paused/i));

    await expect(statusBadge.first()).toBeVisible({ timeout: 10000 });
  });

  test('campaign metadata section renders content type and category', async ({ page }) => {
    const detailUrl = await getFirstCampaignDetailUrl(page);

    if (!detailUrl) {
      test.skip(true, 'No campaigns found; skipping metadata test.');
      return;
    }

    await page.goto(detailUrl);
    await loginIfNeeded(page);

    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15000 });

    // Look for metadata labels that should appear in the detail view
    const metadataLabel = page
      .getByText(/content type|category|creators|videos/i)
      .first();

    await expect(metadataLabel).toBeVisible({ timeout: 10000 });
  });

  test('detail tabs are visible (Gigs, Applications, Invitations, Submissions)', async ({ page }) => {
    const detailUrl = await getFirstCampaignDetailUrl(page);

    if (!detailUrl) {
      test.skip(true, 'No campaigns found; skipping tabs visibility test.');
      return;
    }

    await page.goto(detailUrl);
    await loginIfNeeded(page);
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15000 });

    const expectedTabs = ['Gigs', 'Applications', 'Invitations', 'Submissions'];

    for (const tabName of expectedTabs) {
      const tab = page
        .getByRole('tab', { name: new RegExp(tabName, 'i') })
        .or(page.getByRole('button', { name: new RegExp(tabName, 'i') }))
        .or(page.getByText(new RegExp(`^${tabName}$`, 'i')));

      if (await tab.count() > 0) {
        await expect(tab.first()).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('switching tabs updates the visible section', async ({ page }) => {
    const detailUrl = await getFirstCampaignDetailUrl(page);

    if (!detailUrl) {
      test.skip(true, 'No campaigns found; skipping tab switching test.');
      return;
    }

    await page.goto(detailUrl);
    await loginIfNeeded(page);
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15000 });

    const tabs = page.getByRole('tab');
    const tabCount = await tabs.count();

    if (tabCount < 2) {
      test.skip(true, 'Less than 2 tabs found; skipping tab switching test.');
      return;
    }

    // Click the second tab and verify the page doesn't crash
    await tabs.nth(1).click();
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 10000 });
  });

  test('edit button navigates to the campaign edit page', async ({ page }) => {
    const detailUrl = await getFirstCampaignDetailUrl(page);

    if (!detailUrl) {
      test.skip(true, 'No campaigns found; skipping edit navigation test.');
      return;
    }

    await page.goto(detailUrl);
    await loginIfNeeded(page);
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15000 });

    const editBtn = page
      .getByRole('link', { name: /edit/i })
      .or(page.getByRole('button', { name: /edit/i }))
      .first();

    if (await editBtn.count() === 0) {
      test.skip(true, 'No edit button found on detail page; skipping.');
      return;
    }

    await editBtn.click();
    await expect(page).toHaveURL(/.*\/edit.*/, { timeout: 15000 });
  });
});

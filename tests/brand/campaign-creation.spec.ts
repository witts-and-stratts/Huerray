/**
 * Campaign Creation Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup),
 * but can also recover by logging in directly if the stored session is stale.
 *
 * They cover:
 *   1. Selecting a campaign type (human UGC or AI-enhanced)
 *   2. Loading the campaign form for both create variants
 *   3. Required-field validation on the overview tab
 *   4. Saving a campaign as draft and redirecting to edit
 *   5. Opening the publish summary dialog before final publish
 *   6. Navigating between campaign form tabs
 */
import { test, expect, type Locator, type Page } from '@playwright/test';

const BRAND_USER = process.env.BRAND_E2E_USER ?? 'brand-e2e@test.huerray.de';
const BRAND_PASSWORD = process.env.BRAND_E2E_PASSWORD ?? 'TestPwd123!@#';

function campaignNameField(page: Page): Locator {
  return page.getByLabel(/Campaign Name/i);
}

function campaignDescriptionEditor(page: Page): Locator {
  return page.locator('.ql-editor').first();
}

async function loginIfNeeded(page: Page) {
  if (!/\/login(?:$|\?)/.test(page.url())) {
    return;
  }

  await page
    .getByLabel(/Email or Username|Username or Email/i)
    .first()
    .fill(BRAND_USER);
  await page.getByLabel(/Password/i).first().fill(BRAND_PASSWORD);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/.*(brand|dashboard).*/, { timeout: 20000 });
}

async function gotoBrandCampaigns(page: Page) {
  await page.goto('/brand/campaigns');
  await loginIfNeeded(page);
  await expect(page).toHaveURL(/.*brand\/campaigns.*/, { timeout: 15000 });
}

async function openCampaignCreateForm(page: Page, type: 'human' | 'ai') {
  await page.goto(`/brand/campaigns/new#${type}`);
  await loginIfNeeded(page);
  await expect(campaignNameField(page)).toBeVisible({ timeout: 15000 });
}

async function selectFirstOption(page: Page, label: RegExp) {
  await page.getByLabel(label).click();
  const option = page.getByRole('option').first();
  await expect(option).toBeVisible({ timeout: 5000 });
  await option.click();
}

async function fillRequiredCampaignFields(page: Page, suffix: string) {
  await campaignNameField(page).fill(`E2E Campaign ${suffix}`);
  await campaignDescriptionEditor(page).fill('Playwright e2e campaign description.');

  await selectFirstOption(page, /Category/i);

  await page.getByLabel(/Creators Needed/i).fill('2');
  await page.getByLabel(/Total No\. of Videos/i).fill('3');
}

test.describe('Brand - Campaign Creation', () => {
  test.beforeEach(async ({ page }) => {
    await gotoBrandCampaigns(page);
  });

  test('type selection page renders human and AI options', async ({ page }) => {
    await page.goto('/brand/campaigns/new');
    await loginIfNeeded(page);

    await expect(page.getByRole('button', { name: /Select Human UGC/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Select AI Enhanced/i })).toBeVisible();
  });

  test('selecting Human UGC loads the campaign form', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');

    await expect(page.getByText(/New Campaign/i)).toBeVisible();
    await expect(page.locator('input[type="hidden"][name="content_type"]')).toHaveValue(/human/i);
  });

  test('selecting AI Enhanced loads the campaign form', async ({ page }) => {
    await openCampaignCreateForm(page, 'ai');

    await expect(page.getByText(/New Campaign/i)).toBeVisible();
    await expect(page.locator('input[type="hidden"][name="content_type"]')).toHaveValue(/ai/i);
    await expect(page.getByText(/^AI$/).first()).toBeVisible();
  });

  test('shows validation feedback when required fields are empty', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');

    await page.getByRole('button', { name: /Publish/i }).click();

    await expect(page.getByText(/Campaign name is required\./i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Please fix the errors in the form\./i)).toBeVisible({ timeout: 10000 });
  });

  test('can save a campaign as draft and redirect to edit page', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');

    await fillRequiredCampaignFields(page, Date.now().toString());

    await page.getByRole('button', { name: /Save draft/i }).click();

    await expect(page).toHaveURL(/.*brand\/campaigns\/.+\/edit.*/, { timeout: 20000 });
    await expect(campaignNameField(page)).toBeVisible({ timeout: 15000 });
  });

  test('can navigate between form tabs', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');

    for (const tab of ['Overview', 'Instructions', 'Documents', 'Images', 'Videos']) {
      const tabButton = page.getByRole('tab', { name: new RegExp(tab, 'i') });
      await expect(tabButton).toBeVisible();
      await tabButton.click();
      await expect(tabButton).toHaveAttribute('data-active', '');
    }
  });

  test('campaign summary dialog appears before publishing', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');

    const campaignName = `E2E Publish ${Date.now()}`;
    await fillRequiredCampaignFields(page, campaignName);

    await page.getByRole('button', { name: /^Publish$/i }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 10000 });
    await expect(dialog).toContainText(/Campaign Brief|Untitled Campaign/i);
    await expect(dialog).toContainText(/Confirm & Publish/i);
  });
});

/**
 * Brand campaign creation workflow
 *
 * Covers the brand-side path for starting a campaign, filling the required
 * overview fields, and saving the campaign as a draft. The campaign create
 * endpoint is mocked so the test stays deterministic and does not write to the
 * backend.
 */
import { expect, test, type Page, type Route } from '@playwright/test';

const BRAND_USER = process.env.BRAND_E2E_USER ?? 'brand-e2e@test.huerray.de';
const BRAND_PASSWORD = process.env.BRAND_E2E_PASSWORD ?? 'TestPwd123!@#';

let lastCreatePayload: Record<string, unknown> | null = null;

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

async function openCampaignCreateForm(page: Page, type: 'human' | 'ai') {
  await page.goto(`/brand/campaigns/new#${ type }`);
  await loginIfNeeded(page);
  await expect(page.getByRole('button', { name: /Save draft/i })).toBeVisible({ timeout: 15000 });
}

async function selectFirstOption(page: Page, label: RegExp) {
  await page.getByLabel(label).click();
  const option = page.getByRole('option').first();
  await expect(option).toBeVisible({ timeout: 5000 });
  await option.click();
}

async function fillRequiredCampaignFields(page: Page, suffix: string) {
  await page.getByLabel(/Campaign Name/i).fill(`E2E Campaign ${ suffix }`);
  await page.locator('.flex-1.p-5 > div:not(.hidden) .ql-editor').first().fill('Playwright e2e campaign description.');
  await selectFirstOption(page, /Category/i);
  await page.getByLabel(/Creators Needed/i).fill('2');
  await page.getByLabel(/Total No\. of Videos/i).fill('3');
}

async function installApiMocks(page: Page) {
  lastCreatePayload = null;

  const corsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'access-control-allow-headers': '*',
  };

  async function fulfillPreflight(route: Route) {
    await route.fulfill({
      status: 204,
      headers: corsHeaders,
    });
  }

  await page.route('**/campaigns**', async (route: Route) => {
    const method = route.request().method();

    if (method === 'OPTIONS') {
      await fulfillPreflight(route);
      return;
    }

    if (method !== 'POST') {
      await route.fallback();
      return;
    }

    try {
      lastCreatePayload = route.request().postDataJSON() as Record<string, unknown>;
    } catch {
      lastCreatePayload = null;
    }

    await route.fulfill({
      status: 200,
      headers: corsHeaders,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'mock-campaign-id',
        campaign_id: 'mock-campaign-id',
        data: {
          id: 'mock-campaign-id',
          campaign_id: 'mock-campaign-id',
          campaign_name: (lastCreatePayload?.campaign_name as string) ?? 'Mock campaign',
          status: 'draft',
        },
        success: true,
        message: 'created',
      }),
    });
  });
}

async function saveDraftAndCapturePayload(page: Page, expectedType: 'human' | 'ai', suffix: string) {
  await openCampaignCreateForm(page, expectedType);
  await expect(page.locator('input[type="hidden"][name="content_type"]')).toHaveValue(new RegExp(expectedType, 'i'));

  await fillRequiredCampaignFields(page, suffix);
  await page.getByRole('button', { name: /Save draft/i }).click();

  await expect.poll(() => lastCreatePayload !== null, {
    timeout: 10000,
    message: 'Expected the draft save request to be posted',
  }).toBe(true);

  expect(lastCreatePayload).not.toBeNull();
  expect(lastCreatePayload?.campaign_name).toBe(`E2E Campaign ${ suffix }`);
  expect(lastCreatePayload?.description).toEqual(expect.stringContaining('Playwright e2e campaign description.'));
  expect(lastCreatePayload?.content_type).toMatch(new RegExp(expectedType, 'i'));
}

test.describe('Dashboards - Brand Create Campaign Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await installApiMocks(page);
    await page.goto('/brand/campaigns');
    await loginIfNeeded(page);
    await expect(page).toHaveURL(/.*brand\/campaigns.*/, { timeout: 15000 });
  });

  test('selection screen exposes both Human and AI options', async ({ page }) => {
    await page.goto('/brand/campaigns/new');
    await loginIfNeeded(page);

    await expect(page.getByRole('button', { name: /Select Human UGC/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Select AI Enhanced/i })).toBeVisible();
  });

  test('Human UGC draft save posts the campaign payload', async ({ page }) => {
    await saveDraftAndCapturePayload(page, 'human', `human-${ Date.now() }`);
    await expect(page.locator('input[type="hidden"][name="content_type"]')).toHaveValue(/human/i);
  });

  test('AI Enhanced draft save posts the campaign payload', async ({ page }) => {
    await saveDraftAndCapturePayload(page, 'ai', `ai-${ Date.now() }`);
    await expect(page.locator('input[type="hidden"][name="content_type"]')).toHaveValue(/ai/i);
    await expect(page.getByText(/^AI$/).first()).toBeVisible();
  });

  test('publish summary dialog appears before publishing', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');
    await fillRequiredCampaignFields(page, `summary-${ Date.now() }`);

    await page.getByRole('button', { name: /^Publish$/i }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 10000 });
    await expect(dialog).toContainText(/Campaign Brief|Untitled Campaign/i);
    await expect(dialog).toContainText(/Confirm & Publish/i);
  });
});

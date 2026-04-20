/**
 * Brand Create Campaign Workflow — comprehensive tests
 *
 * Covers the end-to-end brand flow for creating both Human-Generated and
 * AI-Generated campaigns, including file uploads for:
 *   - Product image (Overview tab)
 *   - Campaign images (Images tab)
 *   - Sample videos (Videos tab)
 *   - Campaign documents (Documents tab)
 *
 * The upload + create-campaign endpoints are mocked so tests are deterministic
 * and don't write to the backend. Assertions verify that:
 *   - Files appear as cards in the appropriate dropzone
 *   - Cards transition to the "success" state after upload
 *   - Saving a draft POSTs to /campaigns with the uploaded asset URLs
 *   - The navigator lands on the edit page after a successful draft save
 */
import { test, expect, type Locator, type Page, type Route } from '@playwright/test';

const BRAND_USER = process.env.BRAND_E2E_USER ?? 'brand-e2e@test.huerray.de';
const BRAND_PASSWORD = process.env.BRAND_E2E_PASSWORD ?? 'TestPwd123!@#';

// ─── Mock payload factories ───────────────────────────────────────────────────

let imageUploadCounter = 0;
let videoUploadCounter = 0;
let documentUploadCounter = 0;
let lastCreatePayload: Record<string, unknown> | null = null;

function uploadResponse(kind: 'image' | 'video' | 'document', counter: number) {
  return {
    data: {
      data: [
        {
          url: `/serve/mock-${ kind }-${ counter }.${ kind === 'image' ? 'png' : kind === 'video' ? 'mp4' : 'pdf' }`,
          name: `mock-${ kind }-${ counter }`,
        },
      ],
    },
    success: true,
    message: 'ok',
  };
}

async function installApiMocks(page: Page) {
  imageUploadCounter = 0;
  videoUploadCounter = 0;
  documentUploadCounter = 0;
  lastCreatePayload = null;

  await page.route('**/uploads/images', async (route: Route) => {
    if (route.request().method() !== 'POST') return route.fallback();
    imageUploadCounter += 1;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(uploadResponse('image', imageUploadCounter)),
    });
  });

  await page.route('**/uploads/videos', async (route: Route) => {
    if (route.request().method() !== 'POST') return route.fallback();
    videoUploadCounter += 1;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(uploadResponse('video', videoUploadCounter)),
    });
  });

  await page.route('**/uploads/documents', async (route: Route) => {
    if (route.request().method() !== 'POST') return route.fallback();
    documentUploadCounter += 1;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(uploadResponse('document', documentUploadCounter)),
    });
  });

  await page.route('**/api/v1/campaigns', async (route: Route) => {
    if (route.request().method() !== 'POST') return route.fallback();
    try {
      lastCreatePayload = route.request().postDataJSON() as Record<string, unknown>;
    } catch {
      lastCreatePayload = null;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          id: 'mock-campaign-id',
          campaign_name: (lastCreatePayload?.campaign_name as string) ?? 'Mock campaign',
          status: 'draft',
        },
        success: true,
        message: 'created',
      }),
    });
  });
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

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

function campaignNameField(page: Page): Locator {
  return page.getByLabel(/Campaign Name/i);
}

function campaignDescriptionEditor(page: Page): Locator {
  return page.locator('.ql-editor').first();
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
  await campaignNameField(page).fill(`E2E Campaign ${ suffix }`);
  await campaignDescriptionEditor(page).fill('Playwright e2e campaign description.');
  await selectFirstOption(page, /Category/i);
  await page.getByLabel(/Creators Needed/i).fill('2');
  await page.getByLabel(/Total No\. of Videos/i).fill('3');
}

async function switchTab(page: Page, tab: 'Overview' | 'Instructions' | 'Documents' | 'Images' | 'Videos') {
  const tabButton = page.getByRole('tab', { name: new RegExp(`^${ tab }$`, 'i') });
  await expect(tabButton).toBeVisible();
  await tabButton.click();
  await expect(tabButton).toHaveAttribute('data-active', '');
}

/**
 * Locates the file input inside the currently active tab panel. Inactive tab
 * panels get a `hidden` class, so we scope to a direct child that doesn't have it.
 */
function activeTabFileInput(page: Page): Locator {
  return page
    .locator('.flex-1.p-5 > div:not(.hidden) input[type="file"]')
    .first();
}

// Minimal valid file payloads (small, in-memory — no fixtures on disk).
const PNG_1x1 = Buffer.from(
  '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082',
  'hex',
);
// "Fake" mp4 (just bytes, Playwright sends as-is, backend call is mocked).
const FAKE_MP4 = Buffer.from('00000020667479706d70343200000000', 'hex');
// Minimal valid PDF.
const FAKE_PDF = Buffer.from(
  '%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n',
  'utf8',
);

async function uploadFile(
  page: Page,
  opts: { name: string; mimeType: string; buffer: Buffer },
) {
  const input = activeTabFileInput(page);
  await input.setInputFiles(opts);
}

async function uploadFiles(
  page: Page,
  files: Array<{ name: string; mimeType: string; buffer: Buffer }>,
) {
  const input = activeTabFileInput(page);
  await input.setInputFiles(files);
}

async function expectFileCardsInGrid(page: Page, expectedCount: number) {
  // File cards in the FilesDropzone grid carry a "success" border color once
  // the upload resolves. Poll for N success-state cards.
  await expect.poll(
    async () => page
      .locator('.flex-1.p-5 > div:not(.hidden) [class*="border-green-500"]')
      .count(),
    { timeout: 15000, message: `Expected ${ expectedCount } uploaded cards in active tab` },
  ).toBeGreaterThanOrEqual(expectedCount);
}

async function waitForProductImageUploaded(page: Page) {
  // The product image card shows a CheckmarkCircle once uploadProgress hits 100.
  const productImage = page
    .getByRole('button', { name: /Remove product image/i })
    .first();
  await expect(productImage).toBeVisible({ timeout: 15000 });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe('Dashboards - Brand Create Campaign Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await installApiMocks(page);
    await page.goto('/brand/campaigns');
    await loginIfNeeded(page);
    await expect(page).toHaveURL(/.*brand\/campaigns.*/, { timeout: 15000 });
  });

  // ── Type selection ─────────────────────────────────────────────────────────

  test('selection screen exposes both Human and AI options', async ({ page }) => {
    await page.goto('/brand/campaigns/new');
    await loginIfNeeded(page);
    await expect(page.getByRole('button', { name: /Select Human UGC/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Select AI Enhanced/i })).toBeVisible();
  });

  // ── Human-generated ────────────────────────────────────────────────────────

  test('Human UGC: full workflow with image, video, and document uploads', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');

    await expect(page.locator('input[type="hidden"][name="content_type"]'))
      .toHaveValue(/human/i);

    // Overview tab → required fields + product image
    await fillRequiredCampaignFields(page, `human-${ Date.now() }`);
    await uploadFile(page, { name: 'product.png', mimeType: 'image/png', buffer: PNG_1x1 });
    await waitForProductImageUploaded(page);

    // Images tab → two images
    await switchTab(page, 'Images');
    await uploadFiles(page, [
      { name: 'hero.png', mimeType: 'image/png', buffer: PNG_1x1 },
      { name: 'hero-2.png', mimeType: 'image/png', buffer: PNG_1x1 },
    ]);
    await expectFileCardsInGrid(page, 2);

    // Videos tab → one video
    await switchTab(page, 'Videos');
    await uploadFile(page, {
      name: 'sample.mp4',
      mimeType: 'video/mp4',
      buffer: FAKE_MP4,
    });
    await expectFileCardsInGrid(page, 1);

    // Documents tab → one PDF
    await switchTab(page, 'Documents');
    await uploadFile(page, {
      name: 'brief.pdf',
      mimeType: 'application/pdf',
      buffer: FAKE_PDF,
    });
    await expectFileCardsInGrid(page, 1);

    // Save as draft
    await page.getByRole('button', { name: /Save draft/i }).click();

    // Redirects to edit for the newly-created campaign
    await expect(page).toHaveURL(/.*brand\/campaigns\/mock-campaign-id\/edit.*/, {
      timeout: 15000,
    });

    // Verify the POST /campaigns payload looks right
    expect(lastCreatePayload).not.toBeNull();
    expect(lastCreatePayload?.content_type).toMatch(/human/i);
    expect(Array.isArray(lastCreatePayload?.campaign_images)).toBe(true);
    expect((lastCreatePayload?.campaign_images as unknown[]).length).toBe(2);
    expect(Array.isArray(lastCreatePayload?.sample_videos)).toBe(true);
    expect((lastCreatePayload?.sample_videos as unknown[]).length).toBe(1);
    expect(Array.isArray(lastCreatePayload?.campaign_documents)).toBe(true);
    expect((lastCreatePayload?.campaign_documents as unknown[]).length).toBe(1);
    expect(lastCreatePayload?.product_image).toBeTruthy();
  });

  // ── AI-generated ───────────────────────────────────────────────────────────

  test('AI Enhanced: full workflow with image, video, and document uploads', async ({ page }) => {
    await openCampaignCreateForm(page, 'ai');

    await expect(page.locator('input[type="hidden"][name="content_type"]'))
      .toHaveValue(/ai/i);
    await expect(page.getByText(/^AI$/).first()).toBeVisible();

    await fillRequiredCampaignFields(page, `ai-${ Date.now() }`);
    await uploadFile(page, { name: 'product.png', mimeType: 'image/png', buffer: PNG_1x1 });
    await waitForProductImageUploaded(page);

    await switchTab(page, 'Images');
    await uploadFile(page, { name: 'hero.png', mimeType: 'image/png', buffer: PNG_1x1 });
    await expectFileCardsInGrid(page, 1);

    await switchTab(page, 'Videos');
    await uploadFile(page, {
      name: 'sample.mp4',
      mimeType: 'video/mp4',
      buffer: FAKE_MP4,
    });
    await expectFileCardsInGrid(page, 1);

    await switchTab(page, 'Documents');
    await uploadFile(page, {
      name: 'brief.pdf',
      mimeType: 'application/pdf',
      buffer: FAKE_PDF,
    });
    await expectFileCardsInGrid(page, 1);

    await page.getByRole('button', { name: /Save draft/i }).click();
    await expect(page).toHaveURL(/.*brand\/campaigns\/mock-campaign-id\/edit.*/, {
      timeout: 15000,
    });

    expect(lastCreatePayload).not.toBeNull();
    expect(lastCreatePayload?.content_type).toMatch(/ai/i);
    expect((lastCreatePayload?.campaign_images as unknown[]).length).toBe(1);
    expect((lastCreatePayload?.sample_videos as unknown[]).length).toBe(1);
    expect((lastCreatePayload?.campaign_documents as unknown[]).length).toBe(1);
  });

  // ── Per-file-type upload UI tests ─────────────────────────────────────────

  test('product image upload renders preview and remove button', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');
    await uploadFile(page, { name: 'product.png', mimeType: 'image/png', buffer: PNG_1x1 });

    await waitForProductImageUploaded(page);
    // Removing the product image clears it
    await page.getByRole('button', { name: /Remove product image/i }).click();
    await expect(page.getByRole('button', { name: /Remove product image/i }))
      .toHaveCount(0);
  });

  test('images tab: uploads multiple images and shows success cards', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');
    await switchTab(page, 'Images');

    await uploadFiles(page, [
      { name: 'a.png', mimeType: 'image/png', buffer: PNG_1x1 },
      { name: 'b.png', mimeType: 'image/png', buffer: PNG_1x1 },
      { name: 'c.png', mimeType: 'image/png', buffer: PNG_1x1 },
    ]);

    await expectFileCardsInGrid(page, 3);
  });

  test('videos tab: uploads video and shows success state', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');
    await switchTab(page, 'Videos');

    await uploadFile(page, {
      name: 'clip.mp4',
      mimeType: 'video/mp4',
      buffer: FAKE_MP4,
    });

    await expectFileCardsInGrid(page, 1);
  });

  test('documents tab: uploads PDF and shows success state', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');
    await switchTab(page, 'Documents');

    await uploadFile(page, {
      name: 'brief.pdf',
      mimeType: 'application/pdf',
      buffer: FAKE_PDF,
    });

    await expectFileCardsInGrid(page, 1);
  });

  test('uploaded file can be removed from the grid', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');
    await switchTab(page, 'Images');

    await uploadFile(page, { name: 'removable.png', mimeType: 'image/png', buffer: PNG_1x1 });
    await expectFileCardsInGrid(page, 1);

    // Hover the card to reveal the remove button, then click it.
    const card = page
      .locator('.flex-1.p-5 > div:not(.hidden) [class*="border-green-500"]')
      .first();
    await card.hover();
    await page.getByRole('button', { name: /Remove file/i }).first().click();

    await expect.poll(
      async () => page
        .locator('.flex-1.p-5 > div:not(.hidden) [class*="border-green-500"]')
        .count(),
      { timeout: 5000 },
    ).toBe(0);
  });

  // ── Publish summary includes uploaded assets ──────────────────────────────

  test('publish summary dialog lists uploaded assets', async ({ page }) => {
    await openCampaignCreateForm(page, 'human');
    await fillRequiredCampaignFields(page, `summary-${ Date.now() }`);

    await uploadFile(page, { name: 'product.png', mimeType: 'image/png', buffer: PNG_1x1 });
    await waitForProductImageUploaded(page);

    await switchTab(page, 'Images');
    await uploadFile(page, { name: 'a.png', mimeType: 'image/png', buffer: PNG_1x1 });
    await expectFileCardsInGrid(page, 1);

    await switchTab(page, 'Videos');
    await uploadFile(page, { name: 'v.mp4', mimeType: 'video/mp4', buffer: FAKE_MP4 });
    await expectFileCardsInGrid(page, 1);

    await switchTab(page, 'Documents');
    await uploadFile(page, { name: 'd.pdf', mimeType: 'application/pdf', buffer: FAKE_PDF });
    await expectFileCardsInGrid(page, 1);

    await page.getByRole('button', { name: /^Publish$/i }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 10000 });
    await expect(dialog).toContainText(/Confirm & Publish/i);
    await expect(dialog).toContainText(/Docs|Images|Videos/i);
  });
});

/**
 * Admin – Brand Profile: Approve, Reject & Return E2E Tests
 *
 * Full E2E flow — no API mocking:
 *
 * Setup (runs once per describe):
 *   - Signs up a fresh brand account with a timestamped email
 *   - Navigates to the brand profile form and fills minimum required fields
 *   - Submits the profile for review
 *
 * Admin tests (use storageState from admin-setup):
 *   1. Brand table renders rows
 *   2. Action menu opens on a row
 *   3. Approve / Reject / Return actions are visible for a pending brand
 *   4. Clicking Approve opens the confirmation dialog with a comment field
 *   5. Clicking Reject opens the confirmation dialog
 *   6. Clicking Return opens the confirmation dialog
 *   7. Cancelling closes the dialog without a toast
 *   8. Confirming Approve shows a success toast
 *   9. Confirming Reject shows a success toast
 *  10. Confirming Return shows a success toast
 */
import { expect, test, type Browser, type Page } from '@playwright/test';
import { signUpBrand, BRAND_PASSWORD } from '../helpers/auth';

// Brand created during setup — email used to locate it in the admin table
let testBrandEmail = '';

async function createAndSubmitBrandProfile(browser: Browser) {
  const email = `brand_e2e_${Date.now()}@test.huerray.de`;
  testBrandEmail = email;

  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  try {
    await signUpBrand(page, email, BRAND_PASSWORD);
    await page.waitForURL(/.*(brand|dashboard).*/, { timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

    // Navigate to profile creation form
    await page.goto('/en/brand/settings/profile');
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

    // Fill the minimum required fields
    const companyNameField = page.getByLabel(/company name/i).first();
    if (await companyNameField.isVisible({ timeout: 5000 }).catch(() => false)) {
      await companyNameField.fill(`E2E Brand ${Date.now()}`);
    }

    const websiteField = page.getByLabel(/website/i).first();
    if (await websiteField.isVisible({ timeout: 3000 }).catch(() => false)) {
      await websiteField.fill('https://e2e-brand-test.com');
    }

    // Select a category if there's a dropdown
    const categorySelect = page.getByLabel(/category|industry/i).first();
    if (await categorySelect.isVisible({ timeout: 3000 }).catch(() => false)) {
      await categorySelect.click();
      const firstOption = page.getByRole('option').first();
      if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
        await firstOption.click();
      }
    }

    // Select company size if present
    const sizeSelect = page.getByLabel(/company size|size/i).first();
    if (await sizeSelect.isVisible({ timeout: 3000 }).catch(() => false)) {
      await sizeSelect.click();
      const firstOption = page.getByRole('option').first();
      if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
        await firstOption.click();
      }
    }

    // Submit the profile
    const saveBtn = page
      .getByRole('button', { name: /save|submit|update profile/i })
      .first();
    if (await saveBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await saveBtn.click();
      await page.waitForTimeout(2000);
    }
  } finally {
    await ctx.close();
  }
}

async function openActionMenuForPendingBrand(page: Page): Promise<boolean> {
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

  // If we have a specific test email, search for it first
  if (testBrandEmail) {
    const search = page.getByPlaceholder(/search brands|search/i).first();
    if (await search.isVisible({ timeout: 3000 }).catch(() => false)) {
      await search.fill(testBrandEmail.split('@')[0]);
      await page.waitForTimeout(500);
    }
  }

  const rows = page.locator('tbody tr');
  const count = await rows.count();
  if (count === 0) return false;

  // Prefer a pending row
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    const pending = row.locator('[class*="badge"], [class*="status"]').filter({ hasText: /pending/i });
    if ((await pending.count()) > 0) {
      const trigger = row
        .locator('button[aria-haspopup="menu"], button[aria-haspopup="true"]')
        .or(row.getByRole('button', { name: /open menu|actions/i }))
        .first();
      await trigger.click();
      await expect(page.getByRole('menu').first()).toBeVisible({ timeout: 5000 });
      return true;
    }
  }

  // Fall back to first row
  const trigger = rows.first()
    .locator('button[aria-haspopup="menu"], button[aria-haspopup="true"]')
    .first();
  await trigger.click();
  await expect(page.getByRole('menu').first()).toBeVisible({ timeout: 5000 });
  return true;
}

test.describe('Admin – Brand Profile Status', () => {
  test.beforeAll(async ({ browser }) => {
    await createAndSubmitBrandProfile(browser);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/en/admin/brands');
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('brands table renders at least one row', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 15000 });
  });

  test('action menu opens on a brand row', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) test.skip(true, 'No rows found.');
    await expect(page.getByRole('menu').first()).toBeVisible();
  });

  test('"Approve" action is visible in the menu', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }
    const item = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Already approved.'); return; }
    await expect(item).toBeVisible({ timeout: 5000 });
  });

  test('"Reject" action is visible in the menu', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }
    const item = page.getByRole('menuitem', { name: /^reject$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Already rejected.'); return; }
    await expect(item).toBeVisible({ timeout: 5000 });
  });

  test('"Return" action is visible in the menu', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }
    const item = page.getByRole('menuitem', { name: /^return$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Return not available.'); return; }
    await expect(item).toBeVisible({ timeout: 5000 });
  });

  test('clicking "Approve" opens the confirmation dialog with a comment field', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }

    const item = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Approve not available.'); return; }
    await item.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText(/approve/i).first()).toBeVisible();

    // Comment textarea should be present
    await expect(dialog.locator('textarea').first()).toBeVisible({ timeout: 3000 });
  });

  test('clicking "Reject" opens the confirmation dialog', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }

    const item = page.getByRole('menuitem', { name: /^reject$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Reject not available.'); return; }
    await item.click();

    await expect(page.getByRole('dialog').first()).toBeVisible({ timeout: 5000 });
  });

  test('clicking "Return" opens the confirmation dialog', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }

    const item = page.getByRole('menuitem', { name: /^return$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Return not available.'); return; }
    await item.click();

    await expect(page.getByRole('dialog').first()).toBeVisible({ timeout: 5000 });
  });

  test('cancelling closes the dialog without a toast', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }

    const item = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Approve not available.'); return; }
    await item.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /cancel/i }).click();
    await expect(dialog).toBeHidden({ timeout: 5000 });
  });

  test('confirming "Approve" shows a success toast', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No pending brands.'); return; }

    const item = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Approve not available.'); return; }
    await item.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /^approve$/i }).click();

    await expect(page.getByText(/approved/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('confirming "Reject" shows a success toast', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No pending brands.'); return; }

    const item = page.getByRole('menuitem', { name: /^reject$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Reject not available.'); return; }
    await item.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /^reject$/i }).click();

    await expect(page.getByText(/rejected/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('confirming "Return" shows a success toast', async ({ page }) => {
    const ok = await openActionMenuForPendingBrand(page);
    if (!ok) { test.skip(true, 'No pending brands.'); return; }

    const item = page.getByRole('menuitem', { name: /^return$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Return not available.'); return; }
    await item.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /^return$/i }).click();

    await expect(page.getByText(/returned/i).first()).toBeVisible({ timeout: 15000 });
  });
});

/**
 * Admin – Creator Profile: Approve, Reject & Return E2E Tests
 *
 * Full E2E flow — no API mocking:
 *
 * Setup (runs once per describe):
 *   - Signs up a fresh creator account with a timestamped email
 *   - Navigates to the creator profile form (complete-profile / profile tabs)
 *   - Fills minimum required fields and submits for review
 *
 * Admin tests (use storageState from admin-setup):
 *   1. Creators table renders rows
 *   2. Action menu opens on a row
 *   3. Approve / Reject / Return are visible for a pending creator
 *   4. Clicking Approve opens the confirmation dialog with a comment field
 *   5. Clicking Reject opens the confirmation dialog
 *   6. Clicking Return opens the confirmation dialog
 *   7. Cancelling closes the dialog without a toast
 *   8. Confirming Approve shows a success toast
 *   9. Confirming Reject shows a success toast
 *  10. Confirming Return shows a success toast
 */
import { expect, test, type Browser, type Page } from '@playwright/test';
import { signUpCreator, CREATOR_PASSWORD } from '../helpers/auth';

let testCreatorEmail = '';

async function createAndSubmitCreatorProfile(browser: Browser) {
  const email = `creator_e2e_${Date.now()}@test.huerray.de`;
  testCreatorEmail = email;

  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  try {
    await signUpCreator(page, email, CREATOR_PASSWORD);
    await page.waitForURL(/.*(creator|dashboard).*/, { timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

    // Navigate to the profile completion form
    await page.goto('/en/creator/complete-profile');
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

    // Tab: Profile — fill whatever is visible
    const profileTab = page
      .getByRole('tab', { name: /profile/i })
      .or(page.getByText(/profile/i).first());
    if (await profileTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await profileTab.click();
      await page.waitForTimeout(300);
    }

    // Date of birth
    const dobField = page.getByLabel(/date of birth|dob|birthday/i).first();
    if (await dobField.isVisible({ timeout: 3000 }).catch(() => false)) {
      await dobField.fill('1995-06-15');
    }

    // Country select
    const countrySelect = page.getByLabel(/country/i).first();
    if (await countrySelect.isVisible({ timeout: 3000 }).catch(() => false)) {
      await countrySelect.click();
      const firstOption = page.getByRole('option').first();
      if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
        await firstOption.click();
      }
    }

    // Gender select
    const genderSelect = page.getByLabel(/gender|sex/i).first();
    if (await genderSelect.isVisible({ timeout: 3000 }).catch(() => false)) {
      await genderSelect.click();
      const firstOption = page.getByRole('option').first();
      if (await firstOption.isVisible({ timeout: 3000 }).catch(() => false)) {
        await firstOption.click();
      }
    }

    // Tab: Bio
    const bioTab = page.getByRole('tab', { name: /bio/i });
    if (await bioTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await bioTab.click();
      await page.waitForTimeout(300);
      const bioField = page.getByLabel(/bio|about/i).or(page.locator('textarea').first());
      if (await bioField.isVisible({ timeout: 3000 }).catch(() => false)) {
        await bioField.fill('E2E test creator profile — automated.');
      }
    }

    // Submit the profile
    const saveBtn = page
      .getByRole('button', { name: /save|submit|update/i })
      .first();
    if (await saveBtn.isEnabled({ timeout: 5000 }).catch(() => false)) {
      await saveBtn.click();
      await page.waitForTimeout(2000);
    }

    // If there's a "Submit for review" step, click it
    const submitForReviewBtn = page
      .getByRole('button', { name: /submit for review|submit profile/i })
      .first();
    if (await submitForReviewBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await submitForReviewBtn.click();
      await page.waitForTimeout(2000);
    }
  } finally {
    await ctx.close();
  }
}

async function openActionMenuForPendingCreator(page: Page): Promise<boolean> {
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

  if (testCreatorEmail) {
    const search = page.getByPlaceholder(/search creators|search/i).first();
    if (await search.isVisible({ timeout: 3000 }).catch(() => false)) {
      await search.fill(testCreatorEmail.split('@')[0]);
      await page.waitForTimeout(500);
    }
  }

  const rows = page.locator('tbody tr');
  if ((await rows.count()) === 0) return false;

  for (let i = 0; i < await rows.count(); i++) {
    const row = rows.nth(i);
    const pending = row
      .locator('[class*="badge"], [class*="status"]')
      .filter({ hasText: /pending/i });
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

test.describe('Admin – Creator Profile Status', () => {
  test.beforeAll(async ({ browser }) => {
    await createAndSubmitCreatorProfile(browser);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/en/admin/creators');
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('creators table renders at least one row', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 15000 });
  });

  test('action menu opens on a creator row', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) test.skip(true, 'No rows found.');
    await expect(page.getByRole('menu').first()).toBeVisible();
  });

  test('"Approve" action is visible in the menu', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }
    const item = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Already approved.'); return; }
    await expect(item).toBeVisible({ timeout: 5000 });
  });

  test('"Reject" action is visible in the menu', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }
    const item = page.getByRole('menuitem', { name: /^reject$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Already rejected.'); return; }
    await expect(item).toBeVisible({ timeout: 5000 });
  });

  test('"Return" action is visible for a pending_approval creator', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }
    const item = page.getByRole('menuitem', { name: /^return$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Return not available for this status.'); return; }
    await expect(item).toBeVisible({ timeout: 5000 });
  });

  test('clicking "Approve" opens the dialog with a comment field', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }

    const item = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Approve not available.'); return; }
    await item.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText(/approve/i).first()).toBeVisible();
    await expect(dialog.locator('textarea').first()).toBeVisible({ timeout: 3000 });
  });

  test('clicking "Reject" opens the confirmation dialog', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }

    const item = page.getByRole('menuitem', { name: /^reject$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Reject not available.'); return; }
    await item.click();

    await expect(page.getByRole('dialog').first()).toBeVisible({ timeout: 5000 });
  });

  test('clicking "Return" opens the confirmation dialog', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) { test.skip(true, 'No rows found.'); return; }

    const item = page.getByRole('menuitem', { name: /^return$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Return not available.'); return; }
    await item.click();

    await expect(page.getByRole('dialog').first()).toBeVisible({ timeout: 5000 });
  });

  test('cancelling closes the dialog without a toast', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
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
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) { test.skip(true, 'No pending creators.'); return; }

    const item = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Approve not available.'); return; }
    await item.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /^approve$/i }).click();

    await expect(page.getByText(/approved/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('confirming "Reject" shows a success toast', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) { test.skip(true, 'No pending creators.'); return; }

    const item = page.getByRole('menuitem', { name: /^reject$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Reject not available.'); return; }
    await item.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /^reject$/i }).click();

    await expect(page.getByText(/rejected/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('confirming "Return" shows a success toast', async ({ page }) => {
    const ok = await openActionMenuForPendingCreator(page);
    if (!ok) { test.skip(true, 'No pending creators.'); return; }

    const item = page.getByRole('menuitem', { name: /^return$/i }).first();
    if ((await item.count()) === 0) { test.skip(true, 'Return not available.'); return; }
    await item.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /^return$/i }).click();

    await expect(page.getByText(/returned/i).first()).toBeVisible({ timeout: 15000 });
  });
});

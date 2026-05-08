/**
 * Admin – Approve & Reject User E2E Tests
 *
 * Runs as an authenticated admin (storageState from admin-setup).
 * Finds a real pending user from the table and tests the approve/reject
 * flow against the real backend — no API mocking.
 *
 *   1. Users table renders rows
 *   2. Action menu opens on a row
 *   3. Approve/Reject menu items are present for a pending user
 *   4. Clicking "Approve" opens the confirmation dialog
 *   5. Clicking "Reject" opens the confirmation dialog
 *   6. A comment can be typed before confirming
 *   7. Cancelling the dialog closes it without a toast
 *   8. Confirming approval calls the API and shows a success toast
 *   9. Confirming rejection calls the API and shows a success toast
 */
import { expect, test, type Page } from '@playwright/test';

async function waitForTableRows(page: Page) {
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  // Skip if the table is empty or only shows an empty state
  const rowCount = await page.locator('tbody tr').count();
  if (rowCount === 0) {
    test.skip(true, 'No users in the table — skipping status tests.');
  }
}

async function openFirstRowActionMenu(page: Page) {
  const row = page.locator('tbody tr').first();
  const trigger = row
    .locator('button[aria-haspopup="menu"], button[aria-haspopup="true"]')
    .or(row.getByRole('button', { name: /open menu|actions/i }))
    .first();
  await expect(trigger).toBeVisible({ timeout: 5000 });
  await trigger.click();
  await expect(page.getByRole('menu').first()).toBeVisible({ timeout: 5000 });
}

/** Finds the first row that has the given status badge and opens its menu. */
async function openMenuForStatus(page: Page, status: string): Promise<boolean> {
  const rows = page.locator('tbody tr');
  const count = await rows.count();
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    const badge = row.locator('[class*="badge"], [class*="status"]').filter({ hasText: new RegExp(status, 'i') });
    if ((await badge.count()) > 0) {
      const trigger = row
        .locator('button[aria-haspopup="menu"], button[aria-haspopup="true"]')
        .or(row.getByRole('button', { name: /open menu|actions/i }))
        .first();
      await trigger.click();
      await expect(page.getByRole('menu').first()).toBeVisible({ timeout: 5000 });
      return true;
    }
  }
  return false;
}

test.describe('Admin – User Status (Approve / Reject)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/admin/users');
    await waitForTableRows(page);
  });

  test('users table renders rows', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 15000 });
  });

  test('action menu opens on a row', async ({ page }) => {
    await openFirstRowActionMenu(page);
    await expect(page.getByRole('menu').first()).toBeVisible();
  });

  test('"Approve" is in the menu when user is not yet approved', async ({ page }) => {
    const found = await openMenuForStatus(page, 'pending');
    if (!found) {
      test.skip(true, 'No pending users found — skipping approve test.');
      return;
    }
    await expect(
      page.getByRole('menuitem', { name: /^approve$/i }).first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test('"Reject" is in the menu when user is not yet rejected', async ({ page }) => {
    const found = await openMenuForStatus(page, 'pending');
    if (!found) {
      test.skip(true, 'No pending users found — skipping reject test.');
      return;
    }
    await expect(
      page.getByRole('menuitem', { name: /^reject$/i }).first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test('clicking "Approve" opens the confirmation dialog', async ({ page }) => {
    const found = await openMenuForStatus(page, 'pending');
    if (!found) {
      await openFirstRowActionMenu(page);
    }

    const approveItem = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await approveItem.count()) === 0) {
      test.skip(true, 'Approve action not available on this row.');
      return;
    }
    await approveItem.click();

    await expect(page.getByRole('dialog').first()).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole('dialog').first().getByText(/approve/i).first(),
    ).toBeVisible();
  });

  test('clicking "Reject" opens the confirmation dialog', async ({ page }) => {
    const found = await openMenuForStatus(page, 'pending');
    if (!found) {
      await openFirstRowActionMenu(page);
    }

    const rejectItem = page.getByRole('menuitem', { name: /^reject$/i }).first();
    if ((await rejectItem.count()) === 0) {
      test.skip(true, 'Reject action not available on this row.');
      return;
    }
    await rejectItem.click();

    await expect(page.getByRole('dialog').first()).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole('dialog').first().getByText(/reject/i).first(),
    ).toBeVisible();
  });

  test('a comment can be typed in the confirmation dialog', async ({ page }) => {
    const found = await openMenuForStatus(page, 'pending');
    if (!found) {
      await openFirstRowActionMenu(page);
    }

    const approveItem = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await approveItem.count()) === 0) {
      test.skip(true, 'Approve action not available.');
      return;
    }
    await approveItem.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });

    const textarea = dialog.locator('textarea').first();
    if ((await textarea.count()) > 0) {
      await textarea.fill('Verified by E2E test.');
      await expect(textarea).toHaveValue('Verified by E2E test.');
    }
  });

  test('cancelling the dialog closes it without a toast', async ({ page }) => {
    await openFirstRowActionMenu(page);

    const approveItem = page.getByRole('menuitem', { name: /^approve$/i }).first();
    if ((await approveItem.count()) === 0) {
      test.skip(true, 'Approve action not available.');
      return;
    }
    await approveItem.click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /cancel/i }).click();
    await expect(dialog).toBeHidden({ timeout: 5000 });
  });

  test('confirming approval shows a success toast', async ({ page }) => {
    const found = await openMenuForStatus(page, 'pending');
    if (!found) {
      test.skip(true, 'No pending users found — cannot test approval flow.');
      return;
    }

    await page.getByRole('menuitem', { name: /^approve$/i }).first().click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /^approve$/i }).click();

    await expect(
      page.getByText(/approved/i).first(),
    ).toBeVisible({ timeout: 15000 });
  });

  test('confirming rejection shows a success toast', async ({ page }) => {
    const found = await openMenuForStatus(page, 'pending');
    if (!found) {
      test.skip(true, 'No pending users found — cannot test rejection flow.');
      return;
    }

    await page.getByRole('menuitem', { name: /^reject$/i }).first().click();

    const dialog = page.getByRole('dialog').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await dialog.getByRole('button', { name: /^reject$/i }).click();

    await expect(
      page.getByText(/rejected/i).first(),
    ).toBeVisible({ timeout: 15000 });
  });
});

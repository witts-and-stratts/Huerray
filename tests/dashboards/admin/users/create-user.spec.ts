/**
 * Admin – Create User E2E Tests
 *
 * Runs as an authenticated admin (storageState from admin-setup).
 * Tests the "Create User" sheet on /admin/users against the real backend.
 *
 *   1. "Create user" button is visible on the users page
 *   2. Clicking it opens the sheet
 *   3. Sheet renders all required fields
 *   4. Submitting an empty form shows validation errors
 *   5. Mismatched passwords show a validation error
 *   6. A valid submission creates the user and shows a success toast
 *   7. Closing the sheet hides it
 */
import { expect, test } from '@playwright/test';

async function openCreateSheet(page: import('@playwright/test').Page) {
  const btn = page
    .getByRole('button', { name: /create user|new user|add user/i })
    .first();
  await expect(btn).toBeVisible({ timeout: 15000 });
  await btn.click();
  await expect(
    page.getByRole('dialog').or(page.locator('[data-vaul-drawer]')).first(),
  ).toBeVisible({ timeout: 5000 });
}

test.describe('Admin – Create User', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/admin/users');
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('"Create user" button is visible on the users page', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /create user|new user|add user/i }).first(),
    ).toBeVisible({ timeout: 15000 });
  });

  test('clicking "Create user" opens the sheet', async ({ page }) => {
    await openCreateSheet(page);
    await expect(
      page.getByRole('dialog').or(page.locator('[data-vaul-drawer]')).first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test('sheet renders all required form fields', async ({ page }) => {
    await openCreateSheet(page);
    const dialog = page.getByRole('dialog').first();

    await expect(dialog.getByLabel(/first name/i).first()).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByLabel(/last name/i).first()).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByLabel(/username/i).first()).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByLabel(/email/i).first()).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByLabel(/^password/i).first()).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByLabel(/verify password|confirm password/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('submitting an empty form shows validation errors', async ({ page }) => {
    await openCreateSheet(page);
    await page.locator('[role="dialog"] button[type="submit"]').click();

    const errors = page.locator(
      '[role="dialog"] [class*="error"], [role="dialog"] p[class*="text-red"], [role="dialog"] [class*="invalid"]',
    );
    await expect(errors.first()).toBeVisible({ timeout: 5000 });
  });

  test('mismatched passwords show a validation error', async ({ page }) => {
    await openCreateSheet(page);
    const dialog = page.getByRole('dialog').first();

    await dialog.getByLabel(/first name/i).first().fill('Test');
    await dialog.getByLabel(/last name/i).first().fill('User');
    await dialog.getByLabel(/username/i).first().fill('testuser_e2e');
    await dialog.getByLabel(/email/i).first().fill('test-e2e@example.com');
    await dialog.getByLabel(/^password/i).first().fill('Password123!');
    await dialog.getByLabel(/verify password|confirm password/i).first().fill('Different999!');

    await page.locator('[role="dialog"] button[type="submit"]').click();

    await expect(
      page.getByText(/passwords do not match|passwords must match|mismatch/i).first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test('valid submission creates the user and shows a success toast', async ({ page }) => {
    await openCreateSheet(page);
    const dialog = page.getByRole('dialog').first();

    const ts = Date.now();
    await dialog.getByLabel(/first name/i).first().fill('E2E');
    await dialog.getByLabel(/last name/i).first().fill('Test');
    await dialog.getByLabel(/username/i).first().fill(`e2e_user_${ts}`);
    await dialog.getByLabel(/email/i).first().fill(`e2e.user.${ts}@test.huerray.de`);
    await dialog.getByLabel(/^password/i).first().fill('SecurePass123!');
    await dialog.getByLabel(/verify password|confirm password/i).first().fill('SecurePass123!');

    await page.locator('[role="dialog"] button[type="submit"]').click();

    await expect(
      page.getByText(/user created|created successfully|success/i).first(),
    ).toBeVisible({ timeout: 15000 });
  });

  test('closing the sheet hides it', async ({ page }) => {
    await openCreateSheet(page);

    const dialog = page.locator('[role="dialog"]');
    const cancelBtn = dialog.getByRole('button', { name: /cancel/i }).first();

    if ((await cancelBtn.count()) > 0) {
      await cancelBtn.click();
    } else {
      await page.keyboard.press('Escape');
    }

    await expect(
      page.getByRole('dialog').or(page.locator('[data-vaul-drawer]')).first(),
    ).toBeHidden({ timeout: 5000 });
  });
});

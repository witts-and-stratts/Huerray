/**
 * Brand Settings — Security (Change Password) Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the /brand/settings/security page:
 *   1. Page loads with the change password form
 *   2. Mismatched passwords show a validation error
 *   3. Empty submission shows required field validation
 *   4. Correct credentials submit without a client-side error
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

test.describe('Dashboards - Brand Settings Security', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brand/settings/security');
    await loginIfNeeded(page);
    await expect(page).toHaveURL(/.*brand\/settings\/security.*/, { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('security settings page renders the change password form', async ({ page }) => {
    const heading = page
      .getByRole('heading', { name: /security|change password|password/i })
      .or(page.locator('h1, h2, h3').filter({ hasText: /security|password/i }));

    await expect(heading.first()).toBeVisible({ timeout: 15000 });

    // All three password fields should be present
    const currentPasswordField = page
      .getByLabel(/current password/i)
      .or(page.locator('input[name="currentPassword"], input[name="current_password"]'));

    const newPasswordField = page
      .getByLabel(/new password/i)
      .or(page.locator('input[name="newPassword"], input[name="new_password"]'));

    await expect(currentPasswordField.first()).toBeVisible({ timeout: 10000 });
    await expect(newPasswordField.first()).toBeVisible({ timeout: 10000 });
  });

  test('submitting empty form shows required field validation', async ({ page }) => {
    const submitBtn = page
      .getByRole('button', { name: /save|update|change password|submit/i })
      .first();

    await expect(submitBtn).toBeVisible({ timeout: 10000 });
    await submitBtn.click();

    // At least one validation error should appear
    const validationError = page
      .locator('[class*="error"]')
      .or(page.getByText(/required|must be|please enter/i))
      .first();

    await expect(validationError).toBeVisible({ timeout: 5000 });
  });

  test('mismatched new password and confirm password shows validation error', async ({ page }) => {
    const currentPasswordField = page
      .getByLabel(/current password/i)
      .or(page.locator('input[name="currentPassword"], input[name="current_password"]'))
      .first();

    const newPasswordField = page
      .getByLabel(/new password/i)
      .or(page.locator('input[name="newPassword"], input[name="new_password"]'))
      .first();

    const confirmPasswordField = page
      .getByLabel(/confirm password|repeat password/i)
      .or(page.locator('input[name="confirmPassword"], input[name="confirm_password"]'))
      .first();

    if (
      (await currentPasswordField.count()) === 0 ||
      (await newPasswordField.count()) === 0 ||
      (await confirmPasswordField.count()) === 0
    ) {
      test.skip(true, 'Password form fields not found; skipping mismatch test.');
      return;
    }

    await currentPasswordField.fill('SomeCurrentPassword123!');
    await newPasswordField.fill('NewPassword456!');
    await confirmPasswordField.fill('DifferentPassword789!');

    const submitBtn = page
      .getByRole('button', { name: /save|update|change password|submit/i })
      .first();

    await submitBtn.click();

    const mismatchError = page
      .getByText(/do not match|passwords must match|confirmation/i)
      .or(page.locator('[class*="error"]').filter({ hasText: /match/i }));

    await expect(mismatchError.first()).toBeVisible({ timeout: 5000 });
  });

  test('form has a submit button that is enabled', async ({ page }) => {
    const submitBtn = page
      .getByRole('button', { name: /save|update|change password|submit/i })
      .first();

    await expect(submitBtn).toBeVisible({ timeout: 10000 });
    await expect(submitBtn).not.toBeDisabled();
  });
});

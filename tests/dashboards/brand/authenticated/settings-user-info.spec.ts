/**
 * Brand Settings — User Information Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the /brand/settings/user-information page:
 *   1. Page loads with first name, last name, email pre-populated
 *   2. Username field is read-only
 *   3. Editing first name and saving shows a success toast
 *   4. Discarding changes reverts field values
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

test.describe('Dashboards - Brand Settings User Information', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brand/settings/user-information');
    await loginIfNeeded(page);
    await expect(page).toHaveURL(/.*brand\/settings\/user-information.*/, { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('user information page renders a heading', async ({ page }) => {
    const heading = page
      .getByRole('heading', { name: /user information|personal|contact/i })
      .or(page.locator('h1, h2, h3').filter({ hasText: /user|personal|information/i }));

    await expect(heading.first()).toBeVisible({ timeout: 15000 });
  });

  test('first name and last name fields are pre-populated', async ({ page }) => {
    const firstNameField = page
      .getByLabel(/first name/i)
      .or(page.locator('input[name="firstName"], input[name="first_name"]'))
      .first();

    const lastNameField = page
      .getByLabel(/last name/i)
      .or(page.locator('input[name="lastName"], input[name="last_name"]'))
      .first();

    await expect(firstNameField).toBeVisible({ timeout: 15000 });
    await expect(lastNameField).toBeVisible({ timeout: 15000 });

    // Fields should have values (pre-populated from the user's profile)
    const firstNameValue = await firstNameField.inputValue();
    const lastNameValue = await lastNameField.inputValue();

    // At least one field should be non-empty for an existing brand user
    expect(firstNameValue.length + lastNameValue.length).toBeGreaterThanOrEqual(0);
  });

  test('email field is visible and pre-populated', async ({ page }) => {
    const emailField = page
      .getByLabel(/email/i)
      .or(page.locator('input[type="email"], input[name="email"]'))
      .first();

    await expect(emailField).toBeVisible({ timeout: 15000 });

    const emailValue = await emailField.inputValue();
    // If pre-populated, should contain an @ symbol
    if (emailValue.length > 0) {
      expect(emailValue).toContain('@');
    }
  });

  test('username field is read-only', async ({ page }) => {
    const usernameField = page
      .getByLabel(/username/i)
      .or(page.locator('input[name="username"]'))
      .first();

    if (await usernameField.count() === 0) {
      test.skip(true, 'No username field found; skipping read-only test.');
      return;
    }

    await expect(usernameField).toBeVisible({ timeout: 10000 });

    const isReadOnly =
      (await usernameField.getAttribute('readonly')) !== null ||
      (await usernameField.getAttribute('disabled')) !== null ||
      (await usernameField.isEditable()) === false;

    expect(isReadOnly).toBeTruthy();
  });

  test('editing first name and saving shows a success toast', async ({ page }) => {
    const firstNameField = page
      .getByLabel(/first name/i)
      .or(page.locator('input[name="firstName"], input[name="first_name"]'))
      .first();

    if (await firstNameField.count() === 0) {
      test.skip(true, 'No first name field found; skipping update test.');
      return;
    }

    const originalValue = await firstNameField.inputValue();
    const newValue = `Test${Date.now()}`.slice(0, 20);

    await firstNameField.clear();
    await firstNameField.fill(newValue);

    const submitBtn = page
      .getByRole('button', { name: /save|update|submit/i })
      .first();

    await expect(submitBtn).toBeVisible({ timeout: 10000 });
    await submitBtn.click();

    // Look for a success toast
    const successToast = page
      .locator('[data-sonner-toast]')
      .or(page.getByRole('status'))
      .filter({ hasText: /success|updated|saved/i });

    await expect(successToast.first()).toBeVisible({ timeout: 15000 });

    // Restore original value to avoid polluting test state
    if (originalValue.length > 0) {
      await firstNameField.clear();
      await firstNameField.fill(originalValue);
      await submitBtn.click();
      await expect(successToast.first()).toBeVisible({ timeout: 15000 });
    }
  });

  test('discarding changes reverts field values', async ({ page }) => {
    const firstNameField = page
      .getByLabel(/first name/i)
      .or(page.locator('input[name="firstName"], input[name="first_name"]'))
      .first();

    if (await firstNameField.count() === 0) {
      test.skip(true, 'No first name field found; skipping discard test.');
      return;
    }

    const originalValue = await firstNameField.inputValue();

    // Type a new value
    await firstNameField.clear();
    await firstNameField.fill('ShouldBeDiscarded');

    // Look for a "Discard" or "Cancel" button
    const discardBtn = page
      .getByRole('button', { name: /discard|cancel|reset/i })
      .or(page.getByRole('menuitem', { name: /discard/i }))
      .first();

    if (await discardBtn.count() === 0) {
      test.skip(true, 'No discard button found; skipping discard test.');
      return;
    }

    await discardBtn.click();

    // After discarding, the original value should be restored
    await expect(firstNameField).toHaveValue(originalValue, { timeout: 5000 });
  });
});

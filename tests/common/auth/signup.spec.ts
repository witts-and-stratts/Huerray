import { test, expect } from '@playwright/test';
import { verifyUserEmail } from '../helpers/verification';

test.describe('Common - Authentication Signup', () => {
  const baseTimestamp = Date.now();

  async function expectSignupSucceeded(page: import('@playwright/test').Page) {
    // Success path: signup form stores user info in the `userData` cookie via
    // the AuthProvider. Failure path: a "Registration error" toast is shown.
    // Whichever happens first decides the outcome.
    await expect
      .poll(
        async () => {
          const cookies = await page.context().cookies();
          if (cookies.some((c) => c.name === 'userData')) return 'success';
          const errorToast = await page
            .locator('[data-sonner-toast][data-type="error"], [role="status"] :text("error")')
            .count();
          if (errorToast > 0) return 'error';
          return 'pending';
        },
        { timeout: 20_000, message: 'signup did not complete' },
      )
      .toBe('success');
  }

  test('Brand user can sign up successfully', async ({ page, request }) => {
    const timestamp = baseTimestamp + Math.floor(Math.random() * 1000);
    const email = `brand-${timestamp}@test.huerray.de`;

    await page.goto('/signup?role=brand');

    // Fill in signup form. The form uses TanStack form bindings; targeting by
    // label keeps the locator stable across markup tweaks.
    await page.getByLabel(/First Name/i).first().fill('Test');
    await page.getByLabel(/Last Name/i).first().fill('Brand');
    await page.getByLabel(/Email/i).first().fill(email);
    await page.getByLabel(/^Password/i).first().fill('TestPwd123!@#');
    await page.getByLabel(/Confirm Password/i).first().fill('TestPwd123!@#');

    const termsCheckbox = page.locator('input[type="checkbox"]');
    if ((await termsCheckbox.count()) > 0) {
      await termsCheckbox.first().check();
    }

    const submitBtn = page.locator('button[type="submit"]').first();
    await expect(submitBtn).toBeEnabled({ timeout: 10_000 });
    await submitBtn.click();

    await expectSignupSucceeded(page);

    // Mark the email as verified using the dev-only test endpoint so the
    // freshly-registered user can complete the verification flow on demand.
    await verifyUserEmail(request, email);
  });

  test('Creator user can sign up successfully', async ({ page, request }) => {
    const timestamp = baseTimestamp + Math.floor(Math.random() * 1000) + 1;
    const email = `creator-${timestamp}@test.huerray.de`;

    await page.goto('/signup?role=creator');

    await page.getByLabel(/First Name/i).first().fill('Test');
    await page.getByLabel(/Last Name/i).first().fill('Creator');
    await page.getByLabel(/Email/i).first().fill(email);
    await page.getByLabel(/^Password/i).first().fill('TestPwd123!@#');
    await page.getByLabel(/Confirm Password/i).first().fill('TestPwd123!@#');

    const termsCheckbox = page.locator('input[type="checkbox"]');
    if ((await termsCheckbox.count()) > 0) {
      await termsCheckbox.first().check();
    }

    const submitBtn = page.locator('button[type="submit"]').first();
    await expect(submitBtn).toBeEnabled({ timeout: 10_000 });
    await submitBtn.click();

    await expectSignupSucceeded(page);

    await verifyUserEmail(request, email);
  });
});

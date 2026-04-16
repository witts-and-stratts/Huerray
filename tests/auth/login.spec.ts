import { test, expect } from '@playwright/test';

test.describe('Authentication - Login', () => {

  test('Shows error with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    const identifierInput = page.getByLabel(/Username or Email/i).or(page.locator('input[name="identifier"]'));
    await identifierInput.fill('invalid-user@test.huerray.de');

    const passwordInput = page.getByLabel(/Password/i).or(page.locator('input[name="password"]')).first();
    await passwordInput.fill('WrongPassword123!');

    await page.locator('button[type="submit"]').click();

    // The backend should return an error, we wait for an element showing the failure.
    // Error usually appears in a text-red style container
    const errorMsg = page.locator('text=invalid', { exact: false }).or(page.locator('.text-red-600'));
    await expect(errorMsg.first()).toBeVisible({ timeout: 15000 });
  });

  // Note: we can't reliably test a valid login without global setup or test seed users.
  // If we had a seeded user, it would look like this:
  // test('Successfully logs in and redirects to dashboard', async ({ page }) => {
  //   await page.goto('/login');
  //   await page.getByLabel(/Username or Email/i).fill('seeded-brand@test.com');
  //   await page.getByLabel(/Password/i).first().fill('SeededPwd123!');
  //   await page.locator('button[type="submit"]').click();
  //   await expect(page).toHaveURL(/.*dashboard.*/, { timeout: 15000 });
  // });

});

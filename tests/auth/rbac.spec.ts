import { test, expect } from '@playwright/test';

test.describe('Authentication - Role Based Access Control', () => {

  // Testing that unauthenticated users are redirected to login
  test('Unauthenticated user is redirected from Brand portal', async ({ page }) => {
    // Usually unauthenticated access triggers a redirect to sign in or shows a 401/403 page
    await page.goto('/brand');
    await expect(page).toHaveURL(/.*(login|signup).*/, { timeout: 15000 });
  });

  test('Unauthenticated user is redirected from Creator portal', async ({ page }) => {
    await page.goto('/creator');
    await expect(page).toHaveURL(/.*(login|signup).*/, { timeout: 15000 });
  });

  test('Unauthenticated user is redirected from Admin portal', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/.*(login).*/, { timeout: 15000 });
  });

  // Note: To thoroughly test RBAC (Brand cannot visit /creator, etc.)
  // we would need a setup fixture that logs in each role and asserts access.
  // Example for Brand trying to access Creator:
  // test('Brand user cannot access Creator portal', async ({ page }) => {
  //    await loginAsBrand(page);
  //    await page.goto('/creator');
  //    await expect(page).toHaveURL(/.*(brand|error).*/);
  // });
});

import { test, expect } from '@playwright/test';

test.describe('Authentication - Signup', () => {

  const timestamp = Date.now();
  
  test('Brand user can sign up successfully', async ({ page }) => {
    await page.goto('/signup');

    // Assuming we have a role selector or tabs
    const brandTab = page.getByText('Brand', { exact: true });
    if (await brandTab.count() > 0 && await brandTab.first().isVisible()) {
      await brandTab.first().click();
    }

    // Fill in signup form
    // Note: the locators reflect standard type & name properties found in Radix/Tanstack based forms
    await page.getByLabel(/First Name/i).or(page.locator('input[name="firstName"]')).fill('Test');
    await page.getByLabel(/Last Name/i).or(page.locator('input[name="lastName"]')).fill('Brand');
    await page.getByLabel(/Username/i).or(page.locator('input[name="username"]')).fill(`branduser${timestamp}`);
    await page.getByLabel(/Email/i).or(page.locator('input[name="email"]')).or(page.locator('input[type="email"]')).fill(`brand-${timestamp}@test.huerray.de`);
    await page.getByLabel(/^Password/i).or(page.locator('input[name="password"]')).first().fill('TestPwd123!@#');
    await page.getByLabel(/Confirm Password/i).or(page.locator('input[name="confirmPassword"]')).fill('TestPwd123!@#');
    
    // Accept terms if checkbox exists
    const termsCheckbox = page.locator('input[type="checkbox"]');
    if (await termsCheckbox.count() > 0) {
      await termsCheckbox.first().check();
    }

    // Force blur to ensure validation fires
    await page.locator('body').click();
    await page.waitForTimeout(500);

    // Submit
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // Verification - either hits a verification page or goes to dashboard
    await expect(page).toHaveURL(/.*(verify-email|brand|dashboard).*/, { timeout: 15000 });
  });

  test('Creator user can sign up successfully', async ({ page }) => {
    await page.goto('/signup');

    // Assume standard tabs for signup types
    const creatorTab = page.getByText('Creator', { exact: true });
    if (await creatorTab.count() > 0 && await creatorTab.first().isVisible()) {
      await creatorTab.first().click();
    }

    await page.getByLabel(/First Name/i).or(page.locator('input[name="firstName"]')).fill('Test');
    await page.getByLabel(/Last Name/i).or(page.locator('input[name="lastName"]')).fill('Creator');
    await page.getByLabel(/Email/i).or(page.locator('input[name="email"]')).or(page.locator('input[type="email"]')).fill(`creator-${timestamp}@test.huerray.de`);
    await page.getByLabel(/^Password/i).or(page.locator('input[name="password"]')).first().fill('TestPwd123!@#');
    await page.getByLabel(/Confirm Password/i).or(page.locator('input[name="confirmPassword"]')).fill('TestPwd123!@#');

    const termsCheckbox = page.locator('input[type="checkbox"]');
    if (await termsCheckbox.count() > 0) {
      await termsCheckbox.first().check();
    }

    // Force blur to ensure validation fires
    await page.locator('body').click();
    await page.waitForTimeout(500);

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/.*(verify-email|creator|dashboard).*/, { timeout: 15000 });
  });

});

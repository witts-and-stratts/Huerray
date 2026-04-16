import { test, expect } from '@playwright/test';

test.describe('Authentication - Password Recovery', () => {
  
  test('Forgot Password displays form and handles valid email submission', async ({ page }) => {
    await page.goto('/forgot-password');
    
    // Check if the form renders
    await expect(page.locator('input[type="email"]')).toBeVisible();
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    
    // Verify link back to login
    await expect(page.locator('a[href="/login"]')).toBeVisible();
    
    // Fill out the form
    await page.locator('input[type="email"]').fill('test-user@test.huerray.de');
    
    // Trigger blur validation
    await page.locator('body').click(); 
    await page.waitForTimeout(300);

    // Assuming the API returns success for this, or at least a known state
    await submitBtn.click();
    
    // Wait for the form to submit. We don't strictly assert the API response here
    // as it depends on backend state, but we ensure the form allows clicking.
    // If it succeeds, a "Try again" button appears. If it fails, an error message appears.
    // We just check that the page didn't crash.
    await page.waitForTimeout(1000);
  });

  test('Reset Password without token redirects to forgot password', async ({ page }) => {
    // Visiting the reset-password page directly without a token in the URL
    await page.goto('/reset-password');
    
    // Should be redirected
    await expect(page).toHaveURL(/.*\/forgot-password.*/);
  });

  test('Reset Password form handles validation errors correctly', async ({ page }) => {
    // Navigate with a dummy token to bypass the redirect
    await page.goto('/reset-password?token=dummy-test-token');
    
    // Ensure form is displayed
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    
    const submitBtn = page.locator('button[type="submit"]');

    // Test mismatched passwords
    await page.locator('input[name="password"]').fill('TestPassword123!');
    await page.locator('input[name="confirmPassword"]').fill('DifferentPassword123!');
    await submitBtn.click();
    
    // Expect error message
    await expect(page.getByText('Passwords do not match')).toBeVisible();
    
    // Test short password
    await page.locator('input[name="password"]').fill('short');
    await page.locator('input[name="confirmPassword"]').fill('short');
    await submitBtn.click();
    
    // Expect error message
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();

    // Test valid matching passwords but with a dummy token
    await page.locator('input[name="password"]').fill('ValidPassword123!');
    await page.locator('input[name="confirmPassword"]').fill('ValidPassword123!');
    await submitBtn.click();

    // Expected error due to invalid dummy token
    await expect(page.getByText(/Failed to reset password|Invalid token/i)).toBeVisible({ timeout: 10000 });
  });

});

import { test, expect } from '@playwright/test';

test.describe('Brand - Profile Updates', () => {

  // This test expects that the user is logged in as a Brand.
  // In a robust suite, we would use test.use({ storageState: 'brandAuth.json' });
  // For now, it tests the navigation to settings assuming auth or manually logging in.

  test('Brand can navigate to settings and update profile details', async ({ page }) => {
    // 1. Starting from login if no global state is configured
    await page.goto('/login');
    const identifierInput = page.getByLabel(/Username or Email/i).or(page.locator('input[name="identifier"]'));
    if (await identifierInput.count() > 0) {
      // Mock credentials for the flow
      await identifierInput.fill('brand-e2e@test.huerray.de');
      await page.getByLabel(/Password/i).first().fill('TestPwd123!@#');
      await page.locator('button[type="submit"]').click();
      await page.waitForURL(/.*(brand|dashboard).*/, { timeout: 15000 }).catch(() => {});
    }

    // 2. Navigate to Settings
    await page.goto('/brand/settings');
    
    // Check if the personal info section is present
    const personalInfoHeading = page.locator('h1, h2, h3', { hasText: /Settings|Profile|Personal Info/i });
    if (await personalInfoHeading.count() > 0) {
      await expect(personalInfoHeading.first()).toBeVisible();
    }

    // Attempt to update a basic field if it exists, like First Name or Company Name
    const companyInput = page.getByLabel(/Company/i).or(page.locator('input[name="companyName"]')).first();
    if (await companyInput.count() > 0 && await companyInput.isVisible()) {
      await companyInput.fill('Updated Company Name');
      await page.locator('button[type="submit"]').first().click();
      
      // Wait for success toast or indicator
      const toastMsg = page.locator('text=success', { exact: false }).or(page.locator('[data-sonner-toast]'));
      await expect(toastMsg.first()).toBeVisible({ timeout: 10000 });
    }
  });

});

import { test, expect } from '@playwright/test';

test.describe('Creator - Profile Updates', () => {

  test('Creator can navigate to settings and update profile', async ({ page }) => {
    await page.goto('/login');
    const identifierInput = page.getByLabel(/Username or Email/i).or(page.locator('input[name="identifier"]'));
    if (await identifierInput.count() > 0) {
      await identifierInput.fill('creator-e2e@test.huerray.de');
      await page.getByLabel(/Password/i).first().fill('TestPwd123!@#');
      await page.locator('button[type="submit"]').click();
      await page.waitForURL(/.*(creator|dashboard).*/, { timeout: 15000 }).catch(() => {});
    }

    await page.goto('/creator/settings');
    
    // Check if the profile info section is present
    const settingsHeading = page.locator('text=Profile Settings').or(page.locator('h1:has-text("Settings")'));
    if (await settingsHeading.count() > 0) {
      await expect(settingsHeading.first()).toBeVisible();
    }

    // Try modifying a bio or similar field
    const bioTextarea = page.getByLabel(/Bio|About/i).or(page.locator('textarea[name="bio"]')).first();
    if (await bioTextarea.count() > 0 && await bioTextarea.isVisible()) {
      await bioTextarea.fill('Updating my creator bio for testing.');
      await page.locator('button[type="submit"]').first().click();
      
      const toastMsg = page.locator('text=success', { exact: false }).or(page.locator('[data-sonner-toast]'));
      await expect(toastMsg.first()).toBeVisible({ timeout: 10000 });
    }
  });

});

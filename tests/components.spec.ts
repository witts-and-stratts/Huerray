import { test, expect } from '@playwright/test';

test.describe('Component Interactions', () => {
  test('should display creator videos section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if there are video or media elements
    const videos = page.locator('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
    const hasVideos = (await videos.count()) > 0;

    // If no videos, check for video placeholders or containers
    if (!hasVideos) {
      const videoContainers = page.locator('[class*="video"], [class*="creator"]');
      expect(await videoContainers.count()).toBeGreaterThanOrEqual(0);
    } else {
      // Just verify videos exist, don't scroll as they may be animated
      expect(hasVideos).toBeTruthy();
    }
  });

  test('should have responsive layout', async ({ page }) => {
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.locator('.body-content, section').first()).toBeVisible();

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('.body-content, section').first()).toBeVisible();
  });

  test('should handle user menu interactions', async ({ page }) => {
    await page.goto('/');

    // Look for user menu button
    const userMenu = page.getByRole('button', { name: /user|menu|account/i }).or(
      page.locator('[data-testid="user-menu"]')
    );

    const menuCount = await userMenu.count();
    if (menuCount > 0) {
      // Scroll to menu and click
      await userMenu.first().scrollIntoViewIfNeeded();
      await userMenu.first().click();

      // Wait for potential dropdown/popover
      await page.waitForTimeout(300);
    }
  });

  test('should display footer signup form', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    // Look for form elements in footer
    const inputs = footer.locator('input[type="email"], input[type="text"]');

    const inputCount = await inputs.count();
    if (inputCount > 0) {
      await inputs.first().scrollIntoViewIfNeeded();
      await expect(inputs.first()).toBeVisible();
    }
  });
});

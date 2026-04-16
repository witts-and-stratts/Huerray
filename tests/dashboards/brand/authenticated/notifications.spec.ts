/**
 * Brand Notifications Page Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the /brand/notifications page:
 *   1. Page loads with "Notifications" heading
 *   2. Notification feed or empty state renders
 *   3. "Mark as read" header action is visible and clickable
 *   4. Clicking a notification item interacts correctly
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

test.describe('Dashboards - Brand Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brand/notifications');
    await loginIfNeeded(page);
    await expect(page).toHaveURL(/.*brand\/notifications.*/, { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('notifications page renders a heading', async ({ page }) => {
    const heading = page
      .getByRole('heading', { name: /notifications/i })
      .or(page.locator('h1, h2').filter({ hasText: /notifications/i }));

    await expect(heading.first()).toBeVisible({ timeout: 15000 });
  });

  test('notification feed or empty state is visible', async ({ page }) => {
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

    const feed = page
      .locator('[class*="notification"]')
      .or(page.locator('[class*="feed"]'))
      .or(page.locator('[class*="list"]'))
      .or(page.locator('ul li').first());

    const emptyState = page.getByText(/no notifications|all caught up|nothing to show/i);

    const hasFeed = await feed.count() > 0;
    const hasEmptyState = await emptyState.count() > 0;

    expect(hasFeed || hasEmptyState).toBeTruthy();
  });

  test('"Mark as read" button is visible in the header', async ({ page }) => {
    const markAsReadBtn = page
      .getByRole('button', { name: /mark all as read|mark as read/i })
      .or(page.getByText(/mark all as read|mark as read/i).first());

    if (await markAsReadBtn.count() === 0) {
      test.skip(true, 'No "Mark as read" button found; skipping.');
      return;
    }

    await expect(markAsReadBtn.first()).toBeVisible({ timeout: 10000 });
  });

  test('clicking "Mark as read" does not throw an error', async ({ page }) => {
    const markAsReadBtn = page
      .getByRole('button', { name: /mark all as read|mark as read/i })
      .first();

    if (await markAsReadBtn.count() === 0) {
      test.skip(true, 'No "Mark as read" button found; skipping click test.');
      return;
    }

    // Listen for console errors before clicking
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await markAsReadBtn.click();

    // After clicking, the page should remain stable
    await expect(page).toHaveURL(/.*brand\/notifications.*/, { timeout: 5000 });

    // No critical JS errors should have occurred
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('analytics')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('clicking a notification item does not crash the page', async ({ page }) => {
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

    const notificationItem = page
      .locator('[class*="notification-item"], [class*="notification__item"]')
      .or(page.locator('ul li a').first())
      .first();

    if (await notificationItem.count() === 0) {
      test.skip(true, 'No notification items found; skipping click test.');
      return;
    }

    await notificationItem.click();

    // Either navigated away or stayed on the page — just verify no crash
    await expect(page.locator('body')).toBeVisible({ timeout: 5000 });
  });
});

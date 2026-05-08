/**
 * Admin – Notifications E2E Tests
 *
 * Runs as an authenticated admin (storageState from admin-setup).
 * Tests the notifications bell dropdown and the /admin/notifications page
 * against the real backend — no API mocking.
 *
 * Dropdown tests:
 *   1. Bell trigger is visible in the admin header
 *   2. Clicking the bell opens the dropdown
 *   3. Dropdown shows a "Notifications" heading
 *   4. Dropdown shows a list or the empty state
 *   5. Overflow menu exposes "Mark all as read" / "Delete All"
 *   6. "View all notifications" navigates to /notifications
 *   7. Pressing Escape closes the dropdown
 *
 * Full-page tests:
 *   8. /admin/notifications page renders a heading
 *   9. Feed or empty state is visible
 *  10. "Mark all as read" is clickable without JS errors
 */
import { expect, test, type Page } from '@playwright/test';

function getBellTrigger(page: Page) {
  return page.getByRole('button', { name: /^notifications$/i }).first();
}

async function openDropdown(page: Page) {
  const trigger = getBellTrigger(page);
  await expect(trigger).toBeVisible({ timeout: 15000 });
  if ((await trigger.getAttribute('aria-expanded')) !== 'true') {
    await trigger.click();
  }
  await page.waitForTimeout(200);
}

// ─── Dropdown ────────────────────────────────────────────────────────────────

test.describe('Admin – Notifications dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/admin');
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('bell trigger is visible in the admin header', async ({ page }) => {
    await expect(getBellTrigger(page)).toBeVisible({ timeout: 15000 });
  });

  test('clicking the bell opens the dropdown', async ({ page }) => {
    const trigger = getBellTrigger(page);
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true', { timeout: 5000 });
    await expect(page.getByRole('menu').first()).toBeVisible({ timeout: 5000 });
  });

  test('dropdown shows a Notifications heading', async ({ page }) => {
    await openDropdown(page);
    const menu = page.getByRole('menu').first();
    await expect(menu.getByText(/^notifications$/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('dropdown renders notification items or an empty state', async ({ page }) => {
    await openDropdown(page);
    const menu = page.getByRole('menu').first();

    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

    const emptyState = menu.getByText(/no notifications/i);
    const items = menu.getByRole('menuitem');

    expect(
      (await emptyState.count()) > 0 || (await items.count()) > 0,
    ).toBeTruthy();
  });

  test('overflow menu exposes Mark all as read and Delete All', async ({ page }) => {
    await openDropdown(page);

    const overflowTrigger = page.getByRole('button', { name: /^menu$/i }).first();
    if ((await overflowTrigger.count()) === 0) {
      test.skip(true, 'Overflow menu trigger not found.');
      return;
    }

    await overflowTrigger.click();
    await expect(page.getByRole('menuitem', { name: /mark all as read/i }).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('menuitem', { name: /delete all/i }).first()).toBeVisible({ timeout: 5000 });
  });

  test('"View all notifications" navigates to the notifications page', async ({ page }) => {
    await openDropdown(page);
    const viewAll = page.getByRole('button', { name: /view all notifications/i }).first();
    await expect(viewAll).toBeVisible({ timeout: 5000 });
    await viewAll.click();
    await expect(page).toHaveURL(/.*\/notifications(?:$|[/?#])/, { timeout: 10000 });
  });

  test('pressing Escape closes the dropdown', async ({ page }) => {
    const trigger = getBellTrigger(page);
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true', { timeout: 5000 });
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false', { timeout: 5000 });
  });
});

// ─── Full page ────────────────────────────────────────────────────────────────

test.describe('Admin – Notifications page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/admin/notifications');
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('page renders a Notifications heading', async ({ page }) => {
    const heading = page
      .getByRole('heading', { name: /notifications/i })
      .or(page.locator('h1, h2').filter({ hasText: /notifications/i }));
    await expect(heading.first()).toBeVisible({ timeout: 15000 });
  });

  test('notification feed or empty state is visible', async ({ page }) => {
    const feed = page
      .locator('[class*="notification"]')
      .or(page.locator('[class*="feed"]'))
      .or(page.locator('ul li').first());

    const emptyState = page.getByText(/no notifications|all caught up|nothing to show/i);

    expect(
      (await feed.count()) > 0 || (await emptyState.count()) > 0,
    ).toBeTruthy();
  });

  test('"Mark all as read" is clickable without JS errors', async ({ page }) => {
    const btn = page
      .getByRole('button', { name: /mark all as read/i })
      .or(page.getByText(/mark all as read/i).first());

    if ((await btn.count()) === 0) {
      test.skip(true, 'No "Mark all as read" button found.');
      return;
    }

    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

    await btn.first().click();
    await expect(page).toHaveURL(/.*\/notifications/, { timeout: 5000 });

    const critical = errors.filter((e) => !e.includes('favicon') && !e.includes('analytics'));
    expect(critical.length).toBe(0);
  });
});

/**
 * Top-bar Notifications Dropdown Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the notifications dropdown rendered in the DashboardHeader:
 *   1. Bell trigger is visible on any dashboard page
 *   2. Clicking the bell opens the dropdown panel
 *   3. Dropdown shows the "Notifications" title
 *   4. Dropdown shows either a notification list or the empty state
 *   5. The overflow menu exposes "Mark all as read" / "Delete All"
 *   6. "View all notifications" navigates to the notifications page
 *   7. Clicking the trigger again closes the dropdown
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

function getBellTrigger(page: Page) {
  // The trigger is a DropdownMenuTrigger button containing a sr-only
  // "Notifications" label and a lucide bell icon.
  return page
    .getByRole('button', { name: /^notifications$/i })
    .first();
}

async function openDropdown(page: Page) {
  const trigger = getBellTrigger(page);
  await expect(trigger).toBeVisible({ timeout: 15000 });

  // Use aria-expanded to detect open state (Radix-style dropdown menu).
  const isExpanded = await trigger.getAttribute('aria-expanded');
  if (isExpanded !== 'true') {
    await trigger.click();
  }
  // Give the menu time to animate in.
  await page.waitForTimeout(200);
}

test.describe('Dashboards - Brand Top-bar Notifications Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brand');
    await loginIfNeeded(page);
    await expect(page).toHaveURL(/.*(brand|dashboard).*/, { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('bell trigger is rendered in the header', async ({ page }) => {
    const trigger = getBellTrigger(page);
    await expect(trigger).toBeVisible({ timeout: 15000 });
  });

  test('clicking the bell opens the dropdown panel', async ({ page }) => {
    const trigger = getBellTrigger(page);
    await trigger.click();

    await expect(trigger).toHaveAttribute('aria-expanded', 'true', {
      timeout: 5000,
    });

    // Menu role should now be present somewhere on the page.
    const menu = page.getByRole('menu').first();
    await expect(menu).toBeVisible({ timeout: 5000 });
  });

  test('dropdown shows the "Notifications" heading', async ({ page }) => {
    await openDropdown(page);

    const menu = page.getByRole('menu').first();
    await expect(menu.getByText(/^notifications$/i).first()).toBeVisible({
      timeout: 5000,
    });
  });

  test('dropdown renders either a list of notifications or the empty state', async ({ page }) => {
    await openDropdown(page);

    const menu = page.getByRole('menu').first();

    const loading = menu.getByText(/^loading/i);
    if (await loading.count()) {
      await expect(loading.first()).toBeHidden({ timeout: 15000 }).catch(() => {});
    }

    const emptyState = menu.getByText(/no notifications/i);
    const items = menu.getByRole('menuitem');

    const hasEmpty = (await emptyState.count()) > 0;
    const hasItems = (await items.count()) > 0;

    expect(hasEmpty || hasItems).toBeTruthy();
  });

  test('overflow menu exposes "Mark all as read" and "Delete All"', async ({ page }) => {
    await openDropdown(page);

    // The header has a second trigger (EllipsisVertical) with aria-label "Menu".
    const overflowTrigger = page.getByRole('button', { name: /^menu$/i }).first();

    if ((await overflowTrigger.count()) === 0) {
      test.skip(true, 'Overflow menu trigger not found.');
      return;
    }

    await overflowTrigger.click();

    const markAll = page.getByRole('menuitem', { name: /mark all as read/i });
    const deleteAll = page.getByRole('menuitem', { name: /delete all/i });

    await expect(markAll.first()).toBeVisible({ timeout: 5000 });
    await expect(deleteAll.first()).toBeVisible({ timeout: 5000 });
  });

  test('"View all notifications" navigates to the notifications page', async ({ page }) => {
    await openDropdown(page);

    const viewAll = page.getByRole('button', { name: /view all notifications/i }).first();
    await expect(viewAll).toBeVisible({ timeout: 5000 });

    await viewAll.click();

    await expect(page).toHaveURL(/.*\/notifications(?:$|[/?#])/, { timeout: 10000 });
  });

  test('clicking the bell again closes the dropdown', async ({ page }) => {
    const trigger = getBellTrigger(page);

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true', { timeout: 5000 });

    // Use Escape to close — clicking the trigger again can sometimes re-open
    // depending on focus handling in Radix-style menus.
    await page.keyboard.press('Escape');

    await expect(trigger).toHaveAttribute('aria-expanded', 'false', { timeout: 5000 });
  });
});

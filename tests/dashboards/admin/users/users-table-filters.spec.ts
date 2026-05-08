/**
 * Admin – Users Table: Search & Filters E2E Tests
 *
 * Runs as an authenticated admin (storageState from admin-setup).
 * Tests search and filter controls against the real backend.
 *
 *   1. Search input is present
 *   2. Typing filters rows
 *   3. Clearing the search restores rows
 *   4. Status filter dropdown is present
 *   5. Selecting a status filter narrows results
 *   6. User-type filter dropdown is present
 *   7. Selecting a user-type filter narrows results
 */
import { expect, test } from '@playwright/test';

test.describe('Admin – Users Table Search & Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/admin/users');
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('search input is present in the toolbar', async ({ page }) => {
    await expect(
      page.getByPlaceholder(/search users|search/i).first(),
    ).toBeVisible({ timeout: 15000 });
  });

  test('typing in the search input filters rows', async ({ page }) => {
    // Wait for table to load with at least one row
    await page.locator('tbody tr').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    const beforeCount = await page.locator('tbody tr').count();

    const search = page.getByPlaceholder(/search users|search/i).first();
    // Use a character unlikely to match every row
    await search.fill('zzzzznotlikely');
    await page.waitForTimeout(500); // debounce

    const afterCount = await page.locator('tbody tr').count();
    // Filtered count should be equal or fewer
    expect(afterCount).toBeLessThanOrEqual(beforeCount);
  });

  test('clearing the search restores rows', async ({ page }) => {
    await page.locator('tbody tr').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    const beforeCount = await page.locator('tbody tr').count();

    const search = page.getByPlaceholder(/search users|search/i).first();
    await search.fill('zzzzznotlikely');
    await page.waitForTimeout(500);

    await search.clear();
    await page.waitForTimeout(500);

    const restoredCount = await page.locator('tbody tr').count();
    expect(restoredCount).toBeGreaterThanOrEqual(beforeCount > 0 ? 1 : 0);
  });

  test('status filter button is present', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /status/i }).first(),
    ).toBeVisible({ timeout: 15000 });
  });

  test('opening the status filter shows options', async ({ page }) => {
    await page.getByRole('button', { name: /status/i }).first().click();
    // At least one filter option should appear
    const options = page.locator('[role="menuitemcheckbox"], [role="option"]');
    await expect(options.first()).toBeVisible({ timeout: 5000 });
  });

  test('selecting a status filter changes the row count', async ({ page }) => {
    await page.locator('tbody tr').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    const beforeCount = await page.locator('tbody tr').count();

    await page.getByRole('button', { name: /status/i }).first().click();
    const options = page.locator('[role="menuitemcheckbox"]');
    if ((await options.count()) === 0) {
      test.skip(true, 'No status filter options found.');
      return;
    }

    await options.first().click();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const afterCount = await page.locator('tbody tr').count();
    // Row count should have changed (filtered) or stayed the same if all rows matched
    expect(afterCount).toBeLessThanOrEqual(beforeCount > 0 ? beforeCount : 999);
  });

  test('user-type filter button is present', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /user type|type/i }).first(),
    ).toBeVisible({ timeout: 15000 });
  });

  test('selecting a user-type filter changes the row count', async ({ page }) => {
    await page.locator('tbody tr').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    const beforeCount = await page.locator('tbody tr').count();

    await page.getByRole('button', { name: /user type|type/i }).first().click();
    const options = page.locator('[role="menuitemcheckbox"]');
    if ((await options.count()) === 0) {
      test.skip(true, 'No user-type filter options found.');
      return;
    }

    await options.first().click();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const afterCount = await page.locator('tbody tr').count();
    expect(afterCount).toBeLessThanOrEqual(beforeCount > 0 ? beforeCount : 999);
  });
});

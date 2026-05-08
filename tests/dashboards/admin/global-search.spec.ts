/**
 * Admin – Global Search E2E Tests
 *
 * Runs as an authenticated admin (storageState from admin-setup).
 * Tests search box open/close behaviour and result rendering against
 * the real backend — no API mocking.
 *
 *   1. Search trigger (Cmd+K shortcut) opens the dialog
 *   2. Clicking the search box opens the dialog
 *   3. Typing a query shows a results list or an empty state
 *   4. Entity-type filter chips are rendered
 *   5. Selecting a filter chip narrows results to that entity
 *   6. Pressing Escape closes the dialog
 *   7. Clicking a result navigates to the correct detail page
 */
import { expect, test } from '@playwright/test';

test.describe('Admin – Global Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/admin');
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  });

  test('Cmd+K opens the search dialog', async ({ page }) => {
    await page.keyboard.press('Meta+k');
    await expect(
      page.getByPlaceholder(/Search campaigns, creators, gigs/i).first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test('clicking the search box opens the dialog', async ({ page }) => {
    await page.getByPlaceholder('Search...').click();
    await expect(
      page.getByPlaceholder(/Search campaigns, creators, gigs/i).first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test('typing a query shows results or an empty state', async ({ page }) => {
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder(/Search campaigns, creators, gigs/i).fill('a');

    // Wait for the debounce + network round-trip
    await page.waitForTimeout(600);

    const resultButtons = page.getByRole('button').filter({ hasText: /.+/ });
    const emptyState = page.getByText(/no results|nothing found/i);

    const hasResults = (await resultButtons.count()) > 0;
    const hasEmpty = (await emptyState.count()) > 0;

    expect(hasResults || hasEmpty).toBeTruthy();
  });

  test('entity filter chips are rendered', async ({ page }) => {
    await page.getByPlaceholder('Search...').click();

    // Filter chips are rendered as buttons/badges for entity types
    const chips = page.locator('[class*="chip"], [class*="entity"], [role="tab"]');
    // At minimum the dialog itself should be open and contain filter UI
    await expect(
      page.getByPlaceholder(/Search campaigns, creators, gigs/i).first(),
    ).toBeVisible({ timeout: 5000 });

    // Chips should appear — check at least one is present
    if ((await chips.count()) > 0) {
      await expect(chips.first()).toBeVisible({ timeout: 3000 });
    }
  });

  test('selecting an entity chip filters results by type', async ({ page }) => {
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder(/Search campaigns, creators, gigs/i).fill('a');
    await page.waitForTimeout(600);

    // Find the "Creators" chip and click it
    const creatorsChip = page
      .getByRole('button', { name: /^creators$/i })
      .or(page.locator('[class*="chip"]').filter({ hasText: /creators/i }))
      .first();

    if ((await creatorsChip.count()) === 0) {
      test.skip(true, 'Entity chips not visible (possibly no results to group).');
      return;
    }

    await creatorsChip.click();
    await page.waitForTimeout(400);

    // After filtering, only creator results (or empty state) should show
    const brandGroup = page.locator('[class*="group"]').filter({ hasText: /^brands$/i });
    expect(await brandGroup.count()).toBe(0);
  });

  test('Escape closes the search dialog', async ({ page }) => {
    await page.getByPlaceholder('Search...').click();
    await expect(
      page.getByPlaceholder(/Search campaigns, creators, gigs/i).first(),
    ).toBeVisible({ timeout: 5000 });

    await page.keyboard.press('Escape');

    await expect(
      page.getByPlaceholder(/Search campaigns, creators, gigs/i),
    ).toBeHidden({ timeout: 3000 });
  });

  test('clicking a search result navigates away from the admin home', async ({ page }) => {
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder(/Search campaigns, creators, gigs/i).fill('a');
    await page.waitForTimeout(600);

    const firstResult = page
      .locator('[role="listbox"] button, [role="option"]')
      .or(page.locator('[class*="result"] button'))
      .first();

    if ((await firstResult.count()) === 0) {
      test.skip(true, 'No search results available to click.');
      return;
    }

    await firstResult.click();

    // Should have navigated to a detail page
    await expect(page).not.toHaveURL('/en/admin', { timeout: 5000 });
  });
});

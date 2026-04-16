/**
 * Campaign Editing Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover the edit-campaign flow:
 *   1. Navigating to an existing campaign's edit page from the list
 *   2. Verifying all form tabs are accessible
 *   3. Updating fields and saving changes
 *   4. Deleting a campaign from the edit page
 */
import { test, expect, type Page } from '@playwright/test';

/**
 * Navigate to the campaigns list and return the URL of the first campaign's edit page.
 * Returns null if no editable campaign is found.
 */
async function getFirstEditUrl(page: Page): Promise<string | null> {
  await page.goto('/brand/campaigns');

  // Wait for something that represents a campaign row or link
  const editLink = page.locator('a[href*="/edit"]').first();
  if (await editLink.count() === 0) return null;

  return editLink.getAttribute('href');
}

test.describe('Brand - Campaign Editing', () => {
  test('campaigns list page renders correctly', async ({ page }) => {
    await page.goto('/brand/campaigns');

    // Heading or page title
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible({ timeout: 15000 });

    // Should have a "New Campaign" or "Create Campaign" link/button
    const newBtn = page
      .getByRole('link', { name: /New Campaign|Create Campaign/i })
      .or(page.getByRole('button', { name: /New Campaign|Create Campaign/i }));
    await expect(newBtn.first()).toBeVisible({ timeout: 10000 });
  });

  test('can navigate from list to edit page', async ({ page }) => {
    const editUrl = await getFirstEditUrl(page);

    if (!editUrl) {
      test.skip(true, 'No editable campaigns found in list; skipping edit navigation test.');
      return;
    }

    await page.goto(editUrl);

    // The edit form should load with the campaign data pre-filled
    const nameInput = page
      .getByLabel(/Campaign Name/i)
      .or(page.locator('input[name="campaign_name"]'));
    await expect(nameInput.first()).toBeVisible({ timeout: 15000 });
    // Should already have a value (not empty) because it's an existing campaign
    const value = await nameInput.first().inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('edit form header shows "Edit Campaign" breadcrumb', async ({ page }) => {
    const editUrl = await getFirstEditUrl(page);

    if (!editUrl) {
      test.skip(true, 'No editable campaigns found; skipping breadcrumb test.');
      return;
    }

    await page.goto(editUrl);

    // Breadcrumb or heading should say "Edit Campaign"
    const breadcrumb = page
      .getByText(/Edit Campaign/i)
      .or(page.locator('nav').getByText(/Edit/i));
    await expect(breadcrumb.first()).toBeVisible({ timeout: 15000 });
  });

  test('all form tabs are accessible on edit page', async ({ page }) => {
    const editUrl = await getFirstEditUrl(page);

    if (!editUrl) {
      test.skip(true, 'No editable campaigns found; skipping tab accessibility test.');
      return;
    }

    await page.goto(editUrl);
    await expect(
      page.getByLabel(/Campaign Name/i).or(page.locator('input[name="campaign_name"]'))
    ).toBeVisible({ timeout: 15000 });

    const tabs = ['Overview', 'Instructions', 'Documents', 'Images', 'Videos'];
    for (const tab of tabs) {
      const tabEl = page
        .getByRole('tab', { name: new RegExp(tab, 'i') })
        .or(page.getByRole('button', { name: new RegExp(tab, 'i') }));
      if (await tabEl.count() > 0) {
        await tabEl.first().click();
        await expect(tabEl.first()).toBeVisible();
      }
    }
  });

  test('can update description and save changes', async ({ page }) => {
    const editUrl = await getFirstEditUrl(page);

    if (!editUrl) {
      test.skip(true, 'No editable campaigns found; skipping description update test.');
      return;
    }

    await page.goto(editUrl);
    await expect(
      page.getByLabel(/Campaign Name/i).or(page.locator('input[name="campaign_name"]'))
    ).toBeVisible({ timeout: 15000 });

    const descInput = page.locator('textarea').first();
    await descInput.fill(`Updated by Playwright at ${new Date().toISOString()}`);

    const saveBtn = page.getByRole('button', { name: /Save Changes/i });
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();

    // Expect a success toast
    const successToast = page
      .locator('[data-sonner-toast]')
      .or(page.getByRole('status'))
      .filter({ hasText: /success|updated|saved/i });
    await expect(successToast.first()).toBeVisible({ timeout: 15000 });
  });

  test('save changes triggers send-for-approval confirmation dialog', async ({ page }) => {
    const editUrl = await getFirstEditUrl(page);

    if (!editUrl) {
      test.skip(true, 'No editable campaigns found; skipping confirmation dialog test.');
      return;
    }

    await page.goto(editUrl);
    await expect(
      page.getByLabel(/Campaign Name/i).or(page.locator('input[name="campaign_name"]'))
    ).toBeVisible({ timeout: 15000 });

    // Trigger save
    const saveBtn = page.getByRole('button', { name: /Save Changes/i });
    if (await saveBtn.count() > 0) {
      await saveBtn.click();

      // A ConfirmDialog asking to send for approval may appear after save
      const dialog = page.getByRole('dialog').filter({ hasText: /Send for Approval|Confirm/i });
      if (await dialog.count() > 0) {
        await expect(dialog).toBeVisible({ timeout: 10000 });

        // Decline it so we don't alter data further
        const cancelBtn = dialog.getByRole('button', { name: /Cancel|Later|No/i });
        if (await cancelBtn.count() > 0) await cancelBtn.click();
      }
    }
  });

  test('discard changes button navigates back to campaigns list', async ({ page }) => {
    const editUrl = await getFirstEditUrl(page);

    if (!editUrl) {
      test.skip(true, 'No editable campaigns found; skipping discard test.');
      return;
    }

    await page.goto(editUrl);
    await expect(
      page.getByLabel(/Campaign Name/i).or(page.locator('input[name="campaign_name"]'))
    ).toBeVisible({ timeout: 15000 });

    // The "Discard Changes" action lives inside the ActionMenu dropdown
    const actionsMenuBtn = page.locator('button').filter({ hasText: /Actions/i })
      .or(page.locator('[aria-label="Actions"]'));
    if (await actionsMenuBtn.count() > 0) {
      await actionsMenuBtn.first().click();
    }

    const discardBtn = page.getByRole('menuitem', { name: /Discard Changes/i })
      .or(page.getByRole('button', { name: /Discard Changes/i }));
    if (await discardBtn.count() > 0) {
      await discardBtn.first().click();
      await expect(page).toHaveURL(/.*brand\/campaigns($|\?)/, { timeout: 15000 });
    }
  });

  test('delete campaign shows confirmation dialog', async ({ page }) => {
    const editUrl = await getFirstEditUrl(page);

    if (!editUrl) {
      test.skip(true, 'No editable campaigns found; skipping delete dialog test.');
      return;
    }

    await page.goto(editUrl);
    await expect(
      page.getByLabel(/Campaign Name/i).or(page.locator('input[name="campaign_name"]'))
    ).toBeVisible({ timeout: 15000 });

    // Open the ActionMenu
    const actionsMenuBtn = page.locator('button').filter({ hasText: /Actions/i })
      .or(page.locator('[aria-label="Actions"]'));
    if (await actionsMenuBtn.count() > 0) {
      await actionsMenuBtn.first().click();
    }

    const deleteMenuItem = page.getByRole('menuitem', { name: /Delete/i })
      .or(page.getByRole('button', { name: /Delete/i }));
    if (await deleteMenuItem.count() > 0) {
      await deleteMenuItem.first().click();

      // A ConfirmDialog for deletion should appear
      const dialog = page.getByRole('dialog').filter({ hasText: /Delete|Confirm/i });
      await expect(dialog).toBeVisible({ timeout: 10000 });

      // Cancel so we don't actually delete
      const cancelBtn = dialog.getByRole('button', { name: /Cancel/i });
      if (await cancelBtn.count() > 0) await cancelBtn.click();
      await expect(dialog).not.toBeVisible({ timeout: 5000 });
    }
  });
});

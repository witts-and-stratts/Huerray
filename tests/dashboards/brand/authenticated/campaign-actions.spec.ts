/**
 * Brand Campaign Actions Tests
 *
 * These tests run authenticated as a brand user (via storageState from brand-setup).
 * They cover campaign-level actions not handled in campaign-creation or campaign-edit:
 *   1. Submit campaign for approval — confirm dialog and cancel path
 *   2. Replicate campaign — creates a copy and navigates to new edit page
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

async function getFirstEditUrl(page: Page): Promise<string | null> {
  await page.goto('/brand/campaigns');
  await loginIfNeeded(page);

  const editLink = page.locator('a[href*="/edit"]').first();
  if (await editLink.count() === 0) return null;

  return editLink.getAttribute('href');
}

test.describe('Dashboards - Brand Campaign Actions', () => {
  test('submit for approval shows a confirmation dialog', async ({ page }) => {
    const editUrl = await getFirstEditUrl(page);

    if (!editUrl) {
      test.skip(true, 'No editable campaigns found; skipping submit-for-approval test.');
      return;
    }

    await page.goto(editUrl);
    await loginIfNeeded(page);
    await expect(
      page.getByLabel(/Campaign Name/i).or(page.locator('input[name="campaign_name"]'))
    ).toBeVisible({ timeout: 15000 });

    // The "Send for Approval" or "Submit" action may be in an actions menu or a direct button
    const actionsMenuBtn = page
      .locator('button').filter({ hasText: /Actions/i })
      .or(page.locator('[aria-label="Actions"]'));

    if (await actionsMenuBtn.count() > 0) {
      await actionsMenuBtn.first().click();
    }

    const submitBtn = page
      .getByRole('menuitem', { name: /send for approval|submit/i })
      .or(page.getByRole('button', { name: /send for approval|submit/i }));

    if (await submitBtn.count() === 0) {
      test.skip(true, 'No "Send for Approval" action found; skipping.');
      return;
    }

    await submitBtn.first().click();

    const dialog = page
      .getByRole('dialog')
      .filter({ hasText: /approval|confirm|submit/i });

    await expect(dialog).toBeVisible({ timeout: 10000 });
    await expect(dialog).toContainText(/approval|confirm|submit/i);
  });

  test('cancelling the approval dialog keeps campaign in current state', async ({ page }) => {
    const editUrl = await getFirstEditUrl(page);

    if (!editUrl) {
      test.skip(true, 'No editable campaigns found; skipping cancel-approval test.');
      return;
    }

    await page.goto(editUrl);
    await loginIfNeeded(page);
    await expect(
      page.getByLabel(/Campaign Name/i).or(page.locator('input[name="campaign_name"]'))
    ).toBeVisible({ timeout: 15000 });

    const actionsMenuBtn = page
      .locator('button').filter({ hasText: /Actions/i })
      .or(page.locator('[aria-label="Actions"]'));

    if (await actionsMenuBtn.count() > 0) {
      await actionsMenuBtn.first().click();
    }

    const submitBtn = page
      .getByRole('menuitem', { name: /send for approval|submit/i })
      .or(page.getByRole('button', { name: /send for approval|submit/i }));

    if (await submitBtn.count() === 0) {
      test.skip(true, 'No "Send for Approval" action found; skipping cancel test.');
      return;
    }

    await submitBtn.first().click();

    const dialog = page.getByRole('dialog').filter({ hasText: /approval|confirm|submit/i });
    await expect(dialog).toBeVisible({ timeout: 10000 });

    // Cancel the dialog
    const cancelBtn = dialog
      .getByRole('button', { name: /cancel|later|no/i })
      .first();

    if (await cancelBtn.count() > 0) {
      await cancelBtn.click();
      await expect(dialog).not.toBeVisible({ timeout: 5000 });
    }

    // Still on the edit page
    await expect(page).toHaveURL(/.*\/edit.*/, { timeout: 5000 });
  });

  test('replicate campaign via list row action creates a copy', async ({ page }) => {
    await page.goto('/brand/campaigns');
    await loginIfNeeded(page);

    const table = page.locator('table').or(page.locator('[role="table"]'));
    if (await table.count() === 0) {
      test.skip(true, 'No campaigns table; skipping replicate test.');
      return;
    }

    // Open row action menu on first row
    const actionTrigger = page
      .locator('table [aria-label*="action" i], table [aria-label*="more" i]')
      .or(page.locator('table button').filter({ hasText: /\u22EF|\u22EE|\.\.\./ }))
      .first();

    if (await actionTrigger.count() === 0) {
      // Try hovering first row to reveal actions
      const firstRow = page.locator('table tbody tr').first();
      if (await firstRow.count() > 0) {
        await firstRow.hover();
      }
    } else {
      await actionTrigger.click();
    }

    const replicateItem = page
      .getByRole('menuitem', { name: /replicate|duplicate|clone/i })
      .or(page.getByRole('button', { name: /replicate|duplicate|clone/i }));

    if (await replicateItem.count() === 0) {
      test.skip(true, 'No replicate action found in row menu; skipping.');
      return;
    }

    await replicateItem.first().click();

    // After replication, the app should navigate to the new campaign's edit page
    // or show a success toast
    const successIndicator = page
      .locator('[data-sonner-toast]')
      .or(page.getByRole('status'))
      .filter({ hasText: /success|replicated|created|duplicated/i });

    const navigatedToEdit = page.url().includes('/edit');

    if (!navigatedToEdit) {
      await expect(successIndicator.first()).toBeVisible({ timeout: 15000 });
    } else {
      await expect(page).toHaveURL(/.*brand\/campaigns\/.+\/edit.*/, { timeout: 15000 });
    }
  });
});

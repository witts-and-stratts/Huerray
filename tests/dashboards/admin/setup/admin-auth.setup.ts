import { expect, test } from '@playwright/test';
import { ADMIN_AUTH_FILE, ADMIN_USER, ADMIN_PASSWORD, loginAs } from '../helpers/auth';

test('authenticate as admin', async ({ page }) => {
  await loginAs(page, ADMIN_USER, ADMIN_PASSWORD);

  await expect(page).toHaveURL(/.*(admin|dashboard).*/, { timeout: 20000 });

  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});

  await page.context().storageState({ path: ADMIN_AUTH_FILE });
});

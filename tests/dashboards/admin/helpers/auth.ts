import path from 'path';
import { type Page } from '@playwright/test';

export const ADMIN_AUTH_FILE = path.join(__dirname, '../../../.auth/admin.json');

export const ADMIN_USER = process.env.E2E_ADMIN_USERNAME ?? 'test-admin@example.com';
export const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'randompassword';

export const CREATOR_USER = process.env.E2E_CREATOR_USERNAME ?? 'test-creator@test.huerray.de';
export const CREATOR_PASSWORD = process.env.E2E_CREATOR_PASSWORD ?? 'randompassword';

export const BRAND_USER = process.env.E2E_BRAND_USERNAME ?? 'test-brand-user@test.com';
export const BRAND_PASSWORD = process.env.E2E_BRAND_PASSWORD ?? 'randompassword';

export async function loginAs(page: Page, identifier: string, password: string) {
  await page.goto('/en/login');
  await page
    .getByLabel(/Email or Username|Username or Email/i)
    .first()
    .fill(identifier);
  await page.getByLabel(/Password/i).first().fill(password);
  await page.locator('button[type="submit"]').click();
}

export async function loginIfRedirected(page: Page, identifier: string, password: string) {
  if (!/\/login(?:$|\?)/.test(page.url())) return;
  await loginAs(page, identifier, password);
}

/** Signs up a brand user. The signup form shows a toast on success rather than
 * navigating; callers should follow up by verifying the user's email and
 * navigating to /brand explicitly. */
export async function signUpBrand(page: Page, email: string, password: string) {
  await page.goto('/en/signup?role=brand');
  await page.getByLabel(/First Name/i).first().fill('Test');
  await page.getByLabel(/Last Name/i).first().fill('Brand');
  await page.getByLabel(/Email/i).first().fill(email);
  await page.getByLabel(/^Password/i).first().fill(password);
  await page.getByLabel(/Confirm Password/i).first().fill(password);
  const submit = page.locator('button[type="submit"]').first();
  await submit.waitFor({ state: 'visible' });
  await submit.click();
}

/** Signs up a creator user. */
export async function signUpCreator(page: Page, email: string, password: string) {
  await page.goto('/en/signup?role=creator');
  await page.getByLabel(/First Name/i).first().fill('Test');
  await page.getByLabel(/Last Name/i).first().fill('Creator');
  await page.getByLabel(/Email/i).first().fill(email);
  await page.getByLabel(/^Password/i).first().fill(password);
  await page.getByLabel(/Confirm Password/i).first().fill(password);
  const submit = page.locator('button[type="submit"]').first();
  await submit.waitFor({ state: 'visible' });
  await submit.click();
}

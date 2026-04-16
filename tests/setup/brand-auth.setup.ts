import { test as setup, expect } from '@playwright/test';
import path from 'path';

export const BRAND_AUTH_FILE = path.join(__dirname, '../.auth/brand.json');

const DEFAULT_PASSWORD = process.env.BRAND_E2E_PASSWORD ?? 'TestPwd123!@#';
const DEFAULT_USER = process.env.BRAND_E2E_USER ?? 'brand-e2e@test.huerray.de';

async function fillLoginForm(page: import('@playwright/test').Page, identifier: string, password: string) {
  const identifierInput = page
    .getByLabel(/Email or Username/i)
    .or(page.getByLabel(/Username or Email/i))
    .or(page.locator('input[name="identifier"]'));

  await identifierInput.first().fill(identifier);
  await page.getByLabel(/Password/i).first().fill(password);
}

async function login(page: import('@playwright/test').Page, identifier: string, password: string) {
  await page.goto('/login');
  await fillLoginForm(page, identifier, password);
  await page.locator('button[type="submit"]').click();
}

async function loginSucceeded(page: import('@playwright/test').Page) {
  try {
    await page.waitForURL(/.*(brand|dashboard).*/, { timeout: 10000 });
    return true;
  } catch {
    return false;
  }
}

async function createBrandUser(page: import('@playwright/test').Page, email: string, password: string) {
  const timestamp = Date.now();
  const username = `branduser${timestamp}`;

  await page.goto('/signup?role=brand');

  await page.getByLabel(/First Name/i).first().fill('Test');
  await page.getByLabel(/Last Name/i).first().fill('Brand');
  await page.getByLabel(/Username/i).first().fill(username);
  await page.getByLabel(/Email/i).first().fill(email);
  await page.getByLabel(/^Password/i).first().fill(password);
  await page.getByLabel(/Confirm Password/i).first().fill(password);

  const submitButton = page.locator('button[type="submit"]').first();
  await expect(submitButton).toBeEnabled({ timeout: 10000 });
  await submitButton.click();

  await expect(page).toHaveURL(/.*(brand|dashboard).*/, { timeout: 20000 });
}

setup('authenticate as brand user', async ({ page }) => {
  await login(page, DEFAULT_USER, DEFAULT_PASSWORD);

  if (!(await loginSucceeded(page))) {
    try {
      await createBrandUser(page, DEFAULT_USER, DEFAULT_PASSWORD);
    } catch {
      await createBrandUser(page, `brand-e2e+${Date.now()}@test.huerray.de`, DEFAULT_PASSWORD);
    }
  }

  await expect(page).toHaveURL(/.*(brand|dashboard).*/, { timeout: 20000 });
  await page.context().storageState({ path: BRAND_AUTH_FILE });
});

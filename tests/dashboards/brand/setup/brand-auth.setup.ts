import { test, expect } from '@playwright/test';
import path from 'path';
import { Page } from '@playwright/test';
import { verifyUserEmail } from '../../../common/helpers/verification';

// Signing up + verifying + dashboard hydration easily exceeds Playwright's
// default 30s test timeout when the existing-user login attempt also waits.
test.setTimeout(120_000);

export const BRAND_AUTH_FILE = path.join(__dirname, '../../../.auth/brand.json');

const DEFAULT_PASSWORD = process.env.E2E_BRAND_PASSWORD ?? 'TestPwd123!@#';
const DEFAULT_USER = process.env.E2E_BRAND_USERNAME ?? 'brand-e2e@test.huerray.de';

async function fillLoginForm(page: Page, identifier: string, password: string) {
  const identifierInput = page
    .getByLabel(/Email or Username/i)
    .or(page.getByLabel(/Username or Email/i))
    .or(page.locator('input[name="identifier"]'));

  await identifierInput.first().fill(identifier);
  await page.getByLabel(/Password/i).first().fill(password);
}

async function login(page: Page, identifier: string, password: string) {
  await page.goto('/login');
  await fillLoginForm(page, identifier, password);
  await page.locator('button[type="submit"]').click();
}

async function loginSucceeded(page: Page) {
  try {
    await page.waitForURL(/\/(?:[a-z]{2}\/)?(brand|dashboard)/, { timeout: 10000 });
    return true;
  } catch {
    return false;
  }
}

async function createBrandUser(page: Page, email: string, password: string) {
  await page.goto('/signup?role=brand');

  await page.getByLabel(/First Name/i).first().fill('Test');
  await page.getByLabel(/Last Name/i).first().fill('Brand');
  await page.getByLabel(/Email/i).first().fill(email);
  await page.getByLabel(/^Password/i).first().fill(password);
  await page.getByLabel(/Confirm Password/i).first().fill(password);

  const submitButton = page.locator('button[type="submit"]').first();
  await expect(submitButton).toBeEnabled({ timeout: 10000 });
  await submitButton.click();

  // The signup form does not navigate on its own — it stores the new user in
  // the `userData` cookie via AuthProvider and surfaces a success toast.
  // Waiting on that cookie is the most reliable success signal.
  await expect
    .poll(
      async () => {
        const cookies = await page.context().cookies();
        return cookies.some((c) => c.name === 'userData');
      },
      { timeout: 20_000, message: 'signup did not set the userData cookie' },
    )
    .toBe(true);
}

test('authenticate as brand user', async ({ page, request }) => {
  await login(page, DEFAULT_USER, DEFAULT_PASSWORD);

  if (!(await loginSucceeded(page))) {
    // Always use a unique email when falling back to signup — the configured
    // DEFAULT_USER may already be registered from a previous run.
    const activeEmail = `brand-e2e+${Date.now()}@test.huerray.de`;
    await createBrandUser(page, activeEmail, DEFAULT_PASSWORD);

    // Mark the user's email as verified using the dev-only test endpoint.
    await verifyUserEmail(request, activeEmail);

    // Navigate to the dashboard explicitly — the signup form shows a toast
    // rather than auto-redirecting.
    await page.goto('/brand');
  }

  await expect(page).toHaveURL(/\/(?:[a-z]{2}\/)?(brand|dashboard)/, { timeout: 20000 });

  // Wait for the dashboard to fully render before saving state — prevents
  // tests from loading storageState mid-render and seeing stale dashboard content.
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});

  await page.context().storageState({ path: BRAND_AUTH_FILE });
});

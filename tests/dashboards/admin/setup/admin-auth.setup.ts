import { expect, test } from '@playwright/test';
import { ADMIN_AUTH_FILE, ADMIN_USER, ADMIN_PASSWORD, loginAs } from '../helpers/auth';
import { API_BASE_URL, verifyUserEmail } from '../../../common/helpers/verification';

// Setup involves: API probes + admin bootstrap + UI login + dashboard hydration.
// The default 30s isn't enough; give it room so the dependent admin suite runs.
test.setTimeout(120_000);

const MAIN_ADMIN_USERNAME = process.env.E2E_MAIN_ADMIN_USERNAME ?? 'admin';
const MAIN_ADMIN_PASSWORD = process.env.E2E_MAIN_ADMIN_PASSWORD ?? '';

interface AdminCreds {
  username: string;
  password: string;
}

/**
 * Resolve a working admin login.
 *
 * Strategy:
 *   1. Try the test admin configured via E2E_ADMIN_USERNAME / E2E_ADMIN_PASSWORD.
 *   2. Fall back to the main system admin (E2E_MAIN_ADMIN_*).
 *   3. As a last resort, sign in as the main admin and provision a fresh
 *      test admin via the same `POST /users` endpoint the dashboard's
 *      "Create user" action calls.
 */
async function resolveAdminCreds(
  request: import('@playwright/test').APIRequestContext,
): Promise<AdminCreds | null> {
  const tryLogin = async (creds: AdminCreds) => {
    const resp = await request.post(`${API_BASE_URL}/auth/login`, {
      data: { username: creds.username, password: creds.password },
      failOnStatusCode: false,
    });
    return resp.ok();
  };

  const candidate: AdminCreds = { username: ADMIN_USER, password: ADMIN_PASSWORD };
  if (await tryLogin(candidate)) return candidate;

  if (!MAIN_ADMIN_PASSWORD) return null;

  const main: AdminCreds = { username: MAIN_ADMIN_USERNAME, password: MAIN_ADMIN_PASSWORD };
  if (!(await tryLogin(main))) return null;

  // Bootstrap a fresh admin so we don't pollute storage state with the
  // system admin's session. The cookies from the main admin's login above
  // travel on the shared APIRequestContext, satisfying `POST /users` auth.
  const ts = Date.now();
  const provisioned: AdminCreds = {
    username: `e2e-admin-${ts}@test.huerray.de`,
    password: ADMIN_PASSWORD,
  };
  const create = await request.post(`${API_BASE_URL}/users`, {
    data: {
      email: provisioned.username,
      first_name: 'Test',
      last_name: 'Admin',
      password: provisioned.password,
      verify_password: provisioned.password,
      username: `e2eadmin${ts}`,
    },
    failOnStatusCode: false,
  });
  if (!create.ok()) return main;

  return (await tryLogin(provisioned)) ? provisioned : main;
}

test('authenticate as admin', async ({ page, request }) => {
  const creds = await resolveAdminCreds(request);

  test.skip(
    !creds,
    `Could not authenticate as any admin — set E2E_MAIN_ADMIN_PASSWORD (and optionally seed E2E_ADMIN_USERNAME) so the admin suite has a session.`,
  );

  await verifyUserEmail(request, creds!.username);

  await loginAs(page, creds!.username, creds!.password);

  await expect(page).toHaveURL(/\/(?:[a-z]{2}\/)?(admin|dashboard)/, { timeout: 20000 });

  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});

  await page.context().storageState({ path: ADMIN_AUTH_FILE });
});

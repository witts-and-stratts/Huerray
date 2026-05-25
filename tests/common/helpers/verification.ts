/**
 * Email verification helpers for tests.
 *
 * Uses the dev-only `/auth/test/verification-token` endpoint to obtain
 * the active email verification token for a freshly registered user,
 * then submits it to `/auth/verify-email` to mark the user as verified.
 */
import type { APIRequestContext } from '@playwright/test';

// `NEXT_PUBLIC_API_BASE_URL` may be a same-origin path (e.g. `/api/v1`)
// proxied by Next.js to the real backend. Playwright's request fixture
// resolves relative URLs against the configured `baseURL`, so we just pass
// the value through unchanged.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://backend.huerray.de/api/v1';

interface JsonResponse {
  data?: { token?: string } | string | null;
  token?: string;
  message?: string;
  success?: boolean;
}

async function safeJson(response: { ok: () => boolean; json: () => Promise<unknown> }): Promise<JsonResponse> {
  try {
    return (await response.json()) as JsonResponse;
  } catch {
    return {};
  }
}

/**
 * Fetch the active email verification token for the given email.
 * Returns null when the endpoint reports no token (e.g. already verified).
 */
export async function fetchVerificationToken(
  request: APIRequestContext,
  email: string,
): Promise<string | null> {
  const response = await request.get(
    `${API_BASE_URL}/auth/test/verification-token`,
    {
      params: { email },
      failOnStatusCode: false,
    },
  );

  if (!response.ok()) return null;

  const body = await safeJson(response);
  if (typeof body?.data === 'string') return body.data;
  if (body?.data && typeof body.data === 'object' && 'token' in body.data) {
    return body.data.token ?? null;
  }
  return body?.token ?? null;
}

/**
 * Verify a user's email by retrieving the test verification token and
 * exchanging it via `/auth/verify-email`. Safe to call multiple times —
 * returns silently when the user is already verified.
 */
export async function verifyUserEmail(
  request: APIRequestContext,
  email: string,
): Promise<void> {
  const token = await fetchVerificationToken(request, email);
  if (!token) return;

  await request.post(`${API_BASE_URL}/auth/verify-email`, {
    data: { token },
    failOnStatusCode: false,
  });
}

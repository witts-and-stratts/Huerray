/**
 * Application configuration.
 *
 * All values are loaded from environment variables (see .env.example).
 * NEXT_PUBLIC_ variables are available on both server and client.
 */
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://backend.huerray.de/api/v1',
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 120_000),
  },
  polling: {
    /** Notification list refetch interval in ms (default 30 s) */
    notificationsInterval: Number(process.env.NEXT_PUBLIC_NOTIFICATIONS_REFETCH_INTERVAL ?? 60 * 5 * 1000),
    /** Auth-guard background profile refresh interval in ms (default 30 min) */
    profileRefreshInterval: Number(process.env.NEXT_PUBLIC_PROFILE_REFRESH_INTERVAL ?? 60 * 30 * 1000),
  },
} as const;

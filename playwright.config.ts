import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry once locally to absorb cold-compile flakes; CI keeps 2 retries. */
  retries: process.env.CI ? 2 : 1,

  /* Opt out of parallel tests on CI. Keep local parallelism modest — the
   * Next.js dev server gets slow under heavy concurrent navigation, which
   * cascades into test-level timeouts that look like flaky assertions. */
  workers: process.env.CI ? 1 : 3,

  /* Generous default timeouts to absorb cold dev-server compilation on first
   * hit per route and the occasional slow assertion under parallel load. */
  timeout: 90_000,
  expect: { timeout: 15_000 },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'html' : 'list',

  /* Keep local test artifacts out of tracked Playwright report/result folders. */
  outputDir: '.playwright-results',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // Auth setup — runs first, saves brand session to disk
    {
      name: 'brand-setup',
      testMatch: /dashboards\/brand\/setup\/brand-auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // Auth setup — runs first, saves admin session to disk
    {
      name: 'admin-setup',
      testMatch: /dashboards\/admin\/setup\/admin-auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // Authenticated brand tests — depend on saved session
    {
      name: 'brand',
      testMatch: /tests\/dashboards\/brand\/authenticated\/.+\.spec\.ts/,
      dependencies: ['brand-setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/.auth/brand.json',
      },
    },

    // Authenticated admin tests — depend on saved admin session
    {
      name: 'admin',
      testMatch: /tests\/dashboards\/admin\/(?!setup).+\.spec\.ts/,
      dependencies: ['admin-setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/.auth/admin.json',
      },
    },

    // Everything else (unauthenticated / auth suite)
    {
      name: 'chromium',
      testIgnore: [
        /tests\/dashboards\/brand\/authenticated\/.+\.spec\.ts/,
        /tests\/dashboards\/admin\/(?!setup).+\.spec\.ts/,
      ],
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

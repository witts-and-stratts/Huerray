import type { Locator, Page } from '@playwright/test';

/**
 * Wait for a data-table page to finish its initial hydration.
 *
 * Brand & admin dashboard tables are TanStack-driven and only mount the
 * `<table>` once the React-Query call resolves. Many tests previously
 * sampled `locator('table').count()` immediately after `goto()` and
 * hit a race where the table hadn't appeared yet. This helper races a
 * visible table against any visible empty/loading-finished signal so the
 * caller can branch on the result deterministically.
 */
export async function waitForTableOrEmpty(
  page: Page,
  options: {
    /** Override default empty-state text matchers. */
    emptyMatchers?: RegExp[];
    timeout?: number;
  } = {},
): Promise<'table' | 'empty'> {
  const emptyMatchers = options.emptyMatchers ?? [
    /no .* found/i,
    /no campaigns/i,
    /no creators/i,
    /no invoices/i,
    /no brands/i,
    /no users/i,
    /no notifications/i,
    /no submissions/i,
    /get started/i,
    /create your first/i,
    /ready to launch/i,
  ];
  const timeout = options.timeout ?? 30_000;

  const table = page.locator('table, [role="table"]');
  const empty = page
    .locator('[class*="empty-state"]')
    .or(page.locator('[data-empty-state="true"]'));

  const matchers: Promise<'table' | 'empty'>[] = [
    table
      .first()
      .waitFor({ state: 'visible', timeout })
      .then(() => 'table' as const),
    empty
      .first()
      .waitFor({ state: 'visible', timeout })
      .then(() => 'empty' as const),
  ];

  for (const pattern of emptyMatchers) {
    matchers.push(
      page
        .getByText(pattern)
        .first()
        .waitFor({ state: 'visible', timeout })
        .then(() => 'empty' as const),
    );
  }

  return Promise.race(matchers).catch(() => {
    // If neither appears, return based on whatever rendered last.
    return 'empty' as const;
  });
}

export function tableLocator(page: Page): Locator {
  return page.locator('table, [role="table"]').first();
}

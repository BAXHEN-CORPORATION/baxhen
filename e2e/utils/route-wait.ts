/**
 * Route Wait Utility
 *
 * Helpers for waiting on Next.js client-side navigation (router.push).
 * Funnel steps transition via timeout-based router.push, which
 * triggers client-side navigation without full page reload.
 */

import type { Page } from "@playwright/test";

/**
 * Wait for the page URL to match the expected path.
 * Handles Next.js client-side navigation timings.
 */
export async function waitForRoute(
  page: Page,
  expectedPath: string,
  timeout = 10_000,
) {
  await page.waitForURL(`**${expectedPath}`, { timeout });
}

/**
 * Wait for navigation triggered by a click or action.
 * Returns when the URL changes to match the expected path.
 */
export async function waitForNavigation(
  page: Page,
  expectedPath: string,
  timeout = 10_000,
) {
  await page.waitForURL(`**${expectedPath}`, { timeout });
}

/**
 * Assert the current page URL ends with the expected path.
 */
export async function assertRoute(page: Page, expectedPath: string) {
  const url = page.url();
  const path = new URL(url).pathname;
  if (!path.endsWith(expectedPath) && path !== expectedPath) {
    throw new Error(
      `Expected route "${expectedPath}" but got "${path}" (full URL: ${url})`,
    );
  }
}

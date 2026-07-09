/**
 * Time Fake Utility
 *
 * Playwright Clock API helpers for skipping script-driven delays.
 * Funnel scripts have ~15+ sequenced delays (800ms–1200ms each).
 * Real timers would make each test 20-30s. The Clock API
 * (`page.clock.fastForward()`) runs the full dossier script in under 1s.
 *
 * Usage:
 *   import { installFakeTimers, fastForward } from "@/e2e/utils/time-fake";
 *   test.beforeEach(async ({ page }) => {
 *     await installFakeTimers(page);
 *   });
 *   // Skip all pending timers:
 *   await fastForward(page, 30_000); // advance 30 seconds
 */

/**
 * Install fake timers before navigating to the page.
 * Must be called before page.goto() to intercept all timers.
 */
export async function installFakeTimers(
  page: import("@playwright/test").Page,
) {
  await page.clock.install();
}

/**
 * Fast-forward time by the given milliseconds.
 * All pending setTimeout/setInterval callbacks fire in sequence.
 */
export async function fastForward(
  page: import("@playwright/test").Page,
  ms: number,
) {
  await page.clock.fastForward(ms);
}

/**
 * Advance time by a specific amount and pause.
 * Unlike fastForward, this fires only timers that would fire within `ms`.
 */
export async function advanceTime(
  page: import("@playwright/test").Page,
  ms: number,
) {
  await page.clock.runFor(ms);
}

/**
 * Resume real timers (if needed for specific test).
 */
export async function uninstallFakeTimers(
  page: import("@playwright/test").Page,
) {
  await page.clock.resume();
}

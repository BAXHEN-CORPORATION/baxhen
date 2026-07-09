/**
 * Test Helpers
 *
 * ECC-style hermetic test context helpers. Each test gets an isolated
 * page context to prevent state leakage between tests.
 */

import { test as base, type Page } from "@playwright/test";
import { mockAudio } from "./audio-mock";
import { installFakeTimers } from "./time-fake";

/**
 * Extended test fixture that automatically mocks audio
 * and installs fake timers for every test.
 *
 * Usage:
 *   import { funnelTest } from "@/e2e/utils/test-helpers";
 *   funnelTest("my test", async ({ page }) => { ... });
 */
export const funnelTest = base.extend({
  page: async ({ page }, use) => {
    // Mock audio before any navigation
    await mockAudio(page);
    // Use real timers by default — individual tests opt into fake timers
    await use(page);
  },
});

/**
 * Create a hermetic page context with audio mocked and fake timers.
 * Use for tests that need to skip script-driven delays.
 */
export async function withHermeticPage(
  page: Page,
  fn: (page: Page) => Promise<void>,
) {
  await mockAudio(page);
  await installFakeTimers(page);
  await fn(page);
}

export { expect } from "@playwright/test";

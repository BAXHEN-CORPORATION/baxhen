import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for Baxhen E2E funnel testing.
 *
 * Uses Next.js 16 testmode (next/experimental/testmode/playwright) for
 * server lifecycle and request interception. See E2E Testing Strategy
 * in FUNNEL-ARCHITECTURE.md.
 */
export default defineConfig({
  testDir: "./e2e/specs",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { open: "never" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["json", { outputFile: "test-results/results.json" }],
    ["list"],
  ],
  timeout: 30_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // Mobile viewport — funnel is mobile-first
    {
      name: "mobile-chrome",
      use: { ...devices["iPhone 12"] },
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});

/**
 * Next.js 16 Testmode Fixtures
 *
 * Re-exports from next/experimental/testmode/playwright.
 * These provide Playwright fixtures for Next.js server lifecycle
 * and request interception during E2E tests.
 *
 * When the experimental API is stabilized, this file can be
 * updated to import from the stable path.
 */

// Next.js 16 experimental testmode — provides server lifecycle fixtures
// import { test as nextTest } from "next/experimental/testmode/playwright";
// export { nextTest };

// For now, use standard Playwright test as the base.
// The Next.js testmode fixtures can be layered on top when needed
// for server-side testing (API routes, middleware, etc.).
export { test, expect } from "@playwright/test";

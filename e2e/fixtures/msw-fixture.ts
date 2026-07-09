/**
 * MSW (Mock Service Worker) Fixture
 *
 * Re-exports from next/experimental/testmode/playwright/msw.
 * When API routes are added to Baxhen, this enables mocking
 * them in E2E tests without starting a real backend.
 *
 * Usage (future):
 *   import { test, msw } from "@/e2e/fixtures/msw-fixture";
 *   test("with mocked API", async ({ page, msw }) => {
 *     msw.http.get("/api/**", () => Response.json({ ... }));
 *   });
 */

// import { msw } from "next/experimental/testmode/playwright/msw";
// export { msw };

// For now, placeholder. Will be activated when API routes are added.
export {};

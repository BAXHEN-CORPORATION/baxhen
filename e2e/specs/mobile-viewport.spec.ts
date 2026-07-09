/**
 * Mobile Viewport Tests
 *
 * Validates funnel renders correctly on mobile device viewports.
 * The funnel is mobile-first — all pages should render without
 * horizontal overflow and with proper tap targets.
 */
import { test, expect, devices } from "@playwright/test";
import {
  ReadyPage,
  HijackedCallPage,
  InvisibilityDossierPage,
} from "@/e2e/fixtures/pages";
import { mockAudio } from "@/e2e/utils/audio-mock";

const MOBILE_VIEWPORTS = [
  { name: "iPhone SE", ...devices["iPhone SE"] },
  { name: "iPhone 12", ...devices["iPhone 12"] },
  { name: "Pixel 5", ...devices["Pixel 5"] },
];

for (const viewport of MOBILE_VIEWPORTS) {
  test.describe(`Mobile — ${viewport.name}`, () => {
    test.use({ ...viewport });

    test.beforeEach(async ({ page }) => {
      await mockAudio(page);
    });

    test("ready page has no horizontal overflow", async ({ page }) => {
      const ready = new ReadyPage(page);
      await ready.goto();
      await ready.waitForReady();

      // Check no element overflows the viewport horizontally
      const bodyWidth = await page.evaluate(
        () => document.body.scrollWidth,
      );
      const viewportWidth = viewport.viewport?.width ?? 390;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // 1px tolerance
    });

    test("ready page BEGIN button meets tap target", async ({ page }) => {
      const ready = new ReadyPage(page);
      await ready.goto();
      await ready.waitForReady();

      const box = await ready.beginButton.boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44); // WCAG 2.5.5
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    });

    test("hijacked call page fits mobile viewport", async ({ page }) => {
      const call = new HijackedCallPage(page);
      await call.goto();
      await call.waitForIncoming();

      // Answer button is visible in viewport
      await expect(call.answerButton).toBeInViewport();

      // No horizontal overflow
      const bodyWidth = await page.evaluate(
        () => document.body.scrollWidth,
      );
      const viewportWidth = viewport.viewport?.width ?? 390;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
    });

    test("invisibility dossier page fits mobile viewport", async ({
      page,
    }) => {
      const dossier = new InvisibilityDossierPage(page);
      await dossier.goto();

      // Header is visible
      await expect(dossier.contactName).toBeVisible();

      // No horizontal overflow
      const bodyWidth = await page.evaluate(
        () => document.body.scrollWidth,
      );
      const viewportWidth = viewport.viewport?.width ?? 390;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
    });
  });
}

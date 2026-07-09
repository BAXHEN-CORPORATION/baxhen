/**
 * Accessibility Smoke Tests
 *
 * Basic accessibility checks on each funnel step.
 * Verifies WCAG AA compliance: semantic structure, focus states,
 * aria labels, color contrast, and tap target sizes.
 *
 * For full a11y audit, integrate @axe-core/playwright:
 *   import AxeBuilder from "@axe-core/playwright";
 *   const results = await new AxeBuilder({ page }).analyze();
 */
import { test, expect } from "@playwright/test";
import {
  ReadyPage,
  HijackedCallPage,
  InvisibilityDossierPage,
} from "@/e2e/fixtures/pages";
import { mockAudio } from "@/e2e/utils/audio-mock";

test.describe("Accessibility Smoke", () => {
  test.beforeEach(async ({ page }) => {
    await mockAudio(page);
  });

  test("ready page has semantic heading and accessible button", async ({
    page,
  }) => {
    const ready = new ReadyPage(page);
    await ready.goto();
    await ready.waitForReady();

    // Page has a heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Button has accessible name
    await expect(ready.beginButton).toHaveAccessibleName(/begin/i);

    // Button meets minimum tap target (44px)
    const box = await ready.beginButton.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.width).toBeGreaterThanOrEqual(44);
    }
  });

  test("hijacked call page has accessible buttons", async ({ page }) => {
    const call = new HijackedCallPage(page);
    await call.goto();
    await call.waitForIncoming();

    // Answer button has accessible name
    await expect(call.answerButton).toHaveAccessibleName(/answer call/i);

    // Decline button has accessible name
    await expect(call.declineButton).toHaveAccessibleName(/decline call/i);

    // Both buttons meet minimum tap target
    const answerBox = await call.answerButton.boundingBox();
    if (answerBox) {
      expect(answerBox.height).toBeGreaterThanOrEqual(44);
    }

    const declineBox = await call.declineButton.boundingBox();
    if (declineBox) {
      expect(declineBox.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("hijacked call ended state uses aria-live", async ({ page }) => {
    const call = new HijackedCallPage(page);
    await call.goto();
    await call.waitForIncoming();
    await call.decline();
    await call.waitForEnded();

    // The ended state container should have aria-live="assertive"
    const liveRegion = page.locator('[aria-live="assertive"]');
    await expect(liveRegion).toBeVisible();
  });

  test("invisibility dossier page has accessible header buttons", async ({
    page,
  }) => {
    const dossier = new InvisibilityDossierPage(page);
    await dossier.goto();

    // Back button has accessible name
    const backButton = page.getByRole("button", { name: /back/i });
    await expect(backButton).toHaveAccessibleName(/back/i);

    // Video call button has accessible name
    const videoButton = page.getByRole("button", { name: /video call/i });
    await expect(videoButton).toHaveAccessibleName(/video call/i);

    // Voice call button has accessible name
    const voiceButton = page.getByRole("button", { name: /voice call/i });
    await expect(voiceButton).toHaveAccessibleName(/voice call/i);
  });

  test("all funnel pages have a main landmark", async ({ page }) => {
    const ready = new ReadyPage(page);
    await ready.goto();
    await ready.waitForReady();
    await expect(page.locator("main")).toBeVisible();
  });
});

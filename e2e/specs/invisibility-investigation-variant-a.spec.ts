/**
 * Full Funnel E2E: Invisibility Investigation — Variant A
 *
 * Traverses the complete funnel flow:
 *   ready → hijacked call (answer) → invisibility dossier → CTA → home
 */
import { test, expect } from "@playwright/test";
import {
  ReadyPage,
  HijackedCallPage,
  InvisibilityDossierPage,
} from "@/e2e/fixtures/pages";
import { mockAudio } from "@/e2e/utils/audio-mock";

test.describe("Invisibility Investigation — Variant A", () => {
  test.beforeEach(async ({ page }) => {
    await mockAudio(page);
  });

  test("complete funnel flow: ready → call → dossier → home", async ({
    page,
  }) => {
    // ── Step 1: Ready Screen ──
    const ready = new ReadyPage(page);
    await ready.goto();
    await ready.waitForReady();
    await expect(ready.headline).toBeVisible();
    await expect(ready.beginButton).toBeVisible();
    await expect(ready.beginButton).toBeEnabled();

    // ── Step 2: Click BEGIN → Hijacked Call ──
    await ready.clickBegin();

    const call = new HijackedCallPage(page);
    await call.waitForIncoming();

    // Verify incoming call UI
    await expect(call.incomingLabel).toBeVisible();
    await expect(call.answerButton).toBeVisible();
    await expect(call.declineButton).toBeVisible();

    // Answer the call
    await call.answer();
    await call.waitForActive();

    // Verify active call UI
    await expect(call.hangupButton).toBeVisible();
    await expect(call.muteButton).toBeVisible();
    await expect(call.speakerButton).toBeVisible();

    // Wait for call to auto-end and redirect to dossier
    // (the hook auto-ends the call and navigates after delays)
    await call.waitForEnded();
    await expect(call.disconnectedLabel).toBeVisible();
    await call.waitForRedirect();

    // ── Step 3: Invisibility Dossier ──
    const dossier = new InvisibilityDossierPage(page);

    // Wait for first message (script has started)
    await dossier.waitForFirstMessage();

    // Verify contact header
    await expect(dossier.contactName).toBeVisible();

    // Wait for the CTA button (full script complete)
    await dossier.waitForCta(45_000);
    await expect(dossier.ctaButton).toBeVisible();
    await expect(dossier.ctaButton).toBeEnabled();

    // ── Step 4: Tap CTA → Home Page ──
    await dossier.tapCta();
    await dossier.waitForNavigationToHome();

    // Verify we landed on the home page
    await expect(page).toHaveURL("/");
  });

  test("ready page loads and shows headline", async ({ page }) => {
    const ready = new ReadyPage(page);
    await ready.goto();
    await ready.waitForReady();

    await expect(ready.headline).toHaveText(/are you ready/i);
    await expect(ready.beginButton).toHaveText(/begin/i);
  });

  test("hijacked call page loads in incoming state", async ({ page }) => {
    const call = new HijackedCallPage(page);
    await call.goto();
    await call.waitForIncoming();

    await expect(call.incomingLabel).toBeVisible();
    await expect(call.answerButton).toBeVisible();
    await expect(call.declineButton).toBeVisible();
  });

  test("invisibility dossier page loads and shows contact", async ({
    page,
  }) => {
    const dossier = new InvisibilityDossierPage(page);
    await dossier.goto();

    await expect(dossier.contactName).toBeVisible();
    await expect(dossier.contactStatus).toBeVisible();
  });
});

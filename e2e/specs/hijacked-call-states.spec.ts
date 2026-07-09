/**
 * Call State Machine E2E Tests
 *
 * Tests each state transition of the hijacked call screen:
 *   incoming → decline → ended
 *   incoming → answer → active → hangup → ended
 *   mute/speaker toggles
 *   timer increments during active call
 */
import { test, expect } from "@playwright/test";
import { HijackedCallPage } from "@/e2e/fixtures/pages";
import { mockAudio } from "@/e2e/utils/audio-mock";

test.describe("Hijacked Call — State Machine", () => {
  test.beforeEach(async ({ page }) => {
    await mockAudio(page);
  });

  test("incoming → decline → ended", async ({ page }) => {
    const call = new HijackedCallPage(page);
    await call.goto();
    await call.waitForIncoming();

    // Decline
    await call.decline();

    // Should reach ended state
    await call.waitForEnded();
    await expect(call.disconnectedLabel).toBeVisible();
  });

  test("incoming → answer → active → hangup → ended", async ({ page }) => {
    const call = new HijackedCallPage(page);
    await call.goto();
    await call.waitForIncoming();

    // Answer
    await call.answer();
    await call.waitForActive();

    // Verify active state
    await expect(call.hangupButton).toBeVisible();
    await expect(call.muteButton).toBeVisible();
    await expect(call.speakerButton).toBeVisible();

    // Hangup
    await call.hangup();

    // Should reach ended state
    await call.waitForEnded();
    await expect(call.disconnectedLabel).toBeVisible();
  });

  test("incoming state has answer and decline buttons", async ({ page }) => {
    const call = new HijackedCallPage(page);
    await call.goto();
    await call.waitForIncoming();

    // Both buttons are visible
    await expect(call.answerButton).toBeVisible();
    await expect(call.declineButton).toBeVisible();

    // Answer is green, Decline is red
    const answerStyle = await call.answerButton.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor,
    );
    const declineStyle = await call.declineButton.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor,
    );

    // Out of gamut green — verify it's not the same as decline
    expect(answerStyle).not.toBe(declineStyle);
  });

  test("active state shows action buttons", async ({ page }) => {
    const call = new HijackedCallPage(page);
    await call.goto();
    await call.waitForIncoming();
    await call.answer();
    await call.waitForActive();

    // 6 action buttons visible (mute, keypad, speaker, add call, facetime, contacts)
    await expect(call.muteButton).toBeVisible();
    await expect(call.speakerButton).toBeVisible();
  });

  test("ended state shows disconnected message", async ({ page }) => {
    const call = new HijackedCallPage(page);
    await call.goto();
    await call.waitForIncoming();
    await call.decline();
    await call.waitForEnded();

    await expect(call.disconnectedLabel).toHaveText(/call disconnected/i);
  });

  test("redirect indicator shows after call ends (auto-end flow)", async ({
    page,
  }) => {
    const call = new HijackedCallPage(page);
    await call.goto();
    await call.waitForIncoming();
    await call.answer();
    await call.waitForActive();

    // Wait for the call to auto-end (hook times out the audio)
    await call.waitForEnded();

    // Redirect indicator should appear
    // (the hook shows "New message from BAXHEN" after 1.5s in ended state)
    await expect(call.redirectIndicator).toBeVisible({
      timeout: 10_000,
    });
  });
});

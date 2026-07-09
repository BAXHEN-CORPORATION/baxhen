import type { Page } from "@playwright/test";

/**
 * Page Object Model for the Hijacked Call screen.
 *
 * iOS-style incoming/active/ended call screen simulation.
 * Manages the call state machine: incoming → answer → active → ended.
 */
export class HijackedCallPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate directly to the hijacked call page */
  async goto() {
    await this.page.goto(
      "/funnels/baxhen/invisibility-investigation/variant-a/hijacked-call",
    );
    await this.page.waitForLoadState("networkidle");
  }

  // ── Incoming State ──

  /** "Incoming call" label visible in incoming state */
  get incomingLabel() {
    return this.page.getByText(/incoming call/i);
  }

  /** Answer button (green, aria-label="Answer call") */
  get answerButton() {
    return this.page.getByRole("button", { name: /answer call/i });
  }

  /** Decline button (red, aria-label="Decline call") */
  get declineButton() {
    return this.page.getByRole("button", { name: /decline call/i });
  }

  /** Wait for the incoming call UI to be fully rendered */
  async waitForIncoming() {
    await this.incomingLabel.waitFor({ state: "visible" });
    await this.answerButton.waitFor({ state: "visible" });
    await this.declineButton.waitFor({ state: "visible" });
  }

  /** Click the answer button */
  async answer() {
    await this.answerButton.click();
    // Wait for incoming label to disappear (active state)
    await this.incomingLabel.waitFor({ state: "hidden" }).catch(() => {
      // May transition immediately
    });
  }

  /** Click the decline button */
  async decline() {
    await this.declineButton.click();
  }

  // ── Active State ──

  /** Caller name displayed during active call */
  get callerName() {
    return this.page.getByText("Unknown");
  }

  /** Call timer (formatted duration) */
  get callTimer() {
    return this.page.locator("text=/\\d{1,2}:\\d{2}/");
  }

  /** Hangup/end call button (red, aria-label="End call") */
  get hangupButton() {
    return this.page.getByRole("button", { name: /end call/i });
  }

  /** Mute button (first action button) */
  get muteButton() {
    return this.page.getByText("mute", { exact: false }).first();
  }

  /** Speaker button (third action button) */
  get speakerButton() {
    return this.page.getByText("speaker", { exact: false }).first();
  }

  /** Wait for active call state (caller name visible) */
  async waitForActive() {
    await this.callerName.waitFor({ state: "visible", timeout: 10_000 });
    await this.hangupButton.waitFor({ state: "visible" });
  }

  /** Click hangup to end the call */
  async hangup() {
    await this.hangupButton.click();
  }

  // ── Ended State ──

  /** "Call disconnected" message in ended state */
  get disconnectedLabel() {
    return this.page.getByText(/call disconnected/i);
  }

  /** "New message from BAXHEN" redirect indicator */
  get redirectIndicator() {
    return this.page.getByText(/new message from BAXHEN/i);
  }

  /** Wait for ended state and redirect */
  async waitForEnded() {
    await this.disconnectedLabel.waitFor({
      state: "visible",
      timeout: 15_000,
    });
  }

  /** Wait for redirect to dossier page */
  async waitForRedirect() {
    await this.page.waitForURL("**/invisibility-dossier**", {
      timeout: 15_000,
    });
  }

  // ── Combined Actions ──

  /** Answer the call and wait for active state */
  async answerAndWaitForActive() {
    await this.answer();
    await this.waitForActive();
  }

  /** Full call flow: incoming → answer → wait for ended → redirect */
  async completeCallFlow() {
    await this.waitForIncoming();
    await this.answerAndWaitForActive();
    await this.waitForEnded();
    await this.waitForRedirect();
  }
}

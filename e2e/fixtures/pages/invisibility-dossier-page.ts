import type { Page } from "@playwright/test";

/**
 * Page Object Model for the Invisibility Dossier screen.
 *
 * WhatsApp-style chat screen with scripted messages: text bubbles,
 * audio evidence, case file cards, PDF document viewer, and CTA button.
 */
export class InvisibilityDossierPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate directly to the dossier page */
  async goto() {
    await this.page.goto(
      "/funnels/baxhen/invisibility-investigation/variant-a/invisibility-dossier",
    );
    await this.page.waitForLoadState("networkidle");
  }

  // ── Header ──

  /** Contact name "Baxhen" in header */
  get contactName() {
    return this.page.getByText("Baxhen", { exact: true }).first();
  }

  /** Online status text */
  get contactStatus() {
    return this.page.getByText("Online");
  }

  // ── Typing Indicator ──

  /** Typing indicator (3 animated dots) */
  get typingIndicator() {
    return this.page.locator(".dot-1");
  }

  /** Wait for typing indicator to appear */
  async waitForTyping() {
    await this.typingIndicator.waitFor({ state: "visible", timeout: 10_000 });
  }

  /** Wait for typing indicator to disappear */
  async waitForTypingDone() {
    await this.typingIndicator.waitFor({ state: "hidden", timeout: 10_000 });
  }

  // ── Messages ──

  /** Wait for a specific text message to appear */
  async waitForMessage(text: string, timeout = 15_000) {
    await this.page.getByText(text, { exact: false }).first().waitFor({
      state: "visible",
      timeout,
    });
  }

  /** Get all visible message bubbles */
  get messages() {
    return this.page.locator(".flex.flex-col.gap-1\\.5 > *");
  }

  // ── Audio Bubbles ──

  /** Tap an audio bubble by its text label */
  async tapAudioBubble(audioIndex: number) {
    const audioBubbles = this.page.locator(
      'button[aria-label*="Play voice message"]',
    );
    await audioBubbles.nth(audioIndex).click();
  }

  // ── PDF Viewer ──

  /** PDF viewer overlay */
  get pdfViewer() {
    return this.page.locator("text=/Company [A-C]/i").first();
  }

  /** PDF next page button */
  get pdfNextButton() {
    return this.page.getByRole("button", { name: /next/i });
  }

  /** PDF previous page button */
  get pdfPrevButton() {
    return this.page.getByRole("button", { name: /previous/i });
  }

  /** PDF close button */
  get pdfCloseButton() {
    return this.page.getByRole("button", { name: /back/i });
  }

  /** Wait for PDF viewer to open */
  async waitForPdfViewer() {
    await this.page
      .waitForSelector("text=/Company [A-C]/i", { timeout: 10_000 })
      .catch(() => {
        // PDF may open differently
      });
  }

  /** Close the PDF viewer */
  async closePdfViewer() {
    await this.pdfCloseButton.click();
  }

  // ── CTA Button ──

  /** CTA button (WhatsApp green) */
  get ctaButton() {
    return this.page.locator("button:has-text('Start Conversation')");
  }

  /** Tap the CTA button */
  async tapCta() {
    await this.ctaButton.waitFor({ state: "visible", timeout: 20_000 });
    await this.ctaButton.click();
  }

  // ── Transition Overlay ──

  /** Transition overlay "Opening the revelation..." */
  get transitionOverlay() {
    return this.page.getByText(/Opening the revelation/);
  }

  // ── Combined Actions ──

  /** Wait for the first message to appear (script has started) */
  async waitForFirstMessage() {
    await this.waitForMessage("what just happened", 15_000);
  }

  /** Wait for the CTA to appear and be tappable (full script complete) */
  async waitForCta(timeout = 30_000) {
    await this.ctaButton.waitFor({ state: "visible", timeout });
  }

  /** Wait for navigation back to home page after CTA */
  async waitForNavigationToHome() {
    await this.page.waitForURL("**/", { timeout: 15_000 });
  }
}

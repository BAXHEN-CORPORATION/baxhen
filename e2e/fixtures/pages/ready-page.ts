import type { Page } from "@playwright/test";

/**
 * Page Object Model for the Ready screen.
 *
 * The first funnel step. Simple page with a headline and BEGIN button.
 * Requests fullscreen on click (handled by browser permission in tests).
 */
export class ReadyPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to the ready screen */
  async goto() {
    await this.page.goto(
      "/funnels/baxhen/invisibility-investigation/variant-a/ready",
    );
    await this.page.waitForLoadState("networkidle");
  }

  /** The "Are you ready?" headline */
  get headline() {
    return this.page.getByRole("heading", { name: /are you ready/i });
  }

  /** The BEGIN button */
  get beginButton() {
    return this.page.getByRole("button", { name: /begin/i });
  }

  /** Wait for the page to be fully rendered */
  async waitForReady() {
    await this.headline.waitFor({ state: "visible" });
    await this.beginButton.waitFor({ state: "visible" });
  }

  /** Click BEGIN and wait for navigation to hijacked-call */
  async clickBegin() {
    // Grant fullscreen permission before clicking
    await this.page.context().grantPermissions(["fullscreen"]);
    await this.beginButton.click();
    await this.page.waitForURL("**/hijacked-call**", { timeout: 10_000 });
  }
}

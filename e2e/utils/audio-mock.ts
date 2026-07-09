/**
 * Audio Mock Utility
 *
 * Mocks HTMLAudioElement for deterministic E2E testing.
 * `HTMLAudioElement.play()` requires a user gesture + actual audio decode
 * in browsers. Headless CI has no audio stack. This mock patches the
 * prototype so hook logic runs normally but playback is a no-op.
 *
 * Usage in test.beforeEach:
 *   import { mockAudio } from "@/e2e/utils/audio-mock";
 *   test.beforeEach(async ({ page }) => {
 *     await mockAudio(page);
 *   });
 *
 * After mocking, tests can assert:
 *   const plays = await page.evaluate(() => (window as any).__audioPlayCount);
 *   expect(plays).toBeGreaterThan(0);
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WindowAugmented = Window & {
  __audioPlayCount: number;
  __audioPauseCount: number;
  __audioSrcs: string[];
  __restoreAudio: () => void;
};

export async function mockAudio(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    const win = window as unknown as WindowAugmented;

    // Store call counts for test assertions
    win.__audioPlayCount = 0;
    win.__audioPauseCount = 0;
    win.__audioSrcs = [];

    const OriginalAudio = HTMLAudioElement;

    // Patch the prototype methods
    const originalPlay = OriginalAudio.prototype.play;
    OriginalAudio.prototype.play = function () {
      const w = window as unknown as WindowAugmented;
      w.__audioPlayCount += 1;
      w.__audioSrcs.push(this.src);
      return Promise.resolve();
    };

    const originalPause = OriginalAudio.prototype.pause;
    OriginalAudio.prototype.pause = function () {
      const w = window as unknown as WindowAugmented;
      w.__audioPauseCount += 1;
    };

    // Allow tests to restore original behavior
    win.__restoreAudio = () => {
      OriginalAudio.prototype.play = originalPlay;
      OriginalAudio.prototype.pause = originalPause;
    };
  });
}

/** Get the number of times audio.play() was called */
export function getAudioPlayCount(page: import("@playwright/test").Page) {
  return page.evaluate(
    () => (window as unknown as WindowAugmented).__audioPlayCount,
  );
}

/** Get all audio srcs that were played */
export function getAudioSrcs(page: import("@playwright/test").Page) {
  return page.evaluate(
    () => (window as unknown as WindowAugmented).__audioSrcs,
  );
}

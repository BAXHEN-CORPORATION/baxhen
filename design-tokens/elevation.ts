/**
 * Design Tokens — Elevation
 *
 * Codified from DESIGN.md "Void Conversationalist" design system.
 * Depth is achieved through tonal layers rather than traditional shadows.
 * Because the background is "Void" (#10141a), elevation is communicated
 * by shifting colors from the deep background to lighter "Deep Navy" surfaces.
 */

import { colors } from "./colors";

export const elevation = {
  /** Elevation levels via tonal layers */
  levels: {
    /** Level 0: The "Void" base background */
    0: {
      background: colors.background,
      description: "Base background — Void",
    },
    /** Level 1: Containers/cards — "Deep Navy" surfaces */
    1: {
      background: colors.surfaceContainerLow,
      border: `1px solid ${colors.outlineVariant}`,
      description:
        "Containers, cards — Deep Navy with semi-transparent Teal border",
    },
  } as const,

  /** Glassmorphism: nav bars and modal overlays */
  glass: {
    backdropBlur: "20px",
    /** 5% Frost tint */
    tint: `${colors.onSurface}0D`, // 5% opacity = 0D in hex
    description:
      "Navigation bars and modal overlays with backdrop blur and subtle Frost tint",
  },

  /** Interactive depth: conversational bubbles */
  conversational: {
    /** User messages */
    userBubble: colors.surfaceContainerHigh,
    /** System/AI messages */
    systemBubble: colors.background,
    systemBubbleBorder: `1px solid ${colors.outlineVariant}`,
    description:
      "User bubbles use Deep Navy, system/AI bubbles use Void with thin border",
  },
} as const;

export type ElevationLevel = keyof typeof elevation.levels;

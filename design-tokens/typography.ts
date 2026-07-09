/**
 * Design Tokens — Typography
 *
 * Codified from DESIGN.md "Void Conversationalist" design system.
 * Font families, sizes, weights, line heights, and letter spacing.
 */

export const typography = {
  displayXL: {
    fontFamily: "Literata, serif",
    fontSize: "64px",
    fontWeight: "300",
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
  },
  headlineLG: {
    fontFamily: "Literata, serif",
    fontSize: "48px",
    fontWeight: "300",
    lineHeight: "1.2",
  },
  headlineLGMobile: {
    fontFamily: "Literata, serif",
    fontSize: "32px",
    fontWeight: "300",
    lineHeight: "1.2",
  },
  headlineMD: {
    fontFamily: "Literata, serif",
    fontSize: "24px",
    fontWeight: "400",
    lineHeight: "1.4",
  },
  bodyLG: {
    fontFamily: "Hanken Grotesk, sans-serif",
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "1.6",
  },
  bodyMD: {
    fontFamily: "Hanken Grotesk, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
  },
  labelSM: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "1",
    letterSpacing: "0.05em",
  },
} as const;

export type TypographyToken = keyof typeof typography;

/** Font family constants for quick reference */
export const fontFamilies = {
  /** Editorial serif — headlines */
  serif: "Literata, serif",
  /** Clean sans-serif — body text */
  sans: "Hanken Grotesk, sans-serif",
  /** Monospace — labels, data, timestamps */
  mono: "JetBrains Mono, monospace",
} as const;

/**
 * Design Tokens — Spacing
 *
 * Codified from DESIGN.md "Void Conversationalist" design system.
 * Base unit, container max, gutter, and responsive margins.
 */

export const spacing = {
  /** Base spacing unit (8px grid) */
  base: "8px",

  /** 12-column grid values */
  grid: {
    columns: 12,
    /** Container max width */
    containerMax: "1200px",
    /** Gutter between columns */
    gutter: "24px",
  } as const,

  /** Page margins */
  margin: {
    /** Mobile margin (down to 320px) */
    mobile: "16px",
    /** Desktop margin */
    desktop: "48px",
  } as const,

  /** Section spacing */
  section: {
    /** Major section vertical gap */
    verticalGap: "80px",
  } as const,

  /** Tailwind spacing scale (in rem, base 8px = 0.5rem) */
  remScale: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
  },
} as const;

export type SpacingToken = keyof typeof spacing;

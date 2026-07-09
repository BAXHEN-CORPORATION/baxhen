/**
 * Design Tokens — Border Radius (Rounded)
 *
 * Codified from DESIGN.md "Void Conversationalist" design system.
 * Border radius scale for buttons, cards, conversational bubbles, badges.
 */

export const rounded = {
  /** Small: subtle rounding */
  sm: "0.25rem",
  /** Default: standard elements (buttons, inputs) */
  DEFAULT: "0.5rem",
  /** Medium */
  md: "0.75rem",
  /** Large */
  lg: "1rem",
  /** Extra large: conversational bubbles */
  xl: "1.5rem",
  /** Full pill: badges, chips */
  full: "9999px",
} as const;

export type RoundedToken = keyof typeof rounded;

/** Usage guide for each radius token */
export const roundedUsage = {
  sm: "Subtle rounding — small cards, inline code",
  DEFAULT: "Standard elements — buttons, input fields",
  md: "Medium rounding — larger cards, dialogs",
  lg: "Large rounding — modals, panels",
  xl: "Conversational bubbles — mimics chat apps",
  full: "Pill shape — badges, chips, status indicators",
} as const;

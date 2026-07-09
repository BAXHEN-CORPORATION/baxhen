/**
 * Design Tokens — Colors
 *
 * Codified from DESIGN.md "Void Conversationalist" design system.
 * These are TypeScript constants for tooling, documentation, and
 * validation. Tailwind 4 CSS `@theme` is the runtime source of truth;
 * these tokens mirror it for programmatic use.
 *
 * Usage:
 *   import { colors } from "@/design-tokens";
 *   colors.background  // "#10141a"
 */

export const colors = {
  // ── Background & Surfaces ──
  /** Primary page background ("Void") */
  background: "#10141a",
  /** Surface container background */
  surface: "#10141a",
  /** Dim surface variant */
  surfaceDim: "#10141a",
  /** Bright surface variant */
  surfaceBright: "#353940",
  /** Lowest container level */
  surfaceContainerLowest: "#0a0e14",
  /** Low container level */
  surfaceContainerLow: "#181c22",
  /** Default container level ("Deep Navy") */
  surfaceContainer: "#1c2026",
  /** High container level */
  surfaceContainerHigh: "#262a31",
  /** Highest container level */
  surfaceContainerHighest: "#31353c",

  // ── On-Surface (text on surfaces) ──
  /** Primary body text ("Frost") */
  onSurface: "#dfe2eb",
  /** Secondary text variant */
  onSurfaceVariant: "#bbc9cf",

  // ── Inverse ──
  /** Inverse surface color */
  inverseSurface: "#dfe2eb",
  /** Text on inverse surface */
  inverseOnSurface: "#2d3137",

  // ── Outlines ──
  /** Border and divider color */
  outline: "#859398",
  /** Subtle outline variant */
  outlineVariant: "#3c494e",

  // ── Primary (Electric) ──
  /** Surface tint reference */
  surfaceTint: "#3cd7ff",
  /** Primary text/accent color */
  primary: "#a8e8ff",
  /** Text on primary backgrounds */
  onPrimary: "#003642",
  /** Primary container background */
  primaryContainer: "#00d4ff",
  /** Text on primary container */
  onPrimaryContainer: "#00586b",
  /** Inverse primary */
  inversePrimary: "#00677e",

  // ── Secondary (Teal Mid) ──
  /** Secondary color */
  secondary: "#75d4e9",
  /** Text on secondary */
  onSecondary: "#00363f",
  /** Secondary container */
  secondaryContainer: "#369db1",
  /** Text on secondary container */
  onSecondaryContainer: "#002f37",

  // ── Tertiary (Warm Cream) ──
  /** Tertiary accent color */
  tertiary: "#ecddbc",
  /** Text on tertiary */
  onTertiary: "#383019",
  /** Tertiary container */
  tertiaryContainer: "#d0c1a1",
  /** Text on tertiary container */
  onTertiaryContainer: "#594f35",

  // ── Error ──
  /** Error color */
  error: "#ffb4ab",
  /** Text on error */
  onError: "#690005",
  /** Error container */
  errorContainer: "#93000a",
  /** Text on error container */
  onErrorContainer: "#ffdad6",

  // ── Fixed Variants (for documentation) ──
  primaryFixed: "#b4ebff",
  primaryFixedDim: "#3cd7ff",
  onPrimaryFixed: "#001f27",
  onPrimaryFixedVariant: "#004e5f",

  secondaryFixed: "#a6eeff",
  secondaryFixedDim: "#75d4e9",
  onSecondaryFixed: "#001f25",
  onSecondaryFixedVariant: "#004e5b",

  tertiaryFixed: "#f1e1c0",
  tertiaryFixedDim: "#d4c5a5",
  onTertiaryFixed: "#221b06",
  onTertiaryFixedVariant: "#50462d",

  surfaceVariant: "#31353c",
} as const;

export type ColorToken = keyof typeof colors;

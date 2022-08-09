import "@mui/material";

declare module "@mui/material" {
  //** Palette */

  interface Palette {
    neutral?: Palette["primary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }

  interface CommonColors {
    gray: string;
  }

  //** Theme */

  interface Theme {
    status?: {
      danger?: React.CSSProperties["color"];
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: React.CSSProperties["color"];
    };
  }

  //* Typography */

  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }

  interface TypographyPropsVariantOverrides {
    poster: true;
    // h6: false;
  }

  //** Breakpoints */

  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tabletSmall: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

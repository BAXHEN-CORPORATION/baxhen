import "@mui/material";

import boxShadows from "styles/theme/base/boxShadows";
import borders from "styles/theme/base/borders";
import functions from "styles/theme/functions";

declare module "@mui/material" {
  //** Palette */

  interface Palette {
    text?: Palette["primary"];
    transparent?: Palette["primary"];
    white?: Palette["primary"];
    black?: Palette["primary"];
  }
  interface PaletteOptions {
    text?: PaletteOptions["primary"];
    transparent?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
  }

  interface CommonColors {
    // gray: string;
  }

  //** Theme */

  interface Theme {
    boxShadows: typeof boxShadows;
    borders: typeof borders;
    functions: typeof functions;
  }
  interface ThemeOptions {
    boxShadows: typeof boxShadows;
    borders: typeof borders;
    functions: typeof functions;
  }

  //* Typography */

  interface TypographyVariants {
    // poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    // poster?: React.CSSProperties;
  }

  interface TypographyPropsVariantOverrides {
    // poster: true;
    // h6: false;
  }

  //** Breakpoints */

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

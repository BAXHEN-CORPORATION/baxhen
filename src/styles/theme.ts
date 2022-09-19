import merge from "lodash/merge";
import {
  createTheme,
  PaletteOptions,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { orange } from "@mui/material/colors";

// export const palette = { primary: "#0e566f", gray: "#6D7071" };

const customThemeMerge = (
  theme: ThemeOptions,
  themeOverride: ThemeOptions
): Theme => {
  return responsiveFontSizes(createTheme(merge(theme, themeOverride)));
};

//* Default Config - Colors, Typography, Breakpoints

const palette = {
  primary: {
    main: "#0e5770",
    light: "#48849e",
    dark: "#002e45",
  },
  secondary: {
    main: "#838e83",
    light: "#b3beb3",
    dark: "#566156",
  },
};

let themeOptions: ThemeOptions = {
  navbar: {
    tablet: "120px",
    mobile: "100px",
  },
  typography: {
    // fontSize: 10,
    /*h6: undefined*/
    // fontFamily: "Comfortaa",
    fontFamily: "Ubuntu, sans-serif;",

    h1: { fontFamily: "Ubuntu", fontWeight: 200 },
    // h5: { fontFamily: "MarkProMedium", fontWeight: 300 },
  },
  palette: {
    ...palette,
    common: { gray: "#6D7071" },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tabletSmall: 600,
      tablet: 900,
      laptop: 1200,
      desktop: 1536,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {},
      },
    },
  },
};

const theme = createTheme(themeOptions, {});

//* Other configs

themeOptions = merge<ThemeOptions, ThemeOptions>(themeOptions, {
  components: {
    MuiSvgIcon: { styleOverrides: { fontSizeLarge: "25px" } },
  },
});

//** Dark Theme */

const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    // neutral: { main: "#64748B", contrastText: "#fff" },
  },
};

//** Light Theme */

const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    // neutral: { main: "#64748B", contrastText: "#fff" },
  },
};

//* Compiling Themes Modes*/

export const dark = customThemeMerge(darkTheme, themeOptions);
export const light = customThemeMerge(lightTheme, themeOptions);

export default { dark, light };

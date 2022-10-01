import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import theme from "styles/theme";

import { SessionProvider } from "next-auth/react";
import "styles/global.css";
import Layout from "surfaces/Layout/Layout";

/**
 * Client-side cache, shared for the whole session of the user in the browser.
 */

interface MyAppProps extends AppProps {}

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  // const [mode, setMode] = React.useState<"light" | "dark">("light");

  // const colorMode = React.useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  //     },
  //   }),
  //   []
  // );
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;

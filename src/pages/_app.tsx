import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import theme from "styles/theme";
import createEmotionCache from "styles/create-emotion-cache";

import { SessionProvider } from "next-auth/react";
import "styles/global.css";
import Layout from "surfaces/Layout/Layout";

/**
 * Client-side cache, shared for the whole session of the user in the browser.
 */
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <ColorModeContext.Provider value={colorMode}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout locale={pageProps.locale}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </CacheProvider>
    </SessionProvider>
  );
}

export default MyApp;
//** External Imports */
import React from "react";

import Box from "@mui/material/Box";
import { ChildrenProps, LocaleProps } from "types";
// import NavBar from "containers/NavBar";
import Head from "next/head";
import { useRouter } from "next/router";

//** Local Imports */

//** Typings */
export interface LayoutProps extends ChildrenProps, LocaleProps {
  hideLayoutPaths?: string[];
}

//** Default Props */
const defaultProps: Partial<LayoutProps> = {
  hideLayoutPaths: ["/auth/signin"],
};

/**
 * Surface for positioning header and footer
 *
 * @surface
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  locale,
  hideLayoutPaths,
}) => {
  const router = useRouter();

  const isHideLayout = hideLayoutPaths?.includes(router.asPath);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>baxhen</title>
      </Head>
      {/* {!isHideLayout && <NavBar locale={locale} />} */}

      <Box component="main">{children}</Box>
    </>
  );
};

Layout.defaultProps = defaultProps;

export default Layout;

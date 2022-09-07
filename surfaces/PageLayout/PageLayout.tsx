//** External Imports */
import React from "react";

import Stack from "@mui/material/Stack";
//** Local Imports */
import { ChildrenProps } from "types";

//** Typings */
export interface PageLayoutProps extends ChildrenProps {}

//** Default Props */
const defaultProps: Partial<PageLayoutProps> = {};

/**
 * Surface for basic layout container of pages
 *
 * @surface
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Stack
      component="main"
      spacing={2}
      minHeight="80vh"
      width="100vw"
      padding="4rem"
      alignItems="center"
      paddingTop={{ tablet: "120px", mobile: "100px" }}
    >
      {children}
    </Stack>
  );
};

PageLayout.defaultProps = defaultProps;

export default PageLayout;

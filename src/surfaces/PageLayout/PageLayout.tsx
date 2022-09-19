//** External Imports */
import React from "react";

import Stack from "@mui/material/Stack";
//** Local Imports */
import { ChildrenProps } from "types";
import { SxProps, Theme } from "@mui/material";

//** Typings */
export interface PageLayoutProps extends ChildrenProps {
  sx?: SxProps<Theme>;
}

//** Default Props */
const defaultProps: Partial<PageLayoutProps> = {};

/**
 * Surface for basic layout container of pages
 *
 * @surface
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children, sx }) => {
  return (
    <Stack
      component="main"
      spacing={2}
      minHeight="100vh"
      alignItems="center"
      paddingTop={(theme) => ({
        tablet: theme.navbar.tablet,
        mobile: theme.navbar.mobile,
      })}
      sx={{ bgcolor: "secondary.main", ...sx }}
    >
      {children}
    </Stack>
  );
};

PageLayout.defaultProps = defaultProps;

export default PageLayout;

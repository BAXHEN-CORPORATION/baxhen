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
      minHeight="80vh"
      alignItems="center"
      paddingTop={{ tablet: "120px", mobile: "100px" }}
      sx={{ bgcolor: "secondary.main", ...sx }}
    >
      {children}
    </Stack>
  );
};

PageLayout.defaultProps = defaultProps;

export default PageLayout;

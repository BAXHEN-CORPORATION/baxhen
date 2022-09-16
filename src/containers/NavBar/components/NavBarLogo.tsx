//** External Imports */
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//** Local Imports */
import WrappedImage from "src/components/WrappedImage";
import logo from "public/images/logo_110.png";

//** Typings */
export interface NavBarLogoProps {}

//** Default Props */
const defaultProps: Partial<NavBarLogoProps> = {};

/**
 * Component for logo for nav bar
 *
 * @component
 */
const NavBarLogo: React.FC<NavBarLogoProps> = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      paddingLeft={(theme) => theme.spacing(1)}
      sx={{ cursor: "pointer" }}
      ml={{ tablet: "6rem", mobile: "1rem" }}
    >
      <WrappedImage
        height={{ tablet: "2rem", mobile: "2rem" }}
        width={{ tablet: "2rem", mobile: "2rem" }}
        src={logo}
      />

      <Typography
        variant="h1"
        sx={{
          color: "black",
          fontSize: { mobile: "28px", tablet: "36px" },
        }}
      >
        baxhen
      </Typography>
    </Stack>
  );
};

NavBarLogo.defaultProps = defaultProps;

export default NavBarLogo;

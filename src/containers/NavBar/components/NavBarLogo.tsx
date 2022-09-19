//** External Imports */
import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//** Local Imports */
import WrappedImage from "components/WrappedImage";
import logo from "assets/images/logo_110.png";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <Stack
      component="a"
      direction="row"
      alignItems="center"
      paddingLeft={(theme) => theme.spacing(1)}
      sx={{ cursor: "pointer" }}
      ml={{ tablet: "6rem", mobile: "1rem" }}
      onClick={() => router.push("/")}
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

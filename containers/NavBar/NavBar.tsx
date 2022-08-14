//** External Imports */
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

//** Local Imports */
import { LocaleProps } from "types";
import { navBarLocales } from "locales";
import IconButtonMenu from "components/IconButtonMenu";

//** Typings */
export interface NavBarProps extends LocaleProps {}

//** Default Props */
const defaultProps: Partial<NavBarProps> = {};

/**
 * Container for handling navigation between routes
 *
 * @container
 */
const NavBar: React.FC<NavBarProps> = ({ locale = "en" }) => {
  //** Global Hooks */
  const router = useRouter();
  //** State */
  const [open, setOpen] = React.useState(false);

  //** Config Objects */

  const { signOutMenu, homeMenu, muiMenu } = navBarLocales[locale];

  const menus = [
    {
      onClick: () => {
        router.push("/");
      },
      label: homeMenu,
    },
    {
      onClick: () => {
        router.push("/material-ui");
      },
      label: muiMenu,
    },
    // { onClick: () => {}, label: coursesMenu },
    {
      onClick: () => {
        signOut({ redirect: false });
      },
      label: signOutMenu,
    },
  ];

  //** Effects */

  return (
    <Stack
      component="nav"
      spacing={2}
      width="100vw"
      height="20vh"
      padding="1.75rem 4rem 0  4rem"
      alignItems="center"
    >
      <Typography
        variant="h1"
        sx={{
          color: "primary.main",
          fontSize: { mobile: "48px", tablet: "64px" },
        }}
      >
        baxhen
      </Typography>
      <Box sx={{ display: { tablet: "unset", mobile: "none" } }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          {menus.map(({ label, onClick }) => (
            <ListItem
              key={label}
              sx={{ height: "2rem", justifyContent: "center" }}
            >
              <ListItemText
                onClick={onClick}
                primary={label}
                sx={{
                  color: "primary.main",
                  textAlign: "center",
                  cursor: "pointer",
                  minWidth: "max-content",
                }}
              />
            </ListItem>
          ))}
        </Stack>
      </Box>
      <Box sx={{ display: { mobile: "unset", tablet: "none" } }}>
        <IconButtonMenu
          menus={menus}
          open={open}
          onClick={() => {
            setOpen((oldOpen) => !oldOpen);
          }}
        />
      </Box>
    </Stack>
  );
};

NavBar.defaultProps = defaultProps;

export default NavBar;

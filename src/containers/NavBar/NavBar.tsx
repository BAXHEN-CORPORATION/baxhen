//** External Imports */
import React from "react";
import { useRouter } from "next/router";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

//** Local Imports */
import { LocaleProps } from "types";
import { navBarLocales } from "locales";
import IconButton from "@mui/material/IconButton";
import { useNavBar } from "./meta";

import Drawer from "@mui/material/Drawer";
import { DrawerHeader } from "./components";
import NavBarLogo from "./components/NavBarLogo";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import HideOnScroll from "./components/HideOnScroll";

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
  const { toggleOpen, open, isOnPageTop } = useNavBar();

  //** Global Hooks */
  const router = useRouter();
  //** State */

  //** Config Objects */

  console.log({ locale });
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
    // {
    //   onClick: () => {
    //     signOut({ redirect: false });
    //   },
    //   label: signOutMenu,
    // },
  ];

  return (
    <>
      <HideOnScroll>
        <AppBar color="secondary" elevation={isOnPageTop ? 0 : 2}>
          <Toolbar
            sx={{
              height: { tablet: "120px", mobile: "100px" },
              width: "100vw",
            }}
          >
            <NavBarLogo />
            <Stack
              direction="row"
              ml="auto"
              mr="auto"
              gap="2rem"
              display={{ tablet: "flex", mobile: "none" }}
            >
              {menus.map(({ label, onClick }) => (
                <Button
                  disableTouchRipple
                  sx={{
                    fontSize: "18px",
                    fontWeight: 400,
                    fontFamily: "Ubuntu",
                    color: "black",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                    },
                  }}
                  key={label}
                  onClick={onClick}
                  color="primary"
                >
                  {label}
                </Button>
              ))}
            </Stack>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="open drawer"
              sx={{
                ml: "auto",
                display: { tablet: "none", mobile: "unset" },
              }}
              onClick={toggleOpen}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer
        anchor="right"
        open={open}
        sx={{ display: open ? "unset" : "none" }}
      >
        <DrawerHeader width={{ tabletSmall: "400px", mobile: "100vw" }}>
          <NavBarLogo />
          <IconButton onClick={toggleOpen}>
            <CloseIcon color="primary" fontSize="large" />
          </IconButton>
        </DrawerHeader>
        <Stack padding={(theme) => theme.spacing(0, 5)}>
          <List>
            {menus.map(({ label, onClick }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton onClick={onClick}>
                  <ListItemText
                    sx={{ fontSize: "20px", color: "primary.main" }}
                    primary={label}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Drawer>
    </>
    // <Stack
    //   component="nav"
    //   spacing={2}
    //   width="100vw"
    //   height="20vh"
    //   padding="1.75rem 4rem 0  4rem"
    //   alignItems="center"
    // >
    //   <Typography
    //     variant="h1"
    //     sx={{
    //       color: "primary.main",
    //       fontSize: { mobile: "48px", tablet: "64px" },
    //     }}
    //   >
    //     baxhen
    //   </Typography>
    //   <Box sx={{ display: { tablet: "unset", mobile: "none" } }}>
    //     <Stack
    //       direction="row"
    //       divider={<Divider orientation="vertical" flexItem />}
    //     >
    //       {menus.map(({ label, onClick }) => (
    //         <ListItem
    //           key={label}
    //           sx={{ height: "2rem", justifyContent: "center" }}
    //         >
    //           <ListItemText
    //             onClick={onClick}
    //             primary={label}
    //             sx={{
    //               color: "primary.main",
    //               textAlign: "center",
    //               cursor: "pointer",
    //               minWidth: "max-content",
    //             }}
    //           />
    //         </ListItem>
    //       ))}
    //     </Stack>
    //   </Box>
    //   <Box sx={{ display: { mobile: "unset", tablet: "none" } }}>
    //     <IconButtonMenu
    //       menus={menus}
    //       open={open}
    //       onClick={() => {
    //         setOpen((oldOpen) => !oldOpen);
    //       }}
    //     />
    //   </Box>
    // </Stack>
  );
};

NavBar.defaultProps = defaultProps;

export default NavBar;

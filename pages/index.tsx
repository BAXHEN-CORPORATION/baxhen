import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { WithLocaleProp } from "types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";

const homeContent = {
  en: {
    homeMenu: "Home",
    youtubeMenu: "Youtube",
    coursesMenu: "Courses",
    signOutMenu: "Sign Out",
  },
  tl: {
    homeMenu: "Home",
    youtubeMenu: "Youtube",
    coursesMenu: "Aralin",
    signOutMenu: "Sign Out",
  },
  pt: {
    homeMenu: "Home",
    youtubeMenu: "Youtube",
    coursesMenu: "Cursos",
    signOutMenu: "Sair",
  },
};
interface IconButtonMenuProps {
  open: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  menus: {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    label: string;
  }[];
}

const IconButtonMenu: React.FC<IconButtonMenuProps> = ({
  open,
  onClick,
  menus,
}) => {
  return (
    <>
      <IconButton onClick={onClick} color="primary">
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      {open && (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "transparent",
          }}
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
                  maxWidth: "max-content",
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

interface DisplayContentCardProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  image?: string;
}
const DisplayContentCard: React.FC<DisplayContentCardProps> = ({
  onClick,
  title = "No Title Provided",
  image = "https://i3.ytimg.com/vi/o1chMISeTC0/maxresdefault.jpg",
}) => {
  return (
    <Card
      sx={{
        minWidth: { mobile: 200, tablet: 466 },
        borderRadius: "30px",
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          sx={{ height: { mobile: "100px", tablet: "250px" } }}
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="caption" color="primary" gutterBottom>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Home: NextPage<WithLocaleProp> = ({ locale }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { youtubeMenu, coursesMenu, signOutMenu, homeMenu } =
    homeContent[locale];

  const [open, setOpen] = React.useState(false);

  const menus = [
    // { onClick: () => {}, label: homeMenu },
    { onClick: () => {}, label: youtubeMenu },
    // { onClick: () => {}, label: coursesMenu },
    {
      onClick: () => {
        signOut({ redirect: false });
      },
      label: signOutMenu,
    },
  ];

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status]);

  return (
    <Stack
      spacing={2}
      minHeight="100vh"
      width="100vw"
      padding="4rem"
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
      <Stack
        gap="2rem"
        direction={{ mobile: "column", tabletSmall: "row" }}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <DisplayContentCard />
        <DisplayContentCard />
        <DisplayContentCard />
        <DisplayContentCard />
      </Stack>
    </Stack>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: { locale },
  };
}

export default Home;

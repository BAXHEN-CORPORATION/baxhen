//** External Imports */
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Stack from "@mui/material/Stack";

//** Local Imports */

import { LocaleProps } from "types";
import PageLayout from "surfaces/PageLayout";
import Box from "@mui/material/Box";
import WrappedImage from "components/WrappedImage";

import logo from "../src/assets/svg/logo.svg";
import Typography from "@mui/material/Typography";
import { homeLocales } from "locales";

const Home: NextPage<LocaleProps> = ({ locale }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { heading, subtitle } = homeLocales[locale];

  // React.useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/signin");
  //   }
  // }, [status]);

  return (
    <PageLayout sx={{ padding: "0 2rem" }}>
      <Stack
        gap="2rem"
        direction={{ mobile: "column", tabletSmall: "row" }}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        width="100%"
      >
        <Stack
          component="section"
          direction="row"
          alignItems="center"
          justifyContent="center"
          height={(theme) => ({
            tablet: `calc(100vh - ${theme.navbar.tablet})`,
            mobile: `calc(100vh - ${theme.navbar.mobile})`,
          })}
          width="100vw"
        >
          <Box width="500px">
            <WrappedImage
              width="100%"
              height="100%"
              style={{ marginLeft: "auto" }}
              src={logo}
            />
          </Box>
          <Stack gap="1rem" maxWidth="50%" mb="auto" pt="8rem">
            <Typography variant="h1">{heading}</Typography>
            <Typography variant="subtitle1">{subtitle}</Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* <Stack height={}></Stack> */}
    </PageLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: { locale },
  };
}

export default Home;

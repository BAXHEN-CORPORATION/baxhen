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

import logo from "assets/svg/logo.svg";
import Typography from "@mui/material/Typography";
import { homeLocales } from "locales";

const Home: NextPage<LocaleProps> = ({ locale }) => {
  const { heading, subtitle } = homeLocales[locale];

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
          width="100vw"
        >
          <Box width="500px"></Box>
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

//** External Imports */
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Stack from "@mui/material/Stack";

//** Local Imports */

import { LocaleProps } from "types";
import PageLayout from "surfaces/PageLayout";
import ContentCard from "containers/ContentCard";
import Box from "@mui/material/Box";

const Home: NextPage<LocaleProps> = ({ locale }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

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
        <Box height="100vh" width="inherit">
          Developing
        </Box>
        <Box height="100vh" width="inherit">
          Developing
        </Box>
        <Box height="100vh" width="inherit">
          Developing
        </Box>
      </Stack>
    </PageLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: { locale },
  };
}

export default Home;

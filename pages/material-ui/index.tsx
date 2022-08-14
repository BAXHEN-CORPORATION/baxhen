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

const MaterialUI: NextPage<LocaleProps> = ({}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status]);

  return (
    <PageLayout>
      <Stack
        gap="2rem"
        direction={{ mobile: "column", tabletSmall: "row" }}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <ContentCard />
      </Stack>
    </PageLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: { locale },
  };
}

export default MaterialUI;

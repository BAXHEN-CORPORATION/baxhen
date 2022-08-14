//** External Imports */
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Stack from "@mui/material/Stack";

//** Local Imports */
import { ContentResponse, LocaleProps } from "types";
import PageLayout from "surfaces/PageLayout";
import ContentCard from "containers/ContentCard";
import { client } from "api";

interface MaterialUIProps extends LocaleProps {
  content: ContentResponse[];
}

const MaterialUI: NextPage<MaterialUIProps> = ({ content }) => {
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
        {content.map(({ title, thumbnail, _id }) => (
          <ContentCard key={_id} title={title} image={thumbnail} />
        ))}
      </Stack>
    </PageLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  const response = await client.get<ContentResponse[]>(
    "/api/content/material-ui-v5"
  );

  const content = response.data;

  return {
    props: { locale, content },
  };
}

export default MaterialUI;

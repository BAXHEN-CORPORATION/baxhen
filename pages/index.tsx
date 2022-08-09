import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Baxhen</title>
        <meta name="description" content="Generated Baxhen Corporation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={() => signOut({ redirect: false })}>Sair</Button>
      <Typography>Olá {session?.user?.name}</Typography>
    </>
  );
};

export default Home;

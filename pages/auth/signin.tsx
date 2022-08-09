import { NextPage, NextPageContext } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { AppLocales } from "types";

import { styled } from "@mui/material/styles";

//** Material */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

//** Local */
import logo from "public/images/logo_110.png";
import googleIcon from "public/svg/google.svg";
import githubIcon from "public/svg/github.svg";
import linkedinIcon from "public/svg/linkedin.svg";
import WrappedImage from "components/WrappedImage";
import IconWrapper from "components/IconWrapper";
interface ISignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;

  locale: AppLocales;
}

const GoogleIcon = () => (
  <IconWrapper>
    <WrappedImage layout="fill" src={googleIcon} />
  </IconWrapper>
);
const GitHubIcon = () => (
  <IconWrapper>
    <WrappedImage layout="fill" src={githubIcon} />
  </IconWrapper>
);
const LinkedInIcon = () => (
  <IconWrapper>
    <WrappedImage layout="fill" src={linkedinIcon} />
  </IconWrapper>
);

const iconsConfig = {
  Google: <GoogleIcon />,
  GitHub: <GitHubIcon />,
  LinkedIn: <LinkedInIcon />,
};

const signInContent = {
  en: {
    noProvider: "No active provider",
    signInText: "Login for access in the following ways:",
  },
  tl: {
    noProvider: "Walang aktibong provider",
    signInText: "Mag-login para sa pag-access sa mga sumusunod na paraan:",
  },
  pt: {
    noProvider: "Nenhum provider ativo",
    signInText: "Faça login para acesso nos seguintes meios:",
  },
};

const SignIn: NextPage<ISignInProps> = ({ providers, locale }) => {
  //** State */
  //** Next Hooks */

  const { noProvider, signInText } = signInContent[locale];

  //** React Effects */

  //** */

  if (!providers) return <div>{noProvider}</div>;

  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
        padding: "2rem",
      }}
    >
      <Stack
        direction={{ mobile: "column", tablet: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={{ mobile: 3 }}
        marginTop="auto"
      >
        <WrappedImage width="110px" layout="fixed" src={logo} />
        <Typography
          variant="h1"
          sx={{
            color: "primary.main",
            fontSize: { mobile: "48px", tablet: "128px" },
            fontWeight: 400,
          }}
        >
          baxhen
        </Typography>
      </Stack>

      <Stack alignItems="center" marginBottom={8} marginTop="auto">
        <Typography
          variant="subtitle1"
          textAlign="center"
          color="common.gray"
          fontSize={{ mobile: "16px", tablet: "32px" }}
        >
          {signInText}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-evenly" marginBottom="auto">
        {Object.values(providers).map((provider) => (
          <IconButton key={provider.name} onClick={() => signIn(provider.id)}>
            {iconsConfig[provider.name as keyof typeof iconsConfig]}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
};

export async function getServerSideProps({ locale }: any) {
  const providers = await getProviders();
  return {
    props: { providers, locale },
  };
}

export default SignIn;

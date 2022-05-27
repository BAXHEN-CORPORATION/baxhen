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
import styled from "styled-components";
import { theme } from "styles/theme";
import { AppLocales } from "types";

import logo from "../../public/images/logo_110.png";
import googleIcon from "../../public/svg/google.svg";
import githubIcon from "../../public/svg/github.svg";
import linkedinIcon from "../../public/svg/linkedin.svg";

interface ISignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;

  locale: AppLocales;
}

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;
const TitleContainer = styled.div`
  margin-top: 12vh;
  display: flex;
  align-items: center;
  height: min-content;
  ${theme.device.tablet} {
    flex-direction: column;
  }
`;
const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  height: min-content;
  flex-direction: column;
  align-items: center;
  margin-bottom: auto;
`;
const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: min-content;
  justify-content: space-evenly;
`;

const Typography = styled.h1`
  color: ${({ theme }) => theme.palette.primary};
  font-size: 128px;

  ${theme.device.tablet} {
    font-size: 48px;
  }
`;
const Paragraph = styled.p`
  color: ${({ theme }) => theme.palette.gray};
  font-size: 36px;
  text-align: center;

  ${theme.device.tablet} {
    font-size: 24px;
  }
  ${theme.device.mobileM} {
    font-size: 18px;
  }
`;

const Logo = styled(Image)`
  width: 110px;
`;
const Icon = styled.div`
  position: relative;
  width: 88px;
  height: 88px;

  ${theme.device.tablet} {
    width: 62px;
    height: 62px;
  }

  ${theme.device.mobileM} {
    width: 48px;
    height: 48px;
  }
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const GoogleIcon = () => (
  <Icon>
    <Image layout="fill" src={googleIcon} />
  </Icon>
);
const GitHubIcon = () => (
  <Icon>
    <Image layout="fill" src={githubIcon} />
  </Icon>
);
const LinkedInIcon = () => (
  <Icon>
    <Image layout="fill" src={linkedinIcon} />
  </Icon>
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

  // const [locale, setLocale] = React.useState<AppLocales>("en");
  //** Next Hooks */

  const { noProvider, signInText } = signInContent[locale];

  //** React Effects */

  //** */

  if (!providers) return <div>{noProvider}</div>;

  return (
    <Root>
      {/* <Link href={"/auth/signin"} locale="en">
        en
      </Link>
      <Link href={"/auth/signin"} locale="pt">
        pt
      </Link> */}
      <TitleContainer>
        <Logo layout="fixed" src={logo} />
        <Typography>baxhen</Typography>
      </TitleContainer>
      <SignInContainer>
        <Paragraph>{signInText}</Paragraph>
        <ActionsContainer>
          {Object.values(providers).map((provider) => (
            <IconButton key={provider.name} onClick={() => signIn(provider.id)}>
              {iconsConfig[provider.name as keyof typeof iconsConfig]}
            </IconButton>
          ))}
        </ActionsContainer>
      </SignInContainer>
    </Root>
  );
};

export async function getServerSideProps({ locale }: any) {
  const providers = await getProviders();
  return {
    props: { providers, locale },
  };
}

export default SignIn;

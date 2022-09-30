// @ts-nocheck
/* tslint:disable */
/*
=========================================================
* Material Kit 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import SmartButtonIcon from "@mui/icons-material/SmartButton";
import CheckIcon from "@mui/icons-material/Check";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import WebIcon from "@mui/icons-material/Web";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ShareIcon from "@mui/icons-material/Share";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function AboutUs() {
  const data = [
    {
      icon: <SmartButtonIcon />,
      title: "Expresse a pessoa unica que você é",
      items: ["Personalização", "Diferencial"],
    },
    {
      icon: <CommentBankIcon />,
      title: "Seje lembrado(a)",
      items: ["Conte a sua história", "Destaque-se"],
    },
    {
      icon: <WebIcon />,
      title: "Faça a sua presença online",
      items: ["Seja encontrado(a)", "Deixe a sua marca"],
    },
    {
      icon: <AccountTreeIcon />,
      title: "Mostre os seus melhores projetos",
      items: ["Portifólio", "Mostre que sabe fazer"],
    },
    {
      icon: <PriceCheckIcon />,
      title: "Aumente os seus trabalhos",
      items: [
        "Mais chances de receber mais propostas de emprego",
        "Mais chances de ter salários mais altos",
      ],
    },
    {
      icon: <ShareIcon />,
      title: "Compartinhe os seus projetos",
      items: ["Compartilhe no linkedin", "Compartilhe no facebook"],
    },
  ];

  return (
    <MKBox component="section" py={12} px={1}>
      <Container>
        <Grid container item xs={12} lg={8}>
          <MKTypography variant="h3">
            Quais as vantagens de ter um website portifólio?
          </MKTypography>
          <MKTypography variant="body2" fontWeight="regular" color="text">
            Um site ou portfólio pessoal é uma oportunidade de alcançar mais
            pessoas com seu trabalho. É também uma extensão de sua personalidade
            e lhe dá a chance de criar um design que reflita quem você é como
            criativo.
          </MKTypography>
        </Grid>
        <Grid container sx={{ mt: 6 }}>
          {data.map(({ icon, title, items }) => (
            <Grid key={icon} item xs={12} md={4}>
              <MKBox py={2} pr={2}>
                <MKTypography variant="h3" color="info">
                  <Icon>{icon}</Icon>
                </MKTypography>
                <MKTypography variant="h5" mt={2} mb={3}>
                  {title}
                </MKTypography>
                {items.map((item) => (
                  <MKBox key={item} display="flex" lineHeight={1.25}>
                    <MKTypography variant="body1" color="info">
                      <Icon sx={{ fontWeight: "bold" }}>
                        <CheckIcon />
                      </Icon>
                    </MKTypography>
                    <MKBox pl={2}>
                      <MKTypography
                        variant="button"
                        color="text"
                        fontWeight="bold"
                      >
                        {item}
                      </MKTypography>
                    </MKBox>
                  </MKBox>
                ))}
              </MKBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default AboutUs;

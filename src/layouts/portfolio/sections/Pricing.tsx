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

import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React examples
import DefaultPricingCard from "examples/Cards/PricingCards/DefaultPricingCard";

// Imags
const bgImage =
  "https://images.unsplash.com/photo-1467541473380-93479a5a3ffa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2246&amp;q=80";

function Pricing() {
  return (
    <MKBox component="section" name="pricing" py={{ xs: 0, lg: 7 }}>
      <MKBox
        borderRadius="xl"
        shadow="lg"
        sx={{
          backgroundImage: ({
            palette: { gradients },
            functions: { linearGradient, rgba },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
        }}
      >
        <Container sx={{ pb: { xs: 12, lg: 22 }, pt: 12 }}>
          <Grid
            container
            item
            flexDirection="column"
            alignItems="center"
            xs={12}
            md={8}
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKBadge
              badgeContent="pricing"
              variant="gradient"
              container
              color="dark"
              sx={{ mb: 1 }}
            />
            <MKTypography variant="h3" color="white" mb={2}>
              Nossos produtos
            </MKTypography>
            <MKTypography variant="body2" color="white">
              Você terá suporte em vídeo para todos os produtos.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <MKBox mt={-16}>
        <Container>
          <MKBox position="relative" zIndex={10} px={{ xs: 1, sm: 0 }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} lg={4}>
                <DefaultPricingCard
                  badge={{ color: "light", label: "Gratis" }}
                  price={{
                    currency: "R$",
                    value: 0,
                    type: ",00",
                  }}
                  specifications={[
                    { label: "Página Principal", includes: true },
                    { label: "Experiências", includes: true },
                    { label: "Habilidades", includes: true },
                    { label: "Melhores projetos", includes: true },
                    { label: "Links sociais", includes: true },
                    { label: "Suporte em vídeo", includes: true },
                    { label: "Download currículo", includes: false },
                    { label: "Página de projetos", includes: false },
                    { label: "Página para cada projeto", includes: false },
                    { label: "Suporte por email", includes: false },
                    { label: "Compartilhar projetos", includes: false },
                  ]}
                  action={{
                    type: "internal",
                    route: "/portfolio#cta",
                    color: "dark",
                    label: "quero testar",
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <DefaultPricingCard
                  color="dark"
                  badge={{ color: "warning", label: "profissional" }}
                  price={{
                    currency: "R$",
                    value: 97,
                    type: ",00",
                  }}
                  specifications={[
                    { label: "Página Principal", includes: true },
                    { label: "Experiências", includes: true },
                    { label: "Habilidades", includes: true },
                    { label: "Melhores projetos", includes: true },
                    { label: "Links sociais", includes: true },
                    { label: "Suporte em vídeo", includes: true },
                    { label: "Download currículo", includes: true },
                    { label: "Página de projetos", includes: true },
                    { label: "Página para cada projeto", includes: true },
                    { label: "Suporte por email", includes: true },
                    { label: "Compartilhar projetos", includes: true },
                  ]}
                  action={{
                    type: "internal",
                    route: "/",
                    color: "warning",
                    label: "quero o melhor",
                  }}
                />
              </Grid>
            </Grid>
          </MKBox>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default Pricing;

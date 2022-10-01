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
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Pricing page sections
import AboutUs from "layouts/portfolio/sections/AboutUs";
import PricingSection from "layouts/portfolio/sections/Pricing";
import Testimonials from "layouts/portfolio/sections/Testimonials";

import bgImage from "assets/images/desktop_01.png";
import Link from "next/link";
import Faq from "../../layouts/portfolio/sections/Faq";

// Routes
// import routes from "routes";
// import footerRoutes from "footer.routes";

function Pricing() {
  return (
    <>
      <DefaultNavbar
        brand="baxhen"
        routes={[]}
        action={{
          type: "external",
          route: "https://sowl.co/W5Qou",
          label: "comprar",
          color: "warning",
        }}
        sticky
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.5),
              rgba(gradients.dark.state, 0.5)
            )}, url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            md={7}
            justifyContent={{ xs: "center", md: "start" }}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Um portifólio feito para você
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              mt={1}
              pr={{ md: 12, lg: 24, xl: 32 }}
              opacity={0.8}
            >
              Mostre o seu melhor para o mundo, suas experiências, projetos e
              conquistas.
            </MKTypography>
            <Stack direction="row" spacing={1} mt={6} mb={3}>
              <Link href="/portfolio#pricing" passHref>
                <MKButton component={MuiLink} variant="text" color="info">
                  comprar
                </MKButton>
              </Link>
              <MKButton
                component={MuiLink}
                target="__blank"
                href="https://sowl.co/W5Qou"
                variant="gradient"
                color="warning"
              >
                comprar
              </MKButton>

              <MKButton
                component={MuiLink}
                href="https://tiny-macaron-3edcdf.netlify.app"
                target="__blank"
                variant="gradient"
                color="info"
              >
                Exemplo ao Vivo
              </MKButton>
            </Stack>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
            rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <AboutUs />

        <Testimonials />

        <PricingSection />

        <Faq />
      </Card>
    </>
  );
}

export default Pricing;

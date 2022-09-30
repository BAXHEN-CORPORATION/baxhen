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
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Images
import image from "assets/images/desktop.png";

function StatsOne() {
  return (
    <MKBox component="section" name="cta" py={12}>
      <MKBox bgColor="grey-100" py={12} px={{ xs: 3, lg: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={6} ml="auto">
            <MKTypography variant="h4" mb={1}>
              Pegue o seu portifólio gratuítamente
            </MKTypography>
            <MKTypography variant="body2" color="text" mb={3}>
              Digite o seu email abaixo para enviarmos o portifólio com as
              instruções de uso
            </MKTypography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <MKInput label="Email Aqui" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MKButton
                  variant="gradient"
                  color="info"
                  sx={{ height: "100%" }}
                >
                  Quero meu portifólio
                </MKButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} xl={4} position="relative">
            <MKBox
              component="img"
              src={image.src}
              alt="image"
              maxWidth="18.75rem"
              width="100%"
              borderRadius="lg"
              shadow="xl"
              mt={-24}
              display={{ xs: "none", lg: "block" }}
            />
          </Grid>
        </Grid>
      </MKBox>
    </MKBox>
  );
}

export default StatsOne;
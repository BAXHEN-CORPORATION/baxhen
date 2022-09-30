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
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Pricing page components
import FaqCollapse from "layouts/portfolio/components/FaqCollapse";

function Faq() {
  const [collapse, setCollapse] = useState(false);

  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="error"
                borderRadius="lg"
                coloredShadow="error"
                p={3}
                mt={-3}
                mx={2}
              >
                <MKTypography variant="h4" color="white">
                  Perguntas Frequentes
                </MKTypography>
                <MKTypography variant="body2" color="white" opacity={0.8}>
                  Última modificação: Set 30 2022
                </MKTypography>
              </MKBox>
              <MKBox py={2} px={3}>
                <FaqCollapse
                  title="Como recebo meu site?"
                  open={collapse === 1}
                  onClick={() =>
                    collapse === 1 ? setCollapse(false) : setCollapse(1)
                  }
                >
                  O site será enviado ao email utilizado para efetuar a compra
                  ou cadastrado paar pegar a versão gratuíta em alguns minutos
                  após a confirmação da operação.
                </FaqCollapse>
                <FaqCollapse
                  title="Posso revender o site?"
                  open={collapse === 2}
                  onClick={() =>
                    collapse === 2 ? setCollapse(false) : setCollapse(2)
                  }
                >
                  Não é permitido revenda do site do modo como está. Leia a{" "}
                  <MuiLink
                    target="__blank"
                    color="waning"
                    href="https://www.baxhen.com/license.txt"
                  >
                    licença
                  </MuiLink>
                </FaqCollapse>
                <FaqCollapse
                  title="Quero meu dinheiro de volta, como proceder?"
                  open={collapse === 3}
                  onClick={() =>
                    collapse === 3 ? setCollapse(false) : setCollapse(3)
                  }
                >
                  Envie um email para o email baxhentech@gmail.com com os
                  motivos da desistência da compra em até 7 dias apartir da
                  compra e o reembolso será analisado e liberado pelo nosso
                  time.
                </FaqCollapse>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Faq;

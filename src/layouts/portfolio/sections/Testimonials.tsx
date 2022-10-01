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

import { useRef } from "react";

// SwiperJS
import SwiperCore, { Autoplay, Navigation } from "swiper";

// SwiperJS react components
import { Swiper, SwiperSlide } from "swiper/react";

// SwiperJS styles
import "swiper/css";
// import "swiper/modules/navigation/navigation.min.css";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React examples
import ComplexReviewCard from "examples/Cards/ReviewCards/ComplexReviewCard";

// Images
import review1 from "assets/images/examples/clem-onojegaw.jpg";
import review2 from "assets/images/examples/studio-3.jpg";
import logoSpotify from "assets/images/logos/small-logos/logo-spotify.svg";
import logoSlack from "assets/images/logos/small-logos/logo-slack.svg";

function Testimonials() {
  // install SwiperJS modules
  SwiperCore.use([Autoplay, Navigation]);

  // Swiper navigation buttons styles
  const navigationStyles = {
    position: "absolute",
    top: 0,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    height: "100%",
    textAlign: "center",
    opacity: 0.5,
    cursor: "pointer",
    transition: "opacity 0.15s ease",

    "&:hover, &:focus": {
      opacity: 1,
    },
  };

  // SwiperJS navigation buttons ref
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <MKBox py={8} position="relative">
      <Swiper
        onInit={({ params, navigation }) => {
          const { navigation: nav } = params;

          nav.prevEl = navigationPrevRef.current;
          nav.nextEl = navigationNextRef.current;
          navigation.init();
          navigation.update();
        }}
        autoplay={{ delay: 5000 }}
        speed={800}
        spaceBetween={0}
        slidesPerView={1}
        loop
      >
        <SwiperSlide>
          <Container>
            <ComplexReviewCard
              image={review1.src}
              title="Rapido e com muita qualidade"
              review="Consegui me posicionar de forma bem mais acertiva e me diferenciava dos concorrentes sempre que participava de entrevistas."
              author={{
                logo: logoSpotify.src,
                name: "Mateus Pereira",
                role: "Programador Web",
              }}
            />
          </Container>
        </SwiperSlide>
        <SwiperSlide>
          <Container>
            <ComplexReviewCard
              image={review2.src}
              title="Designer Web"
              review="Foi incrível como a minha imagem profissional se fortaleceu, graças a isso cobro mais dos meus clientes."
              author={{
                logo: logoSlack.src,
                name: "Angelina Moura",
                role: "Designer Freelancer",
              }}
            />
          </Container>
        </SwiperSlide>
        <MKTypography
          variant="h2"
          color="dark"
          sx={{
            ...navigationStyles,
            left: 0,
          }}
          ref={navigationPrevRef}
        >
          <Icon>
            <ChevronLeftIcon />
          </Icon>
        </MKTypography>
        <MKTypography
          variant="h2"
          color="dark"
          sx={{
            ...navigationStyles,
            right: 0,
          }}
          ref={navigationNextRef}
        >
          <Icon>
            <ChevronRightIcon />
          </Icon>
        </MKTypography>
      </Swiper>
    </MKBox>
  );
}

export default Testimonials;

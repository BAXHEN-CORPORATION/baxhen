//** External Imports */
import Slide from "@mui/material/Slide";
import { useScrollTrigger } from "hooks/custom";
import React from "react";

//** Local Imports */

//** Typings */
export interface HideOnScrollProps {
  children: React.ReactElement;
}

//** Default Props */
const defaultProps: Partial<HideOnScrollProps> = {};

/**
 * Component for hide element on scroll
 *
 * @component
 */
const HideOnScroll: React.FC<HideOnScrollProps> = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide
      appear={false}
      timeout={{ enter: 500, exit: 200 }}
      direction="down"
      in={!trigger}
    >
      {children}
    </Slide>
  );
};

HideOnScroll.defaultProps = defaultProps;

export default HideOnScroll;

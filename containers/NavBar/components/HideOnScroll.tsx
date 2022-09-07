//** External Imports */
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
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
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.defaultProps = defaultProps;

export default HideOnScroll;

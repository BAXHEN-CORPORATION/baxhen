import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

//** Typings */

export interface IIconWrapperProps {}

/**
 * Component for wrapping the next/image component with material ui
 *
 * @component
 */
const IconWrapper = styled(Box)<IIconWrapperProps>(({ theme }) => ({
  position: "relative",
  width: "48px",
  height: "48px",

  [theme.breakpoints.up("tablet")]: {
    width: "62px",
    height: "62px",
  },
  [theme.breakpoints.up("laptop")]: {
    width: "84px",
    height: "84px",
  },
}));

export default IconWrapper;

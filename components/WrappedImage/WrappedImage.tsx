import { styled } from "@mui/material/styles";
import Image from "next/image";

//** Typings */

export interface IWrappedImageProps {}

/**
 * Component for wrapping the next/image component with material ui
 *
 * @component
 */
const WrappedImage = styled(Image)<IWrappedImageProps>();

export default WrappedImage;

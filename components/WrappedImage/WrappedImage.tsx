import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Image, { ImageProps } from "next/image";

//** Typings */

export interface IWrappedImageProps {}

/**
 * Component for wrapping the next/image component with material ui
 *
 * @component
 */
const WrappedImage = styled(
  ({
    width,
    height,
    ...props
  }: Omit<ImageProps, "width" | "height"> & { width: any; height: any }) => (
    <Box width={width} height={height}>
      <Image {...props} layout="responsive" />
    </Box>
  )
)<IWrappedImageProps>();

export default WrappedImage;

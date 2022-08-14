//** External Imports */
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

//** Local Imports */

//** Typings */
export interface ContentCardProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  image?: string;
}

//** Default Props */
const defaultProps: Partial<ContentCardProps> = {};

/**
 * Container for displaying card info with image and clickable
 *
 * @container
 */
const ContentCard: React.FC<ContentCardProps> = ({
  onClick,
  title = "No Title Provided",
  image = "https://i3.ytimg.com/vi/o1chMISeTC0/maxresdefault.jpg",
}) => {
  return (
    <Card
      sx={{
        minWidth: { mobile: 200, tablet: 466 },
        borderRadius: "30px",
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          sx={{ height: { mobile: "100px", tablet: "250px" } }}
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="caption" color="primary" gutterBottom>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ContentCard.defaultProps = defaultProps;

export default ContentCard;

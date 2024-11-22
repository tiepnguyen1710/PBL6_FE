import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";

export const LessonCard: React.FC<
  {
    name: string;
    image: string;
    onClickCard?: (e: React.MouseEvent<HTMLDivElement>) => void;
  } & BoxProps
> = ({ name, image, sx, onClickCard, ...rest }) => {
  return (
    <Box sx={{ width: "173px", overflow: "hidden", ...sx }} {...rest}>
      <Box
        sx={{
          borderRadius: "20px",
          width: "173px",
          height: "173px",
          backgroundColor: "#f0f0f0",
          padding: "30px",
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={onClickCard}
      >
        <img src={image} style={{ height: "100%" }} />
      </Box>
      <Typography
        variant="h6"
        sx={{
          textTransform: "uppercase",
          marginTop: "12px",
          textAlign: "center",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

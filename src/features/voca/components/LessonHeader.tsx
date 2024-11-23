import { Box, IconButton, Stack, Typography } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import WhiteLogo from "../assets/logo-white.svg";

interface LessonHeader {
  title: string;
  onClick?: () => void;
}

const LessonHeader: React.FC<LessonHeader> = ({ title, onClick }) => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          maxWidth: "980px",
          minHeight: "70px",
          mx: "auto",
        }}
        justifyContent="space-between"
      >
        <IconButton onClick={onClick}>
          <RxCross2 style={{ color: "white", fontSize: "2rem" }} />
        </IconButton>
        <Stack alignItems="center">
          <img src={WhiteLogo} style={{ height: "28px" }} />
          <Typography
            color="white"
            sx={{
              fontFamily: '"Potta One"',
              fontSize: "12px",
            }}
          >
            Learn by heart
          </Typography>
        </Stack>
        <Box
          sx={{
            borderRadius: "12px",
            border: "2px solid white",
            display: "inline-block",
            minWidth: "110px",
            textAlign: "center",
          }}
        >
          <Typography
            color="white"
            sx={{
              fontSize: 18,
              lineHeight: "52px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default LessonHeader;

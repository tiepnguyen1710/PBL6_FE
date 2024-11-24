import { Box, Typography } from "@mui/material";
import { Image } from "./UI/Image";

interface VocabularyFrontSideProps {
  word: string;
  phonetic: string;
  image?: string;
}

const VocabularyFrontSide: React.FC<VocabularyFrontSideProps> = ({
  word,
  phonetic,
  image = "",
}) => {
  return (
    <Box sx={{ padding: "15px", height: "100%" }}>
      <Image src={image} sx={{ height: "150px", borderRadius: "6px" }} />
      <Typography
        variant="inherit"
        sx={{
          marginTop: "12px",
          fontSize: "18px",
          lineHeight: "22px",
          fontWeight: 600,
        }}
      >
        {word}
      </Typography>
      <Typography sx={{ fontSize: "14px", color: "#777777" }}>
        {phonetic}
      </Typography>
    </Box>
  );
};
export default VocabularyFrontSide;

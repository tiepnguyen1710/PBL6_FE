import { Box, Typography } from "@mui/material";
import { Image } from "./UI/Image";
import DefaultVocaImage from "../assets/images/voca/default-voca-image.jpg";
import CloseSmIcon from "../assets/icons/close-sm.svg";

interface VocabularyFrontSideProps {
  word: string;
  phonetic: string;
  image?: string;
  onClose?: () => void;
}

const VocabularyFrontSide: React.FC<VocabularyFrontSideProps> = ({
  word,
  phonetic,
  image,
  onClose,
}) => {
  const isCloseable = !!onClose;
  return (
    <Box sx={{ padding: "15px", height: "100%", position: "relative" }}>
      {isCloseable && (
        <Image
          src={CloseSmIcon}
          onClick={onClose}
          sx={{
            width: "12px",
            height: "12px",
            position: "absolute",
            right: 8,
            top: 8,
          }}
        />
      )}
      <Image
        src={image || DefaultVocaImage}
        sx={{
          width: isCloseable ? "140px" : "150px",
          height: isCloseable ? "140px" : "150px",
          borderRadius: "6px",
          marginTop: isCloseable ? "10px" : 0,
          mx: isCloseable ? "6px" : 0,
        }}
      />
      <Typography
        variant="inherit"
        sx={{
          marginTop: "12px",
          fontSize: "18px",
          lineHeight: "22px",
          fontWeight: 500,
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

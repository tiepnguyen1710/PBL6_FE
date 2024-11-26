import { Box, LinearProgress, Stack, SxProps, Typography } from "@mui/material";
import StarIcon from "./StarIcon";

interface LearningLessonProgressProps {
  sx?: SxProps;
  totalWords: number;
  retainedWords: number;
}

const LearningLessonProgress: React.FC<LearningLessonProgressProps> = ({
  sx,
  totalWords,
  retainedWords,
}) => {
  return (
    <Stack spacing={0.5} direction="row">
      <Box sx={{ position: "relative", ...sx }}>
        <LinearProgress
          variant="determinate"
          value={100}
          color="success"
          sx={{
            width: "100%",
            height: "23px",
            borderRadius: "23px",
            backgroundColor: "#f0f0f0",
            flexGrow: 1,
            "& .MuiLinearProgress-bar": {
              border: "6px solid #7AC70C",
              background: "#8EE000",
              borderRadius: "23px",
              transform: "none",
              width: `${(retainedWords / totalWords) * 100}% !important`,
            },
          }}
        />
        <Typography
          fontSize={12}
          sx={{
            color: "var(--text-light)",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "medium",
          }}
        >
          {retainedWords}/{totalWords}
        </Typography>
      </Box>
      <StarIcon active={retainedWords == totalWords} />
    </Stack>
  );
};

export default LearningLessonProgress;

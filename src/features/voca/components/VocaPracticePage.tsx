import { Clear } from "@mui/icons-material";
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import ClockIcon from "../assets/clock-icon.svg";
import { Image } from "../../../components/UI/Image";
import { useEffect, useMemo, useState } from "react";
import { generateRandomExercises } from "../utils/exercise-helper";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import { getLessonById } from "../../admin/vocasets/api/lesson-api";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import VocabularyModel from "../../../types/VocabularyModel";
import TestingExercise from "./TestingExercise";
import { Exercise } from "../types/Exercise";

const NUMBER_OF_EXERCISES = 8;

const VocaPracticePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  const [vocabularies, setVocabularies] = useState<VocabularyModel[]>([]);

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", { id: lessonId }],
    queryFn: () => getLessonById(lessonId!),
    enabled: !!lessonId,
  });

  const [exerciseIdx, setExerciseIdx] = useState(0);

  const exercises = useMemo(() => {
    if (vocabularies.length === 0) {
      return [];
    }

    return generateRandomExercises(vocabularies, NUMBER_OF_EXERCISES);
  }, [vocabularies]);

  const activeExercise: Exercise | undefined = exercises[exerciseIdx];

  useEffect(() => {
    if (lesson) {
      setVocabularies(lesson.__listWord__ || []);
    }
  }, [lesson]);

  const handleFulFillExercise = () => {
    // setExerciseIdx((prev) => Math.min(prev + 1, exercises.length - 1));
    setExerciseIdx((prev) => prev + 1);
  };

  if (!lessonId) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading ? (
        <CustomBackdrop open={isLoading} />
      ) : (
        <Box sx={{ maxWidth: "962px", mx: "auto", padding: "30px 15px" }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton>
              <Clear />
            </IconButton>
            <LinearProgress
              variant="determinate"
              value={100}
              color="success"
              sx={{
                width: "100%",
                height: "15px",
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                flexGrow: 1,
                "& .MuiLinearProgress-bar": {
                  border: "5px solid #7AC70C",
                  background: "#8EE000",
                  borderRadius: "23px",
                  transform: "none",
                  width: `${(exerciseIdx / exercises.length) * 100}% !important`,
                  transition: "width 0.3s ease-in-out",
                },
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.4}
              sx={{
                color: "#CE82FF",
                fontSize: "22px",
                fontWeight: "medium",
                paddingLeft: "8px",
              }}
            >
              <Image
                src={ClockIcon}
                sx={{ width: "30px", display: "inline-block" }}
              />
              <Typography variant="inherit" component="span">
                00:00
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ py: "25px" }}>
            {activeExercise && (
              <TestingExercise
                exercise={activeExercise}
                key={exerciseIdx + "-" + activeExercise.voca.id}
                onFulfilled={handleFulFillExercise}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default VocaPracticePage;

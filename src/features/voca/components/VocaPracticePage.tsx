import { Clear } from "@mui/icons-material";
import { Box, IconButton, LinearProgress, Stack } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { generateRandomExercises } from "../utils/exercise-helper";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import { getLessonById } from "../../admin/vocasets/api/lesson-api";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import VocabularyModel from "../../../types/VocabularyModel";
import TestingExercise from "./TestingExercise";
import { Exercise } from "../types/Exercise";
import WrongAnswerAudio from "../assets/learning_wrong.mp3";
import CorrectAnswerAudio from "../assets/learning_right.mp3";
import ClockTimer from "./ClockTimer";
import { AnimatePresence } from "framer-motion";

const NUMBER_OF_EXERCISES = 20;

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

  const wrongAnswerAudioRef = useRef<HTMLAudioElement>(null);
  const correctAnswerAudioRef = useRef<HTMLAudioElement>(null);

  const playWrongAnswerAudio = () => {
    wrongAnswerAudioRef.current?.play();
  };

  const playCorrectAnswerAudio = async () => {
    await correctAnswerAudioRef.current?.play();
    // Add a little delay
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  };

  const handleCorrectAnswer = async () => {
    await playCorrectAnswerAudio();
  };

  const handleWrongAnswer = () => {
    playWrongAnswerAudio();
  };

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
            <ClockTimer
              key={exerciseIdx}
              duration={15}
              sx={{ paddingLeft: "8px" }}
            />
          </Stack>

          <Box sx={{ py: "25px", position: "relative" }}>
            {activeExercise && (
              <AnimatePresence>
                <TestingExercise
                  exercise={activeExercise}
                  key={exerciseIdx + "-" + activeExercise.voca.id}
                  onFulfilled={handleFulFillExercise}
                  onCorrectAnswer={handleCorrectAnswer}
                  onWrongAnswer={handleWrongAnswer}
                />
              </AnimatePresence>
            )}
          </Box>
        </Box>
      )}

      {/* Audio */}
      <audio id="audio-answer-wrong" ref={wrongAnswerAudioRef}>
        <source src={WrongAnswerAudio} type="audio/mpeg" />
      </audio>
      <audio id="audio-answer-correct" ref={correctAnswerAudioRef}>
        <source src={CorrectAnswerAudio} type="audio/mpeg" />
      </audio>
    </>
  );
};

export default VocaPracticePage;

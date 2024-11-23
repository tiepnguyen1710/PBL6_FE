import { Clear } from "@mui/icons-material";
import { Box, IconButton, LinearProgress, Stack } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { getExerciseSet } from "../utils/exercise-helper";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import { getLessonById } from "../../admin/vocasets/api/lesson-api";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import VocabularyModel from "../../../types/VocabularyModel";
import TestingExercise from "./TestingExercise";
import { Exercise } from "../types/Exercise";
import WrongAnswerAudio from "../assets/learning_wrong.mp3";
import CorrectAnswerAudio from "../assets/learning_right.mp3";
import ClockTimer, { ClockTimerRef } from "./ClockTimer";
import { AnimatePresence } from "framer-motion";
import SuspendLearningDrawer from "./SuspendLearningDrawer";

const MIN_NUMBER_OF_EXERCISES = 10;

const VocaPracticePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  const [vocabularies, setVocabularies] = useState<VocabularyModel[]>([]);
  // console.log("vocabularies", vocabularies);

  const [openExitDrawer, setOpenExitDrawer] = useState(false);

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

    // console.log("getExerciseSet", vocabularies, MIN_NUMBER_OF_EXERCISES);
    return getExerciseSet(vocabularies, MIN_NUMBER_OF_EXERCISES);
  }, [vocabularies]);

  const activeExercise: Exercise | undefined = exercises[exerciseIdx];

  const wrongAnswerAudioRef = useRef<HTMLAudioElement>(null);
  const correctAnswerAudioRef = useRef<HTMLAudioElement>(null);

  const clockTimerRef = useRef<ClockTimerRef>(null);

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

  const handleAnswerExercise = () => {
    clockTimerRef.current?.stop();
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
          {/* Header */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            {/* Close button */}
            <IconButton onClick={() => setOpenExitDrawer(true)}>
              <Clear />
            </IconButton>

            {/* Progress bar */}
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
              delay={1}
              timerRef={clockTimerRef}
              sx={{ paddingLeft: "8px" }}
            />
          </Stack>

          <Box sx={{ py: "25px", position: "relative", marginTop: 2 }}>
            {activeExercise && (
              <AnimatePresence>
                <TestingExercise
                  exercise={activeExercise}
                  key={exerciseIdx + "-" + activeExercise.voca.id}
                  onFulfilled={handleFulFillExercise}
                  onCorrectAnswer={handleCorrectAnswer}
                  onWrongAnswer={handleWrongAnswer}
                  onAnswered={handleAnswerExercise}
                />
              </AnimatePresence>
            )}
          </Box>

          <SuspendLearningDrawer
            open={openExitDrawer}
            onClose={() => setOpenExitDrawer(false)} // onCloseDrawer
            onClickStay={() => setOpenExitDrawer(false)}
            exitLink={`/voca/${lesson?.__groupTopic__.id}/lessons`}
          />
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

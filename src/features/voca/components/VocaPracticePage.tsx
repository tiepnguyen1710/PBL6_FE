import { Clear } from "@mui/icons-material";
import { Box, IconButton, LinearProgress, Stack } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getExerciseSet } from "../utils/exercise-helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
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
import { PostLearningResultRequest } from "../types/LearningResultRequest";
import { createLearningResult } from "../api/voca-learning";

const MIN_NUMBER_OF_EXERCISES = 4;
const DURATION_PER_EXERCISE = 15; // seconds

const VocaPracticePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id");

  const [vocabularies, setVocabularies] = useState<VocabularyModel[]>([]);
  // console.log("vocabularies", vocabularies);

  const [correctVocaIds, setCorrectVocaIds] = useState<string[]>([]);
  const [takenTime, setTakenTime] = useState(0);

  const [openExitDrawer, setOpenExitDrawer] = useState(false);

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", { id: lessonId }],
    queryFn: () => getLessonById(lessonId!),
    enabled: !!lessonId,
  });

  const [exerciseIdx, setExerciseIdx] = useState(0);

  const repeatTimes = useMemo(() => {
    const numOfVocabularies = vocabularies.length;
    return Math.ceil(MIN_NUMBER_OF_EXERCISES / (2 * numOfVocabularies));
  }, [vocabularies]);

  const exercises = useMemo(() => {
    if (vocabularies.length === 0) {
      return [];
    }

    return getExerciseSet(vocabularies, repeatTimes);
  }, [vocabularies, repeatTimes]);

  const activeExercise: Exercise | undefined = exercises[exerciseIdx];

  const wrongAnswerAudioRef = useRef<HTMLAudioElement>(null);
  const correctAnswerAudioRef = useRef<HTMLAudioElement>(null);

  const clockTimerRef = useRef<ClockTimerRef>(null);

  const postLearningResultMutation = useMutation({
    mutationFn: createLearningResult,
    onSuccess: () => {
      console.log("Post learning result successfully");
      navigate(
        `/lesson/learning-result?id=${lessonId}&vocaSetId=${lesson?.__groupTopic__.id}`,
      );
    },
  });

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

  const handleCorrectAnswer = async (correctVocaId: string) => {
    setCorrectVocaIds((prev) => [...prev, correctVocaId]);
    await playCorrectAnswerAudio();
  };

  const handleWrongAnswer = () => {
    playWrongAnswerAudio();
  };

  const postLearningResult = useCallback(() => {
    const listCorrectWord = new Set<string>();
    const listIncorrectWord = new Set<string>();

    for (const {
      voca: { id },
    } of exercises) {
      // As each voca has been repeated `repeatTimes` times
      // So, a voca is considered correct if it is answered correctly `repeatTimes` times
      if (
        correctVocaIds.filter((vocaId) => vocaId === id).length == repeatTimes
      ) {
        listCorrectWord.add(id);
      } else {
        listIncorrectWord.add(id);
      }
    }

    const request: PostLearningResultRequest = {
      idTopic: lessonId!,
      listCorrectWord: [...listCorrectWord],
      listIncorrectWord: [...listIncorrectWord],
      time: takenTime,
    };

    console.log(request);

    postLearningResultMutation.mutate(request);
  }, [
    exercises,
    correctVocaIds,
    lessonId,
    postLearningResultMutation,
    repeatTimes,
    takenTime,
  ]);

  useEffect(() => {
    if (lesson) {
      setVocabularies(lesson.__listWord__ || []);
    }
  }, [lesson]);

  const handleFulFillExercise = useCallback(() => {
    // The callback is re-defined in each time `exerciseIdx` changes, so the `exerciseIdx` is always the latest
    if (exercises.length > 0 && exerciseIdx + 1 >= exercises.length) {
      // Finish lesson
      postLearningResult();
    } else {
      setExerciseIdx((prev) => prev + 1);
    }
  }, [exercises.length, exerciseIdx, postLearningResult]);

  const handleAnswerExercise = useCallback(() => {
    const remainingTime = clockTimerRef.current?.stop() || 0;
    const implementTime = DURATION_PER_EXERCISE - remainingTime;

    setTakenTime((prev) => prev + implementTime);
  }, [clockTimerRef, setTakenTime]);

  if (!lessonId) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading ? (
        <CustomBackdrop open={isLoading} />
      ) : (
        <Box sx={{ maxWidth: "962px", mx: "auto", padding: "30px 15px" }}>
          {postLearningResultMutation.isPending && <CustomBackdrop open />}
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
              duration={DURATION_PER_EXERCISE}
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

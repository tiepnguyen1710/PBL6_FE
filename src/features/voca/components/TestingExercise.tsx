import { Box, Grid2, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Exercise } from "../types/Exercise";
import PracticeFlipAnimation from "./PracticeFlipAnimation";
import PracticeResultSlide from "./PracticeResultSlide";
import AnswerGuessItem from "./AnswerGuessItem";
import { ExerciseType } from "../types/ExerciseType";
import PhoneticQuestionSlide from "./PhoneticQuestionSlide";
import MeaningQuestionSlide from "./MeaningQuestionSlide";
import WordQuestionSlide from "./WordQuestionSlide";
import AnswerForm from "./AnswerForm";

interface TestingExerciseProps {
  exercise: Exercise;
  onFulfilled?: () => void;
}

const TestingExercise: React.FC<TestingExerciseProps> = ({
  exercise,
  onFulfilled,
}) => {
  const [userAnswer, setUserAnswer] = useState<string>("");

  const hasAnswered = userAnswer !== "";
  const isAnswerCorrect = hasAnswered && userAnswer === exercise.correctAnswer;

  const mainVoca = exercise.voca;
  const isSelectQuestion = exercise.options && exercise.options.length > 0;

  const firstSlide = useMemo(() => {
    switch (exercise.type) {
      case ExerciseType.CHOOSE_WORD_BASED_ON_AUDIO: {
        return <PhoneticQuestionSlide voca={mainVoca} />;
      }
      case ExerciseType.CHOOSE_WORD_BASED_ON_SUGGESTION: {
        return <WordQuestionSlide voca={mainVoca} />;
      }
      case ExerciseType.CHOOSE_MEANING_BASED_ON_WORD: {
        return <MeaningQuestionSlide voca={mainVoca} />;
      }
    }

    return <WordQuestionSlide voca={mainVoca} />;
  }, [exercise.type, mainVoca]);

  const handleSelectAnswer = (selectedAnswer: string) => {
    console.log("selectedAnswer", selectedAnswer);
    if (!userAnswer) {
      setUserAnswer(selectedAnswer);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (hasAnswered) {
      timeout = setTimeout(() => {
        onFulfilled?.();
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [hasAnswered, onFulfilled]);

  return (
    <Box>
      <Stack direction="row">
        <Box sx={{ width: "180px" }}></Box>
        <Box sx={{ flexGrow: 1, minWidth: "360px" }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: "28px",
              color: "#4c4c4c",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
            align="center"
          >
            {exercise.question}
          </Typography>

          <PracticeFlipAnimation
            firstSlide={firstSlide}
            secondSlide={
              <PracticeResultSlide
                word={mainVoca.word}
                audio={mainVoca.audio}
                meaning={mainVoca.translate}
                phonetic={mainVoca.pronunciation}
                thumbnail={mainVoca.thumbnail}
              />
            }
            flip={hasAnswered}
          />

          <Box sx={{ mt: 2.5 }}></Box>
        </Box>
      </Stack>
      {isSelectQuestion ? (
        // Select question
        <Grid2 container spacing="26px" sx={{ px: "13px", marginTop: 2.5 }}>
          {exercise.options?.map((option) => {
            let state: "correct" | "wrong" | "default" = "default";

            if (hasAnswered) {
              if (option === exercise.correctAnswer) {
                state = "correct";
              } else if (option === userAnswer) {
                state = "wrong";
              }
            }

            return (
              <Grid2 size={6} key={option}>
                <AnswerGuessItem
                  answer={option}
                  disabled={hasAnswered}
                  state={state}
                  onClick={handleSelectAnswer}
                />
              </Grid2>
            );
          })}
        </Grid2>
      ) : (
        // Fill question
        <Box sx={{ mt: 1 }}>
          <AnswerForm
            placeholder="Type your answer here"
            inputSx={{
              maxWidth: "730px",
              width: "100%",
              height: "auto",
              paddingBottom: "80px",
            }}
            active={true}
            status={
              isAnswerCorrect ? "correct" : hasAnswered ? "wrong" : "default"
            }
            onSubmit={handleSelectAnswer}
          />
        </Box>
      )}
    </Box>
  );
};

export default TestingExercise;

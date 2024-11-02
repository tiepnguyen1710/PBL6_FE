import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import WhiteLogo from "../assets/logo-white.svg";
import { RxCross2 } from "react-icons/rx";
import { useRef, useState } from "react";
import ArrowIcon from "./ArrowIcon";
import FlashCardComposition from "./FlashCardComposition";
import { mockVocabularies } from "../utils/data";
import WrongAnswerAudio from "../assets/learning_wrong.mp3";
import CorrectAnswerAudio from "../assets/learning_right.mp3";

const LearningVocaPage: React.FC = () => {
  const [currentVocaIdx, setCurrentVocaIdx] = useState(0);
  const voca = mockVocabularies[currentVocaIdx];
  const vocaLength = mockVocabularies.length;

  const wrongAnswerAudioRef = useRef<HTMLAudioElement>(null);
  const correctAnswerAudioRef = useRef<HTMLAudioElement>(null);

  const handleNext = () => {
    setCurrentVocaIdx((prev) => Math.min(prev + 1, vocaLength - 1));
  };

  const handlePrev = () => {
    setCurrentVocaIdx((prev) => Math.max(prev - 1, 0));
  };

  const playWrongAnswerAudio = () => {
    wrongAnswerAudioRef.current?.play();
  };

  const playCorrectAnswerAudio = () => {
    correctAnswerAudioRef.current?.play();
  };

  const handleCorrectAnswer = () => {
    playCorrectAnswerAudio();
  };

  const handleWrongAnswer = () => {
    playWrongAnswerAudio();
  };
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      {/*  Header */}
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
          <IconButton>
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
            <Typography color="white" sx={{ fontSize: 18, lineHeight: "52px" }}>
              LEARN
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "962px",
          mx: "auto",
          flexGrow: 1,
        }}
      >
        {/* Question progress */}
        <Stack
          direction="row"
          alignItems="center"
          sx={{ padding: "30px 15px", marginBottom: "24px" }}
          spacing={1}
        >
          <Typography fontSize={22} fontWeight={700} color="#B4B4B4">
            {currentVocaIdx + 1}/{vocaLength}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={((currentVocaIdx + 1) / vocaLength) * 100}
            color="success"
            sx={{
              height: "15px",
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              flexGrow: 1,
            }}
          />
        </Stack>
        {/* {mockVocabularies.map((voca) => ( */}
        <FlashCardComposition
          key={voca.id}
          voca={voca}
          onCorrectAnswer={handleCorrectAnswer}
          onWrongAnswer={handleWrongAnswer}
          onSubmitAfterCorrectAnswer={handleNext}
        />
        {/* ))} */}
      </Box>
      {/* Next/prev button */}
      <Box
        sx={{
          width: "100%",
          borderTop: "2px solid #E5E5E5",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "100px", maxWidth: "962px", mx: "auto" }}
        >
          <ArrowIcon
            sx={{
              color: "primary.main",
              fontSize: "70px",
              cursor: "pointer",
              transform: "scaleX(-1)",
            }}
            onClick={handlePrev}
          />
          <ArrowIcon
            sx={{ color: "primary.main", fontSize: "70px", cursor: "pointer" }}
            onClick={handleNext}
          />
        </Stack>
      </Box>
      {/* Audio */}
      <audio id="audio-answer-wrong" ref={wrongAnswerAudioRef}>
        <source src={WrongAnswerAudio} type="audio/mpeg" />
      </audio>
      <audio id="audio-answer-correct" ref={correctAnswerAudioRef}>
        <source src={CorrectAnswerAudio} type="audio/mpeg" />
      </audio>
    </Stack>
  );
};

export default LearningVocaPage;

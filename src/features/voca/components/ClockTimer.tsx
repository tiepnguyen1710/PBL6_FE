import { Box, Stack, SxProps, Typography } from "@mui/material";
import { Image } from "../../../components/UI/Image";
import ClockIcon from "../assets/clock-icon.svg";
import React, { useEffect, useRef, useState } from "react";
import { secondToMinuteSecondFormat } from "../../../utils/helper";
import SecondTickAudio from "../assets/second_tick.mp3";
import ClockTickAudio from "../assets/clock_tick.mp3";

interface ClockTimerProps {
  sx: SxProps;
  duration: number; // in seconds
}

const ClockTimer: React.FC<ClockTimerProps> = ({ sx, duration }) => {
  const secondTickRef = useRef<HTMLAudioElement>(null);
  const clockTickRef = useRef<HTMLAudioElement>(null);

  const [time, setTime] = useState(duration);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  if (time <= 0) {
    clearInterval(intervalRef.current!);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [duration]);

  useEffect(() => {
    // Based on time to do side effect
    if (time > 5) {
      if (secondTickRef.current) {
        secondTickRef.current.currentTime = 0; // reset the audio as this audio duration is 1 second, no need to wait for it to finish
        secondTickRef.current.play();
      }
    } else if (clockTickRef.current) {
      clockTickRef.current.currentTime = 0;
      clockTickRef.current.play();
    }
  }, [time]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.4}
      sx={{
        color: "#CE82FF",
        fontSize: "22px",
        fontWeight: "medium",
        minWidth: "120px",
        ...sx,
      }}
    >
      <Image src={ClockIcon} sx={{ width: "30px", display: "inline-block" }} />
      <Typography variant="inherit" component="span">
        {secondToMinuteSecondFormat(time)}
      </Typography>

      <Box sx={{ display: "none" }}>
        <audio src={SecondTickAudio} ref={secondTickRef} />
        <audio src={ClockTickAudio} ref={clockTickRef} />
      </Box>
    </Stack>
  );
};

export default ClockTimer;

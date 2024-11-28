import { Box } from "@mui/material";
import {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { toHHMMSS } from "../../helper";

export interface TimerCountdownRef {
  submit: () => number;
}

interface TimerCountdownProps {
  duration: string;
  timerRef?: RefObject<TimerCountdownRef>;
}

const TimerCountdown: React.FC<TimerCountdownProps> = ({
  duration,
  timerRef,
}) => {
  const [time, setTime] = useState<number>(+duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useImperativeHandle(timerRef, () => ({
    submit: () => {
      clearInterval(intervalRef.current!);
      return time;
    },
  }));

  useEffect(() => {
    if (time === 0) {
      //props.handleSubmit();
      return;
    }

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
  }, []);

  return (
    <>
      <Box
        sx={{
          fontSize: "25px",
          fontWeight: "600",
        }}
      >
        {toHHMMSS(time)}
      </Box>
    </>
  );
};

export default TimerCountdown;

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores";

const TimerCountdown = (props: any) => {
  const limitTime = useSelector(
    (state: RootState) => state.selectedParts.limitTime,
  );
  const [count, setCount] = useState<number>(+limitTime);

  useEffect(() => {
    if (count === 0) {
      props.handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  const toHHMMSS = (secs: number) => {
    //const sec_num = parseInt(secs, 10);
    const sec_num = secs;
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return (
    <>
      <Box
        sx={{
          fontSize: "25px",
          fontWeight: "600",
        }}
      >
        {toHHMMSS(count)}
      </Box>
    </>
  );
};

export default TimerCountdown;

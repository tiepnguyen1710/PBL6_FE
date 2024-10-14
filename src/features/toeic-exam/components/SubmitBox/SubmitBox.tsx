import { Box, Button } from "@mui/material";
import TimerCountdown from "./TimerCountdown";
import ListQuestion from "./ListQuestions";

const SubMitBox = () => {
  const handleSubmit = () => {
    alert("time up");
  };
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        <TimerCountdown handleSubmit={handleSubmit} />
      </Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Button
          sx={{
            padding: "8px 50px",
            borderRadius: "5px",
            color: "var(--color-primary-main)",
            border: "1px solid var(--color-primary-main)",
            background: "white",
            ":hover": {
              color: "white",
              background: "var(--color-primary-main)",
            },
          }}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <ListQuestion />
      </Box>
    </>
  );
};

export default SubMitBox;

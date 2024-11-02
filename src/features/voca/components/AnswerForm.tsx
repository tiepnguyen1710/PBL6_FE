import { Stack } from "@mui/material";
import AnswerInput from "./AnswerInput";
import CuteButton from "./CuteButton";
import { useState } from "react";

interface AnswerFormProps {
  onSubmit: (answer: string) => void;
  status: "correct" | "wrong" | "default";
  onChange?: (answer: string) => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({
  status,
  onSubmit,
  onChange,
}) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const [answer, setAnswer] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setIsEmpty(inputValue === "");
    setAnswer(inputValue);

    if (onChange) {
      onChange(inputValue);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={0.75}
      justifyContent="center"
      sx={{ marginTop: 2.5 }}
    >
      <AnswerInput
        autoFocus
        placeholder="Type the vocabulary you guessed here."
        status={status}
        sx={{ minWidth: "500px" }}
        value={answer}
        onChange={handleChangeInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit(answer);
          }
        }}
      />
      <CuteButton
        label="Submit"
        noShadow
        noBorder
        sx={{
          backgroundColor: "#E5E5E5",
          "&:hover > span": { color: "primary.main" },
        }}
        active={!isEmpty}
        onClick={() => onSubmit(answer)}
      />
    </Stack>
  );
};

export default AnswerForm;

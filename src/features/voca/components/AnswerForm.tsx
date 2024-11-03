import { Stack } from "@mui/material";
import AnswerInput from "./AnswerInput";
import CuteButton from "./CuteButton";
import { useState } from "react";

interface AnswerFormProps {
  onSubmit: (answer: string) => Promise<void>;
  status: "correct" | "wrong" | "default";
  active?: boolean;
  onChange?: (answer: string) => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({
  status,
  active = false,
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
        placeholder="Type the vocabulary you guessed here."
        status={status}
        active={active}
        sx={{ minWidth: "500px" }}
        value={answer}
        onChange={handleChangeInput}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await onSubmit(answer);
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
        onClick={async () => await onSubmit(answer)}
      />
    </Stack>
  );
};

export default AnswerForm;

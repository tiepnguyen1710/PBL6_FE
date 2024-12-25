import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface CommentFormProps {
  handleSubmit: (content: string, parentId: string | null) => void;
  submitLabel: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  handleSubmit,
  submitLabel,
}) => {
  const [text, setText] = useState<string>("");
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event: any) => {
    event.preventDefault();
    handleSubmit(text, null);
    setText("");
  };
  return (
    <Stack direction="row" gap={1} mb={1}>
      <TextField
        size="small"
        sx={{ width: "100%" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
      />
      <Button
        variant="contained"
        disabled={isTextareaDisabled}
        onClick={onSubmit}
      >
        {submitLabel}
      </Button>
    </Stack>
  );
};

export default CommentForm;

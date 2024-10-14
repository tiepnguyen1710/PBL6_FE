import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import InputProps from "../types/InputProps";

const RoundedInput: React.FC<InputProps> = ({
  label,
  placeholder = "",
  validationError = "",
  ...props
}) => {
  const hasError = Boolean(validationError);

  return (
    <Stack spacing={1}>
      <Typography component="label" sx={{ color: "secondary.dark" }}>
        {label}
      </Typography>
      <FormControl error={hasError}>
        <OutlinedInput
          placeholder={placeholder}
          {...props} // Spread props like value, onChange, onBlur from React Hook Form
          sx={{
            borderRadius: "32px",
            "& fieldset": { borderColor: "text.secondary" },
            "& input": { px: 2, py: 1 },
          }}
        />
        {hasError && <FormHelperText>{validationError}</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default RoundedInput;

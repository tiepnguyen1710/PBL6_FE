import { useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface RoundedPasswordInput {
  label: string;
  placeholder?: string;
}

const RoundedPasswordInput: React.FC<RoundedPasswordInput> = ({
  label,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const hasError = false;

  return (
    <Stack spacing={1}>
      <Typography component="label" sx={{ color: "secondary.dark" }}>
        {label}
      </Typography>
      <FormControl error={hasError}>
        <OutlinedInput
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          sx={{
            borderRadius: "32px",
            "& fieldset": { borderColor: "text.secondary" },
            "& input": { px: 2, py: 1 },
          }}
        />
        {hasError && <FormHelperText>Error</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default RoundedPasswordInput;

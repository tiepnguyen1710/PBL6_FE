import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

interface RoundedInputProps {
  label: string;
  placeholder?: string;
}

const RoundedInput: React.FC<RoundedInputProps> = ({ label, placeholder }) => {
  const hasError = true;

  return (
    <Stack spacing={1}>
      <Typography component="label" sx={{ color: "secondary.dark" }}>
        {label}
      </Typography>
      <FormControl error={hasError}>
        <OutlinedInput
          placeholder={placeholder}
          sx={{
            borderRadius: "32px",
            "& fieldset": { borderColor: "text.secondary" },
            "& input": { px: 2, py: 1 },
          }}
        ></OutlinedInput>
        {hasError && <FormHelperText>Error</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default RoundedInput;

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import RoundedInput from "./RoundedInput";
import RoundedPasswordInput from "./RoudedPasswordInput";

const LoginPage: React.FC = () => {
  return (
    <Stack sx={{ gap: "42px", width: "100%" }}>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Create an account to start learning with us.
      </Typography>

      <Stack spacing={1}>
        <RoundedInput label="Email" placeholder="Enter your user name" />
        <RoundedPasswordInput
          label="Password"
          placeholder="Enter your password"
        />
        <RoundedPasswordInput
          label="Confirm Password"
          placeholder="Retype your password"
        />
      </Stack>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "success.main",
          borderRadius: "32px",
          py: "12px",
          width: { xs: "100%", lg: "230px" },
          alignSelf: { lg: "flex-end" },
        }}
      >
        Start Learning
      </Button>
    </Stack>
  );
};

export default LoginPage;

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";

import RoundedInput from "./RoundedInput";
import RoundedPasswordInput from "./RoudedPasswordInput";

const LoginPage: React.FC = () => {
  return (
    <Stack sx={{ gap: "42px", width: "100%" }}>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Login to continue your learning journey.
      </Typography>

      <Stack spacing={1}>
        <RoundedInput label="Email" placeholder="Enter your user name" />
        <RoundedPasswordInput
          label="Password"
          placeholder="Enter your password"
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Link href="#" underline="hover">
            Forgot password?
          </Link>
        </Box>
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
        Submit
      </Button>
    </Stack>
  );
};

export default LoginPage;

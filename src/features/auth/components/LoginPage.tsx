import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";

import RoundedInput from "./RoundedInput";
import RoundedPasswordInput from "./RoundedPasswordInput";

import { loginAction } from "../../../stores/authSlice";
import { AppDispatch } from "../../../stores";
import LoginRequest from "../types/LoginRequest";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import { Alert } from "@mui/material";

// Interface for form data
interface FormData {
  username: string;
  password: string;
}

const validationRules = {
  username: {
    required: "Username is required",
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  },
};

const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: async ({ username, password }: LoginRequest) => {
      await dispatch(loginAction(username, password));
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form submitted with data:", data);
    mutate(data);
  };

  return (
    <>
      {isPending && <CustomBackdrop open />}

      <Stack sx={{ gap: 2, width: "100%" }}>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Login to continue your learning journey.
        </Typography>
        {isError && (
          <Alert severity="error" onClose={() => reset()}>
            {error?.message || "Something went wrong!"}
          </Alert>
        )}
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            {/* Username Field */}
            <Controller
              name="username"
              control={control}
              rules={validationRules.username}
              render={({ field }) => (
                <RoundedInput
                  {...field}
                  label="User name"
                  placeholder="Enter your user name"
                  validationError={errors.username?.message}
                />
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field }) => (
                <RoundedPasswordInput
                  {...field} // Pass form field props (value, onChange, etc.)
                  label="Password"
                  placeholder="Enter your password"
                  validationError={errors.password?.message}
                />
              )}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Link href="#" underline="hover">
                Forgot password?
              </Link>
            </Box>
          </Stack>
        </form>

        <Button
          type="submit"
          form="login-form"
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
    </>
  );
};

export default LoginPage;
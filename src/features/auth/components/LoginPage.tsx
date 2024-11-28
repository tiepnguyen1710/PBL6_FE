import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";

import RoundedInput from "../../../components/UI/RoundedInput";
import RoundedPasswordInput from "./RoundedPasswordInput";

import { authActions, loginAction } from "../../../stores/authSlice";
import { AppDispatch } from "../../../stores";
import LoginRequest from "../types/LoginRequest";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import { Alert } from "@mui/material";
import { loginGoggle } from "../api/account-api";
import LoginResponse from "../types/LoginResponse";

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
      toast.success("Login successful!");
    },
  });

  const loginGoogleMutation = useMutation({
    mutationFn: loginGoggle,
    onSuccess: (responseData: LoginResponse) => {
      dispatch(
        authActions.login({
          token: responseData.token,
          user: responseData.user,
        }),
      );

      navigate("/");
      toast.success("Login successful!");
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form submitted with data:", data);
    mutate(data);
  };

  const handleCredentialResponse = useCallback(
    (response: { credential: string }) => {
      console.log("Encoded JWT ID Token:", response.credential);
      // Send this token to your backend for verification
      loginGoogleMutation.mutate(response.credential);
    },
    [loginGoogleMutation],
  );

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" },
    );
  }, [handleCredentialResponse]);

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
            width: "100%",
            alignSelf: { lg: "flex-end" },
          }}
        >
          Login
        </Button>
        <div style={{ marginTop: "-12px" }}>
          <div id="google-signin-button"></div>
        </div>
      </Stack>
    </>
  );
};

export default LoginPage;

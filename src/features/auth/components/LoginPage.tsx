import React, { useCallback } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";

import RoundedInput from "../../../components/UI/RoundedInput";
import RoundedPasswordInput from "./RoundedPasswordInput";

import { authActions } from "../../../stores/authSlice";
import { AppDispatch } from "../../../stores";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import { Alert } from "@mui/material";
import { loginGoggle, postLogin } from "../api/account-api";
import LoginResponse from "../types/LoginResponse";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Link from "../../../components/UI/Link";
import { RoleEnum } from "../../../types/auth";

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

  const handleLoginSuccess = useCallback(
    (responseData: LoginResponse) => {
      dispatch(
        authActions.login({
          token: responseData.token,
          user: responseData.user,
        }),
      );

      const roles = responseData.user.roles;
      if (
        roles.includes(RoleEnum.Admin) ||
        roles.includes(RoleEnum.Moderator)
      ) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Login successful!");
    },
    [dispatch, navigate],
  );

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: postLogin,
    onSuccess: handleLoginSuccess,
  });

  const loginGoogleMutation = useMutation({
    mutationFn: loginGoggle,
    onSuccess: handleLoginSuccess,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form submitted with data:", data);
    mutate(data);
  };

  const handleCredentialResponse = useCallback(
    (response: CredentialResponse) => {
      // Send to backend
      loginGoogleMutation.mutate(response.credential as string);
    },
    [loginGoogleMutation],
  );

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
              <Link
                to="/forgot-password"
                sx={{
                  color: "primary.main",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
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
            py: "6px",
            width: "100%",
            alignSelf: { lg: "flex-end" },
            marginBottom: "-16px",
          }}
        >
          Login
        </Button>
        <GoogleLogin
          onSuccess={handleCredentialResponse}
          onError={() => console.log("Oauth error")}
          useOneTap
          theme="outline"
          size="large"
          shape="circle"
          text="signin_with" // Tùy chỉnh văn bản
        />
      </Stack>
    </>
  );
};

export default LoginPage;

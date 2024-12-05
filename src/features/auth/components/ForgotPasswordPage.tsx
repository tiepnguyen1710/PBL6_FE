import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { validateEmail } from "../../../utils/helper";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/account-api";
import { Done } from "@mui/icons-material";

type ForgotPasswordForm = {
  email: string;
};

const ForgotPasswordPage: React.FC = () => {
  const form = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
  });

  const handleSendForgotEmail: SubmitHandler<ForgotPasswordForm> = (data) => {
    if (!forgotPasswordMutation.isSuccess) {
      forgotPasswordMutation.mutate(data.email);
    }
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "500px",
          padding: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          color="primary.main"
          sx={{ marginBottom: 1.25 }}
        >
          Forgot Password
        </Typography>

        {!forgotPasswordMutation.isSuccess && (
          <Typography>
            EngFlash will send instructions on how to reset your new password
            via email.
          </Typography>
        )}

        {forgotPasswordMutation.isError && (
          <Alert
            severity="error"
            onClose={() => forgotPasswordMutation.reset()}
            sx={{ my: 1 }}
          >
            {forgotPasswordMutation.error.message}
          </Alert>
        )}

        {forgotPasswordMutation.isSuccess && (
          <Alert severity="success" sx={{ my: 1 }}>
            An email has been sent to your email address. Please check your
            inbox.
          </Alert>
        )}

        <form onSubmit={form.handleSubmit(handleSendForgotEmail)}>
          <TextField
            label="Email"
            {...form.register("email", {
              required: "Enter your email here",
              validate: (value) =>
                validateEmail(value) || "Please enter a valid email format",
            })}
            sx={{ width: "100%", marginTop: "20px", marginBottom: "30px" }}
            error={!!form.formState.errors.email}
            helperText={form.formState.errors.email?.message}
          />

          <Button
            type="submit"
            variant="contained"
            disableRipple
            sx={{
              display: "block",
              width: "100%",
              boxShadow: "none",
              padding: "10px 16px",
              height: "48px",
              ...(forgotPasswordMutation.isSuccess && {
                backgroundColor: "#00B035 !important",
                color: "white !important",
              }),
            }}
            disabled={
              forgotPasswordMutation.isPending ||
              forgotPasswordMutation.isSuccess
            }
          >
            {forgotPasswordMutation.isPending ? (
              <CircularProgress size={20} />
            ) : forgotPasswordMutation.isSuccess ? (
              <>
                Sent <Done sx={{ fontSize: "1rem" }} />
              </>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;

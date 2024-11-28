import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Content from "../../../components/layout/Content";

import UserProfileBackground from "../assets/user-profile-background.png";
import DefaultAvatar from "../../../assets/avatars/default.svg";
import { AddAPhoto } from "@mui/icons-material";
import useFileInput from "../../../hooks/useFileInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { AuthState } from "../../../stores/authSlice";
import TabPanel from "../../../components/UI/TabPanel";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import updateUserProfile from "../api/user-profile";
import { me } from "../../auth/api/account-api";

type ProfileFormData = {
  name: string;
  email?: string;
  phone?: string | null;
};

const UserProfilePage: React.FC = () => {
  const queryClient = useQueryClient();
  const [tabIndex, setTabIndex] = useState(0);

  const { isAuthenticated, token } = useSelector<RootState, AuthState>(
    (state) => state.auth,
  );

  const profileForm = useForm<ProfileFormData>({
    defaultValues: { name: "", email: "", phone: "" },
  });

  const [name, email, phone] = profileForm.watch(["name", "email", "phone"]);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => me(token!),
    enabled: isAuthenticated,
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Your profile/avatar has been updated");
      queryClient.invalidateQueries({ queryKey: ["user"], exact: true });

      // reset mutation state
      updateProfileMutation.reset();
    },
  });

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleSaveProfile: SubmitHandler<ProfileFormData> = (data) => {
    console.log("Save profile: ", data);

    const request: Record<string, unknown> = {};
    if (data.name !== user?.name) {
      request.name = data.name;
    }

    if (data.email !== user?.email) {
      request.email = data.email;
    }

    if (data.phone !== user?.phone) {
      request.phone = data.phone;
    }

    updateProfileMutation.mutate(request);
  };

  const {
    fileSrc,
    setFileSrc,
    handleChangeFileInput,
    fileInputRef,
    chooseFile,
  } = useFileInput(DefaultAvatar);

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });

      setFileSrc(user.avatar || DefaultAvatar);
    }
  }, [user, profileForm, setFileSrc]);

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeFileInput(event, (newFileSrc) => {
      updateProfileMutation.mutate({ avatar: newFileSrc });
    });
  };

  return (
    <Content>
      <Box sx={{ px: 2, maxWidth: "840px", mx: "auto" }}>
        <Box sx={{ position: "relative" }}>
          <img src={UserProfileBackground} />
          <Box
            sx={{
              position: "absolute",
              bottom: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Avatar
              src={fileSrc}
              sx={{
                width: "120px",
                height: "120px",
                border: "3px solid white",
              }}
            />
            <IconButton
              onClick={chooseFile}
              sx={{
                width: "35px",
                height: "35px",
                boxShadow: 3,
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <AddAPhoto sx={{ fontSize: 16 }} />
            </IconButton>
            <input
              type="file"
              hidden
              name="avatar"
              ref={fileInputRef}
              onChange={handleChangeAvatar}
            />
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {user?.username}
            </Typography>
          </Box>
        </Box>
        <Paper
          elevation={1}
          sx={{ marginTop: 7, minHeight: "200px", padding: 1 }}
        >
          <>
            <Tabs
              value={tabIndex}
              onChange={handleChangeTab}
              sx={{ "& .MuiTab-root": { borderBottomWidth: 1 } }}
            >
              <Tab label="Profile" />
              <Tab label="Change Password" />
            </Tabs>
            <TabPanel value={tabIndex} index={0} sx={{ padding: "24px" }}>
              {isLoading ? (
                <DotLoadingProgress />
              ) : (
                <Grid2
                  container
                  spacing={2}
                  sx={{ "& .MuiTextField-root": { width: "100%" } }}
                >
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      label={"Name"}
                      variant="standard"
                      value={name}
                      error={!!profileForm.formState.errors.name}
                      helperText={profileForm.formState.errors.name?.message}
                      // name="name"
                      {...profileForm.register("name", {
                        required: "Name is required",
                      })}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      label={"Email"}
                      variant="standard"
                      value={email}
                      error={!!profileForm.formState.errors.email}
                      helperText={profileForm.formState.errors.email?.message}
                      {...profileForm.register("email", {
                        required: "Email is required",
                      })}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      label={"Phone"}
                      variant="standard"
                      value={phone}
                      error={!!profileForm.formState.errors.phone}
                      helperText={profileForm.formState.errors.phone?.message}
                      {...profileForm.register("phone", {
                        pattern: {
                          value: /^[0-9]{10,11}$/,
                          message: "Phone number must be 10 or 11 digits",
                        },
                      })}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <Button
                      variant="contained"
                      onClick={profileForm.handleSubmit(handleSaveProfile)}
                      sx={{ px: 3, height: "40px" }}
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </Grid2>
                </Grid2>
              )}
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              Tab 2
            </TabPanel>
          </>
        </Paper>
      </Box>
    </Content>
  );
};

export default UserProfilePage;

import { useEffect, useState } from "react";
import { Button, Grid2, Tab, Tabs, TextField } from "@mui/material";
import TabPanel from "../../../components/UI/TabPanel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { me } from "../../auth/api/account-api";
import { RootState } from "../../../stores";
import { AuthState } from "../../../stores/authSlice";
import { useSelector } from "react-redux";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";
import { SubmitHandler, useForm } from "react-hook-form";
import updateUserProfile from "../api/user-profile";
import { toast } from "react-toastify";

type ProfileFormData = {
  name: string;
  email?: string;
  phone?: string | null;
  avatar?: FileList;
};

const FormTabs: React.FC = () => {
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
      toast.success("Your profile has been updated");
      queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
    },
  });

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
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

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, profileForm]);

  return (
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
            <Grid2 size={6}>
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
            <Grid2 size={6}>
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
            <Grid2 size={6}>
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
                sx={{ px: 3 }}
              >
                Save
              </Button>
            </Grid2>
          </Grid2>
        )}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Tab 2
      </TabPanel>
    </>
  );
};

export default FormTabs;

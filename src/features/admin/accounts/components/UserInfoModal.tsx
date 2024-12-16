import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid2,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CustomModal, {
  CustomModalProps,
} from "../../../../components/UI/CustomModal";
import { User } from "../../../../types/auth";
import { AddAPhoto } from "@mui/icons-material";
import PasswordTextField from "../../../../components/UI/PasswordTextField";
import UserStatusLegend from "./UserStatusLegend";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { switchUserStatus } from "../api/user-api";
import { toast } from "react-toastify";
import { format } from "date-fns";

interface UserInfoModalProps {
  modal: CustomModalProps;
  defaultUser: User | null;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  modal: { onClose: onCloseModal, ...modalProps },
  defaultUser,
}) => {
  const queryClient = useQueryClient();
  const [openConfirmSwitchStatusModal, setOpenConfirmSwitchStatusModal] =
    useState(false);

  const [hasChanged, setHasChanged] = useState(false);

  const [user, setUser] = useState<User | null>(defaultUser);

  const switchStatusMutation = useMutation({
    mutationFn: (request: { userId: string; activate: boolean }) =>
      switchUserStatus(request.userId, request.activate),
    onSuccess: (newUserData: User) => {
      toast.success("Account status has been updated!");
      setUser(newUserData);
      setHasChanged(true);
    },
    onSettled: () => {
      setOpenConfirmSwitchStatusModal(false);
    },
  });

  const handleConfirmSwitchStatus = () => {
    if (!user) return;

    switchStatusMutation.mutate({ userId: user.id, activate: !user.isActive });
  };

  const handleCloseModal = () => {
    onCloseModal();
    if (hasChanged) {
      console.log("invalidate users");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  };

  useEffect(() => {
    setUser(defaultUser);
    setHasChanged(false);
  }, [defaultUser]);

  return (
    <div id="user-info-modal">
      <CustomModal {...modalProps} onClose={handleCloseModal}>
        <Box
          sx={{
            minWidth: "900px",
            py: 0.5,
            "& .MuiTextField-root": {
              width: "100%",
            },

            "& .MuiInputBase-input": {
              py: "14px",
            },
          }}
        >
          {/* Header */}
          <Box sx={{ padding: 1.5, paddingBottom: 1 }}>
            <Typography variant="h5">User Information</Typography>
          </Box>
          <Divider />

          {/* User info */}
          <Box sx={{ padding: 1.5 }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1}>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={user?.avatar}
                    sx={{ width: "80px", height: "80px" }}
                  />
                  <IconButton
                    // onClick={chooseFile}
                    sx={{
                      width: "24px",
                      height: "24px",
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
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    {user?.name}
                  </Typography>
                  <Typography variant="body1">{user?.email}</Typography>
                  <Chip
                    label={"ID: " + user?.id}
                    sx={{
                      py: "12px",
                      px: "6px",
                      borderRadius: "20px",
                      marginTop: 0.5,
                    }}
                  />
                </Box>
              </Stack>

              {/* Account status */}
              <Box>
                <FormGroup
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenConfirmSwitchStatusModal(true);
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch color="success" checked={user?.isActive} />
                    }
                    label="Account status"
                    labelPlacement="start"
                  />
                </FormGroup>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="end"
                  sx={{ textAlign: "right" }}
                >
                  <UserStatusLegend label="Active" color="success.main" />
                  <UserStatusLegend label="Disabled" color="divider" />
                </Stack>

                <Typography
                  variant="body2"
                  sx={{ marginTop: 0.5, textAlign: "right" }}
                >
                  Created at{" "}
                  {user?.createdAt &&
                    format(new Date(user.createdAt), "dd/MM/y")}
                </Typography>
              </Box>
            </Stack>

            <Grid2
              container
              rowSpacing={1}
              columnSpacing={1}
              sx={{
                marginTop: 2,
              }}
            >
              <Grid2 size={6}>
                <TextField label="Email" defaultValue={user?.email} />
              </Grid2>
              <Grid2 size={6}>
                <TextField label="User name" defaultValue={user?.username} />
              </Grid2>
              <Grid2 size={6}>
                <TextField label="Full name" defaultValue={user?.name} />
              </Grid2>
              <Grid2 size={6}>
                <TextField label="Phone number" defaultValue={user?.phone} />
              </Grid2>
            </Grid2>
          </Box>
          <Divider />

          {/* Change password */}
          <Box sx={{ padding: 1.5, paddingTop: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Change password
            </Typography>
            <Grid2
              container
              rowSpacing={1}
              columnSpacing={1}
              sx={{
                marginTop: 0.5,
              }}
            >
              <Grid2 size={6}>
                <PasswordTextField label="New password" />
              </Grid2>
              <Grid2 size={6}>
                <PasswordTextField label="Confirm new password" />
              </Grid2>
            </Grid2>
          </Box>
          <Divider />

          {/* Delete account */}
          <Box sx={{ px: 1.5, py: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Delete account?
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <div>
                <Typography variant="body1">
                  Deleting this account will permanently remove all data
                  associated with this account.
                </Typography>
                <Typography variant="body2">
                  (This action cannot be undone)
                </Typography>
              </div>
              <Button
                variant="outlined"
                color="error"
                sx={{ backgroundColor: "rgba(211, 47, 47, 0.04)", py: "4px" }}
              >
                Delete
              </Button>
            </Stack>
          </Box>

          <Box sx={{ px: 1.5, py: 1 }}>
            <Grid2
              container
              rowSpacing={1}
              columnSpacing={1}
              sx={{
                marginTop: 0.5,
              }}
            >
              <Grid2 size={6}>
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Grid2>
              <Grid2 size={6}>
                <Button
                  variant="contained"
                  sx={{ width: "100%", boxShadow: "none" }}
                >
                  Save changes
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </CustomModal>

      <CustomModal
        open={openConfirmSwitchStatusModal}
        onClose={() => setOpenConfirmSwitchStatusModal(false)}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Do you want to {user?.isActive ? "deactivate" : "activate"} this
            account?
          </Typography>
          {user?.isActive ? (
            <Typography>
              Deactivating the account will temporarily disable the user's
              access.
            </Typography>
          ) : (
            <Typography>
              By activating this account, the user will have full access to
              their features and services.
            </Typography>
          )}
          <Stack direction="row" spacing={0.5} sx={{ marginTop: 1 }}>
            <Button
              variant="contained"
              onClick={handleConfirmSwitchStatus}
              sx={{ boxShadow: "none", minWidth: "85px" }}
            >
              OK
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenConfirmSwitchStatusModal(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </div>
  );
};
export default UserInfoModal;

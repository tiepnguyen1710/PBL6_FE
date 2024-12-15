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

interface UserInfoModalProps {
  modal: CustomModalProps;
  user: User | null;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ modal, user }) => {
  return (
    <CustomModal {...modal}>
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
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Switch color="success" />}
                  label="Account status"
                  labelPlacement="start"
                />
              </FormGroup>
              <Box sx={{ textAlign: "right" }}>
                <UserStatusLegend label="Active" color="success.main" />
                <UserStatusLegend label="Disabled" color="divider" />
              </Box>
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
                onClick={modal.onClose}
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
  );
};
export default UserInfoModal;

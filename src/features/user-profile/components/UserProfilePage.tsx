import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import Content from "../../../components/layout/Content";

import UserProfileBackground from "../assets/user-profile-background.png";
import DefaultAvatar from "../../../assets/avatars/default.svg";
import EditIcon from "../../../components/UI/EditIcon";
import FormTabs from "./FormTabs";

const UserProfilePage: React.FC = () => {
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
              src={DefaultAvatar}
              sx={{
                width: "120px",
                height: "120px",
                border: "3px solid white",
              }}
            />
            <IconButton
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
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              TienZe
            </Typography>
          </Box>
        </Box>
        <Paper
          elevation={1}
          sx={{ marginTop: 7, minHeight: "200px", padding: 1 }}
        >
          <FormTabs />
        </Paper>
      </Box>
    </Content>
  );
};

export default UserProfilePage;

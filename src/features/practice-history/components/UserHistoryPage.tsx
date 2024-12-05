import { Avatar, Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import Content from "../../../components/layout/Content";
import UserProfileBackground from "../assets/user-profile-background.png";
import TabPanel from "../../../components/UI/TabPanel";
import { useState } from "react";
import useFileInput from "../../../hooks/useFileInput";
import DefaultAvatar from "../../../assets/avatars/default.svg";
import { useQuery } from "@tanstack/react-query";
import { me } from "../../auth/api/account-api";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { AuthState } from "../../../stores/authSlice";
import PracticeHistoryTab from "./PracticeHistoryTab";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";

const UserHistoryPage = () => {
  const { isAuthenticated, token } = useSelector<RootState, AuthState>(
    (state) => state.auth,
  );
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => me(token!),
    enabled: isAuthenticated,
  });

  const { fileSrc, fileInputRef } = useFileInput(DefaultAvatar);
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

            <input type="file" hidden name="avatar" ref={fileInputRef} />
            {isLoading ? (
              <CustomBackdrop open />
            ) : (
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
            )}
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
              <Tab label="Practice History" />
              <Tab label="Practice Analytics" />
            </Tabs>
            <TabPanel value={tabIndex} index={0} sx={{ padding: "24px" }}>
              <PracticeHistoryTab />
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

export default UserHistoryPage;

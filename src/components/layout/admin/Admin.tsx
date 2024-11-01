import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import SideBar from "./SideBar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100vh !important",
          background: "#f0f0f0",
        }}
      >
        <SideBar collapsed={collapsed} />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Stack>
          <Box
            sx={{
              height: "50px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <FaBars onClick={() => setCollapsed(!collapsed)} />
          </Box>
          <Box
            sx={{
              padding: 3,
            }}
          >
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Admin;

import React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Button, Stack, Toolbar } from "@mui/material";

import NavLink from "../NavLink";
import Logo from "../../assets/logos/logo.svg";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
      }}
    >
      <Toolbar
        sx={{
          px: { xl: 4 },
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2}>
          <img src={Logo} />
          <Box>
            <NavLink isActive>Learn English</NavLink>
            <NavLink>Vocab Boost</NavLink>
            <NavLink>TOEIC Practice</NavLink>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
          >
            Sign Up
          </Button>
          <Button variant="contained" sx={{ px: "20px" }}>
            Log In
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

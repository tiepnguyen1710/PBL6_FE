import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowLeft,
  BarChart,
  Logout,
  Person,
} from "@mui/icons-material";

import NavLink from "../UI/NavLink";
import Logo from "../../assets/logos/logo.svg";
import { AppDispatch, RootState } from "../../stores";
import DefaultAvatar from "../../assets/avatars/default.svg";
import { authActions, AuthState } from "../../stores/authSlice";
import { me } from "../../features/auth/api/account-api";

const Header: React.FC = () => {
  const { isAuthenticated, token } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => me(token!),
    enabled: isAuthenticated,
  });

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <AppBar
      position="sticky"
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
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} />
          </Link>
          <Stack direction="row">
            <NavLink isActive>Learn English</NavLink>
            <NavLink>Vocab Boost</NavLink>
            <NavLink>TOEIC Practice</NavLink>
          </Stack>
        </Stack>

        {isAuthenticated ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>{user?.name}</Typography>
            <Stack
              color="text.primary"
              direction="row"
              alignItems="center"
              sx={{ cursor: "pointer", py: 0.5 }}
              onClick={handleOpenMenu}
            >
              <Avatar src={user?.avatar || DefaultAvatar} />
              {open ? <ArrowDropDown /> : <ArrowLeft />}
            </Stack>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                width: 240,
                maxWidth: "100%",
                "& .MuiMenu-list > ul:focus-visible": { outline: "none" },
              }}
            >
              <MenuList sx={{ "& a": { textDecoration: "none" } }}>
                <Link to="/profile">
                  <MenuItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                </Link>
                <MenuItem>
                  <ListItemIcon>
                    <BarChart fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Practice Analytics</ListItemText>
                </MenuItem>

                <Divider sx={{ margin: "8px !important" }} />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              sx={{
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
              onClick={() => navigate("/account/register")}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              sx={{ px: "20px" }}
              onClick={() => navigate("/account/login")}
            >
              Log In
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

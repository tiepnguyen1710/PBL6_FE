import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { me } from "../features/auth/api/account-api";
import { User } from "../types/auth";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: await getInitialAuthState(),
  reducers: {
    login(state, action: PayloadAction<{ token: string; user: User }>) {
      const { token, user } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.user = user;

      localStorage.setItem("token", token);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

async function restoreUser(token: string) {
  const user = await me(token);

  return user;
}

async function getInitialAuthState() {
  const token = localStorage.getItem("token");

  let loggedInUser: User | null = null;
  try {
    loggedInUser = token ? await restoreUser(token) : null;
  } catch (error) {
    loggedInUser = null;
    console.error("Restore user from stored token failed", error);
  }

  const initialState: AuthState = {
    token: token || null,
    isAuthenticated: !!loggedInUser,
    user: loggedInUser,
  };
  return initialState;
}

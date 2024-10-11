import { ThunkAction } from "redux-thunk";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { Identity } from "../features/auth/types/auth";
import { postLogin } from "../features/auth/api/account-api";
import { RootState } from "./index";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  identity: Identity | null; // Adjust based on your user structure
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  identity: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; identity: Identity }>) {
      const { token, identity } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.identity = identity;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.identity = null;

      localStorage.removeItem("token");
    },
  },
});

export const loginAction =
  (
    username: string,
    password: string
  ): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    try {
      const response = await postLogin(username, password);

      const identity: Identity = {
        userId: response.user.id,
        username: response.user.username,
        name: response.user.name,
        email: response.user.email,
        roles: response.user.roles,
      };

      dispatch(authActions.login({ token: response.token, identity }));
      localStorage.setItem("token", response.token);

      return true;
    } catch (error) {
      console.log("Login failed:", error);
      return false;
    }
  };

export const authActions = authSlice.actions;

export default authSlice.reducer;

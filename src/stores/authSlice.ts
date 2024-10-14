import { ThunkAction } from "redux-thunk";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { Identity } from "../features/auth/types/auth";
import { postLogin } from "../features/auth/api/account-api";
import { RootState } from "./index";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  identity: Identity | null;
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

      localStorage.setItem("token", token);
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
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    const response = await postLogin(username, password);
    const { user, token } = response;

    const identity: Identity = {
      userId: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      roles: user.roles,
      avatar: user.avatar,
    };

    dispatch(authActions.login({ token, identity }));
  };

export const authActions = authSlice.actions;

export default authSlice.reducer;

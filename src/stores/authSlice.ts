import { ThunkAction } from "redux-thunk";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { postLogin } from "../features/auth/api/account-api";
import { RootState } from "./index";
import { User } from "../types/auth";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
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

export const loginAction =
  (
    username: string,
    password: string,
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    const response = await postLogin(username, password);
    const { user, token } = response;

    dispatch(authActions.login({ token, user }));
  };

export const authActions = authSlice.actions;

export default authSlice.reducer;

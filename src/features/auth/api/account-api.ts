import axios from "../../../axios";
import { User } from "../../../types/auth";
import LoginResponse from "../types/LoginResponse";
import RegisterRequest from "../types/RegisterRequest";
import { ResetPasswordRequest } from "../types/ResetPasswordRequest";

export async function postLogin(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>("/auth/login", {
    username,
    password,
  });
  return response.data;
}

export async function postRegister(request: RegisterRequest) {
  const response = await axios.post("/auth/signup", request);
  return response.data;
}

export async function me(token: string) {
  const response = await axios.get<User>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function loginGoggle(ggToken: string) {
  const response = await axios.post("/auth/google", { token: ggToken });

  return response.data;
}

export async function forgotPassword(email: string) {
  const response = await axios.post("auth/forgotPassword", { email });

  return response.data;
}

export async function resetPassword(request: ResetPasswordRequest) {
  const { resetToken, ...data } = request;
  const response = await axios.patch("auth/resetPassword/" + resetToken, data);

  return response.data;
}

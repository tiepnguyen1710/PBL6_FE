import axios from "../../../axios";
import { LoginResponse } from "../types/LoginResponse";

export async function postLogin(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>("/auth/login", {
    username,
    password,
  });
  return response.data;
}

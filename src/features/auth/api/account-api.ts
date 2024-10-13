import axios from "../../../axios";
import LoginResponse from "../types/LoginResponse";
import RegisterRequest from "../types/RegisterRequest";

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

export async function postRegister(request: RegisterRequest) {
  const response = await axios.post("/auth/signup", request);
  return response.data;
}

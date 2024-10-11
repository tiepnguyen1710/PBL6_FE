import { User } from "./auth";

export interface LoginResponse {
  token: string;
  user: User;
}

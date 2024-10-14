import { User } from "./auth";

export default interface LoginResponse {
  token: string;
  user: User;
}

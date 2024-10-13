import { Role } from "./auth";

export default interface RegisterRequest {
  username: string;
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  roles: Role[];
}

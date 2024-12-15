import axiosClient from "../../../../axios";
import { User } from "../../../../types/auth";

export async function getUsers() {
  const response = await axiosClient.get<User[]>("/users");

  return response.data;
}

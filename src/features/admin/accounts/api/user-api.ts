import axiosClient from "../../../../axios";
import { User } from "../../../../types/auth";

export async function getUsers() {
  const response = await axiosClient.get<User[]>("/users");

  return response.data;
}

export async function deactivateUser(userId: string) {
  const response = await axiosClient.patch<User>("/users/deactive/" + userId);

  return response.data;
}

export async function activateUser(userId: string) {
  const response = await axiosClient.patch<User>("/users/active/" + userId);

  return response.data;
}

export async function switchUserStatus(userId: string, activate: boolean) {
  if (activate) {
    return await activateUser(userId);
  }

  return await deactivateUser(userId);
}

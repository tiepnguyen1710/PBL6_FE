import axiosClient from "../../../axios";

export async function updateUserProfile(data: unknown) {
  const response = await axiosClient.patch("users/updateProfile", data);
  return response.data;
}

export async function updatePassword(data: unknown) {
  const response = await axiosClient.patch("auth/updatePassword", data);
  return response.data;
}

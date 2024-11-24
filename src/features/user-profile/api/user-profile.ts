import axiosClient from "../../../axios";

export default async function updateUserProfile(data: unknown) {
  const response = await axiosClient.patch("users/updateProfile", data);
  return response.data;
}

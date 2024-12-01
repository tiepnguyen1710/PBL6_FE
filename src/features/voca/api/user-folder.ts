import axiosClient from "../../../axios";
import { UserFolder } from "../../../types/user-folder";
import { NewUserFolderRequest } from "../types/UserFolderRequest";

export async function createNewFolder(request: NewUserFolderRequest) {
  const response = await axiosClient.post<UserFolder>("user-topic", request);

  return response.data;
}

export async function getUserFolders() {
  const response = await axiosClient.get<UserFolder[]>("user-topic");

  return response.data;
}

export async function getUserFolderById(id: string) {
  const response = await axiosClient.get<UserFolder[]>("user-topic/" + id);

  return response.data[0]; // api returns an array that contains the requested folder
}

export async function pinWordToFolder(folderId: string, vocaId: string) {
  const response = await axiosClient.post<UserFolder>(
    `user-topic/${folderId}/word/${vocaId}`,
  );

  return response.data;
}

export async function pinWordToNewFolder(
  request: NewUserFolderRequest,
  vocaId: string,
) {
  const folder = await createNewFolder(request);

  const updatedFolder = await pinWordToFolder(folder.id, vocaId);

  return updatedFolder;
}

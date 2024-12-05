export interface NewUserFolderRequest {
  name: string;
  description: string;
}

export interface UpdateFolderRequest {
  id: string;
  name: string;
  description: string;
}

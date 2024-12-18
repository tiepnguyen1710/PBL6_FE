export interface UpdateUserProfileRequest {
  userId: string;
  email?: string;
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateUserPasswordRequest {
  userId: string;
  password: string;
  passwordConfirm: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string | null;
  phone?: string | null;
  roles: Role[];

  targetScore: number;
  testDate: string;

  createdAt: string;
}

export type Role = "admin" | "user" | "moderator";

export enum RoleEnum {
  Admin = "admin",
  User = "user",
  Moderator = "moderator",
}

export function canAccessAdminPage(user: User) {
  return (
    user.roles.includes(RoleEnum.Admin) ||
    user.roles.includes(RoleEnum.Moderator)
  );
}

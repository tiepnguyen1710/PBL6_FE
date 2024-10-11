export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string | null;
  phone?: string | null;
  roles: Role[];
}

export type Role = "admin" | "user";

export interface Identity {
  userId: string;
  username: string;
  name: string;
  email: string;
  roles: Role[];
}

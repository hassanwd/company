import type { Role, UserStatus } from "@/lib/constants";

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

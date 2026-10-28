import { z } from "zod";
import { ROLES, USER_STATUSES } from "@/lib/constants";

/** Shared by client forms and Server Actions — single source of truth for validation. */
export const userInputSchema = z.object({
  name: z.string().trim().min(2, "At least 2 characters").max(80),
  email: z.email("Enter a valid email").trim().toLowerCase().max(254),
  role: z.enum(ROLES),
  status: z.enum(USER_STATUSES),
});
export type UserInput = z.infer<typeof userInputSchema>;

export const updateUserInputSchema = userInputSchema.extend({ id: z.uuid() });
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export const deleteUserInputSchema = z.object({ id: z.uuid() });

export const USER_SORT_FIELDS = ["name", "email", "role", "status", "createdAt"] as const;

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().max(100).optional(),
  sort: z.enum(USER_SORT_FIELDS).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;

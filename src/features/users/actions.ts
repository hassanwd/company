"use server";

import { assertConsoleEnabled } from "@/server/config/console-guard";
import { createAction } from "@/server/http/create-action";
import { usersService } from "@/server/services/users.service";
import {
  deleteUserInputSchema,
  listUsersQuerySchema,
  updateUserInputSchema,
  userInputSchema,
} from "./schemas";

const MINUTE = 60_000;
const guard = assertConsoleEnabled;

export const listUsersAction = createAction(
  "users.list",
  listUsersQuerySchema,
  (query) => usersService.list(query),
  { rateLimit: { limit: 120, windowMs: MINUTE }, guard },
);

export const createUserAction = createAction(
  "users.create",
  userInputSchema,
  (input) => usersService.create(input),
  { rateLimit: { limit: 30, windowMs: MINUTE }, guard },
);

export const updateUserAction = createAction(
  "users.update",
  updateUserInputSchema,
  ({ id, ...input }) => usersService.update(id, input),
  { rateLimit: { limit: 30, windowMs: MINUTE }, guard },
);

export const deleteUserAction = createAction(
  "users.delete",
  deleteUserInputSchema,
  ({ id }) => usersService.remove(id),
  { rateLimit: { limit: 30, windowMs: MINUTE }, guard },
);

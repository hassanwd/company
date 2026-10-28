"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ActionError, unwrap, type ActionResult } from "@/lib/action-result";
import { createUserAction, deleteUserAction, listUsersAction, updateUserAction } from "./actions";
import type { ListUsersQuery } from "./schemas";

export const userKeys = {
  all: ["users"] as const,
  list: (query: Partial<ListUsersQuery>) => [...userKeys.all, "list", query] as const,
};

export function useUsers(query: Partial<ListUsersQuery>) {
  return useQuery({
    queryKey: userKeys.list(query),
    queryFn: () => unwrap(listUsersAction(query)),
    placeholderData: keepPreviousData,
  });
}

/** Shared mutation wiring: toast + refetch the users list on success. */
function useUserMutation<TVars, TData>(
  action: (vars: TVars) => Promise<ActionResult<TData>>,
  successMessage: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: TVars) => unwrap(action(vars)),
    onSuccess: () => {
      toast.success(successMessage);
      return queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (error) =>
      toast.error(error instanceof ActionError ? error.message : "Something went wrong"),
  });
}

export const useCreateUser = () => useUserMutation(createUserAction, "User created");
export const useUpdateUser = () => useUserMutation(updateUserAction, "User updated");
export const useDeleteUser = () => useUserMutation(deleteUserAction, "User deleted");

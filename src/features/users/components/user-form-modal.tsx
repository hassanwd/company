"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SelectField, TextField } from "@/components/shared/form/fields";
import { FormError } from "@/components/shared/form/form-error";
import { Modal } from "@/components/shared/modal/modal";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ActionError } from "@/lib/action-result";
import { ROLES, USER_STATUSES } from "@/lib/constants";
import { useCreateUser, useUpdateUser } from "../hooks";
import { userInputSchema, type UserInput } from "../schemas";
import type { UserDto } from "../types";

const toOptions = (values: readonly string[]) =>
  values.map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) }));
const ROLE_OPTIONS = toOptions(ROLES);
const STATUS_OPTIONS = toOptions(USER_STATUSES);

const emptyValues: UserInput = { name: "", email: "", role: "user", status: "active" };

type UserFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Provide a user to edit; omit to create. */
  user?: UserDto;
};

export function UserFormModal({ open, onOpenChange, user }: UserFormModalProps) {
  const { control, handleSubmit, reset, setError } = useForm<UserInput>({
    resolver: zodResolver(userInputSchema),
    defaultValues: emptyValues,
  });

  // Re-seed the form each time the modal opens (or switches between users).
  useEffect(() => {
    if (open) reset(user ?? emptyValues);
  }, [open, user, reset]);

  const create = useCreateUser();
  const update = useUpdateUser();
  const mutation = user ? update : create;

  const onSubmit = handleSubmit((values) => {
    const options = {
      onSuccess: () => onOpenChange(false),
      onError: (error: Error) => {
        // Surface server-side field errors (e.g. duplicate email) next to the field.
        if (error instanceof ActionError && error.fieldErrors) {
          for (const [field, messages] of Object.entries(error.fieldErrors)) {
            setError(field as keyof UserInput, { message: messages[0] });
          }
        }
      },
    };

    if (user) update.mutate({ id: user.id, ...values }, options);
    else create.mutate(values, options);
  });

  const formError =
    mutation.error instanceof ActionError && !mutation.error.fieldErrors
      ? mutation.error.message
      : null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={user ? "Edit user" : "Add user"}
      description={user ? "Update this user's details." : "Add a new user."}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <FormError message={formError} />
        <TextField control={control} name="name" label="Full name" autoComplete="off" />
        <TextField control={control} name="email" label="Email" type="email" autoComplete="off" />
        <div className="grid grid-cols-2 gap-4">
          <SelectField control={control} name="role" label="Role" options={ROLE_OPTIONS} />
          <SelectField control={control} name="status" label="Status" options={STATUS_OPTIONS} />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" loading={mutation.isPending}>
            {user ? "Save changes" : "Create user"}
          </Button>
        </DialogFooter>
      </form>
    </Modal>
  );
}

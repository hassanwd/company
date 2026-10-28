"use client";

import { useId, type ReactNode } from "react";
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Label } from "@/components/ui/label";

export type FormFieldRenderProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
};

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  hint?: string;
  render: (props: FormFieldRenderProps<T>) => ReactNode;
};

/** Label + control + validation message wired to react-hook-form with a11y attributes. */
export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  hint,
  render,
}: FormFieldProps<T>) {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const messageId = `${id}-message`;
        const invalid = Boolean(fieldState.error);
        return (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={id}>{label}</Label>
            {render({
              field,
              id,
              "aria-invalid": invalid,
              "aria-describedby": invalid || hint ? messageId : undefined,
            })}
            {invalid ? (
              <p id={messageId} role="alert" className="text-destructive text-xs">
                {fieldState.error?.message}
              </p>
            ) : hint ? (
              <p id={messageId} className="text-muted-foreground text-xs">
                {hint}
              </p>
            ) : null}
          </div>
        );
      }}
    />
  );
}

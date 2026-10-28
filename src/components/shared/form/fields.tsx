"use client";

import type { ComponentProps } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Input, Select, Textarea } from "@/components/ui/input";
import { FormField } from "./form-field";

type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  hint?: string;
};

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  hint,
  ...inputProps
}: BaseProps<T> &
  Omit<ComponentProps<typeof Input>, "name" | "defaultValue" | "value" | "onChange" | "onBlur">) {
  return (
    <FormField
      control={control}
      name={name}
      label={label}
      hint={hint}
      render={({ field, ...a11y }) => (
        <Input {...inputProps} {...a11y} {...field} value={field.value ?? ""} />
      )}
    />
  );
}

export type SelectOption = { value: string; label: string };

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  hint,
  options,
  ...selectProps
}: BaseProps<T> & {
  options: readonly SelectOption[];
} & Omit<
    ComponentProps<typeof Select>,
    "name" | "defaultValue" | "value" | "onChange" | "onBlur" | "children"
  >) {
  return (
    <FormField
      control={control}
      name={name}
      label={label}
      hint={hint}
      render={({ field, ...a11y }) => (
        <Select {...selectProps} {...a11y} {...field}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
    />
  );
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  hint,
  ...textareaProps
}: BaseProps<T> &
  Omit<
    ComponentProps<typeof Textarea>,
    "name" | "defaultValue" | "value" | "onChange" | "onBlur"
  >) {
  return (
    <FormField
      control={control}
      name={name}
      label={label}
      hint={hint}
      render={({ field, ...a11y }) => (
        <Textarea {...textareaProps} {...a11y} {...field} value={field.value ?? ""} />
      )}
    />
  );
}

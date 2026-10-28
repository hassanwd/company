"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SelectField, TextareaField, TextField } from "@/components/shared/form/fields";
import { FormError } from "@/components/shared/form/form-error";
import { Button } from "@/components/ui/button";
import { ActionError, unwrap } from "@/lib/action-result";
import { submitLeadAction } from "../actions";
import { COMPANY_SIZES, INDUSTRIES, leadInputSchema, type LeadInput } from "../schemas";

const INDUSTRY_OPTIONS = [{ value: "", label: "Select…" }, ...INDUSTRIES];
const SIZE_OPTIONS = [{ value: "", label: "Select…" }, ...COMPANY_SIZES];

export function LeadForm({ defaultIndustry }: { defaultIndustry?: string }) {
  const { control, handleSubmit, register, setError } = useForm<LeadInput>({
    resolver: zodResolver(leadInputSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      industry: (INDUSTRIES.some((i) => i.value === defaultIndustry)
        ? defaultIndustry
        : "") as LeadInput["industry"],
      companySize: "" as LeadInput["companySize"],
      message: "",
      website: "",
    },
  });

  const submit = useMutation({
    mutationFn: (values: LeadInput) => unwrap(submitLeadAction(values)),
    onError: (error) => {
      if (error instanceof ActionError && error.fieldErrors) {
        for (const [field, messages] of Object.entries(error.fieldErrors)) {
          setError(field as keyof LeadInput, { message: messages[0] });
        }
      }
    },
  });

  if (submit.isSuccess) {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle2 className="text-success size-10" aria-hidden />
        <h2 className="text-xl font-semibold">Thanks — we&apos;ve got your request</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          A member of our team will get back to you shortly to arrange a working session.
        </p>
      </div>
    );
  }

  const formError =
    submit.error instanceof ActionError && !submit.error.fieldErrors ? submit.error.message : null;

  return (
    <form
      onSubmit={handleSubmit((values) => submit.mutate(values))}
      className="flex flex-col gap-4"
      noValidate
    >
      <FormError message={formError} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField control={control} name="name" label="Full name" autoComplete="name" />
        <TextField
          control={control}
          name="email"
          label="Work email"
          type="email"
          autoComplete="email"
        />
        <TextField control={control} name="company" label="Company" autoComplete="organization" />
        <TextField
          control={control}
          name="role"
          label="Job title (optional)"
          autoComplete="organization-title"
        />
        <SelectField
          control={control}
          name="industry"
          label="Industry"
          options={INDUSTRY_OPTIONS}
        />
        <SelectField
          control={control}
          name="companySize"
          label="Company size"
          options={SIZE_OPTIONS}
        />
      </div>
      <TextareaField
        control={control}
        name="message"
        label="What would you like to automate?"
        placeholder="Tell us about the workflow, team and systems involved."
        rows={5}
      />

      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <Button type="submit" size="lg" loading={submit.isPending}>
        Request a demo
      </Button>
      <p className="text-muted-foreground text-xs">
        By submitting you agree to our{" "}
        <Link href="/privacy" className="underline">
          privacy policy
        </Link>
        . We&apos;ll only use your details to respond to this request.
      </p>
    </form>
  );
}

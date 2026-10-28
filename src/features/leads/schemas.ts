import { z } from "zod";

export const INDUSTRIES = [
  { value: "law", label: "Law" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "other", label: "Other" },
] as const;

export const COMPANY_SIZES = [
  { value: "1-200", label: "1–200 employees" },
  { value: "201-1000", label: "201–1,000 employees" },
  { value: "1001-5000", label: "1,001–5,000 employees" },
  { value: "5000+", label: "5,000+ employees" },
] as const;

const values = <T extends readonly { value: string }[]>(items: T) =>
  items.map((item) => item.value) as [T[number]["value"], ...T[number]["value"][]];

/** Shared by the contact form and the Server Action. */
export const leadInputSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Enter a valid work email").trim().toLowerCase().max(254),
  company: z.string().trim().min(2, "Please enter your company").max(120),
  role: z.string().trim().max(100),
  industry: z.enum(values(INDUSTRIES), "Select an industry"),
  companySize: z.enum(values(COMPANY_SIZES), "Select a company size"),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
  /** Honeypot: real users never see or fill this. */
  website: z.string().max(200),
});
export type LeadInput = z.infer<typeof leadInputSchema>;

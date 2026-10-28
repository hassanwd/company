"use server";

import { createAction } from "@/server/http/create-action";
import { leadsService } from "@/server/services/leads.service";
import { leadInputSchema } from "./schemas";

// Public form: tight per-IP limit to deter spam.
export const submitLeadAction = createAction(
  "leads.submit",
  leadInputSchema,
  (input) => leadsService.submit(input),
  { rateLimit: { limit: 5, windowMs: 60 * 60_000 } },
);

"use server";

import { assertConsoleEnabled } from "@/server/config/console-guard";
import { createAction } from "@/server/http/create-action";
import { ndaReviewService } from "@/server/services/nda-review.service";
import { decideSchema, runReviewSchema } from "./schemas";

// The demo lives in the internal console, which has no authentication.
const guard = assertConsoleEnabled;

export const runNdaReviewAction = createAction(
  "nda-review.run",
  runReviewSchema,
  (input) => ndaReviewService.review(input),
  { guard, rateLimit: { limit: 20, windowMs: 60_000 } },
);

export const decideFindingAction = createAction(
  "nda-review.decide",
  decideSchema,
  (input) => ndaReviewService.decide(input),
  { guard, rateLimit: { limit: 120, windowMs: 60_000 } },
);

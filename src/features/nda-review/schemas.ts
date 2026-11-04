import { z } from "zod";

// Server Action bodies are capped at 100 KB (next.config.ts); an NDA's text is far below that.
export const MAX_CONTRACT_CHARS = 80_000;

export const runReviewSchema = z.object({
  title: z.string().trim().max(120),
  text: z
    .string()
    .trim()
    .min(200, "Paste or upload the full NDA text.")
    .max(MAX_CONTRACT_CHARS, "This document is too long for the demo."),
});

export const decideSchema = z
  .object({
    reviewId: z.uuid(),
    findingId: z.uuid(),
    decision: z.enum(["approved", "edited", "rejected"]),
    editedText: z.string().trim().max(5_000).optional(),
  })
  .refine((v) => v.decision !== "edited" || (v.editedText?.length ?? 0) > 0, {
    message: "Enter the edited clause text.",
    path: ["editedText"],
  });

export type RunReviewInput = z.input<typeof runReviewSchema>;
export type DecideInput = z.input<typeof decideSchema>;

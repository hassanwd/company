import "server-only";

import { headers } from "next/headers";
import { z, ZodError } from "zod";
import type { ActionResult } from "@/lib/action-result";
import { getClientIp, rateLimit } from "@/server/security/rate-limit";
import { AppError } from "./errors";

type ActionOptions = {
  /** Max calls per window per client IP for this action. */
  rateLimit: { limit: number; windowMs: number };
  /** Runs first; throw (e.g. `AppError.notFound()`) to refuse the call. */
  guard?: () => void;
};

/**
 * Builds a Server Action with: Zod input validation, per-IP rate limiting, and uniform
 * error handling. Next.js itself enforces same-origin POSTs and encrypts action IDs, so there is
 * no public REST endpoint to discover or script. Keep action files thin: validate -> service.
 */
export function createAction<S extends z.ZodType, R>(
  name: string,
  schema: S,
  handler: (input: z.output<S>) => Promise<R>,
  options: ActionOptions,
) {
  return async (input: z.input<S>): Promise<ActionResult<R>> => {
    try {
      options.guard?.();

      const ip = getClientIp(await headers());
      const limited = rateLimit(
        `action:${name}:${ip}`,
        options.rateLimit.limit,
        options.rateLimit.windowMs,
      );
      if (!limited.ok) throw AppError.tooManyRequests();

      return { ok: true, data: await handler(schema.parse(input)) };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          ok: false,
          code: "VALIDATION_ERROR",
          error: "Please check the highlighted fields.",
          fieldErrors: z.flattenError(error).fieldErrors as Record<string, string[]>,
        };
      }
      if (error instanceof AppError) {
        return {
          ok: false,
          code: error.code,
          error: error.message,
          fieldErrors: error.fieldErrors,
        };
      }
      // Log server-side only; never return internals to the client.
      console.error(`[action:${name}] unhandled error`, error);
      return {
        ok: false,
        code: "INTERNAL_ERROR",
        error: "Something went wrong. Please try again.",
      };
    }
  };
}

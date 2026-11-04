import type { NextRequest } from "next/server";
import { consoleEnabled } from "@/server/config/env";
import { AppError } from "@/server/http/errors";
import { getClientIp, rateLimit } from "@/server/security/rate-limit";
import { extractContractText } from "@/server/services/nda-review/extract-text";

/**
 * Turns an uploaded PDF / Word / text contract into plain text for the review screen.
 * A Route Handler (not a Server Action) because files exceed the 100 KB Server Action limit.
 * The (dashboard) layout guard does not cover route handlers, so the console check is repeated.
 */
export async function POST(request: NextRequest) {
  if (!consoleEnabled) return new Response("Not found", { status: 404 });

  const limited = rateLimit(`nda-review.parse:${getClientIp(request.headers)}`, 20, 60_000);
  if (!limited.ok)
    return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File))
      return Response.json({ error: "No file uploaded." }, { status: 400 });
    const text = await extractContractText(file);
    return Response.json({ text, title: file.name.replace(/\.[^.]+$/, "") });
  } catch (error) {
    if (error instanceof AppError) return Response.json({ error: error.message }, { status: 400 });
    console.error("[nda-review.parse] failed", error);
    return Response.json({ error: "Could not read this file." }, { status: 500 });
  }
}

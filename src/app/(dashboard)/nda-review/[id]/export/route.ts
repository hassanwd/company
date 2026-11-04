import type { NextRequest } from "next/server";
import { consoleEnabled } from "@/server/config/env";
import { buildReviewDocx } from "@/server/services/nda-review/export-docx";
import { ndaReviewService } from "@/server/services/nda-review.service";

/** Downloads the review (decisions, redlines, reasoning, audit trail) as a Word document. */
export async function GET(_request: NextRequest, ctx: RouteContext<"/nda-review/[id]/export">) {
  if (!consoleEnabled) return new Response("Not found", { status: 404 });
  const { id } = await ctx.params;

  let review;
  try {
    review = await ndaReviewService.get(id);
  } catch {
    return new Response("Review not found", { status: 404 });
  }

  const file = await buildReviewDocx(review);
  const name =
    review.title
      .replace(/[^\w\- ]+/g, "")
      .trim()
      .replace(/\s+/g, "-") || "nda";
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${name}-review.docx"`,
      "Cache-Control": "no-store",
    },
  });
}

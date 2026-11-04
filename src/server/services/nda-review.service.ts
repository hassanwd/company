import "server-only";

import { randomUUID } from "node:crypto";
import { getPlaybookClause } from "@/features/nda-review/playbook";
import {
  isComplete,
  isCritical,
  isDeviation,
  type AuditEvent,
  type Decision,
  type Finding,
  type Review,
} from "@/features/nda-review/types";
import { llmConfig } from "@/server/config/env";
import { ndaReviewsRepository } from "@/server/db/nda-reviews.repository";
import { AppError } from "@/server/http/errors";
import { analyzeWithLlm } from "./nda-review/analyze-llm";
import { analyzeWithRules } from "./nda-review/analyze-rules";
import { countWords, estimatePages, splitParagraphs } from "./nda-review/document";

const event = (actor: AuditEvent["actor"], action: string, detail: string): AuditEvent => ({
  at: new Date().toISOString(),
  actor,
  action,
  detail,
});

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export const ndaReviewService = {
  /** Runs the agent: read the document, compare against the playbook, draft redlines. */
  async review(input: { title: string; text: string }): Promise<Review> {
    const started = Date.now();
    const paragraphs = splitParagraphs(input.text);
    if (paragraphs.length < 3) {
      throw new AppError(
        "VALIDATION_ERROR",
        "This doesn't look like a full contract. Paste or upload the whole NDA.",
      );
    }
    const words = countWords(input.text);
    const mode = llmConfig.mode === "live" ? "llm" : "rules";

    let results;
    try {
      results =
        mode === "llm"
          ? await analyzeWithLlm(paragraphs)
          : analyzeWithRules(paragraphs, input.text);
    } catch (error) {
      console.error("[nda-review] analysis failed", error);
      throw new AppError(
        "AGENT_ERROR",
        "The agent could not complete the review. Check the model connection and try again.",
      );
    }

    const findings: Finding[] = results.map((r) => {
      const clause = getPlaybookClause(r.clauseId)!;
      return {
        ...r,
        id: randomUUID(),
        title: clause.title,
        severity: clause.severity,
        decision: "pending",
        finalText: null,
      };
    });
    const deviations = findings.filter(isDeviation).length;
    const critical = findings.filter(isCritical).length;
    const extracted = findings.filter((f) => f.originalText).length;

    const review: Review = {
      id: randomUUID(),
      title: input.title.trim() || "Untitled NDA",
      createdAt: new Date().toISOString(),
      mode,
      durationMs: Date.now() - started,
      stats: {
        words,
        pages: estimatePages(words),
        clausesChecked: findings.length,
        deviations,
        critical,
      },
      findings,
      audit: [
        event(
          "agent",
          "Read the NDA",
          `${plural(estimatePages(words), "page")}, ${plural(extracted, "key term")} extracted`,
        ),
        event(
          "agent",
          "Compared against playbook",
          `${plural(deviations, "deviation")} found, ${critical} critical`,
        ),
        event(
          "agent",
          "Drafted redlines",
          `${plural(deviations, "suggested change")}, each with its reasoning`,
        ),
        event(
          "agent",
          "Waiting for attorney approval",
          "No changes are sent until an attorney decides",
        ),
      ],
    };
    return ndaReviewsRepository.save(review);
  },

  async get(id: string): Promise<Review> {
    const review = await ndaReviewsRepository.get(id);
    if (!review) throw AppError.notFound("Review not found");
    return review;
  },

  async list(): Promise<Review[]> {
    return ndaReviewsRepository.list();
  },

  /** Records the attorney's decision on one finding. Every decision goes to the audit trail. */
  async decide(input: {
    reviewId: string;
    findingId: string;
    decision: Exclude<Decision, "pending">;
    editedText?: string;
  }): Promise<Review> {
    const review = await this.get(input.reviewId);
    const finding = review.findings.find((f) => f.id === input.findingId);
    if (!finding) throw AppError.notFound("Finding not found");
    if (!isDeviation(finding)) throw AppError.conflict("This clause already matches the playbook.");

    const wasComplete = isComplete(review);
    finding.decision = input.decision;
    finding.finalText =
      input.decision === "approved"
        ? finding.suggestedText
        : input.decision === "edited"
          ? (input.editedText?.trim() ?? null)
          : null;

    const label = {
      approved: "Approved redline",
      edited: "Edited redline",
      rejected: "Rejected redline",
    }[input.decision];
    review.audit.push(event("attorney", label, finding.title));

    if (!wasComplete && isComplete(review)) {
      review.audit.push(
        event("attorney", "Review completed", "All deviations decided; ready to send"),
      );
    }
    return ndaReviewsRepository.save(review);
  },
};

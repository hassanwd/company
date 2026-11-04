/** How a clause compares to the firm's playbook. */
export type Position = "preferred" | "acceptable" | "unacceptable" | "missing";

/** How much a deviation on this clause matters to the firm. */
export type Severity = "critical" | "major" | "minor";

export type Decision = "pending" | "approved" | "edited" | "rejected";

export type PlaybookClause = {
  id: string;
  title: string;
  /** Plain-language reason the clause matters, shown to attorneys. */
  whyItMatters: string;
  preferred: string;
  fallback: string;
  unacceptable: string;
  /** Replacement language the agent proposes when the clause deviates. */
  suggestedLanguage: string;
  severity: Severity;
};

export type Finding = {
  id: string;
  clauseId: string;
  title: string;
  position: Position;
  severity: Severity;
  /** One-line summary of what the agent found. */
  issue: string;
  /** The clause as it appears in the document, or null if it is missing. */
  originalText: string | null;
  /** Proposed redline, or null when the clause already matches the playbook. */
  suggestedText: string | null;
  reasoning: string;
  decision: Decision;
  /** The text the attorney approved (suggestion or their own edit). */
  finalText: string | null;
};

export type AuditEvent = {
  at: string;
  actor: "agent" | "attorney";
  action: string;
  detail: string;
};

export type ReviewMode = "rules" | "llm";

export type Review = {
  id: string;
  title: string;
  createdAt: string;
  mode: ReviewMode;
  durationMs: number;
  stats: {
    words: number;
    pages: number;
    clausesChecked: number;
    deviations: number;
    critical: number;
  };
  findings: Finding[];
  audit: AuditEvent[];
};

/** A finding needs an attorney decision when it does not match the preferred position. */
export const isDeviation = (finding: Pick<Finding, "position">) => finding.position !== "preferred";

export const isCritical = (finding: Pick<Finding, "position" | "severity">) =>
  finding.position !== "preferred" && finding.severity === "critical";

export const isComplete = (review: Pick<Review, "findings">) =>
  review.findings.filter(isDeviation).every((f) => f.decision !== "pending");

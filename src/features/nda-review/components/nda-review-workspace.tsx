"use client";

import {
  AlertTriangle,
  Bot,
  Check,
  Download,
  FileText,
  Loader2,
  Pencil,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Upload,
  UserCheck,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActionError, unwrap } from "@/lib/action-result";
import { cn } from "@/lib/utils";
import { decideFindingAction, runNdaReviewAction } from "../actions";
import { NDA_PLAYBOOK } from "../playbook";
import { SAMPLE_NDA_TEXT, SAMPLE_NDA_TITLE } from "../sample-nda";
import { MAX_CONTRACT_CHARS } from "../schemas";
import {
  isComplete,
  isCritical,
  isDeviation,
  type Decision,
  type Finding,
  type Position,
  type Review,
} from "../types";

const POSITION: Record<Position, { label: string; className: string }> = {
  preferred: { label: "Matches playbook", className: "bg-success/10 text-success" },
  acceptable: { label: "Fallback position", className: "bg-amber-100 text-amber-800" },
  unacceptable: { label: "Unacceptable", className: "bg-destructive/10 text-destructive" },
  missing: { label: "Missing", className: "bg-muted text-muted-foreground" },
};

const DECISION: Record<Exclude<Decision, "pending">, string> = {
  approved: "Redline approved",
  edited: "Edited by attorney",
  rejected: "Rejected, original kept",
};

const AGENT_STEPS = ["Read the NDA", "Compared against your playbook", "Drafted redlines"];

const errorMessage = (error: unknown) =>
  error instanceof ActionError ? error.message : "Something went wrong. Please try again.";

/** Deviations first: critical, then unacceptable, missing, fallback. */
const rank = (f: Finding) =>
  (isCritical(f) ? 0 : 10) +
  { unacceptable: 1, missing: 2, acceptable: 3, preferred: 4 }[f.position];

export function NdaReviewWorkspace({ modeLabel }: { modeLabel: string }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [review, setReview] = useState<Review | null>(null);
  const [running, setRunning] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function run() {
    setRunning(true);
    try {
      setReview(await unwrap(runNdaReviewAction({ title, text })));
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setRunning(false);
    }
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/nda-review/parse", { method: "POST", body: form });
      const data = (await res.json()) as { text?: string; title?: string; error?: string };
      if (!res.ok || !data.text) throw new Error(data.error ?? "Could not read this file.");
      setText(data.text.slice(0, MAX_CONTRACT_CHARS));
      setTitle(data.title ?? file.name);
      toast.success("Document loaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not read this file.");
    } finally {
      setUploading(false);
    }
  }

  if (running) return <AgentProgress />;
  if (review) {
    return <ReviewView review={review} onChange={setReview} onReset={() => setReview(null)} />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section className="border-border bg-card rounded-xl border p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">Add the NDA</h2>
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <Sparkles className="size-3.5" aria-hidden /> {modeLabel}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <UploadButton uploading={uploading} onChange={upload} />
          <Button
            variant="outline"
            onClick={() => {
              setTitle(SAMPLE_NDA_TITLE);
              setText(SAMPLE_NDA_TEXT);
            }}
          >
            <FileText className="size-4" aria-hidden /> Use sample NDA
          </Button>
        </div>
        <label className="mt-5 block text-sm font-medium" htmlFor="nda-title">
          Title
        </label>
        <Input
          id="nda-title"
          className="mt-1.5"
          placeholder="e.g. Inbound NDA · Acme Supplies"
          value={title}
          maxLength={120}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="mt-4 block text-sm font-medium" htmlFor="nda-text">
          Contract text
        </label>
        <textarea
          id="nda-text"
          className="border-border bg-background focus-visible:ring-ring mt-1.5 h-80 w-full rounded-md border p-3 font-mono text-xs leading-relaxed focus-visible:ring-2 focus-visible:outline-none"
          placeholder="Upload a PDF or Word file, use the sample, or paste the NDA here."
          value={text}
          maxLength={MAX_CONTRACT_CHARS}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">
            {text.trim().split(/\s+/).filter(Boolean).length} words · nothing is sent anywhere
            except your configured model
          </p>
          <Button size="lg" onClick={run} disabled={text.trim().length < 200}>
            <Bot className="size-4" aria-hidden /> Run review
          </Button>
        </div>
      </section>
      <PlaybookPanel />
    </div>
  );
}

function UploadButton({
  uploading,
  onChange,
}: {
  uploading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={input}
        type="file"
        accept=".pdf,.docx,.txt"
        className="sr-only"
        aria-label="Upload NDA"
        onChange={onChange}
      />
      <Button loading={uploading} onClick={() => input.current?.click()}>
        {!uploading && <Upload className="size-4" aria-hidden />} Upload PDF or Word
      </Button>
    </>
  );
}

function PlaybookPanel() {
  return (
    <aside className="border-border bg-card h-fit rounded-xl border p-6 shadow-sm">
      <h2 className="font-semibold">Your NDA playbook</h2>
      <p className="text-muted-foreground mt-1 text-sm">
        {NDA_PLAYBOOK.length} clauses the agent checks. Each firm sets its own positions.
      </p>
      <ul className="mt-4 flex flex-col gap-1">
        {NDA_PLAYBOOK.map((clause) => (
          <li key={clause.id}>
            <details className="group">
              <summary className="hover:bg-muted flex cursor-pointer list-none items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm">
                {clause.title}
                {clause.severity === "critical" && <Badge variant="destructive">critical</Badge>}
              </summary>
              <dl className="text-muted-foreground mt-1 mb-2 flex flex-col gap-1.5 px-2 text-xs">
                <div>
                  <dt className="text-success font-medium">Preferred</dt>
                  <dd>{clause.preferred}</dd>
                </div>
                <div>
                  <dt className="font-medium text-amber-700">Fallback</dt>
                  <dd>{clause.fallback}</dd>
                </div>
                <div>
                  <dt className="text-destructive font-medium">Unacceptable</dt>
                  <dd>{clause.unacceptable}</dd>
                </div>
              </dl>
            </details>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function AgentProgress() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, AGENT_STEPS.length - 1)), 900);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="border-border bg-card mx-auto max-w-xl rounded-xl border p-6 shadow-sm">
      <AgentHeader subtitle="Reviewing…" badge={<Badge variant="primary">Working</Badge>} />
      <ol className="mt-5 flex flex-col gap-4">
        {AGENT_STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <StepIcon state={i < step ? "done" : i === step ? "active" : "todo"} />
            <span className={cn(i > step && "text-muted-foreground")}>{label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StepIcon({ state }: { state: "done" | "active" | "todo" }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full",
        state === "done" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground",
      )}
    >
      {state === "done" ? (
        <Check className="size-3.5" aria-hidden />
      ) : state === "active" ? (
        <Loader2 className="size-3.5 animate-spin" aria-hidden />
      ) : null}
    </span>
  );
}

function AgentHeader({ subtitle, badge }: { subtitle: string; badge: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
          <FileText className="size-5" aria-hidden />
        </span>
        <div>
          <p className="font-semibold">Contract Review Agent</p>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
      </div>
      {badge}
    </div>
  );
}

function ReviewView({
  review,
  onChange,
  onReset,
}: {
  review: Review;
  onChange: (review: Review) => void;
  onReset: () => void;
}) {
  const deviations = review.findings.filter(isDeviation).sort((a, b) => rank(a) - rank(b));
  const matches = review.findings.filter((f) => !isDeviation(f));
  const decided = deviations.filter((f) => f.decision !== "pending").length;
  const complete = isComplete(review);
  const steps = review.audit.slice(0, 3);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="flex flex-col gap-4">
        {deviations.length === 0 && (
          <p className="border-border bg-card rounded-xl border p-6 text-sm">
            No deviations: this NDA matches the playbook.
          </p>
        )}
        {deviations.map((finding) => (
          <FindingCard
            key={finding.id}
            reviewId={review.id}
            finding={finding}
            onChange={onChange}
          />
        ))}
        {matches.length > 0 && (
          <details className="border-border bg-card rounded-xl border p-5">
            <summary className="cursor-pointer text-sm font-medium">
              {matches.length} clauses match the playbook
            </summary>
            <ul className="mt-3 flex flex-col gap-2">
              {matches.map((f) => (
                <li key={f.id} className="flex gap-2 text-sm">
                  <Check className="text-success mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>
                    <span className="font-medium">{f.title}:</span>{" "}
                    <span className="text-muted-foreground">{f.issue}</span>
                  </span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <aside className="flex h-fit flex-col gap-4 lg:sticky lg:top-6">
        <div className="border-border bg-card rounded-xl border p-5 shadow-sm">
          <AgentHeader
            subtitle={review.title}
            badge={
              complete ? (
                <Badge variant="success">Approved</Badge>
              ) : (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                  Needs approval
                </span>
              )
            }
          />
          <ol className="mt-5 flex flex-col gap-3">
            {steps.map((s) => (
              <li key={s.action} className="flex gap-3">
                <StepIcon state="done" />
                <div>
                  <p className="text-sm font-medium">{s.action}</p>
                  <p className="text-muted-foreground text-sm">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground mt-4 text-xs">
            Completed in {Math.max(1, Math.round(review.durationMs / 1000))}s ·{" "}
            {review.mode === "llm" ? "live model" : "demo rules"}
          </p>
          <div
            className={cn(
              "mt-4 rounded-lg border p-3 text-sm",
              complete ? "border-success/30 bg-success/5" : "border-primary/20 bg-muted/60",
            )}
          >
            <p className="flex items-center gap-2 font-medium">
              <ShieldCheck className="text-primary size-4" aria-hidden />
              {complete ? "Approved by attorney" : "Waiting for attorney approval"}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {decided} of {deviations.length} changes decided
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant={complete ? "primary" : "outline"} size="sm">
              <a href={`/nda-review/${review.id}/export`} download>
                <Download className="size-4" aria-hidden />
                {complete ? "Export Word" : "Export draft"}
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={onReset}>
              <RotateCcw className="size-4" aria-hidden /> New review
            </Button>
          </div>
        </div>
        <AuditTrail review={review} />
      </aside>
    </div>
  );
}

function FindingCard({
  reviewId,
  finding,
  onChange,
}: {
  reviewId: string;
  finding: Finding;
  onChange: (review: Review) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [reopened, setReopened] = useState(false);
  const [draft, setDraft] = useState(finding.finalText ?? finding.suggestedText ?? "");
  const [pending, setPending] = useState<Decision | null>(null);

  async function decide(decision: Exclude<Decision, "pending">) {
    setPending(decision);
    try {
      onChange(
        await unwrap(
          decideFindingAction({
            reviewId,
            findingId: finding.id,
            decision,
            editedText: decision === "edited" ? draft : undefined,
          }),
        ),
      );
      setEditing(false);
      setReopened(false);
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setPending(null);
    }
  }

  const position = POSITION[finding.position];
  const decided = finding.decision !== "pending";

  return (
    <article
      className={cn(
        "border-border bg-card rounded-xl border p-5 shadow-sm",
        isCritical(finding) && !decided && "border-destructive/40",
      )}
    >
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="mr-auto font-semibold">{finding.title}</h3>
        {isCritical(finding) && (
          <span className="text-destructive inline-flex items-center gap-1 text-xs font-semibold">
            <AlertTriangle className="size-3.5" aria-hidden /> Critical
          </span>
        )}
        <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", position.className)}>
          {position.label}
        </span>
      </header>
      <p className="mt-1 text-sm">{finding.issue}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground text-xs font-medium uppercase">In the document</p>
          <p className="mt-1.5 text-sm">{finding.originalText ?? "This clause is missing."}</p>
        </div>
        <div className="bg-primary/5 rounded-lg p-3">
          <p className="text-primary text-xs font-medium uppercase">
            {finding.decision === "edited" ? "Attorney's version" : "Suggested redline"}
          </p>
          {editing ? (
            <textarea
              className="border-border bg-background focus-visible:ring-ring mt-1.5 h-36 w-full rounded-md border p-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
              value={draft}
              aria-label={`Edit redline for ${finding.title}`}
              onChange={(e) => setDraft(e.target.value)}
            />
          ) : (
            <p className="mt-1.5 text-sm">
              {finding.decision === "edited" ? finding.finalText : finding.suggestedText}
            </p>
          )}
        </div>
      </div>
      <p className="text-muted-foreground mt-3 text-sm">
        <span className="text-foreground font-medium">Why: </span>
        {finding.reasoning}
      </p>

      <footer className="border-border mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
        {editing ? (
          <>
            <Button size="sm" loading={pending === "edited"} onClick={() => decide("edited")}>
              Save edit
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </>
        ) : decided && !reopened ? (
          <>
            <span className="text-success inline-flex items-center gap-1.5 text-sm font-medium">
              <UserCheck className="size-4" aria-hidden />
              {DECISION[finding.decision as Exclude<Decision, "pending">]}
            </span>
            <Button size="sm" variant="ghost" className="ml-auto" onClick={() => setReopened(true)}>
              Change
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" loading={pending === "approved"} onClick={() => decide("approved")}>
              {pending !== "approved" && <Check className="size-4" aria-hidden />} Approve
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
              <Pencil className="size-4" aria-hidden /> Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              loading={pending === "rejected"}
              onClick={() => decide("rejected")}
            >
              {pending !== "rejected" && <X className="size-4" aria-hidden />} Reject
            </Button>
          </>
        )}
      </footer>
    </article>
  );
}

function AuditTrail({ review }: { review: Review }) {
  return (
    <div className="border-border bg-card rounded-xl border p-5 shadow-sm">
      <h2 className="text-sm font-semibold">Audit trail</h2>
      <ol className="mt-3 flex flex-col gap-2.5">
        {review.audit.map((event, i) => (
          <li key={`${event.at}-${i}`} className="flex gap-2 text-xs">
            {event.actor === "agent" ? (
              <Bot className="text-primary mt-0.5 size-3.5 shrink-0" aria-hidden />
            ) : (
              <UserCheck className="text-success mt-0.5 size-3.5 shrink-0" aria-hidden />
            )}
            <span>
              <span className="font-medium">{event.action}</span>
              <span className="text-muted-foreground"> · {event.detail}</span>
              <span className="text-muted-foreground block">
                {new Date(event.at).toLocaleTimeString()}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

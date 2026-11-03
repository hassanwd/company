"use client";

import { Check, ShieldCheck } from "lucide-react";
import {
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { AGENT_RUNS } from "@/content/agent-runs";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Renders `text` with the first occurrence of `highlight` (if any) in bold amber. */
function HighlightedText({ text, highlight }: { text: string; highlight?: string }) {
  const start = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || start === -1) return text;
  return (
    <>
      {text.slice(0, start)}
      <strong className="font-semibold text-amber-700">{highlight}</strong>
      {text.slice(start + highlight.length)}
    </>
  );
}

/**
 * Sample agent run for each industry, with a human approval step at the end. Tabs switch between
 * industries; the card rotates by itself every 5s unless the visitor hovers or focuses it, or has
 * asked for reduced motion.
 */
export function AgentShowcase() {
  const id = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Treated as "reduced" on the server so nothing auto-rotates before the preference is known.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );

  useEffect(() => {
    if (paused || reducedMotion) return;
    // `index` is a dependency so picking a tab by hand restarts the 5s timer.
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % AGENT_RUNS.length), ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion]);

  const run = AGENT_RUNS[index];
  const Icon = run.icon;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + AGENT_RUNS.length) % AGENT_RUNS.length;
    setIndex(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }

  return (
    <div
      className="border-border bg-card mx-auto flex min-h-[35.5rem] w-full max-w-xl flex-col rounded-2xl border p-5 text-left shadow-lg min-[340px]:min-h-[32.5rem] min-[400px]:min-h-[28.5rem] min-[500px]:min-h-[24rem] sm:min-h-[24.5rem] sm:p-6 lg:min-h-[28rem] xl:min-h-[24.5rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="tablist"
        aria-label="Agent examples by industry"
        className="bg-muted relative mb-5 grid grid-cols-4 rounded-full p-1"
        onKeyDown={onKeyDown}
      >
        {/* Sliding thumb: one quarter of the track, moved by whole multiples of its own width. */}
        <span
          aria-hidden
          className="bg-primary absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/4)] rounded-full shadow-md shadow-[color-mix(in_oklab,var(--primary)_35%,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(${index * 100}%)` }}
        />
        {AGENT_RUNS.map(({ industry }, i) => (
          <button
            key={industry}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === index}
            aria-controls={`${id}-panel`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
            className={cn(
              "focus-visible:ring-ring relative rounded-full px-2 py-2 text-sm font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none",
              i === index
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {industry}
          </button>
        ))}
      </div>

      {/* Keyed by industry so the steps replay their entrance each time the tab changes. */}
      <div
        key={run.industry}
        role="tabpanel"
        id={`${id}-panel`}
        className="flex flex-1 flex-col"
        aria-labelledby={`${id}-tab-${index}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
              <Icon className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold">{run.agent}</p>
              <p className="text-muted-foreground text-sm">{run.subject}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-medium text-amber-800">
            Needs approval
          </span>
        </div>

        <ul className="mt-5 mb-4 flex flex-col gap-3">
          {run.steps.map(({ title, detail, highlight }, step) => (
            <li
              key={title}
              className="agent-step flex gap-3"
              style={{ "--step-delay": `${step * 600}ms` } as CSSProperties}
            >
              <span className="bg-success/10 text-success mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                <Check className="size-3" aria-hidden />
              </span>
              <div className="text-sm">
                <p className="font-medium">{title}</p>
                <p className="text-muted-foreground">
                  <HighlightedText text={detail} highlight={highlight} />
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="agent-approval border-primary/30 bg-muted mt-auto flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3">
          <span className="flex items-center gap-2 text-sm font-medium">
            <ShieldCheck className="text-primary size-4 shrink-0" aria-hidden />
            {run.approval}
          </span>
          <span className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm font-medium">
            {run.action}
          </span>
        </div>
      </div>
    </div>
  );
}

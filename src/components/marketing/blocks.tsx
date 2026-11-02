import { ArrowRight, Check, FileText, ShieldCheck } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Feature, Step } from "@/content/company";
import type { Faq as FaqItem, Solution } from "@/content/solutions";
import { solutionHref } from "@/content/solutions";
import { featureGridClass, STEP_CONNECTOR, stepsLayout } from "./layout-helpers";
import { Container } from "./primitives";

/** Icon cards. Columns follow the item count so no card is left on its own row. */
export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <ul className={cn("grid gap-4", featureGridClass(features.length))}>
      {features.map(({ title, description, icon: Icon }) => (
        <li key={title} className="border-border bg-card rounded-xl border p-6 shadow-sm">
          <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
            <Icon className="size-5" aria-hidden />
          </span>
          <h3 className="mt-4 font-semibold">{title}</h3>
          <p className="text-muted-foreground mt-2 text-sm">{description}</p>
        </li>
      ))}
    </ul>
  );
}

/** Numbered steps. `layout="grid"` for a row of cards, `"list"` for a vertical timeline. */
export function Steps({ steps, layout = "grid" }: { steps: Step[]; layout?: "grid" | "list" }) {
  const { grid, connectAt } = stepsLayout(steps.length);
  return (
    <ol className={cn(layout === "grid" ? ["grid gap-4", grid] : "flex flex-col gap-4")}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={cn(
            "border-border bg-card relative flex gap-4 rounded-xl border p-5",
            layout === "grid" && connectAt && STEP_CONNECTOR[connectAt],
          )}
        >
          <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
            {index + 1}
          </span>
          <div>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Accessible, JS-free accordion built on <details>. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-border divide-border bg-card divide-y rounded-xl border">
      {items.map(({ question, answer }) => (
        <details key={question} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
            {question}
            <span
              className="text-muted-foreground transition-transform group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="text-muted-foreground mt-3 text-sm text-pretty">{answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm">
          <Check className="text-success mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  const { icon: Icon, name, tagline, agents, slug, accent } = solution;
  return (
    <Link
      href={solutionHref(slug)}
      style={{ "--accent": accent } as CSSProperties}
      className="group border-border bg-card focus-visible:ring-ring flex flex-col rounded-xl border border-t-4 border-t-(--accent) p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span className="flex size-11 items-center justify-center rounded-lg bg-(--accent)/10 text-(--accent)">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-5 text-xl font-semibold">{name}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{tagline}</p>
      <ul className="mt-4 flex flex-col gap-1.5 text-sm">
        {agents.slice(0, 3).map((agent) => (
          <li key={agent.name} className="flex gap-2">
            <Check className="text-success mt-0.5 size-4 shrink-0" aria-hidden />
            {agent.name}
          </li>
        ))}
      </ul>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-(--accent)">
        Explore {name.toLowerCase()} solutions
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}

export function CtaBanner({
  title = "See what governed agents can do for your team",
  description = "Book a working session with our solution architects. We'll map your highest-value workflows and show what a pilot would look like.",
  primary = { label: "Book a demo", href: "/contact" as Route },
  secondary = { label: "See the 4-week proof of concept", href: "/proof-of-concept" as Route },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: Route };
  /** Pass `null` to hide the secondary button (e.g. on the proof-of-concept page itself). */
  secondary?: { label: string; href: Route } | null;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="bg-primary text-primary-foreground grid gap-10 overflow-hidden rounded-2xl p-8 sm:p-12 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-pretty text-white/85">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-neutral-900 hover:bg-white/90"
              >
                <Link href={primary.href}>
                  {primary.label} <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              {secondary ? (
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
          <div className="rounded-xl bg-white/10 p-6">
            <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">
              In your working session
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Map your highest-value workflows",
                "See agents running on a workflow like yours",
                "Leave with a plan, timeline and fixed fee",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Static preview of an agent run, used on the home page to show the human approval step. */
export function AgentRunPreview() {
  const steps = [
    ["Read the NDA", "12 pages, 6 key terms extracted"],
    ["Compared to your playbook", "3 deviations found, 1 critical"],
    ["Drafted redlines", "Each change comes with its reasoning"],
  ];
  return (
    <div className="border-border bg-card mx-auto max-w-2xl rounded-2xl border p-5 text-left shadow-lg sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
            <FileText className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold">Contract Review Agent</p>
            <p className="text-muted-foreground text-xs">Inbound NDA · Acme Supplies</p>
          </div>
        </div>
        <span className="bg-success/10 text-success rounded-full px-2.5 py-1 text-xs font-medium">
          Ready for review
        </span>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {steps.map(([title, detail], index) => (
          <li
            key={title}
            className="agent-step flex gap-3"
            style={{ "--step-delay": `${index * 600}ms` } as CSSProperties}
          >
            <span className="bg-success/10 text-success mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
              <Check className="size-3" aria-hidden />
            </span>
            <div className="text-sm">
              <p className="font-medium">{title}</p>
              <p className="text-muted-foreground">{detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="agent-approval border-border bg-muted mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3">
        <span className="flex items-center gap-2 text-sm font-medium">
          <ShieldCheck className="text-primary size-4" aria-hidden />
          Waiting for attorney approval
        </span>
        <span className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs font-medium">
          Review redlines
        </span>
      </div>
    </div>
  );
}

/** Plain-language styling for long-form legal text without a typography plugin. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="text-muted-foreground [&_h2]:text-foreground [&_strong]:text-foreground max-w-3xl text-base leading-7 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:mt-1 [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
      {children}
    </div>
  );
}

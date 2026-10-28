import { ArrowRight, Check } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Feature, Step } from "@/content/company";
import type { Faq as FaqItem, Solution } from "@/content/solutions";
import { solutionHref } from "@/content/solutions";
import { Container } from "./primitives";

export function FeatureGrid({ features, columns = 3 }: { features: Feature[]; columns?: 2 | 3 }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
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
  return (
    <ol
      className={cn(
        layout === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4",
      )}
    >
      {steps.map((step, index) => (
        <li key={step.title} className="border-border bg-card flex gap-4 rounded-xl border p-5">
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
  const { icon: Icon, name, tagline, agents, slug } = solution;
  return (
    <Link
      href={solutionHref(slug)}
      className="group border-border bg-card hover:border-primary/50 focus-visible:ring-ring flex flex-col rounded-xl border p-6 shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-lg">
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
      <span className="text-primary mt-6 inline-flex items-center gap-1 text-sm font-medium">
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
  secondary,
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: Route };
  secondary?: { label: string; href: Route };
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-12">
          <div className="bg-cta absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-balance">{title}</h2>
            <p className="mt-4 text-lg text-pretty text-white/85">{description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-neutral-900 hover:bg-white/90"
              >
                <Link href={primary.href}>{primary.label}</Link>
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
        </div>
      </Container>
    </section>
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

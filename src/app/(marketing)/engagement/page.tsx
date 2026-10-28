import type { Metadata } from "next";
import Link from "next/link";
import { CheckList, CtaBanner, Faq } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import { ENGAGEMENT_MODELS, GENERAL_FAQS } from "@/content/company";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Engagement models",
  description:
    "Start with a discovery sprint, prove value in a pilot, scale to production and optionally let us run it. Pricing is scoped to your workflows.",
  alternates: { canonical: "/engagement" },
};

export default function EngagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagement"
        title="Start small, prove it, then scale"
        description="Choose the entry point that fits where you are. Commercials are scoped to your workflows, volumes and deployment model — not a generic rate card."
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ENGAGEMENT_MODELS.map((model) => (
            <article
              key={model.name}
              className={cn(
                "border-border bg-card flex flex-col rounded-xl border p-6 shadow-sm",
                model.highlight && "border-primary ring-primary/20 ring-4",
              )}
            >
              {model.highlight && (
                <span className="bg-primary/10 text-primary mb-3 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium">
                  Most common start
                </span>
              )}
              <h2 className="text-xl font-semibold">{model.name}</h2>
              <p className="text-muted-foreground mt-2 text-sm">{model.summary}</p>
              <p className="mt-4 text-sm">
                <strong className="font-medium">Best for: </strong>
                <span className="text-muted-foreground">{model.bestFor}</span>
              </p>
              <CheckList items={model.includes} className="mt-5" />
              <Button asChild variant={model.highlight ? "primary" : "outline"} className="mt-6">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="FAQ" title="Commercial & delivery questions">
        <div className="max-w-3xl">
          <Faq items={GENERAL_FAQS} />
        </div>
      </Section>

      <CtaBanner
        title="Get a scoped proposal"
        description="Tell us about your workflows and we'll come back with a plan, timeline and commercial model."
      />
    </>
  );
}

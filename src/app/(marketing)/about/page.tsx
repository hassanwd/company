import type { Metadata } from "next";
import { CtaBanner } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { PRINCIPLES } from "@/content/company";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${SITE.name} exists and the principles we build agentic AI on.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Making AI agents trustworthy enough for the work that matters"
        description="Law, finance and healthcare run on trust, evidence and accountability. We build agents that respect all three."
      />

      <Section
        eyebrow="Our mission"
        title="Take the busywork off professionals, keep the judgment with them"
      >
        <div className="text-muted-foreground max-w-3xl space-y-4 text-lg text-pretty">
          <p>
            Skilled professionals spend too much of their time on work that is necessary but not
            where their expertise matters most: reading, matching, chasing, formatting and filing.
          </p>
          <p>
            We build agents that take on that work reliably and transparently, so lawyers, finance
            teams and care teams can spend their time on judgment, relationships and outcomes — with
            the evidence to show how every result was produced.
          </p>
        </div>
      </Section>

      <Section tone="muted" eyebrow="Principles" title="What we hold ourselves to">
        <dl className="grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map(({ title, description }) => (
            <div key={title} className="border-border bg-card rounded-xl border p-6">
              <dt className="font-semibold">{title}</dt>
              <dd className="text-muted-foreground mt-2 text-sm">{description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBanner title="Let's talk about your workflows" />
    </>
  );
}

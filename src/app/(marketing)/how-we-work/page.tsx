import type { Metadata } from "next";
import { CheckList, CtaBanner } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { PROCESS, TEAM_ROLES } from "@/content/company";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Our end-to-end delivery model: discover, design, build and pilot, deploy, then operate and improve — with one accountable team.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="End to end, with one accountable team"
        description="We take responsibility for the whole journey: choosing the right workflow, building it, getting it through security and compliance, and running it after launch."
      />

      <Section eyebrow="Delivery model" title="Five phases from idea to operation">
        <ol className="flex flex-col gap-4">
          {PROCESS.map(({ phase, title, description, deliverables }) => (
            <li
              key={phase}
              className="border-border bg-card grid gap-6 rounded-xl border p-6 shadow-sm md:grid-cols-[auto_1fr_1fr]"
            >
              <span className="text-primary text-3xl font-semibold">{phase}</span>
              <div>
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-muted-foreground mt-2 text-sm">{description}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  Deliverables
                </h3>
                <CheckList items={deliverables} className="mt-3" />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        tone="muted"
        eyebrow="Your team"
        title="Who you'll work with"
        description="A small, senior, cross-functional team that stays with you from discovery onward."
      >
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TEAM_ROLES.map(({ title, description }) => (
            <div key={title} className="border-border bg-card rounded-xl border p-5">
              <dt className="font-semibold">{title}</dt>
              <dd className="text-muted-foreground mt-2 text-sm">{description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBanner
        title="Start with a discovery conversation"
        secondary={{ label: "Engagement models", href: "/engagement" }}
      />
    </>
  );
}

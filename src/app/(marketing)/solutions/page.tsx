import type { Metadata } from "next";
import { CtaBanner, SolutionCard } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { SOLUTIONS } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Governed AI agents for law, finance and healthcare — contract review, transaction monitoring, prior authorisation and more.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Agentic solutions for law, finance and healthcare"
        description="Industry-specific agents, controls and integrations — delivered end to end, from discovery to day-to-day operation."
      />
      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
      </Section>
      <Section
        tone="muted"
        eyebrow="Common foundation"
        title="Different industries, one governed platform"
        description="Every solution runs on the same platform: approvals where risk is high, evidence for every action, and deployment in the environment you choose."
      />
      <CtaBanner />
    </>
  );
}

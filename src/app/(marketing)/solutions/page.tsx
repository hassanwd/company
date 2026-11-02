import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner, FeatureGrid, SolutionCard } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import { PLATFORM_FEATURES } from "@/content/company";
import { SOLUTIONS } from "@/content/solutions";

/** The platform capabilities every solution shares, in the order they are shown. */
const SHARED_PILLAR_TITLES = ["Human-in-the-loop", "Guardrails & policy", "Observability & audit"];
const SHARED_PILLARS = SHARED_PILLAR_TITLES.flatMap((title) =>
  PLATFORM_FEATURES.filter((feature) => feature.title === title),
);

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Governed AI agents for law, finance, healthcare and retail — contract review, transaction monitoring, demand forecasting and more.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Agentic solutions for law, finance, healthcare and retail"
        description="Industry-specific agents, controls and integrations — delivered end to end, from discovery to day-to-day operation."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
      >
        <FeatureGrid features={SHARED_PILLARS} />
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/platform">
              See the full platform <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}

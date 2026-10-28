import type { Metadata } from "next";
import { CheckList, CtaBanner, FeatureGrid, Steps } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { AGENT_LOOP, DEPLOYMENT_OPTIONS, PLATFORM_FEATURES } from "@/content/company";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "A governed agent platform: orchestration, grounded knowledge, integrations, human-in-the-loop approvals, evaluation, observability and flexible deployment.",
  alternates: { canonical: "/platform" },
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="The control plane for enterprise AI agents"
        description="Build, run and govern agents in one place — with the approvals, evidence and isolation regulated industries require."
      />

      <Section
        eyebrow="The agent loop"
        title="How an agent completes a task"
        description="Every run follows the same governed loop, and every step is traced."
      >
        <Steps steps={AGENT_LOOP} />
      </Section>

      <Section
        tone="muted"
        eyebrow="Capabilities"
        title="Everything between a model and a production workflow"
        description="Models are one component. The platform provides the rest: the context, tools, controls and visibility that make agents dependable."
      >
        <FeatureGrid features={PLATFORM_FEATURES} />
      </Section>

      <Section
        eyebrow="Deployment"
        title="Run it where your data lives"
        description="Choose the model that fits your security, residency and operational requirements."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {DEPLOYMENT_OPTIONS.map(({ title, description, points }) => (
            <div key={title} className="border-border bg-card rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{description}</p>
              <CheckList items={points} className="mt-5" />
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Want to see the platform on a real workflow?"
        secondary={{ label: "Security & compliance", href: "/security" }}
      />
    </>
  );
}

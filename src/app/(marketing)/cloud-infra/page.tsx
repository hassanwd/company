import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CheckList, CtaBanner, FeatureGrid, Steps } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import {
  DEPLOYMENT_OPTIONS,
  INFRA_FEATURES,
  INFRA_PLATFORMS,
  INFRA_STEPS,
} from "@/content/company";

export const metadata: Metadata = {
  title: "Cloud & Infra",
  description:
    "Run governed AI agents in managed cloud, your own cloud account or a restricted environment, with private networking, your keys and data residency.",
  alternates: { canonical: "/cloud-infra" },
};

export default function CloudInfraPage() {
  return (
    <>
      <PageHero
        eyebrow="Cloud & Infra"
        title="Run agents where your data lives"
        description="Deploy in our managed cloud, inside your own cloud account or in a restricted environment — with isolation, private networking and your own keys."
      />

      <Section
        eyebrow="Deployment models"
        title="Choose the model that fits your requirements"
        description="Pick the balance between speed and control. You can move between models as your needs change."
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

      <Section
        tone="muted"
        eyebrow="Infrastructure"
        title="Built for enterprise infrastructure teams"
        description="The controls your cloud, network and security teams expect, in place from the first deployment."
      >
        <FeatureGrid features={INFRA_FEATURES} />
      </Section>

      <Section
        eyebrow="Where it runs"
        title="Works with the infrastructure you already have"
        description="We deploy to the platforms your teams already operate, through their supported interfaces."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INFRA_PLATFORMS.map((platform) => (
            <li
              key={platform}
              className="border-border bg-card flex items-center gap-3 rounded-xl border p-4 text-sm font-medium"
            >
              <span className="bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-full">
                <Check className="size-3.5" aria-hidden />
              </span>
              {platform}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="muted"
        eyebrow="How we deploy"
        title="From assessment to a running environment"
        description="A repeatable path that keeps your security and infrastructure teams in the loop at every step."
      >
        <Steps steps={INFRA_STEPS} />
      </Section>

      <CtaBanner
        title="Tell us about your environment"
        description="Share your cloud, network and compliance requirements and we'll propose a deployment model that fits."
        secondary={{ label: "Security & compliance", href: "/security" }}
      />
    </>
  );
}

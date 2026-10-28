import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckList,
  CtaBanner,
  Faq,
  FeatureGrid,
  SolutionCard,
  Steps,
} from "@/components/marketing/blocks";
import { Container, Eyebrow, Section } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import {
  AGENT_LOOP,
  COMMITMENTS,
  GENERAL_FAQS,
  PLATFORM_FEATURES,
  PROCESS,
} from "@/content/company";
import { SITE } from "@/content/site";
import { SOLUTIONS } from "@/content/solutions";
import { siteUrl } from "@/server/config/env";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Agentic AI for law, finance and healthcare` },
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: siteUrl,
    description: SITE.description,
    email: SITE.email,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <div className="border-border relative overflow-hidden border-b">
        <div className="bg-hero absolute inset-0 -z-10" aria-hidden />
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="border-border bg-card text-muted-foreground mx-auto inline-flex rounded-full border px-4 py-1.5 text-sm">
              Enterprise agentic AI · Law · Finance · Healthcare
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              AI agents that finish the work — with your people in control
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-pretty sm:text-xl">
              We design, deploy and operate governed agents for the most regulated industries — from
              first workflow to production, with approvals, audit trails and security built in.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Book a demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/solutions">
                  Explore solutions <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Value strip */}
      <Container className="py-10">
        <dl className="grid gap-6 text-center sm:grid-cols-3">
          {[
            ["End to end", "Discovery to production to ongoing operations, from one team."],
            ["Human-governed", "Approval gates and escalation designed around your risk."],
            [
              "Enterprise-secure",
              "Your data, your environment, your keys. Never used to train models.",
            ],
          ].map(([term, detail]) => (
            <div key={term}>
              <dt className="font-semibold">{term}</dt>
              <dd className="text-muted-foreground mt-1 text-sm">{detail}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Section
        tone="muted"
        eyebrow="Solutions"
        title="Purpose-built for regulated industries"
        description="Each solution pairs domain-specific agents with the controls that industry requires."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="What makes it agentic"
        title="Not a chatbot. A colleague that completes tasks."
        description="Agents pursue a goal through a loop of planning, acting, checking and escalating — and every step is recorded."
      >
        <Steps steps={AGENT_LOOP} />
      </Section>

      <Section
        tone="muted"
        eyebrow="Platform"
        title="Everything an enterprise needs to run agents safely"
        description="One governed platform for orchestration, knowledge, integrations, approvals and audit."
      >
        <FeatureGrid features={PLATFORM_FEATURES.slice(0, 6)} />
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/platform">
              See the full platform <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Security & trust</Eyebrow>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Built for the security review, not around it
            </h2>
            <p className="text-muted-foreground mt-4 text-lg text-pretty">
              Law firms, banks and health systems have the strictest requirements there are. We
              start from them.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/security">
                Security & compliance <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <h3 className="font-semibold">Our commitments</h3>
            <CheckList items={COMMITMENTS} className="mt-4" />
          </div>
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="How we work"
        title="One partner from idea to operation"
        description="A structured path that proves value early and scales with confidence."
      >
        <ol className="grid gap-4 md:grid-cols-5">
          {PROCESS.map(({ phase, title, description }) => (
            <li key={phase} className="border-border bg-card rounded-xl border p-5">
              <span className="text-primary text-sm font-semibold">{phase}</span>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="FAQ"
        title="Questions teams ask us first"
        description="Can't find yours? We're happy to talk it through."
      >
        <div className="max-w-3xl">
          <Faq items={GENERAL_FAQS} />
        </div>
      </Section>

      <CtaBanner secondary={{ label: "How we work", href: "/how-we-work" }} />
    </>
  );
}

import {
  ArrowRight,
  ClipboardCheck,
  Flag,
  Hammer,
  KeyRound,
  Lock,
  Plug,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AgentShowcase } from "@/components/marketing/agent-showcase";
import { CheckList, CtaBanner, Faq, SolutionCard, Steps } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { Container, Eyebrow, Section } from "@/components/marketing/primitives";
import { LogoStrip, ProofSection } from "@/components/marketing/proof";
import { Button } from "@/components/ui/button";
import { AGENT_LOOP, COMMITMENTS, GENERAL_FAQS, POC_WEEKS } from "@/content/company";
import { CASE_STUDIES, CUSTOMER_LOGOS, TESTIMONIALS } from "@/content/proof";
import { SITE } from "@/content/site";
import { SOLUTIONS } from "@/content/solutions";
import { pageMetadata } from "@/lib/seo";
import { faqLd, organizationLd } from "@/lib/structured-data";

const HOME_TITLE = `${SITE.name} — Agentic AI for law, finance, healthcare and retail`;

export const metadata: Metadata = {
  ...pageMetadata({
    title: HOME_TITLE,
    fullTitle: HOME_TITLE,
    description: SITE.description,
    path: "/",
  }),
  title: { absolute: HOME_TITLE },
};

/** One icon per proof-of-concept week, in the same order as POC_WEEKS. */
const POC_ICONS = [Plug, Hammer, ClipboardCheck, Flag];

/** Short trust points shown under the solution cards. */
const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Human approval on every decision" },
  { icon: ScrollText, label: "Full audit trail" },
  { icon: KeyRound, label: "Role-based access" },
  { icon: Lock, label: "Your data stays private" },
];

const FAQS = GENERAL_FAQS.slice(0, 5);

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd(), faqLd(FAQS)]} />

      {/* Hero */}
      <div className="border-border relative overflow-hidden border-b">
        <div className="bg-hero absolute inset-0 -z-10" aria-hidden />
        <Container className="py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <p className="border-border bg-card text-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase shadow-sm">
                <Sparkles className="text-primary size-3.5" aria-hidden />
                Enterprise agentic AI
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-5xl xl:text-6xl">
                AI agents that finish the work — with your people in control
              </h1>
              <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-pretty sm:text-xl lg:mx-0">
                We design, deploy and operate governed AI agents for Law, Finance, Healthcare and
                Retail. From first workflow to production, with approvals, audit trails and security
                built in.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/contact" data-cta="hero">
                    Book a demo
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/proof-of-concept" data-cta="hero-poc">
                    See the 4-week proof of concept <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
            <AgentShowcase />
          </div>
        </Container>
      </div>

      {/* Customer logos: hidden until real logos are added in src/content/proof.ts */}
      <LogoStrip logos={CUSTOMER_LOGOS} />

      <Section
        tone="muted"
        eyebrow="Solutions"
        title="Agents built for your industry"
        description="Each solution pairs domain-specific agents with approvals, audit trails and the controls your industry requires."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
        <ul className="text-muted-foreground mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-sm lg:flex lg:flex-wrap lg:justify-between">
          {TRUST_POINTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5">
              <Icon className="text-primary size-4 shrink-0" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="What makes it agentic"
        title="Not a chatbot. A colleague that completes tasks."
        description="Agents pursue a goal through a loop of planning, acting, checking and escalating — and every step is recorded."
      >
        <Steps steps={AGENT_LOOP} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/platform">
              See the platform <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/how-we-work">
              How we work <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Proof of concept banner */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="bg-primary text-primary-foreground grid gap-10 rounded-2xl p-8 sm:p-12 lg:grid-cols-[2fr_3fr]">
            <div>
              <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">
                Proof of concept
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                See it work on your own data in 4 weeks
              </h2>
              <p className="mt-4 text-white/85">
                One workflow, a clear go / no-go decision, and an introductory price below typical
                market rates.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["4 weeks", "1 workflow", "Go / no-go decision"].map((chip) => (
                  <li key={chip} className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
                    {chip}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="mt-8 bg-white text-neutral-900 hover:bg-white/90"
              >
                <Link href="/proof-of-concept" data-cta="poc-banner">
                  See the 4-week proof of concept <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <ol className="relative flex flex-col gap-6">
              <span className="absolute top-5 bottom-5 left-5 w-px bg-white/30" aria-hidden />
              {POC_WEEKS.map(({ title, description }, index) => {
                const Icon = POC_ICONS[index];
                return (
                  <li key={title} className="relative flex gap-4">
                    <span className="text-primary relative flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-white/80">{description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      <Section tone="dark">
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

      {/* Case studies and testimonials: hidden until real ones are added in src/content/proof.ts */}
      <ProofSection caseStudies={CASE_STUDIES} testimonials={TESTIMONIALS} />

      <Section
        tone="muted"
        eyebrow="FAQ"
        title="Questions teams ask us first"
        description="Can't find yours? We're happy to talk it through."
      >
        <div className="max-w-3xl">
          <Faq items={FAQS} />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}

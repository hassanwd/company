import { ArrowRight, ClipboardCheck, Flag, Hammer, Plug } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  AgentRunPreview,
  CheckList,
  CtaBanner,
  Faq,
  SolutionCard,
  Steps,
} from "@/components/marketing/blocks";
import { Container, Eyebrow, Section } from "@/components/marketing/primitives";
import { LogoStrip, ProofSection } from "@/components/marketing/proof";
import { Button } from "@/components/ui/button";
import { AGENT_LOOP, BEFORE_AFTER, COMMITMENTS, GENERAL_FAQS, POC_WEEKS } from "@/content/company";
import { CASE_STUDIES, CUSTOMER_LOGOS, TESTIMONIALS } from "@/content/proof";
import { SITE } from "@/content/site";
import { SOLUTIONS, solutionHref } from "@/content/solutions";
import { siteUrl } from "@/server/config/env";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Agentic AI for law, finance, healthcare and retail` },
  description: SITE.description,
  alternates: { canonical: "/" },
};

/** One icon per proof-of-concept week, in the same order as POC_WEEKS. */
const POC_ICONS = [Plug, Hammer, ClipboardCheck, Flag];

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
              Enterprise agentic AI · Law · Finance · Healthcare · Retail
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              AI agents that finish the work — with your people in control
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-pretty sm:text-xl">
              We design, deploy and operate governed agents for industries where accuracy and trust
              matter — from first workflow to production, with approvals, audit trails and security
              built in.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Book a demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/proof-of-concept">
                  See the 4-week proof of concept <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-14">
            <AgentRunPreview />
          </div>
        </Container>
      </div>

      {/* Customer logos: hidden until real logos are added in src/content/proof.ts */}
      <LogoStrip logos={CUSTOMER_LOGOS} />

      {/* What agents do */}
      <Section
        eyebrow="What agents do"
        title="The same work, with a person in control"
        description="Three examples of how an agent takes the repeatable first pass while your team keeps the decision."
      >
        <ul className="grid gap-4 lg:grid-cols-3">
          {BEFORE_AFTER.map(({ industry, slug, agent, before, after }) => (
            <li
              key={slug}
              className="border-border bg-card flex flex-col rounded-xl border p-6 shadow-sm"
            >
              <p className="text-primary text-sm font-semibold">{industry}</p>
              <p className="text-muted-foreground mt-3 text-xs font-semibold tracking-wide uppercase">
                Before
              </p>
              <p className="mt-1 text-sm">{before}</p>
              <p className="text-muted-foreground mt-4 text-xs font-semibold tracking-wide uppercase">
                With the {agent}
              </p>
              <p className="mt-1 text-sm">{after}</p>
              <Link
                href={solutionHref(slug)}
                className="text-primary focus-visible:ring-ring mt-auto inline-flex items-center gap-1 rounded pt-5 text-sm font-medium hover:underline focus-visible:ring-2 focus-visible:outline-none"
              >
                See {industry.toLowerCase()} solutions
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="muted"
        eyebrow="Solutions"
        title="Built for industries where accuracy and trust matter"
        description="Each solution pairs domain-specific agents with the controls that industry requires."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                <Link href="/proof-of-concept">
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
          <Faq items={GENERAL_FAQS.slice(0, 5)} />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}

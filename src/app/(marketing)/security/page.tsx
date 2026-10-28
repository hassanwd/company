import type { Metadata } from "next";
import { CheckList, CtaBanner, FeatureGrid } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import { COMMITMENTS, FRAMEWORKS, SECURITY_PILLARS } from "@/content/company";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Security & compliance",
  description:
    "Enterprise-grade security for agentic AI: data protection, access control, auditability, responsible AI and flexible deployment for regulated industries.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security & compliance"
        title="Security that stands up to a regulated buyer"
        description="Agents that touch contracts, ledgers and patient records need controls you can verify. Here is how we approach it."
        actions={
          <Button asChild size="lg">
            <a href={`mailto:${SITE.securityEmail}?subject=Security%20package%20request`}>
              Request our security package
            </a>
          </Button>
        }
      />

      <Section
        eyebrow="Pillars"
        title="Six areas we hold ourselves to"
        description="Controls are applied by default and are available for your review during evaluation."
      >
        <FeatureGrid features={SECURITY_PILLARS} />
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-balance">
              Our commitments to you
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Plain-language promises that are also written into our agreements.
            </p>
          </div>
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <CheckList items={COMMITMENTS} />
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Frameworks"
        title="Designed to align with the standards you answer to"
        description="We map our controls to the frameworks below. Certification and attestation status is shared under NDA — ask for the current documents."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FRAMEWORKS.map(({ name, note }) => (
            <li key={name} className="border-border bg-card rounded-xl border p-5">
              <h3 className="font-semibold">{name}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{note}</p>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-6 max-w-3xl text-sm">
          Alignment with a framework does not by itself constitute certification or compliance. Your
          obligations depend on your use case and jurisdiction; we work with your security, legal
          and compliance teams to assess them.
        </p>
      </Section>

      <Section tone="muted" eyebrow="Disclosure" title="Responsible vulnerability reporting">
        <p className="text-muted-foreground max-w-2xl">
          If you believe you have found a security issue, email{" "}
          <a
            className="text-primary font-medium hover:underline"
            href={`mailto:${SITE.securityEmail}`}
          >
            {SITE.securityEmail}
          </a>
          . We acknowledge reports promptly, investigate in good faith and will not pursue action
          against researchers who act responsibly.
        </p>
      </Section>

      <CtaBanner
        title="Bring us your security questionnaire"
        description="We'll involve the right people early so security review never becomes the bottleneck."
      />
    </>
  );
}

import { BadgeCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckList, CtaBanner, Faq, Steps } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { PageHero, Section } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import {
  DELIVERY_MODELS,
  POC_FAQS,
  POC_REQUIREMENTS,
  POC_TERMS,
  POC_WEEKS,
  PROCESS,
} from "@/content/company";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { faqLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Proof of concept",
  description:
    "Start with a 4-week proof of concept on your own data, then scale to production and optionally let us run it. Fixed fee, agreed up front.",
  path: "/proof-of-concept",
});

export default function ProofOfConceptPage() {
  return (
    <>
      <JsonLd data={faqLd(POC_FAQS)} />
      <PageHero
        eyebrow="Proof of concept"
        title="Start with a 4-week proof of concept"
        description="Every engagement begins the same way: one workflow, your own data and a clear decision at the end. After that, we show you exactly what we deliver and how."
        actions={
          <Button asChild size="lg">
            <Link href="/contact" data-cta="poc-hero">
              Book a demo
            </Link>
          </Button>
        }
      />

      <Section
        eyebrow="Proof of concept"
        title="See it work on your own data in 4 weeks"
        description="A focused proof of concept for one workflow, with a clear decision at the end."
      >
        <Steps steps={POC_WEEKS} />

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <h3 className="font-semibold">How it works</h3>
            <CheckList items={POC_TERMS} className="mt-4" />
          </div>
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <h3 className="font-semibold">What you need to provide</h3>
            <ul className="mt-4 flex flex-col gap-4">
              {POC_REQUIREMENTS.map(({ title, description }) => (
                <li key={title} className="text-sm">
                  <p className="font-medium">{title}</p>
                  <p className="text-muted-foreground mt-0.5">{description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-primary bg-card ring-primary/20 rounded-xl border p-6 shadow-sm ring-4">
            <h3 className="font-semibold">Pricing</h3>
            <p className="mt-4 flex items-center gap-2 text-lg font-semibold">
              <BadgeCheck className="text-primary size-5" aria-hidden />
              Fixed fee, agreed up front
            </p>
            {SITE.pocStartingPrice ? (
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                From {SITE.pocStartingPrice}
              </p>
            ) : null}
            <p className="text-muted-foreground mt-3 text-sm">
              Introductory pricing, below typical market rates. No obligation to continue after the
              go / no-go decision.
            </p>
            <Button asChild className="mt-6">
              <Link href="/contact" data-cta="poc-pricing">
                Book a demo
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="After the proof of concept"
        title="What we deliver, and how"
        description="If the proof of concept proves its value, this is what comes next."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {DELIVERY_MODELS.map((model) => (
            <article
              key={model.name}
              className="border-border bg-card flex flex-col rounded-xl border p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{model.name}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{model.summary}</p>
              <p className="mt-4 text-sm">
                <strong className="font-medium">Best for: </strong>
                <span className="text-muted-foreground">{model.bestFor}</span>
              </p>
              <CheckList items={model.includes} className="mt-5" />
            </article>
          ))}
        </div>

        <h3 className="mt-12 mb-4 text-lg font-semibold">How we deliver</h3>
        <Steps steps={PROCESS.slice(3)} />
      </Section>

      <Section eyebrow="FAQ" title="Proof of concept questions">
        <div className="max-w-3xl">
          <Faq items={POC_FAQS} />
        </div>
      </Section>

      <CtaBanner
        title="Book your proof of concept"
        description="Tell us about the workflow you want to prove and we'll come back with a plan, timeline and fixed fee."
        secondary={null}
      />
    </>
  );
}

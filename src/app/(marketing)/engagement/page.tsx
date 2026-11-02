import type { Metadata } from "next";
import Link from "next/link";
import { CheckList, CtaBanner, Faq, Steps } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import { DELIVERY_MODELS, GENERAL_FAQS, POC_TERMS, POC_WEEKS, PROCESS } from "@/content/company";

export const metadata: Metadata = {
  title: "Proof of concept",
  description:
    "Start with a four-week proof of concept on your own data, then scale to production and optionally let us run it. Introductory pricing, below typical market rates.",
  alternates: { canonical: "/engagement" },
};

export default function EngagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Proof of concept"
        title="Start with a four-week proof of concept"
        description="Every engagement begins the same way: one workflow, your own data and a clear decision at the end. After that, we show you exactly what we deliver and how."
        actions={
          <Button asChild size="lg">
            <Link href="/contact">Book a proof of concept</Link>
          </Button>
        }
      />

      <Section
        eyebrow="Proof of concept"
        title="See it work on your own data in four weeks"
        description="A focused proof of concept for one workflow at an introductory price, below typical market rates, with a clear decision at the end."
      >
        <Steps steps={POC_WEEKS} layout="grid" />
        <div className="border-border bg-card mt-6 rounded-xl border p-6">
          <h3 className="font-semibold">How it works</h3>
          <CheckList items={POC_TERMS} className="mt-4" />
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
        <Steps steps={PROCESS.slice(3)} layout="grid" />
      </Section>

      <Section eyebrow="FAQ" title="Commercial & delivery questions">
        <div className="max-w-3xl">
          <Faq items={GENERAL_FAQS} />
        </div>
      </Section>

      <CtaBanner
        title="Book your proof of concept"
        description="Tell us about the workflow you want to prove and we'll come back with a plan, timeline and fixed fee."
      />
    </>
  );
}

import { Mail, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { PageHero, Section } from "@/components/marketing/primitives";
import { LeadForm } from "@/features/leads/components/lead-form";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a working session with our solution architects to map your highest-value legal, financial or healthcare workflows.",
  alternates: { canonical: "/contact" },
};

const NEXT_STEPS = [
  "We review your request and match you with a solution architect.",
  "We schedule a working session focused on your workflows and systems.",
  "You get a concrete view of the agents, controls and a pilot plan.",
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { industry } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a demo"
        description="Tell us about the work you want to take off your team's plate. We'll come prepared."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm sm:p-8">
            <LeadForm defaultIndustry={typeof industry === "string" ? industry : undefined} />
          </div>

          <aside className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold">What happens next</h2>
              <ol className="mt-4 flex flex-col gap-3">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm">
                    <span className="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="text-sm">
              <h2 className="text-lg font-semibold">Prefer email?</h2>
              <p className="text-muted-foreground mt-2 flex items-center gap-2">
                <Mail className="size-4" aria-hidden />
                <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
                  {SITE.email}
                </a>
              </p>
            </div>
            <div className="border-border bg-muted/50 flex gap-3 rounded-xl border p-4 text-sm">
              <ShieldCheck className="text-success mt-0.5 size-5 shrink-0" aria-hidden />
              <p className="text-muted-foreground">
                Please don&apos;t include confidential client, patient or customer data in this
                form. We&apos;ll arrange a secure channel when needed.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

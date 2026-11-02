import Image from "next/image";
import type { CaseStudy, CustomerLogo, Testimonial } from "@/content/proof";
import { SOLUTIONS } from "@/content/solutions";
import { Container, Section } from "./primitives";

/** Row of customer logos. Renders nothing until there is at least one real logo. */
export function LogoStrip({ logos }: { logos: CustomerLogo[] }) {
  if (logos.length === 0) return null;
  return (
    <Container className="py-10">
      <p className="text-muted-foreground text-center text-sm font-medium">Trusted by teams at</p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map(({ name, src, width, height }) => (
          <li key={name}>
            <Image
              src={src}
              alt={name}
              width={width}
              height={height}
              className="h-8 w-auto opacity-70 grayscale"
            />
          </li>
        ))}
      </ul>
    </Container>
  );
}

/** Problem -> what the agent did -> measurable result. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const industry = SOLUTIONS.find((solution) => solution.slug === study.industry)?.name;
  return (
    <article className="border-border bg-card flex flex-col rounded-xl border p-6 shadow-sm">
      <p className="text-primary text-sm font-semibold">
        {study.customer}
        {industry ? ` · ${industry}` : ""}
      </p>
      <dl className="mt-4 flex flex-col gap-4 text-sm">
        <div>
          <dt className="font-medium">The problem</dt>
          <dd className="text-muted-foreground mt-1">{study.problem}</dd>
        </div>
        <div>
          <dt className="font-medium">What the agent did</dt>
          <dd className="text-muted-foreground mt-1">{study.agentDid}</dd>
        </div>
      </dl>
      <ul className="border-border mt-auto grid grid-cols-2 gap-4 border-t pt-5">
        {study.results.map(({ value, label }) => (
          <li key={label}>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            <p className="text-muted-foreground text-xs">{label}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="border-border bg-card rounded-xl border p-6 shadow-sm">
      <blockquote className="text-pretty">“{testimonial.quote}”</blockquote>
      <figcaption className="text-muted-foreground mt-4 text-sm">
        <span className="text-foreground font-medium">{testimonial.author}</span>,{" "}
        {testimonial.role}, {testimonial.company}
      </figcaption>
    </figure>
  );
}

/** Case studies and testimonials. The whole section is hidden while both lists are empty. */
export function ProofSection({
  caseStudies,
  testimonials,
}: {
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
}) {
  if (caseStudies.length === 0 && testimonials.length === 0) return null;
  return (
    <Section
      tone="muted"
      eyebrow="Results"
      title="What changed for our customers"
      description="Real workflows, real numbers."
    >
      {caseStudies.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.customer} study={study} />
          ))}
        </div>
      ) : null}
      {testimonials.length > 0 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}

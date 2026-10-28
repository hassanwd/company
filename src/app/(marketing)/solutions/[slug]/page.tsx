import { ArrowRight, UserCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckList, CtaBanner, Faq, Steps } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import { getSolution, SOLUTIONS } from "@/content/solutions";

export function generateStaticParams() {
  return SOLUTIONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  return {
    title: `${solution.name} solutions`,
    description: `${solution.headline}. ${solution.summary}`,
    alternates: { canonical: `/solutions/${solution.slug}` },
  };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();

  const { icon: Icon } = solution;

  return (
    <>
      <PageHero
        eyebrow={`${solution.name} solutions`}
        title={solution.headline}
        description={solution.summary}
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/contact">Book a {solution.name.toLowerCase()} demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/security">Security & compliance</Link>
            </Button>
          </>
        }
      />

      <Section
        eyebrow="The challenge"
        title={`What ${solution.name.toLowerCase()} teams are up against`}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {solution.challenges.map(({ title, description }) => (
            <div key={title} className="border-border bg-card rounded-xl border p-6">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="Agents"
        title={`The ${solution.name.toLowerCase()} agent suite`}
        description="Each agent has a defined job, scoped permissions and a clear point where a person stays in control."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {solution.agents.map((agent) => (
            <article
              key={agent.name}
              className="border-border bg-card flex flex-col rounded-xl border p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h3 className="font-semibold">{agent.name}</h3>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">{agent.description}</p>
              <p className="border-border mt-auto flex gap-2 border-t pt-4 text-sm">
                <UserCheck className="text-success mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  <strong className="font-medium">Human checkpoint: </strong>
                  <span className="text-muted-foreground">{agent.checkpoint}</span>
                </span>
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Workflow"
        title={solution.workflow.title}
        description={solution.workflow.scenario}
      >
        <Steps steps={solution.workflow.steps} />
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Governance & compliance</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Controls designed for {solution.name.toLowerCase()} requirements.
            </p>
            <dl className="mt-6 flex flex-col gap-5">
              {solution.governance.map(({ title, description }) => (
                <div key={title}>
                  <dt className="font-medium">{title}</dt>
                  <dd className="text-muted-foreground mt-1 text-sm">{description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-6">
            <div className="border-border bg-card rounded-xl border p-6">
              <h2 className="text-lg font-semibold">Connects to your systems</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {solution.integrations.map((item) => (
                  <li key={item} className="bg-muted rounded-full px-3 py-1 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-border bg-card rounded-xl border p-6">
              <h2 className="text-lg font-semibold">What changes for your team</h2>
              <CheckList items={solution.outcomes} className="mt-4" />
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="FAQ" title={`${solution.name} questions`}>
        <div className="max-w-3xl">
          <Faq items={solution.faqs} />
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/how-we-work">
              How a project works <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>

      <CtaBanner
        title={`Ready to see ${solution.name.toLowerCase()} agents on your own workflows?`}
        secondary={{ label: "View all solutions", href: "/solutions" }}
      />
    </>
  );
}

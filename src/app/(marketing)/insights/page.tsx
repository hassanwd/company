import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { CtaBanner } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { Button } from "@/components/ui/button";
import { ARTICLES, hasInsights } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Insights",
    description: "Practical writing on deploying governed AI agents in high-stakes industries.",
    path: "/insights",
  }),
  // Keep the empty placeholder out of search results until there is something to read.
  ...(hasInsights ? {} : { robots: { index: false, follow: true } }),
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from the field"
        description="Practical writing on deploying governed AI agents in industries where accuracy and trust matter."
      />
      <Section>
        {hasInsights ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {ARTICLES.map(({ slug, title, description, date }) => (
              <li key={slug}>
                <Link
                  href={`/insights/${slug}` as Route}
                  className="border-border bg-card focus-visible:ring-ring block h-full rounded-xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
                >
                  <time dateTime={date} className="text-muted-foreground text-xs">
                    {formatDate(date)}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold">{title}</h2>
                  <p className="text-muted-foreground mt-2 text-sm">{description}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-border bg-card max-w-2xl rounded-xl border p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Our first articles are on the way</h2>
            <p className="text-muted-foreground mt-2">
              We&apos;re writing up what we learn from real deployments. In the meantime, the
              fastest way to see how agents could work for your team is a working session.
            </p>
            <Button asChild className="mt-6">
              <Link href="/contact">
                Book a demo <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        )}
      </Section>
      <CtaBanner />
    </>
  );
}

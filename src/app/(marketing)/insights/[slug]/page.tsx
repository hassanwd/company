import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { PageHero, Section } from "@/components/marketing/primitives";
import { ARTICLES, getArticle } from "@/content/insights";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            author: { "@type": "Organization", name: SITE.name },
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: article.title, path: `/insights/${article.slug}` },
          ]),
        ]}
      />
      <PageHero eyebrow="Insights" title={article.title} description={article.description} />
      <Section>
        <div className="text-muted-foreground max-w-prose space-y-4 text-lg leading-8">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}

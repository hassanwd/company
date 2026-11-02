import { SITE } from "@/content/site";
import type { Faq, Solution } from "@/content/solutions";
import { siteUrl } from "@/server/config/env";

const abs = (path: string) => `${siteUrl}${path}`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: siteUrl,
    // The generated brand mark; replace with a real logo URL when you have one.
    logo: abs("/icon"),
    description: SITE.description,
    email: SITE.email,
    // TODO: replace the placeholder address in src/content/site.ts before launch.
    address: { "@type": "PostalAddress", streetAddress: SITE.address },
    ...(SITE.sameAs.length > 0 ? { sameAs: SITE.sameAs } : {}),
  };
}

export function faqLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: abs(path),
    })),
  };
}

export function serviceLd(solution: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${solution.name} agentic AI solutions`,
    serviceType: "Agentic AI",
    description: `${solution.headline}. ${solution.summary}`,
    url: abs(`/solutions/${solution.slug}`),
    provider: { "@type": "Organization", name: SITE.name, url: siteUrl },
  };
}

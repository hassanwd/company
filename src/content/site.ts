import type { Route } from "next";

/**
 * Single place to rebrand the website. Every value marked TODO is a placeholder that must be
 * replaced before launch — do not invent real-looking values.
 */
export const SITE = {
  // TODO: company name
  name: "Company",
  // TODO: legal entity name
  legalName: "Company, Inc.",
  tagline:
    "Agentic AI for law, finance, healthcare and retail — built for the enterprise, end to end.",
  description:
    "We design, deploy and operate governed AI agents that complete real work in law, finance, healthcare and retail — with human approval, full audit trails and enterprise-grade security.",
  // TODO: sales email
  email: "hello@example.com",
  // TODO: security email
  securityEmail: "security@example.com",
  // TODO: office address
  address: "Your Street, Your City, Your Country",
  // TODO: brand primary colour. Keep in sync with --primary in src/app/globals.css.
  brandColor: "#4f46e5",
  // TODO: booking link (Calendly / HubSpot / Cal.com). Leave empty to hide "Book directly".
  bookingUrl: "" as string,
  // TODO: starting price for the 4-week proof of concept, e.g. "$20,000". Leave empty to hide.
  pocStartingPrice: "" as string,
  // TODO: social profile URLs (LinkedIn, X, GitHub) used for structured data.
  sameAs: [] as string[],
} as const;

export type NavLink = { label: string; href: Route; description?: string };

/** Header: "Platform" dropdown. */
export const PLATFORM_NAV: NavLink[] = [
  {
    label: "Platform",
    href: "/platform",
    description: "Orchestration, knowledge, approvals and audit.",
  },
  {
    label: "Cloud & Infra",
    href: "/cloud-infra" as Route,
    description: "Deploy in our cloud, yours or a restricted environment.",
  },
  {
    label: "Security",
    href: "/security",
    description: "Controls, audit trails and compliance alignment.",
  },
];

/** Header: "Company" dropdown. */
export const COMPANY_NAV: NavLink[] = [
  { label: "About", href: "/about", description: "Our mission and principles." },
  { label: "How we work", href: "/how-we-work", description: "From idea to operation." },
];

/** Header: single link, shown between the dropdowns and the call to action. */
export const POC_NAV: NavLink = {
  label: "Proof of concept",
  href: "/proof-of-concept" as Route,
};

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Law", href: "/solutions/law" as Route },
      { label: "Finance", href: "/solutions/finance" as Route },
      { label: "Healthcare", href: "/solutions/healthcare" as Route },
      { label: "Retail", href: "/solutions/retail" as Route },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How we work", href: "/how-we-work" },
      POC_NAV,
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Cloud & Infra", href: "/cloud-infra" as Route },
      { label: "Security & compliance", href: "/security" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

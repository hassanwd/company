import type { Route } from "next";

/**
 * Single place to rebrand the website. TODO before launch: replace the placeholder company
 * name, contact details and legal entity.
 */
export const SITE = {
  name: "Company",
  legalName: "Company, Inc.",
  tagline:
    "Agentic AI for law, finance, healthcare and retail — built for the enterprise, end to end.",
  description:
    "We design, deploy and operate governed AI agents that complete real work in law, finance, healthcare and retail — with human approval, full audit trails and enterprise-grade security.",
  email: "hello@example.com",
  securityEmail: "security@example.com",
  address: "Your Street, Your City, Your Country",
} as const;

export type NavLink = { label: string; href: Route };

export const MAIN_NAV: NavLink[] = [
  { label: "Proof of concept", href: "/engagement" },
  { label: "Platform", href: "/platform" },
  { label: "Cloud & Infra", href: "/cloud-infra" as Route },
  { label: "Security", href: "/security" },
  { label: "How we work", href: "/how-we-work" },
  { label: "About", href: "/about" },
];

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
      { label: "Proof of concept", href: "/engagement" },
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

import type { Solution } from "./solutions";

/**
 * Social proof. Every array below is intentionally empty: do not invent customers, quotes or
 * numbers. The components that render these hide themselves while an array is empty, so adding
 * a real entry is all that is needed to make its section appear.
 */

export type CustomerLogo = {
  name: string;
  /** Path under /public, e.g. "/logos/acme.svg". */
  src: string;
  width: number;
  height: number;
  href?: string;
};

export type CaseStudy = {
  customer: string;
  industry: Solution["slug"];
  /** The problem the customer had. */
  problem: string;
  /** What the agent did about it. */
  agentDid: string;
  /** Measurable results, e.g. { value: "62%", label: "less time on first-pass review" }. */
  results: { value: string; label: string }[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

// TODO: add real data (only with the customer's permission)
export const CUSTOMER_LOGOS: CustomerLogo[] = [];

// TODO: add real data
export const CASE_STUDIES: CaseStudy[] = [];

// TODO: add real data
export const TESTIMONIALS: Testimonial[] = [];

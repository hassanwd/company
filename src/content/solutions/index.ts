import type { Route } from "next";
import { financeSolution } from "./finance";
import { healthcareSolution } from "./healthcare";
import { lawSolution } from "./law";
import { retailSolution } from "./retail";
import type { Solution } from "./types";

export type { Agent, Challenge, ChallengeLink, Faq, HandledItem, Solution } from "./types";

/** Id for an agent card, e.g. "Close & Reconciliation Agent" -> "close-reconciliation-agent". */
export const agentAnchor = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Id of the governance & compliance section, a valid challenge link target. */
export const GOVERNANCE_ANCHOR = "governance";

export const solutionHref = (slug: Solution["slug"]) => `/solutions/${slug}` as Route;

/** One data file per industry. The order here is the order shown on the site. */
export const SOLUTIONS: Solution[] = [
  lawSolution,
  financeSolution,
  healthcareSolution,
  retailSolution,
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

import type { LucideIcon } from "lucide-react";

export type Faq = { question: string; answer: string };

export type Agent = {
  name: string;
  icon: LucideIcon;
  description: string;
  /** Where a human stays in control. */
  checkpoint: string;
};

/**
 * A challenge card's pointer to the part of the page that answers it.
 * `target` is an element id on the same page: an agent's `agentAnchor(name)`, or "governance".
 */
export type ChallengeLink = { label: string; target: string };

export type Challenge = { title: string; description: string; link?: ChallengeLink };

/** One small icon card in a solution's "what it handles" grid. */
export type HandledItem = { icon: LucideIcon; title: string; description: string };

export type Solution = {
  slug: "law" | "finance" | "healthcare" | "retail";
  name: string;
  icon: LucideIcon;
  /** Industry accent color (hex), used for the card's top edge and icon. */
  accent: string;
  headline: string;
  /** Short description shown on the solution card. */
  tagline: string;
  summary: string;
  /** Who it is for, shown under the hero summary. */
  audience: string;
  challenges: Challenge[];
  agents: Agent[];
  workflow: { title: string; scenario: string; steps: { title: string; description: string }[] };
  /** Grid of the kinds of work the agents handle, shown after the workflow. */
  handles: { eyebrow: string; title: string; description: string; items: HandledItem[] };
  integrations: string[];
  /** Sub-heading for the governance section. */
  governanceNote: string;
  governance: { title: string; description: string }[];
  outcomes: string[];
  faqs: Faq[];
};

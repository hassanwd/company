import { NDA_PLAYBOOK } from "@/features/nda-review/playbook";
import type { PlaybookClause, Position } from "@/features/nda-review/types";

/** Agent output for one playbook clause, before ids and decisions are attached. */
export type ClauseResult = {
  clauseId: string;
  position: Position;
  issue: string;
  originalText: string | null;
  suggestedText: string | null;
  reasoning: string;
};

type Check = {
  /** Finds the paragraph that holds this clause. */
  locate: RegExp;
  /** Classifies the clause. `paragraph` is null when nothing matched `locate`. */
  assess: (paragraph: string | null, fullText: string) => { position: Position; issue: string };
};

const WORD_NUMBERS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  twelve: 12,
  eighteen: 18,
  twenty: 20,
  "twenty-four": 24,
  thirty: 30,
  "thirty-six": 36,
};

/** Reads "five (5) years", "5 years" or "five years" and returns the number before `unit`. */
function readNumber(text: string, unit: "years?" | "months?"): number | null {
  const match = text.match(new RegExp(`(\\d+|[a-z-]+)\\s*(?:\\((\\d+)\\))?\\s*${unit}\\b`, "i"));
  if (!match) return null;
  if (match[2]) return Number(match[2]);
  const raw = match[1]!.toLowerCase();
  return /^\d+$/.test(raw) ? Number(raw) : (WORD_NUMBERS[raw] ?? null);
}

const PREFERRED_LAW = ["New York", "Delaware"];

const CHECKS: Record<string, Check> = {
  mutuality: {
    locate: /\bmutual\b|each party may disclose|one-way|disclosing party|recipient/i,
    assess: (_p, full) =>
      /\bmutual\b|each party may disclose|each party is bound/i.test(full)
        ? { position: "preferred", issue: "Mutual obligations on both parties." }
        : {
            position: "acceptable",
            issue: "One-way NDA. Confirm our client only discloses or only receives in this deal.",
          },
  },
  definition: {
    locate: /"?confidential information"?\s+(means|shall mean|includes)/i,
    assess: (p) => {
      if (!p) return { position: "missing", issue: "No definition of Confidential Information." };
      if (/whether or not (marked|designated|identified)|any and all information/i.test(p))
        return {
          position: "unacceptable",
          issue: "Covers all information, whether or not marked as confidential.",
        };
      if (/marked|designated|reasonabl[ey]/i.test(p))
        return {
          position: "preferred",
          issue: "Limited to marked or reasonably confidential information.",
        };
      return { position: "acceptable", issue: "Definition is broad and not tied to marking." };
    },
  },
  exclusions: {
    locate: /does not include|shall not include|exclusions|obligations (shall|will) not apply/i,
    assess: (p) => {
      if (!p) return { position: "missing", issue: "No standard exclusions." };
      const found = [
        /public(ly)? (domain|available)/i,
        /already known|known to the receiving party|prior to (its )?disclosure|before disclosure/i,
        /independently developed/i,
        /third party/i,
      ].filter((r) => r.test(p)).length;
      if (found === 4)
        return { position: "preferred", issue: "All four standard exclusions present." };
      if (found === 3)
        return { position: "acceptable", issue: "One standard exclusion is missing." };
      return { position: "unacceptable", issue: `Only ${found} of 4 standard exclusions present.` };
    },
  },
  term: {
    locate: /period of|continue for|surviv|perpetu|indefinite|years? (from|after|following)/i,
    assess: (p) => {
      if (!p) return { position: "missing", issue: "No duration for the obligations." };
      if (/perpetu|indefinite|in perpetuity/i.test(p))
        return { position: "unacceptable", issue: "Obligations last forever for all information." };
      const years = readNumber(p, "years?");
      if (years === null) return { position: "acceptable", issue: "Duration is unclear." };
      if (years <= 3) return { position: "preferred", issue: `Obligations last ${years} years.` };
      if (years <= 5)
        return {
          position: "acceptable",
          issue: `Obligations last ${years} years (playbook prefers 3).`,
        };
      return { position: "unacceptable", issue: `Obligations last ${years} years (maximum is 5).` };
    },
  },
  "permitted-use": {
    locate: /\bpurpose\b|use confidential information/i,
    assess: (p) => {
      if (!p) return { position: "missing", issue: "No limit on how information may be used." };
      return /(solely|only) for/i.test(p)
        ? { position: "preferred", issue: "Use limited to the defined purpose." }
        : { position: "acceptable", issue: "Use is not limited to a defined purpose." };
    },
  },
  return: {
    locate: /return or destroy|destruction|return of (confidential )?information/i,
    assess: (p) => {
      if (!p)
        return { position: "missing", issue: "No obligation to return or destroy information." };
      return /required by law|legal hold|backup|archiv|retain (one )?cop/i.test(p)
        ? { position: "preferred", issue: "Return or destroy, with a retention exception." }
        : { position: "acceptable", issue: "No exception for legal retention or backups." };
    },
  },
  residuals: {
    locate: /residual/i,
    assess: (p) =>
      p
        ? {
            position: "unacceptable",
            issue: "Residuals clause lets the other side use anything its people remember.",
          }
        : { position: "preferred", issue: "No residuals clause." },
  },
  "non-solicit": {
    locate: /solicit|\bhire\b|employ(ee|ment) of the other/i,
    assess: (p) => {
      if (!p) return { position: "preferred", issue: "No non-solicitation clause." };
      const months = readNumber(p, "months?") ?? (readNumber(p, "years?") ?? 99) * 12;
      const carveOut =
        /general solicitation|advertis|not (specifically )?(directed|targeted)/i.test(p);
      return months <= 12 && carveOut
        ? {
            position: "acceptable",
            issue: `Non-solicitation for ${months} months with a carve-out.`,
          }
        : { position: "unacceptable", issue: "Broad or long non-solicitation clause." };
    },
  },
  "governing-law": {
    locate: /governed by|governing law/i,
    assess: (p) => {
      if (!p) return { position: "missing", issue: "No governing law." };
      const state = p.match(/laws of the (?:[Ss]tate of )?([A-Z][a-z]+(?: [A-Z][a-z]+)?)/)?.[1];
      if (!state) return { position: "acceptable", issue: "Governing law is unclear." };
      return PREFERRED_LAW.includes(state)
        ? { position: "preferred", issue: `${state} law.` }
        : {
            position: "acceptable",
            issue: `${state} law. Playbook prefers ${PREFERRED_LAW.join(" or ")}.`,
          };
    },
  },
  remedies: {
    locate: /injunct|equitable relief|liquidated damages|penalt/i,
    assess: (p) => {
      if (!p) return { position: "acceptable", issue: "Silent on remedies." };
      if (/liquidated damages|penalt/i.test(p))
        return { position: "unacceptable", issue: "Liquidated damages or penalties for breach." };
      return { position: "preferred", issue: "Right to seek injunctive relief." };
    },
  },
  assignment: {
    locate: /\bassign/i,
    assess: (p) => {
      if (!p) return { position: "acceptable", issue: "Silent on assignment." };
      if (/(may not|shall not|cannot) assign|without (the )?prior written consent/i.test(p))
        return { position: "preferred", issue: "No assignment without consent." };
      if (/affiliate|merger|acquisition/i.test(p))
        return {
          position: "acceptable",
          issue: "Assignment allowed to affiliates or in a merger.",
        };
      return { position: "unacceptable", issue: "Either party may assign freely." };
    },
  },
  liability: {
    locate: /liabilit|indemnif/i,
    assess: (p) => {
      if (!p) return { position: "acceptable", issue: "Silent on liability." };
      if (
        /unlimited|without limit|indemnif\w*[^.]*\b(any and all|all) (losses|damages|claims)/i.test(
          p,
        )
      )
        return {
          position: "unacceptable",
          issue: "Unlimited liability and an indemnity for any and all losses.",
        };
      if (/consequential|indirect/i.test(p))
        return { position: "preferred", issue: "Indirect and consequential damages excluded." };
      return { position: "acceptable", issue: "Liability terms differ from the playbook." };
    },
  },
};

function reasoningFor(clause: PlaybookClause, position: Position): string {
  switch (position) {
    case "preferred":
      return `Matches the firm's preferred position: ${clause.preferred}`;
    case "acceptable":
      return `Within the firm's fallback (${clause.fallback}), but the preferred position is: ${clause.preferred} ${clause.whyItMatters}`;
    case "unacceptable":
      return `The playbook marks this as unacceptable (${clause.unacceptable}). ${clause.whyItMatters} The redline restores the preferred position.`;
    case "missing":
      return `The clause is missing. ${clause.whyItMatters} The redline adds the firm's standard language.`;
  }
}

/**
 * Deterministic, rule-based review used in demo mode (no LLM needed). It locates each playbook
 * clause by pattern, classifies it and proposes the playbook's language for any deviation.
 */
export function analyzeWithRules(paragraphs: string[], fullText: string): ClauseResult[] {
  return NDA_PLAYBOOK.map((clause) => {
    const check = CHECKS[clause.id];
    if (!check) throw new Error(`No rule check for playbook clause "${clause.id}"`);
    const paragraph = paragraphs.find((p) => check.locate.test(p)) ?? null;
    const { position, issue } = check.assess(paragraph, fullText);
    // For document-level checks (e.g. mutuality) a matched preamble is still shown as the source.
    return {
      clauseId: clause.id,
      position,
      issue,
      originalText: paragraph,
      suggestedText: position === "preferred" ? null : clause.suggestedLanguage,
      reasoning: reasoningFor(clause, position),
    };
  });
}

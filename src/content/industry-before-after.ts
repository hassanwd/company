/**
 * Concrete before / after examples, one per industry. Moved off the home page; reuse these on
 * the industry pages.
 */
export type IndustryBeforeAfter = {
  industry: string;
  /** The agent that takes the repeatable first pass. */
  agent: string;
  before: string;
  after: string;
};

export const INDUSTRY_BEFORE_AFTER = {
  law: {
    industry: "Law",
    agent: "Contract Review Agent",
    before: "A lawyer reads every inbound NDA line by line and checks it against the playbook.",
    after:
      "The agent extracts key terms, flags deviations and drafts redlines. The attorney reviews and approves.",
  },
  finance: {
    industry: "Finance",
    agent: "Accounts Payable Agent",
    before: "The team matches invoices to purchase orders by hand and chases exceptions by email.",
    after:
      "The agent matches and validates each invoice, then routes mismatches to approvers within their limits.",
  },
  healthcare: {
    industry: "Healthcare",
    agent: "Prior Authorization Agent",
    before: "Staff compile clinical documents for every authorization request and track each one.",
    after:
      "The agent assembles the request to the payer's criteria. Clinical staff review before it is sent.",
  },
  retail: {
    industry: "Retail",
    agent: "Inventory Replenishment Agent",
    before: "Planners pull sales reports and adjust stock orders by hand.",
    after:
      "The agent forecasts demand and drafts replenishment orders. Buyers approve before anything is placed.",
  },
} satisfies Record<"law" | "finance" | "healthcare" | "retail", IndustryBeforeAfter>;

import { FileText, HeartPulse, Landmark, ShoppingBag, type LucideIcon } from "lucide-react";

/** One finished step in a sample agent run. */
export type AgentRunStep = {
  title: string;
  detail: string;
  /** Part of `detail` to show in amber, to draw the eye to what needs attention. Must appear in `detail` word for word. */
  highlight?: string;
};

/** A sample agent run shown in the home page hero card. One entry per industry tab. */
export type AgentRun = {
  industry: string;
  icon: LucideIcon;
  agent: string;
  /** What the agent worked on, e.g. "Inbound NDA · Acme Supplies". */
  subject: string;
  steps: AgentRunStep[];
  /** The human approval the run is waiting on. */
  approval: string;
  action: string;
};

export const AGENT_RUNS: AgentRun[] = [
  {
    industry: "Law",
    icon: FileText,
    agent: "Contract Review Agent",
    subject: "Inbound NDA · Acme Supplies",
    steps: [
      { title: "Read the NDA", detail: "4 pages, 6 key terms extracted" },
      {
        title: "Compared against your playbook",
        detail: "3 deviations found, 1 critical",
        highlight: "1 critical",
      },
      { title: "Drafted redlines", detail: "Each change comes with its reasoning" },
    ],
    approval: "Waiting for attorney approval",
    action: "Review redlines",
  },
  {
    industry: "Finance",
    icon: Landmark,
    agent: "KYC Review Agent",
    subject: "New account · Northwind Traders",
    steps: [
      { title: "Verified ID documents", detail: "2 directors, all documents valid" },
      {
        title: "Screened against sanctions lists",
        detail: "No matches, 1 adverse media hit",
        highlight: "1 adverse media hit",
      },
      { title: "Prepared risk summary", detail: "Risk rating with evidence" },
    ],
    approval: "Waiting for compliance officer approval",
    action: "Review case",
  },
  {
    industry: "Healthcare",
    icon: HeartPulse,
    agent: "Prior Authorization Agent",
    subject: "MRI request · Patient #4821",
    steps: [
      { title: "Read patient chart", detail: "Diagnosis and history extracted" },
      { title: "Matched payer criteria", detail: "4 of 4 criteria met" },
      { title: "Drafted authorization request", detail: "Evidence attached to each criterion" },
    ],
    approval: "Waiting for clinician sign-off",
    action: "Review request",
  },
  {
    industry: "Retail",
    icon: ShoppingBag,
    agent: "Refund & Returns Agent",
    subject: "Return request · Order #10482",
    steps: [
      { title: "Checked order history", detail: "Delivered 6 days ago" },
      { title: "Applied return policy", detail: "Eligible, within 30 days" },
      { title: "Prepared refund of $240", detail: "Reason and policy cited" },
    ],
    approval: "Waiting for manager approval",
    action: "Approve refund",
  },
];

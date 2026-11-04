import {
  BadgeCheck,
  BellRing,
  Calculator,
  ChartLine,
  FileBarChart,
  Landmark,
  ReceiptText,
} from "lucide-react";
import type { Solution } from "./types";

export const financeSolution: Solution = {
  slug: "finance",
  name: "Finance",
  icon: Landmark,
  accent: "#059669",
  headline: "Agents that close the books, clear the queue and keep you audit-ready",
  tagline: "Onboarding, monitoring, payables and reporting — with controls built in.",
  summary:
    "Finance and risk teams run on high-volume, rule-heavy workflows where errors are expensive and every action must be explainable. Our agents execute the routine steps, document the reasoning, and escalate the exceptions to your people.",
  audience: "Built for banks, fintechs and finance teams.",
  challenges: [
    {
      title: "Alert fatigue and backlogs",
      description:
        "Analysts spend their day clearing false positives instead of investigating real risk.",
      link: {
        label: "See the Transaction Alert Triage Agent",
        target: "transaction-alert-triage-agent",
      },
    },
    {
      title: "Manual reconciliation and close",
      description:
        "Spreadsheets, email chasing and cross-system matching stretch every period-end.",
      link: {
        label: "See the Close & Reconciliation Agent",
        target: "close-reconciliation-agent",
      },
    },
    {
      title: "Audit and regulatory pressure",
      description:
        "Evidence has to be assembled after the fact, and decisions have to be explainable on demand.",
      link: {
        label: "See the Audit & Regulatory Reporting Agent",
        target: "audit-regulatory-reporting-agent",
      },
    },
    {
      title: "Strict control requirements",
      description:
        "Segregation of duties, approval limits and model-risk expectations constrain what automation may do.",
      link: { label: "See governance & compliance", target: "governance" },
    },
  ],
  agents: [
    {
      name: "KYC & Onboarding Agent",
      icon: BadgeCheck,
      description:
        "Collects and validates customer documents, screens against watchlists through your providers, and assembles a complete case file.",
      checkpoint: "Compliance officers approve every high-risk or ambiguous case.",
    },
    {
      name: "Transaction Alert Triage Agent",
      icon: BellRing,
      description:
        "Enriches alerts with context, scores likely false positives, and drafts an investigation narrative for the analyst.",
      checkpoint: "Analysts decide; the agent never closes a suspicious-activity alert on its own.",
    },
    {
      name: "Accounts Payable Agent",
      icon: ReceiptText,
      description:
        "Captures invoices, performs two- and three-way matching, codes spend, and routes exceptions for approval.",
      checkpoint: "Payments above set limits, and all mismatches, require human approval.",
    },
    {
      name: "Close & Reconciliation Agent",
      icon: Calculator,
      description:
        "Matches transactions across ledgers and bank feeds, proposes adjusting entries and chases missing support.",
      checkpoint: "Controllers review and post entries within existing approval workflows.",
    },
    {
      name: "Credit Analysis Support Agent",
      icon: ChartLine,
      description:
        "Spreads financials, summarizes risk factors against policy and prepares a memo with the evidence cited.",
      checkpoint:
        "Credit decisions stay with authorized underwriters; the agent supports, never decides.",
    },
    {
      name: "Audit & Regulatory Reporting Agent",
      icon: FileBarChart,
      description:
        "Gathers control evidence continuously, drafts regulatory submissions and answers auditor requests with traceable sources.",
      checkpoint: "Finance leaders review and attest before anything is filed or shared.",
    },
  ],
  workflow: {
    title: "From new account to approved onboarding",
    scenario:
      "Illustrative workflow using KYC onboarding. The same pattern applies to the other finance work below.",
    steps: [
      {
        title: "Intake",
        description:
          "A new business account application arrives and the submitted documents are classified.",
      },
      {
        title: "Verify",
        description:
          "IDs, company records and beneficial owners are read and checked for validity.",
      },
      {
        title: "Screen",
        description:
          "Parties are screened against sanctions, PEP and adverse media sources through your providers.",
      },
      {
        title: "Assess",
        description:
          "The agent scores risk against your policy and drafts a summary with the evidence cited.",
      },
      {
        title: "Compliance review",
        description:
          "An officer sees the case file and reasoning, then approves, escalates or declines.",
      },
      {
        title: "Onboard & record",
        description:
          "The approved account is set up in your core system and the decision trail is saved.",
      },
    ],
  },
  handles: {
    eyebrow: "What it handles",
    title: "Across the finance work you do",
    description:
      "The same pattern applies across finance workflows, each within its own policies and approval limits.",
    items: [
      {
        icon: BadgeCheck,
        title: "KYC & customer onboarding",
        description:
          "Documents verified and screened, with a complete case file ready for compliance review.",
      },
      {
        icon: BellRing,
        title: "AML & transaction alerts",
        description:
          "Alerts enriched with context and ranked, with an investigation draft for the analyst.",
      },
      {
        icon: ReceiptText,
        title: "Invoice & purchase order matching",
        description:
          "Two- and three-way matches run, with mismatches and duplicates routed to approvers.",
      },
      {
        icon: Calculator,
        title: "Account reconciliations",
        description:
          "Ledger and bank entries matched, with unmatched items and adjustments proposed.",
      },
      {
        icon: ChartLine,
        title: "Loan & credit document review",
        description: "Financials spread and covenants checked against policy for the underwriter.",
      },
      {
        icon: FileBarChart,
        title: "Regulatory & management reporting",
        description:
          "Source data gathered and drafts prepared, with every figure traced to its source.",
      },
    ],
  },
  integrations: [
    "ERP & general ledger",
    "Core banking systems",
    "Payment & treasury platforms",
    "Data warehouses",
    "KYC & screening providers",
    "Document & email intake",
    "Case management",
    "BI & reporting tools",
  ],
  governanceNote: "Controls designed for finance and risk teams.",
  governance: [
    {
      title: "Segregation of duties",
      description: "Agents inherit least-privilege roles and cannot approve their own work.",
    },
    {
      title: "Approval limits & guardrails",
      description: "Policy-as-code enforces thresholds, scopes and allowed actions.",
    },
    {
      title: "Model risk management",
      description:
        "Documented behavior, versioning, testing and monitoring that support your MRM framework.",
    },
    {
      title: "Explainable decisions",
      description: "Each outcome carries the inputs, rules and evidence that produced it.",
    },
    {
      title: "Immutable audit trail",
      description:
        "Tamper-evident logs support internal audit, external audit and regulator requests.",
    },
  ],
  outcomes: [
    "Shorter close and faster turnaround on routine queues",
    "Analysts focused on genuine risk rather than noise",
    "Continuous, evidence-backed audit readiness",
    "Controls that are enforced by design instead of by reminder",
  ],
  faqs: [
    {
      question: "Can agents move money or post entries?",
      answer:
        "Only within the permissions and approval limits you configure. By default, anything that moves funds or changes the ledger goes through a human approval step.",
    },
    {
      question: "How do you support model risk management?",
      answer:
        "We provide documentation, versioned configurations, evaluation results and monitoring so your validation team can review how each agent behaves and changes over time.",
    },
    {
      question: "Do you replace our core systems?",
      answer:
        "No. Agents work through your existing ERP, banking and case-management systems, using their APIs and your access controls.",
    },
    {
      question: "Can we keep data in our own environment?",
      answer:
        "Yes. We support deployment in your cloud account or private network, with data residency options to match your regulatory footprint.",
    },
    {
      question: "Which finance workflows can it handle?",
      answer:
        "KYC and onboarding, AML alert triage, invoice matching, reconciliations, credit document review and regulatory reporting, each within your policies and approval limits.",
    },
    {
      question: "Is it for banks or corporate finance teams?",
      answer:
        "Both. Banks and fintechs use it for onboarding, monitoring and credit work; corporate finance teams use it for payables, close and reporting.",
    },
  ],
};

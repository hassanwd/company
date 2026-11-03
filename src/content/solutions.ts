import {
  BadgeCheck,
  BadgeDollarSign,
  BellRing,
  BookOpen,
  Boxes,
  Calculator,
  CalendarCheck,
  ChartColumn,
  ChartLine,
  ClipboardCheck,
  FileBarChart,
  FileSignature,
  Files,
  FolderSearch,
  HeartPulse,
  Landmark,
  MessagesSquare,
  Radar,
  Receipt,
  ReceiptText,
  Scale,
  ShieldAlert,
  ShoppingBag,
  Stethoscope,
  Tags,
  TrendingUp,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Route } from "next";

export type Faq = { question: string; answer: string };

export type Agent = {
  name: string;
  icon: LucideIcon;
  description: string;
  /** Where a human stays in control. */
  checkpoint: string;
};

export type Solution = {
  slug: "law" | "finance" | "healthcare" | "retail";
  name: string;
  icon: LucideIcon;
  /** Industry accent color (hex), used for the card's top edge and icon. */
  accent: string;
  headline: string;
  tagline: string;
  summary: string;
  challenges: { title: string; description: string }[];
  agents: Agent[];
  workflow: { title: string; scenario: string; steps: { title: string; description: string }[] };
  integrations: string[];
  governance: { title: string; description: string }[];
  outcomes: string[];
  faqs: Faq[];
};

export const solutionHref = (slug: Solution["slug"]) => `/solutions/${slug}` as Route;

export const SOLUTIONS: Solution[] = [
  {
    slug: "law",
    name: "Law",
    icon: Scale,
    accent: "#4f46e5",
    headline: "Agents that handle the legal work behind the legal work",
    tagline: "Contract review, research, diligence and compliance — with attorneys in command.",
    summary:
      "Legal teams are asked to move faster while the volume of contracts, matters and regulation keeps growing. Our agents take on the repeatable first pass — reading, extracting, comparing, drafting — and hand attorneys a cited, reviewable result.",
    challenges: [
      {
        title: "Volume outpaces headcount",
        description:
          "Routine NDAs, vendor paper and intake requests queue up and pull senior lawyers away from judgment-heavy work.",
      },
      {
        title: "Playbooks applied inconsistently",
        description:
          "Fallback positions live in documents and people's heads, so the same clause gets different treatment across the team.",
      },
      {
        title: "Research is slow and hard to trust",
        description:
          "Finding authority is time-consuming, and unverifiable output is worse than none in a profession built on citations.",
      },
      {
        title: "Confidentiality is non-negotiable",
        description:
          "Privilege, ethical walls and client confidentiality rule out any tool that mixes data or trains on it.",
      },
    ],
    agents: [
      {
        name: "Contract Review Agent",
        icon: FileSignature,
        description:
          "Reads inbound agreements, extracts key terms, compares each clause to your playbook, flags deviations and proposes redlines with the reasoning shown.",
        checkpoint: "An attorney approves every redline before anything leaves the building.",
      },
      {
        name: "Legal Research Agent",
        icon: BookOpen,
        description:
          "Searches your approved sources, summarizes findings with pinpoint citations, and highlights conflicting or superseded authority.",
        checkpoint:
          "Every citation links to its source; the attorney verifies before relying on it.",
      },
      {
        name: "Due Diligence Agent",
        icon: FolderSearch,
        description:
          "Works through data-room documents, builds issue lists, populates disclosure schedules and tracks open requests.",
        checkpoint:
          "Material findings route to a reviewer; low-risk items are sampled, not skipped.",
      },
      {
        name: "Matter Intake & Conflicts Agent",
        icon: ShieldAlert,
        description:
          "Structures new requests, runs conflict checks against your records and routes matters to the right team with the context attached.",
        checkpoint: "Potential conflicts always escalate to the responsible partner or counsel.",
      },
      {
        name: "Regulatory Monitoring Agent",
        icon: Radar,
        description:
          "Tracks regulatory change relevant to your obligations, maps it to affected policies and contracts, and drafts impact memos.",
        checkpoint: "Compliance counsel signs off on every memo and policy change.",
      },
      {
        name: "Document Review Agent",
        icon: Files,
        description:
          "Performs first-pass relevance and privilege tagging for large review sets, with statistical sampling to measure quality.",
        checkpoint: "Reviewers own the final calls; sampling results are reported, not hidden.",
      },
    ],
    workflow: {
      title: "From inbound NDA to signature",
      scenario: "Illustrative workflow — configured to your playbook and systems.",
      steps: [
        {
          title: "Intake",
          description:
            "A counterparty NDA arrives by email or portal and is classified automatically.",
        },
        {
          title: "Extract",
          description:
            "Parties, term, governing law, definitions and carve-outs are pulled into structured fields.",
        },
        {
          title: "Compare",
          description:
            "Each clause is checked against your playbook, with preferred, acceptable and unacceptable positions.",
        },
        {
          title: "Redline",
          description: "The agent drafts changes and a short explanation for each deviation.",
        },
        {
          title: "Attorney review",
          description:
            "A reviewer sees the redline, the reasoning and the source text side by side, and approves or edits.",
        },
        {
          title: "Send & record",
          description:
            "The approved version is sent, and the decision trail is saved to your document system.",
        },
      ],
    },
    integrations: [
      "Document management systems",
      "Contract lifecycle management",
      "E-signature platforms",
      "Matter management",
      "Email & calendar",
      "Virtual data rooms",
      "Ticketing & intake portals",
      "Licensed legal research sources",
    ],
    governance: [
      {
        title: "Privilege & confidentiality",
        description:
          "Matter-level access, ethical-wall enforcement and no cross-client data mixing.",
      },
      {
        title: "Citations by default",
        description:
          "Output is grounded in source documents; unsupported statements are flagged, not asserted.",
      },
      {
        title: "Attorney accountability",
        description: "Agents assist and draft. Licensed professionals make and own the decisions.",
      },
      {
        title: "Complete audit trail",
        description: "Every retrieval, suggestion and approval is logged and exportable.",
      },
      {
        title: "Data residency",
        description:
          "Choose where data is processed and stored to meet jurisdictional and client requirements.",
      },
    ],
    outcomes: [
      "Faster first-pass review so attorneys start from a draft, not a blank page",
      "Consistent application of your playbook across every counterparty",
      "Research you can verify, with sources attached to every claim",
      "More senior time on negotiation, strategy and advice",
    ],
    faqs: [
      {
        question: "Does the agent give legal advice?",
        answer:
          "No. Agents prepare work product for licensed professionals. Attorneys review, edit and approve, and remain responsible for advice given to clients.",
      },
      {
        question: "Is our data used to train models?",
        answer:
          "No. Customer data is never used to train models, and it is isolated per customer and, where required, per matter.",
      },
      {
        question: "How do you handle hallucinated citations?",
        answer:
          "Answers are grounded in retrieved documents, citations link to their sources, and unsupported claims are flagged. Evaluation sets that include citation accuracy run before every release.",
      },
      {
        question: "Can it follow our own playbook?",
        answer:
          "Yes. Playbooks are encoded as policy the agent must apply, including preferred language and fallback positions, and you can update them without engineering work.",
      },
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    icon: Landmark,
    accent: "#059669",
    headline: "Agents that close the books, clear the queue and keep you audit-ready",
    tagline: "Onboarding, monitoring, payables and reporting — with controls built in.",
    summary:
      "Finance and risk teams run on high-volume, rule-heavy workflows where errors are expensive and every action must be explainable. Our agents execute the routine steps, document the reasoning, and escalate the exceptions to your people.",
    challenges: [
      {
        title: "Alert fatigue and backlogs",
        description:
          "Analysts spend their day clearing false positives instead of investigating real risk.",
      },
      {
        title: "Manual reconciliation and close",
        description:
          "Spreadsheets, email chasing and cross-system matching stretch every period-end.",
      },
      {
        title: "Audit and regulatory pressure",
        description:
          "Evidence has to be assembled after the fact, and decisions have to be explainable on demand.",
      },
      {
        title: "Strict control requirements",
        description:
          "Segregation of duties, approval limits and model-risk expectations constrain what automation may do.",
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
        checkpoint:
          "Analysts decide; the agent never closes a suspicious-activity alert on its own.",
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
      title: "From invoice to approved payment",
      scenario: "Illustrative workflow — configured to your ERP, policies and approval limits.",
      steps: [
        {
          title: "Capture",
          description: "Invoices arrive by email, EDI or portal and are read into structured data.",
        },
        {
          title: "Validate",
          description: "Vendor, amounts, tax and banking details are checked against master data.",
        },
        {
          title: "Match",
          description:
            "The invoice is matched to purchase order and receipt, with tolerances you define.",
        },
        {
          title: "Flag",
          description: "Mismatches, duplicates and unusual patterns are flagged with the reason.",
        },
        {
          title: "Approve",
          description: "Approvers see the evidence and decide within their delegated limits.",
        },
        {
          title: "Post & log",
          description:
            "The entry is posted to your ERP and the full decision trail is retained for audit.",
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
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    accent: "#e11d48",
    headline: "Agents that take the administrative load off clinicians and care teams",
    tagline: "Authorizations, revenue cycle, documentation and coordination — with privacy first.",
    summary:
      "Administrative work consumes time that belongs to patients. Our agents handle the paperwork, follow-ups and coordination that surround care, operate on the minimum necessary data, and keep licensed clinicians in charge of every clinical decision.",
    challenges: [
      {
        title: "Administrative burden",
        description:
          "Prior authorizations, referrals and forms consume clinical and front-office hours every day.",
      },
      {
        title: "Revenue leakage",
        description: "Denials, missing documentation and slow follow-up quietly erode margin.",
      },
      {
        title: "Fragmented systems",
        description:
          "Information is split across EHRs, payer portals, fax and inboxes, so staff re-key the same data.",
      },
      {
        title: "Privacy and safety obligations",
        description:
          "Protected health information demands strict access control, and clinical judgment cannot be delegated.",
      },
    ],
    agents: [
      {
        name: "Prior Authorization Agent",
        icon: ClipboardCheck,
        description:
          "Determines requirements, compiles supporting clinical documentation, submits requests and tracks status through to a decision.",
        checkpoint: "Clinical staff review medical-necessity content before submission.",
      },
      {
        name: "Claims & Denials Agent",
        icon: Receipt,
        description:
          "Checks claims for coding and documentation gaps before submission, categorizes denials and drafts appeals with the evidence attached.",
        checkpoint: "Coders and billing leads approve code changes and appeals.",
      },
      {
        name: "Clinical Documentation Support Agent",
        icon: Stethoscope,
        description:
          "Drafts structured notes and summaries from encounter inputs and prepares them for the clinician to edit.",
        checkpoint: "The clinician reviews, edits and signs. Nothing enters the record unsigned.",
      },
      {
        name: "Patient Access Agent",
        icon: CalendarCheck,
        description:
          "Handles scheduling, reminders, eligibility checks and pre-visit paperwork across the channels patients use.",
        checkpoint: "Clinical questions and urgent symptoms are escalated to staff immediately.",
      },
      {
        name: "Care Coordination Agent",
        icon: Workflow,
        description:
          "Manages referrals and transitions of care, closes loops on outstanding results and keeps care teams aligned.",
        checkpoint: "Care managers own patient-facing decisions and exceptions.",
      },
      {
        name: "Quality & Compliance Reporting Agent",
        icon: ChartColumn,
        description:
          "Assembles measure data, identifies documentation gaps and prepares reports for quality and regulatory programs.",
        checkpoint: "Quality leaders validate figures before submission.",
      },
    ],
    workflow: {
      title: "From order to authorization decision",
      scenario: "Illustrative workflow — configured to your EHR, payers and policies.",
      steps: [
        {
          title: "Detect",
          description: "A new order is detected and checked for payer authorization requirements.",
        },
        {
          title: "Gather",
          description:
            "Relevant clinical documentation is pulled using only the minimum necessary data.",
        },
        {
          title: "Assemble",
          description:
            "The request is built to the payer's criteria with supporting evidence linked.",
        },
        {
          title: "Clinical review",
          description: "Authorized staff review and approve the packet before it is sent.",
        },
        {
          title: "Submit & track",
          description:
            "The request is submitted and monitored, with follow-up on missing information.",
        },
        {
          title: "Resolve",
          description: "The decision is recorded in the EHR and any denial is routed for appeal.",
        },
      ],
    },
    integrations: [
      "Electronic health records (via FHIR and HL7)",
      "Practice management & billing",
      "Payer portals & clearinghouses",
      "Scheduling & patient communication",
      "Document & fax intake",
      "Referral management",
      "Data warehouses & analytics",
      "Identity & access management",
    ],
    governance: [
      {
        title: "HIPAA-aligned handling",
        description:
          "Minimum-necessary access, encryption, and business associate agreements where applicable.",
      },
      {
        title: "Clinician in command",
        description:
          "Agents support administrative work and drafting. They do not diagnose or make clinical decisions.",
      },
      {
        title: "PHI protection",
        description:
          "Redaction, de-identification options and strict separation of tenants and environments.",
      },
      {
        title: "Full access logging",
        description: "Who or what accessed which record, when and why is recorded and reviewable.",
      },
      {
        title: "Safe escalation",
        description:
          "Clinical or urgent content is detected and routed to people, never answered automatically.",
      },
    ],
    outcomes: [
      "Less time on paperwork, more time with patients",
      "Cleaner claims and faster follow-up on denials",
      "Fewer dropped referrals and open loops",
      "Documentation that is complete, consistent and reviewed by clinicians",
    ],
    faqs: [
      {
        question: "Will the agent make clinical decisions?",
        answer:
          "No. Agents focus on administrative and documentation tasks. Anything clinical is surfaced to a licensed professional who decides.",
      },
      {
        question: "How is protected health information handled?",
        answer:
          "Data access follows the minimum-necessary principle, is encrypted in transit and at rest, and is logged. We sign business associate agreements and can deploy in your environment.",
      },
      {
        question: "Which systems do you connect to?",
        answer:
          "We integrate with EHRs through standards such as FHIR and HL7, and with billing, scheduling and payer systems through their supported interfaces.",
      },
      {
        question: "Is the product a medical device?",
        answer:
          "Our agents are designed for administrative workflows and clinician-reviewed documentation, not diagnosis or treatment. Any use beyond that scope is assessed with your compliance team first.",
      },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    icon: ShoppingBag,
    accent: "#d97706",
    headline: "Agents that keep shelves stocked, customers served and margins healthy",
    tagline: "Merchandising, supply chain, service and loyalty — with your teams making the calls.",
    summary:
      "Retail runs on thin margins and fast-moving signals across stores, channels and suppliers. Our agents handle the routine analysis and follow-up — forecasting, replenishment, catalog upkeep, customer queries — and escalate the judgment calls to your people.",
    challenges: [
      {
        title: "Stock in the wrong place",
        description:
          "Stock-outs lose sales while overstock ties up cash, and planners can't react to every store and channel by hand.",
      },
      {
        title: "Catalog and pricing upkeep",
        description:
          "Thousands of products need accurate content and prices across channels, and errors reach customers immediately.",
      },
      {
        title: "Service demand spikes",
        description:
          "Order, return and delivery queries surge around promotions and peak season, stretching support teams.",
      },
      {
        title: "Customer trust and data",
        description:
          "Personal and payment data carry strict obligations, and an off-brand or wrong answer is public quickly.",
      },
    ],
    agents: [
      {
        name: "Demand Forecasting Agent",
        icon: TrendingUp,
        description:
          "Combines sales history, promotions, seasonality and external signals to forecast demand by product, store and channel, and explains the drivers.",
        checkpoint:
          "Planners review forecasts and can override assumptions before they drive orders.",
      },
      {
        name: "Inventory Replenishment Agent",
        icon: Boxes,
        description:
          "Monitors stock levels, proposes purchase orders and inter-store transfers and flags at-risk items before they sell out.",
        checkpoint: "Buyers approve orders above agreed value or risk thresholds.",
      },
      {
        name: "Product Catalog Agent",
        icon: Tags,
        description:
          "Enriches and standardizes product data, drafts descriptions and attributes and checks listings for gaps and inconsistencies.",
        checkpoint: "Merchandisers approve content before it is published to any channel.",
      },
      {
        name: "Pricing & Promotions Agent",
        icon: BadgeDollarSign,
        description:
          "Analyzes elasticity, competitor moves and margin to recommend price and promotion changes with the expected impact.",
        checkpoint: "Pricing owners approve every change within the guardrails you set.",
      },
      {
        name: "Customer Service Agent",
        icon: MessagesSquare,
        description:
          "Answers order, delivery, return and product questions across chat and email, using your policies and live order data.",
        checkpoint:
          "Complaints, refunds above limits and sensitive cases are handed to a person with full context.",
      },
      {
        name: "Supplier & Logistics Agent",
        icon: Truck,
        description:
          "Tracks inbound shipments and supplier performance, chases delays and drafts exception reports for the supply chain team.",
        checkpoint: "Supply chain managers decide on re-routing, expediting and supplier actions.",
      },
    ],
    workflow: {
      title: "From low-stock signal to replenishment order",
      scenario: "Illustrative workflow — configured to your ERP, suppliers and ordering policies.",
      steps: [
        {
          title: "Monitor",
          description:
            "Stock levels and sell-through are tracked across stores, warehouses and online.",
        },
        {
          title: "Forecast",
          description:
            "Expected demand is updated for upcoming promotions, events and seasonality.",
        },
        {
          title: "Plan",
          description:
            "The agent proposes orders and transfers that respect lead times, minimums and budgets.",
        },
        {
          title: "Flag",
          description:
            "Unusual spikes, supplier delays and low-confidence items are called out with the reason.",
        },
        {
          title: "Buyer approval",
          description:
            "The buyer reviews the plan and its rationale, then approves, edits or rejects.",
        },
        {
          title: "Order & track",
          description:
            "Approved orders go to suppliers through your systems and are tracked through to receipt.",
        },
      ],
    },
    integrations: [
      "ERP & merchandising systems",
      "E-commerce platforms",
      "Point-of-sale systems",
      "Warehouse & order management",
      "Supplier portals & EDI",
      "Customer service & CRM",
      "Product information management",
      "Data warehouses & analytics",
    ],
    governance: [
      {
        title: "Customer data protection",
        description:
          "Access follows least privilege, personal data is minimized and payment data stays out of agent context.",
      },
      {
        title: "Approval thresholds",
        description:
          "Order values, price changes and refund limits are set by you and enforced by policy.",
      },
      {
        title: "Brand and policy control",
        description:
          "Customer-facing answers follow your approved tone, policies and source content.",
      },
      {
        title: "Transparent recommendations",
        description: "Each forecast, price or order carries the data and reasoning behind it.",
      },
      {
        title: "Complete audit trail",
        description: "Actions, approvals and customer interactions are logged and reviewable.",
      },
    ],
    outcomes: [
      "Fewer stock-outs and less overstock tying up cash",
      "Accurate, consistent product content across every channel",
      "Faster customer responses, even through peak periods",
      "Merchandisers and planners focused on strategy instead of spreadsheets",
    ],
    faqs: [
      {
        question: "Can agents place orders or change prices on their own?",
        answer:
          "Only within limits you define. By default, orders and price changes go to a person for approval, and thresholds can be tightened or relaxed over time as trust builds.",
      },
      {
        question: "Does the customer service agent replace our support team?",
        answer:
          "No. It handles routine queries and prepares context for the rest. Complaints, refunds above limits and sensitive cases always go to your team.",
      },
      {
        question: "How is customer and payment data handled?",
        answer:
          "Access is limited to what each task needs, data is encrypted in transit and at rest, and payment card data is kept out of agent context. Customer data is never used to train models.",
      },
      {
        question: "Which retail systems do you integrate with?",
        answer:
          "We connect to ERP, e-commerce, point-of-sale, warehouse and customer-service platforms through their supported APIs, so you keep the systems you already run.",
      },
    ],
  },
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

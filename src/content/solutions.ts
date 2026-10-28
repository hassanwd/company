import { HeartPulse, Landmark, Scale, type LucideIcon } from "lucide-react";
import type { Route } from "next";

export type Faq = { question: string; answer: string };

export type Agent = {
  name: string;
  description: string;
  /** Where a human stays in control. */
  checkpoint: string;
};

export type Solution = {
  slug: "law" | "finance" | "healthcare";
  name: string;
  icon: LucideIcon;
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
        description:
          "Reads inbound agreements, extracts key terms, compares each clause to your playbook, flags deviations and proposes redlines with the reasoning shown.",
        checkpoint: "An attorney approves every redline before anything leaves the building.",
      },
      {
        name: "Legal Research Agent",
        description:
          "Searches your approved sources, summarises findings with pinpoint citations, and highlights conflicting or superseded authority.",
        checkpoint:
          "Every citation links to its source; the attorney verifies before relying on it.",
      },
      {
        name: "Due Diligence Agent",
        description:
          "Works through data-room documents, builds issue lists, populates disclosure schedules and tracks open requests.",
        checkpoint:
          "Material findings route to a reviewer; low-risk items are sampled, not skipped.",
      },
      {
        name: "Matter Intake & Conflicts Agent",
        description:
          "Structures new requests, runs conflict checks against your records and routes matters to the right team with the context attached.",
        checkpoint: "Potential conflicts always escalate to the responsible partner or counsel.",
      },
      {
        name: "Regulatory Monitoring Agent",
        description:
          "Tracks regulatory change relevant to your obligations, maps it to affected policies and contracts, and drafts impact memos.",
        checkpoint: "Compliance counsel signs off on every memo and policy change.",
      },
      {
        name: "Document Review Agent",
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
        description:
          "Collects and validates customer documents, screens against watchlists through your providers, and assembles a complete case file.",
        checkpoint: "Compliance officers approve every high-risk or ambiguous case.",
      },
      {
        name: "Transaction Alert Triage Agent",
        description:
          "Enriches alerts with context, scores likely false positives, and drafts an investigation narrative for the analyst.",
        checkpoint:
          "Analysts decide; the agent never closes a suspicious-activity alert on its own.",
      },
      {
        name: "Accounts Payable Agent",
        description:
          "Captures invoices, performs two- and three-way matching, codes spend, and routes exceptions for approval.",
        checkpoint: "Payments above set limits, and all mismatches, require human approval.",
      },
      {
        name: "Close & Reconciliation Agent",
        description:
          "Matches transactions across ledgers and bank feeds, proposes adjusting entries and chases missing support.",
        checkpoint: "Controllers review and post entries within existing approval workflows.",
      },
      {
        name: "Credit Analysis Support Agent",
        description:
          "Spreads financials, summarises risk factors against policy and prepares a memo with the evidence cited.",
        checkpoint:
          "Credit decisions stay with authorised underwriters; the agent supports, never decides.",
      },
      {
        name: "Audit & Regulatory Reporting Agent",
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
          "Documented behaviour, versioning, testing and monitoring that support your MRM framework.",
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
    headline: "Agents that take the administrative load off clinicians and care teams",
    tagline: "Authorisations, revenue cycle, documentation and coordination — with privacy first.",
    summary:
      "Administrative work consumes time that belongs to patients. Our agents handle the paperwork, follow-ups and coordination that surround care, operate on the minimum necessary data, and keep licensed clinicians in charge of every clinical decision.",
    challenges: [
      {
        title: "Administrative burden",
        description:
          "Prior authorisations, referrals and forms consume clinical and front-office hours every day.",
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
        name: "Prior Authorisation Agent",
        description:
          "Determines requirements, compiles supporting clinical documentation, submits requests and tracks status through to a decision.",
        checkpoint: "Clinical staff review medical-necessity content before submission.",
      },
      {
        name: "Claims & Denials Agent",
        description:
          "Checks claims for coding and documentation gaps before submission, categorises denials and drafts appeals with the evidence attached.",
        checkpoint: "Coders and billing leads approve code changes and appeals.",
      },
      {
        name: "Clinical Documentation Support Agent",
        description:
          "Drafts structured notes and summaries from encounter inputs and prepares them for the clinician to edit.",
        checkpoint: "The clinician reviews, edits and signs. Nothing enters the record unsigned.",
      },
      {
        name: "Patient Access Agent",
        description:
          "Handles scheduling, reminders, eligibility checks and pre-visit paperwork across the channels patients use.",
        checkpoint: "Clinical questions and urgent symptoms are escalated to staff immediately.",
      },
      {
        name: "Care Coordination Agent",
        description:
          "Manages referrals and transitions of care, closes loops on outstanding results and keeps care teams aligned.",
        checkpoint: "Care managers own patient-facing decisions and exceptions.",
      },
      {
        name: "Quality & Compliance Reporting Agent",
        description:
          "Assembles measure data, identifies documentation gaps and prepares reports for quality and regulatory programmes.",
        checkpoint: "Quality leaders validate figures before submission.",
      },
    ],
    workflow: {
      title: "From order to authorisation decision",
      scenario: "Illustrative workflow — configured to your EHR, payers and policies.",
      steps: [
        {
          title: "Detect",
          description: "A new order is detected and checked for payer authorisation requirements.",
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
          description: "Authorised staff review and approve the packet before it is sent.",
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
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

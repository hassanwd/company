import {
  CalendarCheck,
  ChartColumn,
  ClipboardCheck,
  FileCheck,
  HeartPulse,
  Receipt,
  Stethoscope,
  Workflow,
} from "lucide-react";
import type { Solution } from "./types";

export const healthcareSolution: Solution = {
  slug: "healthcare",
  name: "Healthcare",
  icon: HeartPulse,
  accent: "#e11d48",
  headline: "Agents that take the administrative load off clinicians and care teams",
  tagline: "Authorizations, revenue cycle, documentation and coordination — with privacy first.",
  summary:
    "Administrative work consumes time that belongs to patients. Our agents handle the paperwork, follow-ups and coordination that surround care, operate on the minimum necessary data, and keep licensed clinicians in charge of every clinical decision.",
  audience: "Built for hospitals, clinics and health plans.",
  challenges: [
    {
      title: "Administrative burden",
      description:
        "Prior authorizations, referrals and forms consume clinical and front-office hours every day.",
      link: { label: "See the Prior Authorization Agent", target: "prior-authorization-agent" },
    },
    {
      title: "Revenue leakage",
      description: "Denials, missing documentation and slow follow-up quietly erode margin.",
      link: { label: "See the Claims & Denials Agent", target: "claims-denials-agent" },
    },
    {
      title: "Fragmented systems",
      description:
        "Information is split across EHRs, payer portals, fax and inboxes, so staff re-key the same data.",
      link: { label: "See the Care Coordination Agent", target: "care-coordination-agent" },
    },
    {
      title: "Privacy and safety obligations",
      description:
        "Protected health information demands strict access control, and clinical judgment cannot be delegated.",
      link: { label: "See governance & compliance", target: "governance" },
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
    title: "From MRI request to submitted prior authorization",
    scenario:
      "Illustrative workflow using an MRI request. The same pattern applies to the other work below.",
    steps: [
      {
        title: "Detect",
        description:
          "An MRI order is detected and checked against the payer's authorization rules.",
      },
      {
        title: "Gather",
        description:
          "Chart notes, imaging history and prior treatment are pulled using only the minimum necessary data.",
      },
      {
        title: "Match",
        description: "The agent checks each payer criterion and links the supporting evidence.",
      },
      {
        title: "Draft",
        description:
          "The request is written in the payer's format, with evidence attached to each criterion.",
      },
      {
        title: "Clinical review",
        description: "A clinician reviews the packet and signs off before anything is sent.",
      },
      {
        title: "Submit & track",
        description:
          "The request is submitted and monitored, and the decision is recorded in the EHR.",
      },
    ],
  },
  handles: {
    eyebrow: "What it handles",
    title: "Across the work that slows care down",
    description:
      "The same pattern applies across administrative work, with clinicians reviewing anything clinical.",
    items: [
      {
        icon: ClipboardCheck,
        title: "Prior authorizations",
        description:
          "Payer requirements checked and the evidence packet assembled for clinical review.",
      },
      {
        icon: Receipt,
        title: "Claims & denial appeals",
        description:
          "Coding and documentation gaps caught before submission, with appeals drafted from the record.",
      },
      {
        icon: Stethoscope,
        title: "Clinical documentation",
        description:
          "Structured notes drafted from encounter inputs for the clinician to edit and sign.",
      },
      {
        icon: Workflow,
        title: "Referrals & care coordination",
        description:
          "Referrals tracked and open loops chased so patients don't fall between teams.",
      },
      {
        icon: FileCheck,
        title: "Medical coding support",
        description:
          "Codes suggested from the documentation, with the supporting text highlighted for the coder.",
      },
      {
        icon: CalendarCheck,
        title: "Patient intake & eligibility checks",
        description:
          "Insurance eligibility verified and pre-visit forms collected before the patient arrives.",
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
  governanceNote: "Controls designed for healthcare organizations.",
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
    {
      question: "Which administrative tasks can it handle?",
      answer:
        "Prior authorizations, claims and denial appeals, clinical documentation drafts, referrals, coding support and patient intake, with a person reviewing anything clinical.",
    },
    {
      question: "Is it for hospitals or health plans?",
      answer:
        "Both. Providers use it for authorizations, documentation and care coordination; health plans use it for intake, claims review support and member communications.",
    },
  ],
};

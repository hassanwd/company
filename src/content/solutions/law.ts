import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FileLock,
  FileSignature,
  Files,
  FolderSearch,
  Handshake,
  HardHat,
  Radar,
  Scale,
  ShieldAlert,
  Truck,
} from "lucide-react";
import type { Solution } from "./types";

export const lawSolution: Solution = {
  slug: "law",
  name: "Law",
  icon: Scale,
  accent: "#4f46e5",
  headline: "Agents that handle the legal work behind the legal work",
  tagline:
    "Contract review, research, diligence and conflict checks for law firms, run on your firm's own playbooks with attorneys in command.",
  summary:
    "Law firms are asked to move faster while the volume of contracts, matters and client demands keeps growing. Our agents take on the repeatable first pass — reading, extracting, comparing, drafting — and hand your attorneys a cited, reviewable result.",
  audience:
    "Built for law firms. Each firm gets its own private setup, its own rules and its own data.",
  challenges: [
    {
      title: "Volume outpaces headcount",
      description:
        "Routine NDAs, client contracts and new matters pile up, pulling partners and senior associates away from the work that needs their judgment.",
    },
    {
      title: "Playbooks applied inconsistently",
      description:
        "Your firm's preferred positions live in scattered documents and people's heads, so the same clause gets handled differently by different lawyers.",
    },
    {
      title: "Research is slow and hard to trust",
      description:
        "Finding the right cases, past memos and precedents takes hours, and AI answers without real sources are worse than no answer in a profession built on citations.",
    },
    {
      title: "Confidentiality is non-negotiable",
      description:
        "Attorney-client privilege and client confidentiality rule out any tool that shares data between clients or firms, or trains on it.",
    },
  ],
  agents: [
    {
      name: "Contract Review Agent",
      icon: FileSignature,
      description:
        "Reads the contracts your clients send and receive, extracts key terms, compares each clause to your firm's playbook (or a client-specific one), flags deviations and proposes redlines with the reasoning shown.",
      checkpoint: "An attorney reviews, edits and approves every redline before anything is sent.",
    },
    {
      name: "Legal Research Agent",
      icon: BookOpen,
      description:
        "Searches your firm's own knowledge (past memos, briefs, precedents and templates) plus the research sources you already use, and answers with a link to every source.",
      checkpoint:
        "Every answer links to its source and date; the attorney verifies before relying on it.",
    },
    {
      name: "Due Diligence Agent",
      icon: FolderSearch,
      description:
        "Works through data-room documents on your deals, builds issue lists, populates disclosure schedules and tracks open requests.",
      checkpoint:
        "Material findings route to the responsible attorney; low-risk items are sampled, not skipped.",
    },
    {
      name: "Matter Intake & Conflicts Agent",
      icon: ShieldAlert,
      description:
        "Turns new client requests into structured matters, runs conflict checks against your firm's client and matter records, and routes each matter to the right practice group with the context attached.",
      checkpoint:
        "Potential conflicts always escalate to the responsible partner; the agent never clears a conflict on its own.",
    },
    {
      name: "Regulatory Monitoring Agent",
      icon: Radar,
      description:
        "Watches the regulators and sources you choose for your practice areas, flags changes that affect your clients, finds the contracts and templates impacted, and drafts a short impact memo. Your team can add sources, adjust results or edit any memo at any time.",
      checkpoint:
        "An attorney reviews, edits and approves every memo before it reaches a client or changes a template.",
    },
    {
      name: "Document Review Agent",
      icon: Files,
      description:
        "Performs first-pass relevance and privilege tagging on large review sets for litigation and investigations, with sampling to measure quality.",
      checkpoint:
        "Reviewing attorneys own the final calls; sampling results are reported, not hidden.",
    },
  ],
  workflow: {
    title: "From inbound NDA to signature",
    scenario:
      "Illustrative workflow using an NDA a client has received. The same steps apply to every contract type below.",
    steps: [
      {
        title: "Intake",
        description:
          "The counterparty's NDA arrives by email or portal, is linked to the client matter and classified automatically.",
      },
      {
        title: "Extract",
        description:
          "Parties, term, governing law, definitions and carve-outs are pulled into structured fields.",
      },
      {
        title: "Compare",
        description:
          "Each clause is checked against your firm's playbook, with preferred, acceptable and unacceptable positions.",
      },
      {
        title: "Redline",
        description: "The agent drafts changes and a short explanation for each deviation.",
      },
      {
        title: "Attorney review",
        description:
          "An attorney sees the redline, the reasoning and the source text side by side, and approves, edits or rejects.",
      },
      {
        title: "Send for signature & record",
        description:
          "The approved version goes out through your e-signature platform, and the full decision trail is saved to the matter.",
      },
    ],
  },
  handles: {
    eyebrow: "Contract types",
    title: "One agent, every agreement your firm handles",
    description:
      "The same review process applies across contract types, each checked against your firm's playbook for that type.",
    items: [
      {
        icon: FileLock,
        title: "NDAs (confidentiality agreements)",
        description: "Scope, term, permitted use and carve-outs checked against your positions.",
      },
      {
        icon: Truck,
        title: "Vendor and supplier agreements",
        description: "Liability, payment terms, SLAs and termination rights flagged for review.",
      },
      {
        icon: Handshake,
        title: "Customer contracts (MSAs, SaaS)",
        description: "Indemnities, data protection and renewal terms compared to your standards.",
      },
      {
        icon: BriefcaseBusiness,
        title: "Employment contracts",
        description:
          "Restrictive covenants, IP assignment and termination terms checked for consistency.",
      },
      {
        icon: Building2,
        title: "Lease and property agreements",
        description:
          "Rent, early termination rights, maintenance obligations and key dates extracted and flagged.",
      },
      {
        icon: HardHat,
        title: "Project & construction contracts",
        description: "Scope, milestones, delay penalties and change-order clauses reviewed.",
      },
    ],
  },
  integrations: [
    "Document management systems",
    "Practice & matter management",
    "Contract lifecycle management",
    "E-signature platforms",
    "Email & calendar",
    "Virtual data rooms",
    "Client intake forms & portals",
    "Your existing research subscriptions",
  ],
  governanceNote: "Controls designed for law firms.",
  governance: [
    {
      title: "A private setup for every firm",
      description:
        "Each firm runs in its own isolated environment. Your data, playbooks and outputs are never shared with or visible to any other firm.",
    },
    {
      title: "Privilege & confidentiality",
      description:
        "Matter-level access, ethical-wall enforcement and no mixing of data between clients.",
    },
    {
      title: "Citations by default",
      description:
        "Answers are grounded in your documents; anything the agent can't back up is flagged, not stated as fact.",
    },
    {
      title: "Attorney accountability",
      description:
        "Agents assist and draft. Attorneys can edit, override or reject any output, and they make and own the final decisions.",
    },
    {
      title: "Complete audit trail",
      description:
        "Every retrieval, suggestion and approval is logged to the matter and exportable.",
    },
    {
      title: "Deployment options",
      description:
        "Choose where it runs: our managed cloud in the region you pick, your firm's own cloud account, or your own servers. Your data stays where your clients require it.",
    },
  ],
  outcomes: [
    "Faster first-pass review so attorneys start from a draft, not a blank page",
    "Your firm's playbook applied the same way on every matter",
    "Research you can verify, with sources attached to every answer",
    "Conflicts caught at intake, before any work starts",
    "More partner and associate time on negotiation, strategy and client advice",
  ],
  faqs: [
    {
      question: "Does the agent give legal advice?",
      answer:
        "No. Agents prepare work product for your attorneys. Attorneys review, edit and approve, and remain responsible for advice given to clients.",
    },
    {
      question: "Is our data shared with other firms or used to train models?",
      answer:
        "No. Each firm has its own isolated setup. Your data is never shared with other firms or across clients, and never used to train models.",
    },
    {
      question: "Where is our data stored?",
      answer:
        "Wherever you choose. We can run it in our managed cloud in the region you pick, inside your firm's own cloud account, or on your own servers, and your data stays in that location.",
    },
    {
      question: "How do you handle made-up citations?",
      answer:
        "Every answer is based on real documents, and each citation links to its source so you can check it. Anything the agent can't back up is flagged, not stated as fact.",
    },
    {
      question: "Can it follow our firm's own playbook?",
      answer:
        "Yes. Your playbooks are set up as rules the agent must follow, including preferred language and fallback positions. You can keep a separate playbook per contract type or per client, and update them without engineering work.",
    },
    {
      question: "Which contract types can it review?",
      answer:
        "NDAs, vendor and supplier agreements, customer contracts, employment contracts, leases and project contracts, each against its own playbook.",
    },
    {
      question: "Who in the firm uses it?",
      answer:
        "Partners, associates, paralegals and intake or conflicts staff. Each person only sees the matters they have access to.",
    },
    {
      question: "How quickly can we start?",
      answer:
        "Most firms start with a 4-week proof of concept on one workflow, such as NDA review, using their own playbook and documents.",
    },
  ],
};

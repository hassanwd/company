import {
  Activity,
  Blocks,
  BrainCircuit,
  Cloud,
  FileSearch,
  FlaskConical,
  KeyRound,
  Network,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import type { Faq } from "./solutions";

export type Feature = { title: string; description: string; icon: LucideIcon };
export type Step = { title: string; description: string };

/** The agent loop shown on the home page and platform page. */
export const AGENT_LOOP: Step[] = [
  { title: "Trigger", description: "A document, event, schedule or request starts the workflow." },
  { title: "Plan", description: "The agent breaks the goal into steps and picks the right tools." },
  {
    title: "Act",
    description: "It reads, calls your systems and drafts — within scoped permissions.",
  },
  {
    title: "Verify",
    description: "Automated checks test the result against policy and source data.",
  },
  {
    title: "Approve",
    description: "People review what matters; exceptions escalate automatically.",
  },
  { title: "Learn", description: "Feedback and evaluations make the next run better." },
];

export const PLATFORM_FEATURES: Feature[] = [
  {
    title: "Agent orchestration",
    description:
      "Compose single- and multi-agent workflows with planning, tool use, retries and long-running state, triggered by events, schedules or people.",
    icon: BrainCircuit,
  },
  {
    title: "Grounded knowledge",
    description:
      "Retrieval over your documents and data that respects existing permissions and returns citations, so answers can be checked.",
    icon: FileSearch,
  },
  {
    title: "Integrations & tools",
    description:
      "Connect to systems of record through APIs, events and secure connectors, with scoped credentials per agent.",
    icon: Blocks,
  },
  {
    title: "Human-in-the-loop",
    description:
      "Approval gates, review queues and escalation rules put people in control exactly where risk is highest.",
    icon: UserCheck,
  },
  {
    title: "Guardrails & policy",
    description:
      "Policy-as-code limits what each agent may see and do, redacts sensitive data and blocks out-of-scope actions.",
    icon: ShieldCheck,
  },
  {
    title: "Evaluation & testing",
    description:
      "Golden datasets, regression suites and red-teaming run before every release, so changes are measured, not guessed.",
    icon: FlaskConical,
  },
  {
    title: "Observability & audit",
    description:
      "Full traces of every step, tool call and decision, plus tamper-evident audit logs and cost and quality dashboards.",
    icon: Activity,
  },
  {
    title: "Identity & access",
    description:
      "Single sign-on, role-based access, and least-privilege service identities for every agent.",
    icon: KeyRound,
  },
  {
    title: "Model flexibility",
    description:
      "Use the models that fit each task and each compliance boundary, including private endpoints, without rewriting workflows.",
    icon: Network,
  },
  {
    title: "Flexible deployment",
    description:
      "Run as managed cloud, inside your own cloud account or private network, or in restricted environments.",
    icon: Cloud,
  },
];

export const DEPLOYMENT_OPTIONS: { title: string; description: string; points: string[] }[] = [
  {
    title: "Managed cloud",
    description: "Fastest path to value, operated by us on isolated, single-tenant infrastructure.",
    points: ["Dedicated tenant isolation", "Regional data residency", "Continuous updates"],
  },
  {
    title: "Your cloud (VPC)",
    description: "The platform runs inside your cloud account, so data never leaves your boundary.",
    points: [
      "Your keys and network controls",
      "Private model endpoints",
      "Your logging and monitoring",
    ],
  },
  {
    title: "Restricted environments",
    description: "For the most sensitive workloads that need isolation from the public internet.",
    points: [
      "Network-isolated operation",
      "Customer-managed models",
      "Change control to your process",
    ],
  },
];

export const SECURITY_PILLARS: Feature[] = [
  {
    title: "Data protection",
    description:
      "Encryption in transit and at rest, customer-managed key options, strict tenant isolation, and configurable retention and deletion.",
    icon: ShieldCheck,
  },
  {
    title: "Access control",
    description:
      "SSO via SAML and OIDC, SCIM provisioning, role-based access and least-privilege credentials for every agent and connector.",
    icon: KeyRound,
  },
  {
    title: "Auditability",
    description:
      "Every retrieval, tool call, suggestion and approval is logged with who, what, when and why, and exportable to your SIEM.",
    icon: FileSearch,
  },
  {
    title: "Responsible AI",
    description:
      "Grounding, citations, evaluation before release, prompt-injection defences and mandatory human checkpoints for high-impact actions.",
    icon: UserCheck,
  },
  {
    title: "Secure engineering",
    description:
      "Secure development lifecycle, dependency and secret scanning, code review, and regular independent penetration testing.",
    icon: Blocks,
  },
  {
    title: "Operational resilience",
    description:
      "Monitoring, incident response, backups and disaster-recovery practices designed around enterprise availability expectations.",
    icon: Activity,
  },
];

export const COMMITMENTS: string[] = [
  "Your data is never used to train models.",
  "Data stays within the region and environment you choose.",
  "Agents act only with the permissions you grant, and nothing more.",
  "High-impact actions require human approval by default.",
  "You can export your audit logs and delete your data.",
];

export const FRAMEWORKS: { name: string; note: string }[] = [
  { name: "SOC 2", note: "Controls mapped to the trust services criteria" },
  { name: "ISO 27001", note: "Aligned with information security management practices" },
  { name: "HIPAA", note: "Safeguards and BAAs for protected health information" },
  { name: "GDPR / UK GDPR", note: "Data-subject rights, DPAs and residency options" },
  { name: "GLBA & PCI DSS", note: "Handling of financial and cardholder data" },
  { name: "NIST AI RMF", note: "Risk-management practices for AI systems" },
];

export const PROCESS: {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}[] = [
  {
    phase: "01",
    title: "Discover",
    description:
      "We map your workflows, systems, data and risk posture with the people who do the work, and pick the use cases worth building first.",
    deliverables: [
      "Prioritised use-case backlog",
      "Process and data map",
      "Risk and compliance assessment",
      "Success criteria",
    ],
  },
  {
    phase: "02",
    title: "Design",
    description:
      "We define what each agent may do, where humans approve, how it is measured, and how it connects to your systems.",
    deliverables: [
      "Agent and workflow design",
      "Guardrail and approval policy",
      "Integration plan",
      "Evaluation plan",
    ],
  },
  {
    phase: "03",
    title: "Build & pilot",
    description:
      "We build against real data in a controlled pilot, evaluate relentlessly and put it in front of your team early.",
    deliverables: [
      "Working agents in your environment",
      "Evaluation results",
      "Reviewer feedback loop",
      "Go / no-go recommendation",
    ],
  },
  {
    phase: "04",
    title: "Deploy",
    description:
      "We harden, integrate and roll out in stages, with training, change management and security sign-off.",
    deliverables: [
      "Production deployment",
      "Security and compliance review",
      "Runbooks and training",
      "Staged rollout",
    ],
  },
  {
    phase: "05",
    title: "Operate & improve",
    description:
      "We monitor quality, cost and risk, tune performance and extend to the next workflows as trust grows.",
    deliverables: [
      "Quality and cost reporting",
      "Continuous evaluation",
      "Incident response",
      "Roadmap for new agents",
    ],
  },
];

export const TEAM_ROLES: { title: string; description: string }[] = [
  {
    title: "Solution architects",
    description: "Design the target workflow and system integrations.",
  },
  {
    title: "Domain specialists",
    description: "Bring legal, financial and healthcare operating experience.",
  },
  { title: "Agent engineers", description: "Build, evaluate and harden the agents." },
  {
    title: "Security & compliance",
    description: "Own controls, reviews and regulatory alignment.",
  },
  { title: "Customer success", description: "Drive adoption, training and measured outcomes." },
];

export const ENGAGEMENT_MODELS: {
  name: string;
  summary: string;
  bestFor: string;
  includes: string[];
  highlight?: boolean;
}[] = [
  {
    name: "Discovery sprint",
    summary: "A focused assessment that turns possibilities into a prioritised, costed plan.",
    bestFor: "Teams exploring where agents fit.",
    includes: [
      "Workflow and data assessment",
      "Use-case prioritisation",
      "Risk and compliance review",
      "Pilot proposal",
    ],
  },
  {
    name: "Pilot",
    summary: "One workflow, built on your real data and measured against agreed success criteria.",
    bestFor: "Proving value before wider commitment.",
    includes: [
      "One to two production-grade agents",
      "Evaluation against your benchmarks",
      "Reviewer workflow and approvals",
      "Security review",
    ],
    highlight: true,
  },
  {
    name: "Production",
    summary: "Full rollout across teams with integrations, governance and enterprise support.",
    bestFor: "Scaling proven workflows.",
    includes: [
      "Multiple agents and workflows",
      "SSO, audit and SIEM integration",
      "Training and change management",
      "Support SLAs",
    ],
  },
  {
    name: "Managed operations",
    summary: "We run and continuously improve the agents so your team can focus on the work.",
    bestFor: "Teams that want outcomes without owning the operations.",
    includes: [
      "Monitoring and incident response",
      "Continuous evaluation and tuning",
      "Quarterly roadmap reviews",
      "New-agent delivery",
    ],
  },
];

export const GENERAL_FAQS: Faq[] = [
  {
    question: "What does “agentic” actually mean?",
    answer:
      "An agent doesn't just answer questions — it pursues a goal. It plans the steps, uses tools and your systems to carry them out, checks its own work and escalates to a person when it should. The result is a completed task, not a chat transcript.",
  },
  {
    question: "How do you keep humans in control?",
    answer:
      "Each workflow has explicit approval gates and escalation rules designed with your team. High-impact actions require human sign-off by default, and every decision is logged.",
  },
  {
    question: "Where does our data live, and is it used to train models?",
    answer:
      "You choose the region and deployment model — managed cloud, your own cloud, or a restricted environment. Your data is never used to train models.",
  },
  {
    question: "How long until we see value?",
    answer:
      "We start with one well-chosen workflow and a measured pilot, so you see real results on your own data before committing to a broader rollout. The timeline depends on integrations and review requirements, which we scope together in discovery.",
  },
  {
    question: "Can you work with our existing systems and AI models?",
    answer:
      "Yes. Agents connect to your systems of record through their supported interfaces, and we can use the models that satisfy your security and residency requirements, including private endpoints.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Engagements are scoped to the workflows, volumes and deployment model involved, so there is no one-size-fits-all rate card. Contact us and we will propose a scope and commercial model.",
  },
];

export const PRINCIPLES: { title: string; description: string }[] = [
  {
    title: "Accountable by design",
    description:
      "People stay responsible for decisions. We build the approvals, evidence and audit trails that make that practical.",
  },
  {
    title: "Domain first",
    description:
      "Law, finance and healthcare each have their own rules and risks. We start from the workflow, not from the model.",
  },
  {
    title: "Secure by default",
    description:
      "Least privilege, strong isolation and your control over data are the starting point, not an add-on.",
  },
  {
    title: "Measured, not promised",
    description:
      "We agree success criteria up front and evaluate continuously, so quality is shown with evidence.",
  },
];

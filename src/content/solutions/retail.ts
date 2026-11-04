import {
  BadgeDollarSign,
  Boxes,
  MessagesSquare,
  PackageCheck,
  RotateCcw,
  ShoppingBag,
  Tags,
  TrendingUp,
  Truck,
} from "lucide-react";
import type { Solution } from "./types";

export const retailSolution: Solution = {
  slug: "retail",
  name: "Retail",
  icon: ShoppingBag,
  accent: "#d97706",
  headline: "Agents that keep shelves stocked, customers served and margins healthy",
  tagline: "Merchandising, supply chain, service and loyalty — with your teams making the calls.",
  summary:
    "Retail runs on thin margins and fast-moving signals across stores, channels and suppliers. Our agents handle the routine analysis and follow-up — forecasting, replenishment, catalog upkeep, customer queries — and escalate the judgment calls to your people.",
  audience: "Built for retailers and e-commerce teams.",
  challenges: [
    {
      title: "Stock in the wrong place",
      description:
        "Stock-outs lose sales while overstock ties up cash, and planners can't react to every store and channel by hand.",
      link: {
        label: "See the Inventory Replenishment Agent",
        target: "inventory-replenishment-agent",
      },
    },
    {
      title: "Catalog and pricing upkeep",
      description:
        "Thousands of products need accurate content and prices across channels, and errors reach customers immediately.",
      link: { label: "See the Product Catalog Agent", target: "product-catalog-agent" },
    },
    {
      title: "Service demand spikes",
      description:
        "Order, return and delivery queries surge around promotions and peak season, stretching support teams.",
      link: { label: "See the Customer Service Agent", target: "customer-service-agent" },
    },
    {
      title: "Customer trust and data",
      description:
        "Personal and payment data carry strict obligations, and an off-brand or wrong answer is public quickly.",
      link: { label: "See governance & compliance", target: "governance" },
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
    title: "From return request to approved refund",
    scenario:
      "Illustrative workflow using a return request. The same pattern applies to the other work below.",
    steps: [
      {
        title: "Intake",
        description:
          "A return request arrives by chat, email or portal and is matched to the order.",
      },
      {
        title: "Check",
        description:
          "Order history, delivery date and payment method are pulled from your systems.",
      },
      {
        title: "Apply policy",
        description:
          "Your return policy is applied: eligibility window, item condition and product type.",
      },
      {
        title: "Prepare",
        description:
          "The agent prepares the refund amount and the reason, citing the policy clause.",
      },
      {
        title: "Manager approval",
        description:
          "A manager reviews cases above your limits or outside policy, then approves or declines.",
      },
      {
        title: "Refund & record",
        description:
          "The approved refund is issued through your payment system and the case is logged.",
      },
    ],
  },
  handles: {
    eyebrow: "What it handles",
    title: "Across stores, stock and service",
    description:
      "The same pattern applies across retail operations, with your team approving what matters.",
    items: [
      {
        icon: RotateCcw,
        title: "Refunds & returns",
        description:
          "Return eligibility checked against your policy and refunds prepared for approval.",
      },
      {
        icon: TrendingUp,
        title: "Demand forecasting",
        description: "Demand forecast by product, store and channel, with the drivers explained.",
      },
      {
        icon: Boxes,
        title: "Inventory replenishment",
        description: "Low-stock items flagged and purchase orders or transfers drafted for buyers.",
      },
      {
        icon: Tags,
        title: "Product catalog updates",
        description: "Product data enriched and checked for gaps before it is published.",
      },
      {
        icon: MessagesSquare,
        title: "Customer service requests",
        description:
          "Order and delivery questions answered from live data, with hard cases handed to a person.",
      },
      {
        icon: PackageCheck,
        title: "Supplier onboarding",
        description:
          "Supplier documents collected and checked, with exceptions sent to procurement.",
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
  governanceNote: "Controls designed for retail teams.",
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
    {
      question: "Which retail workflows can it handle?",
      answer:
        "Returns and refunds, demand forecasting, replenishment, catalog updates, customer service requests and supplier onboarding, within the limits you set.",
    },
    {
      question: "Is it for stores or e-commerce?",
      answer:
        "Both. Store and supply chain teams use it for stock and replenishment; e-commerce teams use it for returns, catalog and customer service.",
    },
  ],
};

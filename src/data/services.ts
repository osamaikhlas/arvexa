import { Boxes, Workflow, LifeBuoy, Globe, type LucideIcon } from "lucide-react";
import type { ProjectCategory } from "@/types/project";

export interface Service {
  slug: string;
  /** Matches a Project.category so the service page can cross-link real
   * case studies — null for AI Rescue, which isn't a project category of
   * its own (see the manual "Where we've done this" callout instead). */
  relatedCategory: ProjectCategory | null;
  eyebrow: string;
  title: string;
  positioning: string;
  description: string;
  capabilities: string[];
  /** Lucide icon, not a stock photo — real project screenshots are the
   * only "pictures" the content policy allows us to use, and there aren't
   * enough of those to illustrate every service. An icon is honest
   * decoration; a stock AI photo would not be. */
  icon: LucideIcon;
  signature?: boolean;
  ctaLabel: string;
  ctaHref: string;
  // AI Rescue only:
  problems?: string[];
  auditAreas?: { area: string; inspects: string }[];
}

/** Source: docs/positioning.md (Services section) and docs/strategy-summary.md
 * §9–10. No capability bullet or line of copy here that isn't traced to one
 * of those two files. */
export const SERVICES: Service[] = [
  {
    slug: "ai-product-engineering",
    icon: Boxes,
    relatedCategory: "AI Saas Implementation",
    eyebrow: "Service 01",
    title: "AI Product Engineering",
    positioning: "We turn AI concepts into complete products.",
    description:
      "From a concept to a real product real users can depend on, with AI woven into the product itself instead of bolted on as a chatbot widget.",
    capabilities: [
      "AI-powered web applications",
      "AI SaaS",
      "AI copilots and internal tools",
      "LLM integrations",
      "RAG and intelligent workflows",
    ],
    ctaLabel: "Start a Project",
    ctaHref: "/start-a-project",
  },
  {
    slug: "ai-agents-automation",
    icon: Workflow,
    // ProjectCategory split "AI Agents & Automation" into two separate tabs
    // (docs/decisions.md, 2026-09-21) — this service can only point at one;
    // picked "AI Agents" as the closer match. Now has a real project
    // (RAG-Based AI Chatbot, recategorized 2026-09-22 for its search_web
    // tool-calling behavior — see docs/decisions.md).
    relatedCategory: "AI Agents",
    eyebrow: "Service 02",
    title: "AI Agents & Automation",
    positioning: "We design intelligent systems that execute real workflows.",
    description:
      "Not a demo that calls one tool once, but systems that actually run a workflow end to end, reliably, with the error handling and evaluation that real execution requires.",
    capabilities: [
      "AI agents",
      "Tool-using workflows",
      "Multi-step automations",
      "Internal operational agents",
      "Customer-facing AI workflows",
    ],
    ctaLabel: "Start a Project",
    ctaHref: "/start-a-project",
  },
  {
    slug: "ai-rescue",
    icon: LifeBuoy,
    relatedCategory: null,
    eyebrow: "Service 03",
    title: "AI Rescue & Production Hardening",
    positioning: "Already Built Something With AI? We Can Help Make It Production-Ready.",
    description:
      "A lot of AI-generated work looks finished in a demo and falls apart under real users. This is what we specialize in fixing: audit, architecture, evaluation, hardening, and deployment.",
    capabilities: [
      "Prototype audit",
      "Architecture review",
      "Bug fixing and refactoring",
      "AI evaluation and reliability improvements",
      "Performance, security, deployment, and monitoring",
    ],
    ctaLabel: "Request a Production Readiness Audit",
    ctaHref: "/start-a-project",
    problems: [
      "The prototype works, but breaks with real users.",
      "The agent gives inconsistent outputs.",
      "The SaaS application has bugs or weak architecture.",
      "AI-generated code has become difficult to maintain.",
      "APIs and integrations are unreliable.",
      "You do not know what needs to change before launch.",
    ],
    auditAreas: [
      { area: "Product", inspects: "User workflow, business requirements, failure cases" },
      { area: "Architecture", inspects: "Application structure, data flow, maintainability" },
      { area: "AI", inspects: "Model/system design, prompts, retrieval, tool execution" },
      { area: "Reliability", inspects: "Error handling, retries, fallbacks, inconsistent behavior" },
      { area: "Security", inspects: "Authentication, authorization, secrets, data handling" },
      { area: "Performance", inspects: "Latency, bottlenecks, API and database behavior" },
      { area: "Evaluation", inspects: "How quality and regression are measured" },
      { area: "Deployment", inspects: "Production readiness, observability, rollback and monitoring" },
    ],
  },
  {
    slug: "web-saas",
    icon: Globe,
    relatedCategory: "AI Web Development",
    eyebrow: "Service 04",
    title: "Web & SaaS Engineering",
    positioning: "Modern, scalable web and SaaS products engineered with AI-native workflows.",
    description:
      "The engineering discipline behind everything else we build, from marketing sites to full SaaS platforms, built to last rather than just to demo.",
    capabilities: [
      "Marketing and product websites",
      "Dashboards and portals",
      "SaaS MVPs",
      "Full-stack web applications",
      "Authentication, payments, APIs, and integrations",
    ],
    ctaLabel: "Start a Project",
    ctaHref: "/start-a-project",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

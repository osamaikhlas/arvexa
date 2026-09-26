import { FRAMEWORK_STAGES } from "@/components/site/framework-row";

export interface ProcessStage {
  index: string;
  label: string;
  purpose: string; // matches FRAMEWORK_STAGES.description exactly — same source of truth
  activities: string[];
  outputs: string[];
  clientInvolvement: string;
}

/** Expands FRAMEWORK_STAGES (the short version used on Home) into the fuller
 * objective/activities/outputs/client-involvement breakdown. The `label`
 * and `purpose` fields are read from FRAMEWORK_STAGES itself so this can
 * never drift from what the homepage already says. */
export const PROCESS_STAGES: ProcessStage[] = [
  {
    ...pick("01"),
    activities: [
      "Stakeholder and user interviews",
      "Technical/architecture audit of anything already built",
      "Defining success criteria and scope",
    ],
    outputs: ["A written problem statement and scope", "Initial architecture direction"],
    clientInvolvement: "Heaviest at this stage: your context and constraints shape everything downstream.",
  },
  {
    ...pick("02"),
    activities: [
      "AI-assisted prototyping of core flows",
      "Rapid iteration on UI/UX direction",
      "Technical spikes for the riskiest unknowns",
    ],
    outputs: ["A working prototype or proof of concept", "A clearer picture of what's actually hard"],
    clientInvolvement: "Review and react to prototypes early, before architecture is locked in.",
  },
  {
    ...pick("03"),
    activities: [
      "Architecture and data-model design",
      "Authentication, integrations, and core business logic",
      "Code review and engineering standards enforcement",
    ],
    outputs: ["A production-shaped codebase", "Documented architecture decisions"],
    clientInvolvement: "Periodic check-ins; less day-to-day involvement than Discover or Generate.",
  },
  {
    ...pick("04"),
    activities: [
      "Automated test coverage (unit, integration, end-to-end)",
      "AI output evaluation where applicable",
      "Manual QA against real-world scenarios",
    ],
    outputs: ["Test suite and evaluation results", "A prioritized list of known issues"],
    clientInvolvement: "Review of test results and edge cases that matter to your business.",
  },
  {
    ...pick("05"),
    activities: [
      "Security review and fixes",
      "Performance and reliability work",
      "Error handling, retries, and graceful degradation",
    ],
    outputs: ["A system that fails safely, not silently", "Documented known limitations"],
    clientInvolvement: "Sign-off on risk tradeoffs where relevant to the business.",
  },
  {
    ...pick("06"),
    activities: [
      "Production infrastructure setup",
      "Deployment pipeline and rollback plan",
      "Launch checklist and smoke testing",
    ],
    outputs: ["A live, monitored production system"],
    clientInvolvement: "Go/no-go decision; coordination on launch timing.",
  },
  {
    ...pick("07"),
    activities: [
      "Monitoring and observability",
      "Bug fixes and reliability improvements",
      "New features and AI/model optimization as needs change",
    ],
    outputs: ["A system that gets more reliable and capable over time, not one frozen at launch"],
    clientInvolvement:
      "Ongoing, at whatever cadence fits, from occasional check-ins to a standing engineering partnership. This is also where the AI Product Maintenance & Evolution offer picks up for clients who want us to stay on past launch.",
  },
];

function pick(index: string): { index: string; label: string; purpose: string } {
  const stage = FRAMEWORK_STAGES.find((s) => s.index === index);
  if (!stage) throw new Error(`Unknown framework stage index: ${index}`);
  return { index: stage.index, label: stage.label, purpose: stage.description };
}

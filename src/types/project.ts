/** Matches the Project schema in docs/case-study-framework.md exactly — do not
 * add fields here without adding them there too. `permissionLevel` and
 * `statsCaveat` are the two additions beyond the operating prompt's base
 * schema, both tracked in docs/project-data-needed.md.
 *
 * Retired 2026-09-21 (see docs/decisions.md): "AI Product Engineering" /
 * "AI Agents & Automation" / "AI Rescue & Production Hardening" /
 * "Web & SaaS Engineering" — replaced by the 4 values below at the user's
 * explicit request, after flagging that it puts an "AI" label on projects
 * with no real AI involvement (SMGSC Portal, Manza, Shakeel
 * Pakwan). Their own case-study content still says so honestly inline
 * (`aiContribution: null`) — only the category tab changed. */
export type ProjectCategory = "AI Automation" | "AI Agents" | "AI Web Development" | "AI Saas Implementation";

export interface CaseStudyContent {
  problem: string;
  startingPoint: string;
  solution: string;
  architecture: string[]; // ordered diagram stage labels
  engineeringContribution: string;
  aiContribution: string | null; // null = no AI involvement in this project
  results: string;
}

export interface Project {
  title: string;
  slug: string;
  category: ProjectCategory;
  summary: string;
  client: string | null; // null renders as an honest placeholder, not omitted silently
  content: CaseStudyContent;
  technology: string[];
  images: string[]; // empty = show the placeholder, same convention as ProjectCard
  videos: string[];
  testimonial: string | null;
  liveUrl: string | null;
  featured: boolean;
  permissionLevel: "public" | "anonymized" | "pending";
}

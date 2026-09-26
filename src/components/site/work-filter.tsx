"use client";

import * as React from "react";
import { ProjectCard } from "@/components/site/project-card";
import { PROJECT_CATEGORIES } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types/project";

const ALL = "All" as const;

/** Client-side category filter for the Work index. Tabs are the fixed
 * `PROJECT_CATEGORIES` list (docs/decisions.md, 2026-09-21), not derived
 * from which categories currently have projects — "AI Automation" and
 * "AI Agents" show up with zero projects today, honestly labeled via the
 * "No projects in this category yet" fallback below rather than hidden. */
function WorkFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = React.useState<ProjectCategory | typeof ALL>(ALL);

  const visible = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by category">
        {[ALL, ...PROJECT_CATEGORIES].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={cn(
              "rounded-sm border px-3.5 py-2 font-mono text-xs transition-colors",
              active === c
                ? "border-accent-fill bg-accent-fill text-on-fill"
                : "border-line bg-surface-200 text-ink-soft hover:border-accent hover:text-accent",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {visible.map((p) => (
          <ProjectCard
            key={p.slug}
            slug={p.slug}
            category={p.category}
            title={p.title}
            summary={p.summary}
            image={p.images[0]}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-8 text-sm text-ink-faint">No projects in this category yet.</p>
      )}
    </div>
  );
}

export { WorkFilter };

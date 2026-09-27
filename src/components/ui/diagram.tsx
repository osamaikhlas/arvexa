import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The site-wide architecture-diagram grammar from docs/brand-system.md:
 * stages as radius-md blocks on surface-200, connected by simple arrows,
 * labeled in the mono face. Used for both the AI→Production framework and
 * any per-case-study architecture diagram (Checkpoint 8).
 */

export interface DiagramStageProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: string;
  label: string;
  description?: string;
  emphasis?: boolean;
}

function DiagramStage({ index, label, description, emphasis, className, ...props }: DiagramStageProps) {
  return (
    <div
      className={cn(
        "rounded-md border p-4",
        emphasis ? "bg-accent-soft border-accent" : "bg-surface-200 border-line",
        className,
      )}
      {...props}
    >
      {index && (
        <div className={cn("font-mono text-xs", emphasis ? "text-accent-strong" : "text-ink-faint")}>{index}</div>
      )}
      <div className="mt-2 text-sm font-semibold text-ink">{label}</div>
      {description && (
        <div className={cn("mt-1.5 text-xs", emphasis ? "text-ink" : "text-ink-soft")}>{description}</div>
      )}
    </div>
  );
}

/** A single connector between diagram stages — horizontal by default, vertical on mobile stacks. */
function DiagramArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-line",
        vertical ? "mx-auto h-4 w-px" : "my-auto h-px w-4",
      )}
    />
  );
}

export { DiagramStage, DiagramArrow };

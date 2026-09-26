import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * The "chip"/tag component — always the mono label face, per
 * docs/brand-system.md ("this is what signals engineering at a glance").
 * Never render this content in the sans body face instead.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-sm border font-mono text-xs px-3 py-1.5",
  {
    variants: {
      variant: {
        neutral: "bg-surface-200 border-line text-ink-soft",
        accent: "bg-accent-soft border-accent text-accent-strong",
        inverse: "bg-surface-200/10 border-line text-ink",
        signature: "bg-transparent border-accent text-accent uppercase tracking-[0.06em]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };

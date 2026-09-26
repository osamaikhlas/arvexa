import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * The type scale from docs/brand-system.md, as components rather than
 * scattered utility classes — keeps every heading/body instance on-scale.
 */

const headingVariants = cva("font-display font-semibold leading-[1.02] tracking-[-0.01em] text-ink", {
  variants: {
    level: {
      xl: "text-[38px] md:text-[68px]", // display-xl — homepage hero only
      lg: "text-[27px] md:text-[44px]", // display-lg — page H1
      md: "text-[25px] md:text-[32px]", // display-md — section H2 (see also SectionHeading)
    },
  },
  defaultVariants: { level: "lg" },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3";
}

function Heading({ className, level, as = "h1", ...props }: HeadingProps) {
  const Comp = as;
  return <Comp className={cn(headingVariants({ level, className }))} {...props} />;
}

const textVariants = cva("text-ink-soft", {
  variants: {
    size: {
      lg: "text-[17px] md:text-[18px] leading-[1.55]", // body-lg
      base: "text-[15.5px] md:text-base leading-[1.6]", // body
      sm: "text-[13.5px] md:text-sm leading-[1.55]", // body-sm
    },
  },
  defaultVariants: { size: "base" },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

function Text({ className, size, ...props }: TextProps) {
  return <p className={cn(textVariants({ size, className }))} {...props} />;
}

function Label({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("font-mono text-xs font-medium uppercase tracking-[0.06em]", className)}
      {...props}
    />
  );
}

export { Heading, Text, Label };

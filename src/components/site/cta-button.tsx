"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export interface CtaButtonProps extends Omit<ButtonProps, "asChild" | "children" | "onClick"> {
  href: string;
  /** Identifies which CTA this is in analytics — e.g. "hero-start-project",
   * "nav-start-project", "rescue-audit". Keep these stable once launched;
   * changing them breaks event-history continuity in whatever analytics
   * provider eventually gets wired in (docs/open-questions.md item 6). */
  id: string;
  children: ReactNode;
  /** Extra behavior on click (e.g. closing the mobile nav panel) — runs
   * alongside tracking, doesn't replace it. */
  onClick?: () => void;
}

/** The one place every primary CTA link goes through, so conversion
 * tracking (Checkpoint 11) is consistent site-wide instead of hand-added
 * per button. Fires on click, before navigation. */
function CtaButton({ href, id, children, onClick, ...buttonProps }: CtaButtonProps) {
  return (
    <Button asChild {...buttonProps}>
      <Link
        href={href}
        onClick={() => {
          trackEvent("cta_click", { id, href });
          onClick?.();
        }}
      >
        {children}
      </Link>
    </Button>
  );
}

export { CtaButton };

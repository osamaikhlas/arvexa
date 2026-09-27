"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/site/logo";
import { CtaButton } from "@/components/site/cta-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

/**
 * Site nav. Resolves the mobile-menu gap flagged in docs/homepage-design.md:
 * a full-width panel drops below the bar, includes the same CTA as desktop,
 * closes on link click or Escape, and traps nothing it doesn't need to since
 * it's a simple in-flow panel, not a modal.
 */
function Nav() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface-200">
      <Container className="flex h-16 md:h-20 items-center justify-between">
        <Link href="/" aria-label="Arvexa home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[14px] text-ink-faint hover:text-accent">
              {l.label}
            </Link>
          ))}
          <CtaButton id="nav-desktop-start-project" href="/start-a-project" variant="primary" size="sm">
            Start a Project
          </CtaButton>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </Container>

      <div
        id="mobile-nav-panel"
        className={cn(
          "md:hidden overflow-hidden border-t border-line bg-surface-200 transition-[max-height]",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-3 text-[15px] text-ink-faint"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <CtaButton
            id="nav-mobile-start-project"
            href="/start-a-project"
            variant="primary"
            size="full"
            className="mt-2"
            onClick={() => setOpen(false)}
          >
            Start a Project
          </CtaButton>
        </nav>
      </div>
    </header>
  );
}

export { Nav };

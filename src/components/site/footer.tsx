import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/typography";
import { Logo } from "@/components/site/logo";
import { SITE_EMAIL } from "@/lib/site";

const SITE_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

/** The footer and the homepage's closing CTA are the site's only two
 * reserved-dark surfaces (2026-09-27 sand/rust refactor — see
 * docs/decisions.md); every color below is the explicit inverse-tier
 * token rather than the site's normal light-bg defaults. */
function Footer() {
  return (
    <footer className="border-t border-line-inverse bg-surface-inverse">
      <Container className="flex flex-col md:flex-row md:justify-between gap-10 py-14">
        <div>
          <Logo invert />
          <p className="mt-3 max-w-xs text-[13.5px] text-ink-inverse-soft">
            AI-native product engineering. From AI prototype to production.
          </p>
        </div>

        <div className="flex flex-wrap gap-14">
          <div className="flex flex-col gap-2.5">
            <Label className="text-ink-inverse-soft">Site</Label>
            {SITE_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-[13.5px] text-ink-inverse">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <Label className="text-ink-inverse-soft">Legal</Label>
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-[13.5px] text-ink-inverse">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <Label className="text-ink-inverse-soft">Contact</Label>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-[13.5px] text-accent-soft underline-offset-2 hover:underline"
            >
              {SITE_EMAIL}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };

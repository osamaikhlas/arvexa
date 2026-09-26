import { Container } from "@/components/ui/container";
import { SectionEyebrow } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { pageMetadata, SITE_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms governing use of the Arvexa website.",
  path: "/terms",
});

/**
 * Website-usage terms only (not a client engagement/services contract —
 * that's a separate document handled per-project, per
 * docs/strategy-summary.md's proposal structure). Entity name and governing
 * law were supplied directly by the user 2026-09-26 (see docs/decisions.md).
 * The expanded liability-clause placeholder was removed at the user's
 * explicit request rather than drafted unreviewed — the base
 * no-indirect-liability sentence that was already real generic boilerplate
 * stays as-is.
 */
export default function TermsPage() {
  return (
    <div data-theme="light" className="bg-surface-100">
    <Container className="pt-16 pb-24 md:pt-24 max-w-[760px]">
      <SectionEyebrow>Legal</SectionEyebrow>
      <Heading level="lg" as="h1" className="mt-3.5">
        Terms of Service
      </Heading>
      <Text size="sm" className="mt-3 text-ink-faint">
        Last updated: September 26, 2026
      </Text>

      <div className="mt-10 flex flex-col gap-8 text-[15px] leading-[1.7] text-ink-soft">
        <section>
          <p>
            These terms govern your use of this website, operated by Arvexa. They don&apos;t cover
            the terms of an actual client engagement; those are set out in a separate proposal or
            contract agreed with you directly before any project begins.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Acceptable use</h2>
          <p>
            Use this site for its intended purpose: learning about our work and getting in touch
            about a project. Don&apos;t attempt to disrupt the site, scrape it at scale, or submit
            the contact form in bad faith (spam, automated submissions, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Intellectual property</h2>
          <p>
            The content of this site, including text, design, case-study write-ups, and the Arvexa
            name and logo, belongs to Arvexa unless otherwise noted. Project names, logos, and
            screenshots shown in case studies remain the property of their respective owners and
            are shown with permission (see docs/project-data-needed.md internally for what&apos;s
            confirmed per project).
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">No warranty</h2>
          <p>
            This site is provided as-is. We try to keep it accurate and working, but we don&apos;t
            guarantee it will always be available or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Limitation of liability</h2>
          <p>
            To the extent permitted by law, Arvexa isn&apos;t liable for any indirect or
            consequential loss arising from your use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Governing law</h2>
          <p>These terms are governed by the laws of Pakistan, with courts in Karachi having
            jurisdiction.</p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Changes to these terms</h2>
          <p>
            We&apos;ll update the &ldquo;last updated&rdquo; date above whenever these terms
            change.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Contact</h2>
          <p>Questions about these terms: {SITE_EMAIL}.</p>
        </section>
      </div>
    </Container>
    </div>
  );
}

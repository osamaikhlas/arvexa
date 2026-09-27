import { Container } from "@/components/ui/container";
import { SectionEyebrow } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { pageMetadata, SITE_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Arvexa collects, uses, and protects information.",
  path: "/privacy",
});

/**
 * Structure and the technical description of what this site actually does
 * are real — verified against the codebase, not boilerplate (see the
 * "What We Collect" section). Entity name, registered address, governing
 * law, and retention period were supplied directly by the user 2026-09-26
 * (see docs/decisions.md) — still not a substitute for real legal review of
 * the liability/rights language elsewhere on the site, but no longer
 * placeholders. The user explicitly asked to remove the jurisdiction-
 * specific GDPR/CCPA rights-language placeholder rather than have it
 * drafted unreviewed (see docs/decisions.md).
 */
export default function PrivacyPage() {
  return (
    <div className="bg-surface-100">
    <Container className="pt-16 pb-24 md:pt-24 max-w-[760px]">
      <SectionEyebrow>Legal</SectionEyebrow>
      <Heading level="lg" as="h1" className="mt-3.5">
        Privacy Policy
      </Heading>
      <Text size="sm" className="mt-3 text-ink-faint">
        Last updated: September 26, 2026
      </Text>

      <div className="mt-10 flex flex-col gap-8 text-[15px] leading-[1.7] text-ink-soft">
        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Who we are</h2>
          <p>
            This site is operated by Arvexa, Ofc # 204 Al Khaleej Towers, Bahria Town Karachi. If
            you have questions about this policy, contact us at {SITE_EMAIL}.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">What we collect</h2>
          <p>
            The only personal information this site collects is what you submit through the{" "}
            <em>Start a Project</em> form: your name, company (optional), email address, and the
            project details you write in the form (project type, stage, timeline, budget range,
            and your description of the challenge you&apos;re facing). We do not use cookies,
            browser local storage, or any tracking script to collect information about you as you
            browse. This site currently has no analytics provider installed (see the note on
            analytics below).
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">How we use it</h2>
          <p>
            Form submissions are used only to respond to your inquiry and, if you become a client,
            to deliver the engagement. We do not sell, rent, or share your information with third
            parties for their own marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Analytics</h2>
          <p>
            As of this policy&apos;s last update, this site does not run any analytics or
            advertising service. If that changes, this policy will be updated first, and the
            provider will be named here.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Data retention</h2>
          <p>
            We retain form submissions for as long as reasonably necessary to respond to your
            inquiry or, if we work together, for the duration of the engagement plus 12 months for
            our own records, unless you ask us to delete it sooner.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Your rights</h2>
          <p>
            You can ask us what information we hold about you, ask us to correct it, or ask us to
            delete it, by contacting {SITE_EMAIL}.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Changes to this policy</h2>
          <p>
            We&apos;ll update the &ldquo;last updated&rdquo; date above whenever this policy
            changes. Significant changes will be noted here in plain language, not buried in
            legalese.
          </p>
        </section>

        <section>
          <h2 className="text-[17px] font-semibold text-ink mb-2">Contact</h2>
          <p>Questions about this policy: {SITE_EMAIL}.</p>
        </section>
      </div>
    </Container>
    </div>
  );
}

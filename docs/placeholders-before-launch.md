# Placeholders Before Launch

Every `[PLACEHOLDER]` marker currently in the live site's copy, in one place, so nothing gets missed before going live. None of these were invented — each is left explicit per the site's content policy (never fabricate facts, metrics, clients, or legal details).

## Legal (Privacy Policy & Terms)

All in `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`:

- Legal entity name (appears 5×: privacy "who we are," terms intro, IP, liability ×2)
- Registered business address
- ~~Privacy/terms contact email~~ — resolved 2026-09-26: support-arvexa@arvexa.com (see `docs/decisions.md`)
- Jurisdiction (governing law)
- Data retention period
- Jurisdiction-specific rights language (GDPR/CCPA etc.) — pending legal review
- Full liability clause — pending legal review
- "Last updated" date (appears on both pages — set on real publish date, not before)
- Analytics provider name (only fills in once one is actually chosen — see `docs/production-readiness.md`)

**These need real legal input, not a copywriting pass** — do not fill in an entity name or jurisdiction without confirming it's correct; an inaccurate Privacy Policy/Terms page is worse than a placeholder one.

## Contact

- ~~`src/components/site/footer.tsx`~~ — resolved 2026-09-26: real contact email wired in as a `mailto:` link (see `docs/decisions.md`)

## About page

- ~~Founder bio and photo~~ — the "Who's behind this" placeholder section was removed from `src/app/about/page.tsx` entirely 2026-09-26, per explicit user request, rather than left as a visible placeholder (see `docs/decisions.md`)

## Portfolio

- `src/data/projects.ts` — AI Content Publisher: `client: null` (renders as "[PLACEHOLDER — not yet confirmed]" on `/work/ai-content-publisher`), plus no screenshots yet. Needs either client naming permission + real images, or a decision to anonymize it the way College Compliance Portal was (see `docs/decisions.md`).

## Environment / infra (not in-page copy, but equally blocking for a real launch)

- `NEXT_PUBLIC_SITE_URL` — currently falls back to the deliberately-fake `https://arvexa.example`. Needs the real domain once purchased.
- Analytics provider wiring (`src/lib/analytics.ts`)
- Lead delivery destination (`deliverLead()` in `src/app/start-a-project/actions.ts`)

## Not a placeholder, but still an open decision

- Adz Lab case study — not currently in the launch portfolio pending publishing permission (names a real client + revenue figures). See `docs/open-questions.md` #12.
- AI Agent / Automation case study — no real project exists yet for this service; Services/Process copy is written to carry the gap honestly rather than imply a project that doesn't exist.
- ~~`/dev/components`~~ — resolved 2026-09-26: deleted (see `docs/decisions.md`).

Cross-reference: `docs/open-questions.md` has the full reasoning/history behind each of these; this file is the flat launch-facing checklist.

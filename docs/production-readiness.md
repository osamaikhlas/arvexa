# Production Readiness — Checkpoint 13

Assessment of what the codebase needs before a real deploy, and an explicit split between "code is ready" and "real-world inputs are needed." This is the Checkpoint 13 (Launch Preparation) deliverable; `docs/placeholders-before-launch.md` is the companion consolidated placeholder list.

## Code readiness: READY

- `npx tsc --noEmit`, `npx eslint src`, `npm run build` all clean as of this checkpoint.
- 24 routes, all static/SSG — no server-only runtime dependency, deploys cleanly to Vercel's default Next.js target with zero config.
- Full route crawl: every real route 200s, broken-link 404s render the custom branded 404 page.
- axe-core: 0 accessibility violations across every route in the site (see `docs/qa-checklist.md`, `docs/seo-analytics-performance-audit.md`).
- SEO: sitemap, robots.txt, per-page canonical + Open Graph + Twitter metadata, a real generated OG image, `Organization` JSON-LD — all present and reading from live data (see `docs/seo-analytics-performance-audit.md`).
- Security review: no hardcoded secrets, no unsafe `dangerouslySetInnerHTML` usage, external links carry `rel="noopener noreferrer"`, form validation is shared client/server (not client-only), honeypot spam field implemented without a layout side-effect. `.gitignore` fixed so `.env.example` isn't silently swallowed by the `.env*` rule.
- Conversion tracking (`trackEvent`) wired through every primary CTA and the form's success/error paths, ready to receive a real analytics provider.

## What is NOT code-ready — requires real-world input before going live

These are not bugs; the code is built to take real values the moment they exist. Nothing here blocks deploying a *working* site — it blocks deploying the *final* one.

| Item | Current state | What's needed | Where it plugs in |
|---|---|---|---|
| **Domain** | Falls back to `https://arvexa.example` (deliberately fake) | Real domain, purchased and pointed at hosting | Set `NEXT_PUBLIC_SITE_URL` env var — see `.env.example`. Nothing else changes. |
| **Hosting** | Not deployed anywhere | A Vercel account (or equivalent) connected to this repo, with billing if traffic needs it | Standard Next.js deploy — `vercel.json`/build config needs no changes |
| **Analytics provider** | `trackEvent()` logs to console in dev, no-ops in prod | Choose one (GA4 / Plausible / PostHog / etc.), add its script + real call | `src/lib/analytics.ts` — the one file that needs editing |
| **Lead delivery** | Form validates and shows success/error UI, but the submission isn't sent anywhere real yet | Real email/CRM destination | `deliverLead()` in `src/app/start-a-project/actions.ts` |
| **Legal entity details** | `[PLACEHOLDER]` throughout `/privacy` and `/terms` (entity name, address, jurisdiction, retention period, liability clause). Contact email resolved 2026-09-26 (support-arvexa@arvexa.com, see `docs/decisions.md`) — the rest still needs real legal input | Real legal review and input — this is not something to fabricate | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| **Founder bio + photo** | Placeholder block on `/about` | Real bio copy + photo | `src/app/about/page.tsx` |
| **Contact email** | `[PLACEHOLDER]` in footer and legal pages | Real inbox to receive inquiries | `src/components/site/footer.tsx` + both legal pages |
| **AI Content Publisher case study** | Client name/screenshots withheld (`client: null` in data) | Client naming permission + real screenshots, or confirm it stays anonymized like College Compliance Portal | `src/data/projects.ts` |
| **Adz Lab publishing permission** | Not in the current launch portfolio | Confirm you're clear to publish the named client + revenue figures, or leave excluded | `docs/open-questions.md` #12 |
| **AI Agent / Automation case study** | Still missing — the weakest-evidenced service | A real project to write up, whenever available | Not blocking launch; Services/Process copy carries this gap for now |

Full detail and reasoning on each item lives in `docs/open-questions.md` (kept current throughout) — this table is the launch-facing summary.

## Deployment decision, explicitly

This session does not have a purchased domain, a connected hosting account with billing, or real third-party credentials (analytics/email/CRM) — so **Checkpoint 14 (Final Launch) will not execute an actual production deploy**. Everything above is prepared so that going live is a matter of supplying the real-world inputs in the table, not writing more code. `docs/launch-checklist.md` gives the exact step-by-step for doing that.

## Internal-only page

`/dev/components` (a component showcase, not part of the marketing site) was deleted 2026-09-26 — the user chose removal over keeping it as an internal reference during the production-readiness pass. See `docs/decisions.md`.

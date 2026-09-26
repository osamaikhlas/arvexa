# Launch Checklist

The exact steps to take this site from "code complete" to "live," once the real-world inputs in `docs/production-readiness.md` and `docs/placeholders-before-launch.md` are in hand. Nothing here was executed by the assistant — no domain, hosting account, or third-party credentials were available in this session. This is the handoff.

## 1. Domain & hosting

1. Buy/point a domain.
2. Create (or use an existing) Vercel account, connect this repo.
3. In Vercel's project settings, set the environment variable `NEXT_PUBLIC_SITE_URL` to the real domain (e.g. `https://arvexa.com`) — see `.env.example` for the exact variable name. This single value drives canonical URLs, sitemap, robots.txt, and Open Graph/JSON-LD across the whole site; nothing else needs to change.
4. Deploy. Build command/framework preset are standard Next.js — no custom `vercel.json` was needed during development.

## 2. Legal pages

1. ~~Get the real entity name, registered address, jurisdiction~~ — resolved 2026-09-26: Arvexa; Ofc # 204 Al Khaleej Towers, Bahria Town Karachi; Pakistan (courts in Karachi); 12-month data retention. Wired into both pages — see `docs/decisions.md`.
2. Still open, by explicit user choice rather than oversight: a reviewed liability clause and jurisdiction-specific GDPR/CCPA rights language. The user asked to remove both placeholders rather than have them drafted unreviewed, so `/terms`' "Limitation of liability" and `/privacy`'s "Your rights" currently end at their real, generic base sentences with nothing further. Add real clauses here only from an actual legal review, not a copywriting pass.
3. ~~Set the real "last updated" date on both pages~~ — set to September 26, 2026, the date the entity/address/jurisdiction data went live. Update again if either page's real content changes before launch.

## 3. Contact & lead delivery

1. Decide the real inbox/CRM that should receive `/start-a-project` submissions.
2. Wire it into `deliverLead()` in `src/app/start-a-project/actions.ts` (currently a stub — the form UI and validation are already fully functional, only the destination is missing).
3. ~~Replace the placeholder contact email~~ — resolved 2026-09-26: support-arvexa@arvexa.com wired into the footer and both legal pages (see `docs/decisions.md`).

## 4. Analytics

1. Choose a provider (GA4 / Plausible / PostHog / other).
2. Add its script and replace the console-log stub in `src/lib/analytics.ts` with a real `trackEvent` call to that provider. Every CTA and form-state transition already calls `trackEvent()` — no call sites need to change, only the implementation of that one function.
3. Once live, update the Privacy Policy's "Analytics" section to name the real provider (currently states "no analytics provider installed," which is accurate today but must be updated the moment this changes).

## 5. Content

All items originally tracked here are resolved:
- ~~Founder bio + photo for `/about`~~ — resolved 2026-09-26: the "Who's behind this" section was removed from About entirely, per explicit user request, rather than left as a placeholder.
- ~~AI Content Publisher case study naming/screenshots~~ — resolved 2026-09-22: `client: "Solo project"`, real live URL, 4 real screenshots.
- ~~Adz Lab publishing permission~~ — resolved 2026-09-21.
- ~~A real AI Agent/Automation case study~~ — resolved 2026-09-22: OPD Reimbursement Workflow (AI Automation) and RAG-Based AI Chatbot (AI Agents, moved to the top of `/work` 2026-09-26).

## 6. Final pre-flight (repeat immediately before flipping DNS)

1. Re-run `npx tsc --noEmit && npx eslint src && npm run build` — confirm still clean after any content edits above.
2. Re-run the axe-core accessibility check (see `docs/qa-checklist.md` for the exact injection method) on any page whose content changed.
3. Grep `src/` for `PLACEHOLDER` — confirm zero remain: `grep -rn "PLACEHOLDER" src/`.
4. ~~Decide on `/dev/components`~~ — resolved 2026-09-26: deleted (see `docs/decisions.md`).
5. Submit the sitemap (`/sitemap.xml`) to Google Search Console once the real domain is live.

## Explicitly out of scope for this session

No live deploy was executed — there was no purchased domain, no connected hosting account with billing, and no real analytics/email/CRM credentials available. Everything above is the exact remaining path once those exist; the codebase itself does not need further engineering work to support them.

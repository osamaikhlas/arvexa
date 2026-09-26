# QA Checklist — Checkpoint 12

Findings from a full pass across the site: automated checks (typecheck/lint/build), a full route crawl, axe-core accessibility audits, a manual re-test of interactive elements, and a security review. Severity legend: **CRITICAL** (breaks the site or exposes data) · **HIGH** (broken user-facing functionality) · **MEDIUM** (real but non-blocking defect) · **LOW** (polish/nice-to-have).

## Automated checks

- `npx tsc --noEmit` — clean.
- `npx eslint src` — clean.
- `npm run build` — clean, 24 routes, all static/SSG (`○`/`●`), no dynamic-render warnings.

## Findings

### HIGH — Broken internal links (FIXED)

`/privacy`, `/terms`, and `/insights` were linked from the global `Nav`/`Footer` since Checkpoint 6/7 but were never built, so every visitor clicking those links got the default unstyled Next.js 404. Found via a full route crawl (script hit every path referenced in `Nav`, `Footer`, and every page body).

**Fix:** built all three pages (real, policy-accurate Privacy/Terms content with `[PLACEHOLDER]` markers on entity-specific details; an honest "coming soon" Insights index sourced from `docs/strategy-summary.md`'s real planned topics — no fabricated posts). Added a custom branded `not-found.tsx` so any future broken link fails gracefully instead of showing the bare framework default. Added all three routes to `sitemap.ts`. Re-crawled: all real routes now 200, only a deliberately-nonexistent test path 404s (confirming the check and the new 404 page both work).

### MEDIUM — WCAG AA color-contrast failures (FIXED, Checkpoint 11)

21 nodes failed under axe-core on first run. Root causes and fixes documented in full in `docs/seo-analytics-performance-audit.md`; re-run after fix: 0 violations sitewide, including on the 4 pages checked at Checkpoint 12 (`/insights`, `/privacy`, `/terms`, 404).

### LOW — `.gitignore` would have silently excluded `.env.example` (FIXED)

`.gitignore` had a blanket `.env*` rule, which also matches `.env.example` — the file that documents which environment variables a deploy needs (`NEXT_PUBLIC_SITE_URL`). Since nothing has been committed yet, this would have meant the file silently never made it into git, and a future clone of the repo would have no record of the required env vars. Fixed by adding `!.env.example` immediately after the blanket rule. Verified `.env.example` itself contains no real secrets (it's a template with a placeholder/fallback domain only).

### Checked, no issue found

- **`target="_blank"` external links**: only one exists (`work/[slug]/page.tsx`'s "Live" project link) and it already carries `rel="noopener noreferrer"` (reverse-tabnabbing protection).
- **Hardcoded secrets/API keys**: none found (`grep` across `src/` for key/secret/password/token literal patterns — no matches).
- **`dangerouslySetInnerHTML` usage**: exactly one use, in `layout.tsx` for the `Organization` JSON-LD script tag. Input is `JSON.stringify()` of a static internal object — not user input, not an XSS vector.
- **`localStorage`/`sessionStorage`/cookies**: none used anywhere in `src/` — matches what the new Privacy Policy states.
- **Form validation**: `start-a-project` uses one Zod schema shared identically between client (`useActionState`) and server (`"use server"` action) — no client-only validation that a direct POST could bypass. Honeypot field uses `sr-only` (screen-reader-hidden but still in normal layout flow), not off-screen absolute positioning, so it can't widen the page's scrollable area.
- **RSC boundary correctness**: no component references or functions passed as props into Client Components (the two real bugs of this kind, in `ServiceCard`'s icon prop and `start-a-project/actions.ts`'s exported constant, were both already found and fixed pre-Checkpoint-11).

## Accessibility (axe-core, live CDN injection, real rendered DOM)

Re-verified on all newly-built Checkpoint 12 pages in addition to the full Checkpoint 11 sweep:

| Page | Violations |
|---|---|
| `/insights` | 0 |
| `/privacy` | 0 |
| `/terms` | 0 |
| 404 (`not-found.tsx`) | 0 |

Combined with the Checkpoint 11 sweep (homepage, work index + 3 case studies, services index + 4 service pages, process, about, start-a-project — 0 violations after the contrast/heading-order/link-in-text-block fixes), every route in the site has now been checked with axe-core at least once.

**Not done, and why:** a manual screen-reader pass (VoiceOver/NVDA) and a real Lighthouse run were not performed — both require either a human listening session or a Chrome DevTools/CLI environment not available here. axe-core catches the large majority of WCAG failures programmatically, but it's not a substitute for either; flagging this explicitly rather than claiming full accessibility coverage. See `docs/seo-analytics-performance-audit.md` for the same caveat as it applied at Checkpoint 11.

## Route crawl

All build-time routes plus the dynamic `/work/[slug]` and `/services/[slug]` params return 200. `/dev/components` (the internal component showcase page) was deleted 2026-09-26 per explicit user decision during the production-readiness pass — see `docs/decisions.md`. The `disallow: "/dev/"` rule in `robots.ts` was left in place as a harmless safety net even though no route matches it now.

## Interactive elements re-tested

- `/work` category filters — functional, verified at Checkpoint 9.
- `/start-a-project` form — full submit flow (pending/success/error states, validation errors, honeypot) verified at Checkpoint 10.
- Nav mobile menu, all CTA buttons (11 instances via `CtaButton`, each firing `trackEvent`) — verified at Checkpoints 10–11.
- New this checkpoint: `/insights`, `/privacy`, `/terms` pages and the 404 page's two CTAs ("Back to Home", "Explore Our Work") — visually verified in-browser, both links functional.

## Outcome

Checkpoint 12 (QA & Production Readiness) work is complete. No CRITICAL or unresolved HIGH findings remain. Proceeding to Checkpoint 13 (Launch Preparation).

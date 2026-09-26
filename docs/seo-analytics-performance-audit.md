# SEO, Analytics & Performance Audit — Checkpoint 11

Status: DRAFT for approval. This is the required audit deliverable for Checkpoint 11 — what was implemented, what was tested with real tooling (not just inspection), and what's found but not yet fixed.

## What Was Implemented

**Metadata infrastructure**
- `src/lib/site.ts` — `SITE_URL`/`SITE_NAME`/`SITE_DESCRIPTION` constants and a `pageMetadata()` helper that builds canonical URL + matching OpenGraph/Twitter tags from one call, used on all 8 pages with metadata (5 static + 3 dynamic via `generateMetadata`).
- Root layout: `metadataBase`, a title template (`%s — Arvexa`), default OpenGraph/Twitter, `robots: { index: true, follow: true }`.
- Case-study pages additionally set a real project screenshot as their OG image when one exists (currently Manza only), instead of the generic site-wide one.

**Structured data** — `Organization` JSON-LD in the root layout (name, url, description, logo).

**Sitemap & robots** — `src/app/sitemap.ts` (dynamic, includes every static route + all service/case-study slugs from data) and `src/app/robots.ts` (allows all, explicitly disallows `/dev/`, points to the sitemap).

**Open Graph image** — `src/app/opengraph-image.tsx`, generated via `next/og`'s `ImageResponse` from the real icon file and brand tokens, since no designed OG image was ever supplied. Not a placeholder graphic — it's the real logo and real headline copy, just composited at request time instead of hand-designed.

**Conversion tracking** — every primary CTA site-wide now routes through one component, `site/cta-button.tsx`, which fires `trackEvent("cta_click", { id, href })` before navigating. Converted 11 CTA instances across home, nav (desktop + mobile), about, process, both service-page CTAs, and the case-study CTA. Combined with the Checkpoint 10 form-submission tracking, every conversion point on the site now emits an event.

## Audits

### Accessibility — automated, not just inspection

Ran [axe-core](https://github.com/dequelabs/axe-core) 4.9.1 (loaded live via CDN into the actual rendered pages, not a static analysis) against every page type: home, `/work`, all 3 case studies, `/services`, 2 service detail pages, `/process`, `/about`, `/start-a-project`.

**Two real violations found and fixed, not just noted:**
1. **`color-contrast`, 21 nodes on the homepage alone.** Root cause: `--ink-faint` (#8b9088) didn't clear 4.5:1 against any of our light surfaces, and the plain `--accent` (#2563EB) didn't clear 4.5:1 when used as text on the fixed-dark `surface-inverse` blocks (Evolve stage, "How We Use AI" section). Fixed at the token level: darkened `--ink-faint` to `#656b64` (verified ≥4.5:1 against all three light surfaces it's used on), and added a new fixed `--accent-inverse` (`#5b8def`) token specifically for accent-colored text on the dark-emphasis blocks, verified ≥4.5:1 against `surface-inverse`. Full math kept in `docs/decisions.md`.
2. **`link-in-text-block` on `/about`.** An inline link ("Process page") inside a paragraph was distinguished from body text by color alone. Fixed by adding an underline.
3. **`heading-order` on all 3 case-study pages.** `CaseStudySection`'s heading was an `<h3>` directly under the page's `<h1>`, skipping `<h2>` — and a genuine `<h2>` appeared later for the CTA, making the order invalid. Fixed by changing the section heading to `<h2>` (correct semantically too — these are the page's top-level content sections, not sub-sections of something else).

**Re-ran axe after each fix**: 0 violations across all 9 page types checked, final pass.

**Not covered by this pass** (worth knowing, not a gap I silently papered over): axe-core catches roughly 30–50% of WCAG issues by design — it can't judge whether alt text is *meaningful*, whether tab order is *logical*, or whether a screen reader's actual spoken experience makes sense. Manual keyboard-only and screen-reader passes are a Checkpoint 12 QA item, not done here.

### SEO

- Every page has a real, distinct `title`/`description` and a canonical URL — verified by curling the rendered HTML, not just reading the source (`curl localhost:3002/work | grep canonical` → confirmed present and correct).
- `sitemap.xml` and `robots.txt` both verified live (curled, not just code-reviewed) — sitemap includes all 6 static routes + 4 service slugs + 3 project slugs; robots correctly excludes the internal `/dev/` showcase route from indexing.
- Single H1 per page, sequential heading levels (now enforced — see the case-study fix above).
- Internal linking is already strong: nav + footer sitewide, case studies cross-link from services (the AI Rescue page's "Where we've done this"), services cross-link from case studies indirectly via category, every page ends in a CTA.
- **Known gap, not fixed here**: `SITE_URL` is a placeholder (`https://arvexa.example`) until a real domain is confirmed (`docs/open-questions.md` #3) — every canonical URL, sitemap entry, and OG URL is currently wrong in a way that only matters once this goes live publicly. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) before launch — nothing else needs to change.
- **Known gap**: no `/insights` content yet, so the site has no content targeting the longer-tail SEO themes listed in `docs/strategy-summary.md` (e.g., "why AI-generated apps break in production"). Out of scope for this checkpoint per the IA's lower priority on Insights.

### Performance

- Every page is statically generated (`npm run build` output confirms `○`/`●` — static or SSG — for all 21 routes; zero server-rendered-per-request pages).
- Real images (`Manza`'s screenshots) go through `next/image`, which handles responsive sizing/lazy-loading/format negotiation automatically — verified this was already the case from Checkpoint 8, unchanged here.
- All 3 fonts load via `next/font` (self-hosted at build time, not a runtime Google Fonts request) — confirmed in `src/lib/fonts.ts`, unchanged from Checkpoint 6.
- Client JS is code-split per route by Next.js automatically; total combined chunk size across the whole app is ~1.2MB uncompressed (`du -ch .next/static/chunks`), the largest single chunk ~392KB. This is a rough aggregate signal, not a precise per-route "First Load JS" figure — this Next.js/Turbopack version's CLI doesn't print that table the way older Next did, and adding `@next/bundle-analyzer` just for one audit read felt like the wrong tradeoff (a new dependency for a one-time number). If precise per-route figures matter before launch, that's a 5-minute add later, not a blocker now.
- No heavy client-side libraries beyond Framer Motion (used deliberately, per `docs/brand-system.md`'s motion principles) and lucide-react (tree-shakeable, only the icons actually imported are bundled).
- **Not done**: an actual Lighthouse run or Core Web Vitals measurement against a deployed instance — this environment doesn't have Lighthouse tooling available, and synthetic scores from a local dev server aren't representative anyway. Recommend running this once deployed to a real Vercel preview (Checkpoint 13/14 territory).

### Analytics

- `trackEvent()` (Checkpoint 10) is called at every conversion point now: 11 CTA click sites plus form-submit success/error (Checkpoint 10). Verified live in-browser: clicking the homepage hero CTA fired `[analytics] cta_click {id: "hero-start-project", ...}` in the console before navigation occurred.
- **Still no real analytics provider** (`docs/open-questions.md` #6, unchanged) — every event currently only logs in dev and no-ops in production. This was a known, deliberate deferral since Checkpoint 10, not new.

## What's Left Open

- Real domain → `NEXT_PUBLIC_SITE_URL` (blocks correct canonical/sitemap/OG URLs).
- Real analytics provider (blocks any of this tracking actually reaching anywhere).
- Manual keyboard/screen-reader accessibility pass (Checkpoint 12).
- Lighthouse/Core Web Vitals against a real deployment (Checkpoint 13/14).
- `/insights` content (lower priority per IA, not blocking launch per the checkpoint sequence).

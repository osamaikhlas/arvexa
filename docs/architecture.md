# Architecture

Status: DRAFT for Checkpoint 6 approval. First checkpoint with real code — this documents what exists. Update this file whenever the architecture changes; don't let it drift from `src/`.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Radix UI primitives (Tabs, Accordion, Slot) · class-variance-authority (component variants) · Framer Motion (installed, not yet used — reserved for Checkpoint 7 process-explaining motion per `docs/brand-system.md`) · lucide-react (icons) · next/font (Fraunces, IBM Plex Sans, IBM Plex Mono). Matches the Checkpoint 0 assumption, now confirmed by actually building against it rather than staying speculative.

No headless CMS, no database yet. As of Checkpoint 8, project/case-study content lives in a typed data file (`src/data/projects.ts`) rather than hardcoded per-page — a lightweight content layer, not a CMS. Everything else (services, process copy) is still inline in page components.

## Folder Structure

```
src/
├── app/                    — routes (App Router)
│   ├── layout.tsx          — root layout: fonts + Nav/Footer mounted globally
│   ├── globals.css         — design tokens (mirrors docs/brand-system.md)
│   ├── icon.png / apple-icon.png — favicon (Next.js file convention)
│   ├── page.tsx            — the real homepage (Checkpoint 7)
│   ├── work/page.tsx       — Work index with category filtering (Checkpoint 8)
│   ├── work/[slug]/page.tsx — case-study detail, statically generated per project (Checkpoint 8)
│   ├── services/page.tsx   — Services index (Checkpoint 9)
│   ├── services/[slug]/page.tsx — 4 service detail pages (Checkpoint 9)
│   ├── process/page.tsx    — AI→Production framework, expanded (Checkpoint 9)
│   ├── about/page.tsx      — company belief, AI transparency, founder-bio placeholder (Checkpoint 9)
│   ├── start-a-project/    — lead form: page.tsx, schema.ts (Zod), actions.ts (Server Action), start-project-form.tsx (Checkpoint 10)
│   └── dev/components/     — internal-only component showcase, not part of the site IA
├── components/
│   ├── ui/                 — generic, content-agnostic primitives
│   └── site/                — Arvexa-specific composed components (know about nav links, services, projects, etc.)
├── data/
│   ├── projects.ts          — typed project/case-study content — see docs/project-data-needed.md for what's still placeholder
│   ├── services.ts          — the 4 services, sourced from docs/positioning.md / docs/strategy-summary.md
│   └── process.ts           — the 7 process stages, expanded from site/framework-row.tsx's FRAMEWORK_STAGES
├── types/
│   └── project.ts           — Project/CaseStudyContent types, mirrors docs/case-study-framework.md's schema exactly
└── lib/
    ├── fonts.ts             — next/font Google Font exports
    ├── utils.ts             — cn() class-merge helper
    └── analytics.ts         — provider-agnostic trackEvent() stub (Checkpoint 10)
```

`ui/` vs `site/`: a `ui/` component takes no opinion about Arvexa content (a `Button` doesn't know what "Start a Project" is); a `site/` component does (`Nav` hardcodes the real nav links). This is the line that keeps `ui/` reusable and `site/` from becoming a pile of one-off page fragments.

## Design Tokens → Code

`src/app/globals.css` implements the tokens from `docs/brand-system.md` exactly — same names, same light/dark values — via CSS custom properties, mapped into Tailwind's `@theme inline` so they're usable as ordinary utility classes (`bg-surface-100`, `text-ink-soft`, `rounded-md`, `gap-6`, etc.), not ad-hoc hex codes scattered through components. Dark mode follows the three-state pattern (bare `:root`, `prefers-color-scheme` media query, explicit `[data-theme="dark"]` override) — matches the artifact-design convention used for the Checkpoint 4/5 mockups, so there's no visual drift between the approved mockup and the real build.

## Component Inventory

### `ui/` (12 components — generic primitives)

| Component | File | Notes |
|---|---|---|
| Button | `button.tsx` | primary/secondary/ghost variants, `asChild` (via Radix Slot) for link-styled-as-button |
| Badge | `badge.tsx` | the chip/tag — always mono face, 4 variants incl. `signature` |
| Card, CardHeader, CardTitle, CardContent, CardFooter | `card.tsx` | base surface primitive |
| Container | `container.tsx` | page-width wrapper (max 1312px) |
| Section, SectionEyebrow, SectionHeading | `section.tsx` | owns section vertical rhythm + tone (default/raised/inverse) |
| Heading, Text, Label | `typography.tsx` | the full type scale as components, not loose utility classes |
| Tabs, TabsList, TabsTrigger, TabsContent | `tabs.tsx` | Radix-based, keyboard accessible |
| Accordion, AccordionItem, AccordionTrigger, AccordionContent | `accordion.tsx` | Radix-based, animated height via CSS keyframes |
| Input, Textarea, Select, Field | `input.tsx` | form primitives; `Field` wires label/hint/id — the shape Checkpoint 10's qualification form will use |
| DiagramStage, DiagramArrow | `diagram.tsx` | the site-wide architecture-diagram grammar from `docs/brand-system.md` |

### `site/` (7 components — Arvexa-specific)

| Component | File | Notes |
|---|---|---|
| Nav | `nav.tsx` | resolves the mobile-menu gap flagged in `docs/homepage-design.md` — real open/close state, Escape-to-close, full CTA parity with desktop |
| Footer | `footer.tsx` | site/legal/contact columns |
| ServiceCard | `service-card.tsx` | the 4 homepage service cards, `signature` prop for AI Rescue |
| ProjectCard | `project-card.tsx` | Work/case-study card; shows `[Screenshot placeholder]` honestly when no image is supplied |
| StatTile | `stat-tile.tsx` | one Proof-section number |
| FrameworkRow | `framework-row.tsx` | all 7 AI→Production stages; exports `FRAMEWORK_STAGES` as data, not just markup, so Process (Checkpoint 9) can reuse the same source of truth |
| CaseStudySection | `case-study-section.tsx` | one block of the 8-part case-study template (`docs/case-study-framework.md`) — built once, reused per section on every future `/work/[slug]` page |

Every component here was built because the homepage mockup (Checkpoint 5) or the case-study/service page requirements (Checkpoints 3, 9, 10) actually need it — nothing speculative.

## Checkpoint 7 Update — Core Website Implementation

`Nav` and `Footer` are now mounted in `src/app/layout.tsx` (real site chrome on every route). `src/app/page.tsx` is the real homepage — all 9 sections from `docs/homepage-design.md`, built entirely from the Checkpoint 6 component library plus one new homepage-specific component, `site/hero-flow.tsx` (the hero's "Prototype → Production" visual — real enough in structure to warrant its own file rather than inline JSX).

**Real bug found and fixed via actual browser testing, not just build success**: the "always dark for emphasis" elements (Evolve framework stage, hero's "Production" box, "How We Use AI" section) were built using the theme-*relative* `ink`/`surface` tokens. Under system dark mode, those tokens flip — so the panels meant to look like a fixed dark emphasis block instead inverted to near-white with invisible text. Fixed by adding a separate fixed `surface-inverse`/`ink-inverse` token pair that never changes with theme (see `docs/decisions.md`). This is exactly the class of bug `npm run build` and `tsc --noEmit` cannot catch — both passed the whole time this bug was live, since it's a runtime CSS/theme issue, not a type or compile error.

## Post-Checkpoint-7 Update — Real Logo & Accent Repaint

A real logo (user-supplied) replaced the text wordmark in `Nav`/`Footer`/favicon (`src/components/site/logo.tsx`, new), and the site's `--accent` token was repainted from teal to the logo's blue at the user's direction. Both are logged in detail in `docs/decisions.md` — not repeated here. Net effect on this file: `logo.tsx` is a new `site/` component; no other structural change.

## Checkpoint 8 Update — Portfolio & Case Studies

New content layer: `src/types/project.ts` (the `Project`/`CaseStudyContent` types, mirroring `docs/case-study-framework.md`'s schema exactly) and `src/data/projects.ts` (the 3 launch projects as typed data, single source of truth — the homepage's Selected Work section now imports from here instead of duplicating project facts inline).

New routes: `/work` (index, category filtering via the new `site/work-filter.tsx` client component) and `/work/[slug]` (case-study detail, statically generated per project via `generateStaticParams`, all 8 template sections from `docs/case-study-framework.md` rendered through the existing `CaseStudySection` component).

**Manza is the fully-real reference case study** for this checkpoint's "review at least one complete real case study" requirement — its 4 screenshots were pulled from the original case-study artifact's asset store into `public/case-studies/manza/`, and it has a real linked `liveUrl`. The other two launch projects still show honest placeholders where facts are genuinely unconfirmed (see `docs/project-data-needed.md`), per the schema's design: a missing `client`/`images`/`liveUrl` renders as visible, honest placeholder text rather than being silently omitted or invented.

**Decision made, not just deferred**: the College Compliance Portal / SMGSC Portal duplicate (open since Checkpoint 1) was resolved by choosing the anonymized draft as canonical — see `docs/decisions.md` for the reasoning and how to switch to the named version later if permission comes through.

## Checkpoint 9 Update — Services, Process & About

New data files: `src/data/services.ts` (4 services, including AI Rescue's extra `problems`/`auditAreas` fields) and `src/data/process.ts` (the 7 AI→Production stages expanded with activities/outputs/client-involvement — `label` and `purpose` are pulled directly from `FRAMEWORK_STAGES` in `site/framework-row.tsx` via a small `pick()` helper, so the Process page can never say something different from what the homepage already says about the same stage).

New routes: `/services` (index), `/services/[slug]` (4 statically-generated service pages), `/process`, `/about`. AI Rescue's page cross-links the two launch case studies with real hardening stories (AI Content Publisher, College Compliance Portal) manually rather than through category-filtered related-work, since "AI Rescue & Production Hardening" isn't a `Project.category` any current project actually carries — see `docs/decisions.md` if this needs a cleaner mechanism later once real Rescue-engagement projects exist.

New shared component: `site/ai-transparency.tsx`, extracted from the homepage's "How We Use AI" section so About doesn't hand-copy it — both pages now read from one set of AI-assists/human-handles lists.

**Caught during review, not shipped broken**: the AI Rescue service page initially showed "Signature offer" twice (a badge pill and a duplicate mention baked into the eyebrow text). Fixed by simplifying the eyebrow to just "Service 03" and letting the badge carry that label alone.

## Checkpoint 10 Update — Lead Generation & Contact System

`/start-a-project` is a real, working form: Zod schema shared between client and server (`schema.ts`), a Next.js Server Action (`actions.ts`) using React 19's `useActionState`, field-level validation errors, a honeypot for spam protection, and distinct pending/success/error UI states. `Field` (`ui/input.tsx`) gained an `error` prop for this.

**No real lead destination or analytics provider is wired up** (never confirmed — docs/open-questions.md item 6) — `deliverLead()` in `actions.ts` currently just logs server-side, and `src/lib/analytics.ts`'s `trackEvent()` no-ops in production. Both are single functions to swap once a provider is chosen; nothing else in the codebase needs to change.

**Real bug caught and fixed via actual browser testing**: `actions.ts` initially exported `initialActionState` as a plain object alongside `"use server"`, which Next.js rejects outright (a "use server" file may only export async functions) — the page crashed on first load with a clear runtime error. Fixed by moving that initial state into the client component instead.

## Post-Checkpoint-10 Update — Hero Animation, Icons & Motion Pass

Framer Motion (installed since Checkpoint 6, unused until now) is now actually in use: `HeroFlow` animates on mount with a looping flow-dot detail; `ServiceCard`, `ProjectCard`, and the new `WhyArvexaCard` all get a hover-lift; `ProjectCard` zooms its image slightly on hover; `StatTile` counts up to its real value when scrolled into view. `ServiceCard` also gained an `icon` slot, wired from a new `icon` field on `Service` (`data/services.ts`, lucide-react).

**Real bug caught by the production build, not just visual review**: passing a Lucide icon *component* from the Server Component homepage into the Client Component `ServiceCard` failed the build ("Functions cannot be passed directly to Client Components"). Same category as the Checkpoint 10 `"use server"` bug — a React Server Components boundary rule. Fixed by rendering the icon to a `ReactNode` at the server call site instead of passing the component reference. See `docs/decisions.md` for the two declined pasted-in components (a 3D robot mascot, a gamified LEGO tech-stack picker) that prompted building this custom animation instead.

## Checkpoint 11 Update — SEO, Analytics & Performance

New: `src/lib/site.ts` (site constants + `pageMetadata()` helper), `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx` (generated via `next/og` from the real icon file, not a designed asset — none existed), `Organization` JSON-LD in the root layout, and `site/cta-button.tsx` (every primary CTA now fires a `cta_click` analytics event before navigating — 11 instances converted).

**Two real WCAG AA contrast failures and one heading-order bug found by an actual axe-core pass** (not just inspection) and fixed at the root: `--ink-faint` was too light against every surface it's used on (fixed by darkening the token); the fixed-dark "inverse" blocks' accent text failed contrast (fixed with a new `--accent-inverse` token); `CaseStudySection` skipped from `<h1>` straight to `<h3>` (fixed to `<h2>`). Full math and re-verification in `docs/seo-analytics-performance-audit.md` — re-ran axe after every fix, 0 violations across all 9 page types checked.

`SITE_URL` deliberately falls back to `https://arvexa.example` (an IANA-reserved placeholder TLD) rather than a guessed real-looking domain, since none is confirmed yet (`docs/open-questions.md` #3) — see `.env.example` for the override.

## What's Deliberately Not Built Yet

- `/insights` route — lower priority per the IA, no checkpoint explicitly requires it before launch prep.
- No MDX/content layer, no CMS for services/process/about copy — still inline data files, not a CMS.
- Real analytics provider and real lead-delivery destination — see Checkpoint 10 Update above; Checkpoint 11 added the tracking calls, not the provider.
- Real domain (`NEXT_PUBLIC_SITE_URL`) — see above.

## Verification

`npx tsc --noEmit` — clean. `npm run build` — succeeds; 21 routes total (added `/opengraph-image`, `/robots.txt`, `/sitemap.xml` in Checkpoint 11), all statically prerendered. `npx eslint src` — clean. Checkpoint 11 additionally verified: sitemap/robots/OG-image curled directly against the dev server (not just code-reviewed) and confirmed correct; meta tags (canonical, OG, Twitter) grepped out of rendered HTML per page; conversion tracking confirmed firing live in-browser before navigation; axe-core run against all 9 page types, 0 violations after fixes. Full detail in `docs/seo-analytics-performance-audit.md`.

Checkpoint 10's verification (form validation/success/error states) and Checkpoint 9's/8's carry forward unchanged.

**Known verification gap** (carried from Checkpoint 7, unchanged): live screenshot testing at true tablet/mobile viewport widths hit a Chrome extension issue in this environment (the resize tool reported success but the tab's actual `window.innerWidth` never changed) — confirmed via direct `window.innerWidth` checks after each resize attempt, not just assumed. Responsive behavior at those widths is verified by code review instead (mobile-first Tailwind classes throughout), not by an actual rendered screenshot at those widths. Worth a follow-up visual pass once the browser tooling is reliable again, before Checkpoint 12 QA.

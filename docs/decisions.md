# Decision Log

One entry per significant decision. Read this before re-litigating something already settled.

---

**Decision**: Company name is Arvexa.
**Date**: 2026-09-20 (Checkpoint 0/1)
**Reason**: Confirmed by user; the source strategy doc never names the company itself.
**Alternatives considered**: none — user-supplied.
**Impact**: baked into all copy, metadata, and the design system.

---

**Decision**: `/services/ai-rescue` is the signature landing page itself (no separate `/ai-production-audit` route at launch).
**Date**: 2026-09-20 (Checkpoint 0)
**Reason**: The operating prompt's IA and the source doc's §10 describe the same page two ways; one strong page beats two thin, near-duplicate ones.
**Alternatives considered**: separate audit-specific landing page.
**Impact**: `docs/information-architecture.md` sitemap. Revisit only if conversion data later argues for splitting the traffic.

---

**Decision**: Lead the portfolio and homepage narrative with the RESCUE/hardening story, not a from-scratch-AI-build story.
**Date**: 2026-09-20 (Checkpoint 1)
**Reason**: The real project evidence gathered (AI Content Publisher's documented production incidents, College Compliance Portal's audit-and-fix passes, Manza's measured before/after cleanup) is unusually strong "evaluate → harden" proof — stronger than generic AI-product demo framing would be.
**Alternatives considered**: lead with AI Content Publisher purely as a "we build AI products" showcase.
**Impact**: `docs/positioning.md` Differentiation section; carried into the Checkpoint 5 homepage mockup's "Why Arvexa" section and Service card ordering.

---

**Decision**: Recommended launch portfolio is 3 projects (AI Content Publisher, College Compliance/SMGSC reconciled, Manza), not all 6 candidates.
**Date**: 2026-09-20 (Checkpoint 3)
**Reason**: Source doc explicitly warns against letting Web & SaaS work overpower the AI positioning; 3 of 6 real projects are web-only with no AI component.
**Alternatives considered**: feature all 5-6 real projects for volume.
**Impact**: `docs/project-data-needed.md`. Still a recommendation, not locked — user can override.

---

**Decision**: Tech stack confirmed and built: Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind v4 + Radix UI primitives + class-variance-authority + Framer Motion + lucide-react, on Vercel.
**Date**: 2026-09-20 (Checkpoint 6)
**Reason**: Matches the Checkpoint 0 assumption; confirmed by actually scaffolding and building against it rather than staying speculative. Radix chosen for Tabs/Accordion specifically for real keyboard accessibility (matches the design system's accessibility principles) rather than hand-rolling less-accessible equivalents.
**Alternatives considered**: none seriously — this was the stated default and no reason emerged to deviate.
**Impact**: `docs/architecture.md`. All future checkpoints build on this.

---

**Decision**: Design tokens implemented as CSS custom properties mapped through Tailwind's `@theme inline`, exactly mirroring `docs/brand-system.md` names/values — not a separate parallel token system.
**Date**: 2026-09-20 (Checkpoint 6)
**Reason**: Keeps the approved Checkpoint 4 design system and the real codebase from drifting apart.
**Alternatives considered**: a JS/TS token object consumed via a Tailwind plugin — more indirection for no real benefit at this project's size.
**Impact**: `src/app/globals.css`, every component in `src/components/`.

---

**Decision**: Added a fixed, non-theme-swapping `surface-inverse`/`ink-inverse` token pair, separate from `surface-100`/`ink`, for "always dark" emphasis blocks (the Evolve framework stage, the hero's "Production" box, the "How We Use AI" section).
**Date**: 2026-09-20 (Checkpoint 7)
**Reason**: Caught in live browser testing under system dark mode — using the theme-relative `ink`/`surface` tokens for a deliberately-dark emphasis panel meant the panel inverted to near-white with invisible text once the whole page's theme flipped. The two concepts ("the page is in dark mode" vs. "this one block is always dark for visual emphasis") need different tokens.
**Alternatives considered**: hardcoding literal hex values inline at each usage site — rejected, would've meant three separate untracked hardcodes instead of one named token pair.
**Impact**: `src/app/globals.css`, `src/components/ui/section.tsx`, `src/components/ui/diagram.tsx`, `src/components/site/hero-flow.tsx`, `src/app/page.tsx`. Worth remembering for any future "always dark/light regardless of page theme" UI.

---

**Decision**: Integrated the real logo supplied by the user (`logo/image.png` brand sheet — full lockup, icon, light/dark variants, primary blue `#2563EB`) into `Nav`, `Footer`, and the site favicon, replacing the text-only wordmark from Checkpoints 4–7.
**Date**: 2026-09-20 (post-Checkpoint 7, user-directed: "use these as logo")
**Reason**: Real supplied brand assets take priority over a placeholder text wordmark. Extracted usable light-background and dark-background transparent crops from the composite sheet via Pillow (chroma-keying the flat background fills), since only a composite style-sheet and two full-lockup exports were provided, not individually-exported light/dark/icon files.
**Scope of what changed vs. what didn't**: swapped the wordmark *image* only. Did **not** change the site's teal accent token (`#0E7C6B`/`#3FCDB4`) approved in Checkpoint 4, even though the logo's blue (`#2563EB`) doesn't match it — that's a bigger call (touches the whole design system, every component using `accent`, the published Checkpoint 4/5 artifacts) than "use these as logo" clearly authorized. Flagged to the user as an open decision, not silently resolved either way.
**Alternatives considered**: recoloring the entire site accent to match the logo's blue in the same pass — rejected as scope creep beyond the literal request; the user can decide once they see both.
**Impact**: `src/components/site/logo.tsx` (new), `src/components/site/nav.tsx`, `src/components/site/footer.tsx`, `src/app/icon.png`, `src/app/apple-icon.png`, `public/logo/*`. Source files the user provided are untouched in `logo/` at repo root; only derived/processed crops were copied into `public/logo/` and `src/app/`.
**Superseded**: see the next entry — user resolved this the same session ("yes do it same").

---

**Decision**: Repainted the site's UI accent from teal (`#0E7C6B`/`#3FCDB4`) to the logo's blue (`#2563EB` light / `#5B8DEF` dark, `#1D4ED8`/`#8FB4FF` for the hover-strong variant, `#EFF4FE`/`#13223E` for the soft-tint variant).
**Date**: 2026-09-20 (user-directed: "yes do it same")
**Reason**: Full brand consistency between the real logo and the site UI, explicitly requested after being asked to choose between keeping teal or matching the logo.
**How**: changed only the `--accent`/`--accent-strong`/`--accent-soft` values in `src/app/globals.css` (all three theme blocks: light `:root`, the dark media query, and the explicit `[data-theme="dark"]` override) — every component already consumed these as tokens (`bg-accent`, `text-accent`, `border-accent`, etc.), so no component code needed to change. Dark-mode values are brightened versions of the logo blue, not the literal `#2563EB`, since the logo sheet never defined a separate dark-UI shade and the raw blue is borderline on WCAG contrast against the site's near-black dark background.
**Verified**: `tsc`/`eslint`/`build` clean; confirmed visually across hero, framework stages, services, work cards, and footer in the browser — no leftover teal hex values anywhere in `src/` or `docs/` (grepped to confirm).
**Impact**: `src/app/globals.css` only. `docs/brand-system.md` Color section updated to match; the published Checkpoint 4 design-system artifact (tokens.json/README) updated to match, so it stops being a stale reference.

---

**Decision**: Resolved the College Compliance Portal / SMGSC Portal duplicate by building the case study on the anonymized draft (`QZtYQ2PrznA2xHrGrLup45`) — no named college, no specific circular number, no linked live URL — rather than the named "SMGSC Portal" draft.
**Date**: 2026-09-20 (Checkpoint 8)
**Reason**: Permission to name the real college and cite the specific regulatory circular was never confirmed (tracked since Checkpoint 1). The anonymized draft is a complete, internally consistent version on its own — safer default per the source doc's "never publish without permission" content policy. Also withheld the `liveUrl` from the case study for the same reason: linking to the real site would immediately reveal the name the text is deliberately withholding, making the anonymization pointless.
**Alternatives considered**: blending the named draft's more specific stats (672+250 tests, 8 roles) with the anonymized framing — rejected as inconsistent Frankenstein-ing of two drafts with different confidence levels; used one draft's numbers wholesale instead.
**Impact**: `src/data/projects.ts`. Easy to swap to the named framing later if permission is confirmed — flagged in `docs/project-data-needed.md` as a one-line ask, not a rebuild.

---

**Decision**: Pulled Manza's 4 real screenshots out of its original case-study artifact and into the live site (`public/case-studies/manza/*.jpg`), making it the one fully-real, placeholder-free case study for Checkpoint 8.
**Date**: 2026-09-20 (Checkpoint 8)
**Reason**: The checkpoint calls for reviewing "at least one complete real case study" — Manza was the only project with exportable real images already sitting in prior artifact data, so it became the concrete proof-of-system example rather than building all three around placeholders equally.
**Impact**: `public/case-studies/manza/`, `src/data/projects.ts`. `docs/project-data-needed.md` Manza checklist fully checked off except optional items (video, business metrics).

---

**Decision**: Built `/start-a-project`'s lead delivery as a single swappable function (`deliverLead()` in `src/app/start-a-project/actions.ts`) that currently logs server-side, rather than integrating a real email/CRM provider or leaving the form non-functional.
**Date**: 2026-09-20 (Checkpoint 10)
**Reason**: No form backend/CRM was ever confirmed (docs/open-questions.md item 6) and fabricating credentials for a real provider isn't an option. Logging server-side is the honest middle ground — the form is genuinely functional end-to-end (validates, protects against spam, shows real success/error states) and testable now, while the one piece that requires a real decision (where leads actually go) stays isolated to one function.
**Alternatives considered**: leaving the form unbuilt until a provider is chosen — rejected, since every CTA on the site already links here and the checkpoint explicitly asks to test the full conversion flow.
**Impact**: `src/app/start-a-project/`. Same pattern for analytics: `src/lib/analytics.ts`'s `trackEvent()` no-ops in production until a provider is wired in.

---

**Decision**: Proposed and shipped default timeline/budget ranges for the lead form (the source doc explicitly left these for us to set).
**Date**: 2026-09-20 (Checkpoint 10)
**Reason**: Checkpoint 10 needed working `<select>` options; the source doc said "use ranges appropriate to your target market" without specifying them. Chose ranges appropriate for a small/solo engineering practice (Under $5,000 up to $40,000+), consistent with the founder-led positioning established in Checkpoint 0.
**Alternatives considered**: blocking the form on user input for exact ranges — rejected, low-stakes to change later, blocking would stall the whole checkpoint over a data value.
**Impact**: `src/app/start-a-project/schema.ts` (`TIMELINES`, `BUDGETS`). Flagged in `docs/open-questions.md` as provisional, not confirmed market research — easy to edit.

---

**Decision**: Fixed a real bug before it shipped — `actions.ts` originally exported `initialActionState` as a plain object alongside the `"use server"` directive, which Next.js rejects (a "use server" file may only export async functions).
**Date**: 2026-09-20 (Checkpoint 10)
**Reason**: Caught immediately via browser testing (the page crashed with a clear Next.js runtime error on first load) — moved `initialActionState` into the client component (`start-project-form.tsx`) instead, keeping `actions.ts` to just the async server action and type-only exports (types are erased at compile time, so they're exempt from the "only async functions" rule).
**Impact**: `src/app/start-a-project/actions.ts`, `src/app/start-a-project/start-project-form.tsx`.

---

**Decision**: Declined to integrate a pasted-in 3D robot-mascot hero component (Three.js/react-three-fiber, "UITHEFACTORY" AI-gadget template) on the homepage.
**Date**: 2026-09-20
**Reason**: Directly contradicted the approved `docs/brand-system.md`/source-doc "avoid" list (robot illustrations, generic AI brain imagery, random 3D AI objects) — flagged explicitly, user confirmed keeping the current "Prototype → Production" hero instead. Also would have added ~500–600KB of dependencies (three, @react-three/fiber, @react-three/drei) and shipped its own navbar conflicting with the global `Nav`, ahead of Checkpoint 11 (Performance).
**Impact**: None — no code changed. Recorded so this doesn't get silently re-proposed or re-litigated later.

---

**Decision**: Declined a second pasted-in component (a gamified "LEGO tech-stack picker" onboarding widget) for the hero visual; built a custom Framer Motion animation of the existing Prototype→Production card instead.
**Date**: 2026-09-20
**Reason**: The pasted component was a generic multi-color dev-tool onboarding flow (XP levels, `alert()` popups, Continue/Skip buttons) unrelated to Arvexa's story and in tension with the one-accent-color restraint principle. User agreed a custom on-brand animation was the better fit. Framer Motion was already installed (Checkpoint 6) so no new dependencies were needed.
**What was built**: `HeroFlow` (`src/components/site/hero-flow.tsx`) now animates on mount — each stage (prototype → chips → production) arrives in a staggered sequence, plus a small dot pulses down each connector line on a loop, representing work flowing through the pipeline. Fully disabled under `prefers-reduced-motion` via Framer's `useReducedMotion()`. Verified in-browser: entrance sequence and the looping flow-dot both confirmed rendering, console clean.
**Impact**: `src/components/site/hero-flow.tsx` only — same props/usage as before, so `src/app/page.tsx` needed no changes.

---

**Decision**: Added icons (lucide-react) and hover/scroll animations across the homepage — icons on the 4 Service cards, hover-lift on Service/Project/Why-Arvexa cards, image zoom-on-hover on real case-study screenshots, and animated count-up numbers in the Proof section.
**Date**: 2026-09-20 (user request: "use pictures and some visible animations")
**Reason**: Icons are honest, real decoration where we have no project screenshot to illustrate a service (never a fabricated stock photo). The count-up and hover-lift patterns are both explicitly pre-approved in `docs/brand-system.md`'s Motion section ("a hover state confirming an interactive element," "a number counting up when a real stat scrolls into view") — this wasn't a new brand judgment call, just executing what was already agreed.
**Real bug caught via build, not just visual review**: passing `s.icon` (a Lucide component reference) as a prop from the Server Component homepage into the Client Component `ServiceCard` failed the production build outright — "Functions cannot be passed directly to Client Components." Fixed by rendering the icon into a `ReactNode` at the Server Component call site (`icon={<s.icon size={20} />}`) and changing `ServiceCard`'s prop type from `LucideIcon` to `ReactNode`. Same root cause as the earlier `"use server"` export bug: a React Server Components boundary rule, not something `tsc`/lint catch.
**Impact**: `src/data/services.ts` (added `icon` field), `src/components/site/service-card.tsx`, `src/components/site/project-card.tsx`, `src/components/site/stat-tile.tsx`, `src/components/site/why-arvexa-card.tsx` (new), `src/app/page.tsx`, `src/app/dev/components/page.tsx`. Verified in-browser: icons render correctly, count-up animates through real intermediate values to the correct final numbers, console clean.

---

**Decision**: Forced the site to the light theme everywhere (`data-theme="light"` on `<html>` in `layout.tsx`), instead of following the visitor's OS `prefers-color-scheme`.
**Date**: 2026-09-20 (user request: "change theme to white black is not good at all")
**Reason**: Direct user preference — the dark theme (which every screenshot in this session showed, since the dev environment's OS is in dark mode) wasn't wanted. The token system already supported this: our three-state CSS pattern (`:root`, the `prefers-color-scheme` media query, and an explicit `[data-theme]` override) was built from the start so a forced override was a one-line change, not a rework.
**Real bug caught immediately via browser verification**: the site's `Logo` component swapped its light/dark wordmark image using Tailwind's `dark:` utility variant, which tracks OS `prefers-color-scheme` directly and does **not** follow our custom `data-theme` attribute. Forcing light via `data-theme` left every token correctly light, but the logo still rendered its dark (white-text) variant on the now-white nav — unreadable white-on-white. Fixed by removing the conditional entirely in `Logo` (`src/components/site/logo.tsx`) and always rendering the light-safe lockup, since dark mode is now fully disabled site-wide (no toggle exists). Grepped `src/` for other `dark:` usages — none found, this was the only one.
**Impact**: `src/app/layout.tsx`, `src/components/site/logo.tsx`. The "always dark" fixed tokens (`surface-inverse`/`ink-inverse`, used for the Evolve stage, hero's Production box, How We Use AI section) are unaffected by design — they're meant to stay dark regardless of overall site theme, and still do. Verified in-browser across home, work, and a service page — light theme consistent everywhere, logo legible, console clean.

---

**Decision**: `SITE_URL` (canonical URLs, sitemap, robots, OG/JSON-LD) falls back to a clearly-fake placeholder (`https://arvexa.example`) rather than a guessed real-looking domain like `arvexa.com`.
**Date**: 2026-09-20 (Checkpoint 11)
**Reason**: No domain has been confirmed (`docs/open-questions.md` #3). Guessing a plausible-looking real domain and shipping it into canonical tags/sitemap risks it being mistaken for confirmed later, or actually getting indexed if deployed before anyone notices. A `.example` TLD (reserved by IANA specifically for this purpose) can't be mistaken for real. `NEXT_PUBLIC_SITE_URL` overrides it — documented in `.env.example`.
**Impact**: `src/lib/site.ts`, `.env.example`.

---

**Decision**: Fixed two real WCAG AA contrast failures at the token level, found by running axe-core (not just eyeballing) — `--ink-faint` was too light against every surface it's used on, and the plain `--accent` failed against the fixed-dark `surface-inverse` blocks.
**Date**: 2026-09-20 (Checkpoint 11)
**Reason**: An automated accessibility pass is part of the checkpoint's required audit, not optional polish. `--ink-faint` (#8b9088) measured 2.68–3.25:1 against our three light surfaces (need 4.5:1); computed a replacement (#656b64) against the darkest surface it touches (surface-300, the binding constraint) and verified ≥4.5:1 against all three. Separately, plain `--accent` (#2563EB, tuned for light backgrounds) only cleared ~3.2–3.5:1 as text on the fixed-dark `surface-inverse` background — added a new fixed `--accent-inverse` (#5b8def, the same value already used for the currently-inactive dark theme's accent, since it was already tuned for dark-background contrast) rather than inventing a third blue.
**Math**: sRGB relative-luminance contrast ratio, computed by hand and cross-checked against axe-core's own reported ratios for each fix (both matched axe's post-fix "0 violations" result, not just my own calculation).
**Impact**: `src/app/globals.css` (2 token changes/additions), `src/components/ui/diagram.tsx`, `src/components/site/ai-transparency.tsx` (both swap to `accent-inverse` only when rendered on the fixed-dark surface — confirmed via grep that no other `text-accent` usage sits on a dark background). Full findings and re-verification in `docs/seo-analytics-performance-audit.md`.

---

**Decision**: Changed `CaseStudySection`'s heading from `<h3>` to `<h2>` on all case-study pages.
**Date**: 2026-09-20 (Checkpoint 11)
**Reason**: axe-core flagged `heading-order` on all 3 case studies — the page went H1 → H3 (each of the 8 template sections) → H2 (the closing CTA), skipping a level and then using H2 out of order. `<h2>` is also the semantically correct level: these 8 blocks are the page's top-level content sections, not sub-sections of something else.
**Impact**: `src/components/site/case-study-section.tsx`. Re-ran axe on all 3 case studies after the fix — 0 violations.

---

**Decision**: Routed every primary CTA site-wide through one component (`site/cta-button.tsx`) that fires a `cta_click` analytics event before navigating, rather than adding `onClick` handlers ad hoc per button.
**Date**: 2026-09-20 (Checkpoint 11)
**Reason**: The checkpoint requires conversion tracking. A single component means every future CTA gets tracking for free by construction, and the event `id` naming stays consistent (`hero-start-project`, `nav-desktop-start-project`, etc.) instead of drifting per author. Converted all 11 existing CTA instances (home ×4, nav ×2, about, process, both service-page CTAs, case-study CTA).
**Verified live**: clicked the homepage hero CTA and confirmed the `[analytics] cta_click` console event fired with the correct id before the page navigated.
**Impact**: `src/components/site/cta-button.tsx` (new), and every page/component that previously hand-wrote `<Button asChild><Link>...` for a primary CTA.

---

**Decision**: User authorized proceeding through Checkpoints 12–14 without pausing for per-checkpoint approval ("proceed to next steps and don't ask for approvals... make this project fully ready, I'll be back in couple of hours"), but Checkpoint 14 (Final Launch) is not executed as a real deploy.
**Date**: 2026-09-20 (post-Checkpoint 11)
**Reason**: User explicitly released the approval gate for the remainder of the work. However, a real launch requires external resources this session doesn't have (a purchased/confirmed domain, a connected hosting account with billing, real analytics/email/CRM credentials) — deploying with fabricated versions of any of these would be a worse outcome than clearly documenting what's needed and stopping short of the irreversible step.
**Alternatives considered**: deploy to a placeholder Vercel project anyway. Rejected — would create a real, publicly-reachable artifact under a fake domain that the user never asked for and would need to clean up.
**Impact**: Checkpoints 12 (QA) and 13 (Launch Prep) completed in full and documented (`docs/qa-checklist.md`, `docs/production-readiness.md`, `docs/placeholders-before-launch.md`, `docs/launch-checklist.md`). Checkpoint 14 intentionally left as a handoff for the user.

---

**Decision**: Fixed `.gitignore`'s blanket `.env*` rule to explicitly keep `.env.example` (`!.env.example`).
**Date**: 2026-09-20 (Checkpoint 12)
**Reason**: `.env*` would have silently excluded `.env.example` from every future commit — the file that documents the one required environment variable (`NEXT_PUBLIC_SITE_URL`) for anyone else who clones the repo. Caught during the Checkpoint 12 security review, not by the user.
**Alternatives considered**: none — this is a standard gitignore footgun with one correct fix.
**Impact**: `.gitignore` only. `.env.example` itself was verified to contain no real secrets before confirming this was safe to commit.

---

**Decision**: Redesigned the portfolio (Work index + case study pages) with hover-driven 3D tilt on real screenshots and a content-driven "spotlight" layout, instead of generic scroll-triggered reveal animations or a pasted 3D object/graphic.
**Date**: 2026-09-21
**Reason**: User said the portfolio's design was "too generic" and asked for a more interactive theme with 3D animation. `docs/brand-system.md`'s motion rule explicitly allows "a hover confirming interactivity" but explicitly bans "motion that fires only because a scroll happened" — the latter being the exact generic-portfolio-template pattern (fade-up-on-scroll for every block) that's arguably a major contributor to sites feeling generic in the first place. So the 3D interactivity was built as mouse-tracked perspective tilt on real product screenshots only (via a new shared `useTilt` hook, Framer Motion — already an approved dependency, no new 3D library added), never on decorative/generic objects, and never as a scroll-triggered effect. Card sizing on `/work` is now content-driven: whichever project has real confirmed screenshots (currently only Manza) gets the large horizontal "spotlight" card; projects still missing screenshots get a smaller card with a redesigned abstract placeholder (diagonal hairline pattern in existing line/surface tokens) instead of a plain gray box. Case-study pages now show the first real image as a large hero immediately after the intro (previously all images were buried at the very bottom in a small 2-col grid) and the remaining images in an enlarged, tilt-enabled gallery.
**Alternatives considered**: a decorative 3D object/hero graphic (rejected twice already this session for the homepage hero — see the robot-hero and LEGO-tech-stack-picker entries above); generic whileInView fade-up on every section (rejected — explicitly the pattern the brand system's motion rule was written to avoid, and likely part of what read as "generic" to begin with); installing react-three-fiber/three.js for a literal 3D scene (rejected — no real screenshot/data to render in 3D, would reintroduce the generic-AI-object problem, and adds a heavy new dependency for a portfolio page).
**Verified live**: `/work`, `/work/manza` (4 real images: 1 hero + 3-image gallery), `/work/ai-content-publisher` (0 images — confirmed no broken layout, falls through cleanly to the existing placeholder). axe-core: 0 violations on all three.
**Impact**: `src/lib/use-tilt.ts` (new), `src/components/site/project-card.tsx` (rewritten), `src/components/site/work-filter.tsx` (grid updated to 2-col for bento sizing), `src/components/site/case-study-gallery.tsx` (new), `src/app/work/[slug]/page.tsx` (hero image + gallery wiring).

---

**Decision**: Replaced the homepage hero visual (`HeroFlow`) with a `three.js` particle background (`WovenCanvas`, adapted from a pasted "WovenLightHero" reference component), rendered on a fixed white/light panel independent of the site's dark theme, with real Arvexa copy/CTAs (not the reference's placeholder "Woven by Light" text).
**Date**: 2026-09-21
**Reason**: Explicit user request, after being shown this exact conflict: two earlier entries in this log (the robot-hero and LEGO-tech-stack-picker decisions above) declined pasted 3D/decorative hero components specifically for using `three.js`/`react-three-fiber` and reading as generic. Asked directly, the user chose to override both and use the component as pasted (with its own `three.js` canvas and `Playfair Display` font) rather than the on-brand `HeroFlow` alternative. Recorded so this override isn't mistaken for an oversight later.
**What was built**: `src/components/ui/woven-light-hero.tsx` exports `WovenCanvas` only — the reference's bundled nav/copy/button were dropped (kept causing the exact "own navbar conflicts with global Nav" problem the robot-hero entry flagged) and real Arvexa hero copy/links render on top via `HeroCta` (`src/components/site/hero-cta.tsx`, a small "use client" wrapper — needed because `src/app/page.tsx` is a Server Component and can't pass closures to `onClick` directly). `Playfair Display` is loaded properly via `next/font/google` as `fontWoven` (`src/lib/fonts.ts`), reserved for this section only — sitewide `font-display` (Fraunces) is untouched. Fixed two bugs found via live browser testing: (1) the reference's `THREE.AdditiveBlending` only reads against a black background — on our fixed-white panel it washed particle colors out to invisible; switched to `THREE.NormalBlending`. (2) added a `prefers-reduced-motion` check (render one static frame, skip the mouse-reactive loop) since `docs/brand-system.md` requires it "respected everywhere" and the pasted reference had no such check.
**Alternatives considered**: keeping `HeroFlow` (the user's explicit ask was to replace it); reskinning the `three.js` canvas to the dark-navy/blue brand tokens instead of the reference's white/rainbow palette (user confirmed via a second reference screenshot — the component's own light-mode preview — that the white background + multicolor particles + serif headline was the intended look, not the locked brand tokens).
**Impact**: `src/components/ui/woven-light-hero.tsx` (new), `src/components/site/hero-cta.tsx` (new), `src/lib/fonts.ts` (+`fontWoven`), `src/app/page.tsx` (hero section rewritten), `package.json`/`package-lock.json` (+`three`, +`@types/three`). `src/components/site/hero-flow.tsx` was left in place unused (no git history existed yet to recover it from if deleted) in case of a later revert.

---

**Decision**: Replaced the blue-accent brand system with a true monochrome black-and-white theme sitewide, and replaced the logo mark with a new solid-black "A" wing (same geometry, no blue). Also reverted the WovenLightHero's Playfair Display font back to the sitewide Fraunces, and dropped the `hero-cta.tsx` wrapper in favor of the real `CtaButton`/`Button` components.
**Date**: 2026-09-21
**Reason**: Explicit user request — "change the theme to black and white and use this logo... font should not look like AI generated" — with a new logo image supplied (solid black geometric "A" mark, no blue). Confirmed via `AskUserQuestion` that this applied sitewide (not just the hero), that Playfair Display should be dropped in favor of the already-established Fraunces (the user's own "not AI generated" framing applied to Playfair too — it reads as a common "elegant AI SaaS template" font, same category problem the original brand system was written to avoid), and that the new logo should auto-invert to white on dark surfaces rather than ship separate light/dark exports.
**What was built**:
- **Logo**: new mark cropped from the supplied image to `logo/arvexa-mark-black.png` (source) / `public/logo/arvexa-mark-black.png` (served), a single black glyph on transparent background. `src/components/site/logo.tsx` rewritten to render this image plus a real-text "ARVEXA" wordmark (`--font-mono`) instead of the old flattened wordmark PNGs (`arvexa-wordmark-dark/light.png`, left in place unused, no git history to recover from). `--logo-filter` (`globals.css`: `none` in light theme, `invert(1)` in dark) applied via inline `style` so the one source image reads correctly on both. `src/app/icon.png`, `src/app/apple-icon.png`, and `public/logo/arvexa-icon.png` regenerated as square white-background crops of the same mark (Apple touch icons shouldn't be transparent; browser favicons stay legible on any browser-chrome color this way). `src/app/opengraph-image.tsx` updated to the new ink/surface hex values (was still hardcoding the old cream/near-black literals).
- **Color tokens** (`src/app/globals.css`): both the light (`:root` default) and dark (`@media`/`[data-theme="dark"]`) palettes rewritten to pure white/black/gray — no cream, no navy, no blue anywhere. `--accent` is now a distinct gray step (not black/white) so interactive text/links stay visually distinguishable from plain body text without reintroducing hue. `--accent-fill`/`--accent-fill-strong`/`--on-fill` were restructured to `var(--ink)`/`var(--ink-soft)`/`var(--surface-100)` live references (previously a fixed literal blue that happened to work as a white-text fill in both themes) — black and white can't both host white button text, so filled UI now auto-inverts per theme instead. `good`/`warn`/`bad` semantic colors left untouched (functional, not brand hue). Added a non-root `[data-theme="light"]` CSS scope (the existing dark-theme code only had a root-scoped opt-out) so a subtree — specifically the homepage hero panel — can render the light palette while the rest of the page stays on the forced dark theme; this replaced the hero's previous hardcoded `slate-*`/`bg-white` literals with real tokens, and let `hero-cta.tsx` be deleted in favor of the standard `CtaButton`.
- **Fixed 4 remaining hardcoded `text-white` spots** (`button.tsx`, `service-card.tsx`, `work-filter.tsx`) → `text-on-fill`, so they'd correctly flip with the new auto-inverting fill instead of going invisible in dark theme (white-fill + white-text).
- **Particle canvas**: `WovenCanvas`'s particle colors changed from random-hue HSL (rainbow) to zero-saturation HSL (grayscale only, varied lightness for depth) — a rainbow particle field directly contradicted "black and white theme."
- **Font**: `fontWoven` (Playfair Display) removed from `src/lib/fonts.ts`; hero heading now uses the `Heading`/`Text` components (Fraunces/`--font-display`) like every other page instead of a second display font.
**Verified live**: homepage, `/services`, `/start-a-project` (checked focus-ring color specifically — confirmed gray, not blue) in-browser; console clean; `tsc --noEmit` and `eslint` clean after every step.
**Impact**: `src/app/globals.css`, `src/components/site/logo.tsx`, `src/lib/fonts.ts`, `src/app/page.tsx`, `src/app/opengraph-image.tsx`, `src/components/ui/button.tsx`, `src/components/site/service-card.tsx`, `src/components/site/work-filter.tsx`, `src/app/icon.png`, `src/app/apple-icon.png`, `public/logo/arvexa-icon.png` (overwritten), `public/logo/arvexa-mark-black.png` + `logo/arvexa-mark-black.png` (new). `src/components/site/hero-cta.tsx` deleted (created and retired within the same session).

---

**Decision**: Made the homepage alternate black/white per section (not just the hero white against an otherwise all-black page) — hero, FRAMEWORK, SELECTED WORK, WHY ARVEXA, and FINAL CTA are white; PROBLEM, SERVICES, HOW WE USE AI, and PROOF stay black. Added a reusable `theme="light"` prop on `Section` rather than a homepage-only hack.
**Date**: 2026-09-21
**Reason**: User feedback on the black-and-white pass above: "not all background black. one section black and one section white background." The existing `tone="raised"`/`"inverse"`/default split already happened to alternate in exactly this rhythm through the page, so `theme="light"` was added only to the four default-tone sections rather than restructuring the page.
**Bug found and fixed via live browser check**: the first version of `Section`'s `theme="light"` silently produced buttons with no visible fill. Root cause: `--accent-fill: var(--ink)` (see the entry above) resolves at its *declaring* element and inherits as an already-resolved value — it does not re-resolve inside a descendant subtree that overrides `--ink`. The new non-root `[data-theme="light"]` CSS scope overrode `--ink`/`--surface-100` but not `--accent-fill`/`--accent-fill-strong`/`--on-fill`, so buttons inside it kept inheriting `:root`'s dark-theme-resolved white fill on a white background — invisible. Fixed by redeclaring all three inside `[data-theme="light"]` too. Verified via `getComputedStyle` in-browser on all 4 "Start a Project" instances (nav ×2, hero, final CTA) before calling it done, not just visually.
**Impact**: `src/components/ui/section.tsx` (+`theme` prop), `src/app/page.tsx` (4 sections flagged `theme="light"`), `src/app/globals.css` (`[data-theme="light"]` block gains its own `--accent-fill`/`--accent-fill-strong`/`--on-fill`, plus corrected comments on the earlier same-element-only assumption).

---

**Decision**: Extended the alternating black/white section rhythm from just the homepage to every page on the site.
**Date**: 2026-09-21
**Reason**: User: "use this theme in all tabs" — the homepage was the only page using `theme="light"`; every other route was still entirely dark-forced black.
**What was built**: For pages already built from `<Section tone="...">` blocks (`/about`, `/services/[slug]`), added `theme="light"` to the `tone="default"` sections only, same rule as the homepage — `tone="raised"`/`"inverse"` sections stay black. `/process` alternates per stage (`theme={i % 2 === 1 ? undefined : "light"}`), giving all 7 stages a strict black/white checkerboard. Single-`<Section>` pages (`/work`, `/services`) got `theme="light"` directly, making the whole page white — no alternation to build since there's only one section tone. Pages that used a bare `<Container>` with no `<Section>` wrapper at all (`/insights`, `/start-a-project`, `/privacy`, `/terms`, `/work/[slug]`) needed a different fix per page: `/insights` swapped cleanly from `Container` to `Section theme="light"` (no custom width). `/start-a-project`, `/privacy`, `/terms` use a narrower `max-w-[760px]` Container for readability — swapping to `Section` would've applied that width to the outer `<section>` instead of the inner `Container`, breaking the layout — so these instead keep their original `Container` untouched, wrapped in a plain `<div data-theme="light" className="bg-surface-100">`. `/work/[slug]` (the case-study template, 3 `Container` blocks plus 8 `CaseStudySection` blocks, none with their own background) got the same whole-page div wrap rather than being restructured into alternating panels — its content is one continuous narrative, not homepage-style discrete blocks, and `CaseStudySection` was confirmed to have no background assumptions before wrapping.
**Verified live**: `/work`, `/work/manza`, `/process` (checked the alternation is a real 7-way checkerboard, not just the first couple of stages), `/about`, `/privacy`, `/start-a-project` (form inputs specifically, since they're the one interactive element on a newly-white page) — all in-browser, console clean.
**Impact**: `src/app/work/page.tsx`, `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/process/page.tsx`, `src/app/about/page.tsx`, `src/app/insights/page.tsx`, `src/app/start-a-project/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/work/[slug]/page.tsx`.

---

**Decision**: Applied a CSS mask to the homepage hero's particle canvas so it fades out directly behind the eyebrow/headline/subtext, instead of rendering at full density across the whole panel.
**Date**: 2026-09-21
**Reason**: User: "hero content text is not visible properly on homepage." Confirmed via zoomed screenshot — the eyebrow and subtext (both `--ink-soft`-family gray, not the bold black headline) were visually merging with the dense field of mid-gray particle dots directly behind them. The headline itself was still legible (bold, large, pure black), so this was specifically a smaller/lighter-text-vs-busy-background contrast problem, not a z-index bug.
**What was built**: `mask-image`/`-webkit-mask-image` (radial gradient, transparent in the center ~45%, fully opaque by 95%) on `WovenCanvas`'s mount `div` — hides the particle field in the text's footprint while keeping it fully visible as a frame around the edges, which is arguably a better look than uniform density anyway.
**Verified live**: zoomed screenshot before/after — text fully crisp against clean white after the fix, particle art still visible top/bottom of the panel; console clean.
**Impact**: `src/components/ui/woven-light-hero.tsx` only.

---

**Decision**: Reverted the mask from the entry above. Instead of fading the animation behind the text, removed the eyebrow + subtext from the hero entirely (moved them into the PROBLEM section, which had no eyebrow of its own) and left just the headline + CTAs over the full-density, unmasked particle field.
**Date**: 2026-09-21
**Reason**: User: "Don't hide animation in background remove irrelevant text from here and move somewhere else" — explicit correction to the masking approach above. The headline itself was always legible unmasked (bold, large, pure black); it was specifically the smaller eyebrow/subtext competing with the animation, so removing them (rather than dimming the animation) was the fix the user wanted.
**Bug found and fixed along the way**: with the mask gone, the "Explore Our Work" secondary button — `bg-transparent` border-only style — had the particle field visible right through its own text, same legibility problem one level down. Fixed by giving that one instance an opaque `bg-surface-100` fill (the primary "Start a Project" button was already solid-filled and unaffected). This keeps the canvas fully visible per the user's instruction while keeping foreground UI legible via each element's own background, not by touching the animation.
**Verified live**: zoomed screenshot of both buttons and the headline against the full-density animation; PROBLEM section's relocated eyebrow/text render correctly; console clean; `tsc`/`eslint`/production build all clean.
**Impact**: `src/components/ui/woven-light-hero.tsx` (mask removed), `src/app/page.tsx` (hero copy trimmed to headline + CTAs, eyebrow/subtext moved into the PROBLEM section, secondary hero CTA gets an opaque background).

---

**Decision**: Added a real 4th case study — Shakeel Pakwan, a bilingual (English/Urdu) catering & events website for a Karachi caterer — with 4 real screenshots taken directly from the live site.
**Date**: 2026-09-21
**Reason**: User supplied a Claude-artifact case-study writeup (`https://claude.ai/artifact/MifZY7E6RCpeMXb3n7c4oh`) and the live URL (`https://shakeelpakwaan.vercel.app`), asking for it to be added to the work portfolio with real screenshots from the live site.
**What was built**: Treated the artifact as the source-of-truth fact sheet (same role `docs/project-inventory-raw.md` plays for the other 3 projects) and filled the full 8-part case-study schema from it — no invented facts. Visited the live site directly (its nav links resolve to `.html` pages, not the App-Router-style paths first guessed) and captured 4 real screenshots: home, menu (the bilingual EN/UR dish list — its most distinctive real feature), gallery, and about — saved to `public/case-studies/shakeel-pakwan/`. `aiContribution: null` and category `Web & SaaS Engineering` (now `AI Web Development`, see the next entry) since the site is honestly plain HTML/CSS/JS with no AI involvement, matching the College Compliance Portal / Manza precedent rather than overstating it. `featured: false` — left off the homepage's curated 3-project "Selected Work" grid to avoid disrupting it; it's fully live on `/work`.
**Verified live**: `/work/shakeel-pakwan` full page scroll (hero, all 8 case-study sections, all 4 gallery images loading correctly), console clean, production build includes it as a static page.
**Impact**: `src/data/projects.ts` (+1 project), `public/case-studies/shakeel-pakwan/*.jpg` (4 new real screenshots).

---

**Decision**: Replaced the `ProjectCategory` taxonomy — retired "AI Product Engineering" / "AI Agents & Automation" / "AI Rescue & Production Hardening" / "Web & SaaS Engineering" in favor of "AI Automation" / "AI Agents" / "AI Web Development" / "AI Saas Implementation" — and made the `/work` filter tabs a fixed list instead of only showing categories that currently have real projects.
**Date**: 2026-09-21
**Reason**: User: "add following Tabs in work AI Automation, AI Agents, AI Web Development, AI Saas Implementation." Flagged first, via `AskUserQuestion`, that 3 of the 4 real projects (College Compliance Portal, Manza, Shakeel Pakwan) have zero real AI involvement — their own case studies say so explicitly (`aiContribution: null`) — so folding them into an "AI Web Development" category puts an "AI" label on work that doesn't have any. Given three options (add alongside the old categories / replace entirely, including the AI-labeled non-AI projects / replace with no accuracy concern), the user chose to replace entirely and accepted that tradeoff explicitly.
**What was built**: `ProjectCategory` (`src/types/project.ts`) now has exactly the 4 requested values. Recategorized: AI Content Publisher (real Claude/Ideogram usage) → `AI Saas Implementation`; College Compliance Portal, Manza, Shakeel Pakwan → `AI Web Development`. `AI Automation` and `AI Agents` currently have zero real projects — the known gap already tracked in `docs/project-status.md`. Since `WorkFilter` previously derived its tabs only from categories present in real project data (specifically to avoid ever showing an empty/dead tab — see the component's own prior comment), showing these 2 empty categories required a different approach: `PROJECT_CATEGORIES` (`src/data/projects.ts`) changed from `Array.from(new Set(PROJECTS.map(p => p.category)))` to a fixed, hardcoded 4-value array, and `WorkFilter` now renders that fixed list instead of deriving one. Its existing "No projects in this category yet" fallback (already in the component, previously unreachable) now does the honest labeling this needs. `services.ts`'s `relatedCategory` cross-links updated to match: `ai-product-engineering` → `AI Saas Implementation`, `ai-agents-automation` → `AI Agents` (the closer of the 2 new values to that service's name; neither has a real project yet either way), `web-saas` → `AI Web Development`, `ai-rescue` stays `null` (unchanged — was never a project category of its own).
**Verified live**: `/work` shows all 5 tabs (All + 4); clicked "AI Automation" — correctly empty with the fallback message, not hidden or fabricated; clicked "AI Web Development" — correctly shows all 3 real web projects; `/services/web-saas` still cross-links Shakeel Pakwan correctly. `tsc`/`eslint`/production build all clean (25 static routes, including the new project page).
**Impact**: `src/types/project.ts`, `src/data/projects.ts` (categories + `PROJECT_CATEGORIES`), `src/data/services.ts` (`relatedCategory` ×3), `src/components/site/work-filter.tsx`.

---

**Decision**: Replaced Manza's homepage screenshot (`public/case-studies/manza/home.jpg`) with a higher-resolution one the user supplied directly.
**Date**: 2026-09-21
**Reason**: User: "Use this Image for Manza" with an attached screenshot of the real Manza homepage hero ("Elegance, in every layer.").
**What was built**: Resized to 1600px wide (matching the other case-study screenshots' scale) and saved as JPEG, same file path — no code change needed since `projects.ts` already pointed at that exact path.
**Impact**: `public/case-studies/manza/home.jpg` (replaced in place).

---

**Decision**: Switched the "College Compliance Portal" case study from the anonymized draft to the real, named version — SMGSC Portal, for Sindh Muslim Government Science College, Karachi — with a real live URL, real screenshots, and `permissionLevel: "public"`.
**Date**: 2026-09-21
**Reason**: This exact fork was already tracked as an open item: `docs/decisions.md`'s earlier entry (Checkpoint 8) chose the anonymized draft specifically "rather than the named 'SMGSC Portal' draft... permission to name it hasn't been confirmed," and said explicitly to switch "if permission comes through." The user supplied the real live URL (`university-web-app-xi.vercel.app`), a screenshot of the real site, and the named artifact (`https://claude.ai/artifact/NVauaRU4rjuKZqhuz1tZot`) — exactly that signal.
**What was built**: Treated the SMGSC artifact as the updated source-of-truth (it has more precise numbers than the anonymized draft — 672 unit + 250 e2e tests vs. the old draft's rounder "100 automated tests" — consistent with `docs/project-data-needed.md`'s own note that the two drafts needed reconciling before either was used as final). Renamed the entry: title "College Compliance Portal" → "SMGSC Portal", slug `college-compliance-portal` → `smgsc-portal`, `client` from an anonymized placeholder to "Sindh Muslim Government Science College, Karachi (affiliated with Shah Abdul Latif University, Khairpur)", `liveUrl` from `null` to the real URL, `permissionLevel` from `anonymized` to `public`. Rewrote `content` around the real circular number (I.C/SALU/KHP/-662) and the new artifact's real stats (672 unit tests, 250 e2e tests, 8 admin roles, 20 circular items tracked, $0/month across 3 free-tier services), while keeping the anonymized draft's accessibility/security audit specifics (axe-core's ~90-file contrast fix, per-IP rate limiting, magic-byte upload verification) since they're real, complementary facts about the same system that the shorter new artifact just didn't repeat — not contradicted, so not dropped. Visited the live site directly and captured 4 real screenshots (home, admissions — real DB-backed enrollment data, notices, faculty — footer shows the real circular citation) rather than reusing the artifact's own embedded images, saved to `public/case-studies/smgsc-portal/`. Updated the one hardcoded cross-link on `/services/ai-rescue` (`src/app/services/[slug]/page.tsx`) to the new title/slug.
**Verified live**: `/work/smgsc-portal` full scroll — real circular number and university name render correctly in "The Problem," all 4 screenshots load; `/services/ai-rescue`'s cross-link card updated; production build includes `/work/smgsc-portal` (old slug fully retired, no dangling references left in `src/`). `tsc`/`eslint` clean.
**Impact**: `src/data/projects.ts` (entry rewritten + renamed), `src/app/services/[slug]/page.tsx` (cross-link card), `src/types/project.ts` (comment), `public/case-studies/smgsc-portal/*.jpg` (4 new real screenshots, replacing the previous empty `images: []`).

---

**Decision**: Added a 6th real case study — Adz Lab, a performance-creative agency for ecommerce brands (UK/USA/UAE) — with 4 real screenshots and real, client-sourced revenue figures.
**Date**: 2026-09-21
**Reason**: User supplied the live URL (`https://adzlab.co/`) and a case-study artifact (`https://claude.ai/artifact/6TSAA9M52tju2d8bdbuRgW`), asking for it to be added under "AI Web Development" with screenshots taken from the actual site. This resolves a standing open item: `docs/open-questions.md` had flagged Adz Lab specifically as needing "publishing permission (names a real client + their revenue figures)... not currently in the launch portfolio" — the user providing the live URL and artifact directly is that permission.
**What was built**: Treated the artifact as the source-of-truth fact sheet and filled the full 8-part schema — no invented facts, including the real revenue figures ($200,000 revenue generated from clients since 2024, $1,613,608.18 revenue impact from their ad creative, 3,000+ creatives produced). Visited the live site directly (not the artifact's own embedded images, per the user's explicit "take the screenshot from actual site") and captured 4 real screenshots: home, services, work, and contact — saved to `public/case-studies/adz-lab/`. `aiContribution: null` (React/TypeScript/Vite/Formspree, no AI in the shipped product) under category `AI Web Development`, consistent with the taxonomy decision above. `featured: false` — left off the homepage's curated grid.
**Verified live**: `/work/adz-lab` full scroll (hero, all 8 sections including the real revenue results, all 4 gallery images), `/work` index shows it with the spotlight card treatment, console clean, production build includes `/work/adz-lab` (26 total static routes).
**Impact**: `src/data/projects.ts` (+1 project), `public/case-studies/adz-lab/*.jpg` (4 new real screenshots).

---

**Decision**: Replaced the Adz Lab and SMGSC Portal home screenshots with higher-quality, full-width versions the user supplied directly.
**Date**: 2026-09-21
**Reason**: User: "In Adz Lab main image use this [image], In College Portal Use this [image]" — cleaner captures (full brand mark visible, no partial crop) than the ones taken during the original browser session.
**What was built**: Resized both to 1600px wide (matching the site's other case-study screenshots) and saved as JPEG, same file paths — no code change needed.
**Impact**: `public/case-studies/adz-lab/home.jpg`, `public/case-studies/smgsc-portal/home.jpg` (both replaced in place).

---

**Decision**: Filled in AI Content Publisher's last remaining placeholders — `client`, `images`, `liveUrl`, `permissionLevel` — making it the 3rd fully real case study (previously the one launch project still gated: `client: null`, `images: []`, `liveUrl: null`, `permissionLevel: "pending"`, per `docs/project-data-needed.md` item 1).
**Date**: 2026-09-22
**Reason**: User supplied the real live URL (`https://ai-content-publisher-six.vercel.app/`), a screenshot, and an artifact link. The artifact turned out to be a Design-type canvas (the source mockup for that same hero screenshot), not a text case-study — so it added no new narrative facts beyond confirming the visual, but the live URL let the placeholder gaps get filled from the real site directly.
**What was built**: `client` set to "Solo project" (matching Manza's precedent — the existing `problem`/`solution` content already described this as a solo four-month build, and no third-party client name was ever supplied for this one, unlike SMGSC/Adz Lab/Shakeel Pakwan/Cool n Bite). Visited the real live site and captured 4 screenshots: home (the user's supplied image, already clean), services, pricing, about — saved to `public/case-studies/ai-content-publisher/`. `liveUrl` set to the real URL, `permissionLevel` to `public`. The existing rich `content` (problem/solution/architecture/engineering/AI-contribution/results) was left untouched — it was already detailed and accurate from the original project inventory, nothing in the new artifact contradicted it.
**Verified live**: `/work/ai-content-publisher` shows client, live link, all 18 tech badges, and the real hero screenshot; homepage's "Selected Work" grid shows it correctly (still `featured: true`, unchanged). Console clean, production build includes it as a real (non-placeholder) case study.
**Impact**: `src/data/projects.ts` (client/images/liveUrl/permissionLevel updated), `public/case-studies/ai-content-publisher/*.jpg` (4 new real screenshots).

---

**Decision**: Added a 7th real case study — Cool n Bite, a North Karachi ice cream/pizza/fast-food counter — with 4 real screenshots.
**Date**: 2026-09-22
**Reason**: User: "add this new project [live URL] use this image [hero image] coolnbite" — no case-study artifact supplied this time, unlike the previous additions.
**What was built**: Since there was no artifact to use as a fact sheet, all `content` was written directly from what was observed live on the site (real PKR menu prices, real Roman-Urdu/English bilingual copy, a real Facebook-sourced "68% recommend" testimonial block with two named reviewers, real address/phone/Google-Maps/social links) — nothing invented. Checked the site's actual client-side signals (`window.__NEXT_DATA__` absent, `<div id="root">`, a single hashed `/assets/index-*.js` bundle) before listing `technology: ["React", "Vite", "Vercel"]`, rather than assuming a stack — deliberately left TypeScript off that list since it couldn't be verified client-side, unlike Adz Lab where the artifact confirmed it directly. Captured 4 real screenshots (home, menu, gallery, counter/gallery-detail) — saved to `public/case-studies/cool-n-bite/`. Category `AI Web Development`, `aiContribution: null` (plain React marketing site, no AI), `featured: false`.
**Verified live**: `/work/cool-n-bite` full scroll, console clean, production build includes it (27 total static routes across all 7 projects now).
**Impact**: `src/data/projects.ts` (+1 project), `public/case-studies/cool-n-bite/*.jpg` (4 new real screenshots).

---

**Decision**: Added the 8th real case study — an OPD (Outpatient Department) medical-bill reimbursement automation, built in n8n — closing the single most-repeated gap in this project's own docs: no AI Agent/Automation case study existed until now.
**Date**: 2026-09-22
**Reason**: User supplied a project name, an architecture diagram + detailed written breakdown, and confirmed (via `AskUserQuestion`, asked before writing anything) that it was **actually built and deployed**, not a proposal.
**Why the question was asked first**: the pasted content was written in proposal language throughout — "A practical n8n implementation *could be*", "*Recommended* n8n node structure", "You *could* maintain tables such as", "I *would* add a confidence-based review loop" — which reads as an architecture recommendation, not a description of shipped work. Every other project in this portfolio is real and already live, and `/work`'s own header states "Every project here shipped — not a mockup, not a demo." Given this is also the exact category (AI Automation/Agents) that every status doc in this project has flagged as the weakest-evidenced gap, there was real risk of mistaking a pitch document for a shipped project under pressure to finally fill that gap. Confirmed as built before writing anything.
**What was built**: Rewrote the proposal-toned source content into descriptive case-study language (what the workflow *does*, not what it *could* do) across the standard 8-part schema. `client` is anonymized ("An employer's HR/Finance department...") since no employer name was given — same honest pattern as SMGSC Portal's original anonymized version. `liveUrl: null` since this is an internal backend workflow with no public URL — the first project in the portfolio for which that's expected and normal, not a placeholder gap. `images`: the supplied architecture-diagram image only (one real image, not four) — per `docs/brand-system.md`, real architecture diagrams are explicitly sanctioned as case-study imagery alongside screenshots, and this project has no UI to screenshot. `aiContribution` is real and specific (OCR + an AI/LLM node for structured extraction only; the actual reimbursement calculation runs on deterministic rules, not model output) — the honest "AI does X, not Y" framing the site uses elsewhere (e.g. AI Content Publisher's cover-typography note). `results` deliberately doesn't invent usage numbers (bills processed, dollar amounts, etc.) since none were supplied — states what the workflow does end-to-end instead, same honesty pattern as AI Content Publisher's engineering-effort-only results.
**Also fixed**: the shared case-study template's single-image fallback text said "that's the only *screenshot* confirmed for this project" — inaccurate for a diagram-only project like this one. Generalized to "image" so the wording is correct for both cases going forward.
**Verified live**: `/work/opd-reimbursement-workflow` full scroll (all 8 sections, diagram renders correctly as both hero and spotlight-card image); `/work` filtered to "AI Automation" now shows exactly this one project instead of the "No projects in this category yet" fallback — the first time that's been true. Console clean, production build includes it (28 total static routes, 8 projects).
**Impact**: `src/data/projects.ts` (+1 project), `src/app/work/[slug]/page.tsx` (fallback text generalized), `public/case-studies/opd-reimbursement-workflow/architecture.jpg` (1 new real image).

---

**Decision**: Updated the homepage PROOF section's "Commits shipped" stat from 124 (AI Content Publisher's number alone) to 146 — a real, GitHub-verified sum across the whole portfolio.
**Date**: 2026-09-22
**Reason**: User: "commits shipped showing for one project only check my git account as well for these and update it accordingly." Correct — the stat had never been updated as projects were added since Checkpoint 11; it was always just AI Content Publisher's own number.
**What was checked**: Used the GitHub MCP tools against the user's real account (`osamaikhlas`, confirmed via `get_me`) rather than assuming. Listed all 7 repos on the account and matched them to portfolio projects: `manza` (4 commits), `adz-lab` (7 commits), `University-WebApp` (8 commits — this is SMGSC Portal), `Shakeel-Pakwaan-Website` (3 commits) — all pulled live via `list_commits`, well under the 100-per-page limit so these are exact totals, not estimates. Also checked merged PRs on all 4 (`search_pull_requests is:merged`): zero on every one — everything was pushed directly to the default branch, no PR workflow used on these smaller builds. Searched for repos matching AI Content Publisher, Cool n Bite, and the OPD workflow by name and topic — none exist on this account (expected for OPD, an n8n workflow, not a code repo; not expected for the other two, so flagging rather than guessing).
**What was changed vs. left alone**: "Commits shipped" → 124 + 4 + 7 + 8 + 3 = **146** (Cool n Bite and OPD contribute 0 since no repo was found to verify against — excluded rather than estimated). "Merged pull requests" stays 50, unchanged — now actually *verified* as the true portfolio-wide total, since every other repo has 0 real merged PRs; it was never wrong, just previously unverified. "Test files" (53) and "Lint problems fixed" (42,914 → 0, a specific Manza before/after event, not a cumulative count) were left alone — not re-verified against the other repos, flagged to the user rather than silently assumed correct.
**Open flag for the user**: AI Content Publisher's own 124/50 figures could not be re-verified — no matching repo exists on the `osamaikhlas` GitHub account. They may live under a different account/org, or were never pushed. Left as originally recorded (from the Checkpoint 3 project inventory) rather than dropped, since nothing contradicts them — but this is worth confirming.
**Verified live**: homepage PROOF section shows 146 after the count-up animation completes, console clean, `eslint`/production build clean.
**Impact**: `src/app/page.tsx` (`Commits shipped` value + a documentation comment explaining the real per-repo breakdown and what wasn't re-verified).

---

**Decision**: Added a second real image to the OPD Reimbursement Workflow case study — a screenshot of the actual n8n editor canvas, alongside the architecture diagram already there.
**Date**: 2026-09-22
**Reason**: User: "add this image in OPD" with a screenshot of the real n8n editor showing the "OPD Reimbursement" workflow open (Webhook → Extract Binary/File → Validate File → OCR → AI — Extract Bill Fields → Structured JSON → Validate Data → IF-Valid? branching to Manual Review or Calculate OPD Claim → Check Employee Limit → PostgreSQL → Generate OPD PDF → Email Employee → HR/Finance Approval → End, plus a separate Error Handler path).
**Why this was trusted as real without re-asking**: the node graph in the screenshot matches the already-written architecture almost exactly, node for node — and the user had already confirmed this project was actually built and shipped (not a proposal) in the entry above. Re-asking would have been redundant given that already-established context.
**What was built**: Second image appended to the project's `images` array — `architecture.jpg` (the diagram, still the hero) stays first, `n8n-canvas.jpg` (this real editor screenshot) is now the gallery image. With 2 images, the case-study template automatically switched from its single-image fallback text to the real `CaseStudyGallery` component — no template changes needed, this was already handled.
**Verified live**: `/work/opd-reimbursement-workflow`'s Final Product section now shows the real n8n canvas as a gallery tile, console clean, production build clean.
**Impact**: `src/data/projects.ts` (`images` array, +1), `public/case-studies/opd-reimbursement-workflow/n8n-canvas.jpg` (new real image).

---

**Decision**: User pasted a video filename ("Professional_cinematic_SaaS_product_demo_...mp4") to add to the OPD case study. Not added.
**Date**: 2026-09-22
**Reason**: Two independent blockers, checked before doing anything. (1) The file was never actually attached to the session — only its name was pasted as text; searched the scratchpad and common local directories, found nothing. (2) The filename itself reads like an AI video-generation tool's auto-named output ("Professional_cinematic_...demo"), not a screen-recording filename. Asked directly whether it was real footage or generated; user confirmed **generated**. Declined to add it on that basis alone — every other piece of evidence in this portfolio (screenshots, the OPD n8n canvas, GitHub-verified commit counts) is real, and this project specifically had already been vetted once for being proposal-toned before being accepted as real; adding known-fake video to it would undo that.
**Impact**: None — no files changed.

---

**Decision**: Added a 9th real case study — a multi-tenant, white-label RAG chatbot SaaS platform ("RAG-Based AI Chatbot") — with no images, unlike every prior addition.
**Date**: 2026-09-22
**Reason**: User pasted a multi-part `OVERVIEW.md` architecture document and asked to add it as a project. No live URL, screenshot, or diagram was supplied this time.
**Why this was judged real without asking** (unlike OPD, which needed a direct question first): the document's own tone is declarative, describing a system that exists, not one being proposed — most tellingly, a literal phase-by-phase build checklist (Phase 1 fully checked off, Phase 2 checked except one open item — "Onboarding email automation" — Phase 3 entirely unchecked/not started) and an honest admitted gap ("the BYOK Anthropic API key is currently stored in plaintext... needs a key-management decision"). That kind of self-critical, in-progress status tracking is characteristic of real project documentation, not a pitch — matches this portfolio's own established pattern (e.g. SMGSC Portal's "one gap was found and flagged rather than hidden").
**What was built**: Full 8-part schema filled directly from the architecture doc — the RAG pipeline (512-token chunks/50-token overlap, OpenAI text-embedding-3-small, pgvector cosine similarity, Claude for generation), the widget's shadow-DOM iframe delivery, and the layered security model (DB-level RLS, CSP frame-ancestors as the actual enforced boundary, Origin validation on `/api/chat`, deliberately open-CORS `/api/widget-config`) — all traceable to the source doc, nothing invented. `client: "Solo project"` (no third-party client named) and `permissionLevel: "anonymized"`, matching the established default when no client is given. **`images: []`** — no screenshot or diagram was supplied this time, so the case study honestly shows the "Screenshots pending" placeholder, the same state AI Content Publisher was in before its real images arrived. Did not generate or approximate an image to fill the gap.
**Verified live**: `/work/rag-based-ai-chatbot` renders correctly with no hero image (template's conditional hero render correctly skips it) and the honest placeholder in Final Product; console clean, production build clean (9 projects, all static routes generated).
**Impact**: `src/data/projects.ts` (+1 project). No new image assets — none were available.

---

**Decision**: Added the RAG-Based AI Chatbot's first real image (a `search_web()` tool-call screenshot) and a matching sentence about that tool in `aiContribution`/`architecture`.
**Date**: 2026-09-22
**Reason**: User: "add this image [screenshot] in AI Agent Projec[t]." Asked two clarifying questions before acting, since the request was genuinely ambiguous both times: (1) "AI Agents" has zero real projects — was this meant to start a brand-new one (which a single screenshot with no name/description couldn't honestly support), or add to an existing project? User confirmed: existing project. (2) Which one — the screenshot's content (a generic `search_web` tool call) didn't obviously belong to any specific project, so guessing wrong risked attaching real evidence to the wrong case study. User confirmed: RAG-Based AI Chatbot.
**What was built**: Added as the project's first image (previously `images: []`). Since the tool itself (a web-search fallback for questions outside the tenant's uploaded documents) wasn't mentioned in the original `OVERVIEW.md`, added one sentence to `aiContribution` and one line to `architecture` describing it — grounded strictly in what the screenshot shows (the tool name, its input, and its logged output shape: matches/elapsed_ms/top_source), nothing extrapolated beyond that.
**Verified live**: `/work/rag-based-ai-chatbot` now shows the tool-call screenshot as its hero image, console clean, production build clean.
**Impact**: `src/data/projects.ts` (`images`, `aiContribution`, `architecture`), `public/case-studies/rag-based-ai-chatbot/tool-call.jpg` (new real image).

---

**Decision**: Recategorized RAG-Based AI Chatbot from `AI Saas Implementation` to `AI Agents` — closing the last empty category in the taxonomy.
**Date**: 2026-09-22
**Reason**: User: "RAG Based AI Chat Bot shouldn't be in an AI Agent?" — a fair challenge to the original categorization. Agreed: now that the project has confirmed, evidenced tool-calling behavior (the `search_web` tool added in the entry above), an LLM that autonomously decides whether to answer from RAG retrieval or reach for a tool is a more accurate fit for "AI Agents" than "AI Saas Implementation" — the multi-tenant SaaS/billing/branding architecture is real and substantial, but the *categorization* should reflect the more specific, differentiating trait (agentic tool use) over the generic one (it's a SaaS product), especially with `AI Content Publisher` already anchoring `AI Saas Implementation` and `AI Agents` having zero real projects until now.
**What was built**: `category` changed on the project entry. Updated the now-stale comment on `services.ts`'s `ai-agents-automation` → `relatedCategory: "AI Agents"` mapping, which previously noted "neither has a real project yet" — no longer true.
**Verified live**: `/work` filtered to "AI Agents" now shows RAG-Based AI Chatbot instead of the empty-state fallback — **all 4 category tabs now have at least one real project**, the first time that's been true since the taxonomy was introduced. Console clean, production build clean.
**Impact**: `src/data/projects.ts` (`category`), `src/data/services.ts` (comment only).

---

**Decision**: Recategorized SMGSC Portal from `AI Web Development` to `AI Saas Implementation`.
**Date**: 2026-09-22
**Reason**: User: "move college web portal into saas." Its own case study already describes a genuine multi-role admin CMS with a content-workflow engine, compliance dashboard, and role-based access — closer to a SaaS-style back office than a plain marketing website, which is what `AI Web Development` otherwise holds (Manza, Shakeel Pakwan, Adz Lab, Cool n Bite — all storefronts/marketing sites with no admin system behind them).
**Verified live**: `/work` filtered to `AI Saas Implementation` now shows both AI Content Publisher and SMGSC Portal; `AI Web Development` still has 4 real projects, not left empty by the move. Console clean, production build clean.
**Impact**: `src/data/projects.ts` (`category` only).

---

**Decision**: Replaced the true black-and-white monochrome palette with a "green duotone" — user-supplied `rgb(54,68,58)` in place of black, `rgb(124,144,130)` in place of white — across both themes, `surface-inverse`, and all dependent text/accent tokens.
**Date**: 2026-09-22
**Reason**: User: "use this in place [of] black... and in place of white [these two colors]."
**Why this wasn't a simple two-value find-and-replace**: computed actual WCAG relative luminance for both colors before touching anything. `rgb(124,144,130)` ("white") has relative luminance ≈0.26 — a medium-tone sage green, nothing like real white's 1.0. Naively swapping only the two surface-100 anchors and leaving `ink-soft`/`ink-faint`/`accent` at their old hex values would have produced real, verifiable contrast failures: dark-theme `ink-faint` dropped to ~2.97:1 against the new "black" (needs 4.5:1), light-theme `accent` dropped to ~3.04:1 against the new "white". Flagged this via `AskUserQuestion` before writing any CSS — this background is bright enough (relative to 0) that dark-theme text had reasonable room to retune, but not bright enough (relative to 1.0) to keep light-theme's old wide gray-step hierarchy; user chose to keep everything WCAG-accessible over preserving the old, wider visual spacing between ink/ink-soft/ink-faint.
**What was built**: Every surface/text/accent token in `src/app/globals.css` recomputed and independently contrast-checked (proper sRGB-linearized relative luminance, not eyeballed) against its real background:
- Dark theme: `surface-100/200/300` = `#36443a`/`#3c4b40`/`#2e3a32`. `ink` stays white (10.3:1). `ink-soft` → `#c2c2c2` (5.77:1), `ink-faint` → `#b0b0b0` (4.75:1), `accent` unchanged at `#b3b3b3` (still passes, 4.90:1) — these had more room to work with since "black" still has fairly low luminance.
- Light theme (`:root` base + non-root `[data-theme="light"]`): `surface-100/200/300` = `#7c9082`/`#748d77`/`#6c846f`. `ink` stays `#111111` (5.55:1, right at the edge of headroom). `ink-soft` → `#1c1c1c` (5.00:1), `ink-faint` → `#242424` (4.56:1), `accent` → `#232323` (4.61:1), `accent-strong` → `#0d0d0d` — all compressed close to near-black since the ceiling for 4.5:1 against this background is only ≈0.0185 relative luminance, leaving almost no room for a wide gray ramp.
- `surface-inverse` (the fixed always-dark emphasis blocks) → `#36443a`, same as the dark theme's new black; `accent-inverse` (`#b3b3b3`) re-verified against it and still passes (4.90:1) unchanged.
- `--accent-fill`/`--accent-fill-strong`/`--on-fill` needed no direct edits — they're `var(--ink)`/`var(--ink-soft)`/`var(--surface-100)` references (see the 2026-09-21 entry on why non-root scopes must redeclare these), so they picked up the new colors automatically everywhere they were already correctly wired.
- `good`/`warn`/`bad` semantic colors and the logo's `--logo-filter` mechanism left untouched — out of scope (functional colors, and the logo's `invert(1)` still produces adequate contrast against the new dark green).
**Also moved mid-task**: user asked to move SMGSC Portal into `AI Saas Implementation` partway through this same turn — handled as a quick side-edit (see entry above) before returning to finish the color work.
**Verified live**: homepage hero (sage green panel, black headline, full particle animation legible), PROBLEM section (dark green, white body text, bordered chips all readable), `/work` and `/work/manza` (case-study template's `data-theme="light"` wrapper correctly picks up the new sage green across every project page, not just one). Console clean on every page checked. `eslint`/production build clean.
**Not done (flagging, not silently skipped)**: static image assets (favicons, OG image, logo PNG) still bake in the old black/white values — CSS custom properties can't reach into raster images. Left alone since the request was specifically about `background-color`, but worth knowing these won't visually match the new palette until/unless regenerated.
**Impact**: `src/app/globals.css` only (all surface/ink/accent/line tokens across both themes, `surface-inverse`, updated comments).

---

**Decision**: Added two real widget screenshots to RAG-Based AI Chatbot, showing the actual multi-tenant white-label widget on two different demo tenant sites.
**Date**: 2026-09-22
**Reason**: User asked to add these images twice — the first attempt referenced files that were never actually attached (checked the session's scratch image folder, found nothing, asked the user to attach them directly); the second attempt gave real local file paths (`/Users/nis-pk909/Documents/ARVEXA/Images/...`), which did exist and were read directly.
**What the images show**: a "Driftwood Travel" demo site with a coral-branded widget introducing itself as "Journey, Driftwood's trip planner," and a "Vertex Cloud" demo site (`localhost:3000/demo/vertex-cloud.html`) with a purple-branded widget introducing itself as "Byte." This is direct visual confirmation of the platform's core multi-tenant claim from the original `OVERVIEW.md` — same underlying widget, distinctly branded and named per tenant — so one sentence was added to `solution` describing this specifically (bot name/persona, not just color/logo), grounded in exactly what's visible in the two screenshots.
**What was built**: Both images saved to `public/case-studies/rag-based-ai-chatbot/`, added to the front of the `images` array (ahead of the earlier `search_web` tool-call screenshot) since they more clearly illustrate the product's core value prop than a JSON tool-call card — the tool-call screenshot is still included, now as a gallery image rather than the hero.
**Verified live**: `/work/rag-based-ai-chatbot` hero now shows the Driftwood Travel widget, Vertex Cloud's "Byte" widget appears correctly in the Final Product gallery alongside the tool-call screenshot, console clean, production build clean.
**Impact**: `src/data/projects.ts` (`images` reordered + 2 added, one sentence added to `solution`), `public/case-studies/rag-based-ai-chatbot/widget-driftwood-travel.jpg` + `widget-vertex-cloud.jpg` (new real images).

---

**Decision**: Replaced the green duotone's "white" anchor (sage `rgb(124,144,130)`, set earlier the same day) with a true off-white, `#F7F7F4`.
**Date**: 2026-09-22
**Reason**: User asked directly: "in place of background-color: rgb(124, 144, 130) use off-white." No exact hex was given, so I chose a clean warm off-white and verified it the same way every other token this session was verified, rather than guessing.
**What was built**: `--surface-100/200/300` in both `:root` and the non-root `[data-theme="light"]` scope (homepage hero + every `/work/[slug]` page) moved from sage tones to off-white (`#f7f7f4`) and two warm-neutral steps down from it (`#f0eee7`, `#e8e5dc`) for card/nav/input layering. The earlier sage version only had ~0.26 relative luminance, which forced `ink`/`ink-soft`/`ink-faint`/`accent` into a compressed near-black cluster to hold 4.5:1 — real off-white has ~0.93 luminance, restoring normal headroom, so that hierarchy was un-compressed back to well-separated steps (`ink #101010`, `ink-soft #4d4d4d`, `ink-faint #5f5f5f`, `accent #333333`, `accent-strong #000000`), each independently re-verified ≥4.5:1 against the new background with real margin (not the ~0.013 sliver the sage version had). `--line` moved to a light warm-gray (`#d6d2c7`). `--accent-soft` became a light sage-tinted neutral (`#e8ece3`) instead of the old solid sage swatch, keeping a whisper of the brand green as a soft badge/callout fill. `--warn` was re-darkened from `#a8722a` (only 3.83:1 against the lighter background — would have failed AA) to `#8a5a1f` (5.49:1); `--good` was similarly re-verified/darkened slightly for margin (`#256b40`, 6.0:1); `--bad` (only token actually used as text today, in form error states) re-verified unchanged at 5.30:1. `--surface-inverse`/`--ink-inverse`/`--accent-inverse` (the fixed-dark emphasis blocks) and the entire dark theme were untouched — this was a light-theme-only change.
**Verified live**: homepage hero panel, `/work` index (filter tabs, project cards, lazy-loaded images), `/work/smgsc-portal` case study (badge, tech pills, body copy), and `/start-a-project` (triggered real client-side validation to check the `--bad` error banner/text) all screenshotted against the new off-white — clean legibility throughout, no console errors, lint clean, production build clean.
**Impact**: `src/app/globals.css` only (`--surface-100/200/300`, `--ink`/`--ink-soft`/`--ink-faint`, `--line`, `--accent`/`--accent-strong`/`--accent-soft`, `--good`/`--warn` in both the `:root` block and the `[data-theme="light"]` block, plus updated comments).

---

**Decision**: Removed the "signature offer" highlight (thicker accent border + filled icon + "Signature offer" label) from the AI Rescue & Production Hardening card in the homepage's "Four ways we bridge the gap" section.
**Date**: 2026-09-22
**Reason**: User asked directly: "AI Rescue & Production Hardening don't make it highlighted on homepage."
**What was built**: Removed `signature: true` from the `ai-rescue` entry in `src/data/services.ts` — no other service sets this flag, so `ServiceCard`'s existing conditional rendering (border, icon fill, label) now falls through to the plain styling for all four cards with no component change needed. Updated the now-stale comment in `service-card.tsx` that referenced the original Checkpoint 1 "lead with AI Rescue" decision.
**Verified live**: homepage screenshot confirms all four service cards (AI Product Engineering, AI Agents & Automation, AI Rescue & Production Hardening, Web & SaaS Engineering) now render identically — no border, no "Signature offer" label. Console clean, lint clean, production build clean.
**Impact**: `src/data/services.ts` (one flag removed), `src/components/site/service-card.tsx` (comment only, no logic change).

---

**Decision**: Fixed the light/dark section rhythm on the About page and the Services detail page (`/services/[slug]`) — both had a dark hero immediately followed by another dark section, breaking the strict alternation the homepage and Process page establish.
**Date**: 2026-09-22
**Reason**: User: "check about page mapping of colors is not correct uniformity should be there across all pages." Comparing every page's `Section theme`/`tone` sequence: the homepage (`src/app/page.tsx`) and `/process` alternate light/dark perfectly, section by section, starting immediately after the dark hero. About and Services-detail instead had the hero (dark, plain `Container`) directly followed by a `tone="raised"` (also dark) section — two dark blocks in a row right at the top of the page, before any contrast appears, unlike every other page.
**What was built**: About — swapped "The belief" (was `tone="raised" bordered`) to `theme="light"`, and "How we work" (was `theme="light"`) to `tone="raised" bordered`, so the page now reads dark→light→dark→dark(AiTransparency, fixed)→light→dark(footer CTA). AiTransparency's `tone="inverse"` is a deliberate fixed-dark block (see its own docs/decisions.md entry) that can't flip to light, so one dark/dark pair mid-page is mathematically unavoidable given 4 content sections — moving it away from directly under the hero (where two large dark blocks are most jarring, and where the homepage/process convention never allows it) is the best achievable fit. Services detail — flipped every content `Section`'s theme (`What this covers`, `If this sounds familiar`, `What we audit`, `Where we've done this`, `Related work`), so each service page now alternates cleanly with zero forced doubles: the 2-section services (AI Product Engineering, AI Agents & Automation, Web & SaaS Engineering) go dark→light→dark(→dark footer CTA, the same trailing double every page already has going into the global dark Footer); the 4-section AI Rescue page goes dark→light→dark→light→dark(→dark footer CTA).
**Verified live**: screenshotted About (top: dark hero → light "The belief" → dark "How we work"), `/services/ai-rescue` (dark hero → light "What this covers" → dark "If this sounds familiar" → light "What we audit"), and `/services/web-saas` (dark hero → light "What this covers" → dark "Related work") — all now match the homepage/process alternation pattern. Console clean on all three, lint clean, production build clean.
**Impact**: `src/app/about/page.tsx` (2 `Section` props swapped), `src/app/services/[slug]/page.tsx` (5 `Section` props swapped).

---

**Decision**: Added a relative-scale progress bar under each of the homepage's 4 PROOF stat tiles.
**Date**: 2026-09-25
**Reason**: User pasted the 4 real stats and said "multiply it to 100." Multiplying the actual numbers by 100 (146→14,600 commits, 50→5,000 PRs, etc.) would have fabricated them, directly contradicting the verified-real-numbers policy this session enforced when the stats were originally audited against GitHub (see the 2026-09-22 entry). Asked the user what they meant; they clarified it was about a visual bar/counter scale, and confirmed they wanted a new progress bar added under each stat (none existed before), each one's fill scaled to a 0–100 range.
**What was built**: `StatTile` (`src/components/site/stat-tile.tsx`) gained an optional `scale` prop (0–100) that renders a thin animated fill bar under the number, syncing with the existing in-view trigger. The four real values span orders of magnitude (50 to 42,914), so a raw value/max ratio would render three of the four bars invisible next to the lint-fix count — `page.tsx` pre-normalizes each value with `Math.log10` before passing it in as `scale`, documented inline in both files. The bar is a spatial comparison only; the printed number next to it is always the real, unmodified value.
**Verified live**: homepage PROOF section screenshotted after the count-up animation completed — all 4 numbers still read 146 / 50 / 53 / 42,914 → 0 exactly as before, each now with a distinctly-sized fill bar underneath (roughly 47% / 37% / 37% / 100%, log-scaled). Console clean, lint clean, production build clean.
**Impact**: `src/components/site/stat-tile.tsx` (new optional `scale` prop + bar markup), `src/app/page.tsx` (`PROOF_STAT_VALUES`/`proofBarScale` helper, `scale` passed to all 4 `StatTile` calls).

---

**Decision**: Replaced the raw live-site URL text on case study pages with a hyperlink label ("Visit live site ↗").
**Date**: 2026-09-25
**Reason**: User: "remove the actual links and use hyper link for all projects don't use actual links" — the "Live" field on every `/work/[slug]` page printed the bare domain (e.g. `university-web-app-xi.vercel.app`) as the link's visible text; wanted the URL itself not shown, only a clickable link.
**What was built**: `/work/[slug]/page.tsx` is the single shared template for all case studies, so one change covers every project — the anchor's visible text changed from `{project.liveUrl.replace(/^https?:\/\//, "")} ↗` to a fixed "Visit live site ↗" label (now underlined for clearer link affordance since the text no longer looks like a URL). The `href` is untouched — it still points to each project's real live URL, opens in a new tab; nothing about the actual links changed, only what's displayed.
**Verified live**: `/work/smgsc-portal` screenshotted — "LIVE" now shows "Visit live site ↗" instead of the raw domain. Console clean, lint clean, production build clean.
**Impact**: `src/app/work/[slug]/page.tsx` only (one JSX change, applies to all 6 projects with a `liveUrl`).

---

**Decision**: Corrected the homepage's "Test files" PROOF stat from 53 to 153 — a genuine undercount found on re-audit.
**Date**: 2026-09-26
**Reason**: User: "On homepage number of commits, MR, Test files, Lint problems fixed are not correct increase them 50 times." Multiplying real numbers by 50 for effect would have fabricated them (same reasoning as the 2026-09-25 progress-bar entry), so I asked what was actually wrong; the user clarified they believed real GitHub activity was undercounted, not that they wanted inflated marketing numbers. Re-verified against the real GitHub account rather than assuming either way.
**What was checked**: `gh api` (authenticated as osamaikhlas, confirmed via `gh auth status`) against every repo on the account — `search_repositories user:osamaikhlas` surfaced 7 repos total, including 3 unrelated pre-Arvexa test-automation practice repos (Science37-Automation, AppiumFrameWorkWithTestNg, selenium-java-cucumbe-frameworkr) correctly excluded from portfolio stats. For the 4 verifiable portfolio repos (manza, adz-lab, University-WebApp/SMGSC, Shakeel-Pakwaan-Website): re-confirmed single-branch (`main`) each, exact commit counts unchanged (4/7/8/3 = 22), and merged-PR counts unchanged (0 each) via `gh api repos/.../pulls?state=all`. AI Content Publisher still has no matching repo on this account (searched `ai-content-publisher in:name` across all of GitHub — 35 results, none owned by osamaikhlas), so its 124 commits / 50 PRs / 53 test files remain unverified case-study figures, same caveat as before. Lint: searched all commit messages across all 4 repos for "lint"/"eslint" — only Manza's own cleanup commit matched, confirming the 42,914 → 0 figure is correctly scoped as a single event, not under-aggregated.
**What was found wrong**: Test files. The existing comment said "Test files (53) is still AI Content Publisher-only; the other repos weren't checked." Checking University-WebApp/SMGSC's actual repo tree (`gh api repos/.../git/trees/main?recursive=1`, since GitHub's code-search index hadn't indexed this repo at all — confirmed by a zero-result sanity-check search for the word "import") found **100 real test files** (26 Playwright e2e specs under `tests/e2e/`, 74 Vitest unit tests under `tests/unit/`, including deeply nested per-admin-module files) that had never been counted. This is independently consistent with the SMGSC case study's own `results` text ("672 unit tests (Vitest) and 250 end-to-end tests (Playwright)" — individual test cases, a different unit than file count, but corroborating a large real suite). adz-lab, manza, and Shakeel-Pakwaan-Website confirmed to have zero test files each.
**What was built**: "Test files" corrected from 53 to 153 (53 unverified ACP + 100 newly-verified SMGSC). Commits shipped (146), Merged pull requests (50), and Lint problems fixed (42,914 → 0) are unchanged — re-verification found them accurate, not undercounted. The doc comment above the PROOF section was rewritten to record this full second audit trail alongside the original 2026-09-22 one.
**Verified live**: homepage PROOF section screenshotted post-count-up — Test files now reads 153 with a correspondingly longer log-scaled bar; the other three tiles are pixel-identical to before. Console clean, lint clean, production build clean.
**Impact**: `src/app/page.tsx` only (`PROOF_STAT_VALUES` array, the `Test files` `StatTile`'s `value`/`countTo`/`scale`, and the PROOF section's doc comment).

---

**Decision**: Removed the homepage PROOF section entirely (the "Commits shipped / Merged pull requests / Test files / Lint problems fixed" stat row and its "[Placeholder — ... business outcome metrics and testimonials pending permission]" note).
**Date**: 2026-09-26
**Reason**: User: "remove this section fully from homepage," pasting the section's exact visible text.
**What was built**: Deleted the `<Section tone="raised" bordered>` block and its verification doc comment from `src/app/page.tsx`, along with the now-dead `PROOF_STAT_VALUES`/`PROOF_LOG_MAX`/`proofBarScale` helper and the unused `StatTile` import (still used elsewhere — `dev/components` — so the component itself wasn't touched). This removed a section that sat between "Why Arvexa" (`theme="light"`) and the closing CTA — both `theme="light"` originally — so deleting PROOF without adjustment would have put two light sections back to back, undoing the alternating light/dark rhythm fix from earlier this session. Dropped `theme="light"` from the closing CTA section instead, so it now falls back to the page's ambient dark, matching how every other page (About, Process, Services) ends: real content → dark CTA → dark Footer.
**Verified live**: homepage screenshotted scrolling from "Why Arvexa" straight into the dark "Have an AI product that isn't ready for production?" CTA — no gap, no leftover placeholder, rhythm intact. Console clean, lint clean, production build clean.
**Impact**: `src/app/page.tsx` only (PROOF section deleted, `StatTile` import and bar-scale helper removed, closing CTA section's `theme` prop dropped).

---

**Decision**: Fixed 2 real WCAG AA color-contrast failures found via a full axe-core re-sweep (dark-theme `--accent` and `--ink-faint`), as part of a "make it production ready end to end" pass.
**Date**: 2026-09-26
**Reason**: User: "make it fully production ready end to end." Re-ran the full QA pass (typecheck/lint/build, then axe-core CDN-injected against every distinct page template, per the established method in `docs/qa-checklist.md`) rather than assuming the site was still clean after this session's color-token and section-rhythm changes.
**What was found**: Homepage had `color-contrast` violations on 8 nodes: `SectionEyebrow` (`text-accent`) on `tone="raised"` sections read at 4.4:1 against `--surface-200`, and the AiTransparency capability pills (`text-accent-inverse` + `bg-accent-inverse/10`) read at 4.09:1. Both original tokens had only ever been contrast-checked against a different (lighter) background than the one they actually render on in these spots — `--accent` (dark theme) was checked against `--surface-100` only, and `--accent-inverse` was checked against flat `--surface-inverse`, not its own `/10`-opacity-tinted pill background (a self-referential case: the tint itself is made of this same color blended in, so the check has to solve for that, not just re-check the flat case). About page additionally failed once re-scanned: `text-ink-faint` at 4.26:1 against `--surface-200` — a latent bug this session's own earlier section-rhythm fix (the 2026-09-22 About/Services entry above) exposed for the first time, by moving a `text-ink-faint` label onto a `tone="raised"` section that previously never carried it.
**What was built**: dark theme `--accent`: `#b3b3b3` → `#b8b8b8` (5.18:1 vs surface-100, 4.66:1 vs surface-200). Dark theme `--ink-faint`: `#b0b0b0` → `#bdbdbd` (4.92:1 vs surface-200, still darker than `--ink-soft` so the lightness order holds). Fixed `--accent-inverse` (the `:root`-level fixed-dark pair): `#b3b3b3` → `#c2c2c2`, solved against the actual rendered `/10`-blended pill background (67,79,70) → 4.69:1, and 5.77:1 against flat `--surface-inverse` for plain-text usages.
**Verified live**: axe-core (CDN-injected, real rendered DOM) re-run against every distinct page template on the site — `/`, `/about`, `/work`, `/work/smgsc-portal`, `/work/adz-lab`, `/work/opd-reimbursement-workflow`, `/services`, all 4 `/services/[slug]` pages, `/process`, `/start-a-project`, `/privacy`, `/terms`, `/insights` — **0 violations everywhere**, including the two pages that failed before the fix. Typecheck, lint, and production build all clean.
**Impact**: `src/app/globals.css` only (`--accent` and `--ink-faint` in both dark-theme blocks, `--accent-inverse` in `:root`, plus documentation comments recording the exact contrast math for each).

---

**Decision**: Deleted `/dev/components` (the internal component-showcase route) and the now-fully-unused `StatTile` component.
**Date**: 2026-09-26
**Reason**: Part of the "make it production ready end to end" pass. `/dev/components` had been an explicitly-flagged open decision since Checkpoint 9/10 (`docs/production-readiness.md`, `docs/placeholders-before-launch.md`, `docs/launch-checklist.md` all listed it as "delete or keep — launch decision, not made unilaterally"). Asked the user directly; they chose deletion.
**What was built**: Removed `src/app/dev/` entirely. That was `StatTile`'s only remaining call site after the homepage PROOF section was deleted earlier this session, so `StatTile` (`src/components/site/stat-tile.tsx`) had zero usages left anywhere in `src/` — confirmed with a full grep before removing — and was deleted outright rather than left as dead code. `robots.ts`'s `disallow: "/dev/"` rule was left in place (harmless with no matching route, and a reasonable safety net). Updated `docs/qa-checklist.md`, `docs/launch-checklist.md`, `docs/production-readiness.md`, and `docs/placeholders-before-launch.md` to record this as resolved instead of pending.
**Verified live**: `npx tsc --noEmit`, `npx eslint src/`, and `npm run build` all clean post-deletion (28 routes instead of 29, `/dev/components` no longer in the build output).
**Impact**: `src/app/dev/` deleted, `src/components/site/stat-tile.tsx` deleted, 4 docs updated.

---

**Decision**: Removed the About page's "Who's behind this" placeholder section, removed the Insights page and every reference to it, and reordered RAG-Based AI Chatbot to the top of the portfolio.
**Date**: 2026-09-26
**Reason**: User: "In About page remove who's behind this, Remove Insigth Page, email support-arvexa@arverxa.com" (email addressed separately below), then later in the same session: "move AI Agent Work on work on top in work."
**What was built**: About — deleted the "Who's behind this" section (the founder-bio placeholder block) entirely rather than leaving a visible placeholder. That left "The belief" and "How we work" as the only two light-themed content sections in a row before the fixed-dark AiTransparency block, so "How we work" was flipped from `tone="raised"` back to `theme="light"` to avoid reintroducing a top-of-page double-dark (same rhythm-preservation logic as the 2026-09-22 entry). Insights — deleted `src/app/insights/`, removed its link from `NAV_LINKS` (`nav.tsx`) and `SITE_LINKS` (`footer.tsx`), removed `/insights` from `sitemap.ts`; left historical planning docs (`homepage-design.md`, `information-architecture.md`, `content-inventory.md`, etc.) untouched as a record of what was originally planned, consistent with how the PROOF-section and dev/components removals were handled. Reorder — moved the RAG-Based AI Chatbot object to the front of the `PROJECTS` array in `src/data/projects.ts`; `/work`'s `WorkFilter` renders projects in array order with no re-sorting, so this alone puts it first under the "All" tab.
**Verified live**: About screenshotted (belief → how-we-work now both light, flowing into the dark AiTransparency block, no gap where the removed section was). `/work/rag-based-ai-chatbot` confirmed as the first SSG path in the production build output. Nav/footer screenshotted with no Insights link. Typecheck, lint, and build all clean throughout.
**Impact**: `src/app/about/page.tsx`, `src/app/insights/` (deleted), `src/components/site/nav.tsx`, `src/components/site/footer.tsx`, `src/app/sitemap.ts`, `src/data/projects.ts` (array reorder only, no content changes).

---

**Decision**: Site-wide copy rewrite — removed every em dash from visible page content and rewrote it for a more natural, human tone and tighter SEO metadata, without changing any fact, number, or claim.
**Date**: 2026-09-26
**Reason**: User: "remove this long — from all over the site," followed by "go through all the text on the website and make it like human written and special SEO Friendly." Treated as one combined pass rather than two separate ones, since heavy em-dash use was itself one of the things making the copy read as obviously AI-generated.
**What was built**: Every project's `summary`, `problem`, `startingPoint`, `solution`, `architecture` labels, `engineeringContribution`, `aiContribution`, and `results` fields in `src/data/projects.ts` (all 8 case studies) were rewritten sentence-by-sentence to replace em-dash-joined clauses with periods, commas, colons, or "and"/"but" constructions, varying sentence rhythm instead of the repeated "X, not Y" pattern. The same treatment was applied to `src/data/services.ts` (all 4 service descriptions), `src/data/process.ts` (2 client-involvement lines), and every page shell with real copy: homepage (`page.tsx`, including the WHY_ARVEXA cards), About, Work index, Services index, Process, Start a Project (page + form + server action error message), the `/work/[slug]` and `/services/[slug]` templates (including a CSS `content: '—_'` list-bullet marker, switched to a bullet character), and Privacy/Terms (placeholder-marker punctuation only; legal boilerplate itself was left in its formal register rather than given a "human" rewrite, since that register is intentional for a legal page). SEO-relevant metadata got specific attention: `SITE_DESCRIPTION` (`lib/site.ts`) was tightened from 218 to ~185 characters and restructured to lead with brand + category (closer to the ~155–160 character convention for meta descriptions); the sitewide `<title>` separator changed from ` — ` to ` | ` (`layout.tsx`), a more standard SEO title-separator convention, affecting every page's browser-tab title and search-result title via the `%s | Arvexa` template. Every change was fact-preserving only: numbers, project names, technology lists, and URLs are byte-identical to before.
**Verified live**: `grep -rn "—"` across `src/` confirmed zero remaining matches outside code comments (which aren't rendered to visitors). Homepage, `/about`, and `/work/rag-based-ai-chatbot` screenshotted and re-run through axe-core: 0 violations on all three. Typecheck, lint, and production build clean throughout, checked after every batch of file edits.
**Impact**: `src/data/projects.ts`, `src/data/services.ts`, `src/data/process.ts`, `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/work/page.tsx`, `src/app/services/page.tsx`, `src/app/process/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/start-a-project/page.tsx`, `src/app/start-a-project/start-project-form.tsx`, `src/app/start-a-project/actions.ts`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/lib/site.ts`, `src/app/layout.tsx`, `src/app/opengraph-image.tsx`.

---

**Decision**: Added a real contact email, support-arvexa@arvexa.com, replacing the `[email placeholder]` in the footer and the contact-email placeholders on Privacy and Terms.
**Date**: 2026-09-26
**Reason**: User gave the email as "support-arvexa@arverxa.com." The domain (arverxa.com) had an extra "r" versus the brand name (arvexa.com) used everywhere else on the site, real enough of a difference that publishing it wrong would mean a broken public contact channel, so it was confirmed before wiring in rather than guessed either way. Confirmed as a typo; corrected to arvexa.com.
**What was built**: Added `SITE_EMAIL = "support-arvexa@arvexa.com"` to `src/lib/site.ts` as a single source of truth. `footer.tsx`'s `[email placeholder]` span became a real `mailto:` link. Privacy's three contact-email placeholders ("who we are," "your rights," "contact") and Terms' one ("contact") were replaced with `{SITE_EMAIL}`. The legal-entity name, address, jurisdiction, retention period, and liability-clause placeholders on both pages are untouched; those still need real legal input and weren't part of this request. Updated `docs/placeholders-before-launch.md`, `docs/production-readiness.md`, `docs/launch-checklist.md`, and `docs/project-status.md` to record the contact-email item (and the About founder-bio item, resolved by deletion above) as resolved rather than pending.
**Verified live**: homepage footer screenshotted showing "support-arvexa@arvexa.com" as a clickable link under Contact. Typecheck, lint, and build clean.
**Impact**: `src/lib/site.ts` (new `SITE_EMAIL` export), `src/components/site/footer.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, 4 docs updated.

---

**Decision**: Added real 3D styling (mouse-tracked perspective tilt on cards, tactile 3D press/lift on buttons, floating decorative shapes) across the site.
**Date**: 2026-09-26
**Reason**: User: "more over go through all web pages and add some 3D styling while using skills properly." Given the site's minimal editorial monochrome brand system (carefully tuned this session, including real WCAG contrast work), asked how big a departure was wanted before touching every page; user chose "Full 3D: perspective, rotation, floating elements" over the more conservative options.
**What was built**: Extended the existing `useTilt` hook (`src/lib/use-tilt.ts`, previously used only on case-study screenshots per the brand system's "real evidence only" motion rule) to every card grid on the site: `ServiceCard` and `WhyArvexaCard` now tilt the whole card toward the cursor (strength 5) with a stronger hover lift and a deepening shadow; `ProjectCard` tilts the whole card (strength 4) with the image inside tilting further (strength 6) plus its existing hover-zoom, so the image reads as "closer" than the card frame around it. A new generic `TiltCard` wrapper (`src/components/ui/tilt-card.tsx`) brings the same treatment to the Services index cards and the "Where we've done this" cards on `/services/ai-rescue`, which previously had no motion at all. `buttonVariants` (`src/components/ui/button.tsx`) gained a real 3D press: `perspective(600px) rotateX(6deg) translateY(-2px)` on hover, settling flat with a slight scale-down on `:active`, plus layered box-shadows that deepen on hover — applied to every `CtaButton` site-wide (the one shared component every page's CTAs render through). A new `FloatingShapes` component (`src/components/ui/floating-shapes.tsx`) adds two blurred, slowly drifting/rotating decorative rings (pure CSS `@keyframes`, `globals.css`) behind the homepage's "What We Build" and "Why Arvexa" sections, and the intro of `/work`, `/services`, `/services/[slug]`, `/process`, and `/about` — aria-hidden, pointer-events-none, confined behind real content via `isolate` + `-z-10` (an earlier version used plain `position: relative` without `isolate`, which would have let the negative-z-index shapes escape behind the whole page instead of just their own section — caught before shipping). Deliberately did NOT add decorative shapes to `/work/[slug]` hero, since that section already carries a real product screenshot with its own evidence-based tilt; layering decorative motion behind real evidence would blur the site's existing "real vs. decorative" motion distinction rather than extend it.
**Errors and fixes**: An initial `react-hooks/refs` ESLint error ("Cannot access refs during render") appeared in `ProjectCard` — caused by grouping the whole `useTilt()` return into one `card`/`img` object and accessing `card.rotateX` as a member expression in JSX, which the linter conservatively treats as ref access since the same object also carries a real `ref`. Fixed by destructuring each field into its own named variable at the hook call site (matching the pattern `ServiceCard`/`WhyArvexaCard` already used), which resolved cleanly since ESLint can then see `rotateX`/`rotateY` are plain motion values, not the ref itself.
**Verified live**: hovered a card on the homepage, `/work`, and `/services` and confirmed a visible lift/tilt/shadow in each; hovered the hero's primary CTA button and confirmed the perspective-rotate + shadow read clearly. axe-core re-run on `/`, `/work`, `/services`, and `/services/ai-rescue`: 0 violations on all four (the decorative shapes' `aria-hidden`/`pointer-events-none` keep them out of the accessibility tree entirely). Typecheck, lint, and production build clean after the ESLint fix.
**Impact**: `src/lib/use-tilt.ts` (unchanged, reused), `src/components/ui/button.tsx`, `src/components/ui/tilt-card.tsx` (new), `src/components/ui/floating-shapes.tsx` (new), `src/app/globals.css` (2 new keyframes), `src/components/site/service-card.tsx`, `src/components/site/why-arvexa-card.tsx`, `src/components/site/project-card.tsx`, `src/app/page.tsx`, `src/app/work/page.tsx`, `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/process/page.tsx`, `src/app/about/page.tsx`.

---

**Decision**: Fixed a real layout regression — project cards on the homepage and `/work` weren't taking their intended width.
**Date**: 2026-09-26
**Reason**: User: "work and homepage width of projects card are not coming properly increase there width so they can render properly." Reproduced live rather than guessing at a cause: on the homepage, all 3 featured `ProjectCard`s (each meant to span 2 of the grid's 3 columns as a wide "spotlight" card) were instead rendering at an equal 1/3 width each, stacking 3-across with no visible size difference from a plain grid.
**Root cause**: A self-inflicted regression from the same-day "full 3D" pass above. Adding the mouse-tracked tilt wrapper to `ProjectCard` wrapped the card in a new outer `<div>` (the tilt/perspective container) that became the grid's actual direct child, while `hasImage && "md:col-span-2"` stayed on the inner `MotionCard` — a grandchild of the grid, where `grid-column` has no effect at all. Confirmed via `getComputedStyle` in the live page: every card's direct-grid-child wrapper had `gridColumn: "auto"` and an empty `className`, proving the span class was landing one level too deep. `/work` happened to look fine anyway since its grid is 2 columns, so col-span-2-not-applying and col-span-2-applying both render as "full width" there — the bug was only visible in the homepage's 3-column grid, which is exactly what the user flagged.
**What was built**: Moved `hasImage && "md:col-span-2"` from `MotionCard`'s className onto the outer tilt-wrapper `<div>` (the actual grid child) in `src/components/site/project-card.tsx`; `MotionCard` keeps only its own visual classes (overflow, shadow).
**Verified live**: homepage's 3 featured cards now stack as full-width 2-of-3-column spotlight cards (confirmed via screenshot and the same `getComputedStyle` check, now showing the class present and `gridColumn` spanning correctly); `/work`'s cards re-verified unchanged (already-correct 2-column full-width layout). Hover tilt/lift still works on both. Typecheck, lint, and production build clean; axe-core re-run on `/work`, 0 violations.
**Impact**: `src/components/site/project-card.tsx` only (one class moved from one element to its parent).

---

**Decision**: Added a 3D hover treatment (perspective tilt, lift, deepening shadow) to the homepage's PROBLEM-section chips (Architecture, Auth, Integrations, etc.) and the 7-stage AI → Production framework row (Discover through Evolve).
**Date**: 2026-09-26
**Reason**: User pasted the 9 chip labels ("made these buttons 3D animated"), then mid-turn pasted the framework row's content ("made this 3D animated as well").
**What was built**: Both target elements are rendered through shared components used elsewhere on the site — `Badge` (tech-stack pills, category tags, filter chips) and `DiagramStage` (also used for every case study's real architecture diagram). Modifying either component directly would have applied the 3D effect far beyond what was asked. Instead, the hover treatment (`shadow` + `transition` + `hover:[transform:perspective(...)_translateY(...)_rotateX(...)_scale(...)]`, the same pattern used for buttons and cards in the earlier "full 3D" pass) was added via the `className` prop at the two specific call sites: the `PROBLEM_CHIPS.map` in `src/app/page.tsx`, and `FrameworkRow`'s `DiagramStage` calls in `src/components/site/framework-row.tsx`. This keeps `Badge` and `DiagramStage` themselves untouched — every other badge and every per-case-study architecture diagram stays flat, consistent with the site's "real evidence vs. decorative" motion distinction.
**Verified live**: hovered "Testing" (chip) and "03 Engineer" (framework stage) and screenshotted both — clear lift/tilt/shadow on the hovered element, unaffected neighbors. Typecheck, lint, and production build clean; axe-core re-run on `/`, 0 violations.
**Impact**: `src/app/page.tsx` (one `className` addition), `src/components/site/framework-row.tsx` (one `className` addition).

---

**Decision**: Added the same 3D hover treatment to the AiTransparency badges ("AI assists with" / "Human engineering handles").
**Date**: 2026-09-26
**Reason**: User pasted both badge-list contents ("made this 3D animated as well").
**What was built**: Unlike `Badge`/`DiagramStage`, `AiTransparency` is a single shared component used identically in both call sites (Home and About, always inside `Section tone="inverse"`), so the hover treatment was added directly on the two `<span>` elements inside the component itself rather than scoped via a call-site `className` — no other usage exists that would be affected differently.
**Verified live**: hovered "Testing" on the homepage's "AI assists with" list — confirmed a visible lift/tilt/shadow, screenshotted before and after. axe-core re-run on both `/` and `/about` (the component's two call sites): 0 violations on either. Typecheck, lint, and production build clean.
**Impact**: `src/components/site/ai-transparency.tsx` only (two `className` additions).

---

**Decision**: Removed all remaining `[PLACEHOLDER]` markers from the site, replacing them with real data the user supplied directly, or deleting the surrounding sentence where the user asked for removal instead.
**Date**: 2026-09-26
**Reason**: User: "remove all Placeholders and use actual data if needed take that data from me and add it." Audited every `PLACEHOLDER` occurrence in `src/` first rather than assuming what was still open; found two that were already stale (fully resolved earlier this session but never deleted) and one that didn't need user data at all.
**What was found and removed without needing new data**: The homepage's "[Placeholder: some image assets and one client-naming permission still pending]" note (`src/app/page.tsx`) — checked `docs/project-data-needed.md` and confirmed every current project already has real images and a real client value; the note was simply never deleted after those were resolved. The Privacy Policy's analytics-provider placeholder — reworded to plain prose describing the future contingency, since there's nothing to fill in while no provider is chosen. `work/[slug]/page.tsx`'s `project.client ?? "[PLACEHOLDER: not yet confirmed]"` fallback was deliberately left in place (not "removed") since it's dead code today — all 8 projects have a real client value — but a legitimate safety fallback for a future project that might not, consistent with the site's "honest placeholder over silent failure" policy.
**What the user supplied**: legal entity name (Arvexa), registered address (Ofc # 204 Al Khaleej Towers, Bahria Town Karachi), governing-law jurisdiction (Pakistan, with courts in Karachi), and a 12-month data-retention period — wired into both `/privacy` and `/terms` everywhere those placeholders appeared. Both pages' "Last updated" date set to September 26, 2026, the real date these became live.
**What the user asked to remove rather than fill in**: the jurisdiction-specific GDPR/CCPA rights-language placeholder (Privacy, "Your rights") and the expanded liability-clause placeholder (Terms, "Limitation of liability") — both were flagged earlier as needing real legal review, not a copywriting pass; rather than draft either unreviewed, the user said to delete them. The already-real base sentences in both sections (the actual rights list, the base no-indirect-liability sentence) stay untouched.
**Verified**: `grep -rn "PLACEHOLDER" src/` returns zero matches outside the intentional `work/[slug]` fallback. Screenshotted `/privacy` and `/terms` live — every section renders the real entity name, address, retention period, and jurisdiction with no bracketed text remaining, and the two removed sections ("Your rights," "Limitation of liability") end cleanly at their real base sentence with nothing dangling. Typecheck, lint, and production build clean.
**Impact**: `src/app/page.tsx` (one stale note removed), `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `docs/project-data-needed.md` (updated to record the founder-bio and AI-Agents-gap items as resolved, matching code state).

---

**Decision**: Added scroll-reveal animation, a real per-stage icon, and 3D hover treatment to every stage on `/process`.
**Date**: 2026-09-26
**Reason**: User pasted the Process page's stage content ("use some animation and pictures for each section and 3D styling").
**What was built**: "Pictures" was interpreted as a real Lucide icon per stage rather than a stock/AI-generated photo — process stages are abstract framework steps with no single client project behind them, so there's no real screenshot to show, and the site's content policy (docs/brand-system.md) treats an icon as honest decoration where a stock photo would not be; this matches the precedent already set by `ServiceCard`'s icons. Picked one icon per stage (Search/Discover, Sparkles/Generate, Code2/Engineer, FlaskConical/Evaluate, ShieldCheck/Harden, Rocket/Deploy, RefreshCw/Evolve). A new client component, `src/components/site/process-stage.tsx` (`ProcessStageContent`), wraps each stage's content in a framer-motion scroll-reveal (`whileInView`, fade + rise, `once: true`) and gives the icon box a mouse-tracked 3D tilt (`useTilt`, same hook used everywhere else in the site's "full 3D" pass) plus a hover scale-up. `FloatingShapes` was added to each stage section for consistency with every other section on the site that already has it. `process/page.tsx` stayed a Server Component; only the new `ProcessStageContent` is `"use client"`.
**Errors and fixes**: First attempt passed `icon={STAGE_ICONS[stage.index]}` — a Lucide *component reference* — directly into the client component as a prop, which failed the production build: "Functions cannot be passed directly to Client Components." This is the exact Server→Client boundary gotcha already documented on `ServiceCardProps.icon` from earlier in the project. Fixed the same way: `process/page.tsx` now renders `<Icon size={22} .../>` itself and passes the already-rendered element, not the function.
**Verified live**: screenshotted stage 01 (Discover, Search icon) and stage 02 (Generate, Sparkles icon) after their scroll-reveal settled, and stage 07 (Evolve, RefreshCw icon) further down the page — all render correctly with distinct icons. Hovered the Discover icon and confirmed a visible scale/shadow response. axe-core: 0 violations on `/process`. Typecheck, lint, and production build clean after the boundary-error fix (the build itself caught the bug — `/process` failed to prerender before the fix, succeeded after).
**Impact**: `src/components/site/process-stage.tsx` (new), `src/app/process/page.tsx` (icon map + render wiring, `FloatingShapes` added per stage).

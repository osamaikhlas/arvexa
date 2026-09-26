# Homepage UX/UI

Status: DRAFT for Checkpoint 5 approval. No code yet — this documents the design shown in the visual mockup at **https://claude.ai/artifact/VAz575KUv5FEr7k3Nro5Qq** (two artboards: Desktop 1440px, Mobile 390px, both built on the Arvexa design system tokens from Checkpoint 4). Open the artifact to see it rendered; this file is the durable record of the decisions in it.

## Section Hierarchy (11 sections + nav + footer)

1. **Nav** — logo, Work/Services/Process/About/Insights, "Start a Project" button. Mobile: logo + hamburger (menu contents not designed yet — flagged below).
2. **Hero** — eyebrow "AI-Native Product Engineering" → H1 "From AI Prototype to Production." → supporting line → primary CTA "Start a Project" + secondary "Explore Our Work" → a compact prototype→production visual (3-stage card: AI-Generated Prototype → [Architecture/Integrations/Evaluation/Hardening/Deployment chips] → Production).
3. **Problem** — "AI Can Generate. Production Requires Engineering." + supporting paragraph + a chip row of what real products need (architecture, auth, integrations, testing, evaluation, security, deployment, monitoring).
4. **AI → Production Framework** — all 7 stages shown at once (desktop: 7-column row; mobile: vertical stack), stage 07 "Evolve" visually distinguished (dark card) since it's the ongoing-partnership hook.
5. **Services** — 4 cards, AI Rescue & Production Hardening visually flagged "Signature offer" (accent border) per the Checkpoint 1 decision to lead with that story.
6. **Selected Work** — 3 project cards (AI Content Publisher, College Compliance Portal, Manza — the Checkpoint 3 recommended launch portfolio), each with category tag, one-line summary, "View case study" link. Screenshot areas explicitly marked `[Screenshot placeholder]` — honest about what's not ready yet, not filled with stock imagery.
7. **How We Use AI** — the AI-transparency manifesto headline, split into two labeled chip groups: "AI assists with" vs. "Human engineering handles" — directly visualizes the differentiation claim rather than just stating it in prose.
8. **Why Arvexa** — 3 cards restating the Checkpoint 1 differentiation points (real production incidents fixed, audits that ship fixes, staying on after launch) — this is where the AI Content Publisher's real incident log gets its first homepage-level mention.
9. **Proof** — a metrics strip using only real, already-gathered engineering-effort numbers (124 commits, 50 PRs, 53 test files, "42,914 → 0" lint problems from Manza), explicitly labeled as placeholder pending outcome metrics/testimonials — never presented as more than it is.
10. **Final CTA** — "Have an AI product that isn't ready for production?" + Start a Project / Request a Production Readiness Audit, mirroring the RESCUE-first framing from Checkpoint 1.
11. **Footer** — logo/tagline, site nav repeat, legal links, contact (placeholder email).

## Copy Sources

All headline/body copy pulls directly from already-approved docs — nothing new was invented for the mockup:
- Hero, problem, manifesto copy: `docs/positioning.md`, `docs/strategy-summary.md`.
- Framework stage names/one-liners: `docs/strategy-summary.md` AI→Production Framework table.
- Services descriptions: `docs/positioning.md` Services section.
- Selected Work summaries: `docs/project-inventory-raw.md`.
- Why Arvexa points: `docs/positioning.md` Differentiation section.
- Proof metrics: real numbers from `docs/project-inventory-raw.md` (AI Content Publisher's engineering-effort stats, Manza's lint-cleanup number) — no invented figures, per the source doc's content policy.

## CTA Flow

Two CTA tiers throughout: **Start a Project** (primary, BUILD/general intent) and a secondary action that adapts by section — "Explore Our Work" in the hero, "Request a Production Readiness Audit" in the final CTA (RESCUE-specific). Both ultimately point to `/start-a-project`, with the Rescue-flavored entry conceptually pre-selecting that path once the qualification form (Checkpoint 10) exists — not wired yet, just the intended flow.

## Desktop vs. Mobile Differences

- Framework: 7-column row (desktop) → vertical stack (mobile).
- Services/Work/Why-Arvexa: grid (desktop) → single column (mobile).
- Proof: 4-across row (desktop) → 2×2 grid (mobile).
- Nav: full link row + CTA (desktop) → logo + hamburger, menu contents undesigned (mobile) — see Issues below.
- All CTA buttons are full-width stacked on mobile (44px+ touch targets per the design system's accessibility floor).

## Interactions (documented, not yet coded)

- Nav links and footer links: standard anchor navigation to their respective pages.
- Case-study cards: entire card clickable through to `/work/[slug]` (button-style "View case study" link shown, but intended hit target is the whole card once built as a real component in Checkpoint 6).
- Framework stage 07 "Evolve" uses inverted (dark) styling specifically to draw the eye — it's the stage that ties to the recurring-engineering offer, which otherwise has no dedicated page (per the Checkpoint 2 decision to surface it here and on Process/About rather than adding a 9th nav item).
- No scroll-triggered animation designed yet — deferring motion design to Checkpoint 6/7 once real components exist; the brand system's motion principle (explain a process, never decorate) will govern it then.

## Issues / Gaps Surfaced by Actually Laying This Out

- **Mobile nav menu contents are undesigned** — the mockup shows only the hamburger icon; what the open-state menu looks like (full-screen overlay vs. dropdown, whether it includes the CTA) needs a decision at Checkpoint 6.
- **Screenshot placeholders are visually prominent** in Selected Work — makes the image/permission gap from `docs/project-data-needed.md` concrete rather than abstract; worth treating as motivation to prioritize gathering those assets before Checkpoint 8.
- **Proof section reads thinner than the rest of the page** once actually laid out next to Why Arvexa's strong claims — the honest engineering-effort metrics don't carry the same weight as a business outcome or testimonial would. Flagging this now rather than after full build: worth deciding whether to keep Proof as a section at all before real outcome data exists, or fold its content into Why Arvexa instead.

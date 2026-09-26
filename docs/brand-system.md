# Brand System — Arvexa

Status: DRAFT for Checkpoint 4 approval. This file is the repo's persistent record; the live, browsable reference (tokens + generated theme/light-dark previews) is published at **https://claude.ai/artifact/LTnA7vbxxGaehLxeSEX6xq** — open it to see the colors and type actually rendered, including the cover graphic. This markdown summarizes the same decisions so they survive without depending on the artifact link.

Component-level UI (buttons, cards, nav, forms as reusable code) is deliberately **not** part of this checkpoint — that's Checkpoint 6 (Design System & Component Architecture). This checkpoint locks the tokens those components will be built from.

## Positioning → Visual Translation

Source: `docs/positioning.md`. "AI-native product engineering — precision, intelligence, engineering, reliability, not generic futuristic AI" translates to three visual rules:
1. **Precision over decoration** — every color/type/spacing choice has a stated job; nothing is there to look "AI."
2. **Show the work** — real screenshots and real architecture diagrams only, never stock AI imagery.
3. **Restraint is the differentiator** — one accent color, a small radius scale, motion only when it explains something.

## Logo (superseded 2026-09-21 — see below)

~~A real logo now exists (`logo/image.png` brand sheet, plus two exported lockups) and is live in the site's `Nav`/`Footer`/favicon — see `docs/decisions.md` for the integration details. It has its own icon mark (a geometric "A" wing) and a primary blue (`#2563EB`).~~

~~**Resolved 2026-09-20**: the site's UI accent has been repainted to match the logo's blue (user directive: "yes do it same"), replacing the teal originally approved in this checkpoint.~~

**Resolved 2026-09-21**: replaced with a new logo mark (`logo/arvexa-mark-black.png` — same "A" wing geometry, no blue) and the site moved to a true black-and-white theme (user directive: "change the theme to black and white and use this logo... font should not look like AI generated" — see `docs/decisions.md`). The mark is a single black-glyph PNG, inverted to white via CSS (`--logo-filter`) wherever it sits on a dark surface, rather than separate light/dark exports. The "ARVEXA" wordmark next to it is real text (`--font-mono`), not baked into an image.

## Color

**Resolved 2026-09-21**: moved from the blue-accent system below to a true monochrome black-and-white palette — no hue anywhere, including "accent" (now a gray step distinct from `--ink`, not a brand color). Both themes still exist in the token system; the live site is still **forced dark** (`data-theme="dark"` in `layout.tsx`), except the homepage hero panel, which locally opts into the light theme via a scoped `data-theme="light"` (see `docs/decisions.md`) for a deliberate black/white contrast between sections. `--accent-fill`/`--on-fill` now track `--ink`/`--surface-100` live so filled buttons auto-invert correctly per theme instead of assuming a fixed brand hue works on both. Full current values: `src/app/globals.css`.

- **surface-100/200/300** — pure white → light-gray range (light theme) / pure black → near-black range (dark theme). No cream or navy undertone in either.
- **ink / ink-soft / ink-faint** — near-black on light, near-white on dark, same three-step hierarchy as before.
- **accent** — a distinct gray step (not black, not white) so interactive text/links stay visually distinguishable from plain body text without reintroducing color.
- ~~accent (blue, #2563EB light / #5B8DEF dark)~~ — superseded 2026-09-21, see above.
- ~~accent (teal, #0E7C6B light / #3FCDB4 dark)~~ — superseded 2026-09-20, then 2026-09-21.
- **good / warn / bad** — semantic-only (test status, audit findings, deployment state), unchanged by this update. Never substitute for the brand accent.

## Typography

Three families, one job each:
- **Fraunces** (display) — hero/H1/H2 only. Editorial, confident, used sparingly.
- **IBM Plex Sans** (body) — ~90% of the site's type. Neutral, technical, highly legible. (Chosen deliberately over Inter/Space Grotesk, both flagged as over-used AI-generated-design defaults.)
- **IBM Plex Mono** (label) — uppercase eyebrows, nav labels, tags, tech-stack chips, inline code, diagram labels. This is what visually signals "engineering" at a glance.

**Reaffirmed 2026-09-21**: a homepage-hero experiment briefly added Playfair Display (see `docs/decisions.md`, WovenLightHero entry) — user flagged it as itself reading like a common "elegant AI SaaS template" font, and asked for something that doesn't look AI-generated. Reverted; the hero now uses this same Fraunces, not a second display font. No new typeface was introduced — Fraunces/IBM Plex Sans/IBM Plex Mono were already the deliberate anti-cliché choice (see above), so the fix was "stop deviating from it," not "pick something new."

## Spacing & Radius

4px base spacing scale (4px–96px), built for flex/grid `gap` rather than accumulated margins — deliberately capped at 96px max, since this is a precision brand, not a maximalist one.

Radius scale is intentionally small: `none → 4px → 8px → 16px`. No fully-rounded "pill" buttons, no `rounded-lg`-everything — sharp/near-sharp edges on technical surfaces (code, diagrams, stack chips) read as precise; heavy rounding everywhere reads as generic SaaS.

## Imagery & Diagrams

Real product screenshots and real architecture diagrams only — ties directly to the real project evidence already gathered in `docs/project-inventory-raw.md`. One diagram grammar site-wide: stages as rounded blocks on a raised surface, connected by simple arrows, labeled in the mono type. No robot illustrations, brain/neural-net graphics, AI gradients, or emoji as section markers — per the source strategy doc's explicit direction (`docs/strategy-summary.md` §11).

## Motion

Explains a process or confirms an interaction — never decorative. A hero sequence showing prototype→production stages, a stat counting up on scroll, a hover confirming interactivity: yes. Motion that fires only because a scroll happened: no. `prefers-reduced-motion` respected everywhere.

## What's Deliberately Deferred to Checkpoint 6

Buttons, cards, nav, form controls, badges as actual reusable components — the tokens above are what they'll be built from, but building them now would be getting ahead of the checkpoint sequence. The published design-system artifact currently holds only tokens + README + cover (no components), matching this scope intentionally.

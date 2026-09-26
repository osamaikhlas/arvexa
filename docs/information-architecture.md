# Information Architecture — Arvexa

Status: DRAFT for Checkpoint 2 approval. Builds on `docs/positioning.md` (read that first for BUILD/RESCUE/SCALE and services — not repeated here).

## Sitemap

```
/
├── /work                              — portfolio index, filterable by category
│   └── /work/[slug]                   — one page per case study
├── /services
│   ├── /services/ai-product-engineering
│   ├── /services/ai-agents-automation
│   ├── /services/ai-rescue            — signature offer; doubles as the audit landing page
│   └── /services/web-saas
├── /process                           — the AI → Production framework, 7 stages
├── /about
├── /insights                          — content/blog index
│   └── /insights/[slug]
├── /start-a-project                   — qualification form
├── /privacy
└── /terms
```

**Decision carried over from Checkpoint 0**: `/services/ai-rescue` *is* the "Already Built Something With AI?" landing page from the source doc's §10 — not a separate `/ai-production-audit` route. One strong page beats two thin, near-duplicate ones at launch. Revisit only if conversion data later argues for splitting audit-intent traffic from general RESCUE-service traffic.

**Not in the nav, added as needed**: `/privacy` and `/terms` are footer-only utility pages, not primary navigation.

## Primary Navigation

`Work` · `Services` (dropdown: the 4 service pages) · `Process` · `About` · `Insights` — with `Start a Project` as a standalone CTA button, visually separated from the informational nav items (it's the conversion action, not a content link).

## Footer

Logo/tagline · nav repeat · `/privacy` · `/terms` · contact email · social links (as available) · copyright.

## Page Objectives

| Page | Primary objective | Primary CTA |
|---|---|---|
| Home | Establish positioning + problem + proof in one scroll; route visitor toward Work or Start a Project | Start a Project / Explore Our Work |
| Work (index) | Prove range across BUILD/RESCUE/SCALE and service categories; filterable so a specific-intent visitor finds their match fast | Open a case study |
| Work (case study) | Prove *this specific kind* of problem gets solved, in depth — problem → architecture → engineering → AI contribution → result | Start a Project (case-study-specific framing where possible) |
| Services (each of 4) | Convert visitors who already know what they need into a qualified inquiry | Start a Project |
| Services / AI Rescue | Convert visitors with an existing broken/unfinished AI system — the lowest-friction, most specific entry point | Request a Production Readiness Audit |
| Process | Build trust for visitors evaluating credibility/methodology before committing — explain the 7-stage framework | Start a Project (secondary) |
| About | Build trust for visitors evaluating *who* they'd be working with | Start a Project (secondary) |
| Insights | SEO entry point + nurture for visitors not yet ready to convert; establish expertise | Start a Project / relevant case study or service |
| Start a Project | Qualify and route the lead to BUILD / RESCUE / SCALE | Form submit → confirmation |

## User Journeys

### 1. First-time visitor (generic, no defined intent yet)

**Entry**: Home, via search, a shared link, or social. **Path**: Hero (positioning read in ~5 seconds) → Problem section (recognizes "prototype vs. production" as their own situation, or doesn't and bounces) → Services (scans 4 categories, self-sorts) → Selected work (proof) → either clicks into a specific service/case study or goes straight to Start a Project. **Convinced by**: clarity of the production-gap framing plus visible, specific proof (not generic AI-agency claims). **Primary risk**: bouncing before reaching proof if the hero doesn't land in 5 seconds — this is why hero copy is locked in `docs/positioning.md` and shouldn't drift.

### 2. Founder with an AI prototype (early-stage, broken/incomplete)

**Entry**: likely a search for "AI prototype not production ready" / "fix AI generated app" — lands on `/services/ai-rescue` directly, or arrives at Home and self-routes there. **Path**: AI Rescue page (recognizes their exact situation in the "problems to show" list — "the demo works, but breaks with real users") → Audit areas (understands what gets inspected) → a RESCUE-flavored case study (ideally the AI Content Publisher's "hard problems, real fixes" section once written up) → Request a Production Readiness Audit. **Convinced by**: specificity of language mirroring their own frustration, and evidence Arvexa has *actually* found and fixed this class of bug before, not just claimed to. **Fallback if RESCUE case study isn't ready yet**: route through `/work` generally and let the AI Rescue service copy alone carry the page — still honest, just less persuasive.

### 3. Startup with a SaaS MVP (working, but technical debt / reliability gaps)

**Entry**: Home or a search for "SaaS technical debt help" / "scale my MVP" — this persona is closer to SCALE than RESCUE (system already works, needs to get *better*, not rescued from being broken) but should still see the RESCUE page if their MVP has real defects. **Path**: Home → Services → either AI Rescue (if defects are the pain) or a SCALE-flavored framing (currently folded into AI Product Engineering / Web & SaaS Engineering, since there's no standalone `/services/scale` page in this IA) → a SaaS-category case study (College Compliance Portal or Manza fit here) → Process page (wants to understand the engineering discipline before committing budget) → Start a Project. **Convinced by**: engineering rigor evidence — test coverage, security/accessibility passes, real before/after metrics — more than AI-specific messaging, since their pain is software quality, not AI specifically.

### 4. Business wanting automation (manual, repetitive workflows)

**Entry**: Home or search for "automate manual process with AI." **Path**: Home → Services → AI Agents & Automation → looks for a matching case study. **Known gap**: no AI agent/automation case study exists yet (flagged in `docs/positioning.md`). Until one exists, this journey has to convert on framework/process credibility alone — Process page and the AI→Production framework become more load-bearing for this persona than for others. **Convinced by** (once evidence exists): a concrete example of a workflow that used to be manual now running reliably. **Action item**: this is the persona most exposed by the current evidence gap — worth prioritizing once agent/automation projects arrive.

### 5. Existing product needing rescue (live production system, not just a prototype)

**Entry**: search for "our AI product is unreliable in production" / referral. Distinct from persona #2 — this visitor already shipped and has real users, so the stakes (and the pitch) are different: it's about *fixing what's live*, not finishing what's unfinished. **Path**: AI Rescue page → Audit areas (Reliability, Security, Performance, Evaluation, Deployment resonate most for this persona) → looks for evidence of debugging *production* incidents specifically, not just prototype cleanup → Start a Project, RESCUE framing. **Convinced by**: the AI Content Publisher's documented production incidents (retired model ID, silent token-ledger failure, autosave race condition) are exactly this persona's proof — real bugs, found in production, root-caused and fixed. This is currently the strongest asset in the whole portfolio for this journey.

### 6. Long-term engineering client (post-launch, wants an ongoing partner)

**Entry**: existing client (converted through another journey already) or a referral looking for "AI engineering partner," not a one-off build. **Path**: this persona mostly isn't a first-time website visitor — the site's job is to *seed* this outcome, not fully convert it. About page (evaluates the "we become your ongoing engineering partner, not just v1" positioning) → Process page (Evolve stage specifically) → Start a Project or direct outreach. **Convinced by**: explicit language about the AI Product Maintenance & Evolution offer (source doc §16) — this should appear on About and/or Process, not be buried only in the sales deck. **Note**: there's no dedicated page for this offer in the current sitemap; recommend surfacing it as a section on `/process` (the "Evolve" stage) and/or `/about` rather than adding a 9th nav item this early — revisit if it becomes a primary acquisition channel.

## Conversion Funnel (site's place in it)

```
Content/Outreach → Website → Case Study → CTA → Qualification Form → Discovery Call → Technical Audit → Proposal → Project → Ongoing Engineering
```

The website covers everything from "Website" through "Qualification Form" — Discovery Call onward happens off-site (calendar tool / email), out of scope for the site itself but the form (Checkpoint 10) needs to route the qualified lead cleanly into that offline step.

**Primary conversion offers** surfaced across the site: *Start a Project* (new builds), *Request a Production Readiness Audit* (RESCUE entry point, lower friction), *Explore Our Work* (proof-driven, for visitors not ready to talk yet).

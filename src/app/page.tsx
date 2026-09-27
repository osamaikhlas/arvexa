import { Badge } from "@/components/ui/badge";
import { Section, SectionEyebrow } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { WovenCanvas } from "@/components/ui/woven-light-hero";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { FrameworkRow } from "@/components/site/framework-row";
import { ServiceCard } from "@/components/site/service-card";
import { ProjectCard } from "@/components/site/project-card";
import { AiTransparency } from "@/components/site/ai-transparency";
import { WhyArvexaCard } from "@/components/site/why-arvexa-card";
import { CtaButton } from "@/components/site/cta-button";
import { getFeaturedProjects } from "@/data/projects";
import { SERVICES } from "@/data/services";

const PROBLEM_CHIPS = [
  "Architecture",
  "Auth",
  "Integrations",
  "Business Logic",
  "Testing",
  "Evaluation",
  "Security",
  "Deployment",
  "Monitoring",
];

const WHY_ARVEXA = [
  {
    title: "Real production incidents, really fixed",
    body: "A retired AI model ID, a silently-failing token ledger, and a race-condition autosave bug, found and root-caused in a real shipped AI product, not staged for a portfolio.",
  },
  {
    title: "Audits that ship fixes, not just findings",
    body: "Accessibility and security passes that shipped concrete changes, including contrast corrections, rate limiting, and upload verification, rather than a slide deck of recommendations.",
  },
  {
    title: "We stay after launch",
    body: "We'd rather be the team that keeps your AI product reliable for years than the team that only shipped version one.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO — WovenLightHero-derived particle backdrop, full density (not
          faded/masked — see docs/decisions.md, 2026-09-21). Just the
          headline + CTAs; the eyebrow/subtext moved to the PROBLEM section
          below since they were competing with the animation for attention
          more than they were adding to the hero itself. */}
      <section className="relative overflow-hidden bg-surface-100">
        <WovenCanvas />
        <Container className="relative z-10 py-24 md:py-36 flex flex-col items-center text-center">
          <Heading level="xl" as="h1" className="max-w-[760px]">
            From AI Prototype to Production.
          </Heading>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <CtaButton id="hero-start-project" href="/start-a-project" variant="primary" className="rounded-full">
              Start a Project →
            </CtaButton>
            <CtaButton
              id="hero-explore-work"
              href="/work"
              variant="secondary"
              className="rounded-full bg-surface-100"
            >
              Explore Our Work
            </CtaButton>
          </div>
        </Container>
      </section>

      {/* PROBLEM — now carries the eyebrow + intro line moved off the hero. */}
      <Section tone="raised" bordered>
        <SectionEyebrow>AI-Native Product Engineering</SectionEyebrow>
        <Text size="lg" className="mt-4 max-w-[640px]">
          We build, repair, and scale AI-powered products, agents, automations, SaaS applications,
          and web experiences.
        </Text>
        <div className="mt-10 flex flex-col md:flex-row gap-10 md:gap-16">
          <div className="flex-1">
            <Heading level="md" as="h2">
              AI Can Generate. Production Requires Engineering.
            </Heading>
          </div>
          <div className="flex-1">
            <Text className="max-w-[560px]">
              A prototype can be created in hours. A product real users can depend on still needs
              architecture, integrations, authentication, business logic, testing, evaluation,
              security, deployment, and ongoing improvement.
            </Text>
            <div className="mt-6 flex flex-wrap gap-2 max-w-[560px]">
              {PROBLEM_CHIPS.map((c) => (
                <Badge
                  key={c}
                  variant="neutral"
                  className="[transform-style:preserve-3d] transition-[transform,box-shadow] duration-200 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_18px_rgba(0,0,0,0.3)] hover:[transform:perspective(400px)_translateY(-3px)_rotateX(12deg)_scale(1.06)]"
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FRAMEWORK */}
      <Section theme="light">
        <SectionEyebrow>The AI → Production Framework</SectionEyebrow>
        <Heading level="md" as="h2" className="mt-3.5">
          Every project moves through the same seven stages.
        </Heading>
        <div className="mt-10">
          <FrameworkRow />
        </div>
      </Section>

      {/* SERVICES */}
      <Section tone="raised" bordered className="relative isolate overflow-hidden">
        <FloatingShapes />
        <SectionEyebrow>What We Build</SectionEyebrow>
        <Heading level="md" as="h2" className="mt-3.5">
          Four ways we bridge the gap.
        </Heading>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.slug}
              title={s.title}
              description={s.description}
              icon={<s.icon size={20} strokeWidth={1.75} aria-hidden="true" />}
              signature={s.signature}
            />
          ))}
        </div>
      </Section>

      {/* SELECTED WORK */}
      <Section theme="light">
        <SectionEyebrow>Selected Work</SectionEyebrow>
        <Heading level="md" as="h2" className="mt-3.5">
          Work that made it to production.
        </Heading>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {getFeaturedProjects().map((p) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              category={p.category}
              title={p.title}
              summary={p.summary}
              image={p.images[0]}
            />
          ))}
        </div>
      </Section>

      {/* HOW WE USE AI */}
      <Section tone="raised">
        <AiTransparency />
      </Section>

      {/* WHY ARVEXA */}
      <Section theme="light" className="relative isolate overflow-hidden">
        <FloatingShapes />
        <SectionEyebrow>Why Arvexa</SectionEyebrow>
        <Heading level="md" as="h2" className="mt-3.5 max-w-[760px]">
          We show the bugs we found and fixed, not just the demo.
        </Heading>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHY_ARVEXA.map((item) => (
            <WhyArvexaCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Section>

      {/* FINAL CTA — the one non-footer section reserved for the dark
          treatment (2026-09-27 sand/rust refactor — see docs/decisions.md).
          `tone="inverse"` gives it bg-surface-inverse (--bg-dark); every
          child below explicitly overrides its color for that surface,
          since the site's default tokens are tuned for a light bg now. */}
      <Section tone="inverse" className="text-center">
        <Container className="max-w-[680px]">
          <Heading level="lg" as="h2" className="text-ink-inverse">
            Have an AI product that isn&apos;t ready for production?
          </Heading>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <CtaButton
              id="home-final-start-project"
              href="/start-a-project"
              variant="primary"
              className="bg-ink-inverse text-surface-inverse hover:bg-accent-soft"
            >
              Start a Project →
            </CtaButton>
            <CtaButton
              id="home-final-audit"
              href="/services/ai-rescue"
              variant="secondary"
              className="text-ink-inverse border-line-inverse hover:border-accent-soft hover:text-accent-soft"
            >
              Request a Production Readiness Audit
            </CtaButton>
          </div>
        </Container>
      </Section>
    </>
  );
}

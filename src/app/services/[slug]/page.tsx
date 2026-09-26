import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section, SectionEyebrow } from "@/components/ui/section";
import { Heading, Text, Label } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { ProjectCard } from "@/components/site/project-card";
import { CtaButton } from "@/components/site/cta-button";
import { SERVICES, getService } from "@/data/services";
import { PROJECTS } from "@/data/projects";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = service.relatedCategory
    ? PROJECTS.filter((p) => p.category === service.relatedCategory)
    : [];

  return (
    <>
      <Container className="relative isolate overflow-hidden pt-16 pb-16 md:pt-24">
        <FloatingShapes />
        {service.signature && <Badge variant="signature">Signature offer</Badge>}
        <SectionEyebrow className={service.signature ? "mt-3" : ""}>{service.eyebrow}</SectionEyebrow>
        <Heading level="lg" as="h1" className="mt-3.5 max-w-[22ch]">
          {service.title}
        </Heading>
        <p className="mt-5 max-w-[62ch] font-display text-xl md:text-2xl text-ink">
          {service.positioning}
        </p>
        <Text size="lg" className="mt-4 max-w-[62ch]">
          {service.description}
        </Text>
        <div className="mt-8">
          <CtaButton id={`service-${service.slug}-top`} href={service.ctaHref} variant="primary">
            {service.ctaLabel} →
          </CtaButton>
        </div>
      </Container>

      <Section theme="light">
        <Label className="text-ink-faint">What this covers</Label>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.capabilities.map((c) => (
            <div key={c} className="rounded-md border border-line bg-surface-200 px-4 py-3 text-[14.5px] text-ink">
              {c}
            </div>
          ))}
        </div>
      </Section>

      {service.problems && (
        <Section tone="raised" bordered>
          <Label className="text-ink-faint">If this sounds familiar</Label>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.problems.map((p) => (
              <div key={p} className="text-[15px] text-ink-soft before:content-['•_'] before:text-accent">
                {p}
              </div>
            ))}
          </div>
        </Section>
      )}

      {service.auditAreas && (
        <Section theme="light">
          <Label className="text-ink-faint">What we audit</Label>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 font-mono text-xs uppercase tracking-[0.06em] text-ink-faint">
                    Area
                  </th>
                  <th className="py-3 font-mono text-xs uppercase tracking-[0.06em] text-ink-faint">
                    What we inspect
                  </th>
                </tr>
              </thead>
              <tbody>
                {service.auditAreas.map((row) => (
                  <tr key={row.area} className="border-b border-line">
                    <td className="py-3 pr-4 font-semibold text-ink whitespace-nowrap">{row.area}</td>
                    <td className="py-3 text-ink-soft">{row.inspects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* AI Rescue has no project category of its own — point to the two
          launch projects with real, specific hardening stories instead of
          a category-filtered grid (see docs/decisions.md / positioning.md
          Differentiation section). */}
      {service.slug === "ai-rescue" && (
        <Section tone="raised" bordered>
          <Label className="text-ink-faint">Where we&apos;ve done this</Label>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            <TiltCard>
              <Card className="p-6">
                <div className="text-[15px] font-semibold text-ink">AI Content Publisher</div>
                <Text size="sm" className="mt-2">
                  A retired AI model ID, a silently-failing token ledger, and a race-condition autosave
                  bug, found, root-caused, and fixed in a real shipped product.
                </Text>
                <Link href="/work/ai-content-publisher" className="mt-3 inline-block text-[13.5px] font-semibold text-accent">
                  View case study →
                </Link>
              </Card>
            </TiltCard>
            <TiltCard>
              <Card className="p-6">
                <div className="text-[15px] font-semibold text-ink">SMGSC Portal</div>
                <Text size="sm" className="mt-2">
                  Dedicated accessibility and security audit passes that shipped concrete fixes, including
                  contrast corrections across ~90 files, rate limiting, and upload verification, not just a
                  findings list.
                </Text>
                <Link
                  href="/work/smgsc-portal"
                  className="mt-3 inline-block text-[13.5px] font-semibold text-accent"
                >
                  View case study →
                </Link>
              </Card>
            </TiltCard>
          </div>
        </Section>
      )}

      {service.relatedCategory && (
        <Section tone="raised" bordered>
          <Label className="text-ink-faint">Related work</Label>
          {relatedProjects.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {relatedProjects.map((p) => (
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
          ) : (
            <Text size="sm" className="mt-4 text-ink-faint">
              No case studies published in this category yet. Get in touch about what you&apos;re
              building.
            </Text>
          )}
        </Section>
      )}

      <Container className="pb-24 text-center">
        <Heading level="md" as="h2">
          Ready to talk about your project?
        </Heading>
        <div className="mt-6">
          <CtaButton id={`service-${service.slug}-bottom`} href={service.ctaHref} variant="primary">
            {service.ctaLabel} →
          </CtaButton>
        </div>
      </Container>
    </>
  );
}

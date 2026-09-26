import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/site/cta-button";
import { Container } from "@/components/ui/container";
import { Heading, Text, Label } from "@/components/ui/typography";
import { DiagramStage, DiagramArrow } from "@/components/ui/diagram";
import { CaseStudySection } from "@/components/site/case-study-section";
import { CaseStudyHeroImage, CaseStudyGallery } from "@/components/site/case-study-gallery";
import { PROJECTS, getProject } from "@/data/projects";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const meta = pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
  // A real project screenshot makes a much more accurate social preview
  // than the generic site-wide OG image, when one exists.
  if (project.images[0]) {
    meta.openGraph = { ...meta.openGraph, images: [project.images[0]] };
  }
  return meta;
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { content } = project;

  return (
    <div data-theme="light" className="bg-surface-100">
      {/* HERO */}
      <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Link href="/work" className="text-[13.5px] text-ink-soft hover:text-accent">
          ← Work
        </Link>
        <Badge variant="accent" className="mt-6">
          {project.category}
        </Badge>
        <Heading level="lg" as="h1" className="mt-4 max-w-[18ch]">
          {project.title}
        </Heading>
        <Text size="lg" className="mt-4 max-w-[62ch]">
          {project.summary}
        </Text>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
          <div>
            <Label className="text-ink-faint">Client</Label>
            <div className="mt-1 text-[14.5px] text-ink">
              {project.client ?? "[PLACEHOLDER: not yet confirmed]"}
            </div>
          </div>
          {project.liveUrl && (
            <div>
              <Label className="text-ink-faint">Live</Label>
              <div className="mt-1 text-[14.5px]">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-strong underline underline-offset-2"
                >
                  Visit live site ↗
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technology.map((t) => (
            <Badge key={t} variant="neutral">
              {t}
            </Badge>
          ))}
        </div>

        {project.images[0] && (
          <div className="mt-10">
            <CaseStudyHeroImage src={project.images[0]} alt={`${project.title} screenshot`} />
          </div>
        )}
      </Container>

      {/* CASE STUDY TEMPLATE — docs/case-study-framework.md, 8 sections */}
      <Container className="pb-20">
        <CaseStudySection index="01" title="The Problem">
          <p>{content.problem}</p>
        </CaseStudySection>

        <CaseStudySection index="02" title="The Starting Point">
          <p>{content.startingPoint}</p>
        </CaseStudySection>

        <CaseStudySection index="03" title="The Solution">
          <p>{content.solution}</p>
        </CaseStudySection>

        <CaseStudySection index="04" title="Architecture">
          <div className="flex flex-wrap items-stretch gap-3">
            {content.architecture.map((stage, i) => (
              <Fragment key={stage}>
                {i > 0 && <DiagramArrow />}
                <DiagramStage label={stage} className="min-w-[160px] flex-1" />
              </Fragment>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection index="05" title="Engineering Work">
          <p>{content.engineeringContribution}</p>
        </CaseStudySection>

        <CaseStudySection index="06" title="AI Contribution">
          <p>
            {content.aiContribution ??
              "No AI is used in this product. It's included in the portfolio for its production-engineering rigor, not for AI usage."}
          </p>
        </CaseStudySection>

        <CaseStudySection index="07" title="Results">
          <p>{content.results}</p>
        </CaseStudySection>

        <CaseStudySection index="08" title="Final Product">
          {project.images.length > 1 ? (
            <CaseStudyGallery images={project.images.slice(1)} title={project.title} />
          ) : project.images.length === 1 ? (
            <p className="text-[15px] leading-[1.65] text-ink-soft">
              See the full-size image above, the only one confirmed for this project so far.
            </p>
          ) : (
            <p className="font-mono text-xs text-ink-faint">
              [Screenshot placeholder: see docs/project-data-needed.md]
            </p>
          )}
        </CaseStudySection>
      </Container>

      {/* CTA */}
      <Container className="pb-24 text-center">
        <Heading level="md" as="h2">
          Have a project like this one?
        </Heading>
        <div className="mt-6">
          <CtaButton id={`work-${project.slug}-start-project`} href="/start-a-project" variant="primary">
            Start a Project →
          </CtaButton>
        </div>
      </Container>
    </div>
  );
}

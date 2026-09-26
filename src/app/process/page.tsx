import { Search, Sparkles, Code2, FlaskConical, ShieldCheck, Rocket, RefreshCw, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionEyebrow } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { ProcessStageContent } from "@/components/site/process-stage";
import { PROCESS_STAGES } from "@/data/process";
import { CtaButton } from "@/components/site/cta-button";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Process",
  description: "The AI → Production framework: the seven stages every Arvexa project moves through.",
  path: "/process",
});

/** One icon per stage — real Lucide icons, not stock photos (see
 * process-stage.tsx's comment on why). Keyed by ProcessStage.index. */
const STAGE_ICONS: Record<string, LucideIcon> = {
  "01": Search,
  "02": Sparkles,
  "03": Code2,
  "04": FlaskConical,
  "05": ShieldCheck,
  "06": Rocket,
  "07": RefreshCw,
};

export default function ProcessPage() {
  return (
    <>
      <Container className="relative isolate overflow-hidden pt-16 pb-12 md:pt-24">
        <FloatingShapes />
        <SectionEyebrow>The AI → Production Framework</SectionEyebrow>
        <Heading level="lg" as="h1" className="mt-3.5 max-w-[24ch]">
          Every project moves through the same seven stages.
        </Heading>
        <Text size="lg" className="mt-4 max-w-[62ch]">
          We don&apos;t stop when the AI demo works. We continue until the product is engineered for
          real-world use.
        </Text>
      </Container>

      {PROCESS_STAGES.map((stage, i) => {
        const Icon = STAGE_ICONS[stage.index];
        return (
          <Section
            key={stage.index}
            tone={i % 2 === 1 ? "raised" : "default"}
            bordered={i % 2 === 1}
            theme={i % 2 === 1 ? undefined : "light"}
            className="relative isolate overflow-hidden py-12 md:py-16"
          >
            <FloatingShapes />
            <ProcessStageContent stage={stage} icon={<Icon size={22} strokeWidth={1.75} aria-hidden="true" />} />
          </Section>
        );
      })}

      <Container className="py-24 text-center">
        <Heading level="md" as="h2">
          Have an AI product that isn&apos;t ready for production?
        </Heading>
        <div className="mt-6">
          <CtaButton id="process-final-start-project" href="/start-a-project" variant="primary">
            Start a Project →
          </CtaButton>
        </div>
      </Container>
    </>
  );
}

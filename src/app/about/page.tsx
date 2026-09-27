import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section, SectionEyebrow } from "@/components/ui/section";
import { Heading, Text, Label } from "@/components/ui/typography";
import { AiTransparency } from "@/components/site/ai-transparency";
import { CtaButton } from "@/components/site/cta-button";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description: "Why Arvexa exists, and how AI fits into the way we engineer.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Container className="relative isolate overflow-hidden pt-16 pb-16 md:pt-24">
        <FloatingShapes />
        <SectionEyebrow>About</SectionEyebrow>
        <Heading level="lg" as="h1" className="mt-3.5 max-w-[20ch]">
          Why Arvexa exists.
        </Heading>
        <Text size="lg" className="mt-4 max-w-[62ch]">
          AI makes building software faster. It does not eliminate the need for engineering.
        </Text>
      </Container>

      <Section theme="light">
        <Label className="text-ink-faint">The belief</Label>
        <p className="mt-4 max-w-[68ch] font-display text-2xl md:text-[28px] leading-snug text-ink">
          AI has changed how software gets created. Ideas that once took weeks can now become
          prototypes in hours. But a prototype is not a product. Real products need architecture,
          integrations, authentication, business logic, testing, reliability, security, evaluation,
          and continuous improvement. That is where we come in.
        </p>
      </Section>

      <Section theme="light">
        <Label className="text-ink-faint">How we work</Label>
        <Text className="mt-4 max-w-[62ch]">
          We use AI throughout our own engineering workflow to build faster, explore further, and
          solve harder problems. But we do not stop at generation. Every project moves through the
          same discipline: discover, generate, engineer, evaluate, harden, deploy, evolve. The
          detail on each stage lives on the{" "}
          <Link href="/process" className="text-accent underline underline-offset-2 hover:text-accent-strong">
            Process page
          </Link>
          .
        </Text>
        <Text className="mt-4 max-w-[62ch]">
          We&apos;d rather be the team that keeps a client&apos;s AI product reliable for years than
          the team that only shipped version one. See the Evolve stage of our process for what that
          looks like in practice.
        </Text>
      </Section>

      <Section tone="raised">
        <AiTransparency />
      </Section>

      <Container className="pb-24 text-center">
        <Heading level="md" as="h2">
          Have an AI product that isn&apos;t ready for production?
        </Heading>
        <div className="mt-6">
          <CtaButton id="about-final-start-project" href="/start-a-project" variant="primary">
            Start a Project →
          </CtaButton>
        </div>
      </Container>
    </>
  );
}

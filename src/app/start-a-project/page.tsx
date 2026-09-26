import { Container } from "@/components/ui/container";
import { SectionEyebrow } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { StartProjectForm } from "./start-project-form";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Start a Project",
  description: "Tell us what you're building: an AI product, agent, automation, SaaS app, or website.",
  path: "/start-a-project",
});

export default function StartAProjectPage() {
  return (
    <div data-theme="light" className="bg-surface-100">
      <Container className="pt-16 pb-24 md:pt-24 max-w-[760px]">
        <SectionEyebrow>Start a Project</SectionEyebrow>
        <Heading level="lg" as="h1" className="mt-3.5 max-w-[20ch]">
          Tell us what you&apos;re building.
        </Heading>
        <Text size="lg" className="mt-4 max-w-[56ch]">
          A few questions so we can route this to the right conversation: Build, Rescue, or Scale.
          No spam, no auto-replies from a sales bot.
        </Text>

        <div className="mt-12">
          <StartProjectForm />
        </div>
      </Container>
    </div>
  );
}

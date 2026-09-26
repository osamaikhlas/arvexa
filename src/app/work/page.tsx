import { Section, SectionEyebrow } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { WorkFilter } from "@/components/site/work-filter";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { PROJECTS } from "@/data/projects";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Work",
  description: "Selected AI products, SaaS, and web engineering that made it to production.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <Section theme="light" className="relative isolate overflow-hidden pt-16 pb-24 md:pt-24">
      <FloatingShapes />
      <SectionEyebrow>Work</SectionEyebrow>
      <Heading level="lg" as="h1" className="mt-3.5">
        Work that made it to production.
      </Heading>
      <Text size="lg" className="mt-4 max-w-[62ch]">
        Every project here shipped. Not a mockup, not a demo. Problem, engineering, and result,
        laid out the same way for each one.
      </Text>

      <div className="mt-12">
        <WorkFilter projects={PROJECTS} />
      </div>
    </Section>
  );
}

import Link from "next/link";
import { Section, SectionEyebrow } from "@/components/ui/section";
import { Heading, Text, Label } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { TiltCard } from "@/components/ui/tilt-card";
import { SERVICES } from "@/data/services";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Services",
  description: "Four ways we bridge the gap from AI prototype to production.",
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <Section theme="light" className="relative isolate overflow-hidden pt-16 pb-24 md:pt-24">
      <FloatingShapes />
      <SectionEyebrow>Services</SectionEyebrow>
      <Heading level="lg" as="h1" className="mt-3.5">
        Four ways we bridge the gap.
      </Heading>
      <Text size="lg" className="mt-4 max-w-[62ch]">
        Every engagement is one of these, or a combination of Build, Rescue, and Scale.
      </Text>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {SERVICES.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`}>
            <TiltCard className="h-full">
              <Card className={s.signature ? "border-accent border-2 h-full" : "h-full"}>
                <div className="p-7">
                  {s.signature && <Label className="text-accent">Signature offer</Label>}
                  <div className={s.signature ? "mt-2 text-[20px] font-semibold text-ink" : "text-[20px] font-semibold text-ink"}>
                    {s.title}
                  </div>
                  <Text size="sm" className="mt-2.5">
                    {s.description}
                  </Text>
                  <span className="mt-4 inline-block text-[13.5px] font-semibold text-accent">
                    Learn more →
                  </span>
                </div>
              </Card>
            </TiltCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}

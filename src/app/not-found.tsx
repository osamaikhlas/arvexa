import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/site/cta-button";
import { Heading, Text } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <Text size="sm" className="font-mono text-accent">
        404
      </Text>
      <Heading level="lg" as="h1" className="mt-3">
        This page doesn&apos;t exist.
      </Heading>
      <Text size="lg" className="mt-4 max-w-[52ch] mx-auto">
        Might be a broken link, or the page moved. Try the homepage, or see what we&apos;ve built.
      </Text>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <CtaButton id="404-home" href="/" variant="primary">
          Back to Home
        </CtaButton>
        <Link
          href="/work"
          className="inline-flex items-center justify-center rounded-md border border-line px-6 py-3.5 font-mono text-[13px] text-ink"
        >
          Explore Our Work
        </Link>
      </div>
    </Container>
  );
}

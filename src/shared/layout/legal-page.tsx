import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/shared/ui/primitives";

/** Shared layout for Privacy, Terms and Refund pages. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="hero-glow">
        <Container className="py-14 sm:py-16">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
        </Container>
      </section>
      <Container>
        <div className="prose-brand prose max-w-3xl dark:prose-invert">{children}</div>
      </Container>
    </>
  );
}

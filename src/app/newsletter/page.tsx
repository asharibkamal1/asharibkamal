import { CheckCircle2, FileText, Gift } from "lucide-react";
import { newsletterConfig, SubscribeForm } from "@/modules/newsletter";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Card, Container, Eyebrow, SectionHeading } from "@/shared/ui/primitives";

export const metadata = pageMetadata({
  title: `${newsletterConfig.name} — Free Weekly Newsletter`,
  description: `A free weekly email on software engineering, AI and earning online. Join and get the ${newsletterConfig.leadMagnet.title}.`,
  path: "/newsletter",
});

export default function NewsletterPage() {
  const { leadMagnet } = newsletterConfig;
  return (
    <>
      <section className="hero-glow relative overflow-hidden">
        <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow>
              {newsletterConfig.name} · {newsletterConfig.cadence}
            </Eyebrow>
            <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Build skills. Ship products. <span className="text-gradient">Earn online.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{newsletterConfig.pitch}</p>
            <SubscribeForm source="newsletter-page" buttonLabel="Join free" className="mt-8 max-w-lg" />
          </div>

          <Card className="relative mx-auto w-full max-w-sm p-8 lg:max-w-none">
            <span className="bg-gradient-brand absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white">
              <Gift className="size-3.5" /> Free when you join
            </span>
            <div className="bg-gradient-brand flex aspect-[4/3] flex-col justify-end rounded-xl p-6 text-white">
              <FileText className="mb-auto size-8 opacity-80" />
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Free PDF</p>
              <p className="mt-1 text-2xl font-extrabold leading-tight">{leadMagnet.title}</p>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">{leadMagnet.description}</p>
          </Card>
        </Container>
      </section>

      <Container className="py-16">
        <SectionHeading eyebrow="What you get" title="Every issue is short, practical and useful" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {newsletterConfig.benefits.map((b) => (
            <li key={b}>
              <Card className="flex h-full gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-2" />
                <span>{b}</span>
              </Card>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="py-16">
        <SectionHeading eyebrow="FAQ" title="Questions" />
        <div className="max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface">
          {newsletterConfig.faqs.map((f) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="text-brand-2 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Newsletter", path: "/newsletter" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: newsletterConfig.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}

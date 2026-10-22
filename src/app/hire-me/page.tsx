import { ArrowDown, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/modules/contact";
import { ServicesGrid, TestimonialsSection } from "@/modules/portfolio";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Card, Container, Eyebrow, SectionHeading } from "@/shared/ui/primitives";
import { LinkedInIcon } from "@/shared/ui/brand-icons";

export const metadata = pageMetadata({
  title: "Hire a Freelance .NET Developer",
  description:
    "Hire Asharib Kamal, a Senior .NET Engineer, for ASP.NET Core web apps and APIs, SaaS MVPs, legacy .NET modernisation and ERP/business systems.",
  path: "/hire-me",
});

const steps = [
  { title: "Tell me about the project", text: "Send a short email: what you're building, timeline and budget range." },
  { title: "Free discovery call", text: "We clarify scope, risks and the best technical approach." },
  { title: "Proposal & milestones", text: "Clear deliverables, fixed milestones and regular demos." },
  { title: "Build, ship, support", text: "Production-ready code, documentation and a hand-over you can maintain." },
];

export default function HireMePage() {
  const subject = encodeURIComponent("Project enquiry from asharibkamal.com");
  return (
    <>
      <section className="hero-glow">
        <Container className="py-16 sm:py-24">
          <Eyebrow>Hire me</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            A senior <span className="text-gradient">.NET engineer</span> for your next build
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            5+ years shipping enterprise systems for tax, insurance and manufacturing — now available for a limited number of freelance projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-2/25 hover:brightness-110"
            >
              Start a project <ArrowDown className="size-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}?subject=${subject}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold hover:border-brand-2/60"
            >
              <Mail className="size-4" /> Email me
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold hover:border-brand-2/60"
            >
              <LinkedInIcon className="size-4" /> Message on LinkedIn
            </a>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <SectionHeading eyebrow="Services" title="What I can build for you" />
        <ServicesGrid />
      </Container>

      <Container className="py-16">
        <SectionHeading eyebrow="Process" title="How we'll work together" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Card key={s.title}>
              <span className="text-gradient text-3xl font-extrabold">0{i + 1}</span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </Card>
          ))}
        </ol>
      </Container>

      <TestimonialsSection />

      <Container className="py-16" id="contact">
        <SectionHeading
          eyebrow="Start a project"
          title="Tell me about your project"
          description="Share a few details and I'll reply by email with next steps."
        />
        <ContactForm className="max-w-3xl" />
      </Container>

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Hire Me", path: "/hire-me" }])} />
    </>
  );
}

import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/modules/contact";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Container, Eyebrow } from "@/shared/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/shared/ui/brand-icons";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Asharib Kamal about freelance .NET development, SaaS builds, consulting or collaborations.",
  path: "/contact",
});

export default function ContactPage() {
  const links = [
    { icon: <Mail className="size-4" />, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: <LinkedInIcon className="size-4" />, label: "LinkedIn", href: siteConfig.social.linkedin },
    { icon: <GitHubIcon className="size-4" />, label: "GitHub", href: siteConfig.social.github },
  ];
  return (
    <section className="hero-glow">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Let&apos;s <span className="text-gradient">talk</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Have a project, a question about something I wrote, or a collaboration idea? Send a message and I&apos;ll reply by email.
          </p>
          <ul className="mt-8 space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-3 text-muted hover:text-foreground"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface">{l.icon}</span>
                  <span className="break-all">{l.label}</span>
                </a>
              </li>
            ))}
            <li className="inline-flex items-center gap-3 text-muted">
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface">
                <MapPin className="size-4" />
              </span>
              {siteConfig.location}
            </li>
          </ul>
        </div>
        <ContactForm />
      </Container>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </section>
  );
}

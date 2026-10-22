import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/shared/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/shared/ui/brand-icons";

// Cached at build time so the page can be fully prerendered.
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container className="grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">
            Asharib<span className="text-gradient">Kamal</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.tagline}</p>
          <div className="mt-5 flex gap-3">
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-foreground">
              <LinkedInIcon />
            </a>
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted hover:text-foreground">
              <GitHubIcon />
            </a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="text-muted hover:text-foreground">
              <Mail className="size-5" />
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {[...siteConfig.nav, { label: "Tools I Use", href: "/resources" }, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-foreground">
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.location}</li>
            {siteConfig.cv && (
              <li>
                <a href={siteConfig.cv} className="hover:text-foreground" download>
                  Download CV
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-border py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CopyrightYear /> {siteConfig.name}. All rights reserved.
        </p>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/refund-policy" className="hover:text-foreground">
            Refund Policy
          </Link>
        </nav>
      </Container>
    </footer>
  );
}

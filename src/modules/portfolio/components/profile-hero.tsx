import Image from "next/image";
import { ArrowRight, Download, Gift, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { newsletterConfig } from "@/modules/newsletter/config";
import { ButtonLink, Container } from "@/shared/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/shared/ui/brand-icons";

export function ProfileHero({
  heading,
  intro,
  showCv = true,
  focus = "hire",
}: {
  heading: React.ReactNode;
  intro: string;
  showCv?: boolean;
  /** "content" leads with the free lead magnet (home page); "hire" leads with freelance work. */
  focus?: "content" | "hire";
}) {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {focus === "content" ? `Free: ${newsletterConfig.leadMagnet.title}` : "Available for freelance projects"}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
          <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-4" /> {siteConfig.location}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {focus === "content" ? (
              <>
                <ButtonLink href="/newsletter">
                  <Gift className="size-4" /> Get the free starter kit
                </ButtonLink>
                <ButtonLink href="/hire-me" variant="outline">
                  Hire me <ArrowRight className="size-4" />
                </ButtonLink>
              </>
            ) : (
              <ButtonLink href="/hire-me">
                Hire me <ArrowRight className="size-4" />
              </ButtonLink>
            )}
            {showCv && siteConfig.cv && (
              <a
                href={siteConfig.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand-2/60"
              >
                <Download className="size-4" /> Download CV
              </a>
            )}
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-foreground">
              <LinkedInIcon className="size-4" />
            </a>
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-foreground">
              <GitHubIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="relative order-first mx-auto w-48 sm:w-80 lg:order-none">
          <div className="bg-gradient-brand absolute -inset-1 rounded-full opacity-80 blur-xl" aria-hidden="true" />
          <div className="bg-gradient-brand relative rounded-full p-1">
            <Image
              src={siteConfig.photo}
              alt={`${siteConfig.name}, ${siteConfig.role}`}
              width={720}
              height={417}
              priority
              sizes="(min-width: 640px) 320px, 192px"
              className="aspect-square w-full rounded-full object-cover object-[50%_30%]"
            />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold whitespace-nowrap shadow-lg">
            .NET Core · 5+ yrs
          </div>
        </div>
      </Container>
    </section>
  );
}

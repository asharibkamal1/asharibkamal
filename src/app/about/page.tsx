import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, Hammer, Lightbulb, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ExperienceTimeline, StatsRow } from "@/modules/portfolio";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { ButtonLink, Card, Container, Eyebrow, SectionHeading } from "@/shared/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/shared/ui/brand-icons";

export const metadata = pageMetadata({
  title: "About Asharib Kamal",
  description:
    "From intern to Senior .NET Engineer on national-scale FBR systems — and now building my own products and sharing what I learn about software, AI and earning online.",
  path: "/about",
});

const principles = [
  {
    icon: ShieldCheck,
    title: "Production first",
    text: "Code is only done when it survives real users, real data and real load. That's the standard I learned on enterprise systems, and the one I teach.",
  },
  {
    icon: Hammer,
    title: "Build in public",
    text: "I share the real process of launching products like AppraisalKaro — what worked, what didn't, and the numbers.",
  },
  {
    icon: Lightbulb,
    title: "Practical over perfect",
    text: "Every article should help you do something the same day: write better code, use AI well, or earn your first online income.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="hero-glow relative overflow-hidden">
        <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow>About me</Eyebrow>
            <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Hi, I&apos;m Asharib — I build software that <span className="text-gradient">works in the real world</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {siteConfig.role} from {siteConfig.location}. I build enterprise .NET systems at work, and in my own time I
              build products and write about what I learn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold hover:border-brand-2/60">
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold hover:border-brand-2/60">
                <GitHubIcon className="size-4" /> GitHub
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-56 sm:w-72">
            <div className="bg-gradient-brand absolute -inset-1 rounded-3xl opacity-70 blur-xl" aria-hidden="true" />
            <Image
              src={siteConfig.photo}
              alt={siteConfig.name}
              width={720}
              height={417}
              priority
              sizes="(min-width: 640px) 288px, 224px"
              className="relative aspect-[4/5] w-full rounded-3xl object-cover object-[50%_25%]"
            />
          </div>
        </Container>
      </section>

      <StatsRow />

      <Container className="py-20">
        <div className="prose-brand prose prose-lg max-w-3xl dark:prose-invert">
          <h2>My story</h2>
          <p>
            I studied Computer Science at the University of Wah and started my career in 2019 as an intern at Cloud
            Support. My first real projects were ERP systems for steel and flour mills — ASP.NET Web Forms, SQL
            Server and a lot of RDLC reports — deployed on factory floors across multiple sites. That&apos;s where I
            learned that software isn&apos;t finished when it compiles; it&apos;s finished when people can rely on it
            every day.
          </p>
          <p>
            From there I moved into a large insurance platform, modernising a desktop application and building a new
            ASP.NET MVC web portal, and then into tax technology — building APIs and integrations for FBR IRIS and
            point-of-sale systems. Today I work as a .NET engineer at PRAL on FBR systems, delivering enterprise
            applications from scratch to production and mentoring junior developers.
          </p>
          <p>
            Along the way I started building my own products too:{" "}
            <Link href="/portfolio/appraisalkaro">AppraisalKaro</Link>, a SaaS that takes employee appraisals off Excel,
            and the <Link href="/portfolio/fuel-relief-sms-helper">9771 Fuel Relief SMS Helper</Link>, a free bilingual
            tool for the public.
          </p>
          <h2>Why this website</h2>
          <p>
            Many talented developers — especially here in Pakistan — are great at their jobs but never learn how to
            build their own products, use AI well, or earn beyond a single salary. This site is where I share everything
            I learn on that journey: practical engineering, honest AI workflows, and the business side of building
            online income.
          </p>
        </div>
      </Container>

      <Container className="pb-12">
        <SectionHeading eyebrow="What I believe" title="How I work and write" />
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <Icon className="size-6 text-brand-2" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </Card>
          ))}
        </div>
      </Container>

      <ExperienceTimeline />

      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-bold">Want to follow along?</h2>
            <p className="mt-1 text-muted">Get the free starter kit and one practical email a week.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/newsletter">
              <Gift className="size-4" /> Join free
            </ButtonLink>
            <ButtonLink href="/hire-me" variant="outline">
              Work with me <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </Container>

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}

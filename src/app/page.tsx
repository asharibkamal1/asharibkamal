import { ArrowRight, BriefcaseBusiness, Code2, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getAllPosts, PostCard } from "@/modules/blog";
import { NewsletterCta } from "@/modules/newsletter";
import { projects, ProfileHero, ProjectCard, ServicesGrid, StatsRow, TestimonialsSection } from "@/modules/portfolio";
import { ButtonLink, Card, Container, SectionHeading } from "@/shared/ui/primitives";

const pillars = [
  { icon: Sparkles, title: "AI & Trends", text: "New AI tools, AI-assisted coding and how to use AI in real work and business." },
  { icon: Code2, title: "Software Engineering", text: ".NET, architecture, clean code and the career lessons from 5+ years in production." },
  { icon: TrendingUp, title: "Earn Online", text: "Freelancing, digital products and building passive income as a developer." },
  { icon: BriefcaseBusiness, title: "Business Guides", text: "Starting and growing an online business — SEO, marketing, tools and productivity." },
];

export default function HomePage() {
  const featured = projects.slice(0, 3);
  const latestPosts = getAllPosts().slice(0, 3);
  return (
    <>
      <ProfileHero
        heading={
          <>
            I build software that works — and teach you to <span className="text-gradient">build, ship & earn</span>.
          </>
        }
        intro="I'm Asharib Kamal, a Senior .NET Engineer with 5+ years delivering enterprise systems for tax, insurance and manufacturing. Here I share practical guides on software engineering, AI and building online income."
      />

      <StatsRow />

      <Container className="py-24">
        <SectionHeading
          eyebrow="What I write about"
          title="Practical guides for developers and builders"
          description="No fluff. Real lessons from building production systems and launching my own products."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="hover:border-brand-2/50">
              <Icon className="size-6 text-brand-2" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </Card>
          ))}
        </div>
      </Container>

      {latestPosts.length > 0 && (
        <Container className="pb-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Blog" title="Latest articles" className="mb-0" />
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-2 hover:underline">
              Read the blog <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      )}

      <Container className="pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Portfolio" title="Things I've built" className="mb-0" />
          <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-2 hover:underline">
            View all projects <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>

      <Container className="pb-24">
        <SectionHeading eyebrow="Services" title="Need a .NET engineer?" description="I take on a limited number of freelance projects alongside my work." />
        <ServicesGrid />
      </Container>

      <TestimonialsSection />

      <Container className="pb-16">
        <NewsletterCta source="home" />
      </Container>

      <Container>
        <div className="bg-gradient-brand relative overflow-hidden rounded-3xl p-8 text-white sm:p-12">
          <div className="grid-pattern absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-balance">Have a project in mind?</h2>
            <p className="mt-3 text-white/85">
              From a new SaaS MVP to modernising a legacy .NET system — tell me what you&apos;re building.
            </p>
            <ButtonLink href="/hire-me" variant="outline" className="mt-6 border-white/30 bg-white text-slate-900 hover:bg-white/90">
              Start a conversation <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}

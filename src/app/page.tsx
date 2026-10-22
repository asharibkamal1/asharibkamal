import { ArrowRight, Code2, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getAllPosts, PostCard } from "@/modules/blog";
import { NewsletterCta } from "@/modules/newsletter";
import { projects, ProfileHero, ProjectCard, ServicesGrid, StatsRow, TestimonialsSection } from "@/modules/portfolio";
import { ButtonLink, Container, SectionHeading } from "@/shared/ui/primitives";

// "Start here": one learning path per audience, each pointing at the content that serves it.
const paths = [
  {
    icon: Code2,
    step: "Path 1",
    title: "Become a better .NET engineer",
    text: "Clean Architecture, APIs, background services and the habits that make code survive production.",
    links: [
      { label: "Software engineering articles", href: "/blog/category/software-engineering" },
      { label: ".NET Clean Architecture Starter Kit", href: "/products/dotnet-clean-architecture-starter-kit" },
    ],
  },
  {
    icon: Sparkles,
    step: "Path 2",
    title: "Build faster with AI",
    text: "The AI tools and workflows I actually use — and how to use them without lowering code quality.",
    links: [
      { label: "AI & trends articles", href: "/blog/category/ai" },
      { label: "Tools I use", href: "/resources" },
    ],
  },
  {
    icon: TrendingUp,
    step: "Path 3",
    title: "Earn online as a developer",
    text: "Freelancing, remote work, digital products and building a business alongside your job.",
    links: [
      { label: "Free side-income starter kit", href: "/newsletter" },
      { label: "Earn online articles", href: "/blog/category/earn-online" },
      { label: "Business guides", href: "/blog/category/business" },
    ],
  },
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
        focus="content"
      />

      <StatsRow />

      <Container className="py-24" id="start-here">
        <SectionHeading
          eyebrow="Start here"
          title="Pick your path"
          description="No fluff. Real lessons from building production systems and launching my own products — choose where you want to grow."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {paths.map(({ icon: Icon, step, title, text, links }) => (
            <div key={title} className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand-2/50">
              <div className="flex items-center justify-between">
                <span className="bg-gradient-brand inline-flex size-11 items-center justify-center rounded-xl text-white">
                  <Icon className="size-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">{step}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{text}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-brand-2">
                      <ArrowRight className="size-3.5 text-brand-2 transition-transform group-hover:translate-x-0.5" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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

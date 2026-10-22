import Link from "next/link";
import { ArrowUpRight, Building2, Quote, RefreshCw, Rocket, Server } from "lucide-react";
import { Badge, Card, Container, SectionHeading, cn } from "@/shared/ui/primitives";
import { experience, services, skillGroups, stats, testimonials } from "../data";
import type { Project, Service } from "../types";

export function StatsRow() {
  return (
    <Container>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface p-6">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="text-gradient mt-1 text-3xl font-extrabold">{s.value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

export function SkillsSection() {
  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Skills"
        title="The stack I use to ship"
        description="Enterprise .NET at the core, with the architecture, data and DevOps skills to take systems to production."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <Card key={g.title}>
            <h3 className="font-semibold">{g.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export function ExperienceTimeline() {
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Experience" title="Where I've built" description="From intern to leading enterprise delivery on national-scale systems." />
      <ol className="relative space-y-8 border-l border-border pl-8">
        {experience.map((e) => (
          <li key={e.company} className="relative">
            <span
              className={cn(
                "absolute -left-[37px] top-1.5 size-3 rounded-full ring-4 ring-background",
                e.current ? "bg-gradient-brand" : "bg-border",
              )}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">
                {e.role} <span className="text-muted">· {e.company}</span>
              </h3>
              <span className="text-sm text-muted">{e.period}</span>
            </div>
            <p className="mt-2 max-w-3xl leading-relaxed text-muted">{e.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {e.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-brand-2/50 hover:shadow-xl hover:shadow-brand-2/10"
    >
      <div className={cn("relative flex h-40 items-end bg-gradient-to-br p-5", project.accent)}>
        <div className="grid-pattern absolute inset-0 opacity-30" aria-hidden="true" />
        <span className="relative text-2xl font-extrabold leading-tight text-white drop-shadow">{project.title}</span>
        <span className="absolute right-4 top-4 rounded-full bg-black/25 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur">
          {project.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-2">{project.role}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.tagline}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
      </div>
    </Link>
  );
}

const serviceIcons: Record<Service["icon"], typeof Server> = {
  server: Server,
  rocket: Rocket,
  refresh: RefreshCw,
  building: Building2,
};

export function ServicesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((s) => {
        const Icon = serviceIcons[s.icon];
        return (
          <Card key={s.title} className="hover:border-brand-2/50">
            <span className="bg-gradient-brand inline-flex size-10 items-center justify-center rounded-xl text-white">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
          </Card>
        );
      })}
    </div>
  );
}

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Testimonials" title="What people I've worked with say" />
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <Card key={t.name}>
            <Quote className="size-6 text-brand-2" />
            <blockquote className="mt-3 leading-relaxed">{t.quote}</blockquote>
            <p className="mt-4 text-sm font-semibold">
              {t.linkedin ? (
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {t.name}
                </a>
              ) : (
                t.name
              )}
            </p>
            <p className="text-xs text-muted">{t.title}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
}

import { Suspense } from "react";
import { PageSkeleton } from "@/shared/ui/page-skeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getProject, ProjectCard, projects } from "@/modules/portfolio";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Badge, ButtonLink, Card, Container, cn } from "@/shared/ui/primitives";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({ title: project.title, description: project.tagline, path: `/portfolio/${slug}` });
}

async function ProjectPageContent({ params }: { params: PageProps<"/portfolio/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className={cn("relative overflow-hidden bg-gradient-to-br text-white", project.accent)}>
        <div className="grid-pattern absolute inset-0 opacity-25" aria-hidden="true" />
        <Container className="relative py-16 sm:py-24">
          <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="size-4" /> All projects
          </Link>
          <p className="mt-6 text-sm font-medium uppercase tracking-wider text-white/80">
            {project.kind === "product" ? "Product" : "Case study"} · {project.status}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{project.tagline}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-white/90"
            >
              Visit live site <ArrowUpRight className="size-4" />
            </a>
          )}
        </Container>
      </section>

      <Container className="grid gap-10 py-16 lg:grid-cols-[2fr_1fr]">
        <article className="space-y-10">
          {project.problem && (
            <div>
              <h2 className="text-2xl font-bold">The problem</h2>
              <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">{project.kind === "product" ? "The product" : "The work"}</h2>
            <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-2" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted">Role</dt>
                <dd className="mt-1 font-semibold">{project.role}</dd>
              </div>
              <div>
                <dt className="text-muted">Status</dt>
                <dd className="mt-1 font-semibold">{project.status}</dd>
              </div>
              <div>
                <dt className="text-muted">Tags</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </dd>
              </div>
            </dl>
          </Card>
          <Card className="bg-surface-2">
            <p className="font-semibold">Need something similar?</p>
            <p className="mt-1 text-sm text-muted">I build .NET systems and SaaS products for clients.</p>
            <ButtonLink href="/hire-me" className="mt-4 w-full">
              Work with me
            </ButtonLink>
          </Card>
        </aside>
      </Container>

      <Container className="pb-8">
        <h2 className="mb-6 text-2xl font-bold">More projects</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />
    </>
  );
}

// Params are read inside Suspense so client navigations stay instant; all paths are prerendered at build.
export default function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProjectPageContent params={params} />
    </Suspense>
  );
}

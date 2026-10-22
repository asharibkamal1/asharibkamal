import { ArrowUpRight, Info } from "lucide-react";
import { hasAffiliateLinks, resourceGroups } from "@/modules/resources/data";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Badge, Container, Eyebrow, SectionHeading } from "@/shared/ui/primitives";

export const metadata = pageMetadata({
  title: "Tools I Use — Developer & Online Business Stack",
  description:
    "The tools Asharib Kamal uses for .NET development, building websites, newsletters and selling digital products — and why.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <section className="hero-glow">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Resources</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            The tools I <span className="text-gradient">actually use</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            My stack for building software, running this website and earning online — with a short note on why each one earned its place.
          </p>
          {hasAffiliateLinks && (
            <p className="mt-6 flex max-w-2xl items-start gap-2 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
              <Info className="mt-0.5 size-4 shrink-0" />
              Some links are affiliate links: if you buy through them I may earn a commission, at no extra cost to you. I only list tools I use.
            </p>
          )}
        </Container>
      </section>

      {resourceGroups.map((group) => (
        <Container key={group.title} className="py-10">
          <SectionHeading title={group.title} description={group.description} className="mb-6" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => {
              const href = item.affiliateUrl ?? item.url;
              return (
                <a
                  key={item.name}
                  href={href}
                  target="_blank"
                  rel={item.affiliateUrl ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-2/50 hover:shadow-xl hover:shadow-brand-2/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed">{item.why}</p>
                  <div className="mt-4 flex gap-2">
                    {item.free && <Badge>Free plan</Badge>}
                    {item.affiliateUrl && <Badge>Affiliate</Badge>}
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      ))}

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])} />
    </>
  );
}

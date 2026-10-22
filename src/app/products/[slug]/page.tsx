import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, UserCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { BuyBox, getProduct, ProductCard, products } from "@/modules/products";
import { AuthorBox } from "@/modules/blog";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Container, cn, SectionHeading } from "@/shared/ui/primitives";
import { PageSkeleton } from "@/shared/ui/page-skeleton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({ title: product.title, description: product.tagline, path: `/products/${slug}` });
}

async function ProductPageContent({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const others = products.filter((p) => p.slug !== slug);
  const url = `${siteConfig.url}/products/${slug}`;

  return (
    <>
      <section className={cn("relative overflow-hidden bg-gradient-to-br text-white", product.accent)}>
        <div className="grid-pattern absolute inset-0 opacity-25" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <Link href="/products" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="size-4" /> All products
          </Link>
          <p className="mt-6 text-sm font-medium uppercase tracking-wider text-white/80">
            {product.kind}
            {product.status === "coming-soon" && " · Coming soon"}
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{product.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{product.tagline}</p>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-12">
          <p className="text-lg leading-relaxed">{product.description}</p>

          <div>
            <h2 className="text-2xl font-bold">What&apos;s included</h2>
            <ul className="mt-5 space-y-3">
              {product.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Who it&apos;s for</h2>
            <ul className="mt-5 space-y-3">
              {product.forWho.map((item) => (
                <li key={item} className="flex gap-3">
                  <UserCheck className="mt-0.5 size-5 shrink-0 text-brand-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <AuthorBox />

          <div>
            <SectionHeading title="FAQ" className="mb-5" />
            <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
              {product.faqs.map((f) => (
                <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <span className="text-brand-2 transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BuyBox product={product} />
        </aside>
      </Container>

      {others.length > 0 && (
        <Container className="pt-8">
          <h2 className="mb-6 text-2xl font-bold">More products</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          url,
          category: product.kind,
          brand: { "@type": "Brand", name: siteConfig.name },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            url,
            availability:
              product.status === "available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
          },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.title, path: `/products/${slug}` },
        ])}
      />
    </>
  );
}

// Params are read inside Suspense so client navigations stay instant; all paths are prerendered at build.
export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}

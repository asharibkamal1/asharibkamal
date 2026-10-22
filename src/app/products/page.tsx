import { products, ProductCard } from "@/modules/products";
import { NewsletterCta } from "@/modules/newsletter";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Container, Eyebrow } from "@/shared/ui/primitives";

export const metadata = pageMetadata({
  title: "Products — Templates, E-books & Guides for Developers",
  description:
    "Practical templates, e-books and guides by Asharib Kamal for .NET developers and builders who want to ship faster and earn online.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <section className="hero-glow">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Products</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Shortcuts from <span className="text-gradient">real experience</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Templates, e-books and guides built from years of shipping production systems — so you can skip the trial and error.
          </p>
        </Container>
      </section>
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <NewsletterCta source="products-index" className="mt-20" />
      </Container>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }])} />
    </>
  );
}

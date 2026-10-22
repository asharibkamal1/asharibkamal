import { Rss } from "lucide-react";
import { categories, getAllPosts, PostCard } from "@/modules/blog";
import { NewsletterCta } from "@/modules/newsletter";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Container, Eyebrow } from "@/shared/ui/primitives";
import { CategoryNav } from "./category-nav";

export const metadata = pageMetadata({
  title: "Blog — Software Engineering, AI & Earning Online",
  description:
    "Practical guides on .NET and software engineering, AI tools and trends, business, and building online income as a developer — by Asharib Kamal.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = [...posts].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <>
      <section className="hero-glow">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Build skills. Ship products. <span className="text-gradient">Earn online.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Practical guides on software engineering, AI and online business — from real production experience.
          </p>
          <a href="/rss.xml" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
            <Rss className="size-4" /> RSS feed
          </a>
        </Container>
      </section>

      <Container>
        <CategoryNav categories={categories} />
        {posts.length === 0 ? (
          <p className="py-20 text-center text-muted">The first articles are on the way.</p>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured && <PostCard post={featured} featured />}
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
        <NewsletterCta source="blog-index" className="mt-20" />
      </Container>

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
    </>
  );
}

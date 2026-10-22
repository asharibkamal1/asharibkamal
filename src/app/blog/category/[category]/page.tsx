import { Suspense } from "react";
import { PageSkeleton } from "@/shared/ui/page-skeleton";
import { notFound } from "next/navigation";
import { categories, getCategory, getPostsByCategory, PostCard } from "@/modules/blog";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Container, Eyebrow } from "@/shared/ui/primitives";
import { CategoryNav } from "../../category-nav";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata({ title: `${category.name} Articles`, description: category.description, path: `/blog/category/${slug}` });
}

async function CategoryPageContent({ params }: { params: PageProps<"/blog/category/[category]">["params"] }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const posts = getPostsByCategory(slug);

  return (
    <>
      <section className="hero-glow">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Category</Eyebrow>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{category.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{category.description}</p>
        </Container>
      </section>
      <Container>
        <CategoryNav categories={categories} active={slug} />
        {posts.length === 0 ? (
          <p className="py-20 text-center text-muted">No articles in this category yet — check back soon.</p>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: category.name, path: `/blog/category/${slug}` },
        ])}
      />
    </>
  );
}

// Params are read inside Suspense so client navigations stay instant; all paths are prerendered at build.
export default function CategoryPage({ params }: PageProps<"/blog/category/[category]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
}

import { Suspense } from "react";
import { PageSkeleton } from "@/shared/ui/page-skeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  AuthorBox,
  postStaticParams,
  getCategory,
  getPost,
  getRelatedPosts,
  PostBody,
  PostCard,
  PostMeta,
  ShareButtons,
  TableOfContents,
} from "@/modules/blog";
import { NewsletterCta } from "@/modules/newsletter";
import { breadcrumbSchema, JsonLd } from "@/modules/seo";
import { Badge, Container } from "@/shared/ui/primitives";

export function generateStaticParams() {
  return postStaticParams();
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: path },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [siteConfig.name],
      tags: post.tags,
    },
    twitter: { title: post.title, description: post.description },
  };
}

async function PostPageContent({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const related = getRelatedPosts(post);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <article>
        <header className="hero-glow">
          <Container className="py-14 sm:py-20">
            <div className="max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
                <ArrowLeft className="size-4" /> All articles
              </Link>
              <Link
                href={`/blog/category/${post.category}`}
                className="mt-8 block text-xs font-semibold uppercase tracking-wider text-brand-2 hover:underline"
              >
                {category?.name}
              </Link>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl sm:leading-[1.1]">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">{post.description}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <PostMeta post={post} />
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>
          </Container>
        </header>

        <Container className="grid gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="prose-brand prose prose-lg max-w-3xl min-w-0 dark:prose-invert">
            <PostBody source={post.content} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={post.toc} />
            </div>
          </aside>
        </Container>

        <Container className="space-y-8 [&>*]:max-w-3xl">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Badge key={t}>#{t}</Badge>
              ))}
            </div>
          )}
          <AuthorBox />
          <NewsletterCta source={`blog-post:${post.slug}`} />
        </Container>
      </article>

      {related.length > 0 && (
        <Container className="pt-20">
          <h2 className="mb-6 text-2xl font-bold">Keep reading</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          url,
          mainEntityOfPage: url,
          image: `${url}/opengraph-image`,
          keywords: post.tags.join(", "),
          articleSection: category?.name,
          author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
          publisher: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}

// Params are read inside Suspense so client navigations stay instant; all paths are prerendered at build.
export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PostPageContent params={params} />
    </Suspense>
  );
}

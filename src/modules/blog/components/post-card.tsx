import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge, cn } from "@/shared/ui/primitives";
import { getCategory } from "../categories";
import { formatDate, type Post } from "../posts";

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 text-sm text-muted", className)}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
      {post.draft && <Badge className="border-amber-500/40 text-amber-600 dark:text-amber-400">Draft</Badge>}
    </p>
  );
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const category = getCategory(post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-2/50 hover:shadow-xl hover:shadow-brand-2/10",
        featured && "md:col-span-2 md:p-8",
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-2">{category?.name}</p>
      <h3 className={cn("mt-3 font-bold tracking-tight text-balance", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
        {post.title}
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{post.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <PostMeta post={post} />
        <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
    </Link>
  );
}

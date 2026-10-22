import Link from "next/link";
import type { Category } from "@/modules/blog";
import { cn } from "@/shared/ui/primitives";

export function CategoryNav({ categories, active }: { categories: readonly Category[]; active?: string }) {
  const chip = (isActive: boolean) =>
    cn(
      "rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
      isActive ? "border-transparent bg-foreground text-background" : "border-border bg-surface text-muted hover:text-foreground",
    );
  return (
    <nav aria-label="Blog categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pt-2 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      <Link href="/blog" className={chip(!active)}>
        All posts
      </Link>
      {categories.map((c) => (
        <Link key={c.slug} href={`/blog/category/${c.slug}`} className={chip(active === c.slug)}>
          {c.name}
        </Link>
      ))}
    </nav>
  );
}

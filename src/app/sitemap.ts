import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { categories, getAllPosts } from "@/modules/blog";
import { projects } from "@/modules/portfolio";
import { products } from "@/modules/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  const now = new Date();
  const entry = (path: string, priority: number, lastModified: Date | string = now) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    priority,
  });

  return [
    entry("", 1),
    entry("/blog", 0.9),
    entry("/portfolio", 0.8),
    entry("/hire-me", 0.8),
    entry("/newsletter", 0.8),
    entry("/products", 0.8),
    entry("/resources", 0.6),
    entry("/about", 0.7),
    entry("/contact", 0.5),
    entry("/privacy", 0.2),
    entry("/terms", 0.2),
    entry("/refund-policy", 0.2),
    ...getAllPosts()
      .filter((p) => !p.draft)
      .map((p) => entry(`/blog/${p.slug}`, 0.7, p.updated ?? p.date)),
    ...categories.map((c) => entry(`/blog/category/${c.slug}`, 0.5)),
    ...projects.map((p) => entry(`/portfolio/${p.slug}`, 0.6)),
    ...products.map((p) => entry(`/products/${p.slug}`, 0.7)),
  ];
}

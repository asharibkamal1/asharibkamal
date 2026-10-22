import { siteConfig } from "@/config/site";
import { getAllPosts, getCategory } from "@/modules/blog";
import { projects } from "@/modules/portfolio";
import { products } from "@/modules/products";
import type { SearchItem } from "@/modules/search/types";

// Static search index, built once at build time and fetched by the search dialog when opened.
export async function GET() {
  const pages: SearchItem[] = [
    { type: "page", title: "Portfolio", description: "Projects, experience and skills", href: "/portfolio" },
    { type: "page", title: "Hire Me", description: "Freelance .NET and SaaS development", href: "/hire-me" },
    { type: "page", title: "Newsletter", description: "The Build & Earn Letter — weekly", href: "/newsletter" },
    { type: "page", title: "Tools I Use", description: "My development and business stack", href: "/resources" },
    { type: "page", title: "Contact", description: `Email ${siteConfig.email}`, href: "/contact" },
  ];

  const posts: SearchItem[] = getAllPosts()
    .filter((p) => !p.draft)
    .map((p) => ({
      type: "post",
      title: p.title,
      description: p.description,
      href: `/blog/${p.slug}`,
      keywords: [...p.tags, getCategory(p.category)?.name ?? ""].join(" "),
    }));

  const projectItems: SearchItem[] = projects.map((p) => ({
    type: "project",
    title: p.title,
    description: p.tagline,
    href: `/portfolio/${p.slug}`,
    keywords: p.tags.join(" "),
  }));

  const productItems: SearchItem[] = products.map((p) => ({
    type: "product",
    title: p.title,
    description: p.tagline,
    href: `/products/${p.slug}`,
    keywords: p.kind,
  }));

  return Response.json([...posts, ...productItems, ...projectItems, ...pages]);
}

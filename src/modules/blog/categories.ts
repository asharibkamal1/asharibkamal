// Blog categories = the four content pillars. Add a category here and it gets its own page.
export const categories = [
  {
    slug: "ai",
    name: "AI & Trends",
    description: "New AI tools, AI-assisted coding, and how to use AI in real work and business.",
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    description: ".NET, architecture, clean code and lessons from years of production systems.",
  },
  {
    slug: "earn-online",
    name: "Earn Online",
    description: "Freelancing, remote work, digital products and building passive income as a developer.",
  },
  {
    slug: "business",
    name: "Business Guides",
    description: "Starting and growing an online business — SEO, marketing, tools and productivity.",
  },
] as const;

export type Category = (typeof categories)[number];
export type CategorySlug = Category["slug"];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

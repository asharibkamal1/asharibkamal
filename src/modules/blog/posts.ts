import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { type CategorySlug, getCategory } from "./categories";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  category: CategorySlug;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
};

export type TocItem = { id: string; text: string; level: 2 | 3 };

export type Post = PostFrontmatter & {
  slug: string;
  tags: string[];
  content: string;
  readingMinutes: number;
  toc: TocItem[];
};

function readingMinutes(content: string) {
  const words = content.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Build the table of contents from ## and ### headings, using the same slugs as rehype-slug. */
function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const items: TocItem[] = [];
  for (const match of withoutCode.matchAll(/^(#{2,3})\s+(.+?)\s*#*$/gm)) {
    const text = match[2].replace(/[`*_]/g, "").replace(/\[(.+?)\]\(.+?\)/g, "$1");
    items.push({ id: slugger.slug(text), text, level: match[1].length as 2 | 3 });
  }
  return items;
}

function parseFile(file: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  if (!fm.title || !fm.description || !fm.date || !fm.category) {
    throw new Error(`Post "${file}" is missing title, description, date or category in its frontmatter.`);
  }
  if (!getCategory(fm.category)) {
    throw new Error(`Post "${file}" has unknown category "${fm.category}". See src/modules/blog/categories.ts.`);
  }

  // gray-matter turns unquoted YAML dates into Date objects; normalise to YYYY-MM-DD.
  const toIso = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d));

  return {
    ...fm,
    slug,
    date: toIso(fm.date),
    updated: fm.updated ? toIso(fm.updated) : undefined,
    tags: fm.tags ?? [],
    content,
    readingMinutes: readingMinutes(content),
    toc: extractToc(content),
  };
}

/** All visible posts, newest first. Drafts are shown in development only. */
export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parseFile)
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((p) => p.category === category);
}

/** Same category first, then shared tags. */
export function getRelatedPosts(post: Post, limit = 3) {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Params for /blog/[slug]. Cache Components requires at least one entry, so while every
 * post is still a draft we prerender a single placeholder that resolves to a 404.
 */
export function postStaticParams() {
  const posts = getAllPosts();
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "coming-soon" }];
}

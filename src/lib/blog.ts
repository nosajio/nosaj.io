import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unstable_cache } from "next/cache";
import type { Post } from "./types";

const BLOG_DIR = path.join(process.cwd(), "blog");

/**
 * Get all posts from the blog directory
 */
export async function getPosts() {
  const posts = [
    {
      title: "Three ways to ship",
      slug: "three-ways-to-ship",
      date: new Date("01 December 2025"),
    },
    {
      title: "Vibe coding with vim",
      slug: "vibe-coding-with-vim",
      date: new Date("01 December 2025"),
    },
    {
      title: "Holistic feature design",
      slug: "feature-design",
      date: new Date("01 November 2025"),
    },
    {
      title: "Thank you PHP",
      slug: "php",
      date: new Date("01 October 2025"),
    },
    {
      title: "Infinite soup",
      slug: "infinite-soup",
      date: new Date("01 October 2025"),
    },
  ];
  return posts;
}

/**
 * Get all MDX post slugs from the blog directory
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);

  let filePath: string | null = null;
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  }

  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt,
    content,
  };
}

/**
 * Get all posts sorted by date (newest first)
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Cached version of getAllPosts for use in pages
 */
export const getCachedPosts = unstable_cache(
  async () => getAllPosts(),
  ["blog-posts"],
  { revalidate: 3600 },
);

/**
 * Cached version of getPostBySlug for use in pages
 */
export const getCachedPostBySlug = unstable_cache(
  async (slug: string) => getPostBySlug(slug),
  ["blog-post"],
  { revalidate: 3600 },
);

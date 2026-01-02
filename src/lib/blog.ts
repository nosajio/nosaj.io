import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "./types";

const BLOG_DIR = path.join(process.cwd(), "blog");

/**
 * Get all posts from the blog directory
 */
// export function getPosts() {
//   const posts: Post[] = [
//     {
//       title: "Three ways to ship",
//       slug: "three-ways-to-ship",
//       date: new Date("01 December 2025").toISOString(),
//       content: "",
//       tags: [],
//     },
//     {
//       title: "Vibe coding with vim",
//       slug: "vibe-coding-with-vim",
//       date: new Date("01 December 2025").toISOString(),
//       content: "",
//       tags: [],
//     },
//     {
//       title: "Holistic feature design",
//       slug: "feature-design",
//       date: new Date("01 November 2025").toISOString(),
//       content: "",
//       tags: [],
//     },
//     {
//       title: "Thank you PHP",
//       slug: "php",
//       date: new Date("01 October 2025").toISOString(),
//       content: "",
//       tags: [],
//     },
//     {
//       title: "Infinite soup",
//       slug: "infinite-soup",
//       date: new Date("01 October 2025").toISOString(),
//       content: "",
//       tags: [],
//     },
//   ];
//   return posts;
// }

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
export async function getPostBySlug(slug: string): Promise<Post | null> {
  "use cache";

  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);

  let filePath: string | null = null;
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
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
export async function getAllPosts(): Promise<Post[]> {
  "use cache";

  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts
    .filter((post): post is Post => post !== null)
    .toSorted(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

import { notFound } from "next/navigation";
import { getPostSlugs, getCachedPostBySlug } from "@/lib/blog";
import { Metadata } from "next";
import { ComponentType } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getCachedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  let PostContent: ComponentType;
  try {
    ({ default: PostContent } = await import(`@/../blog/${slug}.mdx`));
  } catch (error: unknown) {
    console.error("Error loading blog post content", error);
    notFound();
  }

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString()}
        </time>
        {post.tags.length > 0 && (
          <ul>
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </header>
      <PostContent />
    </article>
  );
}

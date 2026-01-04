import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { Metadata } from "next";
import { format } from "date-fns";
import { type MDXContent } from "mdx/types";
import { cn } from "@/lib/cn";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  // generateStaticParams cannot return an empty array, so add a default not
  // found value
  if (slugs.length === 0) {
    return [{ slug: "not-found" }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `nosaj.io - ${post.title}`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  let PostContent: MDXContent;
  try {
    ({ default: PostContent } = await import(`@/../blog/${slug}.mdx`));
  } catch (error: unknown) {
    console.error("Error loading blog post content", error);
    notFound();
  }

  return (
    <article className="mt-8 mb-12 flex flex-col gap-y-8">
      <header className="animate-blur-in-up container">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <time dateTime={post.date} className="text-secondary text-sm">
          {format(post.date, "do MMMM yyyy")}
        </time>
      </header>
      <div
        className={cn(
          "animate-blur-in-up [animation-delay:150ms] [animation-duration:1.2s]",
          "prose prose-neutral dark:prose-invert",
          "prose-headings:font-semibold",
          "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
          "prose-h3:font-medium prose-h4:font-medium prose-h4:text-base",
          "prose-a:decoration-1 prose-a:underline-offset-2",
          "prose-a:decoration-muted prose-a:hover:decoration-foreground",
          "prose-hr:border-secondary prose-hr:border-2",
          "container",
        )}
      >
        <PostContent />
      </div>
    </article>
  );
}

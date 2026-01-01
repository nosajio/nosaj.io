import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { Metadata } from "next";
import { format } from "date-fns";
import { type MDXContent } from "mdx/types";
import { Header } from "@/components/header";

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
    <>
      <Header />
      <article className="mt-8 flex flex-col gap-y-8">
        <header className="container">
          <h1 className="text-xl font-semibold">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-neutral-400">
            {format(post.date, "do MMMM yyyy")}
          </time>
        </header>
        <div className="prose container">
          <PostContent />
        </div>
      </article>
    </>
  );
}

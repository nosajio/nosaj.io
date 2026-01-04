import { PostsList } from "@/components/posts-list";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main>
      <section className="container pt-8">
        <h1 className="animate-blur-in text-sm font-medium text-secondary">
          Blog
        </h1>
        <PostsList
          posts={posts}
          className="animate-blur-in [animation-delay:300ms]"
        />
      </section>
    </main>
  );
}

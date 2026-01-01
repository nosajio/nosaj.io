import { PostsList } from "@/components/posts-list";
import { Header } from "@/components/header";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  "use cache";

  const posts = getAllPosts();

  return (
    <main>
      <Header />
      <section className="container pt-8">
        <h1 className="text-sm font-medium text-neutral-400">Blog</h1>
        <PostsList posts={posts} />
      </section>
    </main>
  );
}

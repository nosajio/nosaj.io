import { getPosts } from "@/lib/blog";
import { PostsList } from "@/components/posts-list";
import { Header } from "@/components/header";

export default async function BlogPage() {
  "use cache";
  // const posts = await getCachedPosts();
  const posts = getPosts();

  return (
    <main>
      <Header />
      <section className="container pt-8">
        <h1 className="font-medium text-sm text-neutral-400">Blog</h1>
        <PostsList posts={posts} />
      </section>
    </main>
  );
}

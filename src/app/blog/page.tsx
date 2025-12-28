import Link from "next/link";
import { getCachedPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getCachedPosts();

  return (
    <main>
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              <span> - {new Date(post.date).toLocaleDateString()}</span>
              {post.excerpt && <p>{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

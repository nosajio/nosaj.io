import { getPosts } from "@/lib/blog";
import { format } from "date-fns/format";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex flex-col gap-8">
      <header className="container mt-20 flex flex-col">
        <h1 className="text-xl font-semibold">Jason Howmans</h1>
        <p className="text-xl text-pretty text-neutral-500">
          Software engineer building Browserbase
        </p>
      </header>

      {/* Blog posts */}
      <section className="container">
        <h2 className="font-medium text-neutral-600">Blog</h2>
        <ul className="w-full flex flex-col gap-y-3 mt-3">
          {posts.map((p) => (
            <li className="flex font-medium" key={p.slug}>
              <Link className="grow" href={`/blog/${p.slug}`}>
                {p.title}
              </Link>
              <span className="shrink">{format(p.date, "MMM yy")}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Work */}
    </main>
  );
}

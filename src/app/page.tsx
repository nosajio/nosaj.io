import { PostsList } from "@/components/posts-list";
import { SocialIcon } from "@/components/socials";
import { getPosts } from "@/lib/blog";
import Link from "next/link";

const socials = [
  {
    key: "x",
    href: "https://x.com/nosajio",
    icon: <SocialIcon icon="x" />,
  },
  {
    key: "github",
    href: "https://github.com/nosajio",
    icon: <SocialIcon icon="github" />,
  },
];

const HOME_POST_COUNT = 3;

export default async function Home() {
  const posts = getPosts();

  return (
    <main className="flex flex-col gap-8">
      <header className="container mt-20 flex flex-col">
        <h1 className="text-xl font-semibold">Jason Howmans</h1>
        <p className="text-xl text-pretty text-neutral-400">
          Software engineer building Browserbase
        </p>
      </header>

      {/* Connect */}
      <section className="container grid auto-cols-[24px] grid-flow-col gap-x-4">
        {socials.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            target="_blank"
            className="flex size-6 items-center justify-center rounded-sm border border-transparent hover:border-neutral-400"
          >
            {s.icon}
          </Link>
        ))}
      </section>

      {/* Blog posts */}
      <section className="container">
        <h2 className="font-medium text-neutral-400">Blog</h2>
        <PostsList posts={posts} truncate={HOME_POST_COUNT} />
      </section>

      {/* Work */}
    </main>
  );
}

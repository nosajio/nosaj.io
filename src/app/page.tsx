import { SocialIcon } from "@/components/socials";
import { getPosts } from "@/lib/blog";
import { format } from "date-fns/format";
import Link from "next/link";

const socials = [
  {
    key: "x",
    href: "https://x.com/nosajio",
    icon: (
      <SocialIcon
        icon="x"
        className="[&>path]:transition-all hover:[&>path]:-translate-y-0.5"
      />
    ),
  },
  {
    key: "github",
    href: "https://github.com/nosajio",
    icon: (
      <SocialIcon
        icon="github"
        className="[&>path]:transition-all hover:[&>path]:-translate-y-0.5"
      />
    ),
  },
];

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
          <Link key={s.key} href={s.href} target="_blank">
            {s.icon}
          </Link>
        ))}
      </section>

      {/* Blog posts */}
      <section className="container">
        <h2 className="font-medium text-neutral-400">Blog</h2>
        <ul className="mt-3 flex w-full flex-col gap-y-3">
          {posts.map((p) => (
            <li className="font-medium" key={p.slug}>
              <Link
                className="flex [&>.title]:transition-all hover:[&>.title]:translate-x-2"
                href={`/blog/${p.slug}`}
              >
                <span className="title grow">{p.title}</span>
                <span className="shrink font-normal text-neutral-400">
                  {format(p.date, "MMM yy")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Work */}
    </main>
  );
}

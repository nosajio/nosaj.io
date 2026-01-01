import { PostsList } from "@/components/posts-list";
import { SocialIcon } from "@/components/socials";
import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

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

const work = [
  {
    key: "browserbase",
    image: {
      width: 9,
      height: 14.4,
      color: "#F03603",
    },
    company: "Browserbase",
    title: "Technical Lead",
    dates: {
      start: new Date("2024-03-01"),
    },
  },
  {
    key: "sprinterview",
    image: {
      width: 34,
      height: 12,
      color: "#000000",
    },
    company: "Sprinterview",
    title: "Founder",
    dates: {
      start: new Date("2023-01-01"),
      end: new Date("2024-01-01"),
    },
  },
  {
    key: "frontier",
    image: {
      width: 22,
      height: 22,
      color: "#039958",
    },
    company: "Frontier",
    title: "Engineering Lead",
    dates: {
      start: new Date("2020-04-01"),
      end: new Date("2022-06-01"),
    },
  },
  {
    key: "pave",
    image: {
      width: 18,
      height: 16,
      color: "#235CF2",
    },
    company: "Pave",
    title: "Design & Engineering",
    dates: {
      start: new Date("2019-12-28"),
      end: new Date("2020-06-01"),
    },
  },
  {
    key: "tradespace",
    image: {
      width: 10,
      height: 16,
      color: "#126BFB",
    },
    company: "Tradespace",
    title: "Design & Engineering",
    dates: {
      start: new Date("2018-09-01"),
      end: new Date("2020-02-28"),
    },
  },
];

const HOME_POST_COUNT = 3;

export default function Home() {
  const posts = getAllPosts();

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
        <h2 className="text-sm font-medium text-neutral-400">Blog</h2>
        <PostsList posts={posts} truncate={HOME_POST_COUNT} />
      </section>

      {/* Work */}
      <section className="container">
        <h2 className="text-sm font-medium text-neutral-400">Work</h2>
        <ul className="mt-3 grid auto-rows-auto grid-cols-[34px_max-content_1fr_max-content] gap-3.5">
          {work.map((w) => (
            <li
              key={w.key}
              className="col-span-full grid grid-cols-subgrid items-center"
              style={{ "--background-color": w.image.color } as CSSProperties}
            >
              <div
                role="img"
                className="corner-shape-squircle flex size-[34px] items-center justify-center rounded-xl bg-(--background-color)"
              >
                <Image
                  src={`/work/${w.key}-logo.svg`}
                  alt={w.company}
                  width={w.image.width}
                  height={w.image.height}
                />
              </div>
              <h3 className="font-medium text-neutral-800">{w.company}</h3>
              <h4 className="text-neutral-400">{w.title}</h4>
              <span className="text-sm whitespace-nowrap text-neutral-300">
                {!("end" in w.dates)
                  ? `${format(w.dates.start, "yyyy")} -> Now`
                  : `${format(w.dates.start, "yyyy")} -> ${format(w.dates.end!, "yyyy")}`}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

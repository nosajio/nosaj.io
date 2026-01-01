import { cn } from "@/lib/cn";
import { type Post } from "@/lib/types";
import { differenceInMonths, format } from "date-fns";
import { ChevronsUpDownIcon } from "lucide-react";
import Link from "next/link";

interface PostsListProps {
  posts: Post[];
  truncate?: number;
  className?: string;
}

const now = new Date();

export function PostsList({ className, posts, truncate }: PostsListProps) {
  const displayPosts =
    typeof truncate === "number" ? posts.toSpliced(truncate) : posts;
  return (
    <ul className={cn("mt-3 flex w-full flex-col gap-y-3", className)}>
      {displayPosts.map((p) => (
        <li className="font-medium" key={p.slug}>
          <Link
            className="flex [&>.title]:transition-all hover:[&>.title]:translate-x-2"
            href={`/blog/${p.slug}`}
          >
            <span className="title grow">{p.title}</span>
            <span className="shrink text-sm font-normal text-neutral-300">
              {formatDate(p.date)}
            </span>
          </Link>
        </li>
      ))}
      {displayPosts.length < posts.length ? (
        <li>
          <Link
            href="/blog"
            className="ease-in-out-circ float-left flex items-center gap-x-1 rounded-sm py-0.5 pr-1.5 pl-0.5 text-sm font-medium text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500"
          >
            <ChevronsUpDownIcon size={16} />
            <span>More</span>
          </Link>
        </li>
      ) : null}
    </ul>
  );
}

function formatDate(date: string | Date) {
  const d = new Date(date);
  // Don't show the year until the date is a year ago
  if (differenceInMonths(now, d) >= 11) {
    return format(d, "dd MMM yy");
  }
  return format(d, "dd MMM");
}

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
  if (posts.length === 0) {
    return <EmptyState />;
  }

  const displayPosts =
    typeof truncate === "number" ? posts.toSpliced(truncate) : posts;

  return (
    <ul className={cn("mt-3 flex w-full flex-col gap-y-3", className)}>
      {displayPosts.map((p) => (
        <li className="font-medium" key={p.slug}>
          <Link className="group relative flex" href={`/blog/${p.slug}`}>
            <ArrowIcon />
            <span className="grow transition-all will-change-transform group-hover:translate-x-5">
              {p.title}
            </span>
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

function ArrowIcon() {
  return (
    <svg
      className="absolute inset-0 hidden group-hover:inline-block"
      width="14"
      height="24"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.495H12"
        className="group-hover:animate-scale-in stroke-current"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.505 1L12.505 6.5L7.505 12"
        className="group-hover:animate-blur-in stroke-current [animation-delay:100ms]"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmptyState() {
  return (
    <div className="mt-3 flex items-center gap-x-3 text-sm text-neutral-500">
      <div className="animate-step-rotate flex size-3 items-center justify-center">
        <div className="h-3 w-px bg-neutral-400" />
      </div>
      Blog under construction...
    </div>
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

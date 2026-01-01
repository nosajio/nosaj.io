"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <header className="flex gap-x-2 p-4">
      <Link href="/" className="group text-sm font-semibold">
        <span className="text-neutral-600 group-hover:text-neutral-900">
          nosaj
        </span>
        <span className="text-neutral-300 group-hover:text-neutral-900">
          .io
        </span>
      </Link>
      <Breadcrumb segments={segments} />
    </header>
  );
}

function Breadcrumb({ segments }: { segments: string[] }) {
  return (
    <div className="flex gap-x-1 text-sm">
      {segments.map((s, i) => (
        <Segment key={s} segments={segments} index={i} />
      ))}
    </div>
  );
}

/**
 * Segment displays a path segment and links to it
 */
function Segment({ segments, index }: { segments: string[]; index: number }) {
  const segment = segments?.[index];
  const pathHref = segments.toSpliced(-index).join("/");
  const isLastSegment = index >= segments.length - 1;

  if (!segment) {
    return null;
  }

  return (
    <>
      <span className="text-neutral-200">/</span>
      <Link
        href={pathHref}
        className={cn("hover:text-neutral-950", {
          "text-neutral-700": isLastSegment,
          "text-neutral-400": !isLastSegment,
        })}
      >
        {segment}
      </Link>
    </>
  );
}

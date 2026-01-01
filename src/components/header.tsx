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
        <span className="text-neutral-600 transition-colors group-hover:text-neutral-900">
          nosaj
        </span>
        <span className="text-neutral-400 transition-colors group-hover:text-neutral-900">
          .io
        </span>
      </Link>
      <Breadcrumb segments={segments} />
    </header>
  );
}

function Breadcrumb({ segments }: { segments: string[] }) {
  // Filter out falsey values
  const safeSegments = segments.map((s) => s.trim()).filter(Boolean);

  if (safeSegments.length === 0) {
    return null;
  }

  return (
    <ul className="flex gap-x-1 text-sm" aria-label="breadcrumb">
      {safeSegments.map((s, i) => (
        <li key={`${s}-${i}`} className="flex gap-x-1">
          <Segment segments={safeSegments} index={i} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Segment displays a path segment and links to it
 */
function Segment({ segments, index }: { segments: string[]; index: number }) {
  const segment = segments?.[index];

  if (!segment) {
    return null;
  }

  const pathHref = `/${segments.toSpliced(index + 1).join("/")}`;

  return (
    <>
      <span className="text-neutral-200">/</span>
      <Link
        href={pathHref}
        className={cn(
          "text-neutral-400 transition-colors hover:text-neutral-950",
        )}
      >
        {segment}
      </Link>
    </>
  );
}

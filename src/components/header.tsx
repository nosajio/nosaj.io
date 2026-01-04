"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";

export function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <header className="flex gap-x-2 p-4">
      <Link href="/" className="group animate-blur-in font-semibold sm:text-sm">
        <span className="text-neutral-600 transition-colors group-hover:text-neutral-900">
          nosaj
        </span>
        <span className="text-secondary transition-colors group-hover:text-neutral-900">
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
    <ul className="flex gap-x-1 sm:text-sm" aria-label="breadcrumb">
      {safeSegments.map((s, i) => (
        <li
          key={`${s}-${i}`}
          className="flex gap-x-1"
          style={{ "--animation-delay": `${(i + 2) * 100}ms` } as CSSProperties}
        >
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
      <span className="animate-breadcrumb-in text-neutral-200 [animation-delay:var(--animation-delay)]">
        /
      </span>
      <Link
        href={pathHref}
        className="animate-breadcrumb-in text-secondary transition-colors [animation-delay:var(--animation-delay)] hover:text-foreground"
      >
        {segment}
      </Link>
    </>
  );
}

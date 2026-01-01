import Link from "next/link";

export function Header() {
  return (
    <header className="p-4">
      <Link href="/" className="group text-sm font-semibold">
        <span className="text-neutral-600 group-hover:text-neutral-900">
          nosaj
        </span>
        <span className="text-neutral-300 group-hover:text-neutral-900">
          .io
        </span>
      </Link>
    </header>
  );
}

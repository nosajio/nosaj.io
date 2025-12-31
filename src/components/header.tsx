import Link from "next/link";

export function Header() {
  return (
    <header className="px-6 py-4">
      <Link href="/" className="group">
        <span className="text-neutral-600 group-hover:text-neutral-900">
          nosaj
        </span>
        <span className="text-neutral-400 group-hover:text-neutral-900">
          .io
        </span>
      </Link>
    </header>
  );
}

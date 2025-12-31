import Link from "next/link";

export function Header() {
  return (
    <header className="px-6 py-4">
      <Link href="/" className="text-neutral-600">
        nosaj<span className="text-neutral-400">.io</span>
      </Link>
    </header>
  );
}

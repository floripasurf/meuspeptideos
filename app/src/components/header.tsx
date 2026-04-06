import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-emerald-600">MP</span>
          <span className="text-lg font-semibold">Meus Peptídeos</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex">
          <Link href="/" className="hover:text-zinc-900">
            Peptídeos
          </Link>
          <Link href="/blog" className="hover:text-zinc-900">
            Blog
          </Link>
          <Link href="/regulamentacao" className="hover:text-zinc-900">
            Regulamentação
          </Link>
          <Link href="/sobre" className="hover:text-zinc-900">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-950 text-navy-100">
      <nav className="border-b border-navy-800 bg-navy-950/95">
        <div className="mx-auto flex max-w-7xl gap-2 px-4 py-3 text-sm">
          <Link className="rounded-lg px-3 py-1.5 text-navy-300 hover:bg-navy-800 hover:text-white" href="/admin/doctors">
            Medicos
          </Link>
          <Link className="rounded-lg px-3 py-1.5 text-navy-300 hover:bg-navy-800 hover:text-white" href="/admin/pharmacies">
            Farmacias
          </Link>
          <Link className="rounded-lg px-3 py-1.5 text-navy-300 hover:bg-navy-800 hover:text-white" href="/admin/quotes">
            Orcamentos
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}

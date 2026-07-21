import Link from "next/link";
import { notFound } from "next/navigation";
import { useCases } from "@/lib/use-cases";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: "Peptídeos por Uso — Ranking por Categoria",
    description:
      "Encontre o melhor peptídeo para cada objetivo: emagrecimento, longevidade, recuperação, anti-aging, cognição, libido e mais. Ranking baseado em evidência científica.",
    alternates: langAlternates(lang, "/uso"),
  };
}

type Props = { params: Promise<{ lang: string }> };

export default async function UsoIndexPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Peptídeos por Uso
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600">
          Encontre os melhores peptídeos e compostos para cada objetivo, com
          ranking baseado em evidência científica.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((u) => (
          <Link
            key={u.slug}
            href={`/${lang}/uso/${u.slug}`}
            className="group block rounded-2xl border border-zinc-200/60 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="text-3xl mb-3">{u.emoji}</div>
            <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-emerald-600">
              {u.label}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 line-clamp-3">
              {u.shortDescription}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
              <span className="text-xs text-zinc-500">
                {u.peptides.length} compostos no ranking
              </span>
              <span className="text-xs font-medium text-emerald-600 group-hover:underline">
                Ver ranking →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">
          <strong>Sobre os rankings:</strong> Cada categoria tem peptídeos
          ranqueados por uma combinação de força da evidência científica,
          status regulatório, segurança e relevância para o uso indicado. Os
          rankings são atualizados conforme novos estudos são publicados.
          Conteúdo informativo — consulte sempre um médico antes de iniciar
          qualquer tratamento.
        </p>
      </div>
    </div>
  );
}

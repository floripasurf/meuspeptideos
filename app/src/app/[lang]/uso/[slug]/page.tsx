import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ResearchPhaseBadge } from "@/components/research-phase-badge";
import { CategoryBadge } from "@/components/category-badge";
import { NewsletterForm } from "@/components/newsletter-form";
import { useCases } from "@/lib/use-cases";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const useCase = useCases.find((u) => u.slug === slug);
  if (!useCase) return {};
  return {
    title: useCase.label,
    description: useCase.shortDescription,
    alternates: langAlternates(lang, `/uso/${slug}`),
  };
}

export default async function UsoPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const useCase = useCases.find((u) => u.slug === slug);
  if (!useCase) notFound();

  const peptideSlugs = useCase.peptides.map((p) => p.slug);

  const peptidesData = await prisma.peptide.findMany({
    where: {
      published: true,
      slug: { in: peptideSlugs },
    },
    select: {
      name: true,
      slug: true,
      category: true,
      researchPhase: true,
      description: true,
      aliases: true,
      _count: { select: { studies: true } },
    },
  });

  // Build ranked array preserving the order from useCase.peptides
  const ranked = useCase.peptides
    .map((rp) => {
      const data = peptidesData.find((p) => p.slug === rp.slug);
      return data ? { ...data, rationale: rp.rationale } : null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-2">
        <Link
          href={`/${lang}/uso`}
          className="text-sm text-emerald-600 hover:text-emerald-500"
        >
          ← Todas as categorias por uso
        </Link>
      </div>

      <header className="mb-10">
        <div className="text-4xl mb-2">{useCase.emoji}</div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {useCase.label}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">
          {useCase.longDescription}
        </p>
      </header>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900">
          Ranking dos {ranked.length} compostos
        </h2>
        <span className="text-xs text-zinc-500">ordem por evidência e relevância</span>
      </div>

      <div className="space-y-4">
        {ranked.map((p, idx) => {
          const rank = idx + 1;
          const isTop3 = rank <= 3;
          return (
            <Link
              key={p.slug}
              href={`/${lang}/peptideo/${p.slug}`}
              className="group block rounded-2xl border border-zinc-200/60 bg-white p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex gap-4 sm:gap-5">
                {/* Rank number */}
                <div className="flex shrink-0 flex-col items-center">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-base font-bold ${
                      rank === 1
                        ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300"
                        : rank === 2
                          ? "bg-zinc-100 text-zinc-700 ring-2 ring-zinc-300"
                          : rank === 3
                            ? "bg-orange-100 text-orange-800 ring-2 ring-orange-300"
                            : "bg-zinc-50 text-zinc-500"
                    }`}
                  >
                    {rank}
                  </div>
                  {isTop3 && (
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                      {rank === 1 ? "Top" : `#${rank}`}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-emerald-600">
                      {p.name}
                    </h3>
                    <CategoryBadge category={p.category} />
                    <ResearchPhaseBadge phase={p.researchPhase} />
                  </div>
                  {p.aliases.length > 0 && (
                    <p className="text-xs text-zinc-400 mb-2">
                      {p.aliases.join(", ")}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed text-zinc-700 font-medium border-l-2 border-emerald-200 pl-3 py-1">
                    {p.rationale}
                  </p>
                  <p className="mt-3 text-sm text-zinc-500 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
                    <span>{p._count.studies} estudo{p._count.studies !== 1 ? "s" : ""}</span>
                    <span>·</span>
                    <span className="font-medium text-emerald-600 group-hover:underline">
                      Ver ficha completa →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">
          <strong>Como interpretamos o ranking:</strong> A ordem reflete uma
          combinação de força da evidência científica em humanos, status
          regulatório, segurança documentada e relevância para o uso indicado.
          Não constitui recomendação médica — a escolha de qualquer composto
          requer avaliação médica individualizada.
        </p>
      </div>

      <section className="mt-10 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #f0f9ff 50%, #f5f3ff 100%)" }}>
        <h2 className="text-xl font-semibold text-zinc-900">
          Receba atualizações
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Novas pesquisas, mudanças regulatórias e novos compostos.
        </p>
        <NewsletterForm source={`uso_${useCase.slug}`} />
      </section>
    </div>
  );
}

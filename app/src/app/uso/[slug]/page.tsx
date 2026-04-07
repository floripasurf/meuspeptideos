import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ResearchPhaseBadge } from "@/components/research-phase-badge";
import { CategoryBadge } from "@/components/category-badge";
import { NewsletterForm } from "@/components/newsletter-form";
import { useCases } from "@/lib/use-cases";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const useCase = useCases.find((u) => u.slug === slug);
  if (!useCase) return {};
  return {
    title: useCase.label,
    description: useCase.shortDescription,
  };
}

export default async function UsoPage({ params }: Props) {
  const { slug } = await params;
  const useCase = useCases.find((u) => u.slug === slug);
  if (!useCase) notFound();

  const peptides = await prisma.peptide.findMany({
    where: {
      published: true,
      slug: { in: useCase.peptideSlugs },
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

  // Sort by use case order
  const sortedPeptides = useCase.peptideSlugs
    .map((slug) => peptides.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {useCase.label}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">
          {useCase.longDescription}
        </p>
      </header>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900">
          {sortedPeptides.length} compostos relacionados
        </h2>
      </div>

      <div className="space-y-4">
        {sortedPeptides.map((p) => (
          <Link
            key={p.slug}
            href={`/peptideo/${p.slug}`}
            className="group block rounded-2xl border border-zinc-200/60 bg-white p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-emerald-600">
                  {p.name}
                </h3>
                <CategoryBadge category={p.category} />
              </div>
              <ResearchPhaseBadge phase={p.researchPhase} />
            </div>
            {p.aliases.length > 0 && (
              <p className="text-xs text-zinc-400">{p.aliases.join(", ")}</p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {p.description}
            </p>
            <div className="mt-3 flex items-center text-xs text-zinc-400">
              {p._count.studies} estudo{p._count.studies !== 1 ? "s" : ""}{" "}
              referenciado{p._count.studies !== 1 ? "s" : ""}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">
          <strong>Aviso:</strong> Esta página tem caráter informativo e não
          constitui recomendação médica. A escolha de qualquer composto requer
          avaliação médica individualizada considerando seu histórico, condição
          atual e objetivos.
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

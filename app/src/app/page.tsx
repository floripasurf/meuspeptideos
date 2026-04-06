import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ResearchPhaseBadge } from "@/components/research-phase-badge";
import { CategoryBadge } from "@/components/category-badge";
import { NewsletterForm } from "@/components/newsletter-form";

export const dynamic = "force-dynamic";

export default async function Home() {
  const peptides = await prisma.peptide.findMany({
    where: { published: true },
    orderBy: { name: "asc" },
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Peptídeos: o que a ciência diz
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
          Base de conhecimento sobre peptídeos com informações baseadas em
          pesquisas científicas. Benefícios comprovados, riscos documentados e o
          que ainda está em estudo.
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          Conteúdo informativo — consulte sempre um médico.
        </p>
      </section>

      {/* Peptide Grid */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
          Peptídeos ({peptides.length})
        </h2>
        {peptides.length === 0 ? (
          <p className="text-zinc-500">
            Conteúdo em preparação. Cadastre-se para ser notificado.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {peptides.map((p) => (
              <Link
                key={p.slug}
                href={`/peptideo/${p.slug}`}
                className="group rounded-xl border border-zinc-200 p-5 transition-all hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-emerald-600">
                    {p.name}
                  </h3>
                  <ResearchPhaseBadge phase={p.researchPhase} />
                </div>
                {p.aliases.length > 0 && (
                  <p className="mt-1 text-xs text-zinc-400">
                    {p.aliases.join(", ")}
                  </p>
                )}
                <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                  {p.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <CategoryBadge category={p.category} />
                  <span className="text-xs text-zinc-400">
                    {p._count.studies} estudo{p._count.studies !== 1 ? "s" : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="rounded-2xl bg-emerald-50 p-8 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Fique atualizado
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
          Receba atualizações sobre novos peptídeos, mudanças na regulamentação
          e novas pesquisas publicadas.
        </p>
        <NewsletterForm source="home" />
      </section>
    </div>
  );
}

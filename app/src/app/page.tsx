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
    <div>
      {/* Hero */}
      <section className="hero-gradient hero-pattern relative">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              <span className="text-xs font-medium text-brand-300">
                Base de conhecimento atualizada
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Peptídeos:{" "}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                o que a ciência diz
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Base de conhecimento sobre peptídeos com informações baseadas em
              pesquisas científicas. Benefícios comprovados, riscos documentados
              e o que ainda está em estudo.
            </p>
            <p className="mt-3 text-sm text-white/50">
              Conteúdo informativo — consulte sempre um médico.
            </p>
          </div>
        </div>
      </section>

      {/* Peptide Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              Peptídeos
            </h2>
            <p className="mt-1 text-sm text-navy-500">
              {peptides.length} peptídeo{peptides.length !== 1 ? "s" : ""}{" "}
              catalogado{peptides.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {peptides.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center">
            <p className="text-navy-500">
              Conteúdo em preparação. Cadastre-se para ser notificado.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {peptides.map((p) => (
              <Link
                key={p.slug}
                href={`/peptideo/${p.slug}`}
                className="card-hover group rounded-2xl border border-navy-200/60 bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-navy-900 transition-colors group-hover:text-brand-600">
                    {p.name}
                  </h3>
                  <ResearchPhaseBadge phase={p.researchPhase} />
                </div>
                {p.aliases.length > 0 && (
                  <p className="mt-1 text-xs text-navy-400">
                    {p.aliases.join(", ")}
                  </p>
                )}
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-navy-600">
                  {p.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-3">
                  <CategoryBadge category={p.category} />
                  <span className="flex items-center gap-1 text-xs text-navy-400">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    </svg>
                    {p._count.studies} estudo
                    {p._count.studies !== 1 ? "s" : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="newsletter-gradient rounded-2xl p-8 sm:p-12">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              Fique atualizado
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-600">
              Receba atualizações sobre novos peptídeos, mudanças na
              regulamentação e novas pesquisas publicadas.
            </p>
            <NewsletterForm source="home" />
            <p className="mt-4 text-xs text-navy-400">
              Sem spam. Cancelamento a qualquer momento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

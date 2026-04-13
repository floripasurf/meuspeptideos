import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ResearchPhaseBadge } from "@/components/research-phase-badge";
import { CategoryBadge } from "@/components/category-badge";
import { NewsletterForm } from "@/components/newsletter-form";
import { comparisons } from "@/lib/comparisons";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);
  if (!comp) return {};
  return {
    title: comp.metaTitle,
    description: comp.description,
  };
}

export default async function CompararPage({ params }: Props) {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);
  if (!comp) notFound();

  const [peptideA, peptideB] = await Promise.all([
    prisma.peptide.findUnique({
      where: { slug: comp.peptideA },
      select: {
        name: true,
        slug: true,
        category: true,
        researchPhase: true,
        description: true,
      },
    }),
    prisma.peptide.findUnique({
      where: { slug: comp.peptideB },
      select: {
        name: true,
        slug: true,
        category: true,
        researchPhase: true,
        description: true,
      },
    }),
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comp.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {comp.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">
          {comp.intro}
        </p>
      </header>

      {/* Side-by-side cards */}
      {peptideA && peptideB && (
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[peptideA, peptideB].map((p) => (
            <Link
              key={p.slug}
              href={`/peptideo/${p.slug}`}
              className="group rounded-2xl border border-zinc-200/60 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-emerald-600">
                  {p.name}
                </h3>
                <ResearchPhaseBadge phase={p.researchPhase} />
              </div>
              <CategoryBadge category={p.category} />
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                {p.description}
              </p>
              <p className="mt-3 text-xs font-medium text-emerald-600">
                Ver ficha completa →
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Sections */}
      <div className="space-y-8">
        {comp.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">
              {s.heading}
            </h2>
            <div
              className="prose prose-zinc max-w-none"
              dangerouslySetInnerHTML={{ __html: s.content }}
            />
          </section>
        ))}
      </div>

      {/* Verdict */}
      <section className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-xl font-bold text-zinc-900 mb-2">Veredicto</h2>
        <p className="text-zinc-700 leading-relaxed">{comp.verdict}</p>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          {comp.faq.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 bg-white p-5"
            >
              <h3 className="font-semibold text-zinc-900">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">
          <strong>Aviso:</strong> Esta comparação tem caráter informativo e não
          constitui recomendação médica. Consulte sempre um médico antes de
          iniciar qualquer tratamento.
        </p>
      </div>

      {/* Newsletter */}
      <section className="mt-10 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #f0f9ff 50%, #f5f3ff 100%)" }}>
        <h2 className="text-xl font-semibold text-zinc-900">
          Receba novas comparações
        </h2>
        <NewsletterForm source={`comparar_${comp.slug}`} />
      </section>
    </article>
  );
}

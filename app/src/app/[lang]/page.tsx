import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ResearchPhaseBadge } from "@/components/research-phase-badge";
import { CategoryBadge } from "@/components/category-badge";
import { NewsletterForm } from "@/components/newsletter-form";
import { getDictionary, hasLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ lang: string }> };

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const prefix = `/${lang}`;

  const phaseOrder: Record<string, number> = {
    approved: 0,
    phase3: 1,
    phase2: 2,
    phase1: 3,
    preclinical: 4,
  };

  const raw = await prisma.peptide.findMany({
    where: { published: true },
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

  const peptides = raw.sort(
    (a, b) =>
      (phaseOrder[a.researchPhase] ?? 99) - (phaseOrder[b.researchPhase] ?? 99)
  );

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
      >
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 ring-1 ring-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-white/90">
                {dict.hero.badge}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {dict.hero.title1}{" "}
              <span className="text-emerald-300">
                {dict.hero.titleHighlight}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
              {dict.hero.subtitle}
            </p>
            <p className="mt-3 text-sm text-white/70">
              {dict.hero.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Compound Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              {dict.grid.title}
            </h2>
            <p className="mt-1 text-sm text-navy-500">
              {peptides.length}{" "}
              {peptides.length !== 1 ? dict.grid.countPlural : dict.grid.countSingular}
            </p>
          </div>
        </div>

        {peptides.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center">
            <p className="text-navy-500">{dict.grid.empty}</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {peptides.map((p) => (
              <Link
                key={p.slug}
                href={`${prefix}/peptideo/${p.slug}`}
                className="group rounded-2xl border border-navy-200/60 bg-white p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
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
                    {p._count.studies}{" "}
                    {p._count.studies !== 1 ? dict.grid.studyPlural : dict.grid.studies}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div
          className="rounded-2xl p-8 sm:p-12"
          style={{
            background: "linear-gradient(135deg, #f0fdfa 0%, #f0f9ff 50%, #f5f3ff 100%)",
          }}
        >
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              {dict.newsletter.title}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-600">
              {dict.newsletter.subtitle}
            </p>
            <NewsletterForm source="home" />
            <p className="mt-4 text-xs text-navy-400">
              {dict.newsletter.noSpam}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

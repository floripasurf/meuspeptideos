import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ResearchPhaseBadge } from "@/components/research-phase-badge";
import { CategoryBadge } from "@/components/category-badge";
import { LocalLeadForm } from "@/components/local-lead-form";
import { getCityBySlug } from "@/lib/cities";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ lang: string; peptide: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, peptide: peptideSlug, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const peptide = await prisma.peptide.findUnique({
    where: { slug: peptideSlug },
    select: { name: true, description: true },
  });
  if (!peptide) return {};

  return {
    title: `${peptide.name} em ${city.name}, ${city.stateAbbr} — Onde Encontrar`,
    description: `Informações sobre ${peptide.name} em ${city.name}: como encontrar profissionais qualificados, status regulatório no Brasil e indicação de médicos locais.`,
    alternates: langAlternates(lang, `/${peptideSlug}/${citySlug}`),
  };
}

export default async function PeptideCityPage({ params }: Props) {
  const { lang, peptide: peptideSlug, city: citySlug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const peptide = await prisma.peptide.findUnique({
    where: { slug: peptideSlug, published: true },
    select: {
      name: true,
      slug: true,
      aliases: true,
      category: true,
      researchPhase: true,
      description: true,
      mechanism: true,
      anvisaStatus: true,
      fdaStatus: true,
      _count: { select: { studies: true } },
    },
  });

  if (!peptide) notFound();

  // JSON-LD for local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${peptide.name} em ${city.name}`,
    description: `Informações sobre ${peptide.name} em ${city.name}, ${city.stateAbbr}`,
    url: `https://meuspeptideos.com.br/${peptideSlug}/${citySlug}`,
    inLanguage: "pt-BR",
    about: {
      "@type": "MedicalEntity",
      name: peptide.name,
    },
    spatialCoverage: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.state,
      },
    },
  };

  const isApproved = peptide.anvisaStatus === "approved";

  return (
    <article className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b border-zinc-100 bg-gradient-to-b from-zinc-50 to-white">
        <header className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <Link
              href={`/${lang}/peptideo/${peptide.slug}`}
              className="text-emerald-600 hover:underline"
            >
              {peptide.name}
            </Link>
            <span className="text-zinc-400">·</span>
            <span className="text-zinc-500">
              {city.name}, {city.stateAbbr}
            </span>
            <span className="text-zinc-400">·</span>
            <CategoryBadge category={peptide.category} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            {peptide.name} em {city.name}, {city.stateAbbr}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
            Tudo o que você precisa saber sobre {peptide.name} em {city.name}:
            como funciona, status regulatório no Brasil, e como encontrar
            profissionais qualificados na sua região.
          </p>
        </header>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Status local */}
            <section className="rounded-xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Status no Brasil
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1 h-2 w-2 rounded-full ${
                      isApproved ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-zinc-900">
                      {isApproved
                        ? "Aprovado pela ANVISA"
                        : "Não aprovado pela ANVISA"}
                    </p>
                    <p className="text-sm text-zinc-600">
                      {isApproved
                        ? `${peptide.name} possui registro na ANVISA e pode ser prescrito por médicos no Brasil. Compra requer prescrição médica.`
                        : `${peptide.name} não possui registro formal na ANVISA. Em alguns casos, pode ser obtido via farmácias de manipulação com prescrição médica.`}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sobre o peptídeo */}
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-3">
                O que é {peptide.name}?
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                {peptide.description}
              </p>
              <Link
                href={`/${lang}/peptideo/${peptide.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Ver ficha técnica completa →
              </Link>
            </section>

            {/* Como encontrar profissionais */}
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-3">
                Como encontrar profissionais em {city.name}
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                {city.name} concentra alguns dos principais centros médicos do
                Brasil, com profissionais de várias especialidades que podem
                avaliar a indicação de {peptide.name}. As especialidades mais
                comuns para esse tipo de atendimento incluem:
              </p>
              <ul className="mt-4 space-y-2 text-zinc-600">
                {peptide.category === "glp1" && (
                  <>
                    <li>• <strong>Endocrinologia</strong> — para diabetes e obesidade</li>
                    <li>• <strong>Medicina interna</strong> — manejo metabólico geral</li>
                    <li>• <strong>Nutrologia</strong> — abordagem nutricional integrada</li>
                  </>
                )}
                {peptide.category === "longevity" && (
                  <>
                    <li>• <strong>Medicina de longevidade</strong> — abordagem preventiva</li>
                    <li>• <strong>Medicina funcional</strong> — saúde integrativa</li>
                    <li>• <strong>Geriatria</strong> — saúde do envelhecimento</li>
                  </>
                )}
                {peptide.category === "growth_hormone" && (
                  <>
                    <li>• <strong>Endocrinologia</strong> — diagnóstico e prescrição de hormônios</li>
                    <li>• <strong>Medicina esportiva</strong> — recuperação e performance</li>
                    <li>• <strong>Medicina de longevidade</strong> — protocolos antienvelhecimento</li>
                  </>
                )}
                {peptide.category === "healing" && (
                  <>
                    <li>• <strong>Ortopedia</strong> — lesões musculoesqueléticas</li>
                    <li>• <strong>Medicina esportiva</strong> — recuperação de atletas</li>
                    <li>• <strong>Medicina funcional</strong> — abordagem regenerativa</li>
                  </>
                )}
                {peptide.category === "cosmetic" && (
                  <>
                    <li>• <strong>Dermatologia</strong> — tratamentos de pele</li>
                    <li>• <strong>Medicina estética</strong> — protocolos antienvelhecimento</li>
                  </>
                )}
                {(peptide.category === "neuroprotective" || peptide.category === "performance" || peptide.category === "immune") && (
                  <>
                    <li>• <strong>Medicina funcional</strong> — abordagem integrativa</li>
                    <li>• <strong>Medicina de longevidade</strong> — protocolos preventivos</li>
                    <li>• <strong>Neurologia</strong> — avaliação neurológica especializada</li>
                  </>
                )}
              </ul>
              <p className="mt-4 text-sm text-zinc-500">
                <strong>Importante:</strong> Nem todos os profissionais
                prescrevem peptídeos. Se você está em {city.name} e quer uma
                indicação de profissional confiável, use o formulário ao lado
                para receber uma recomendação personalizada.
              </p>
            </section>

            {/* Disclaimer */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm text-amber-800">
                <strong>Aviso médico:</strong> Esta página tem caráter
                exclusivamente informativo. Não constitui prescrição médica nem
                recomendação de tratamento. {peptide.name} deve ser usado apenas
                sob orientação e prescrição de médico qualificado.
              </p>
            </div>
          </div>

          {/* Sticky lead form */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <LocalLeadForm
                peptideName={peptide.name}
                cityName={city.name}
                cityState={city.stateAbbr}
                peptideSlug={peptide.slug}
                citySlug={city.slug}
              />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

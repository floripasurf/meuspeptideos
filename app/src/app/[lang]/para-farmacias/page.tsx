import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RadarInterestForm } from "@/components/radar-interest-form";
import { hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Radar de mercado para farmácias",
    description: "Inteligência agregada sobre pesquisa, regulação e demanda informacional no mercado de peptídeos.",
    alternates: langAlternates(lang, "/para-farmacias"),
    robots: { index: lang === "pt", follow: true },
  };
}

export default async function ParaFarmaciasPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="bg-white">
      <section className="border-b border-zinc-200">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">Radar para farmácias</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold text-zinc-950 sm:text-5xl">
              Acompanhe o mercado com dados agregados e fontes verificáveis
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Um produto de inteligência para acompanhar interesse informacional, publicações científicas e mudanças regulatórias relevantes ao setor.
            </p>
            <dl className="mt-8 grid gap-5 border-t border-zinc-200 pt-6 sm:grid-cols-3">
              <div><dt className="text-sm font-semibold text-zinc-950">Tendências</dt><dd className="mt-1 text-sm text-zinc-600">Temas com crescimento de pesquisa e dúvidas recorrentes.</dd></div>
              <div><dt className="text-sm font-semibold text-zinc-950">Evidências</dt><dd className="mt-1 text-sm text-zinc-600">Estudos organizados por substância e estágio de pesquisa.</dd></div>
              <div><dt className="text-sm font-semibold text-zinc-950">Regulação</dt><dd className="mt-1 text-sm text-zinc-600">Alertas com fonte primária para revisão de compliance.</dd></div>
            </dl>
          </div>
          <aside className="border-l-4 border-emerald-700 bg-zinc-50 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">Participar da descoberta</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              O cadastro serve para validar relatórios e licenças de dados. Não envolve pedidos de orçamento, comissão ou indicação de medicamentos.
            </p>
            <div className="mt-5">
              <RadarInterestForm sourcePage={`/${lang}/para-farmacias`} initialAudience="pharmacy" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RadarInterestForm } from "@/components/radar-interest-form";
import { hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Radar de mercado para clínicas",
    description: "Sinais agregados de demanda, conteúdo e regulação para planejamento de clínicas.",
    alternates: langAlternates(lang, "/para-clinicas"),
    robots: { index: lang === "pt", follow: true },
  };
}

export default async function ParaClinicasPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="bg-white">
      <section className="border-b border-zinc-200">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">Radar para clínicas</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold text-zinc-950 sm:text-5xl">
              Planeje conteúdo e serviços com sinais agregados de mercado
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Relatórios sobre temas pesquisados, evolução regulatória e produção científica para apoiar decisões de comunicação e planejamento.
            </p>
            <dl className="mt-8 grid gap-5 border-t border-zinc-200 pt-6 sm:grid-cols-3">
              <div><dt className="text-sm font-semibold text-zinc-950">Demanda editorial</dt><dd className="mt-1 text-sm text-zinc-600">Assuntos e dúvidas em crescimento, apresentados de forma agregada.</dd></div>
              <div><dt className="text-sm font-semibold text-zinc-950">Monitor regulatório</dt><dd className="mt-1 text-sm text-zinc-600">Mudanças oficiais e seus possíveis impactos operacionais.</dd></div>
              <div><dt className="text-sm font-semibold text-zinc-950">Briefings</dt><dd className="mt-1 text-sm text-zinc-600">Recortes periódicos para equipes de conteúdo e atendimento.</dd></div>
            </dl>
          </div>
          <aside className="border-l-4 border-emerald-700 bg-zinc-50 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">Validar o Radar B2B</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Estamos definindo escopo e frequência com os primeiros participantes. O produto não inclui leads, ranking pago ou encaminhamento.
            </p>
            <div className="mt-5">
              <RadarInterestForm sourcePage={`/${lang}/para-clinicas`} initialAudience="clinic" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

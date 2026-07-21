import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RadarInterestForm } from "@/components/radar-interest-form";
import { hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Radar para profissionais de saúde",
    description: "Inteligência editorial e regulatória sobre peptídeos para profissionais de saúde.",
    alternates: langAlternates(lang, "/para-medicos"),
    robots: { index: lang === "pt", follow: true },
  };
}

export default async function ParaMedicosPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="bg-white">
      <section className="border-b border-zinc-200">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">Radar profissional</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold text-zinc-950 sm:text-5xl">
              Acompanhe evidências e mudanças regulatórias sem depender de ruído
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Um produto informacional para acompanhar estudos, registros, alertas sanitários e mudanças relevantes no mercado de peptídeos.
            </p>
            <div className="mt-8 grid gap-5 border-t border-zinc-200 pt-6 sm:grid-cols-3">
              {[
                ["Evidências", "Novos estudos organizados por composto e fase de pesquisa."],
                ["Regulação", "Atualizações com links para fontes oficiais."],
                ["Mercado", "Sinais agregados de interesse, sem venda de pacientes."],
              ].map(([title, copy]) => (
                <div key={title}>
                  <h2 className="text-sm font-semibold text-zinc-950">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="border-l-4 border-emerald-700 bg-zinc-50 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">Participar do piloto</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              O cadastro registra interesse no Radar. Não há encaminhamento de pacientes nem cobrança por indicação.
            </p>
            <div className="mt-5">
              <RadarInterestForm sourcePage={`/${lang}/para-medicos`} initialAudience="professional" />
            </div>
          </aside>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-2xl font-semibold text-zinc-950">Limites do serviço</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
          O Meus Peptídeos não participa da relação médico-paciente, não recomenda prescrições e não remunera indicações. Conteúdo editorial não substitui avaliação clínica independente.
        </p>
        <Link href={`/${lang}/radar`} className="mt-5 inline-block text-sm font-semibold text-emerald-700 hover:underline">
          Ver todos os planos em validação
        </Link>
      </section>
    </div>
  );
}

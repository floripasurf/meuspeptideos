import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RadarInterestForm } from "@/components/radar-interest-form";
import { hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ newsletter?: string; audience?: string }>;
};

type RadarAudience = "consumer" | "pharmacy" | "clinic" | "professional" | "supplier";

function initialAudience(value?: string): RadarAudience {
  if (value === "professional" || value === "pharmacy" || value === "clinic" || value === "supplier") return value;
  if (value === "organization") return "supplier";
  return "consumer";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Radar Meus Peptídeos",
    description: "Monitoramento editorial, científico e regulatório sobre peptídeos para leitores e organizações.",
    alternates: langAlternates(lang, "/radar"),
    robots: { index: lang === "pt", follow: true },
  };
}

export default async function RadarPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { newsletter, audience } = await searchParams;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="bg-white">
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          {newsletter === "confirmed" ? (
            <p className="mb-6 border-l-4 border-emerald-600 bg-emerald-50 p-4 text-sm text-emerald-900">
              Inscrição confirmada. Você já pode receber as próximas edições.
            </p>
          ) : null}
          {newsletter === "unsubscribed" ? (
            <p className="mb-6 border-l-4 border-zinc-500 bg-zinc-50 p-4 text-sm text-zinc-800">
              Inscrição cancelada e endereço removido da lista.
            </p>
          ) : null}
          <p className="text-sm font-semibold uppercase text-emerald-700">Em validação</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold text-zinc-950 sm:text-6xl">
            Radar Meus Peptídeos
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600">
            Monitoramento de evidências, regulação e sinais agregados de interesse para quem precisa acompanhar o setor com fontes verificáveis.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-950">Três produtos para validar</h2>
          <div className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200">
            {[
              ["Radar Essencial", "Resumo periódico para leitores: estudos, alertas regulatórios e mudanças de status dos compostos."],
              ["Radar Profissional", "Briefing mais denso para clínicas, farmácias, profissionais e empresas do setor."],
              ["Licença de dados", "Acesso estruturado a dados editoriais e regulatórios, sem dados pessoais ou de pacientes."],
            ].map(([title, copy]) => (
              <div key={title} className="py-5">
                <h3 className="font-semibold text-zinc-950">{title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-600">{copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-zinc-50 p-5">
            <h2 className="text-sm font-semibold text-zinc-950">O que não faz parte</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              O Radar não vende encaminhamentos, não ordena prestadores por pagamento, não intermedeia prescrições e não promete disponibilidade de substâncias.
            </p>
          </div>
        </div>

        <aside className="border-l-4 border-emerald-700 bg-zinc-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-zinc-950">Ajude a definir o piloto</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Selecione seu perfil. Usaremos as respostas para priorizar formato, frequência e faixa de preço antes de abrir cobrança.
          </p>
          <div className="mt-6">
            <RadarInterestForm sourcePage={`/${lang}/radar`} initialAudience={initialAudience(audience)} />
          </div>
        </aside>
      </section>
    </div>
  );
}

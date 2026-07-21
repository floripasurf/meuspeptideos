import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartnerApplicationForm } from "@/components/partner-application-form";
import { hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Para Farmácias de Manipulação - Meus Peptídeos",
    description:
      "Programa B2B para farmácias de manipulação interessadas em receber pedidos qualificados de pacientes com prescrição.",
    alternates: langAlternates(lang, "/para-farmacias"),
    robots: { index: true, follow: true },
  };
}

export default async function ParaFarmaciasPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <main className="bg-white">
      <section className="border-b border-zinc-100">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Parcerias B2B
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
              Receba pedidos qualificados sem virar vitrine pública
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
              O Meus Peptídeos captura demanda educacional e roteia pedidos de
              orçamento para farmácias parceiras, sempre com consentimento do
              paciente e foco em prescrição válida.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Pedidos com composto e cidade declarados",
                "Roteamento por região e capacidade de envio",
                "Operação privada, com revisão de compliance",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-zinc-200 p-4">
                  <p className="text-sm font-medium text-zinc-900">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">Entrar na fila de parceria</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              O cadastro não ativa envio automaticamente. Primeiro revisamos
              reputação, atendimento, compostos, região e aderência regulatória.
            </p>
            <div className="mt-5">
              <PartnerApplicationForm sourcePage={`/${lang}/para-farmacias`} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Modelo comercial</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Começamos com comissão por pedido convertido ou preço fixo por lead
              qualificado. A regra fica registrada por farmácia no admin.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Controle de risco</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Prospects com promessa sensível, ausência de contato ou reputação
              fraca ficam bloqueados para conversão automática.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Privacidade</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Dados de pacientes só são compartilhados após consentimento. A
              farmácia recebe apenas o necessário para responder ao pedido.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

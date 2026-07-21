import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClinicInterestForm } from "@/components/clinic-interest-form";
import { hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Diretório para clínicas - Meus Peptídeos",
    description:
      "Destaque sua clínica em páginas locais de alta intenção para pacientes que pesquisam peptídeos e tratamentos relacionados.",
    alternates: langAlternates(lang, "/para-clinicas"),
    robots: { index: true, follow: true },
  };
}

export default async function ParaClinicasPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <main className="bg-white">
      <section className="border-b border-zinc-100">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Diretório premium
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
              Apareça para pacientes que já procuram sua especialidade
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
              O Meus Peptídeos organiza páginas por cidade e composto para
              capturar demanda de alta intenção. Clínicas selecionadas podem
              aparecer em destaque nessas páginas locais.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Buscas qualificadas no nicho de peptídeos",
                "Páginas locais por composto e cidade",
                "Leads com interesse declarado",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-zinc-200 p-4">
                  <p className="text-sm font-medium text-zinc-900">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-xl font-semibold text-zinc-950">
              Avaliar disponibilidade
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Planos a partir de R$ 297/mês por cidade, sem fidelidade. A
              ativação depende de disponibilidade local e revisão do cadastro.
            </p>
            <div className="mt-5">
              <ClinicInterestForm sourcePage={`/${lang}/para-clinicas`} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Como funciona</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              A clínica aparece em páginas locais relevantes quando houver
              assinatura ativa e cadastro público aprovado.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Modelo inicial</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Cobrança manual por Pix no primeiro ciclo. Gateway recorrente fica
              para depois que houver tração suficiente.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Compliance</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              A listagem é paga e não constitui recomendação médica. Conteúdo
              informativo continua separado de qualquer decisão clínica.
            </p>
          </div>
        </div>
        <p className="mt-8 text-sm text-zinc-500">
          Quer entender antes de cadastrar? Veja também a página{" "}
          <Link href={`/${lang}/sobre`} className="text-emerald-600 hover:underline">
            sobre o Meus Peptídeos
          </Link>
          .
        </p>
      </section>
    </main>
  );
}

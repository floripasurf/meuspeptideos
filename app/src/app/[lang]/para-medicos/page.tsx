import Link from "next/link";
import { notFound } from "next/navigation";
import { DoctorSignupForm } from "@/components/doctor-signup-form";
import { getDictionary, hasLocale } from "@/lib/i18n";

export const metadata = {
  title: "Para Médicos — Receba Pacientes Qualificados",
  description:
    "Cadastro privado e discreto para médicos que prescrevem peptídeos. Receba indicações de pacientes interessados na sua região, sem exposição pública.",
  robots: {
    index: false, // não indexar — página privada
    follow: false,
  },
};

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ verify?: string }>;
};

export default async function ParaMedicosPage({ params, searchParams }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { verify } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {verify === "success" && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-600 mt-0.5 shrink-0">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <div>
            <p className="font-semibold text-emerald-900">Email confirmado com sucesso!</p>
            <p className="mt-1 text-sm text-emerald-800">
              Seu cadastro foi ativado. Em até 48h entraremos em contato para validar
              os dados profissionais e iniciar o envio de leads.
            </p>
          </div>
        </div>
      )}
      {verify === "already" && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm text-blue-800">
            Este email já foi confirmado anteriormente. Não é necessário confirmar novamente.
          </p>
        </div>
      )}
      {verify === "invalid" && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-800">
            Link de confirmação inválido ou expirado. Por favor, faça um novo cadastro.
          </p>
        </div>
      )}

      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Cadastro privado e confidencial
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Receba pacientes qualificados na sua região
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
          O Meus Peptídeos conecta pacientes interessados em peptídeos a médicos
          qualificados — de forma discreta, sem exposição pública.
        </p>
      </header>

      {/* Value Props */}
      <section className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <h3 className="font-semibold text-zinc-900">100% Confidencial</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Seu nome e dados nunca aparecerão publicamente no site. Indicações
            são feitas individualmente para cada paciente.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="font-semibold text-zinc-900">Match por região</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Você só recebe leads de pacientes na sua cidade ou região. Sem
            perder tempo com contatos distantes.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
          </div>
          <h3 className="font-semibold text-zinc-900">Pacientes informados</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Os pacientes chegam até nós por conteúdo educacional baseado em
            ciência. São pessoas informadas e qualificadas.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-10 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-4">
          Como funciona
        </h2>
        <ol className="space-y-4">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              1
            </span>
            <div>
              <p className="font-medium text-zinc-900">Cadastro discreto</p>
              <p className="text-sm text-zinc-600">
                Você preenche o formulário abaixo informando especialidade,
                cidade e quais peptídeos prescreve. Seus dados são privados.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              2
            </span>
            <div>
              <p className="font-medium text-zinc-900">Verificação rápida</p>
              <p className="text-sm text-zinc-600">
                Validamos o CRM e entramos em contato para alinhar detalhes.
                Sem burocracia.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              3
            </span>
            <div>
              <p className="font-medium text-zinc-900">Receba leads qualificados</p>
              <p className="text-sm text-zinc-600">
                Quando um paciente da sua região solicita uma indicação, você
                recebe os dados dele por WhatsApp ou email. Você decide quem
                atender.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              4
            </span>
            <div>
              <p className="font-medium text-zinc-900">Modelo simples</p>
              <p className="text-sm text-zinc-600">
                Pague apenas pelos leads que receber. Sem mensalidade, sem
                exclusividade. Cancele quando quiser.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Form */}
      <section className="rounded-2xl border-2 border-emerald-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">
          Cadastro de profissional
        </h2>
        <p className="mb-6 text-sm text-zinc-600">
          Informações confidenciais. Não serão exibidas publicamente.
        </p>
        <DoctorSignupForm />
      </section>

      {/* Trust + Security */}
      <section className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        <div className="flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500 mt-0.5 shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <div className="flex-1">
            <h3 className="font-semibold text-zinc-900 text-sm">
              Como protegemos seus dados
            </h3>
            <ul className="mt-2 space-y-1 text-xs text-zinc-600">
              <li>• Servidores no Brasil (sa-east-1, São Paulo) — em conformidade com a LGPD</li>
              <li>• Conexão criptografada (TLS 1.3) entre seu navegador e nossos servidores</li>
              <li>• Dados em repouso criptografados (AES-256)</li>
              <li>• Cadastro nunca exposto publicamente — apenas você e nossa equipe têm acesso</li>
              <li>• Confirmação por email obrigatória para evitar fraudes</li>
              <li>• Direito ao esquecimento garantido — você pode solicitar exclusão a qualquer momento</li>
            </ul>
            <p className="mt-3 text-xs text-zinc-500">
              Detalhes completos na{" "}
              <Link
                href={`/${lang}/privacidade-medicos`}
                className="font-medium text-emerald-600 underline"
              >
                Política de Privacidade para Médicos
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

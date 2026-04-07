import { DoctorSignupForm } from "@/components/doctor-signup-form";

export const metadata = {
  title: "Para Médicos — Receba Pacientes Qualificados",
  description:
    "Cadastro privado e discreto para médicos que prescrevem peptídeos. Receba indicações de pacientes interessados na sua região, sem exposição pública.",
  robots: {
    index: false, // não indexar — página privada
    follow: false,
  },
};

export default function ParaMedicosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
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

      {/* Trust */}
      <section className="mt-10 text-center text-sm text-zinc-500">
        <p>
          Suas informações são confidenciais e armazenadas com segurança.
          <br />
          Seguimos a LGPD (Lei Geral de Proteção de Dados).
        </p>
      </section>
    </div>
  );
}

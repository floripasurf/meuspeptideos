import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ResearchPhaseBar } from "@/components/research-phase-badge";
import { CategoryBadge } from "@/components/category-badge";
import { NewsletterForm } from "@/components/newsletter-form";
import { RegulatoryStatus } from "@/generated/prisma/enums";

type Benefit = {
  name: string;
  evidence: "proven" | "research" | "unproven";
  description: string;
  studyUrl?: string;
};

type Risk = {
  name: string;
  severity: "low" | "medium" | "high";
  frequency: string;
  description: string;
  studyUrl?: string;
};

type InternetClaim = {
  claim: string;
  whatTheySay: string;
  actualEvidence: string;
  verdict: "true" | "partial" | "false" | "unknown";
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const peptide = await prisma.peptide.findUnique({
    where: { slug },
    select: { name: true, description: true, aliases: true },
  });

  if (!peptide) return { title: "Peptídeo não encontrado" };

  const aliasText =
    peptide.aliases.length > 0
      ? ` (${peptide.aliases.join(", ")})`
      : "";

  return {
    title: `${peptide.name}${aliasText} — Benefícios, Riscos e Pesquisa`,
    description: peptide.description.slice(0, 160),
  };
}

export default async function PeptidePage({ params }: Props) {
  const { slug } = await params;
  const peptide = await prisma.peptide.findUnique({
    where: { slug, published: true },
    include: {
      studies: { orderBy: { year: "desc" } },
      faqs: { orderBy: { order: "asc" } },
    },
  });

  if (!peptide) notFound();

  const benefits = peptide.benefits as Benefit[];
  const risks = peptide.risks as Risk[];
  const claims = peptide.internetVsScience as InternetClaim[];

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CategoryBadge category={peptide.category} />
          {peptide.aliases.length > 0 && (
            <span className="text-sm text-zinc-400">
              {peptide.aliases.join(", ")}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
          {peptide.name}
        </h1>
        <p className="mt-3 text-lg text-zinc-600">{peptide.description}</p>
        <p className="mt-1 text-xs text-zinc-400">
          Última atualização:{" "}
          {peptide.updatedAt.toLocaleDateString("pt-BR")}
        </p>
      </header>

      {/* Research Phase */}
      <section className="mb-8 rounded-xl border border-zinc-200 p-6">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">
          Status da Pesquisa
        </h2>
        <ResearchPhaseBar phase={peptide.researchPhase} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
          <RegulatoryStatusCard
            label="ANVISA (Brasil)"
            status={peptide.anvisaStatus}
          />
          <RegulatoryStatusCard label="FDA (EUA)" status={peptide.fdaStatus} />
          <RegulatoryStatusCard
            label="EMA (Europa)"
            status={peptide.emaStatus}
          />
        </div>
      </section>

      {/* Mechanism */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-zinc-900">
          Mecanismo de Ação
        </h2>
        <p className="text-zinc-600 leading-relaxed">{peptide.mechanism}</p>
      </section>

      {/* Benefits */}
      {benefits.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            Benefícios
          </h2>
          <div className="space-y-3">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-zinc-100 bg-zinc-50 p-4"
              >
                <EvidenceIcon evidence={b.evidence} />
                <div className="flex-1">
                  <p className="font-medium text-zinc-900">{b.name}</p>
                  <p className="mt-1 text-sm text-zinc-600">{b.description}</p>
                  {b.studyUrl && (
                    <a
                      href={b.studyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-emerald-600 hover:underline"
                    >
                      Ver estudo →
                    </a>
                  )}
                </div>
                <EvidenceLabel evidence={b.evidence} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Risks */}
      {risks.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            Riscos e Efeitos Colaterais
          </h2>
          <div className="space-y-3">
            {risks.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-4"
              >
                <span className="mt-0.5 text-red-500">⚠</span>
                <div className="flex-1">
                  <p className="font-medium text-zinc-900">
                    {r.name}
                    <span className="ml-2 text-xs text-zinc-400">
                      ({r.frequency})
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">{r.description}</p>
                </div>
                <SeverityBadge severity={r.severity} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internet vs Science */}
      {claims.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            Internet vs. Ciência
          </h2>
          <p className="mb-4 text-sm text-zinc-500">
            O que dizem na internet comparado com a evidência científica real.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="pb-3 pr-4 font-medium text-zinc-500">
                    Alegação
                  </th>
                  <th className="pb-3 pr-4 font-medium text-zinc-500">
                    O que dizem
                  </th>
                  <th className="pb-3 pr-4 font-medium text-zinc-500">
                    Evidência real
                  </th>
                  <th className="pb-3 font-medium text-zinc-500">Veredicto</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((c, i) => (
                  <tr key={i} className="border-b border-zinc-100">
                    <td className="py-3 pr-4 font-medium text-zinc-900">
                      {c.claim}
                    </td>
                    <td className="py-3 pr-4 text-zinc-600">
                      {c.whatTheySay}
                    </td>
                    <td className="py-3 pr-4 text-zinc-600">
                      {c.actualEvidence}
                    </td>
                    <td className="py-3">
                      <VerdictBadge verdict={c.verdict} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Studies */}
      {peptide.studies.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            Estudos e Referências ({peptide.studies.length})
          </h2>
          <div className="space-y-3">
            {peptide.studies.map((s) => (
              <div
                key={s.id}
                className="rounded-lg border border-zinc-200 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-zinc-900 hover:text-emerald-600"
                    >
                      {s.title}
                    </a>
                    <p className="mt-1 text-xs text-zinc-400">
                      {s.authors} — {s.journal} ({s.year})
                      {s.sampleSize && ` — n=${s.sampleSize}`}
                    </p>
                  </div>
                  <StudyTypeBadge type={s.studyType} />
                </div>
                <p className="mt-2 text-sm text-zinc-600">{s.keyFindings}</p>
                {s.pubmedId && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${s.pubmedId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-emerald-600 hover:underline"
                  >
                    PubMed →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {peptide.faqs.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {peptide.faqs.map((faq) => (
              <div key={faq.id}>
                <h3 className="font-medium text-zinc-900">{faq.question}</h3>
                <p className="mt-1 text-sm text-zinc-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 mb-8">
        <p className="text-sm text-amber-800">
          <strong>Aviso importante:</strong> Este conteúdo tem caráter
          exclusivamente informativo e educacional, baseado em pesquisas
          científicas publicadas. Não constitui recomendação médica, prescrição
          ou incentivo ao uso de qualquer substância. Consulte sempre um médico
          qualificado antes de iniciar qualquer tratamento.
        </p>
      </div>

      {/* Newsletter */}
      <section className="rounded-2xl bg-emerald-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-zinc-900">
          Receba atualizações sobre {peptide.name}
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Novas pesquisas, mudanças na regulamentação e mais.
        </p>
        <NewsletterForm source={`peptide_${peptide.slug}`} />
      </section>
    </article>
  );
}

// -- Helper Components --

function EvidenceIcon({ evidence }: { evidence: string }) {
  switch (evidence) {
    case "proven":
      return <span className="mt-0.5 text-emerald-500 text-lg">✓</span>;
    case "research":
      return <span className="mt-0.5 text-yellow-500 text-lg">◐</span>;
    default:
      return <span className="mt-0.5 text-zinc-400 text-lg">○</span>;
  }
}

function EvidenceLabel({ evidence }: { evidence: string }) {
  const config: Record<string, { label: string; color: string }> = {
    proven: { label: "Comprovado", color: "bg-emerald-100 text-emerald-700" },
    research: { label: "Em pesquisa", color: "bg-yellow-100 text-yellow-700" },
    unproven: {
      label: "Não comprovado",
      color: "bg-zinc-100 text-zinc-500",
    },
  };
  const c = config[evidence] ?? config.unproven;
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${c.color}`}
    >
      {c.label}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const config: Record<string, { label: string; color: string }> = {
    low: { label: "Baixo", color: "bg-yellow-100 text-yellow-700" },
    medium: { label: "Médio", color: "bg-orange-100 text-orange-700" },
    high: { label: "Alto", color: "bg-red-100 text-red-700" },
  };
  const c = config[severity] ?? config.low;
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${c.color}`}
    >
      {c.label}
    </span>
  );
}

function VerdictBadge({ verdict }: { verdict: string }) {
  const config: Record<string, { label: string; color: string }> = {
    true: { label: "Verdadeiro", color: "bg-emerald-100 text-emerald-700" },
    partial: { label: "Parcial", color: "bg-yellow-100 text-yellow-700" },
    false: { label: "Falso", color: "bg-red-100 text-red-700" },
    unknown: { label: "Incerto", color: "bg-zinc-100 text-zinc-500" },
  };
  const c = config[verdict] ?? config.unknown;
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${c.color}`}
    >
      {c.label}
    </span>
  );
}

function StudyTypeBadge({ type }: { type: string }) {
  const labels: Record<string, string> = {
    meta_analysis: "Meta-análise",
    systematic_review: "Revisão Sistemática",
    rct: "Ensaio Clínico",
    cohort: "Coorte",
    case_study: "Estudo de Caso",
    review: "Revisão",
    animal: "Estudo Animal",
    in_vitro: "In Vitro",
  };
  return (
    <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
      {labels[type] ?? type}
    </span>
  );
}

function RegulatoryStatusCard({
  label,
  status,
}: {
  label: string;
  status: RegulatoryStatus;
}) {
  const config: Record<RegulatoryStatus, { label: string; color: string }> = {
    approved: { label: "Aprovado", color: "text-emerald-600" },
    pending: { label: "Pendente", color: "text-yellow-600" },
    not_regulated: { label: "Não regulado", color: "text-zinc-400" },
    banned: { label: "Proibido", color: "text-red-600" },
    compounding_only: { label: "Manipulação", color: "text-blue-600" },
  };
  const c = config[status];
  return (
    <div className="rounded-lg bg-zinc-50 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className={`mt-1 text-sm font-medium ${c.color}`}>{c.label}</p>
    </div>
  );
}

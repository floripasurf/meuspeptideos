import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ResearchPhaseBar } from "@/components/research-phase-badge";
import { CategoryBadge } from "@/components/category-badge";
import { NewsletterForm } from "@/components/newsletter-form";
import { RegulatoryStatus } from "@/generated/prisma/enums";
import { protocols, type Protocol } from "@/lib/protocols";

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
  const peptideProtocols = protocols[peptide.slug] ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${peptide.name} — Benefícios, Riscos e Pesquisa`,
    description: peptide.description,
    url: `https://meuspeptideos.com.br/peptideo/${peptide.slug}`,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: "Meus Peptídeos",
      url: "https://meuspeptideos.com.br",
    },
    about: {
      "@type": "MedicalEntity",
      name: peptide.name,
      alternateName: peptide.aliases,
      description: peptide.description,
    },
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    },
    lastReviewed: peptide.updatedAt.toISOString(),
    citation: peptide.studies.map((s) => ({
      "@type": "ScholarlyArticle",
      name: s.title,
      author: s.authors,
      datePublished: s.year.toString(),
      isPartOf: { "@type": "Periodical", name: s.journal },
      url: s.url,
    })),
  };

  const faqJsonLd =
    peptide.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: peptide.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <article className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* Page header with gradient strip */}
      <div className="border-b border-navy-100 bg-gradient-to-b from-navy-50 to-surface">
        <header className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <CategoryBadge category={peptide.category} />
            {peptide.aliases.length > 0 && (
              <span className="text-sm text-navy-400">
                {peptide.aliases.join(", ")}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
            {peptide.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-navy-600 sm:text-lg">
            {peptide.description}
          </p>
          <p className="mt-2 text-xs text-navy-400">
            Última atualização:{" "}
            {peptide.updatedAt.toLocaleDateString("pt-BR")}
          </p>
        </header>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        {/* Research Phase */}
        <section className="mb-10">
          <SectionCard>
            <SectionTitle icon="beaker">Status da Pesquisa</SectionTitle>
            <div className="mt-5">
              <ResearchPhaseBar phase={peptide.researchPhase} />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <RegulatoryStatusCard
                label="ANVISA (Brasil)"
                status={peptide.anvisaStatus}
              />
              <RegulatoryStatusCard
                label="FDA (EUA)"
                status={peptide.fdaStatus}
              />
              <RegulatoryStatusCard
                label="EMA (Europa)"
                status={peptide.emaStatus}
              />
            </div>
          </SectionCard>
        </section>

        {/* Mechanism */}
        <section className="mb-10">
          <SectionCard>
            <SectionTitle icon="dna">Mecanismo de Ação</SectionTitle>
            <p className="mt-3 text-navy-600 leading-relaxed">
              {peptide.mechanism}
            </p>
          </SectionCard>
        </section>

        {/* Protocols */}
        {peptideProtocols.length > 0 && (
          <section className="mb-10">
            <SectionTitle icon="protocol">Protocolo de Uso nos Estudos</SectionTitle>
            <p className="mt-1 mb-5 text-sm text-navy-500">
              Dosagens e esquemas utilizados em estudos clínicos publicados. Não constitui prescrição médica.
            </p>
            <div className="space-y-4">
              {peptideProtocols.map((protocol, pi) => (
                <div
                  key={pi}
                  className="rounded-2xl border border-brand-200/60 bg-white overflow-hidden"
                >
                  {/* Protocol header */}
                  <div className="bg-gradient-to-r from-brand-50 to-white px-5 py-4 border-b border-brand-100/60">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-navy-900">
                        {protocol.indication}
                      </h3>
                      <span className="rounded-md bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700">
                        {protocol.route}
                      </span>
                    </div>
                  </div>

                  {/* Dosage steps */}
                  <div className="px-5 py-4">
                    <div className="space-y-2">
                      {protocol.steps.map((step, si) => (
                        <div
                          key={si}
                          className="flex items-start gap-3 rounded-lg bg-navy-50/50 p-3"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                            {si + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span className="text-sm font-semibold text-navy-900">
                                {step.phase}
                              </span>
                              <span className="rounded bg-navy-100 px-1.5 py-0.5 text-xs font-medium text-navy-700">
                                {step.dosage}
                              </span>
                              <span className="text-xs text-navy-500">
                                {step.frequency} &middot; {step.duration}
                              </span>
                            </div>
                            {step.notes && (
                              <p className="mt-1 text-xs text-navy-500">
                                {step.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Protocol notes */}
                    {protocol.notes && (
                      <p className="mt-3 text-sm leading-relaxed text-navy-600">
                        {protocol.notes}
                      </p>
                    )}

                    {/* Study reference */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-navy-400">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                      </svg>
                      {protocol.studyUrl ? (
                        <a
                          href={protocol.studyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-600 hover:text-brand-500 transition-colors"
                        >
                          {protocol.studyReference}
                        </a>
                      ) : (
                        <span>{protocol.studyReference}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <section className="mb-10">
            <SectionTitle icon="check">Benefícios</SectionTitle>
            <div className="mt-4 space-y-3">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="group rounded-xl border border-navy-200/60 bg-white p-4 sm:p-5 transition-colors hover:border-navy-200"
                >
                  <div className="flex items-start gap-3">
                    <EvidenceIcon evidence={b.evidence} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-navy-900">{b.name}</p>
                        <EvidenceLabel evidence={b.evidence} />
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                        {b.description}
                      </p>
                      {b.studyUrl && (
                        <a
                          href={b.studyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-500 transition-colors"
                        >
                          Ver estudo
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Risks */}
        {risks.length > 0 && (
          <section className="mb-10">
            <SectionTitle icon="warning">
              Riscos e Efeitos Colaterais
            </SectionTitle>
            <div className="mt-4 space-y-3">
              {risks.map((r, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-red-100 bg-red-50/50 p-4 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-red-600"
                      >
                        <path d="M12 9v4M12 17h.01" />
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-navy-900">{r.name}</p>
                        <SeverityBadge severity={r.severity} />
                        <span className="text-xs text-navy-400">
                          ({r.frequency})
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                        {r.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internet vs Science */}
        {claims.length > 0 && (
          <section className="mb-10">
            <SectionTitle icon="scale">Internet vs. Ciência</SectionTitle>
            <p className="mt-1 mb-5 text-sm text-navy-500">
              O que dizem na internet comparado com a evidência científica real.
            </p>

            {/* Mobile: cards layout */}
            <div className="space-y-4 sm:hidden">
              {claims.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-navy-200/60 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p className="font-semibold text-navy-900">{c.claim}</p>
                    <VerdictBadge verdict={c.verdict} />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-navy-400">
                        O que dizem
                      </p>
                      <p className="mt-0.5 text-navy-600">{c.whatTheySay}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-navy-400">
                        Evidência real
                      </p>
                      <p className="mt-0.5 text-navy-600">
                        {c.actualEvidence}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table layout */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-navy-200/60 bg-white">
              <table className="claims-table w-full text-sm">
                <thead>
                  <tr className="bg-navy-50/80">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-500">
                      Alegação
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-500">
                      O que dizem
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-500">
                      Evidência real
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-500">
                      Veredicto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {claims.map((c, i) => (
                    <tr key={i} className="hover:bg-navy-50/40 transition-colors">
                      <td className="px-5 py-4 font-medium text-navy-900">
                        {c.claim}
                      </td>
                      <td className="px-5 py-4 text-navy-600">
                        {c.whatTheySay}
                      </td>
                      <td className="px-5 py-4 text-navy-600">
                        {c.actualEvidence}
                      </td>
                      <td className="px-5 py-4">
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
          <section className="mb-10">
            <SectionTitle icon="book">
              Estudos e Referências ({peptide.studies.length})
            </SectionTitle>
            <div className="mt-4 space-y-3">
              {peptide.studies.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-navy-200/60 bg-white p-4 sm:p-5 transition-colors hover:border-navy-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-navy-900 hover:text-brand-600 transition-colors"
                      >
                        {s.title}
                      </a>
                      <p className="mt-1 text-xs text-navy-400">
                        {s.authors} &mdash; {s.journal} ({s.year})
                        {s.sampleSize && ` &mdash; n=${s.sampleSize}`}
                      </p>
                    </div>
                    <StudyTypeBadge type={s.studyType} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {s.keyFindings}
                  </p>
                  {s.pubmedId && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${s.pubmedId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-600 transition-colors hover:bg-navy-100 hover:text-navy-900"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      PubMed
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {peptide.faqs.length > 0 && (
          <section className="mb-10">
            <SectionTitle icon="question">Perguntas Frequentes</SectionTitle>
            <div className="mt-4 space-y-1">
              {peptide.faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-xl border border-navy-200/60 bg-white p-4 sm:p-5"
                >
                  <h3 className="font-semibold text-navy-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <div className="mb-10 rounded-xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-amber-600"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-amber-900">Aviso importante</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-800">
                Este conteúdo tem caráter exclusivamente informativo e
                educacional, baseado em pesquisas científicas publicadas. Não
                constitui recomendação médica, prescrição ou incentivo ao uso de
                qualquer substância. Consulte sempre um médico qualificado antes
                de iniciar qualquer tratamento.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <section className="newsletter-gradient rounded-2xl p-8 sm:p-10">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
              Receba atualizações sobre {peptide.name}
            </h2>
            <p className="mt-2 text-sm text-navy-600">
              Novas pesquisas, mudanças na regulamentação e mais.
            </p>
            <NewsletterForm source={`peptide_${peptide.slug}`} />
          </div>
        </section>
      </div>
    </article>
  );
}

// -- Helper Components --

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-navy-200/60 bg-white p-5 sm:p-6">
      {children}
    </div>
  );
}

function SectionTitle({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: string;
}) {
  const icons: Record<string, React.ReactNode> = {
    beaker: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand-600"
      >
        <path d="M9 3h6M12 3v7l6.1 10.5a1 1 0 01-.87 1.5H6.77a1 1 0 01-.87-1.5L12 10V3" />
      </svg>
    ),
    dna: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand-600"
      >
        <path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6" />
      </svg>
    ),
    check: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-emerald-600"
      >
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
    warning: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-red-500"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>
    ),
    scale: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand-600"
      >
        <path d="M12 3v18M3 7l3 5h6l3-5M3 7c0 0 3-2 6 0s6 0 6 0" />
        <path d="M15 7l3 5h3l3-5M15 7c0 0 3-2 6 0" />
      </svg>
    ),
    book: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand-600"
      >
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    question: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand-600"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    ),
    protocol: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand-600"
      >
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h6" />
      </svg>
    ),
  };

  return (
    <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-navy-900">
      {icons[icon]}
      {children}
    </h2>
  );
}

function EvidenceIcon({ evidence }: { evidence: string }) {
  switch (evidence) {
    case "proven":
      return (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-emerald-600"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      );
    case "research":
      return (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-100">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-yellow-600"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-100">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-navy-400"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
          </svg>
        </div>
      );
  }
}

function EvidenceLabel({ evidence }: { evidence: string }) {
  const config: Record<string, { label: string; color: string }> = {
    proven: {
      label: "Comprovado",
      color: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    },
    research: {
      label: "Em pesquisa",
      color: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
    },
    unproven: {
      label: "Não comprovado",
      color: "bg-navy-50 text-navy-500 ring-1 ring-navy-200",
    },
  };
  const c = config[evidence] ?? config.unproven;
  return (
    <span
      className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${c.color}`}
    >
      {c.label}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const config: Record<string, { label: string; color: string }> = {
    low: {
      label: "Risco baixo",
      color: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
    },
    medium: {
      label: "Risco médio",
      color: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
    },
    high: {
      label: "Risco alto",
      color: "bg-red-50 text-red-700 ring-1 ring-red-200",
    },
  };
  const c = config[severity] ?? config.low;
  return (
    <span
      className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${c.color}`}
    >
      {c.label}
    </span>
  );
}

function VerdictBadge({ verdict }: { verdict: string }) {
  const config: Record<
    string,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    true: {
      label: "Verdadeiro",
      color: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ),
    },
    partial: {
      label: "Parcial",
      color: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M5 12h14" />
        </svg>
      ),
    },
    false: {
      label: "Falso",
      color: "bg-red-50 text-red-700 ring-1 ring-red-200",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      ),
    },
    unknown: {
      label: "Incerto",
      color: "bg-navy-50 text-navy-500 ring-1 ring-navy-200",
      icon: (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
        </svg>
      ),
    },
  };
  const c = config[verdict] ?? config.unknown;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${c.color}`}
    >
      {c.icon}
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

  const hierarchy: Record<string, string> = {
    meta_analysis: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    systematic_review: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    rct: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    cohort: "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
    case_study: "bg-navy-50 text-navy-600 ring-1 ring-navy-200",
    review: "bg-navy-50 text-navy-600 ring-1 ring-navy-200",
    animal: "bg-orange-50 text-orange-600 ring-1 ring-orange-200",
    in_vitro: "bg-purple-50 text-purple-600 ring-1 ring-purple-200",
  };

  return (
    <span
      className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
        hierarchy[type] ?? "bg-navy-50 text-navy-600 ring-1 ring-navy-200"
      }`}
    >
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
  const config: Record<
    RegulatoryStatus,
    { label: string; color: string; bgColor: string }
  > = {
    approved: {
      label: "Aprovado",
      color: "text-emerald-700",
      bgColor: "bg-emerald-50 ring-1 ring-emerald-200/60",
    },
    pending: {
      label: "Pendente",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50 ring-1 ring-yellow-200/60",
    },
    not_regulated: {
      label: "Não regulado",
      color: "text-navy-500",
      bgColor: "bg-navy-50 ring-1 ring-navy-200/60",
    },
    banned: {
      label: "Proibido",
      color: "text-red-700",
      bgColor: "bg-red-50 ring-1 ring-red-200/60",
    },
    compounding_only: {
      label: "Manipulação",
      color: "text-blue-700",
      bgColor: "bg-blue-50 ring-1 ring-blue-200/60",
    },
  };
  const c = config[status];
  return (
    <div className={`rounded-xl p-3.5 ${c.bgColor}`}>
      <p className="text-xs font-medium text-navy-500">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${c.color}`}>{c.label}</p>
    </div>
  );
}

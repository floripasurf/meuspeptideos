import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Regulamentação de peptídeos no Brasil",
    description: "Panorama baseado em fontes oficiais sobre registro, prescrição e manipulação de peptídeos no Brasil.",
    alternates: langAlternates(lang, "/regulamentacao"),
    robots: { index: lang === "pt", follow: true },
  };
}

const sources = {
  mounjaroRegistration: "https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/novos-medicamentos-e-indicacoes/mounjaro-r-tirzepatida-novo-registro",
  mounjaroWeight: "https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/novos-medicamentos-e-indicacoes/mounjaro-r-tirzepatida-nova-indicacao",
  glp1Prescription: "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2025/entra-em-vigor-norma-que-preve-retencao-de-receita-para-medicamentos-agonistas-glp-1",
  semaglutidePatent: "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2026/anvisa-divulga-atualizacao-sobre-pedidos-de-registro-de-semaglutida",
  semaglutideApproval: "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2026/anvisa-aprova-primeira-caneta-de-semaglutida-sintetica-analoga-ao-ozempic-para-diabetes/",
  compoundingEnforcement: "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2026/anvisa-anuncia-novas-medidas-de-combate-a-irregularidades-na-importacao-e-manipulacao-de-canetas-emagrecedoras",
  rdc67: "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2007/rdc0067_08_10_2007.html",
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding-under-section-503a-fdc-act",
  fdaSafety: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
};

export default async function RegulamentacaoPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="text-sm font-semibold uppercase text-emerald-700">Atualizado em julho de 2026</p>
        <h1 className="mt-3 text-3xl font-bold text-zinc-950 sm:text-4xl">Regulamentação de peptídeos</h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600">
          Um resumo conservador do cenário brasileiro, com links para as fontes primárias. Registro, prescrição e possibilidade de manipulação são questões diferentes.
        </p>
      </header>

      <div className="prose prose-zinc prose-lg max-w-none prose-a:text-emerald-700">
        <h2>O ponto de partida</h2>
        <p>
          Um princípio ativo conhecido ou estudado não é automaticamente um medicamento autorizado. No Brasil, a situação deve ser verificada por produto, indicação, fabricante e forma de dispensação na Anvisa. A ausência de proibição expressa também não equivale a autorização para fabricar, anunciar, vender ou usar.
        </p>

        <h2>Agonistas de GLP-1 no Brasil</h2>
        <p>
          A tirzepatida (Mounjaro) recebeu <a href={sources.mounjaroRegistration}>registro para diabetes tipo 2 em setembro de 2023</a>. A Anvisa aprovou depois uma <a href={sources.mounjaroWeight}>nova indicação para controle crônico do peso</a> em adultos que atendam aos critérios da bula. Portanto, é incorreto descrevê-la como produto ainda sem registro no país.
        </p>
        <p>
          Desde 23 de junho de 2025, farmácias e drogarias devem <a href={sources.glp1Prescription}>reter a receita de medicamentos agonistas de GLP-1</a>. A prescrição é emitida em duas vias e tem validade de até 90 dias, conforme as regras informadas pela Agência.
        </p>

        <h2>Patente não substitui registro</h2>
        <p>
          A patente da semaglutida no Brasil expirou em 20 de março de 2026. A própria Anvisa esclareceu que a expiração <a href={sources.semaglutidePatent}>não dispensa a comprovação de eficácia, segurança e qualidade</a> nem o registro de cada medicamento. Em maio de 2026, a Agência anunciou o <a href={sources.semaglutideApproval}>primeiro registro de uma caneta de semaglutida sintética análoga</a> ao produto biológico.
        </p>

        <h2>Manipulação exige análise específica</h2>
        <p>
          A manipulação magistral é regulada pela <a href={sources.rdc67}>RDC 67/2007</a> e por normas complementares. Não existe uma regra geral segundo a qual todo peptídeo sem registro pode ser manipulado mediante receita. Origem do insumo, qualidade, indicação, forma farmacêutica, prescrição e restrições específicas precisam ser avaliadas.
        </p>
        <p>
          Em 2026, a Anvisa anunciou <a href={sources.compoundingEnforcement}>novas medidas contra irregularidades na importação e manipulação de agonistas de GLP-1</a>. Por isso, esta plataforma não encaminha pedidos de orçamento nem apresenta substâncias experimentais como disponíveis em farmácias.
        </p>

        <h2>Como interpretar as categorias do FDA</h2>
        <p>
          Nos Estados Unidos, a inclusão de uma substância na chamada Category 1 do processo da seção 503A não significa aprovação do FDA. A categoria se relaciona à política temporária de fiscalização enquanto a substância é avaliada para uma lista de insumos de manipulação, sujeita a condições. O <a href={sources.fdaCompounding}>FDA explica o processo e seus limites</a> e mantém uma página separada sobre <a href={sources.fdaSafety}>substâncias que podem apresentar riscos significativos</a>.
        </p>
        <p>
          Uma decisão regulatória norte-americana não autoriza automaticamente manipulação, propaganda, importação ou uso no Brasil.
        </p>

        <h2>Como usar as fichas deste site</h2>
        <ul>
          <li>Trate o status exibido como uma referência editorial, não como autorização de compra ou prescrição.</li>
          <li>Confirme o produto e a indicação nas consultas oficiais da Anvisa antes de qualquer decisão.</li>
          <li>Diferencie evidência pré-clínica, ensaio clínico e aprovação regulatória.</li>
          <li>Não use relatos em redes sociais como prova de segurança, eficácia ou legalidade.</li>
        </ul>

        <h2>Monitoramento</h2>
        <p>
          O <Link href={`/${lang}/radar`}>Radar Meus Peptídeos</Link> está em validação para acompanhar mudanças científicas e regulatórias com links para fontes verificáveis.
        </p>
      </div>

      <div className="mt-10 border-l-4 border-amber-500 bg-amber-50 p-5">
        <p className="text-sm text-amber-900">
          <strong>Aviso:</strong> conteúdo informativo, sem aconselhamento médico ou jurídico. Consulte a Anvisa, a bula aprovada e profissionais habilitados para o caso concreto.
        </p>
      </div>
    </article>
  );
}

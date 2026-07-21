import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: "Metodologia — Como Classificamos Evidências",
    description:
      "Nossa metodologia para classificar evidências científicas sobre peptídeos: como diferenciamos comprovado, em pesquisa e não comprovado.",
    alternates: langAlternates(lang, "/metodologia"),
  };
}

type Props = { params: Promise<{ lang: string }> };

export default async function MetodologiaPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Metodologia Editorial
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          Como organizamos, avaliamos e classificamos a evidência científica
          sobre peptídeos.
        </p>
      </header>

      <div className="prose prose-zinc prose-lg max-w-none">
        <h2>Hierarquia de evidência</h2>
        <p>
          Nem todo estudo tem o mesmo peso científico. Adotamos a hierarquia
          padrão da medicina baseada em evidências:
        </p>
        <ol>
          <li>
            <strong>Meta-análises e revisões sistemáticas</strong> — combinam
            resultados de múltiplos estudos. Maior nível de evidência.
          </li>
          <li>
            <strong>Ensaios clínicos randomizados (RCT)</strong> — padrão-ouro
            para testar eficácia em humanos.
          </li>
          <li>
            <strong>Estudos de coorte</strong> — observacionais, mas com longo
            acompanhamento.
          </li>
          <li>
            <strong>Estudos caso-controle</strong> — observacionais, retrospectivos.
          </li>
          <li>
            <strong>Estudos animais</strong> — sugestivos mas não conclusivos
            para humanos.
          </li>
          <li>
            <strong>Estudos in vitro</strong> — exploratórios, não devem ser
            extrapolados para humanos.
          </li>
        </ol>

        <h2>Classificação de benefícios</h2>
        <p>
          Cada benefício é classificado em três níveis claros:
        </p>

        <h3>✓ Comprovado</h3>
        <p>
          Existem múltiplos ensaios clínicos randomizados em humanos, ou
          meta-análises, demonstrando o benefício de forma consistente. Geralmente
          o composto tem aprovação regulatória para essa indicação.
        </p>
        <p>
          <em>Exemplo:</em> Semaglutida para perda de peso (estudos STEP, milhares
          de participantes, aprovação FDA/ANVISA).
        </p>

        <h3>◐ Em pesquisa</h3>
        <p>
          Existem evidências preliminares (estudos clínicos pequenos, fase 1/2,
          ou estudos animais robustos) que sugerem o benefício, mas não há
          confirmação definitiva em humanos.
        </p>
        <p>
          <em>Exemplo:</em> SS-31 para função mitocondrial em insuficiência
          cardíaca (estudos de fase 2/3 em andamento).
        </p>

        <h3>○ Não comprovado</h3>
        <p>
          Alegação popular sem suporte científico adequado, ou apenas com
          evidência muito fraca (anedótica, in vitro, ou contradita por estudos
          melhores).
        </p>
        <p>
          <em>Exemplo:</em> BPC-157 para &quot;curar qualquer lesão&quot; (zero
          estudos clínicos em humanos publicados).
        </p>

        <h2>Status da pesquisa</h2>
        <p>
          Indicamos em que fase de desenvolvimento clínico cada composto se
          encontra:
        </p>
        <ul>
          <li>
            <strong>Pré-clínico:</strong> Apenas estudos in vitro ou animais.
          </li>
          <li>
            <strong>Fase 1:</strong> Primeiro teste em humanos, foco em segurança
            e dosagem (poucas dezenas de participantes).
          </li>
          <li>
            <strong>Fase 2:</strong> Eficácia inicial em humanos (centenas de
            participantes).
          </li>
          <li>
            <strong>Fase 3:</strong> Eficácia confirmada em larga escala (milhares
            de participantes).
          </li>
          <li>
            <strong>Aprovado:</strong> Recebeu aprovação de pelo menos uma
            agência reguladora (FDA, EMA, ANVISA, etc.).
          </li>
        </ul>

        <h2>Internet vs. Ciência</h2>
        <p>
          Para cada peptídeo popular, identificamos as alegações mais comuns
          encontradas em redes sociais, fóruns e sites de biohacking. Cada
          alegação é confrontada com a evidência científica disponível e recebe
          um veredicto:
        </p>
        <ul>
          <li>
            <strong>Verdadeiro:</strong> A alegação é apoiada por evidência
            científica sólida.
          </li>
          <li>
            <strong>Parcial:</strong> Há um núcleo de verdade, mas a alegação é
            exagerada ou descontextualizada.
          </li>
          <li>
            <strong>Falso:</strong> A alegação é contraditada pela evidência ou
            é fisiologicamente implausível.
          </li>
          <li>
            <strong>Incerto:</strong> Não há evidência suficiente para confirmar
            ou refutar.
          </li>
        </ul>

        <h2>Fontes</h2>
        <p>
          Priorizamos as seguintes fontes, em ordem de confiabilidade:
        </p>
        <ol>
          <li>
            <strong>PubMed</strong> — base do NIH com artigos científicos
            revisados por pares.
          </li>
          <li>
            <strong>Cochrane Library</strong> — meta-análises e revisões
            sistemáticas.
          </li>
          <li>
            <strong>FDA, ANVISA, EMA</strong> — comunicações oficiais de
            agências reguladoras.
          </li>
          <li>
            <strong>ClinicalTrials.gov</strong> — registro internacional de
            ensaios clínicos.
          </li>
          <li>
            <strong>Periódicos de alto impacto</strong> — Nature, Science, NEJM,
            Lancet, Cell.
          </li>
        </ol>
        <p>
          <strong>Não usamos</strong> como fontes primárias: blogs de
          influenciadores, sites comerciais que vendem peptídeos, fóruns ou
          posts em redes sociais.
        </p>

        <h2>Atualização contínua</h2>
        <p>
          A ciência avança. Cada peptídeo do nosso catálogo tem uma data da
          última atualização. Quando novos estudos significativos são publicados,
          atualizamos a entrada correspondente. Quando uma nova alegação viraliza
          na internet, adicionamos à nossa seção de fact-check.
        </p>

        <h2>Compromisso com a transparência</h2>
        <p>
          Não vendemos peptídeos, nem somos pagos por fabricantes para promover
          produtos específicos. Nossa monetização futura virá de parcerias com
          clínicas médicas legítimas (lead generation para profissionais que
          prescrevem peptídeos sob supervisão médica adequada).
        </p>
      </div>
    </article>
  );
}

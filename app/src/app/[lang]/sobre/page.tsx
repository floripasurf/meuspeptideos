import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: "Sobre — Meus Peptídeos",
    description:
      "Quem somos, nossa missão e nosso compromisso com informação científica rigorosa sobre peptídeos no Brasil.",
    alternates: langAlternates(lang, "/sobre"),
  };
}

type Props = { params: Promise<{ lang: string }> };

export default async function SobrePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Sobre o Meus Peptídeos
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          A maior base de conhecimento sobre peptídeos em português, com rigor
          científico e transparência sobre evidências.
        </p>
      </header>

      <div className="prose prose-zinc prose-lg max-w-none">
        <h2>Por que existimos</h2>
        <p>
          Peptídeos estão em ascensão. Semaglutida (Ozempic) e tirzepatida
          (Mounjaro) transformaram o tratamento da obesidade. BPC-157, GHK-Cu,
          MOTS-c e dezenas de outros compostos ganham atenção a cada dia. Mas
          junto com o entusiasmo legítimo, vem a desinformação.
        </p>
        <p>
          A internet está cheia de alegações sem fundamento — peptídeos que
          &quot;curam tudo&quot;, suplementos que &quot;revertem o
          envelhecimento&quot;, soluções &quot;milagrosas&quot;. Ao mesmo tempo,
          existe pesquisa científica séria sendo conduzida em laboratórios e
          hospitais ao redor do mundo, mas em inglês e em linguagem técnica
          inacessível para a maioria.
        </p>
        <p>
          <strong>Meus Peptídeos existe para preencher essa lacuna.</strong>{" "}
          Somos uma base de conhecimento em português que organiza informação
          científica sobre peptídeos de forma acessível, sem perder o rigor.
        </p>

        <h2>Nossos princípios</h2>
        <ol>
          <li>
            <strong>Evidência acima de hype.</strong> Cada benefício é
            classificado em três níveis: comprovado, em pesquisa, ou não
            comprovado. Cada classificação é justificada com referências.
          </li>
          <li>
            <strong>Transparência sobre fontes.</strong> Toda alegação é
            referenciada a estudos do PubMed, com link direto. Você pode
            verificar tudo.
          </li>
          <li>
            <strong>Compliance médico.</strong> Não vendemos peptídeos. Não
            recomendamos tratamentos. Nosso conteúdo é exclusivamente
            informativo. Decisões médicas são entre você e seu médico.
          </li>
          <li>
            <strong>Internet vs. Ciência.</strong> Confrontamos as alegações
            mais comuns da internet com a evidência científica real, com
            veredictos claros: verdadeiro, parcial, falso ou incerto.
          </li>
          <li>
            <strong>Atualização constante.</strong> A ciência avança. Nossa base
            é atualizada conforme novos estudos são publicados.
          </li>
        </ol>

        <h2>O que cobrimos</h2>
        <p>
          Atualmente catalogamos peptídeos terapêuticos (semaglutida,
          tirzepatida, BPC-157, etc.) e compostos relacionados de longevidade
          (NMN, NAC, rapamicina, resveratrol). Para cada um, oferecemos:
        </p>
        <ul>
          <li>Mecanismo de ação detalhado</li>
          <li>Status da pesquisa (pré-clínico → aprovado)</li>
          <li>Status regulatório (ANVISA, FDA, EMA)</li>
          <li>Benefícios com evidência classificada</li>
          <li>Riscos e efeitos colaterais documentados</li>
          <li>Fact-check de alegações populares</li>
          <li>Estudos científicos com links para PubMed</li>
          <li>FAQs práticas</li>
        </ul>

        <h2>Aviso médico</h2>
        <p>
          Todo conteúdo deste site tem caráter exclusivamente{" "}
          <strong>informativo e educacional</strong>. Não constitui prescrição
          médica, diagnóstico ou recomendação de tratamento. Antes de iniciar
          qualquer suplemento, medicamento ou intervenção, consulte sempre um
          médico qualificado.
        </p>

        <h2>Contato</h2>
        <p>
          Tem uma sugestão de peptídeo para incluir? Encontrou um erro? Quer
          colaborar como revisor médico?{" "}
          <Link href={`/${lang}`}>Entre em contato pelo formulário na home</Link>.
        </p>
      </div>
    </article>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Regulamentação de Peptídeos no Brasil — ANVISA, FDA e EMA",
  description:
    "Status regulatório dos peptídeos no Brasil e no mundo. Como ANVISA, FDA e EMA classificam semaglutida, tirzepatida, BPC-157 e outros compostos. Atualizado em 2026.",
};

export default function RegulamentacaoPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Regulamentação de Peptídeos
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          O cenário regulatório dos peptídeos no Brasil e no mundo, atualizado
          para 2026.
        </p>
      </header>

      <div className="prose prose-zinc prose-lg max-w-none">
        <h2>Por que regulamentação importa</h2>
        <p>
          O mercado de peptídeos vive um momento único: a demanda explodiu, mas
          a regulamentação ainda corre atrás. Muitos compostos que você
          provavelmente já viu mencionados em redes sociais existem em uma zona
          cinza — não são aprovados como medicamentos, mas também não são
          formalmente proibidos. Essa indefinição cria riscos reais para
          consumidores e oportunidades para mercados paralelos.
        </p>
        <p>
          A boa notícia: o cenário está mudando rapidamente. Em fevereiro de
          2026, o FDA reclassificou 14 peptídeos. A ANVISA está formalizando
          regras para GLP-1s. A patente da semaglutida expira em 2026 no Brasil,
          abrindo caminho para genéricos. Esta página resume o que está
          acontecendo.
        </p>

        <h2>Status no Brasil — ANVISA</h2>

        <h3>GLP-1s (semaglutida, tirzepatida)</h3>
        <p>
          A ANVISA aprovou a <strong>semaglutida</strong> (Ozempic, Wegovy) para
          diabetes tipo 2 e obesidade. Desde abril de 2025, a dispensação exige{" "}
          <strong>retenção de receita médica</strong> — assim como liraglutida,
          dulaglutida, exenatida, tirzepatida e lixisenatida. A medida visa
          combater o uso indiscriminado e o mercado paralelo.
        </p>
        <p>
          A <strong>tirzepatida</strong> (Mounjaro, Zepbound) ainda está em
          processo de registro na ANVISA. Não é vendida oficialmente em
          farmácias brasileiras, mas pode ser importada com receita médica em
          casos específicos.
        </p>

        <h3>Patente da semaglutida</h3>
        <p>
          A patente da semaglutida <strong>expira em 2026 no Brasil</strong>. A
          ANVISA tem 9 pedidos pendentes de versões genéricas ou biossimilares
          de semaglutida e 7 de liraglutida. No entanto, processa apenas 3
          solicitações por semestre, então a chegada dos genéricos será gradual.
          Quando chegarem, o preço deve cair significativamente — atualmente o
          Ozempic custa entre R$ 800 e R$ 1.200/mês.
        </p>

        <h3>Regras de importação</h3>
        <p>
          Em agosto de 2025, a ANVISA estabeleceu regras estritas para
          importação de princípios ativos de GLP-1s. APIs de origem
          biotecnológica só podem ser importados se o fabricante tiver sido
          avaliado pela ANVISA durante registro de produto. O objetivo é
          garantir qualidade e rastreabilidade.
        </p>

        <h3>Outros peptídeos</h3>
        <p>
          Para peptídeos como BPC-157, TB-500, Ipamorelin, CJC-1295, GHK-Cu e a
          maioria dos compostos populares na comunidade de biohacking, o cenário
          é menos claro:
        </p>
        <ul>
          <li>Não são aprovados pela ANVISA como medicamentos</li>
          <li>Não são proibidos explicitamente</li>
          <li>
            Podem ser obtidos via farmácias de manipulação licenciadas com
            prescrição médica
          </li>
          <li>
            Operam em zona cinza regulatória quando vendidos online sem
            prescrição
          </li>
        </ul>

        <h2>Status nos EUA — FDA</h2>

        <h3>A reclassificação de fevereiro de 2026</h3>
        <p>
          Em 27 de fevereiro de 2026, o secretário de saúde dos EUA anunciou a
          reclassificação de aproximadamente 14 peptídeos de Category 2 para{" "}
          <strong>Category 1</strong>. Na prática, isso significa que farmácias
          de manipulação licenciadas podem novamente preparar esses peptídeos
          sob prescrição médica.
        </p>

        <p>Os peptídeos reclassificados incluem:</p>
        <ul>
          <li>BPC-157</li>
          <li>GHK-Cu</li>
          <li>TB-500 (Thymosin Beta-4)</li>
          <li>Thymosin Alpha-1</li>
          <li>CJC-1295</li>
          <li>Ipamorelin</li>
          <li>AOD-9604</li>
          <li>Selank</li>
          <li>Semax</li>
          <li>KPV</li>
          <li>MOTS-c</li>
          <li>e outros</li>
        </ul>

        <p>
          <strong>Importante:</strong> Category 1 NÃO significa aprovação FDA.
          Não houve estudos clínicos de fase 3 para a maioria dessas moléculas.
          O que mudou é que farmácias podem manipulá-los legalmente, desde que
          haja prescrição médica e justificativa clínica.
        </p>

        <h3>Peptídeos aprovados pelo FDA</h3>
        <ul>
          <li>
            <strong>Semaglutida</strong> (Ozempic, Wegovy, Rybelsus) — diabetes
            tipo 2 e obesidade
          </li>
          <li>
            <strong>Tirzepatida</strong> (Mounjaro, Zepbound) — diabetes tipo 2
            e obesidade
          </li>
          <li>
            <strong>Liraglutida</strong> (Victoza, Saxenda) — diabetes tipo 2 e
            obesidade
          </li>
          <li>
            <strong>Tesamorelin</strong> (Egrifta) — lipodistrofia em HIV
          </li>
          <li>
            <strong>PT-141 / Bremelanotide</strong> (Vyleesi) — Transtorno do
            Desejo Sexual Hipoativo em mulheres
          </li>
        </ul>

        <h2>Status na Europa — EMA</h2>
        <p>
          A Agência Europeia de Medicamentos (EMA) aprovou os mesmos GLP-1s
          aprovados pelo FDA. A regulamentação para outros peptídeos é
          tipicamente mais conservadora que nos EUA e Brasil. Alguns peptídeos
          populares no biohacking americano são proibidos para venda na Europa
          (como Melanotan II).
        </p>

        <h2>Hierarquia de status regulatório</h2>
        <p>
          Em nossa base, classificamos cada peptídeo em uma das seguintes
          categorias para ANVISA, FDA e EMA:
        </p>

        <ul>
          <li>
            <strong>Aprovado:</strong> Possui registro oficial para uso clínico
            em pelo menos uma indicação.
          </li>
          <li>
            <strong>Pendente:</strong> Em processo de registro ou aguardando
            aprovação.
          </li>
          <li>
            <strong>Não regulamentado:</strong> Não há regulamentação específica
            — opera em zona cinza.
          </li>
          <li>
            <strong>Manipulação apenas:</strong> Pode ser preparado por
            farmácias de manipulação sob prescrição médica, mas não é vendido
            como medicamento industrializado.
          </li>
          <li>
            <strong>Proibido:</strong> Venda formalmente proibida pela agência
            reguladora.
          </li>
        </ul>

        <h2>O que isso significa para você</h2>

        <h3>Se você é paciente</h3>
        <p>
          Antes de considerar qualquer peptídeo, consulte um médico —
          preferencialmente um especialista familiarizado com o composto.
          Verifique o status regulatório no Brasil (na nossa base de dados, cada
          peptídeo tem o status atualizado). Evite comprar online de fontes não
          regulamentadas: produtos do mercado cinza frequentemente não passam
          por controle de qualidade, podem estar contaminados ou ter dosagem
          incorreta.
        </p>

        <h3>Se você é médico</h3>
        <p>
          A reclassificação do FDA abre espaço para uso mais amplo de peptídeos
          via farmácias de manipulação. No Brasil, o cenário é menos claro,
          mas farmácias magistrais licenciadas podem preparar muitos desses
          compostos sob prescrição. Mantenha-se atualizado com a literatura
          científica e a ANVISA. Nossa{" "}
          <Link href="/para-medicos">página para médicos</Link> tem informações
          adicionais.
        </p>

        <h2>Atualização constante</h2>
        <p>
          O cenário regulatório muda rapidamente. Esta página é atualizada
          quando há mudanças significativas. Para acompanhar as atualizações,
          cadastre-se em nossa newsletter na home.
        </p>

        <p className="mt-8 text-sm text-zinc-500">
          Última atualização: abril de 2026.
        </p>
      </div>

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">
          <strong>Aviso:</strong> Esta página tem caráter exclusivamente
          informativo. Não constitui aconselhamento médico ou jurídico.
          Decisões sobre uso de qualquer composto devem ser tomadas em conjunto
          com profissionais qualificados.
        </p>
      </div>
    </article>
  );
}

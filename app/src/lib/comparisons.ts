// Comparisons (high-intent SEO pages)
// Each comparison has its own /comparar/[slug] page

export type Comparison = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  peptideA: string; // slug
  peptideB: string; // slug
  intro: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
  verdict: string;
  faq: Array<{ q: string; a: string }>;
};

export const comparisons: Comparison[] = [
  {
    slug: "semaglutida-vs-tirzepatida",
    title: "Semaglutida vs Tirzepatida",
    metaTitle:
      "Semaglutida vs Tirzepatida: Qual é Melhor para Emagrecer?",
    description:
      "Comparação completa entre semaglutida (Ozempic, Wegovy) e tirzepatida (Mounjaro, Zepbound). Eficácia, efeitos colaterais, preço e disponibilidade no Brasil.",
    peptideA: "semaglutida",
    peptideB: "tirzepatida",
    intro:
      "Semaglutida e tirzepatida são os dois medicamentos mais transformadores da medicina metabólica nos últimos 10 anos. Ambos são peptídeos administrados por injeção subcutânea semanal, ambos foram inicialmente aprovados para diabetes tipo 2, e ambos demonstraram eficácia notável em emagrecimento. Mas eles têm diferenças importantes em mecanismo, eficácia e perfil regulatório.",
    sections: [
      {
        heading: "Mecanismo de ação",
        content:
          "<p><strong>Semaglutida</strong> é um agonista seletivo do receptor GLP-1. Ela imita o hormônio GLP-1 natural, estimulando liberação de insulina, suprimindo glucagon, retardando esvaziamento gástrico e atuando em centros de saciedade no cérebro.</p><p><strong>Tirzepatida</strong> é um agonista DUPLO — atua tanto no receptor GLP-1 quanto no receptor GIP (polipeptídeo insulinotrópico dependente de glicose). Esta ação dupla potencializa os efeitos metabólicos e parece resultar em maior perda de peso.</p>",
      },
      {
        heading: "Eficácia em perda de peso",
        content:
          "<p><strong>Semaglutida (estudos STEP):</strong> perda média de 14.9% do peso corporal em 68 semanas com a dose 2.4mg (Wegovy).</p><p><strong>Tirzepatida (estudo SURMOUNT-1):</strong> perda média de 22.5% do peso corporal em 72 semanas com a dose 15mg — a maior perda de peso já registrada com um medicamento. Doses menores: 15% (5mg), 19.5% (10mg).</p><p><strong>Conclusão:</strong> Tirzepatida é mais eficaz para emagrecimento, com vantagem de aproximadamente 5-7 pontos percentuais.</p>",
      },
      {
        heading: "Eficácia em diabetes tipo 2",
        content:
          "<p>No estudo head-to-head SURPASS-2, tirzepatida foi superior à semaglutida na redução de HbA1c em pacientes com diabetes tipo 2. Reduções de 2.0-2.4% (tirzepatida) vs 1.9% (semaglutida).</p>",
      },
      {
        heading: "Efeitos colaterais",
        content:
          "<p>Os perfis são similares — predominantemente gastrointestinais. Náusea (40-44% semaglutida vs 25-33% tirzepatida), diarreia, constipação. Tirzepatida tende a ter perfil ligeiramente melhor de tolerabilidade. Ambos podem causar pancreatite (raro) e problemas vesiculares.</p>",
      },
      {
        heading: "Disponibilidade no Brasil",
        content:
          "<p><strong>Semaglutida:</strong> Aprovada pela ANVISA. Ozempic (até 1mg) para diabetes, Wegovy (2.4mg) para obesidade. Patente expira em 2026, abrindo caminho para genéricos.</p><p><strong>Tirzepatida:</strong> Em processo de registro na ANVISA. Ainda não está oficialmente disponível para venda no Brasil. Importação pessoal possível com receita médica em casos específicos.</p>",
      },
      {
        heading: "Preço",
        content:
          "<p><strong>Semaglutida:</strong> R$ 800-1.200/mês no Brasil (Ozempic).</p><p><strong>Tirzepatida:</strong> Quando disponível no Brasil, espera-se preço similar ou ligeiramente superior. Nos EUA, ambos custam aproximadamente US$ 1.000-1.300/mês sem desconto.</p>",
      },
    ],
    verdict:
      "Para perda de peso pura, tirzepatida tem vantagem clara em eficácia (~22% vs ~15%). Para diabetes, ambas são excelentes, com tirzepatida ligeiramente superior. A escolha prática no Brasil hoje, no entanto, é dominada pela disponibilidade — semaglutida está aprovada e disponível, tirzepatida ainda não. A decisão final é médica.",
    faq: [
      {
        q: "Tirzepatida está disponível no Brasil?",
        a: "Ainda não. O Mounjaro (tirzepatida) está em processo de registro na ANVISA. Pode ser importado com receita médica em casos específicos, mas não é vendido oficialmente em farmácias brasileiras.",
      },
      {
        q: "Qual emagrece mais?",
        a: "Em estudos clínicos, tirzepatida demonstrou perda de peso média de 22.5% (dose 15mg, 72 semanas), comparada a 14.9% para semaglutida (dose 2.4mg, 68 semanas). Tirzepatida é mais eficaz para emagrecimento.",
      },
      {
        q: "Posso trocar de semaglutida para tirzepatida?",
        a: "Sim, sob orientação médica. A transição é comum em locais onde tirzepatida está disponível. O médico ajustará a dose para minimizar efeitos colaterais.",
      },
    ],
  },
  {
    slug: "ozempic-vs-wegovy-vs-mounjaro",
    title: "Ozempic vs Wegovy vs Mounjaro",
    metaTitle:
      "Ozempic vs Wegovy vs Mounjaro: Diferenças, Preço e Como Escolher",
    description:
      "Comparação dos três medicamentos GLP-1 mais buscados. Diferenças, indicações, doses e disponibilidade no Brasil.",
    peptideA: "semaglutida",
    peptideB: "tirzepatida",
    intro:
      "Ozempic, Wegovy e Mounjaro estão entre os medicamentos mais procurados do mundo. Mas qual é a diferença entre eles? Spoiler: dois deles contêm exatamente o mesmo princípio ativo. Vamos esclarecer.",
    sections: [
      {
        heading: "O que são?",
        content:
          "<p><strong>Ozempic:</strong> Marca comercial da semaglutida (Novo Nordisk) aprovada para diabetes tipo 2. Doses: 0.25mg, 0.5mg, 1mg, 2mg (semanal).</p><p><strong>Wegovy:</strong> Marca comercial da semaglutida (Novo Nordisk) aprovada para obesidade. Doses: até 2.4mg semanal.</p><p><strong>Mounjaro:</strong> Marca comercial da tirzepatida (Eli Lilly) aprovada para diabetes tipo 2. Doses: 2.5mg, 5mg, 7.5mg, 10mg, 12.5mg, 15mg semanal. Para obesidade, a Lilly comercializa como Zepbound nos EUA.</p>",
      },
      {
        heading: "Diferença entre Ozempic e Wegovy",
        content:
          "<p>Ambos contêm semaglutida — a mesma molécula. A diferença é a dose máxima e a indicação aprovada:</p><ul><li><strong>Ozempic</strong> tem dose máxima de 2mg e é aprovado para controle de diabetes tipo 2.</li><li><strong>Wegovy</strong> tem dose máxima de 2.4mg e é aprovado especificamente para tratamento de obesidade ou sobrepeso com comorbidades.</li></ul><p>Pacientes obesos sem diabetes tecnicamente devem usar Wegovy. Mas como o Ozempic está mais disponível, é frequentemente usado off-label para emagrecimento.</p>",
      },
      {
        heading: "Mounjaro é diferente",
        content:
          "<p>Mounjaro contém tirzepatida, uma molécula DIFERENTE da semaglutida. Tirzepatida é um agonista duplo (GLP-1 + GIP), o que potencializa seus efeitos metabólicos. É geralmente mais eficaz para emagrecimento que semaglutida.</p>",
      },
      {
        heading: "Qual é melhor para mim?",
        content:
          "<p>A escolha depende de:</p><ul><li><strong>Você tem diabetes?</strong> Ozempic ou Mounjaro são as opções aprovadas. Ambos eficazes.</li><li><strong>Você quer perder peso e não tem diabetes?</strong> Wegovy é o aprovado especificamente para isso. Tirzepatida (Mounjaro/Zepbound) tem mais eficácia mas menos disponibilidade no Brasil.</li><li><strong>Você quer máxima perda de peso?</strong> Tirzepatida (até 22.5%) supera semaglutida (14.9%) em estudos.</li><li><strong>Disponibilidade no Brasil:</strong> Ozempic e Wegovy estão disponíveis. Mounjaro ainda não.</li></ul><p>A decisão final é médica.</p>",
      },
    ],
    verdict:
      "Ozempic e Wegovy são a mesma molécula (semaglutida) em doses diferentes para indicações diferentes. Mounjaro é uma molécula diferente (tirzepatida), mais potente e mais nova. Para emagrecimento, tirzepatida é mais eficaz, mas ainda não está oficialmente disponível no Brasil. Para diabetes, qualquer um funciona bem.",
    faq: [
      {
        q: "Ozempic é o mesmo que Wegovy?",
        a: "Sim, ambos contêm semaglutida (mesma molécula). A diferença é a dose máxima (Ozempic: 2mg, Wegovy: 2.4mg) e a indicação aprovada (Ozempic para diabetes, Wegovy para obesidade).",
      },
      {
        q: "Qual é o mais barato?",
        a: "Os preços no Brasil variam, mas os três custam entre R$ 800-1.500/mês. Semaglutida (Ozempic/Wegovy) tende a ser mais barata por estar mais estabelecida no mercado. Quando genéricos chegarem (após 2026), o preço deve cair.",
      },
    ],
  },
  {
    slug: "bpc-157-vs-tb-500",
    title: "BPC-157 vs TB-500",
    metaTitle:
      "BPC-157 vs TB-500: Comparação dos Peptídeos de Recuperação",
    description:
      "Diferenças entre BPC-157 e TB-500, os dois peptídeos mais populares para recuperação muscular e cicatrização. Evidência, riscos e status regulatório.",
    peptideA: "bpc-157",
    peptideB: "tb-500",
    intro:
      "BPC-157 e TB-500 são os dois peptídeos mais populares na comunidade atlética e de biohacking. Ambos são pesquisados por propriedades regenerativas, ambos são frequentemente combinados, e ambos têm o mesmo problema: zero ensaios clínicos completos em humanos.",
    sections: [
      {
        heading: "Origem",
        content:
          "<p><strong>BPC-157</strong> (Body Protection Compound) é um pentadecapeptídeo (15 aminoácidos) derivado de uma proteína protetora do suco gástrico humano. Pesquisado principalmente pelo grupo de Pedro Sikiric na Croácia.</p><p><strong>TB-500</strong> é uma versão sintética de um fragmento da timosina beta-4, uma proteína naturalmente presente em quase todas as células humanas. Originalmente desenvolvido pela RegeneRx Biopharmaceuticals.</p>",
      },
      {
        heading: "Mecanismo proposto",
        content:
          "<p><strong>BPC-157</strong>: Estimula angiogênese (formação de novos vasos sanguíneos), modula sistema de óxido nítrico, interage com sistema dopaminérgico, promove expressão de fatores de crescimento.</p><p><strong>TB-500</strong>: Regula actina (componente do citoesqueleto), promove migração celular, formação de novos vasos sanguíneos, e tem efeitos anti-inflamatórios.</p>",
      },
      {
        heading: "Evidência científica",
        content:
          "<p><strong>BPC-157:</strong> Centenas de estudos em ratos demonstram cicatrização de tendões, ligamentos, ossos, mucosa gástrica e tecido nervoso. <strong>Zero ensaios clínicos em humanos publicados.</strong></p><p><strong>TB-500:</strong> Estudos pré-clínicos animais robustos. Estudos clínicos pequenos para úlceras venosas e regeneração cardíaca (RegeneRx). Ainda assim, evidência humana é muito limitada.</p>",
      },
      {
        heading: "Combinação BPC-157 + TB-500",
        content:
          "<p>É comum no underground biohacking o uso combinado dos dois peptídeos, com a teoria de que atuam por mecanismos complementares (BPC-157 mais focado em GI/tendões, TB-500 mais sistêmico). Não existe estudo clínico avaliando essa combinação. É anedótica.</p>",
      },
      {
        heading: "Status regulatório",
        content:
          "<p>Ambos não têm aprovação identificada na ANVISA ou no FDA para uso clínico. A avaliação de substâncias para manipulação nos EUA não equivale a aprovação e não produz autorização automática no Brasil. Ofertas como 'research chemicals' não têm as garantias de um medicamento registrado.</p>",
      },
      {
        heading: "Riscos",
        content:
          "<p>Sem ensaios clínicos em humanos, o perfil de segurança é desconhecido. Os principais riscos são:</p><ul><li>Contaminação de produtos do mercado underground</li><li>Dosagem incorreta</li><li>Reações alérgicas</li><li>Efeitos de longo prazo desconhecidos</li></ul>",
      },
    ],
    verdict:
      "BPC-157 e TB-500 são populares na comunidade atlética, mas carecem de evidência clínica robusta em humanos. Resultados em modelos animais não demonstram segurança ou eficácia clínica. Evite ofertas online apresentadas como produtos de pesquisa para uso humano.",
    faq: [
      {
        q: "Posso usar BPC-157 e TB-500 juntos?",
        a: "É comum no biohacking, mas não há evidência clínica avaliando a combinação. Não recomendamos sem supervisão médica.",
      },
      {
        q: "Qual cicatriza tendões mais rápido?",
        a: "Ambos têm evidência apenas em modelos animais para cicatrização tendínea. Não há comparação direta em humanos publicada.",
      },
      {
        q: "São legais no Brasil?",
        a: "Não têm aprovação identificada na ANVISA para uso clínico. A ausência de registro não autoriza manipulação, venda ou uso; confirme a situação do produto e do insumo nos canais oficiais.",
      },
    ],
  },
  {
    slug: "nmn-vs-nr",
    title: "NMN vs NR (Nicotinamide Riboside)",
    metaTitle:
      "NMN vs NR: Qual Precursor de NAD+ é Melhor?",
    description:
      "Comparação entre NMN e NR, os dois precursores de NAD+ mais populares. Eficácia, biodisponibilidade, status regulatório e qual escolher.",
    peptideA: "nmn",
    peptideB: "nr-nicotinamide-riboside",
    intro:
      "NMN (Nicotinamida Mononucleotídeo) e NR (Nicotinamide Riboside) são os dois precursores de NAD+ mais populares no mercado de longevidade. Ambos aumentam comprovadamente os níveis de NAD+ — a coenzima essencial cujos níveis caem com a idade. Mas qual escolher?",
    sections: [
      {
        heading: "O que são (e o que NÃO são)",
        content:
          "<p><strong>Importante:</strong> Nem NMN nem NR são peptídeos. NMN é um nucleotídeo, NR é um nucleosídeo. Ambos são precursores diretos do NAD+ (nicotinamida adenina dinucleotídeo), uma coenzima fundamental para metabolismo celular, função mitocondrial e ativação de sirtuínas.</p>",
      },
      {
        heading: "Diferença bioquímica",
        content:
          "<p><strong>NMN:</strong> Já contém o grupo fosfato. Precisa ser convertido em NR antes de entrar nas células (ou usar transportador SLC12A8, ainda controverso).</p><p><strong>NR:</strong> Não tem fosfato. Atravessa membrana celular mais facilmente. Dentro da célula, é convertido em NMN e depois em NAD+.</p>",
      },
      {
        heading: "Estudos clínicos em humanos",
        content:
          "<p><strong>NR:</strong> Mais estudos clínicos publicados. ChromaDex (Niagen) financiou múltiplos ensaios. Demonstrado aumento de NAD+ em sangue, melhora cardiovascular, e perfil de segurança bem documentado em humanos.</p><p><strong>NMN:</strong> Estudos clínicos mais recentes mas em crescimento. Estudos em humanos confirmam aumento de NAD+, melhora em sensibilidade à insulina (estudo Yoshino, 2021), e benefícios em performance física moderada.</p>",
      },
      {
        heading: "Status regulatório",
        content:
          "<p><strong>NR:</strong> NIAGEN (forma comercial de NR) é aprovado pelo FDA como suplemento alimentar e tem status NDIN. Vendido legalmente nos EUA e em muitos países.</p><p><strong>NMN:</strong> Em 2022, o FDA reclassificou NMN como medicamento experimental (não suplemento), restringindo sua venda como suplemento alimentar nos EUA. Status legal varia por país. No Brasil, é vendido como suplemento.</p>",
      },
      {
        heading: "Preço",
        content:
          "<p>Ambos custam aproximadamente o mesmo no Brasil — R$ 200-400/mês para doses padrão (250-500mg/dia). NMN tende a ser ligeiramente mais barato.</p>",
      },
      {
        heading: "Pureza",
        content:
          "<p>Análises independentes mostraram que muitos produtos de NMN no mercado têm pureza significativamente menor que a declarada no rótulo. A regulamentação mais rigorosa de NR resulta em produtos com qualidade mais consistente.</p>",
      },
    ],
    verdict:
      "Para uso no Brasil, ambos são opções válidas e similares em eficácia. NR tem mais estudos clínicos publicados e melhor controle de qualidade. NMN é ligeiramente mais barato e tem estudos crescentes. A escolha pessoal frequentemente depende de disponibilidade, preço e preferência por marca. Importante: nenhum é 'pílula da juventude' — os benefícios documentados são modestos e os efeitos sobre longevidade humana ainda não foram demonstrados.",
    faq: [
      {
        q: "Posso tomar NMN e NR juntos?",
        a: "Sim, mas é redundante — ambos atingem o mesmo objetivo (aumentar NAD+). Não há evidência de benefício sinérgico em combinar os dois.",
      },
      {
        q: "Qual a dose ideal?",
        a: "Estudos clínicos usaram 250-1000mg/dia. Não há consenso sobre dose ideal. Para iniciantes, 250-500mg/dia é uma faixa razoável. Discuta com seu médico.",
      },
      {
        q: "São seguros?",
        a: "Em estudos clínicos, ambos demonstraram perfil de segurança favorável. Eventos adversos são raros e leves (fadiga, náusea, dor de cabeça). Efeitos de longo prazo (>1 ano) ainda são pouco estudados.",
      },
    ],
  },
  {
    slug: "ipamorelin-vs-cjc-1295",
    title: "Ipamorelin vs CJC-1295",
    metaTitle:
      "Ipamorelin vs CJC-1295: Qual é Melhor para GH?",
    description:
      "Comparação entre Ipamorelin e CJC-1295, os dois secretagogos de GH mais usados. Mecanismo, eficácia e por que são frequentemente combinados.",
    peptideA: "ipamorelin",
    peptideB: "cjc-1295",
    intro:
      "Ipamorelin e CJC-1295 são frequentemente mencionados juntos no mundo dos peptídeos. Ambos estimulam liberação de hormônio de crescimento (GH), mas por mecanismos diferentes — e por isso são frequentemente usados em combinação.",
    sections: [
      {
        heading: "Mecanismo",
        content:
          "<p><strong>Ipamorelin:</strong> Agonista do receptor de grelina (GHSR). Mimetiza grelina para estimular hipófise a liberar GH. Altamente seletivo — não eleva cortisol, prolactina ou ACTH.</p><p><strong>CJC-1295:</strong> Análogo do GHRH (Growth Hormone Releasing Hormone). Liga-se aos receptores de GHRH na hipófise para estimular síntese E liberação de GH. Versão com DAC tem meia-vida muito mais longa (dias vs minutos).</p>",
      },
      {
        heading: "Por que combinar?",
        content:
          "<p>A combinação é popular porque os dois peptídeos atuam por mecanismos complementares:</p><ul><li>Ipamorelin (via grelina) → libera GH armazenado</li><li>CJC-1295 (via GHRH) → estimula síntese de mais GH e amplifica liberação</li></ul><p>Juntos, produzem maior pico de GH do que qualquer um isoladamente, mantendo o padrão pulsátil natural.</p>",
      },
      {
        heading: "Efeitos colaterais",
        content:
          "<p><strong>Ipamorelin:</strong> Dor de cabeça, retenção hídrica leve. Perfil muito seguro.</p><p><strong>CJC-1295:</strong> Reação no local da injeção, retenção hídrica, edema leve.</p><p><strong>Combinação:</strong> Geralmente bem tolerada. Os efeitos colaterais são similares aos de cada peptídeo isoladamente, podendo incluir formigamento (parestesias) e sensação de fome aumentada.</p>",
      },
      {
        heading: "Eficácia",
        content:
          "<p>Ambos têm estudos clínicos demonstrando aumento de GH e IGF-1 em humanos. CJC-1295 com DAC mostrou aumento sustentado de GH/IGF-1 por até 2 semanas após dose única. Ipamorelin tem perfil de seletividade mais favorável.</p>",
      },
      {
        heading: "Status regulatório",
        content:
          "<p>Ipamorelin e CJC-1295 não têm aprovação identificada na ANVISA para uso clínico. Processos de avaliação de insumos para manipulação nos EUA não equivalem a aprovação do FDA e não autorizam uso no Brasil.</p>",
      },
    ],
    verdict:
      "A hipótese de efeito complementar entre Ipamorelin e CJC-1295 não substitui evidência clínica de segurança e eficácia para a combinação. A falta de aprovação regulatória e de dados robustos impede tratá-la como protocolo estabelecido.",
    faq: [
      {
        q: "Posso usar só um dos dois?",
        a: "Sim. Cada um pode ser usado isoladamente. Mas a combinação é padrão na prática clínica porque produz efeito sinérgico.",
      },
      {
        q: "Substitui hormônio de crescimento (HGH)?",
        a: "Não exatamente. Eles aumentam a liberação natural de GH, atingindo níveis menores que a administração exógena de HGH. São considerados mais fisiológicos e potencialmente mais seguros, mas a eficácia é menor.",
      },
    ],
  },
];

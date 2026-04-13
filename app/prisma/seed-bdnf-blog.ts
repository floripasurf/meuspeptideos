import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const post = await prisma.blogPost.upsert({
    where: { slug: "como-aumentar-bdnf" },
    update: {},
    create: {
      title:
        "Como aumentar o BDNF: os compostos com evidência científica",
      slug: "como-aumentar-bdnf",
      excerpt:
        "BDNF é o fator neurotrófico mais importante do cérebro — essencial para memória, aprendizado e proteção contra neurodegeneração. Descubra o que a ciência diz sobre como aumentá-lo com exercício, hábitos e compostos específicos.",
      author: "Meus Peptídeos",
      tags: ["BDNF", "cognição", "neuroproteção", "nootrópicos", "longevidade"],
      published: true,
      publishedAt: new Date(),
      content: `
<p>Se existe uma molécula que merece o título de "adubo do cérebro", essa molécula é o BDNF — <em>Brain-Derived Neurotrophic Factor</em>, ou fator neurotrófico derivado do cérebro. Ele é o principal responsável por fazer seus neurônios crescerem, se conectarem e sobreviverem. Sem BDNF suficiente, o cérebro envelhece mais rápido, a memória falha e o humor desmorona.</p>

<p>Neste artigo, vamos explicar o que é o BDNF, por que ele é tão importante, o que acontece quando seus níveis estão baixos e — o mais relevante — quais são os compostos com evidência científica de aumentá-lo. Sem promessas vazias, sem modismos: apenas o que a literatura sustenta.</p>

<h2>O que é BDNF e por que ele é importante</h2>

<p>BDNF é uma proteína da família das neurotrofinas, produzida principalmente no hipocampo, córtex e prosencéfalo basal. Sua função é, literalmente, nutrir os neurônios. Ele atua através do receptor TrkB (tropomyosin receptor kinase B), ativando cascatas de sinalização que promovem:</p>

<ul>
<li><strong>Neuroplasticidade:</strong> BDNF é essencial para a potenciação de longa duração (LTP), o mecanismo celular da memória e do aprendizado. Sem ele, o cérebro perde a capacidade de formar novas conexões sinápticas.</li>
<li><strong>Neurogênese:</strong> no hipocampo adulto, BDNF estimula o nascimento de novos neurônios — um processo que antes se acreditava impossível após a infância.</li>
<li><strong>Sobrevivência neuronal:</strong> BDNF protege neurônios contra apoptose (morte celular programada), estresse oxidativo e excitotoxicidade por glutamato.</li>
<li><strong>Regulação do humor:</strong> níveis adequados de BDNF estão associados a melhor regulação emocional. Os antidepressivos mais eficazes — incluindo SSRIs e cetamina — aumentam BDNF como parte de seu mecanismo de ação.</li>
<li><strong>Metabolismo energético:</strong> BDNF também atua no hipotálamo, regulando apetite e gasto energético. Camundongos sem BDNF desenvolvem obesidade severa.</li>
</ul>

<p>Em resumo: BDNF é o fator que mantém seu cérebro jovem, adaptável e funcional. Quanto mais você envelhece, mais importante ele se torna.</p>

<h2>O que acontece quando o BDNF está baixo</h2>

<p>Níveis reduzidos de BDNF sérico estão consistentemente associados a uma série de condições neuropsiquiátricas e neurodegenerativas:</p>

<ul>
<li><strong>Depressão:</strong> a "hipótese neurotrófica da depressão" propõe que a queda de BDNF no hipocampo é um dos mecanismos centrais da doença. Meta-análises confirmam que pacientes deprimidos têm BDNF sérico significativamente menor que controles saudáveis.</li>
<li><strong>Doença de Alzheimer:</strong> a redução de BDNF no córtex e hipocampo precede os sintomas clínicos de Alzheimer. BDNF baixo está correlacionado com maior deposição de beta-amiloide e tau fosforilada.</li>
<li><strong>Declínio cognitivo associado à idade:</strong> mesmo sem demência, idosos com BDNF mais baixo apresentam pior desempenho em testes de memória episódica e função executiva.</li>
<li><strong>Transtornos de ansiedade:</strong> a desregulação do BDNF na amígdala e no córtex pré-frontal está implicada em ansiedade generalizada e TEPT.</li>
<li><strong>Obesidade e síndrome metabólica:</strong> a deficiência de BDNF hipotalâmico contribui para hiperfagia e resistência à insulina.</li>
</ul>

<p>A boa notícia: diferente de muitos marcadores biológicos, o BDNF é altamente responsivo a intervenções comportamentais e farmacológicas. Você pode aumentá-lo.</p>

<h2>Como aumentar o BDNF naturalmente</h2>

<p>Antes de falar de compostos, é fundamental reconhecer que os maiores indutores de BDNF são hábitos — gratuitos e acessíveis a qualquer pessoa:</p>

<ul>
<li><strong>Exercício físico:</strong> é o indutor mais potente e mais bem documentado de BDNF. Exercício aeróbico (corrida, ciclismo, natação) aumenta BDNF sérico em 2 a 3 vezes de forma aguda, e o treinamento regular eleva os níveis basais. HIIT (treino intervalado de alta intensidade) parece ser especialmente eficaz. A intensidade importa: quanto maior o esforço, maior a liberação de BDNF. Estudos mostram que 30–40 minutos de exercício aeróbico moderado a vigoroso, 3–5 vezes por semana, produz aumentos significativos e sustentados.</li>
<li><strong>Sono de qualidade:</strong> BDNF é consolidado durante o sono de ondas lentas (fase N3). Privação crônica de sono reduz BDNF no hipocampo e prejudica a memória. Priorizar 7–9 horas de sono ininterrupto é uma das intervenções mais simples e subestimadas.</li>
<li><strong>Jejum intermitente:</strong> a restrição calórica e o jejum intermitente (16:8, 24h) aumentam BDNF via ativação de vias de estresse adaptativo (hormese). O mecanismo envolve a ativação de AMPK e a inibição de mTOR, que por sua vez estimulam a expressão gênica de BDNF.</li>
<li><strong>Exposição ao frio:</strong> a imersão em água fria (10–15°C por 2–5 minutos) aumenta noradrenalina e, indiretamente, BDNF. Os dados em humanos ainda são limitados, mas estudos preliminares mostram elevação de BDNF sérico após protocolos de crioterapia.</li>
<li><strong>Meditação e mindfulness:</strong> a prática regular de meditação está associada a maiores níveis de BDNF em estudos observacionais. O mecanismo provável é a redução de cortisol crônico, que é um supressor conhecido de BDNF.</li>
<li><strong>Exposição solar:</strong> a vitamina D, produzida pela pele sob radiação UVB, regula positivamente a expressão de BDNF. Deficiência de vitamina D — extremamente comum no Brasil, apesar do clima tropical — está associada a BDNF mais baixo.</li>
</ul>

<p>Esses hábitos não são opcionais — são a base. Nenhum composto substitui exercício e sono. Dito isso, vamos ao que a farmacologia pode oferecer como complemento.</p>

<h2>Compostos com evidência de aumento de BDNF</h2>

<p>Os compostos abaixo possuem estudos publicados demonstrando aumento de BDNF — seja por ação direta no receptor TrkB, por estimulação da transcrição gênica ou por modulação indireta via outras vias (NAD+, NGF, HGF). Eles variam em nível de evidência, via de administração e disponibilidade.</p>

<h3>Semax</h3>

<p><a href="/pt/peptideo/semax">Semax</a> é um peptídeo sintético derivado do ACTH (fragmento 4-10), desenvolvido na Rússia nos anos 1980 e aprovado como medicamento naquele país. Ele é um dos poucos compostos que aumenta o BDNF de forma direta e documentada. Estudos em modelos animais mostraram que Semax eleva a expressão de BDNF e TrkB no hipocampo e no córtex em até 1,5–3 vezes, com efeitos persistentes após administração repetida. A via de administração é intranasal, o que permite ação rápida no sistema nervoso central. É utilizado clinicamente na Rússia para AVC isquêmico, disfunção cognitiva e neuropatias.</p>

<h3>Selank</h3>

<p><a href="/pt/peptideo/selank">Selank</a> é outro peptídeo russo, derivado da tuftsina (um fragmento da IgG). Funciona como ansiolítico sem efeito sedativo, e parte de seu mecanismo envolve a modulação de BDNF. Estudos demonstraram que Selank aumenta a expressão gênica de BDNF no hipocampo e modula a interleucina-6 (IL-6), que por sua vez influencia a neurotrofina. Também atua na via GABAérgica e serotoninérgica. Via intranasal, com perfil de segurança favorável nos estudos clínicos russos.</p>

<h3>Cerebrolysin</h3>

<p><a href="/pt/peptideo/cerebrolysin">Cerebrolysin</a> é uma mistura de peptídeos neurotrófico de baixo peso molecular derivados de cérebro suíno, aprovada em mais de 45 países (não nos EUA). Contém fragmentos ativos que mimetizam a ação de neurotrofinas como BDNF e NGF. Ensaios clínicos randomizados — incluindo o estudo CARS em AVC e estudos em Alzheimer leve a moderado — mostraram melhora em escores cognitivos e funcionalidade. Administrado por via intravenosa ou intramuscular, é um dos poucos compostos neurotróficos com dados clínicos robustos em humanos.</p>

<h3>Dihexa</h3>

<p><a href="/pt/peptideo/dihexa">Dihexa</a> é um hexapeptídeo sintético derivado da angiotensina IV que atua como agonista do receptor HGF/c-Met (fator de crescimento de hepatócitos). Em estudos pré-clínicos, Dihexa demonstrou potência até 10 milhões de vezes maior que o BDNF em promover a formação de sinapses in vitro — um dado impressionante que deve ser interpretado com cautela, pois a comparação é em termos de concentração efetiva, não de efeito clínico. O mecanismo não é via TrkB diretamente, mas via HGF/c-Met, que promove sinaptogênese e sobrevivência neuronal por vias paralelas. Disponível apenas como composto de pesquisa; não há ensaios clínicos em humanos.</p>

<h3>NMN (Nicotinamida Mononucleotídeo)</h3>

<p><a href="/pt/peptideo/nmn">NMN</a> é um precursor direto de NAD+, a coenzima essencial para metabolismo energético celular. O aumento de BDNF com NMN é indireto: ao elevar NAD+, NMN ativa as sirtuínas (especialmente SIRT1), que por sua vez regulam positivamente a transcrição de BDNF no hipocampo. Estudos em camundongos idosos mostraram que suplementação com NMN restaurou níveis de NAD+ cerebral e melhorou função cognitiva, com aumento concomitante de BDNF. Administrado por via oral.</p>

<h3>NR (Nicotinamida Ribosídeo)</h3>

<p><a href="/pt/peptideo/nr-nicotinamide-riboside">NR</a> é outro precursor de NAD+, com mecanismo similar ao NMN. Segue via metabólica ligeiramente diferente (NR → NMN → NAD+, via enzima NRK), mas o resultado final é o mesmo: elevação de NAD+, ativação de SIRT1 e aumento indireto de BDNF. NR tem mais dados clínicos em humanos que NMN, com elevações de NAD+ de 40–90% documentadas em ensaios de fase I/II. Via oral, com boa biodisponibilidade.</p>

<h3>Lion's Mane (Hericium erinaceus)</h3>

<p>Lion's Mane é um cogumelo medicinal com longa tradição na medicina asiática. Contém hericenonas e erinacinas, compostos que atravessam a barreira hematoencefálica e estimulam a produção de NGF (fator de crescimento nervoso). Estudos recentes também demonstraram aumento de BDNF em modelos animais. Um ensaio clínico randomizado em idosos japoneses com comprometimento cognitivo leve mostrou melhora significativa em escores cognitivos após 16 semanas de suplementação. Embora não esteja catalogado na plataforma Meus Peptídeos (não é um peptídeo), merece menção pela acessibilidade e pelo perfil de segurança.</p>

<h2>Tabela comparativa dos compostos</h2>

<table>
<thead>
<tr>
<th>Composto</th>
<th>Mecanismo de aumento do BDNF</th>
<th>Nível de evidência</th>
<th>Via de administração</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="/pt/peptideo/semax"><strong>Semax</strong></a></td>
<td>Aumento direto da expressão de BDNF e TrkB</td>
<td>Comprovado (estudos clínicos, aprovação na Rússia)</td>
<td>Intranasal</td>
</tr>
<tr>
<td><a href="/pt/peptideo/selank"><strong>Selank</strong></a></td>
<td>Modulação de BDNF via IL-6, GABA e serotonina</td>
<td>Comprovado (estudos clínicos, aprovação na Rússia)</td>
<td>Intranasal</td>
</tr>
<tr>
<td><a href="/pt/peptideo/cerebrolysin"><strong>Cerebrolysin</strong></a></td>
<td>Fragmentos neurotróficos que mimetizam BDNF e NGF</td>
<td>Comprovado (RCTs em AVC e Alzheimer, aprovado em 45+ países)</td>
<td>IV / Intramuscular</td>
</tr>
<tr>
<td><a href="/pt/peptideo/dihexa"><strong>Dihexa</strong></a></td>
<td>Agonista HGF/c-Met, sinaptogênese paralela ao BDNF</td>
<td>Pré-clínico (estudos in vitro e em animais)</td>
<td>Oral / Subcutânea</td>
</tr>
<tr>
<td><a href="/pt/peptideo/nmn"><strong>NMN</strong></a></td>
<td>Aumento indireto via NAD+ → SIRT1 → BDNF</td>
<td>Pesquisa (estudos animais + ensaios clínicos iniciais)</td>
<td>Oral</td>
</tr>
<tr>
<td><a href="/pt/peptideo/nr-nicotinamide-riboside"><strong>NR</strong></a></td>
<td>Aumento indireto via NAD+ → SIRT1 → BDNF</td>
<td>Pesquisa (ensaios clínicos fase I/II)</td>
<td>Oral</td>
</tr>
<tr>
<td><strong>Lion's Mane</strong></td>
<td>Hericenonas e erinacinas estimulam NGF e BDNF</td>
<td>Preliminar (RCT pequeno + estudos animais)</td>
<td>Oral</td>
</tr>
</tbody>
</table>

<h2>O que NÃO funciona: mitos sobre suplementos e BDNF</h2>

<p>A internet está repleta de listas de "suplementos que aumentam o BDNF". A maioria exagera ou distorce a evidência. Alguns esclarecimentos:</p>

<ul>
<li><strong>Curcumina isolada:</strong> frequentemente citada como "potente indutor de BDNF", a evidência em humanos é fraca e inconsistente. A maioria dos dados vem de estudos in vitro ou em animais com doses que não se traduzem para suplementação oral comum. A biodisponibilidade da curcumina é extremamente baixa, e formulações biodisponíveis (como Theracurmin ou curcumina lipossomal) mostram resultados modestos na melhor das hipóteses.</li>
<li><strong>Ômega-3 sozinho:</strong> embora DHA seja componente estrutural das membranas neuronais e estudos associem ingestão de peixe a BDNF mais alto, ensaios clínicos com suplementação de ômega-3 isolado mostram efeitos pequenos e inconsistentes sobre BDNF sérico. Ômega-3 é benéfico para saúde cerebral por múltiplos mecanismos, mas não é um "indutor de BDNF" confiável por si só.</li>
<li><strong>Ashwagandha:</strong> adaptógeno com dados interessantes para estresse e cortisol, mas a evidência de aumento de BDNF em humanos é limitada a poucos estudos de baixa qualidade. Pode ter efeito indireto via redução de cortisol, mas não há dados suficientes para afirmá-lo como indutor de BDNF.</li>
<li><strong>Resveratrol oral em doses baixas:</strong> doses típicas de suplementos (250–500 mg) têm biodisponibilidade muito baixa. Estudos que mostram efeito sobre BDNF geralmente usam doses altas em modelos animais que não se aplicam diretamente à suplementação humana.</li>
<li><strong>Magnésio:</strong> o magnésio L-treonato ganhou atenção por atravessar a barreira hematoencefálica, e um estudo em camundongos mostrou aumento de BDNF. Em humanos, os dados são preliminares. Magnésio é essencial para saúde cerebral, mas classificá-lo como "suplemento de BDNF" é prematuro.</li>
</ul>

<p>O padrão é claro: muitos compostos mostram efeito sobre BDNF em tubos de ensaio ou em roedores, mas falham em demonstrar o mesmo efeito de forma confiável em humanos nas doses habituais de suplementação. Desconfie de qualquer lista que coloque curcumina e Cerebrolysin no mesmo patamar de evidência — não estão.</p>

<h2>Conclusão: a estratégia baseada em evidência</h2>

<p>Se o objetivo é maximizar o BDNF, a ciência aponta uma hierarquia clara:</p>

<ul>
<li><strong>Base inegociável:</strong> exercício aeróbico regular (30–40 min, 4–5x/semana), sono de 7–9 horas, e alimentação rica em polifenóis e ômega-3.</li>
<li><strong>Hábitos complementares:</strong> jejum intermitente, exposição ao frio, meditação, correção de vitamina D.</li>
<li><strong>Compostos com evidência:</strong> Semax, Selank e Cerebrolysin (para quem busca intervenção farmacológica direta); NMN ou NR (para suporte metabólico via NAD+); Lion's Mane (como opção acessível e de baixo risco).</li>
<li><strong>Apenas com acompanhamento médico:</strong> Dihexa (dado experimental, sem dados em humanos).</li>
</ul>

<p>Não existe atalho. BDNF é um reflexo do estilo de vida — e os compostos funcionam melhor quando a base está sólida.</p>

<h2>Aviso importante</h2>

<p>Este artigo tem caráter exclusivamente informativo e educacional. Não constitui recomendação médica, prescrição ou incentivo ao uso de qualquer substância. Os compostos mencionados possuem diferentes níveis de regulamentação e evidência científica. Sempre consulte um médico antes de iniciar qualquer suplementação ou protocolo farmacológico. A automedicação com peptídeos e compostos de pesquisa pode oferecer riscos graves à saúde.</p>
`,
    },
  });

  console.log("Created blog post:", post.title);
}

main()
  .catch(console.error)
  .finally(() => pool.end());

import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const post = await prisma.blogPost.upsert({
    where: { slug: "peptideos-vs-compostos-bioativos" },
    update: {},
    create: {
      title:
        "Peptídeos, senolíticos, precursores de NAD+ e mais: entenda os compostos da nova medicina",
      slug: "peptideos-vs-compostos-bioativos",
      excerpt:
        "Peptídeos, NAD+, antioxidantes, senolíticos, polifenóis — são classes muito diferentes de moléculas, mas todas convergem na mesma missão: estender a saúde e a longevidade humana. Entenda cada categoria, suas diferenças e por que reunimos todas em uma só plataforma.",
      author: "Meus Peptídeos",
      tags: [
        "ciência",
        "longevidade",
        "peptídeos",
        "NAD+",
        "senolíticos",
        "antioxidantes",
        "guia",
      ],
      published: true,
      publishedAt: new Date(),
      content: `
<p>Se você navega pelo Meus Peptídeos, já percebeu que o site não cobre apenas peptídeos. Há compostos como NMN, metformina, resveratrol, glutationa e espermidina — moléculas que não são peptídeos, mas fazem parte do mesmo universo: a medicina de precisão voltada à longevidade e à otimização da saúde.</p>

<p>Neste guia, vamos desvendar cada uma das grandes categorias de compostos presentes na plataforma, explicar como elas funcionam, como se diferenciam e por que faz sentido estudá-las lado a lado.</p>

<h2>1. Peptídeos — as moléculas sinalizadoras do corpo</h2>

<p>Peptídeos são cadeias curtas de aminoácidos, tipicamente entre 2 e 50 unidades. Diferentemente de proteínas maiores, peptídeos são pequenos o suficiente para serem absorvidos pelo organismo e atuarem como sinalizadores biológicos extremamente específicos. O corpo humano produz centenas de peptídeos naturalmente — insulina, ocitocina e grelina são alguns dos mais conhecidos.</p>

<p>Na medicina moderna, peptídeos sintéticos replicam ou aprimoram essas funções naturais. A variedade é impressionante:</p>

<ul>
<li><strong>Peptídeos metabólicos (GLP-1 e GIP):</strong> Semaglutida e Tirzepatida revolucionaram o tratamento de obesidade e diabetes tipo 2. Eles mimetizam hormônios intestinais que regulam a saciedade e a secreção de insulina, gerando perdas de peso de 15–25% em ensaios clínicos.</li>
<li><strong>Peptídeos de reparo tecidual:</strong> BPC-157 (Body Protection Compound) e TB-500 (Thymosin Beta-4) são intensamente pesquisados por suas propriedades de cicatrização de tendões, músculos e mucosa gastrointestinal. BPC-157, derivado de proteínas gástricas, mostrou efeitos angiogênicos e anti-inflamatórios em estudos pré-clínicos.</li>
<li><strong>Peptídeos de crescimento (GH secretagogos):</strong> Ipamorelin, CJC-1295, Tesamorelin, Sermorelin e AOD-9604 estimulam a liberação de hormônio do crescimento pela hipófise, sem os efeitos colaterais da administração direta de GH. São usados em contextos de deficiência de GH, perda de massa muscular associada ao envelhecimento e redistribuição de gordura visceral.</li>
<li><strong>Peptídeos imunomoduladores:</strong> Thymosin Alpha-1 (aprovado em mais de 30 países) fortalece a imunidade adaptativa. LL-37 é um peptídeo antimicrobiano endógeno que combate bactérias, vírus e fungos por mecanismos distintos dos antibióticos convencionais. KPV, um tripeptídeo derivado do hormônio alfa-MSH, possui ação anti-inflamatória intestinal promissora.</li>
<li><strong>Peptídeos neurotrópicos:</strong> Selank (análogo da tuftsina) tem efeito ansiolítico sem sedação. DSIP (Delta Sleep-Inducing Peptide) modula os ciclos de sono. Cerebrolysin, mistura de peptídeos neurotrofico, é aprovado na Europa para demência. Dihexa é pesquisado como potencializador cognitivo de altíssima potência.</li>
<li><strong>Peptídeos cosméticos e de pigmentação:</strong> GHK-Cu estimula a síntese de colágeno e a regeneração da pele. Melanotan II e PT-141 (Bremelanotide) atuam nos receptores de melanocortina — o primeiro para bronzeamento, o segundo (aprovado pelo FDA) para disfunção sexual.</li>
<li><strong>Peptídeos mitocondriais e de longevidade:</strong> SS-31 (Elamipretide) protege a membrana interna mitocondrial. MOTS-c, codificado pelo DNA mitocondrial, mimetiza efeitos do exercício físico no metabolismo. Epithalon é um tetrapeptídeo pesquisado por sua ação sobre a telomerase.</li>
</ul>

<p>Os peptídeos são, portanto, a maior e mais diversa classe de compostos na plataforma. Sua vantagem é a especificidade: cada peptídeo atua em receptores ou vias muito definidas, o que permite intervenções direcionadas com perfis de efeitos colaterais geralmente menores que fármacos tradicionais.</p>

<h2>2. Precursores de NAD+ — reabastecendo a moeda energética celular</h2>

<p>NAD+ (nicotinamida adenina dinucleotídeo) é uma coenzima presente em todas as células vivas. Ela é essencial para a produção de energia mitocondrial, o reparo do DNA e a ativação das sirtuínas — uma família de enzimas diretamente ligada à longevidade. O problema: os níveis de NAD+ caem cerca de 50% entre os 40 e 60 anos de idade.</p>

<p>Para combater esse declínio, surgiram os precursores de NAD+:</p>

<ul>
<li><strong>NMN (Nicotinamida Mononucleotídeo):</strong> convertido diretamente em NAD+ pela enzima NMNAT. Estudos em camundongos (publicados em <em>Cell Metabolism</em> e <em>Science</em>) mostraram melhoras em sensibilidade à insulina, função vascular, resistência ao exercício e até fertilidade. Ensaios clínicos de fase I/II em humanos confirmaram que NMN eleva os níveis sanguíneos de NAD+ de forma dose-dependente e segura.</li>
<li><strong>NR (Nicotinamida Ribosídeo):</strong> segue uma via metabólica ligeiramente diferente, passando pela enzima NRK antes de se tornar NMN e, em seguida, NAD+. NR é o precursor com mais dados clínicos em humanos, incluindo estudos que demonstraram elevação de NAD+ de 40–90% e melhora em marcadores de inflamação em idosos.</li>
</ul>

<p>NMN e NR não são peptídeos — são nucleotídeos (derivados de vitamina B3). Mas seu papel no envelhecimento celular os torna peças centrais de qualquer protocolo de longevidade, razão pela qual estão na plataforma.</p>

<h2>3. Antioxidantes endógenos — o sistema de defesa interno</h2>

<p>Enquanto precursores de NAD+ focam na produção de energia, antioxidantes lidam com o subproduto inevitável: o estresse oxidativo. Radicais livres danificam DNA, proteínas e membranas celulares, acelerando o envelhecimento. O corpo possui defesas naturais, mas elas podem ser suplementadas:</p>

<ul>
<li><strong>NAC (N-Acetilcisteína):</strong> é o precursor mais eficiente da glutationa, o principal antioxidante endógeno. Usado clinicamente há décadas como antídoto para intoxicação por paracetamol e como mucolítico, NAC ganhou atenção renovada por seus efeitos na saúde hepática, respiratória e na modulação do glutamato cerebral. Estudos investigam seu papel em transtornos compulsivos e dependência química.</li>
<li><strong>Glutationa:</strong> o "antioxidante mestre" do corpo. Composta por três aminoácidos (glutamato, cisteína e glicina), a glutationa neutraliza radicais livres, recicla outros antioxidantes (como vitaminas C e E) e participa da desintoxicação hepática de fase II. A suplementação direta tem biodisponibilidade limitada por via oral, o que levou ao desenvolvimento de formas lipossomal e intravenosa.</li>
</ul>

<p>Esses compostos não são peptídeos nem nucleotídeos — são um aminoácido modificado (NAC) e um tripeptídeo atípico (glutationa). Sua inclusão se justifica porque o estresse oxidativo é um dos pilares do envelhecimento biológico.</p>

<h2>4. Fármacos repurposados para longevidade — velhos conhecidos, nova missão</h2>

<p>Algumas das moléculas mais promissoras para longevidade não são novas — são medicamentos aprovados há décadas para outras indicações, agora sendo estudados como intervenções antienvelhecimento:</p>

<ul>
<li><strong>Metformina:</strong> usada desde os anos 1950 para diabetes tipo 2, a metformina ativa a AMPK (sensor energético celular), inibe o complexo I mitocondrial e reduz a via mTOR. Estudos observacionais mostraram que diabéticos que usam metformina vivem mais que não-diabéticos do grupo controle. O ensaio TAME (Targeting Aging with Metformin), liderado pelo Dr. Nir Barzilai, é o primeiro estudo clínico de grande escala a testar um medicamento especificamente para retardar o envelhecimento.</li>
<li><strong>Rapamicina:</strong> originalmente um imunossupressor usado em transplantes de órgãos, a rapamicina inibe o mTOR — a via de sinalização mais consistentemente associada ao envelhecimento em toda a biologia. Em camundongos, rapamicina em doses baixas aumentou a expectativa de vida em até 26% (fêmeas) e 9% (machos). Em humanos, doses baixas e intermitentes estão sendo testadas para imunossenescência, com resultados iniciais promissores na melhora da resposta vacinal em idosos.</li>
</ul>

<p>Metformina e rapamicina são fármacos sintéticos de pequena molécula. Não são peptídeos, antioxidantes ou suplementos. Mas seu mecanismo de ação toca diretamente nas vias centrais do envelhecimento (AMPK, mTOR, autofagia), tornando-os indispensáveis nessa conversa.</p>

<h2>5. Polifenóis e flavonoides — compostos vegetais com ação senolítica</h2>

<p>Polifenóis são compostos bioativos produzidos por plantas, encontrados em frutas, vegetais, chás e vinhos. Dois ganharam destaque na pesquisa de longevidade:</p>

<ul>
<li><strong>Resveratrol:</strong> encontrado na casca da uva e no vinho tinto, o resveratrol ativa a SIRT1 (uma sirtuína) e tem ação anti-inflamatória. Embora os estudos em humanos tenham resultados mistos para longevidade per se, há evidência consistente de benefícios cardiovasculares e metabólicos. Sua biodisponibilidade é limitada, o que levou ao desenvolvimento de formas micronizadas e trans-resveratrol.</li>
<li><strong>Fisetina:</strong> um flavonoide presente em morangos e maçãs, a fisetina emergiu como o senolítico natural mais potente em estudos pré-clínicos. Senolíticos são compostos que eliminam seletivamente células senescentes — células "zumbis" que pararam de se dividir mas continuam secretando substâncias inflamatórias (o chamado SASP). Em camundongos idosos, fisetina reduziu marcadores de senescência e estendeu a expectativa de vida. Ensaios clínicos em humanos estão em andamento.</li>
</ul>

<p>Polifenóis atuam por mecanismos completamente diferentes dos peptídeos: enquanto peptídeos são sinalizadores específicos, polifenóis modulam amplas redes de sinalização celular, frequentemente por hormese — um estresse leve que ativa respostas protetoras.</p>

<h2>6. Outros compostos bioativos — inclassificáveis, mas essenciais</h2>

<p>Alguns compostos não se encaixam nas categorias anteriores, mas são demasiado importantes para serem ignorados:</p>

<ul>
<li><strong>Espermidina:</strong> uma poliamina encontrada em gérmen de trigo, soja e queijos envelhecidos. A espermidina é um dos indutores naturais mais potentes da autofagia — o sistema de reciclagem celular que limpa proteínas danificadas e organelas disfuncionais. Em estudos epidemiológicos, maior ingestão de espermidina foi associada a menor mortalidade cardiovascular. Ensaios clínicos mostraram melhora em função cognitiva de idosos.</li>
<li><strong>Urolitina A:</strong> um metabólito produzido pela microbiota intestinal a partir de elagitaninos (presentes em romãs e nozes). Nem todos produzem urolitina A — depende da composição da flora intestinal. A urolitina A ativa a mitofagia (reciclagem seletiva de mitocôndrias disfuncionais) e demonstrou melhora na função muscular e na resistência ao exercício em ensaios clínicos de fase II. É o primeiro "pós-biótico" com evidência clínica robusta para envelhecimento muscular.</li>
</ul>

<h2>Tabela comparativa: as 6 classes de compostos</h2>

<table>
<thead>
<tr>
<th>Categoria</th>
<th>O que são</th>
<th>Mecanismo principal</th>
<th>Exemplos na plataforma</th>
<th>Via de administração típica</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Peptídeos</strong></td>
<td>Cadeias curtas de aminoácidos (2–50 aa)</td>
<td>Sinalização celular específica via receptores</td>
<td>Semaglutida, BPC-157, TB-500, Ipamorelin, LL-37, Selank, SS-31, Epithalon, GHK-Cu</td>
<td>Subcutânea, intranasal, tópica</td>
</tr>
<tr>
<td><strong>Precursores de NAD+</strong></td>
<td>Nucleotídeos derivados de vitamina B3</td>
<td>Restauração de NAD+ → energia mitocondrial, reparo de DNA, ativação de sirtuínas</td>
<td>NMN, NR (Nicotinamida Ribosídeo)</td>
<td>Oral (cápsulas, sublingual)</td>
</tr>
<tr>
<td><strong>Antioxidantes</strong></td>
<td>Compostos que neutralizam radicais livres</td>
<td>Redução de estresse oxidativo, reciclagem redox, desintoxicação hepática</td>
<td>NAC, Glutationa</td>
<td>Oral, IV, lipossomal</td>
</tr>
<tr>
<td><strong>Fármacos repurposados</strong></td>
<td>Medicamentos aprovados, novos usos</td>
<td>Modulação de AMPK, mTOR, autofagia</td>
<td>Metformina, Rapamicina</td>
<td>Oral (comprimidos)</td>
</tr>
<tr>
<td><strong>Polifenóis / Flavonoides</strong></td>
<td>Compostos vegetais bioativos</td>
<td>Ativação de sirtuínas, senólise, hormese</td>
<td>Resveratrol, Fisetina</td>
<td>Oral (cápsulas, pó)</td>
</tr>
<tr>
<td><strong>Outros bioativos</strong></td>
<td>Poliaminas, metabólitos microbianos</td>
<td>Indução de autofagia e mitofagia</td>
<td>Espermidina, Urolitina A</td>
<td>Oral (cápsulas)</td>
</tr>
</tbody>
</table>

<h2>Por que reunir tudo em uma plataforma?</h2>

<p>A resposta curta: porque o envelhecimento não tem uma causa única, e nenhuma classe de composto sozinha resolve o problema.</p>

<p>O envelhecimento biológico é impulsionado por múltiplos processos interconectados — os chamados <em>hallmarks of aging</em> (Lopez-Otín et al., 2013; revisado em 2023). Cada classe de composto atua em hallmarks diferentes:</p>

<ul>
<li><strong>Depleção de NAD+</strong> → NMN, NR restauram os níveis</li>
<li><strong>Disfunção mitocondrial</strong> → SS-31, MOTS-c, Urolitina A reparam ou reciclam mitocôndrias</li>
<li><strong>Senescência celular</strong> → Fisetina, Rapamicina eliminam ou previnem células senescentes</li>
<li><strong>Perda de proteostase</strong> → Espermidina, Rapamicina ativam autofagia</li>
<li><strong>Desregulação da detecção de nutrientes</strong> → Metformina (AMPK), Rapamicina (mTOR)</li>
<li><strong>Estresse oxidativo</strong> → NAC, Glutationa, GHK-Cu</li>
<li><strong>Inflamação crônica (inflammaging)</strong> → BPC-157, KPV, Thymosin Alpha-1, Resveratrol</li>
<li><strong>Encurtamento de telômeros</strong> → Epithalon (ativação de telomerase, dados preliminares)</li>
<li><strong>Alterações epigenéticas</strong> → Resveratrol (SIRT1), NMN/NR (sirtuínas dependentes de NAD+)</li>
</ul>

<p>Separar essas moléculas em sites diferentes seria como estudar o coração separado dos pulmões — anatomicamente possível, mas clinicamente inútil. A medicina de longevidade é, por natureza, integrativa. E a plataforma reflete isso.</p>

<h2>Uma nota sobre evidência e responsabilidade</h2>

<p>Nem todos os compostos estão no mesmo nível de comprovação. Semaglutida tem ensaios de fase III com dezenas de milhares de pacientes. BPC-157, por outro lado, tem dados quase exclusivamente pré-clínicos. NMN está em ensaios de fase II. Fisetina como senolítico está nos estágios iniciais em humanos.</p>

<p>No Meus Peptídeos, cada composto é classificado por nível de evidência. Não tratamos uma molécula com dados apenas em camundongos da mesma forma que um fármaco aprovado pelo FDA. Essa hierarquia de evidência é fundamental para que você tome decisões informadas junto ao seu médico.</p>

<p>Nenhum composto aqui é recomendação médica. São informações baseadas em pesquisa científica, organizadas para que profissionais de saúde e pacientes possam navegar esse universo com clareza. Sempre consulte um médico antes de iniciar qualquer protocolo.</p>

<h2>Conclusão</h2>

<p>O futuro da medicina não pertence a uma única classe de molécula. Pertence à combinação inteligente de ferramentas — peptídeos para sinalização precisa, precursores de NAD+ para energia celular, antioxidantes para defesa, senolíticos para limpeza, indutores de autofagia para reciclagem e fármacos repurposados para modular as grandes vias do envelhecimento.</p>

<p>É essa visão integrativa que o Meus Peptídeos busca oferecer: um mapa completo, baseado em ciência, de todos os compostos que estão moldando a nova medicina da longevidade.</p>
`,
    },
  });

  console.log("Created blog post:", post.title);
}

main()
  .catch(console.error)
  .finally(() => pool.end());

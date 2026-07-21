import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const posts = [
  {
    title: "A revolução dos peptídeos: por que a ciência está apostando nessas moléculas",
    slug: "revolucao-dos-peptideos",
    excerpt:
      "De laboratórios acadêmicos a clínicas de longevidade, peptídeos estão redesenhando os limites da medicina moderna. Entenda por que essas pequenas moléculas geram tanto interesse — e tanta controvérsia.",
    author: "Meus Peptídeos",
    tags: ["inovação", "ciência", "tendências"],
    content: `
<p>Se você acompanha o mundo da saúde e longevidade, provavelmente já ouviu falar em peptídeos. Mas o que exatamente são essas moléculas, e por que estão atraindo bilhões em investimento de pesquisa?</p>

<h2>O que são peptídeos?</h2>

<p>Peptídeos são cadeias curtas de aminoácidos — os mesmos blocos que formam proteínas, mas em versão menor. Enquanto uma proteína pode ter centenas ou milhares de aminoácidos, um peptídeo tipicamente tem entre 2 e 50. Essa diferença de tamanho é crucial: peptídeos são pequenos o suficiente para serem absorvidos pelo corpo, mas complexos o suficiente para exercer funções biológicas específicas.</p>

<p>Seu corpo já produz centenas de peptídeos naturalmente. A insulina, por exemplo, é um peptídeo. A ocitocina, o "hormônio do amor", também é. O que mudou nos últimos anos foi a capacidade de sintetizar peptídeos em laboratório e usá-los como ferramentas terapêuticas.</p>

<h2>Por que agora?</h2>

<p>Três fatores convergiram para criar o momento atual:</p>

<p><strong>1. Tecnologia de síntese barateou.</strong> Produzir peptídeos sintéticos era extremamente caro até a década de 2010. Hoje, os custos caíram dramaticamente, tornando viável tanto a pesquisa acadêmica quanto o desenvolvimento comercial.</p>

<p><strong>2. A crise dos antibióticos.</strong> Com bactérias cada vez mais resistentes a antibióticos tradicionais, peptídeos antimicrobianos como o LL-37 ganharam atenção como alternativa. Eles matam bactérias por mecanismos completamente diferentes, dificultando o desenvolvimento de resistência.</p>

<p><strong>3. O sucesso estrondoso dos GLP-1s.</strong> Semaglutida (Ozempic/Wegovy) e tirzepatida (Mounjaro) transformaram o tratamento de obesidade e diabetes, gerando um mercado projetado em US$ 48 bilhões até 2030. Esse sucesso validou peptídeos como classe terapêutica e abriu as portas para investimento massivo em outras moléculas.</p>

<h2>Além do Ozempic</h2>

<p>Embora GLP-1s dominem as manchetes, o universo dos peptídeos é vastamente mais amplo:</p>

<ul>
<li><strong>Peptídeos mitocondriais</strong> (SS-31, MOTS-c) — atuam diretamente nas usinas de energia celular, com potencial para tratar doenças do envelhecimento na raiz</li>
<li><strong>Peptídeos de recuperação</strong> (BPC-157, TB-500) — pesquisados para cicatrização de tendões, músculos e tecidos, são os favoritos da comunidade atlética</li>
<li><strong>Peptídeos neurotróficos</strong> (Cerebrolysin, Dihexa, Selank) — focados em neuroproteção, cognição e saúde mental</li>
<li><strong>Peptídeos cosméticos</strong> (GHK-Cu) — com evidência real de estimulação de colágeno e regeneração da pele</li>
</ul>

<h2>O elefante na sala: regulamentação</h2>

<p>Aqui está o paradoxo dos peptídeos: a demanda é gigantesca, mas a regulamentação não acompanhou. Muitas dessas moléculas existem em uma zona cinza — não são aprovadas como medicamentos, mas são vendidas como "produtos de pesquisa". Isso cria riscos reais para consumidores que compram de fontes não regulamentadas.</p>

<p>O cenário regulatório muda com frequência, mas processos de avaliação de insumos para manipulação não equivalem a aprovação de medicamentos. No Brasil, cada produto, indicação e forma de fabricação deve ser verificado nas fontes oficiais da Anvisa.</p>

<h2>O que isso significa para você</h2>

<p>Peptídeos representam uma nova fronteira terapêutica real, não modismo. Mas é fundamental separar evidência de hype. Neste site, cada peptídeo é classificado por nível de evidência: comprovado, em pesquisa, ou não comprovado. Cada alegação é confrontada com a ciência disponível.</p>

<p>Antes de considerar qualquer peptídeo, consulte um médico. A ciência está avançando, mas de forma responsável — e seu cuidado com a saúde deve seguir o mesmo princípio.</p>
`,
  },
  {
    title: "ANVISA, FDA e peptídeos: o cenário regulatório em 2026",
    slug: "regulamentacao-peptideos-2026",
    excerpt:
      "As regras da Anvisa para GLP-1s, a expiração da patente da semaglutida e os limites das categorias de avaliação do FDA.",
    author: "Meus Peptídeos",
    tags: ["regulamentação", "ANVISA", "FDA", "Brasil"],
    content: `
<p>O cenário regulatório de peptídeos exige separar aprovação de medicamento, avaliação de insumo e regras de manipulação. Mudanças nos EUA não produzem autorização automática no Brasil.</p>

<h2>Como interpretar o processo do FDA</h2>

<p>O FDA mantém categorias de avaliação para substâncias indicadas ao processo da seção 503A. Category 1 não significa aprovação do FDA nem uma autorização irrestrita de manipulação. Trata-se de uma política de fiscalização sujeita a condições enquanto a substância é avaliada.</p>

<h2>O que está acontecendo no Brasil</h2>

<p>A ANVISA tem tomado medidas em duas frentes:</p>

<p><strong>Retenção de receita para GLP-1s:</strong> Desde 23 de junho de 2025, a dispensação de semaglutida, liraglutida, dulaglutida, exenatida, tirzepatida e lixisenatida exige retenção da receita médica.</p>

<p><strong>Regras de importação de APIs:</strong> Em agosto de 2025, a ANVISA estabeleceu regras estritas para importação de princípios ativos de GLP-1s. APIs de origem biotecnológica só podem ser importados se o fabricante tiver sido avaliado pela ANVISA. Isso visa garantir qualidade e rastreabilidade.</p>

<h2>A patente da semaglutida no Brasil</h2>

<p>A patente da semaglutida expira em 2026 no Brasil. Atualmente, existem 9 pedidos pendentes na ANVISA para versões genéricas ou biossimilares de semaglutida, e 7 para liraglutida. No entanto, a ANVISA processa apenas 3 solicitações por semestre, o que significa que o processo será gradual.</p>

<p>Quando os genéricos chegarem, o preço deve cair significativamente — atualmente, o Ozempic custa entre R$ 800 e R$ 1.200 por mês no Brasil.</p>

<h2>E os outros peptídeos?</h2>

<p>Para peptídeos como BPC-157, TB-500, Ipamorelin e outros populares na comunidade de biohacking, o cenário no Brasil é menos claro. Eles não são aprovados pela ANVISA, não são proibidos explicitamente, e são vendidos por importação pessoal ou farmácias de manipulação em uma área cinza regulatória.</p>

<p>A ausência de registro não autoriza manipulação ou uso. A situação deve ser verificada por substância, insumo, produto e finalidade nos canais oficiais.</p>

<h2>O que fazer enquanto isso?</h2>

<p>Se você tem interesse em peptídeos, o caminho responsável é:</p>

<ol>
<li><strong>Consulte um médico</strong> — preferencialmente um endocrinologista ou especialista em medicina funcional familiarizado com peptídeos</li>
<li><strong>Evite comprar online sem prescrição</strong> — produtos do mercado cinza frequentemente não passam por controle de qualidade</li>
<li><strong>Acompanhe a regulamentação</strong> — o cenário muda rapidamente. Este blog manterá você atualizado</li>
<li><strong>Verifique a evidência</strong> — nem todo peptídeo popular tem evidência sólida. Nossa base de dados classifica cada um por nível de comprovação</li>
</ol>
`,
  },
  {
    title: "Os 5 peptídeos mais promissores para os próximos anos",
    slug: "5-peptideos-mais-promissores",
    excerpt:
      "Além dos GLP-1s, quais peptídeos têm o maior potencial de se tornarem tratamentos aprovados? Analisamos a ciência, os estudos clínicos em andamento e o potencial de cada um.",
    author: "Meus Peptídeos",
    tags: ["pesquisa", "tendências", "ciência"],
    content: `
<p>Com a semaglutida e a tirzepatida dominando as manchetes, é fácil esquecer que dezenas de outros peptídeos estão em desenvolvimento. Analisamos os estudos clínicos em andamento e selecionamos os 5 com maior potencial de impacto nos próximos anos.</p>

<h2>1. SS-31 (Elamipretide) — O restaurador mitocondrial</h2>

<p><strong>Por que está nesta lista:</strong> É o único peptídeo em desenvolvimento que atua diretamente na mitocôndria — a usina de energia de todas as células. Se funcionar, pode tratar a causa raiz de muitas doenças do envelhecimento, não apenas os sintomas.</p>

<p><strong>Onde está:</strong> Fase 3 para síndrome de Barth (doença mitocondrial rara). Estudos de fase 2 para insuficiência cardíaca e miopatia mitocondrial. A Stealth BioTherapeutics está desenvolvendo.</p>

<p><strong>O desafio:</strong> O estudo PROGRESS-HF para insuficiência cardíaca não atingiu o endpoint primário, gerando dúvidas sobre a tradução da eficácia pré-clínica para benefício clínico real.</p>

<p><strong>Potencial:</strong> Se aprovado para doenças mitocondriais, abre portas para aplicações em envelhecimento, neurodegeneração e doenças metabólicas.</p>

<h2>2. MOTS-c — O peptídeo do exercício</h2>

<p><strong>Por que está nesta lista:</strong> É o primeiro hormônio peptídico codificado pelo DNA mitocondrial (não nuclear) a ser identificado. Mimetiza vias metabólicas ativadas pelo exercício físico.</p>

<p><strong>Onde está:</strong> Primeiro estudo clínico de fase 1 em humanos publicado em 2023, com resultados preliminares positivos para sensibilidade à insulina. Ainda em estágio inicial.</p>

<p><strong>O desafio:</strong> Dados humanos muito limitados (apenas 10 participantes no estudo de fase 1). Longo caminho até aprovação.</p>

<p><strong>Potencial:</strong> Se comprovado em estudos maiores, poderia ser revolucionário para diabetes tipo 2, obesidade e sarcopenia. A conexão com exercício físico — cujos benefícios são inegáveis — torna o mecanismo biologicamente plausível.</p>

<h2>3. Tesamorelin — Já aprovado e expandindo</h2>

<p><strong>Por que está nesta lista:</strong> Já aprovado pelo FDA para lipodistrofia em HIV, está sendo estudado para indicações muito maiores: esteatose hepática (fígado gorduroso) e declínio cognitivo.</p>

<p><strong>Onde está:</strong> Estudos clínicos em andamento para NAFLD/NASH (a "epidemia silenciosa" que afeta 25% da população mundial) e para comprometimento cognitivo leve.</p>

<p><strong>O desafio:</strong> Competição com GLP-1s que também mostram benefícios hepáticos. Administração por injeção diária.</p>

<p><strong>Potencial:</strong> Se aprovado para NASH, o mercado é enorme — não existe tratamento aprovado eficaz para a doença. Os resultados em cognição também são intrigantes.</p>

<h2>4. LL-37 — O antibiótico natural</h2>

<p><strong>Por que está nesta lista:</strong> Com bactérias cada vez mais resistentes a antibióticos, peptídeos antimicrobianos são uma alternativa real. LL-37 é o mais estudado da classe, com atividade comprovada contra bactérias, vírus e fungos.</p>

<p><strong>Onde está:</strong> Estudos de fase 1/2 para úlceras venosas crônicas. Desenvolvimento como agente tópico antimicrobiano.</p>

<p><strong>O desafio:</strong> Toxicidade em altas concentrações e custo de produção. Uso sistêmico (injetável) é mais difícil que tópico.</p>

<p><strong>Potencial:</strong> Aplicação em feridas infectadas, biofilmes bacterianos e infecções resistentes a antibióticos. Pode ser o início de uma nova classe terapêutica.</p>

<h2>5. KPV — O anti-inflamatório intestinal</h2>

<p><strong>Por que está nesta lista:</strong> Um tripeptídeo minúsculo (apenas 3 aminoácidos) com efeito anti-inflamatório potente e seletivo — inibe NF-κB sem causar imunossupressão.</p>

<p><strong>Onde está:</strong> Pré-clínico, mas com dados animais consistentes para colite e doenças inflamatórias intestinais.</p>

<p><strong>O desafio:</strong> Zero estudos em humanos publicados. Biodisponibilidade oral questionável para peptídeos.</p>

<p><strong>Potencial:</strong> Se comprovado em humanos, poderia oferecer uma alternativa aos imunossupressores pesados usados em Crohn e colite ulcerativa, com menos efeitos colaterais.</p>

<h2>Nota importante</h2>

<p>"Promissor" não significa "comprovado". Todos esses peptídeos estão em estágios diferentes de pesquisa, e muitos candidatos promissores falham em estudos clínicos avançados. A lista acima reflete potencial científico, não recomendação de uso.</p>
`,
  },
  {
    title: "Internet vs. ciência: 7 mitos sobre peptídeos que você precisa conhecer",
    slug: "mitos-sobre-peptideos",
    excerpt:
      "Peptídeos geram entusiasmo legítimo, mas também muita desinformação. Separamos as alegações mais comuns da internet da evidência científica real.",
    author: "Meus Peptídeos",
    tags: ["fact-check", "mitos", "educação"],
    content: `
<p>Redes sociais, fóruns e influenciadores de saúde fizeram mais para popularizar peptídeos do que décadas de pesquisa acadêmica. Isso trouxe atenção — mas também muita desinformação. Vamos analisar 7 alegações comuns sobre peptídeos e confrontá-las com a ciência.</p>

<h2>Mito 1: "BPC-157 cura qualquer lesão"</h2>

<p><strong>O que dizem:</strong> Comunidades online promovem BPC-157 como cura universal para lesões musculares, tendinosas, articulares e até neurológicas.</p>

<p><strong>A ciência:</strong> BPC-157 tem resultados impressionantes em modelos animais — cicatrização de tendões, proteção gástrica, regeneração tecidual. Mas existe um problema fundamental: <strong>zero ensaios clínicos em humanos foram publicados</strong>. Extrapolar resultados de ratos para humanos é cientificamente inadequado. Muitos compostos que funcionam em roedores falham em humanos.</p>

<p><strong>Veredicto:</strong> Promissor em animais, mas não comprovado em humanos.</p>

<h2>Mito 2: "Peptídeos são seguros porque são naturais"</h2>

<p><strong>O que dizem:</strong> Por serem derivados de proteínas do corpo humano, peptídeos são automaticamente seguros.</p>

<p><strong>A ciência:</strong> O fato de um peptídeo existir naturalmente no corpo não garante segurança em doses farmacológicas. A insulina é natural — e em dose errada, pode matar. Além disso, peptídeos sintéticos podem ter modificações que alteram seu perfil de segurança. E produtos vendidos como "para pesquisa" frequentemente não passam por controle de qualidade — contaminação e dosagem incorreta são riscos reais.</p>

<p><strong>Veredicto:</strong> Falso. Natural ≠ seguro em doses farmacológicas.</p>

<h2>Mito 3: "Ozempic emagrece 20kg sem esforço"</h2>

<p><strong>O que dizem:</strong> Toma semaglutida e perde 20kg sem dieta ou exercício.</p>

<p><strong>A ciência:</strong> Os estudos STEP mostram perda média de 15-17% do peso corporal (não 20kg fixos) em 68 semanas — <strong>combinando</strong> semaglutida com dieta hipocalórica e aconselhamento de estilo de vida. Sem mudanças comportamentais, o efeito é menor. E o estudo STEP 4 mostrou que dois terços do peso perdido é recuperado 1 ano após parar o medicamento.</p>

<p><strong>Veredicto:</strong> Parcialmente verdadeiro. Funciona, mas não é mágico e provavelmente requer uso contínuo.</p>

<h2>Mito 4: "Melanotan II é bronzeamento seguro"</h2>

<p><strong>O que dizem:</strong> MT-2 dá bronzeado perfeito sem risco de queimadura solar. Mais seguro que sol.</p>

<p><strong>A ciência:</strong> Melanotan II realmente causa bronzeamento ao estimular melanócitos. Mas <strong>não é seguro</strong>. Está associado ao aparecimento de nevos atípicos (pintas irregulares) e há risco teórico de melanoma. É proibido para venda na Europa e Austrália. A ANVISA não o aprova. Produtos vendidos online operam ilegalmente e frequentemente são contaminados.</p>

<p><strong>Veredicto:</strong> Falso. Funciona para bronzear, mas os riscos são significativos.</p>

<h2>Mito 5: "MOTS-c substitui exercício físico"</h2>

<p><strong>O que dizem:</strong> Chamado de "exercise in a pill" — toma e não precisa treinar.</p>

<p><strong>A ciência:</strong> MOTS-c ativa algumas vias metabólicas similares ao exercício (AMPK, captação de glicose muscular). Mas exercício físico tem benefícios que vão muito além do metabólico: cardiovascular, ósseo, mental, social, hormonal. Além disso, existe apenas 1 estudo de fase 1 em humanos publicado (10 participantes). Estamos muito longe de substituir exercício.</p>

<p><strong>Veredicto:</strong> Falso. Pode complementar, mas não substituir exercício.</p>

<h2>Mito 6: "Epithalon reverte o envelhecimento"</h2>

<p><strong>O que dizem:</strong> Epithalon alonga telômeros e reverte o relógio biológico. A fonte da juventude.</p>

<p><strong>A ciência:</strong> Epithalon ativa telomerase em laboratório — isso é documentado. Mas alongar telômeros não é sinônimo de reverter envelhecimento, que é um processo multifatorial. Quase toda a pesquisa vem de um único grupo na Rússia (Khavinson), sem replicação independente. E há um paradoxo: ativação de telomerase é uma característica de 85-90% dos cânceres humanos.</p>

<p><strong>Veredicto:</strong> Exagerado. Evidência pré-clínica interessante, mas longe de "reverter envelhecimento".</p>

<h2>Mito 7: "Dihexa é o nootrópico mais potente do mundo"</h2>

<p><strong>O que dizem:</strong> 10 milhões de vezes mais potente que BDNF — o superpeptídeo para o cérebro.</p>

<p><strong>A ciência:</strong> A potência in vitro (laboratório) de 10^7 vs BDNF é real e publicada. Mas potência in vitro ≠ eficácia clínica. Zero estudos em humanos. E talvez mais preocupante: Dihexa ativa a via HGF/c-Met, que é um oncogene conhecido. Usar um ativador de oncogene como nootrópico diário é uma aposta arriscada sem dados de segurança.</p>

<p><strong>Veredicto:</strong> Dado real usado fora de contexto. Potência ≠ eficácia ≠ segurança.</p>

<h2>A regra de ouro</h2>

<p>Quando encontrar uma alegação sobre peptídeos, pergunte:</p>

<ol>
<li><strong>Existem estudos em humanos?</strong> Resultados em ratos não se traduzem automaticamente.</li>
<li><strong>Os estudos são independentes?</strong> Pesquisa de um único grupo precisa ser replicada.</li>
<li><strong>Qual o tamanho da amostra?</strong> Estudos com 10 pessoas são exploratórios, não conclusivos.</li>
<li><strong>Quem está fazendo a alegação?</strong> Influenciadores vendendo peptídeos têm conflito de interesse.</li>
</ol>

<p>A ciência dos peptídeos é real e empolgante. Mas empolgação não substitui evidência.</p>
`,
  },
];

async function main() {
  console.log("Seeding blog posts...\n");

  for (const post of posts) {
    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        published: true,
        publishedAt: new Date(),
      },
      create: {
        ...post,
        published: true,
        publishedAt: new Date(),
      },
    });
    console.log(`  ✓ ${created.title}`);
  }

  const total = await prisma.blogPost.count();
  console.log(`\nDone! Total blog posts: ${total}`);
}

main()
  .then(() => { prisma.$disconnect(); pool.end(); })
  .catch((e) => { console.error(e); prisma.$disconnect(); pool.end(); process.exit(1); });

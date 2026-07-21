import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});
// @ts-expect-error — @types/pg version mismatch
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const peptides = [
  {
    name: "Semaglutida",
    slug: "semaglutida",
    aliases: ["Ozempic", "Wegovy", "Rybelsus"],
    category: "glp1" as const,
    description:
      "Agonista do receptor GLP-1 usado no tratamento de diabetes tipo 2 e obesidade. É o princípio ativo do Ozempic (injetável para diabetes) e Wegovy (injetável para obesidade). Um dos medicamentos mais prescritos e estudados da última década.",
    mechanism:
      "A semaglutida mimetiza o hormônio GLP-1 (peptídeo semelhante ao glucagon-1), que é liberado naturalmente pelo intestino após as refeições. Ela se liga aos receptores GLP-1 no pâncreas, estimulando a liberação de insulina e suprimindo o glucagon quando a glicose está elevada. No cérebro, atua nos centros de saciedade do hipotálamo, reduzindo o apetite. Também retarda o esvaziamento gástrico, prolongando a sensação de saciedade.",
    researchPhase: "approved" as const,
    anvisaStatus: "approved" as const,
    fdaStatus: "approved" as const,
    emaStatus: "approved" as const,
    benefits: [
      {
        name: "Perda de peso significativa",
        evidence: "proven",
        description:
          "Estudos STEP demonstraram perda média de 15-17% do peso corporal em 68 semanas com semaglutida 2.4mg.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
      },
      {
        name: "Controle glicêmico em diabetes tipo 2",
        evidence: "proven",
        description:
          "Redução média de 1.5-1.8% na HbA1c nos estudos SUSTAIN, superior a outros antidiabéticos.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/28930514/",
      },
      {
        name: "Redução de eventos cardiovasculares",
        evidence: "proven",
        description:
          "Estudo SELECT mostrou redução de 20% em eventos cardiovasculares maiores (MACE) em pacientes com obesidade sem diabetes.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/37952131/",
      },
      {
        name: "Neuroproteção / Alzheimer",
        evidence: "research",
        description:
          "Estudos pré-clínicos e fase 3 (EVOKE) investigam potencial neuroprotetor em Alzheimer. Resultados preliminares promissores mas não conclusivos.",
      },
    ],
    risks: [
      {
        name: "Náusea",
        severity: "medium",
        frequency: "40-44% dos pacientes",
        description:
          "Efeito colateral mais comum. Geralmente transitório, diminui com o tempo. Mais intenso nas primeiras semanas e durante aumento de dose.",
      },
      {
        name: "Diarreia",
        severity: "low",
        frequency: "30% dos pacientes",
        description:
          "Segundo efeito gastrointestinal mais comum. Geralmente leve a moderado.",
      },
      {
        name: "Pancreatite",
        severity: "high",
        frequency: "Raro (<1%)",
        description:
          "Risco pequeno mas grave de inflamação do pâncreas. Requer atenção médica imediata se ocorrer dor abdominal severa.",
      },
      {
        name: "Perda de massa muscular",
        severity: "medium",
        frequency: "Comum",
        description:
          "Parte do peso perdido pode ser massa magra (até 40% em alguns estudos). Exercício de resistência é recomendado durante o tratamento.",
      },
    ],
    internetVsScience: [
      {
        claim: "Emagrece 20kg sem esforço",
        whatTheySay:
          "Influenciadores promovem como solução mágica para emagrecer sem dieta ou exercício.",
        actualEvidence:
          "Estudos mostram perda média de 15-17% do peso corporal (ex: ~15kg para alguém de 100kg), mas com dieta e exercício combinados. Sem mudança de estilo de vida, efeito é menor.",
        verdict: "partial",
      },
      {
        claim: "Causa câncer de tireoide",
        whatTheySay:
          "Avisos na bula e posts em redes sociais geram medo sobre câncer de tireoide.",
        actualEvidence:
          "Tumores de tireoide foram observados em roedores, mas não em humanos nos estudos clínicos. O risco em humanos não foi confirmado, mas contraindica-se em pacientes com histórico de carcinoma medular da tireoide.",
        verdict: "unknown",
      },
      {
        claim: "Efeito rebote — recupera todo o peso",
        whatTheySay:
          "Ao parar o medicamento, você recupera todo o peso perdido.",
        actualEvidence:
          "Estudo STEP 4 mostrou que dois terços do peso perdido foi recuperado após 1 ano sem o medicamento. Manutenção de longo prazo provavelmente requer uso contínuo ou mudança significativa de estilo de vida.",
        verdict: "partial",
      },
    ],
    studies: [
      {
        title:
          "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)",
        authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
        journal: "New England Journal of Medicine",
        year: 2021,
        pubmedId: "33567185",
        doi: "10.1056/NEJMoa2032183",
        keyFindings:
          "Semaglutida 2.4mg resultou em perda média de 14.9% do peso corporal vs 2.4% com placebo em 68 semanas. 86.4% dos participantes perderam ≥5% do peso.",
        studyType: "rct" as const,
        sampleSize: 1961,
        url: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
      },
      {
        title:
          "Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes (SUSTAIN-6)",
        authors: "Marso SP, Bain SC, Consoli A, et al.",
        journal: "New England Journal of Medicine",
        year: 2016,
        pubmedId: "27633186",
        doi: "10.1056/NEJMoa1607141",
        keyFindings:
          "Semaglutida reduziu eventos cardiovasculares maiores em 26% comparado com placebo em pacientes com diabetes tipo 2 e alto risco cardiovascular.",
        studyType: "rct" as const,
        sampleSize: 3297,
        url: "https://pubmed.ncbi.nlm.nih.gov/27633186/",
      },
      {
        title:
          "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT)",
        authors: "Lincoff AM, Brown-Frandsen K, Colhoun HM, et al.",
        journal: "New England Journal of Medicine",
        year: 2023,
        pubmedId: "37952131",
        doi: "10.1056/NEJMoa2307563",
        keyFindings:
          "Em pacientes com obesidade sem diabetes, semaglutida 2.4mg reduziu eventos cardiovasculares maiores em 20% comparado com placebo ao longo de 40 meses.",
        studyType: "rct" as const,
        sampleSize: 17604,
        url: "https://pubmed.ncbi.nlm.nih.gov/37952131/",
      },
    ],
    faqs: [
      {
        question: "Semaglutida é aprovada no Brasil?",
        answer:
          "Sim. A ANVISA aprovou o Ozempic (semaglutida 0.25mg, 0.5mg e 1mg) para diabetes tipo 2 e o Wegovy (semaglutida 2.4mg) para obesidade. A prescrição médica é obrigatória.",
        order: 1,
      },
      {
        question: "Qual a diferença entre Ozempic e Wegovy?",
        answer:
          "Ambos contêm semaglutida, mas em doses diferentes. O Ozempic (até 1mg) é indicado para diabetes tipo 2. O Wegovy (2.4mg) é indicado especificamente para controle de peso em pacientes com obesidade ou sobrepeso com comorbidades.",
        order: 2,
      },
      {
        question: "Precisa de receita médica?",
        answer:
          "Sim. Desde abril de 2025, a ANVISA exige retenção de receita médica para a dispensação de semaglutida, liraglutida, tirzepatida e outros agonistas GLP-1.",
        order: 3,
      },
    ],
  },
  {
    name: "Tirzepatida",
    slug: "tirzepatida",
    aliases: ["Mounjaro", "Zepbound"],
    category: "glp1" as const,
    description:
      "Agonista duplo dos receptores GIP e GLP-1, representando uma nova classe de medicamentos para diabetes tipo 2 e obesidade. Demonstrou eficácia superior à semaglutida em alguns estudos de perda de peso.",
    mechanism:
      "A tirzepatida é única por ativar dois receptores de incretinas simultaneamente: GIP (polipeptídeo insulinotrópico dependente de glicose) e GLP-1. Esta ação dupla potencializa a secreção de insulina, suprime o glucagon, retarda o esvaziamento gástrico e reduz o apetite por ação nos centros de saciedade do cérebro. A ativação do receptor GIP adiciona benefícios metabólicos além do que o GLP-1 sozinho oferece.",
    researchPhase: "approved" as const,
    anvisaStatus: "pending" as const,
    fdaStatus: "approved" as const,
    emaStatus: "approved" as const,
    benefits: [
      {
        name: "Perda de peso superior",
        evidence: "proven",
        description:
          "Estudo SURMOUNT-1 demonstrou perda média de 22.5% do peso corporal com a dose mais alta (15mg) em 72 semanas — a maior já registrada com medicamento.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
      },
      {
        name: "Controle glicêmico potente",
        evidence: "proven",
        description:
          "Nos estudos SURPASS, reduziu HbA1c em até 2.4%, superior à semaglutida em comparação direta (SURPASS-2).",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/34170647/",
      },
      {
        name: "Melhora da apneia do sono",
        evidence: "proven",
        description:
          "Estudo SURMOUNT-OSA demonstrou redução significativa nos eventos de apneia por hora em pacientes com obesidade e apneia obstrutiva do sono.",
      },
    ],
    risks: [
      {
        name: "Náusea",
        severity: "medium",
        frequency: "25-33% dos pacientes",
        description: "Efeito gastrointestinal mais comum. Geralmente transitório e dose-dependente.",
      },
      {
        name: "Diarreia",
        severity: "low",
        frequency: "17-23% dos pacientes",
        description: "Segundo efeito gastrointestinal mais comum.",
      },
      {
        name: "Pancreatite",
        severity: "high",
        frequency: "Raro",
        description: "Risco semelhante à semaglutida. Requer monitoramento.",
      },
    ],
    internetVsScience: [
      {
        claim: "É melhor que Ozempic para emagrecer",
        whatTheySay: "Tirzepatida é o 'Ozempic turbinado', perde mais peso.",
        actualEvidence:
          "Comparações indiretas sugerem perda de peso maior com tirzepatida (22.5% vs 15-17%), mas não há estudo head-to-head publicado especificamente para obesidade. Em diabetes, SURPASS-2 mostrou superioridade.",
        verdict: "partial",
      },
    ],
    studies: [
      {
        title: "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)",
        authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
        journal: "New England Journal of Medicine",
        year: 2022,
        pubmedId: "35658024",
        doi: "10.1056/NEJMoa2206038",
        keyFindings:
          "Tirzepatida resultou em perda de peso de 15%, 19.5% e 22.5% nas doses de 5mg, 10mg e 15mg respectivamente, vs 3.1% com placebo em 72 semanas.",
        studyType: "rct" as const,
        sampleSize: 2539,
        url: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
      },
    ],
    faqs: [
      {
        question: "Tirzepatida está disponível no Brasil?",
        answer:
          "O Mounjaro (tirzepatida) está em processo de registro na ANVISA. Ainda não está oficialmente disponível para venda no Brasil, mas pode ser importado com receita médica em casos específicos.",
        order: 1,
      },
    ],
  },
  {
    name: "BPC-157",
    slug: "bpc-157",
    aliases: ["Body Protection Compound-157"],
    category: "healing" as const,
    description:
      "Peptídeo derivado de uma proteína encontrada no suco gástrico humano. Amplamente estudado em modelos animais para regeneração de tecidos, cicatrização e proteção gastrointestinal. Extremamente popular na comunidade de biohacking, mas sem estudos clínicos em humanos publicados.",
    mechanism:
      "O BPC-157 é um pentadecapeptídeo (15 aminoácidos) que parece atuar através de múltiplos mecanismos: estimula a angiogênese (formação de novos vasos sanguíneos), modula o sistema de óxido nítrico, interage com o sistema dopaminérgico e promove a expressão de fatores de crescimento. Em modelos animais, demonstrou acelerar a cicatrização de tendões, músculos, ossos, pele e mucosa gastrointestinal.",
    researchPhase: "preclinical" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "compounding_only" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Cicatrização de tendões e ligamentos",
        evidence: "research",
        description:
          "Múltiplos estudos em ratos demonstraram aceleração da cicatrização do tendão de Aquiles e ligamentos. Nenhum estudo em humanos publicado.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/21030672/",
      },
      {
        name: "Proteção gastrointestinal",
        evidence: "research",
        description:
          "Em modelos animais, protege contra úlceras gástricas, colite e danos intestinais causados por AINEs. Derivado de proteína gástrica natural.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/27847282/",
      },
      {
        name: "Cicatrização muscular",
        evidence: "research",
        description:
          "Estudos em ratos mostraram recuperação acelerada de lesões musculares. Resultados promissores mas limitados a modelos animais.",
      },
    ],
    risks: [
      {
        name: "Segurança desconhecida em humanos",
        severity: "high",
        frequency: "Desconhecido",
        description:
          "Sem ensaios clínicos em humanos publicados. O perfil de segurança é baseado apenas em estudos animais, que não são diretamente transferíveis para humanos.",
      },
      {
        name: "Contaminação de produtos",
        severity: "high",
        frequency: "Variável",
        description:
          "Produtos vendidos como 'research chemicals' frequentemente não passam por controle de qualidade rigoroso. Risco de contaminação, dosagem incorreta ou adulteração.",
      },
    ],
    internetVsScience: [
      {
        claim: "Cura qualquer lesão",
        whatTheySay:
          "Comunidades online promovem BPC-157 como cura universal para lesões musculares, tendinosas, articulares e até cerebrais.",
        actualEvidence:
          "Resultados em animais são promissores para cicatrização, mas ZERO estudos clínicos em humanos foram publicados. Extrapolar resultados de ratos para humanos é cientificamente inadequado.",
        verdict: "unknown",
      },
      {
        claim: "É completamente seguro porque é natural",
        whatTheySay:
          "Por ser derivado de uma proteína do estômago humano, é considerado seguro por influenciadores.",
        actualEvidence:
          "O fato de ser derivado de proteína humana não garante segurança. Muitos peptídeos naturais podem ter efeitos inesperados em doses farmacológicas. Sem estudos de segurança em humanos, é impossível afirmar que é seguro.",
        verdict: "false",
      },
    ],
    studies: [
      {
        title:
          "Pentadecapeptide BPC 157 and its Effects on a NSAID-Induced Lesion Model",
        authors: "Sikiric P, Seiwerth S, Rucman R, et al.",
        journal: "Journal of Physiology and Pharmacology",
        year: 2016,
        pubmedId: "27847282",
        keyFindings:
          "Revisão abrangente dos efeitos do BPC-157 em modelos animais de lesões gastrointestinais, musculoesqueléticas e neurológicas. Todos os estudos em animais.",
        studyType: "review" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/27847282/",
      },
    ],
    faqs: [
      {
        question: "BPC-157 é legal no Brasil?",
        answer:
          "O BPC-157 não é um medicamento aprovado pela ANVISA. Não existe regulamentação específica para seu uso terapêutico no Brasil. Produtos vendidos como 'para pesquisa' operam em uma área cinza regulatória.",
        order: 1,
      },
      {
        question: "Por que não existem estudos em humanos?",
        answer:
          "Ensaios clínicos em humanos são caros e complexos. Como o BPC-157 é um peptídeo natural que não pode ser facilmente patenteado, há pouco incentivo econômico para empresas farmacêuticas investirem em estudos clínicos de fase 1-3.",
        order: 2,
      },
    ],
  },
  {
    name: "TB-500",
    slug: "tb-500",
    aliases: ["Timosina Beta-4", "Thymosin Beta-4"],
    category: "healing" as const,
    description:
      "Versão sintética da timosina beta-4, uma proteína naturalmente presente em quase todas as células do corpo humano. Pesquisado por seus efeitos na cicatrização de tecidos, redução de inflamação e regeneração celular. Popular entre atletas, mas com evidência clínica limitada.",
    mechanism:
      "A timosina beta-4 é uma proteína de 43 aminoácidos que regula a actina, componente essencial do citoesqueleto celular. Ela promove a migração celular, formação de novos vasos sanguíneos e reduz a inflamação. Também regula a expressão de genes envolvidos na reparação tecidual.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "compounding_only" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Cicatrização de feridas",
        evidence: "research",
        description:
          "Estudos clínicos de fase 2 em úlceras cutâneas mostraram resultados promissores. RegeneRx Biopharmaceuticals conduziu trials para úlceras dérmicas.",
      },
      {
        name: "Regeneração cardíaca",
        evidence: "research",
        description:
          "Estudos pré-clínicos demonstraram que TB-4 pode ativar células progenitoras cardíacas e promover regeneração após infarto em modelos animais.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/17379776/",
      },
    ],
    risks: [
      {
        name: "Dados de segurança limitados",
        severity: "medium",
        frequency: "Desconhecido",
        description:
          "Poucos estudos clínicos em humanos completados. Perfil de segurança de longo prazo desconhecido.",
      },
    ],
    internetVsScience: [
      {
        claim: "Recupera lesões esportivas em dias",
        whatTheySay:
          "Atletas relatam recuperação dramática de lesões musculares e tendinosas.",
        actualEvidence:
          "Evidência em animais apoia efeito cicatrizante, mas não há estudos clínicos confirmando eficácia em lesões esportivas em humanos. Relatos anedóticos não são evidência científica.",
        verdict: "unknown",
      },
    ],
    studies: [
      {
        title: "Thymosin β4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair",
        authors: "Bock-Marquette I, Saxena A, White MD, et al.",
        journal: "Nature",
        year: 2004,
        pubmedId: "15496926",
        doi: "10.1038/nature02943",
        keyFindings:
          "Demonstrou que TB-4 promove sobrevivência de cardiomiócitos e regeneração cardíaca em camundongos após infarto do miocárdio.",
        studyType: "animal" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/15496926/",
      },
    ],
    faqs: [
      {
        question: "Qual a diferença entre TB-500 e Timosina Beta-4?",
        answer:
          "TB-500 é o nome comercial para uma versão sintética de um fragmento da timosina beta-4. A molécula não é idêntica à timosina beta-4 completa, embora compartilhe a região ativa responsável pelos efeitos biológicos.",
        order: 1,
      },
    ],
  },
  {
    name: "GHK-Cu",
    slug: "ghk-cu",
    aliases: ["Cobre-Peptídeo GHK", "GHK-Copper"],
    category: "cosmetic" as const,
    description:
      "Tripeptídeo naturalmente presente no plasma sanguíneo que se liga ao cobre. Pesquisado extensivamente por seus efeitos anti-aging na pele, incluindo estimulação de colágeno, cicatrização e redução de rugas. Um dos poucos peptídeos com aplicação tópica bem estudada.",
    mechanism:
      "GHK-Cu (glicil-L-histidil-L-lisina cobre) é encontrado naturalmente no sangue humano, mas seus níveis diminuem com a idade. O complexo cobre-peptídeo ativa genes envolvidos na síntese de colágeno, elastina e glicosaminoglicanos. Também tem efeitos antioxidantes, anti-inflamatórios e estimula a remodelação da matriz extracelular.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "compounding_only" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Estimulação de colágeno",
        evidence: "proven",
        description:
          "Múltiplos estudos in vitro e clínicos confirmam aumento na produção de colágeno tipo I e III quando aplicado topicamente.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/25927227/",
      },
      {
        name: "Redução de rugas e linhas finas",
        evidence: "research",
        description:
          "Estudos clínicos pequenos demonstraram melhora na textura da pele e redução de rugas após uso tópico de cremes com GHK-Cu.",
      },
      {
        name: "Cicatrização de feridas",
        evidence: "research",
        description:
          "Evidência de aceleração da cicatrização em estudos animais e pequenos estudos clínicos.",
      },
    ],
    risks: [
      {
        name: "Irritação cutânea",
        severity: "low",
        frequency: "Incomum",
        description: "Pode causar irritação leve em peles sensíveis quando usado topicamente.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reverte o envelhecimento",
        whatTheySay:
          "Promovido como 'anti-aging milagroso' que reverte anos de envelhecimento da pele.",
        actualEvidence:
          "Melhora comprovada na qualidade da pele e colágeno, mas não 'reverte' o envelhecimento. Efeitos são modestos e graduais. Uso tópico tem mais evidência que injetável.",
        verdict: "partial",
      },
    ],
    studies: [
      {
        title: "GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration",
        authors: "Pickart L, Vasquez-Soltero JM, Margolina A",
        journal: "BioMed Research International",
        year: 2015,
        pubmedId: "25927227",
        doi: "10.1155/2015/648108",
        keyFindings:
          "Revisão abrangente demonstrando que GHK-Cu modula mais de 4.000 genes, estimulando regeneração da pele, síntese de colágeno e efeitos anti-inflamatórios.",
        studyType: "review" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/25927227/",
      },
    ],
    faqs: [
      {
        question: "GHK-Cu funciona melhor tópico ou injetável?",
        answer:
          "A maioria dos estudos clínicos usou GHK-Cu em formulações tópicas (cremes e séruns). A aplicação tópica tem mais evidência científica que a injetável para efeitos na pele.",
        order: 1,
      },
    ],
  },
  {
    name: "Ipamorelin",
    slug: "ipamorelin",
    aliases: [],
    category: "growth_hormone" as const,
    description:
      "Peptídeo secretagogo de hormônio de crescimento (GH) que estimula a liberação de GH pela hipófise. Considerado um dos secretagogos mais seletivos, com menos efeitos colaterais que outros da mesma classe. Frequentemente combinado com CJC-1295.",
    mechanism:
      "O ipamorelin é um pentapeptídeo que atua como agonista do receptor de grelina (GHSR) na hipófise anterior, estimulando a liberação pulsátil de hormônio de crescimento. Diferente de outros secretagogos, não afeta significativamente os níveis de cortisol ou prolactina, tornando-o mais seletivo.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "compounding_only" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Aumento de GH",
        evidence: "proven",
        description:
          "Estudos clínicos confirmam aumento dose-dependente na liberação de hormônio de crescimento em humanos saudáveis.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
      },
      {
        name: "Seletividade (menos efeitos colaterais)",
        evidence: "research",
        description:
          "Não eleva cortisol ou prolactina significativamente, diferente de outros secretagogos como GHRP-6.",
      },
    ],
    risks: [
      {
        name: "Dor de cabeça",
        severity: "low",
        frequency: "Comum",
        description: "Efeito colateral relatado com frequência em estudos clínicos.",
      },
      {
        name: "Retenção hídrica",
        severity: "low",
        frequency: "Variável",
        description: "Pode ocorrer inchaço leve devido ao aumento de GH.",
      },
    ],
    internetVsScience: [
      {
        claim: "Substitui injeções de HGH",
        whatTheySay:
          "Promovido como alternativa mais segura e barata ao hormônio de crescimento sintético.",
        actualEvidence:
          "Estimula liberação natural de GH, mas os níveis atingidos são significativamente menores que com HGH exógeno. Não é equivalente.",
        verdict: "partial",
      },
    ],
    studies: [
      {
        title: "Ipamorelin, a new growth-hormone-releasing peptide/compound",
        authors: "Raun K, Hansen BS, Johansen NL, et al.",
        journal: "European Journal of Endocrinology",
        year: 1998,
        pubmedId: "9849822",
        keyFindings:
          "Primeiro estudo detalhando a farmacologia do ipamorelin. Demonstrou liberação seletiva de GH sem afetar ACTH, cortisol, prolactina ou FSH/LH.",
        studyType: "rct" as const,
        sampleSize: 12,
        url: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
      },
    ],
    faqs: [],
  },
  {
    name: "CJC-1295",
    slug: "cjc-1295",
    aliases: ["CJC-1295 DAC", "Modified GRF 1-29"],
    category: "growth_hormone" as const,
    description:
      "Análogo sintético do hormônio liberador de hormônio de crescimento (GHRH) com meia-vida prolongada. Frequentemente combinado com ipamorelin para potencializar a liberação de GH. Disponível em versões com e sem DAC (Drug Affinity Complex).",
    mechanism:
      "CJC-1295 mimetiza o GHRH natural, ligando-se aos receptores na hipófise anterior para estimular a síntese e liberação de hormônio de crescimento. A versão com DAC se liga à albumina sérica, estendendo a meia-vida de minutos para dias. Amplifica os pulsos naturais de GH sem suprimir o eixo hipotálamo-hipófise.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "compounding_only" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Aumento sustentado de GH e IGF-1",
        evidence: "proven",
        description:
          "Estudo em humanos demonstrou aumento de 2-10x nos níveis de GH e aumento de 1.5-3x nos níveis de IGF-1 após dose única.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
    ],
    risks: [
      {
        name: "Reação no local da injeção",
        severity: "low",
        frequency: "Comum",
        description: "Vermelhidão, inchaço ou dor no local da injeção subcutânea.",
      },
      {
        name: "Retenção hídrica",
        severity: "low",
        frequency: "Variável",
        description: "Edema leve pode ocorrer, relacionado ao aumento de GH/IGF-1.",
      },
    ],
    internetVsScience: [],
    studies: [
      {
        title: "Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295",
        authors: "Teichman SL, Neale A, Lawrence B, et al.",
        journal: "Journal of Clinical Endocrinology & Metabolism",
        year: 2006,
        pubmedId: "16352683",
        doi: "10.1210/jc.2005-1536",
        keyFindings:
          "Dose única de CJC-1295 resultou em aumento sustentado de GH por até 6 dias e aumento de IGF-1 por até 14 dias em adultos saudáveis.",
        studyType: "rct" as const,
        sampleSize: 33,
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
      },
    ],
    faqs: [],
  },
  {
    name: "Thymosin Alpha-1",
    slug: "thymosin-alpha-1",
    aliases: ["Tα1", "Zadaxin"],
    category: "immune" as const,
    description:
      "Peptídeo imunomodulador naturalmente produzido pelo timo. Aprovado como medicamento em mais de 30 países (não nos EUA) para hepatite B e C, imunodeficiências e como adjuvante de vacinas. Um dos peptídeos com mais evidência clínica fora do GLP-1.",
    mechanism:
      "Thymosin alpha-1 modula o sistema imunológico estimulando a maturação de células T, a atividade de células NK (natural killer) e a produção de citocinas. Também estimula células dendríticas e macrófagos, melhorando tanto a imunidade inata quanto a adaptativa.",
    researchPhase: "approved" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "compounding_only" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Tratamento de hepatite B crônica",
        evidence: "proven",
        description:
          "Aprovado em mais de 30 países para hepatite B. Meta-análises confirmam eficácia na supressão viral e soroconversão.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/19040578/",
      },
      {
        name: "Imunomodulação",
        evidence: "proven",
        description:
          "Estimulação documentada de células T, NK e resposta imune adaptativa em múltiplos estudos clínicos.",
      },
      {
        name: "Adjuvante de vacinas",
        evidence: "research",
        description:
          "Estudos clínicos mostram potencialização da resposta imune quando administrado junto com vacinas, especialmente em imunocomprometidos.",
      },
    ],
    risks: [
      {
        name: "Dor no local da injeção",
        severity: "low",
        frequency: "Comum",
        description: "Efeito colateral mais relatado. Geralmente leve e transitório.",
      },
    ],
    internetVsScience: [
      {
        claim: "Previne todas as doenças imunológicas",
        whatTheySay:
          "Promovido como 'super boost' para o sistema imunológico que previne tudo.",
        actualEvidence:
          "É um imunomodulador comprovado, mas não previne todas as doenças. Eficácia principal é em hepatite e como adjuvante. Não é uma 'cura' universal para problemas imunológicos.",
        verdict: "partial",
      },
    ],
    studies: [
      {
        title: "Thymalfasin (thymosin-α1) in the treatment of hepatitis B",
        authors: "Andreone P, Cursaro C, Gramenzi A, et al.",
        journal: "Expert Opinion on Pharmacotherapy",
        year: 2008,
        pubmedId: "19040578",
        doi: "10.1517/14656560802609828",
        keyFindings:
          "Revisão demonstrando eficácia da thymosin alpha-1 na hepatite B crônica, com taxas de soroconversão superiores ao interferon em alguns estudos.",
        studyType: "review" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/19040578/",
      },
    ],
    faqs: [
      {
        question: "Por que não é aprovado nos EUA/Brasil?",
        answer:
          "O Zadaxin (thymosin alpha-1) tem aprovações em alguns países, mas não é aprovado pelo FDA e não foi identificado registro na Anvisa. Uma categoria de avaliação de insumos para manipulação nos EUA não equivale a aprovação nem autoriza uso no Brasil.",
        order: 1,
      },
    ],
  },
  {
    name: "AOD-9604",
    slug: "aod-9604",
    aliases: ["Anti-Obesity Drug 9604"],
    category: "performance" as const,
    description:
      "Fragmento modificado do hormônio de crescimento humano (aminoácidos 177-191) desenvolvido especificamente para efeito lipolítico (queima de gordura) sem os efeitos colaterais do HGH completo. Aprovado na Austrália como suplemento alimentar.",
    mechanism:
      "AOD-9604 corresponde à região C-terminal do hormônio de crescimento, que é responsável pelo efeito lipolítico. Estimula a lipólise (quebra de gordura) e inibe a lipogênese (formação de gordura) sem afetar os níveis de IGF-1 ou causar resistência à insulina — diferente do HGH completo.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "compounding_only" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Efeito lipolítico",
        evidence: "research",
        description:
          "Estudos em animais e fase 2 em humanos demonstraram efeito na redução de gordura, mas resultados clínicos em humanos foram modestos.",
      },
      {
        name: "Sem efeitos no IGF-1",
        evidence: "proven",
        description:
          "Diferente do HGH, não aumenta IGF-1 nem causa resistência à insulina, o que reduz o perfil de risco.",
      },
    ],
    risks: [
      {
        name: "Eficácia incerta",
        severity: "low",
        frequency: "N/A",
        description:
          "O estudo de fase 2b em humanos obesos não atingiu o endpoint primário de perda de peso significativa. A eficácia como agente anti-obesidade é questionável.",
      },
    ],
    internetVsScience: [
      {
        claim: "Queima gordura sem dieta",
        whatTheySay:
          "Promovido como peptídeo que elimina gordura abdominal sem necessidade de dieta ou exercício.",
        actualEvidence:
          "Estudos clínicos em humanos mostraram resultados modestos. O estudo de fase 2b falhou em demonstrar perda de peso clinicamente significativa. Muito inferior à semaglutida/tirzepatida.",
        verdict: "false",
      },
    ],
    studies: [],
    faqs: [],
  },
  {
    name: "Selank",
    slug: "selank",
    aliases: ["TP-7"],
    category: "neuroprotective" as const,
    description:
      "Peptídeo ansiolítico e nootrópico desenvolvido na Rússia pelo Instituto de Genética Molecular da Academia Russa de Ciências. Aprovado na Rússia como medicamento para ansiedade e neuroastenia. Análogo sintético da tuftsina, um peptídeo imunomodulador natural.",
    mechanism:
      "Selank é um heptapeptídeo análogo da tuftsina com adição de uma sequência estabilizadora. Modula o sistema GABAérgico, serotoninérgico e dopaminérgico. Influencia a expressão de BDNF (fator neurotrófico derivado do cérebro) e a encefalinase. Tem efeito ansiolítico sem sedação ou dependência, diferente dos benzodiazepínicos.",
    researchPhase: "approved" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "compounding_only" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Efeito ansiolítico",
        evidence: "proven",
        description:
          "Aprovado na Rússia para tratamento de ansiedade. Estudos clínicos russos demonstraram eficácia comparável a benzodiazepínicos sem efeitos sedativos.",
      },
      {
        name: "Melhora cognitiva",
        evidence: "research",
        description:
          "Estudos em animais e alguns clínicos sugerem melhora na memória e concentração. Aumenta expressão de BDNF.",
      },
      {
        name: "Imunomodulação",
        evidence: "research",
        description:
          "Como análogo da tuftsina, tem propriedades imunomoduladoras documentadas em estudos pré-clínicos.",
      },
    ],
    risks: [
      {
        name: "Estudos majoritariamente russos",
        severity: "medium",
        frequency: "N/A",
        description:
          "A maioria dos estudos clínicos foi conduzida na Rússia, com limitações metodológicas e publicação em journals russos. Faltam estudos replicados internacionalmente.",
      },
    ],
    internetVsScience: [
      {
        claim: "Substitui ansiolíticos sem efeitos colaterais",
        whatTheySay:
          "Promovido como alternativa natural aos benzodiazepínicos sem risco de dependência.",
        actualEvidence:
          "Aprovado na Rússia como ansiolítico sem sedação, mas estudos foram conduzidos com padrões diferentes dos ocidentais. A alegação de zero efeitos colaterais é exagerada. Não é aprovado pelo FDA ou EMA.",
        verdict: "partial",
      },
    ],
    studies: [],
    faqs: [
      {
        question: "Selank é aprovado em algum país?",
        answer:
          "Sim, o Selank é aprovado na Rússia como medicamento para ansiedade generalizada e neuroastenia, comercializado como spray nasal. Não é aprovado nos EUA, Europa ou Brasil.",
        order: 1,
      },
    ],
  },
];

async function main() {
  console.log("Seeding peptides...");

  for (const data of peptides) {
    const { studies, faqs, ...peptideData } = data;

    const peptide = await prisma.peptide.upsert({
      where: { slug: peptideData.slug },
      update: {
        ...peptideData,
        published: true,
        publishedAt: new Date(),
      },
      create: {
        ...peptideData,
        published: true,
        publishedAt: new Date(),
      },
    });

    console.log(`  ✓ ${peptide.name}`);

    // Upsert studies
    for (const study of studies) {
      await prisma.study.create({
        data: {
          ...study,
          peptideId: peptide.id,
        },
      });
    }
    if (studies.length > 0) {
      console.log(`    + ${studies.length} studies`);
    }

    // Upsert FAQs
    for (const faq of faqs) {
      await prisma.peptideFaq.create({
        data: {
          ...faq,
          peptideId: peptide.id,
        },
      });
    }
    if (faqs.length > 0) {
      console.log(`    + ${faqs.length} FAQs`);
    }
  }

  console.log("\nDone! Seeded", peptides.length, "peptides.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

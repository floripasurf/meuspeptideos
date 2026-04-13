import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const peptide = await prisma.peptide.upsert({
    where: { slug: "retatrutida" },
    update: {},
    create: {
      name: "Retatrutida",
      slug: "retatrutida",
      aliases: ["Retatrutide", "LY3437943", "GGG agonista triplo"],
      category: "glp1",
      description:
        "Agonista triplo dos receptores GIP, GLP-1 e glucagon desenvolvido pela Eli Lilly. É o primeiro da sua classe a atuar nos três receptores simultaneamente, resultando em perda de peso superior a qualquer outro medicamento em estudos clínicos até o momento — até 24% do peso corporal em 48 semanas.",
      mechanism:
        "A retatrutida ativa três receptores hormonais simultaneamente: GLP-1 (suprime apetite e estimula insulina), GIP (potencializa o efeito do GLP-1 e melhora metabolismo lipídico) e glucagon (aumenta gasto energético e promove lipólise hepática). Essa ação tripla cria um efeito sinérgico: o GLP-1 reduz a ingestão calórica, o glucagon acelera a queima de gordura e o GIP amplifica ambos os efeitos. O resultado é uma perda de peso significativamente maior que agonistas simples (semaglutida) ou duplos (tirzepatida).",
      researchPhase: "phase3",
      anvisaStatus: "not_regulated",
      fdaStatus: "pending",
      emaStatus: "pending",
      benefits: [
        {
          name: "Perda de peso recorde",
          evidence: "proven",
          description:
            "No estudo TRIUMPH-2, participantes perderam até 24,2% do peso corporal em 48 semanas com a dose de 12 mg — a maior perda de peso já registrada em ensaios clínicos para obesidade.",
          studyUrl: "https://pubmed.ncbi.nlm.nih.gov/37385275/",
        },
        {
          name: "Redução de gordura hepática (MASLD/NASH)",
          evidence: "proven",
          description:
            "Reduziu gordura hepática em até 86% em pacientes com esteatose hepática. 93% dos pacientes alcançaram resolução completa da esteatose na dose mais alta.",
          studyUrl: "https://pubmed.ncbi.nlm.nih.gov/38587239/",
        },
        {
          name: "Melhora de apneia obstrutiva do sono",
          evidence: "research",
          description:
            "Estudos fase 3 em andamento (TRIUMPH-3) investigam eficácia em apneia do sono associada à obesidade. Resultados preliminares positivos pela redução significativa de peso.",
        },
        {
          name: "Controle glicêmico em diabetes tipo 2",
          evidence: "proven",
          description:
            "Reduziu HbA1c em até 2,2% em 36 semanas no estudo TRIUMPH-1, com 78% dos pacientes atingindo HbA1c < 5,7% (faixa não-diabética).",
          studyUrl: "https://pubmed.ncbi.nlm.nih.gov/38587240/",
        },
        {
          name: "Melhora do perfil lipídico",
          evidence: "proven",
          description:
            "Redução significativa de triglicerídeos (-30 a -50%), LDL e VLDL. Aumento modesto de HDL. Benefício cardiovascular em investigação.",
        },
      ],
      risks: [
        {
          name: "Náusea",
          severity: "medium",
          frequency: "43-50% dos pacientes",
          description:
            "Efeito colateral mais frequente, principalmente durante titulação. Geralmente transitório e diminui após as primeiras semanas em cada dose.",
        },
        {
          name: "Diarreia",
          severity: "low",
          frequency: "25-35% dos pacientes",
          description:
            "Segundo efeito gastrointestinal mais comum. Geralmente leve a moderado, resolve espontaneamente.",
        },
        {
          name: "Vômitos",
          severity: "medium",
          frequency: "15-20% dos pacientes",
          description:
            "Mais comum nas fases de titulação. Reduzido com titulação lenta e refeições menores.",
        },
        {
          name: "Aumento da frequência cardíaca",
          severity: "medium",
          frequency: "~10% dos pacientes",
          description:
            "Aumento médio de 2-4 bpm observado nos estudos. Efeito do componente glucagon. Significância clínica ainda sendo avaliada em estudos de desfechos cardiovasculares.",
        },
        {
          name: "Pancreatite",
          severity: "high",
          frequency: "Raro (<1%)",
          description:
            "Risco de classe dos agonistas GLP-1. Casos raros reportados. Suspender imediatamente se houver dor abdominal severa persistente.",
        },
        {
          name: "Perda de massa muscular",
          severity: "medium",
          frequency: "Comum com perda de peso rápida",
          description:
            "Perda de peso acentuada pode incluir massa magra. Exercício de resistência e ingestão proteica adequada são recomendados para mitigar.",
        },
      ],
      internetVsScience: [
        {
          claim: "Retatrutida faz perder 25% do peso",
          whatTheySay:
            "É o emagrecedor mais potente já criado, quase tão eficaz quanto cirurgia bariátrica.",
          actualEvidence:
            "A perda máxima média foi de 24,2% em 48 semanas (dose 12 mg). É de fato a maior perda de peso em ensaios clínicos, mas resultados individuais variam (5-35%). A cirurgia bariátrica resulta em ~25-30% de perda, então a comparação é plausível.",
          verdict: "partial",
        },
        {
          claim: "É melhor que Ozempic e Mounjaro",
          whatTheySay:
            "Retatrutida é claramente superior a semaglutida e tirzepatida porque atua em 3 receptores.",
          actualEvidence:
            "Em estudos não comparativos (head-to-head), a perda de peso com retatrutida 12 mg (~24%) superou os resultados históricos da semaglutida 2.4 mg (~16%) e tirzepatida 15 mg (~21%). Porém, não há estudo comparativo direto (head-to-head). A comparação entre estudos diferentes tem limitações metodológicas.",
          verdict: "partial",
        },
        {
          claim: "Já está disponível para compra",
          whatTheySay:
            "Dá pra comprar retatrutida em farmácias de manipulação ou fornecedores de pesquisa.",
          actualEvidence:
            "Retatrutida ainda está em fase 3 de ensaios clínicos. NÃO foi aprovada pelo FDA, EMA ou ANVISA. Qualquer venda é ilegal e não regulamentada. Produtos vendidos como 'retatrutide research chemical' não têm garantia de pureza ou dosagem.",
          verdict: "false",
        },
        {
          claim: "Cura diabetes e esteatose hepática",
          whatTheySay:
            "Retatrutida reverte completamente diabetes tipo 2 e elimina gordura do fígado.",
          actualEvidence:
            "Os dados são impressionantes: 78% dos pacientes com DM2 atingiram HbA1c não-diabética, e 93% tiveram resolução da esteatose hepática. Mas 'cura' é impreciso — os efeitos dependem do uso contínuo. Não há dados de longo prazo sobre durabilidade após descontinuação.",
          verdict: "partial",
        },
      ],
      published: true,
      publishedAt: new Date(),
    },
  });

  // Add studies
  const studies = [
    {
      title: "Retatrutide once weekly for treatment of obesity: a phase 2, randomised, double-blind, multicentre, placebo-controlled trial",
      authors: "Jastreboff AM, Kaplan LM, Frías JP, et al.",
      journal: "The Lancet",
      year: 2023,
      pubmedId: "37385275",
      doi: "10.1016/S0140-6736(23)01053-X",
      keyFindings: "Perda de peso dose-dependente de até 24,2% em 48 semanas com retatrutida 12 mg (n=338). Efeitos colaterais predominantemente gastrointestinais. Primeiro estudo a demonstrar que agonismo triplo (GIP/GLP-1/glucagon) resulta em perda de peso significativamente maior que agentes anteriores.",
      studyType: "rct" as const,
      sampleSize: 338,
      url: "https://pubmed.ncbi.nlm.nih.gov/37385275/",
    },
    {
      title: "Efficacy and safety of retatrutide in people with type 2 diabetes (TRIUMPH-1): a phase 2 trial",
      authors: "Rosenstock J, Frias J, Jastreboff AM, et al.",
      journal: "The Lancet",
      year: 2024,
      pubmedId: "38587240",
      doi: "10.1016/S0140-6736(24)00621-7",
      keyFindings: "Redução de HbA1c de até 2,2% e perda de peso de até 16,9% em pacientes com DM2 em 36 semanas. 78% dos pacientes na dose mais alta atingiram HbA1c < 5,7%. Perfil de segurança consistente com a classe.",
      studyType: "rct" as const,
      sampleSize: 281,
      url: "https://pubmed.ncbi.nlm.nih.gov/38587240/",
    },
    {
      title: "Retatrutide for MASLD and raised liver stiffness: a phase 2 trial",
      authors: "Sanyal AJ, Kaplan LM, Frias JP, et al.",
      journal: "The Lancet",
      year: 2024,
      pubmedId: "38587239",
      doi: "10.1016/S0140-6736(24)00620-5",
      keyFindings: "Redução de gordura hepática de até 86% em 48 semanas. 93% dos pacientes na dose 12 mg alcançaram resolução completa da esteatose (< 5% de gordura hepática por ressonância magnética). Melhora significativa dos marcadores de fibrose.",
      studyType: "rct" as const,
      sampleSize: 163,
      url: "https://pubmed.ncbi.nlm.nih.gov/38587239/",
    },
    {
      title: "Triple-hormone-receptor agonist retatrutide for obesity — A phase 2 trial",
      authors: "Jastreboff AM, Kaplan LM, Frías JP, et al.",
      journal: "New England Journal of Medicine",
      year: 2023,
      pubmedId: "37351564",
      doi: "10.1056/NEJMoa2301972",
      keyFindings: "Análise complementar do estudo fase 2 publicada no NEJM. Confirmou perda de peso superior a semaglutida e tirzepatida em comparações indiretas. Redução de circunferência abdominal de até 14,5 cm.",
      studyType: "rct" as const,
      sampleSize: 338,
      url: "https://pubmed.ncbi.nlm.nih.gov/37351564/",
    },
  ];

  for (const study of studies) {
    await prisma.study.create({
      data: {
        ...study,
        peptideId: peptide.id,
      },
    });
  }

  // Add FAQs
  const faqs = [
    {
      question: "Quando a retatrutida será aprovada?",
      answer: "A Eli Lilly está conduzindo estudos fase 3 (programa TRIUMPH) com resultados esperados entre 2025-2026. A submissão ao FDA provavelmente ocorrerá em 2026, com aprovação possível em 2027. No Brasil, a aprovação pela ANVISA geralmente leva 12-18 meses adicionais após o FDA.",
      order: 1,
    },
    {
      question: "Qual a diferença entre retatrutida, semaglutida e tirzepatida?",
      answer: "Semaglutida (Ozempic) atua em 1 receptor (GLP-1). Tirzepatida (Mounjaro) atua em 2 receptores (GIP + GLP-1). Retatrutida atua em 3 receptores (GIP + GLP-1 + glucagon). Cada receptor adicional potencializa o efeito: ~16% de perda de peso com semaglutida, ~21% com tirzepatida, ~24% com retatrutida.",
      order: 2,
    },
    {
      question: "Posso comprar retatrutida agora?",
      answer: "Não. Retatrutida está em fase experimental e NÃO foi aprovada por nenhuma agência reguladora (FDA, ANVISA, EMA). Qualquer produto vendido como retatrutida não é regulamentado, não tem garantia de pureza e é potencialmente perigoso. Aguarde a conclusão dos ensaios clínicos e aprovação regulatória.",
      order: 3,
    },
    {
      question: "Os efeitos colaterais são piores que os do Ozempic?",
      answer: "Os efeitos gastrointestinais (náusea, diarreia, vômitos) parecem similares ou ligeiramente mais frequentes que semaglutida nos estudos fase 2. O componente glucagon pode causar aumento leve da frequência cardíaca (~2-4 bpm). A titulação gradual é essencial para tolerabilidade. Dados de segurança de longo prazo ainda estão sendo coletados nos estudos fase 3.",
      order: 4,
    },
    {
      question: "Retatrutida serve para diabetes tipo 2?",
      answer: "Sim, os resultados são muito promissores. No estudo TRIUMPH-1, 78% dos pacientes atingiram HbA1c < 5,7% (faixa não-diabética) com a dose mais alta. A Eli Lilly está desenvolvendo retatrutida tanto para obesidade quanto para diabetes tipo 2.",
      order: 5,
    },
  ];

  for (const faq of faqs) {
    await prisma.peptideFaq.create({
      data: {
        ...faq,
        peptideId: peptide.id,
      },
    });
  }

  console.log("Created:", peptide.name, "with", studies.length, "studies and", faqs.length, "FAQs");
}

main().catch(console.error).finally(() => pool.end());

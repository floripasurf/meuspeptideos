import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // ─── Orforglipron (Foundayo) ───────────────────────────────────────────────

  const orforglipron = await prisma.peptide.upsert({
    where: { slug: "orforglipron" },
    update: {},
    create: {
      name: "Orforglipron",
      slug: "orforglipron",
      aliases: ["Foundayo", "LY3502970"],
      category: "glp1",
      description:
        "Orforglipron (Foundayo™) é o primeiro agonista de GLP-1 oral em formato de pequena molécula aprovado pelo FDA. Diferente dos peptídeos injetáveis como semaglutida e tirzepatida, o orforglipron é um comprimido tomado uma vez ao dia, sem restrições alimentares ou de ingestão de água. Desenvolvido pela Eli Lilly, representa uma mudança de paradigma no tratamento da obesidade e diabetes tipo 2, eliminando a necessidade de injeções subcutâneas.",
      mechanism:
        "O orforglipron é uma pequena molécula não-peptídica que ativa o receptor de GLP-1 de forma semelhante aos agonistas peptídicos injetáveis. Ao se ligar ao receptor GLP-1 no pâncreas, estimula a secreção de insulina dependente de glicose e suprime a liberação de glucagon. No sistema nervoso central, atua nos centros de saciedade do hipotálamo, reduzindo o apetite e a ingestão calórica. Por ser uma molécula pequena e não um peptídeo, resiste à degradação no trato gastrointestinal, permitindo absorção oral eficaz sem necessidade de jejum ou restrições hídricas — uma vantagem significativa sobre o Rybelsus (semaglutida oral), que exige jejum de 30 minutos.",
      researchPhase: "approved",
      anvisaStatus: "not_regulated",
      fdaStatus: "approved",
      emaStatus: "pending",
      benefits: [
        {
          name: "Perda de peso significativa",
          evidence: "proven",
          description:
            "Nos estudos ACHIEVE, participantes sem diabetes perderam em média 14-15% do peso corporal em 36-72 semanas. Resultados comparáveis a agonistas GLP-1 injetáveis.",
          studyUrl: "https://pubmed.ncbi.nlm.nih.gov/38587241/",
        },
        {
          name: "Controle glicêmico robusto",
          evidence: "proven",
          description:
            "Em pacientes com diabetes tipo 2, reduziu HbA1c em até 2,1% em 26 semanas. Eficácia comparável à semaglutida injetável no controle da glicemia.",
          studyUrl: "https://pubmed.ncbi.nlm.nih.gov/37351565/",
        },
        {
          name: "Conveniência da administração oral",
          evidence: "proven",
          description:
            "Comprimido oral uma vez ao dia, sem necessidade de jejum, restrições de água ou posição ereta após ingestão. Elimina a barreira das injeções, que é fator limitante para muitos pacientes.",
        },
        {
          name: "Potencial benefício cardiovascular",
          evidence: "research",
          description:
            "Estudos de desfechos cardiovasculares em andamento. A perda de peso e melhora metabólica sugerem benefícios cardiovasculares, mas dados definitivos ainda estão sendo coletados.",
        },
      ],
      risks: [
        {
          name: "Náusea",
          severity: "medium",
          frequency: "30-40% dos pacientes",
          description:
            "Efeito colateral mais comum, especialmente durante a titulação de dose. Geralmente leve a moderado e transitório, diminuindo após as primeiras semanas de tratamento.",
        },
        {
          name: "Diarreia",
          severity: "low",
          frequency: "15-20% dos pacientes",
          description:
            "Segundo efeito gastrointestinal mais frequente. Geralmente autolimitado e controlável com ajustes alimentares.",
        },
        {
          name: "Constipação",
          severity: "low",
          frequency: "10-15% dos pacientes",
          description:
            "Efeito colateral gastrointestinal comum a agonistas GLP-1. Hidratação adequada e fibras dietéticas ajudam no manejo.",
        },
        {
          name: "Eventos biliares",
          severity: "medium",
          frequency: "Raro (<2%)",
          description:
            "Colelitíase (cálculos biliares) reportada em pequena porcentagem dos pacientes, associada à perda de peso rápida. Monitoramento recomendado em pacientes com histórico de doença biliar.",
        },
      ],
      internetVsScience: [
        {
          claim: "Orforglipron é tão eficaz quanto Ozempic injetável",
          whatTheySay:
            "Um simples comprimido consegue os mesmos resultados que uma injeção semanal de semaglutida.",
          actualEvidence:
            "Nos estudos ACHIEVE, a perda de peso com orforglipron (~14-15%) foi ligeiramente inferior à da semaglutida 2,4 mg injetável (~16%). Para controle glicêmico, os resultados são comparáveis. A conveniência oral pode compensar a diferença modesta de eficácia para muitos pacientes.",
          verdict: "partial",
        },
        {
          claim: "Não tem efeitos colaterais por ser comprimido",
          whatTheySay:
            "Por ser oral e não injetável, o orforglipron tem menos efeitos colaterais que Ozempic e Mounjaro.",
          actualEvidence:
            "Os efeitos colaterais gastrointestinais (náusea, diarreia, vômitos) são semelhantes aos dos agonistas GLP-1 injetáveis. A via de administração é diferente, mas o mecanismo de ação é o mesmo, resultando em perfil de efeitos adversos similar.",
          verdict: "false",
        },
        {
          claim: "Vai substituir todos os injetáveis",
          whatTheySay:
            "Com a aprovação do orforglipron, ninguém mais vai precisar tomar Ozempic ou Mounjaro injetável.",
          actualEvidence:
            "O orforglipron é uma opção excelente para quem prefere via oral, mas os injetáveis de nova geração (tirzepatida, retatrutida) demonstram perda de peso superior (20-24%). Pacientes que necessitam da máxima eficácia ainda podem preferir injetáveis. Além disso, a adesão oral diária pode ser menor que a injeção semanal para alguns perfis de pacientes.",
          verdict: "partial",
        },
        {
          claim: "É seguro comprar genéricos importados online",
          whatTheySay:
            "Já existem versões genéricas do orforglipron disponíveis em farmácias online internacionais.",
          actualEvidence:
            "Orforglipron (Foundayo) foi aprovado pelo FDA em maio de 2026, mas NÃO tem aprovação da ANVISA. Produtos vendidos online sem prescrição e sem regulamentação local não têm garantia de autenticidade, pureza ou dosagem. Sempre consulte um médico e adquira apenas em canais regulamentados.",
          verdict: "false",
        },
      ],
      published: true,
      publishedAt: new Date(),
    },
  });

  // Studies — Orforglipron
  const orforglipronStudies = [
    {
      title: "Orforglipron (LY3502970), a novel oral non-peptide GLP-1 receptor agonist: a phase 2, randomised, placebo-controlled trial in type 2 diabetes",
      authors: "Frias JP, Hsia S, Enel D, et al.",
      journal: "The Lancet",
      year: 2023,
      pubmedId: "37351565",
      doi: "10.1016/S0140-6736(23)01007-3",
      keyFindings: "Redução de HbA1c de até 2,1% e perda de peso de até 5,4 kg em 26 semanas em pacientes com DM2. Primeira demonstração de que um agonista GLP-1 oral não-peptídico atinge eficácia comparável a injetáveis.",
      studyType: "rct" as const,
      sampleSize: 383,
      url: "https://pubmed.ncbi.nlm.nih.gov/37351565/",
    },
    {
      title: "Oral orforglipron for obesity: ACHIEVE phase 2 trial",
      authors: "Wharton S, Blevins T, Connery L, et al.",
      journal: "New England Journal of Medicine",
      year: 2023,
      pubmedId: "38587241",
      doi: "10.1056/NEJMoa2302392",
      keyFindings: "Perda de peso dose-dependente de até 14,7% em 36 semanas em adultos com obesidade sem diabetes. Perfil de segurança consistente com a classe GLP-1. Marco histórico como primeiro agonista GLP-1 oral de pequena molécula em estudo de obesidade.",
      studyType: "rct" as const,
      sampleSize: 272,
      url: "https://pubmed.ncbi.nlm.nih.gov/38587241/",
    },
    {
      title: "Efficacy and safety of orforglipron in obesity: ACHIEVE-1 phase 3 trial",
      authors: "Aronne LJ, Sattar N, Horn DB, et al.",
      journal: "The Lancet",
      year: 2025,
      pubmedId: "39821472",
      doi: "10.1016/S0140-6736(25)00186-4",
      keyFindings: "Confirmação de eficácia em fase 3 com perda de peso de até 15,2% em 72 semanas. Dados que sustentaram a aprovação pelo FDA. Perfil de tolerabilidade melhorado com titulação otimizada.",
      studyType: "rct" as const,
      sampleSize: 1670,
      url: "https://pubmed.ncbi.nlm.nih.gov/39821472/",
    },
  ];

  for (const study of orforglipronStudies) {
    await prisma.study.create({
      data: {
        ...study,
        peptideId: orforglipron.id,
      },
    });
  }

  // FAQs — Orforglipron
  const orforglipronFaqs = [
    {
      question: "O orforglipron é um peptídeo?",
      answer: "Não. Diferente de semaglutida, tirzepatida e outros agonistas GLP-1, o orforglipron é uma pequena molécula sintética (não-peptídica). Isso permite que ele seja absorvido por via oral sem ser destruído pelo sistema digestivo, dispensando injeções.",
      order: 1,
    },
    {
      question: "Preciso tomar em jejum como o Rybelsus?",
      answer: "Não. Uma das grandes vantagens do orforglipron é que pode ser tomado a qualquer momento, sem restrições de jejum, ingestão de água ou posição corporal. O Rybelsus (semaglutida oral) exige jejum de 30 minutos e um copo de água limitado, o que dificulta a adesão.",
      order: 2,
    },
    {
      question: "Quando o Foundayo estará disponível no Brasil?",
      answer: "O orforglipron (Foundayo) foi aprovado pelo FDA nos EUA em maio de 2026. A Eli Lilly ainda não submeteu o pedido de registro à ANVISA. Com base em precedentes, o processo regulatório brasileiro pode levar de 12 a 24 meses após a submissão. Previsão otimista: 2028.",
      order: 3,
    },
    {
      question: "É melhor que Ozempic e Mounjaro?",
      answer: "Depende do critério. Em eficácia pura de perda de peso, os injetáveis de última geração (tirzepatida ~21%, retatrutida ~24%) superam o orforglipron (~14-15%). Porém, para pacientes que não aceitam injeções ou preferem a praticidade de um comprimido diário, o orforglipron é uma opção transformadora. Converse com seu médico sobre o perfil mais adequado.",
      order: 4,
    },
    {
      question: "Quais são os efeitos colaterais mais comuns?",
      answer: "Os principais efeitos adversos são gastrointestinais: náusea (30-40%), diarreia (15-20%) e constipação (10-15%). Esses efeitos são mais intensos no início do tratamento e durante a titulação de dose, tendendo a diminuir com o tempo. A titulação gradual é fundamental para minimizar desconforto.",
      order: 5,
    },
  ];

  for (const faq of orforglipronFaqs) {
    await prisma.peptideFaq.create({
      data: {
        ...faq,
        peptideId: orforglipron.id,
      },
    });
  }

  console.log("Created:", orforglipron.name, "with", orforglipronStudies.length, "studies and", orforglipronFaqs.length, "FAQs");

  // ─── CagriSema ─────────────────────────────────────────────────────────────

  const cagrisema = await prisma.peptide.upsert({
    where: { slug: "cagrisema" },
    update: {},
    create: {
      name: "CagriSema",
      slug: "cagrisema",
      aliases: ["Cagrilintida + Semaglutida", "Amycretin"],
      category: "glp1",
      description:
        "CagriSema é uma combinação em dose fixa de cagrilintida (análogo de amilina de longa duração) e semaglutida (agonista de GLP-1) desenvolvida pela Novo Nordisk. A terapia combina dois mecanismos complementares em uma única injeção subcutânea semanal, alcançando perda de peso de aproximadamente 20% em 68 semanas nos ensaios clínicos — superior à semaglutida isolada. Está em fase 3 de desenvolvimento clínico (programa REDEFINE) com resposta do FDA pendente para 2026.",
      mechanism:
        "O CagriSema combina dois peptídeos com mecanismos complementares. A semaglutida ativa o receptor de GLP-1, estimulando a secreção de insulina, suprimindo o glucagon e reduzindo o apetite via centros hipotalâmicos de saciedade. A cagrilintida é um análogo de longa duração da amilina, hormônio co-secretado com a insulina pelas células beta pancreáticas. A amilina retarda o esvaziamento gástrico, suprime a secreção de glucagon e ativa áreas cerebrais diferentes do GLP-1 para promover saciedade. A combinação dos dois mecanismos — GLP-1 atuando predominantemente no hipotálamo e amilina na área postrema — cria um efeito sinérgico sobre a redução do apetite, resultando em perda de peso significativamente maior que cada componente isoladamente.",
      researchPhase: "phase3",
      anvisaStatus: "not_regulated",
      fdaStatus: "pending",
      emaStatus: "pending",
      benefits: [
        {
          name: "Perda de peso superior (~20%)",
          evidence: "proven",
          description:
            "Nos estudos REDEFINE, participantes perderam aproximadamente 20% do peso corporal em 68 semanas — superior à semaglutida 2,4 mg isolada (~16%). A combinação de mecanismos explica a eficácia adicional.",
          studyUrl: "https://pubmed.ncbi.nlm.nih.gov/38598568/",
        },
        {
          name: "Mecanismo dual sinérgico",
          evidence: "proven",
          description:
            "A combinação de amilina + GLP-1 atua em vias neurais complementares de saciedade. A cagrilintida adiciona supressão de apetite pela área postrema, enquanto a semaglutida atua no hipotálamo, gerando efeito aditivo.",
        },
        {
          name: "Controle glicêmico",
          evidence: "research",
          description:
            "Estudos em pacientes com diabetes tipo 2 mostram redução robusta de HbA1c. A amilina complementa a ação do GLP-1 sobre o metabolismo da glicose, com redução adicional de glicemia pós-prandial.",
        },
        {
          name: "Potencial em NASH/esteatose hepática",
          evidence: "research",
          description:
            "A perda de peso substancial (~20%) sugere benefícios significativos em esteatose hepática não-alcoólica. Estudos específicos para NASH estão em planejamento.",
        },
      ],
      risks: [
        {
          name: "Náusea",
          severity: "medium",
          frequency: "35-45% dos pacientes",
          description:
            "Efeito colateral mais frequente, especialmente durante a titulação. A combinação de dois peptídeos pode intensificar os sintomas gastrointestinais no início do tratamento. Titulação gradual é essencial.",
        },
        {
          name: "Reações no local da injeção",
          severity: "low",
          frequency: "10-15% dos pacientes",
          description:
            "Vermelhidão, inchaço ou dor leve no local da aplicação. Geralmente transitório e autolimitado. Rodízio do local de injeção é recomendado.",
        },
        {
          name: "Risco de pancreatite",
          severity: "high",
          frequency: "Raro (<1%)",
          description:
            "Risco de classe dos agonistas GLP-1 e análogos de amilina. Casos raros mas graves de pancreatite aguda reportados. Suspender imediatamente em caso de dor abdominal severa persistente. Contraindicado em pacientes com histórico de pancreatite.",
        },
      ],
      internetVsScience: [
        {
          claim: "CagriSema é o melhor emagrecedor do mundo",
          whatTheySay:
            "Com 20% de perda de peso, CagriSema supera todos os outros tratamentos disponíveis.",
          actualEvidence:
            "CagriSema realmente demonstrou ~20% de perda de peso, superando a semaglutida isolada (~16%). Porém, a retatrutida (agonista triplo) alcançou ~24% em estudos fase 2. Além disso, CagriSema ainda não foi aprovada — os resultados são de ensaios clínicos controlados. A comparação entre estudos diferentes tem limitações.",
          verdict: "partial",
        },
        {
          claim: "É mais seguro que Ozempic porque usa dois medicamentos em dose menor",
          whatTheySay:
            "Como combina dois medicamentos, cada um em dose mais baixa, os efeitos colaterais são menores.",
          actualEvidence:
            "Não é exatamente assim. A semaglutida no CagriSema é usada na mesma dose de 2,4 mg do Wegovy, com adição da cagrilintida. Os efeitos gastrointestinais (náusea, vômitos) tendem a ser similares ou ligeiramente mais frequentes que a semaglutida isolada. O perfil de segurança geral é comparável.",
          verdict: "false",
        },
        {
          claim: "Já dá pra conseguir CagriSema em clínicas no Brasil",
          whatTheySay:
            "Algumas clínicas de emagrecimento já oferecem a combinação cagrilintida + semaglutida manipulada.",
          actualEvidence:
            "CagriSema NÃO foi aprovada por nenhuma agência reguladora (FDA, ANVISA, EMA). A cagrilintida isolada também não tem aprovação. Qualquer oferta de 'CagriSema' ou combinação similar é ilegal e não regulamentada. Os componentes exigem condições específicas de fabricação que não podem ser replicadas em farmácias de manipulação.",
          verdict: "false",
        },
        {
          claim: "CagriSema substitui cirurgia bariátrica",
          whatTheySay:
            "Com 20% de perda de peso, não precisa mais fazer bariátrica.",
          actualEvidence:
            "A cirurgia bariátrica resulta em 25-35% de perda de peso sustentada por décadas, além de remissão de diabetes em 60-80% dos casos. CagriSema (~20%) se aproxima, mas ainda é inferior, e os efeitos dependem de uso contínuo. Para obesidade grau III (IMC > 40) ou com múltiplas comorbidades, a cirurgia pode permanecer como opção mais eficaz. A decisão deve ser individualizada com o médico.",
          verdict: "partial",
        },
      ],
      published: true,
      publishedAt: new Date(),
    },
  });

  // Studies — CagriSema
  const cagrisemaStudies = [
    {
      title: "Cagrilintide plus semaglutide 2.4 mg for weight management: a phase 2, randomised, double-blind, placebo-controlled trial",
      authors: "Frias JP, Deenadayalan S, Erichsen L, et al.",
      journal: "The Lancet",
      year: 2024,
      pubmedId: "38598568",
      doi: "10.1016/S0140-6736(24)00163-X",
      keyFindings: "Combinação de cagrilintida + semaglutida resultou em perda de peso de até 15,6% em 32 semanas, superior à semaglutida isolada. Demonstrou sinergismo entre os mecanismos de amilina e GLP-1. Base para o programa fase 3 REDEFINE.",
      studyType: "rct" as const,
      sampleSize: 92,
      url: "https://pubmed.ncbi.nlm.nih.gov/38598568/",
    },
    {
      title: "CagriSema (cagrilintide + semaglutide) for obesity: REDEFINE-1 phase 3 trial results",
      authors: "Wadden TA, Hollander P, Klein S, et al.",
      journal: "New England Journal of Medicine",
      year: 2025,
      pubmedId: "39912847",
      doi: "10.1056/NEJMoa2503214",
      keyFindings: "Perda de peso de aproximadamente 20% em 68 semanas em adultos com obesidade (IMC ≥30). Perfil de segurança consistente com estudos anteriores. Resultados que suportam a submissão regulatória ao FDA.",
      studyType: "rct" as const,
      sampleSize: 3417,
      url: "https://pubmed.ncbi.nlm.nih.gov/39912847/",
    },
    {
      title: "Cagrilintide, a long-acting amylin analogue: pharmacokinetics, safety, and tolerability in people with type 2 diabetes",
      authors: "Lau DCW, Erichsen L, Francisco-Ziller N, et al.",
      journal: "Diabetes, Obesity and Metabolism",
      year: 2023,
      pubmedId: "36855249",
      doi: "10.1111/dom.15023",
      keyFindings: "Caracterização farmacocinética da cagrilintida isolada. Meia-vida longa permitindo administração semanal. Redução de peso dose-dependente de até 4,4 kg em 26 semanas como monoterapia. Perfil de segurança aceitável que fundamentou a combinação com semaglutida.",
      studyType: "rct" as const,
      sampleSize: 92,
      url: "https://pubmed.ncbi.nlm.nih.gov/36855249/",
    },
  ];

  for (const study of cagrisemaStudies) {
    await prisma.study.create({
      data: {
        ...study,
        peptideId: cagrisema.id,
      },
    });
  }

  // FAQs — CagriSema
  const cagrisemaFaqs = [
    {
      question: "O que é CagriSema exatamente?",
      answer: "CagriSema é uma combinação em dose fixa de dois peptídeos em uma única injeção semanal: cagrilintida (análogo de amilina de longa duração) e semaglutida (agonista de GLP-1, o mesmo princípio ativo do Ozempic/Wegovy). A Novo Nordisk desenvolve o produto como evolução da semaglutida isolada.",
      order: 1,
    },
    {
      question: "Qual a diferença entre CagriSema e Amycretin?",
      answer: "São produtos diferentes da Novo Nordisk. CagriSema combina dois peptídeos separados (cagrilintida + semaglutida) em uma injeção. Amycretin é uma molécula única que integra atividade de GLP-1 e amilina no mesmo peptídeo — está em estágio mais inicial de desenvolvimento. Ambos exploram a sinergia amilina + GLP-1, mas com abordagens moleculares distintas.",
      order: 2,
    },
    {
      question: "Quando o CagriSema será aprovado?",
      answer: "A Novo Nordisk submeteu o CagriSema ao FDA com resposta esperada para o segundo semestre de 2026. Se aprovado nos EUA, a submissão à ANVISA provavelmente ocorrerá nos 6-12 meses seguintes, com aprovação brasileira estimada para 2028-2029.",
      order: 3,
    },
    {
      question: "É melhor que o Wegovy (semaglutida)?",
      answer: "Nos ensaios clínicos, sim: CagriSema (~20% de perda de peso) superou a semaglutida isolada (~16%). O mecanismo dual (amilina + GLP-1) explica a eficácia superior. Porém, o CagriSema pode ter custos mais elevados e não está disponível comercialmente ainda. Para muitos pacientes, a semaglutida isolada pode ser suficiente.",
      order: 4,
    },
    {
      question: "Posso usar cagrilintida separadamente junto com meu Ozempic?",
      answer: "Não. A cagrilintida (análogo de amilina) não está disponível comercialmente como produto isolado. A combinação CagriSema foi desenvolvida com proporções específicas e titulação cuidadosa. Combinar medicamentos por conta própria é perigoso e pode causar hipoglicemia severa ou outros efeitos adversos graves. Nunca faça combinações sem orientação médica.",
      order: 5,
    },
  ];

  for (const faq of cagrisemaFaqs) {
    await prisma.peptideFaq.create({
      data: {
        ...faq,
        peptideId: cagrisema.id,
      },
    });
  }

  console.log("Created:", cagrisema.name, "with", cagrisemaStudies.length, "studies and", cagrisemaFaqs.length, "FAQs");
}

main().catch(console.error).finally(() => pool.end());

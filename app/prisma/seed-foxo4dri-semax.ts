import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── FOXO4-DRI ──────────────────────────────────────────────────────────
  const foxo4dri = await prisma.peptide.upsert({
    where: { slug: "foxo4-dri" },
    update: {},
    create: {
      name: "FOXO4-DRI",
      slug: "foxo4-dri",
      aliases: ["FOXO4-D-Retro-Inverso", "Proxofim"],
      category: "longevity",
      description:
        "Peptídeo senolítico desenvolvido por Peter de Keizer na Universidade de Utrecht (2017). O FOXO4-DRI é um peptídeo D-retro-inverso projetado para eliminar seletivamente células senescentes — as chamadas 'células zumbis' que se acumulam com o envelhecimento e secretam fatores inflamatórios prejudiciais. Em estudos com camundongos envelhecidos, o peptídeo restaurou vigor físico, densidade de pelos e função renal, tornando-se um dos compostos anti-envelhecimento mais comentados na comunidade científica.",
      mechanism:
        "O FOXO4-DRI funciona interrompendo a interação entre as proteínas FOXO4 e p53 dentro das células senescentes. Normalmente, a FOXO4 se liga à p53 no núcleo das células senescentes, impedindo que a p53 ative a via de apoptose (morte celular programada). O peptídeo FOXO4-DRI compete com a FOXO4 endógena por essa ligação, deslocando a p53 para o citoplasma. Uma vez livre no citoplasma, a p53 ativa a cascata mitocondrial de apoptose, levando à morte seletiva da célula senescente. Células saudáveis não são afetadas porque não dependem da interação FOXO4-p53 para sobreviver. A estrutura D-retro-inverso (aminoácidos D na sequência invertida) confere resistência à degradação por proteases, aumentando a meia-vida do peptídeo in vivo.",
      researchPhase: "preclinical",
      anvisaStatus: "not_regulated",
      fdaStatus: "not_regulated",
      emaStatus: "not_regulated",
      benefits: [
        {
          name: "Eliminação de células senescentes",
          evidence: "proven",
          description:
            "Em camundongos envelhecidos e geneticamente modificados, o FOXO4-DRI reduziu significativamente a carga de células senescentes em múltiplos tecidos, incluindo fígado, rim e intestino.",
          studyUrl: "https://pubmed.ncbi.nlm.nih.gov/28340339/",
        },
        {
          name: "Potencial anti-envelhecimento",
          evidence: "research",
          description:
            "Camundongos tratados com FOXO4-DRI apresentaram melhora na atividade física, aparência geral e marcadores de envelhecimento. A senólise é considerada uma das estratégias mais promissoras contra o envelhecimento biológico.",
        },
        {
          name: "Regeneração de pelos em camundongos idosos",
          evidence: "proven",
          description:
            "Camundongos naturalmente envelhecidos tratados com FOXO4-DRI apresentaram regeneração significativa da pelagem, indicando rejuvenescimento dos folículos pilosos após a eliminação de células senescentes.",
          studyUrl: "https://pubmed.ncbi.nlm.nih.gov/28340339/",
        },
        {
          name: "Melhora da função renal",
          evidence: "research",
          description:
            "Camundongos tratados apresentaram melhora na função renal, medida pela redução dos níveis de ureia plasmática, sugerindo que a eliminação de células senescentes nos rins pode restaurar parcialmente a função do órgão.",
        },
      ],
      risks: [
        {
          name: "Custo extremamente elevado",
          severity: "high",
          frequency: "Sempre",
          description:
            "A síntese do FOXO4-DRI é complexa e cara devido à sua estrutura D-retro-inverso (48 aminoácidos D). O custo por dose estimado é de milhares de dólares, tornando-o inacessível para a maioria das pessoas.",
        },
        {
          name: "Efeitos de longo prazo desconhecidos",
          severity: "medium",
          frequency: "Desconhecido",
          description:
            "Não existem estudos de longo prazo, nem mesmo em animais. Os efeitos da eliminação crônica de células senescentes ao longo de anos são completamente desconhecidos.",
        },
        {
          name: "Risco de eliminar células senescentes benéficas",
          severity: "medium",
          frequency: "Teórico",
          description:
            "Nem todas as células senescentes são prejudiciais. Algumas desempenham papéis importantes na cicatrização de feridas, supressão tumoral e desenvolvimento embrionário. A eliminação indiscriminada pode ter consequências inesperadas.",
        },
        {
          name: "Ausência total de dados em humanos",
          severity: "high",
          frequency: "N/A",
          description:
            "Não existe nenhum ensaio clínico em humanos. Toda a evidência vem de camundongos. A tradução de resultados de modelos murinos para humanos frequentemente falha, especialmente em intervenções anti-envelhecimento.",
        },
      ],
      internetVsScience: [
        {
          claim: "FOXO4-DRI reverte o envelhecimento",
          whatTheySay:
            "O peptídeo rejuvenesce o corpo inteiro, revertendo anos de envelhecimento em poucas semanas.",
          actualEvidence:
            "Em camundongos, houve melhora em marcadores específicos de envelhecimento (pelagem, função renal, atividade física). Isso não é 'reversão do envelhecimento' — é a remoção de um dos fatores que contribuem para o declínio funcional. O envelhecimento é multifatorial e nenhum composto isolado o 'reverte'.",
          verdict: "partial",
        },
        {
          claim: "Já está disponível para uso em humanos",
          whatTheySay:
            "Clínicas de longevidade e fornecedores de peptídeos oferecem FOXO4-DRI para administração em humanos.",
          actualEvidence:
            "Não existe NENHUM ensaio clínico em humanos concluído ou em andamento. Qualquer uso em humanos é completamente experimental, sem dados de segurança, farmacocinética ou dosagem estabelecidos para nossa espécie.",
          verdict: "false",
        },
        {
          claim: "FOXO4-DRI cura câncer",
          whatTheySay:
            "Como elimina células velhas e danificadas, o peptídeo pode curar ou prevenir câncer.",
          actualEvidence:
            "A relação entre senescência celular e câncer é complexa. Células senescentes podem tanto suprimir quanto promover tumores (via SASP — fenótipo secretório associado à senescência). A eliminação de células senescentes pode reduzir o microambiente pró-tumoral, mas também remover uma barreira contra a proliferação de células pré-malignas. Não há evidência de que FOXO4-DRI previna ou trate câncer.",
          verdict: "false",
        },
      ],
      published: true,
      publishedAt: new Date(),
    },
  });

  // Studies for FOXO4-DRI
  const foxo4driStudies = [
    {
      title: "Targeted Apoptosis of Senescent Cells Restores Tissue Homeostasis in Response to Chemotoxicity and Aging",
      authors: "Baar MP, Brandt RMC, Putavet DA, Klein JDD, Derks KWJ, Bourber BRM, Stryber S, Rijksen Y, van Willigenburg H, Feijtel DA, et al.",
      journal: "Cell",
      year: 2017,
      pubmedId: "28340339",
      doi: "10.1016/j.cell.2017.02.031",
      keyFindings: "Estudo original que descreveu o FOXO4-DRI. Demonstrou que o peptídeo induz apoptose seletiva em células senescentes in vitro e in vivo. Em camundongos envelhecidos naturalmente, restaurou a aptidão física, densidade de pelos e função renal. Em camundongos tratados com quimioterapia (doxorrubicina), neutralizou a senescência induzida.",
      studyType: "animal" as const,
      sampleSize: null,
      url: "https://pubmed.ncbi.nlm.nih.gov/28340339/",
    },
    {
      title: "Cellular senescence in aging and age-related disease: from mechanisms to therapy",
      authors: "McHugh D, Gil J.",
      journal: "Nature Reviews Molecular Cell Biology",
      year: 2018,
      pubmedId: "29230070",
      doi: "10.1038/nrm.2017.116",
      keyFindings: "Revisão abrangente sobre senescência celular e estratégias senolíticas, incluindo o FOXO4-DRI. Contextualiza o peptídeo dentro do campo mais amplo de intervenções anti-envelhecimento e discute os desafios de tradução clínica das abordagens senolíticas.",
      studyType: "review" as const,
      sampleSize: null,
      url: "https://pubmed.ncbi.nlm.nih.gov/29230070/",
    },
  ];

  for (const study of foxo4driStudies) {
    await prisma.study.create({
      data: {
        ...study,
        peptideId: foxo4dri.id,
      },
    });
  }

  // FAQs for FOXO4-DRI
  const foxo4driFaqs = [
    {
      question: "O que são células senescentes e por que eliminá-las?",
      answer: "Células senescentes são células que pararam de se dividir mas não morrem. Elas se acumulam com a idade e secretam substâncias inflamatórias (chamadas SASP) que danificam tecidos vizinhos, contribuindo para doenças cardiovasculares, neurodegeneração, artrite e outras condições associadas ao envelhecimento. Eliminar essas 'células zumbi' é uma das estratégias mais promissoras da medicina anti-envelhecimento.",
      order: 1,
    },
    {
      question: "Posso usar FOXO4-DRI em humanos hoje?",
      answer: "Não há dados de segurança em humanos. Não existem ensaios clínicos concluídos ou em andamento. A dosagem, farmacocinética e efeitos colaterais em humanos são completamente desconhecidos. Qualquer uso é experimental e arriscado. Além disso, o custo de síntese é proibitivo — milhares de dólares por dose.",
      order: 2,
    },
    {
      question: "Qual a diferença entre FOXO4-DRI e outros senolíticos como dasatinib + quercetina?",
      answer: "Dasatinib + quercetina (D+Q) são moléculas pequenas já aprovadas para outros usos (dasatinib é um quimioterápico) e são muito mais acessíveis. O FOXO4-DRI é um peptídeo projetado especificamente para senólise com mecanismo mais seletivo (bloqueia FOXO4-p53). Na prática, D+Q tem mais dados clínicos em humanos, enquanto o FOXO4-DRI permanece restrito a estudos animais.",
      order: 3,
    },
    {
      question: "Os resultados em camundongos se traduzem para humanos?",
      answer: "Nem sempre. A biologia do envelhecimento em camundongos difere significativamente da humana. Camundongos vivem ~2 anos, então mudanças em marcadores de envelhecimento são mais fáceis de detectar. Muitas intervenções anti-envelhecimento promissoras em camundongos falharam ao ser testadas em humanos. O FOXO4-DRI ainda precisa passar por ensaios clínicos rigorosos para determinar se os benefícios observados em roedores se aplicam a pessoas.",
      order: 4,
    },
  ];

  for (const faq of foxo4driFaqs) {
    await prisma.peptideFaq.create({
      data: {
        ...faq,
        peptideId: foxo4dri.id,
      },
    });
  }

  console.log("Created:", foxo4dri.name, "with", foxo4driStudies.length, "studies and", foxo4driFaqs.length, "FAQs");

  // ── SEMAX ──────────────────────────────────────────────────────────────
  const semax = await prisma.peptide.upsert({
    where: { slug: "semax" },
    update: {},
    create: {
      name: "Semax",
      slug: "semax",
      aliases: ["ACTH(4-7)-PGP", "Semax 1%"],
      category: "neuroprotective",
      description:
        "Peptídeo nootrópico sintético desenvolvido na Rússia na década de 1980, derivado do fragmento ACTH(4-10) com adição do tripeptídeo Pro-Gly-Pro (PGP) na extremidade C-terminal para aumentar a estabilidade. É aprovado na Rússia e em alguns países da CEI para uso clínico em condições neurológicas, incluindo AVC isquêmico e disfunção cognitiva. Administrado por via intranasal, o Semax é um dos poucos peptídeos nootrópicos com dados clínicos substanciais — embora a maioria venha de estudos russos não replicados no Ocidente.",
      mechanism:
        "O Semax atua por múltiplos mecanismos neuroprotetores. Ele modula o sistema melanocortinérgico através dos receptores MC3 e MC4, aumentando a expressão de BDNF (fator neurotrófico derivado do cérebro) e NGF (fator de crescimento nervoso) no hipocampo e córtex. O aumento de BDNF promove plasticidade sináptica, neurogênese e sobrevivência neuronal. Adicionalmente, o Semax inibe enzimas envolvidas na degradação de encefalinas (DPPIV e outras), prolongando a ação de peptídeos opioides endógenos que modulam humor e dor. O fragmento PGP confere atividade anti-inflamatória ao inibir a migração de neutrófilos. No contexto de AVC, reduz o estresse oxidativo, inibe a cascata inflamatória e diminui a área de penumbra isquêmica.",
      researchPhase: "phase2",
      anvisaStatus: "not_regulated",
      fdaStatus: "not_regulated",
      emaStatus: "not_regulated",
      benefits: [
        {
          name: "Melhora cognitiva",
          evidence: "proven",
          description:
            "Ensaios clínicos russos demonstraram melhora em atenção, memória e velocidade de processamento em pacientes com disfunção cognitiva leve e em voluntários saudáveis. Aprovado na Rússia como nootrópico desde os anos 1990.",
        },
        {
          name: "Neuroproteção pós-AVC",
          evidence: "proven",
          description:
            "Estudos clínicos na Rússia mostraram que o Semax administrado por via intranasal nas primeiras horas após AVC isquêmico reduziu o déficit neurológico e melhorou a recuperação funcional. É aprovado como tratamento adjuvante de AVC na Rússia.",
        },
        {
          name: "Aumento de BDNF",
          evidence: "proven",
          description:
            "Múltiplos estudos demonstraram que o Semax aumenta significativamente os níveis de BDNF e seus receptores TrkB no cérebro, um dos mecanismos centrais por trás de seus efeitos nootrópicos e neuroprotetores.",
        },
        {
          name: "Redução de ansiedade",
          evidence: "research",
          description:
            "Estudos pré-clínicos e relatos clínicos sugerem efeito ansiolítico leve, possivelmente mediado pela modulação do sistema melanocortinérgico e opioidérgico. Dados clínicos robustos ainda são limitados para essa indicação específica.",
        },
      ],
      risks: [
        {
          name: "Irritação nasal",
          severity: "low",
          frequency: "10-15% dos pacientes",
          description:
            "Por ser administrado por via intranasal, pode causar irritação local, ressecamento ou desconforto nasal. Geralmente leve e transitório.",
        },
        {
          name: "Cefaleia",
          severity: "low",
          frequency: "5-10% dos pacientes",
          description:
            "Dores de cabeça leves foram relatadas em alguns usuários, especialmente no início do uso. Tendem a resolver com a continuação do tratamento.",
        },
        {
          name: "Risco teórico de queda de cabelo",
          severity: "low",
          frequency: "Raro/Teórico",
          description:
            "Como análogo do ACTH, existe uma preocupação teórica sobre efeitos no eixo hipotálamo-hipófise-adrenal que poderiam afetar o ciclo capilar. Na prática, relatos são raros e não confirmados em estudos controlados.",
        },
      ],
      internetVsScience: [
        {
          claim: "Semax é o nootrópico mais potente disponível",
          whatTheySay:
            "Semax aumenta drasticamente o QI, memória e foco, sendo superior a qualquer outro nootrópico do mercado.",
          actualEvidence:
            "Os ensaios clínicos russos mostram melhoras modestas mas estatisticamente significativas em atenção e memória. Não é um 'potencializador dramático de inteligência'. Os efeitos são mais evidentes em pessoas com déficits cognitivos pré-existentes. Em indivíduos saudáveis, as melhoras são sutis.",
          verdict: "partial",
        },
        {
          claim: "Semax não tem efeitos colaterais",
          whatTheySay:
            "É completamente seguro e não tem nenhum efeito adverso, podendo ser usado indefinidamente.",
          actualEvidence:
            "O perfil de segurança é de fato favorável nos estudos disponíveis, com efeitos colaterais geralmente leves (irritação nasal, cefaleia). Porém, a ausência de estudos de longo prazo (> 1 ano) e a falta de replicação dos dados russos em estudos ocidentais independentes significam que a segurança de longo prazo não está plenamente estabelecida.",
          verdict: "partial",
        },
        {
          claim: "Semax cura TDAH e depressão",
          whatTheySay:
            "Pode substituir medicamentos para TDAH e antidepressivos por ser mais natural e sem efeitos colaterais.",
          actualEvidence:
            "Não existem ensaios clínicos controlados que demonstrem eficácia do Semax para TDAH ou depressão como tratamento primário. Alguns mecanismos (aumento de BDNF, modulação dopaminérgica) são relevantes para essas condições, mas isso não constitui evidência clínica. Não deve substituir tratamentos estabelecidos.",
          verdict: "false",
        },
        {
          claim: "É aprovado como medicamento, então é seguro para qualquer pessoa",
          whatTheySay:
            "Como é aprovado na Rússia, já foi completamente testado e é seguro para qualquer um usar.",
          actualEvidence:
            "A aprovação regulatória na Rússia seguiu padrões diferentes dos exigidos pelo FDA, EMA ou ANVISA. Muitos estudos russos não foram replicados internacionalmente e não estão disponíveis em inglês com metodologia detalhada. A aprovação em um país não garante segurança universal — por isso não é aprovado no Ocidente.",
          verdict: "partial",
        },
      ],
      published: true,
      publishedAt: new Date(),
    },
  });

  // Studies for Semax
  const semaxStudies = [
    {
      title: "Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus",
      authors: "Dolotov OV, Karpenko EA, Inozemtseva LS, et al.",
      journal: "Brain Research",
      year: 2006,
      pubmedId: "16368078",
      doi: "10.1016/j.brainres.2005.11.017",
      keyFindings: "Demonstrou que o Semax aumenta significativamente a expressão de BDNF e do receptor TrkB no hipocampo de ratos, fornecendo base mecanística para seus efeitos nootrópicos. O aumento de BDNF foi dose-dependente e persistiu por várias horas após administração.",
      studyType: "animal" as const,
      sampleSize: null,
      url: "https://pubmed.ncbi.nlm.nih.gov/16368078/",
    },
    {
      title: "The nootropic and analgesic effects of Semax given via different routes",
      authors: "Eremin KO, Kudrin VS, Saransaari P, et al.",
      journal: "Doklady Biological Sciences",
      year: 2004,
      pubmedId: "15354666",
      doi: "10.1023/B:DOBS.0000033278.08146.28",
      keyFindings: "Avaliou diferentes vias de administração do Semax e confirmou efeitos nootrópicos e analgésicos em modelos animais. A via intranasal demonstrou biodisponibilidade cerebral superior, justificando a formulação nasal adotada clinicamente na Rússia.",
      studyType: "animal" as const,
      sampleSize: null,
      url: "https://pubmed.ncbi.nlm.nih.gov/15354666/",
    },
    {
      title: "Neuroprotective effects of Semax in conditions modeling ischemic brain damage",
      authors: "Gusev EI, Skvortsova VI, Izykenova GA, et al.",
      journal: "Bulletin of Experimental Biology and Medicine",
      year: 2005,
      pubmedId: "16027890",
      doi: "10.1007/s10517-005-0370-5",
      keyFindings: "Estudo clínico russo que avaliou Semax intranasal em pacientes com AVC isquêmico agudo. Os pacientes tratados com Semax apresentaram recuperação neurológica significativamente melhor e redução nos marcadores de dano cerebral em comparação ao grupo controle.",
      studyType: "rct" as const,
      sampleSize: 60,
      url: "https://pubmed.ncbi.nlm.nih.gov/16027890/",
    },
  ];

  for (const study of semaxStudies) {
    await prisma.study.create({
      data: {
        ...study,
        peptideId: semax.id,
      },
    });
  }

  // FAQs for Semax
  const semaxFaqs = [
    {
      question: "Como o Semax é administrado?",
      answer: "O Semax é administrado por via intranasal (gotas ou spray nasal). A formulação mais comum é a solução a 1% (0,1%). No protocolo russo aprovado, a dose típica é de 200-600 mcg por dia, dividida em 2-3 aplicações nasais. A via intranasal permite que o peptídeo alcance o cérebro diretamente através da mucosa olfatória, evitando a degradação gastrointestinal.",
      order: 1,
    },
    {
      question: "Semax é aprovado pela ANVISA ou pelo FDA?",
      answer: "Não. O Semax é aprovado apenas na Rússia e em alguns países da Comunidade dos Estados Independentes (CEI). Não possui aprovação do FDA (EUA), EMA (Europa) ou ANVISA (Brasil). Os estudos clínicos que sustentam sua aprovação russa não foram replicados sob padrões regulatórios ocidentais.",
      order: 2,
    },
    {
      question: "Quanto tempo leva para sentir os efeitos do Semax?",
      answer: "Segundo relatos clínicos e de usuários, os efeitos agudos (melhora de foco e atenção) podem ser percebidos dentro de 15-30 minutos após administração intranasal. Efeitos de longo prazo na neuroproteção e plasticidade sináptica requerem uso consistente por semanas. Importante: esses relatos vêm predominantemente da literatura russa e de comunidades de biohacking, não de estudos controlados ocidentais.",
      order: 3,
    },
    {
      question: "Posso combinar Semax com outros nootrópicos?",
      answer: "Não há estudos controlados sobre interações do Semax com outros nootrópicos ou medicamentos psicoativos. Teoricamente, o aumento de BDNF e a modulação dopaminérgica podem interagir com antidepressivos (especialmente ISRS), estimulantes e outros nootrópicos. Consulte um médico antes de combinar substâncias neuroativas.",
      order: 4,
    },
    {
      question: "Por que o Semax não é aprovado no Ocidente se funciona na Rússia?",
      answer: "Os padrões regulatórios diferem significativamente. O FDA e a EMA exigem ensaios clínicos de fase 3 multicêntricos, randomizados e duplo-cegos com amostras grandes. Muitos estudos russos do Semax têm amostras pequenas, não estão publicados em periódicos internacionais de alto impacto e não seguem todos os critérios ICH-GCP. Para obter aprovação ocidental, o Semax precisaria de novos ensaios clínicos caros, e nenhuma empresa farmacêutica ocidental financiou esses estudos até o momento.",
      order: 5,
    },
  ];

  for (const faq of semaxFaqs) {
    await prisma.peptideFaq.create({
      data: {
        ...faq,
        peptideId: semax.id,
      },
    });
  }

  console.log("Created:", semax.name, "with", semaxStudies.length, "studies and", semaxFaqs.length, "FAQs");
}

main().catch(console.error).finally(() => pool.end());

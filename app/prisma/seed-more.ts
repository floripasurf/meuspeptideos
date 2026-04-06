import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const peptides = [
  {
    name: "SS-31",
    slug: "ss-31",
    aliases: ["Elamipretide", "Bendavia", "MTP-131"],
    category: "neuroprotective" as const,
    description:
      "Peptídeo mitocondrial que penetra diretamente na membrana interna da mitocôndria, estabilizando a cardiolipina e restaurando a produção de energia celular. Um dos peptídeos mais pesquisados para doenças mitocondriais e envelhecimento celular.",
    mechanism:
      "SS-31 é um tetrapeptídeo (D-Arg-Dmt-Lys-Phe-NH2) que se concentra seletivamente na membrana interna mitocondrial, ligando-se à cardiolipina. Esta interação estabiliza a cadeia de transporte de elétrons, reduz a produção de espécies reativas de oxigênio (ROS) e restaura a bioenergética celular. Diferente de antioxidantes convencionais, atua diretamente na fonte de estresse oxidativo.",
    researchPhase: "phase3" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Proteção mitocondrial",
        evidence: "proven",
        description:
          "Múltiplos estudos clínicos demonstram melhora na função mitocondrial. Reduz estresse oxidativo diretamente na fonte (mitocôndria).",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/26921032/",
      },
      {
        name: "Cardioproteção",
        evidence: "research",
        description:
          "Estudos de fase 2 em insuficiência cardíaca (EMBRACE) mostraram melhora na função ventricular. Fase 3 (PROGRESS-HF) não atingiu endpoint primário mas mostrou sinais positivos.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/31433921/",
      },
      {
        name: "Anti-aging celular",
        evidence: "research",
        description:
          "Estudos em modelos animais demonstram reversão de disfunção mitocondrial associada ao envelhecimento. Melhora função renal, cardíaca e muscular em animais idosos.",
      },
    ],
    risks: [
      {
        name: "Reação no local da injeção",
        severity: "low" as const,
        frequency: "Comum",
        description: "Dor, vermelhidão ou inchaço no local da injeção subcutânea. Geralmente leve.",
      },
      {
        name: "Eficácia clínica incerta",
        severity: "medium" as const,
        frequency: "N/A",
        description:
          "O estudo de fase 3 PROGRESS-HF para insuficiência cardíaca não atingiu o endpoint primário, levantando questões sobre eficácia clínica translacional.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reverte o envelhecimento celular",
        whatTheySay: "Promovido como o peptídeo anti-aging mais potente que existe, capaz de reverter décadas de dano mitocondrial.",
        actualEvidence: "Demonstra proteção mitocondrial real em estudos, mas 'reverter envelhecimento' é exagero. Melhora função mitocondrial em modelos animais idosos, mas resultados clínicos em humanos são mistos.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Mitochondria-Targeted Peptide SS-31 Prevents Age-Related Decline in Skeletal Muscle",
        authors: "Siegel MP, Kruse SE, Percival JM, et al.",
        journal: "Aging Cell",
        year: 2013,
        pubmedId: "23566066",
        keyFindings: "SS-31 reverteu declínio muscular relacionado à idade em camundongos, restaurando função mitocondrial e reduzindo estresse oxidativo.",
        studyType: "animal" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/23566066/",
      },
      {
        title: "Elamipretide in Patients with Barth Syndrome (TAZPOWER)",
        authors: "Thompson WR, Manuel R, Baldo G, et al.",
        journal: "Circulation: Heart Failure",
        year: 2021,
        pubmedId: "34433275",
        keyFindings: "Elamipretide melhorou a distância no teste de caminhada de 6 minutos em pacientes com Síndrome de Barth, uma doença mitocondrial rara.",
        studyType: "rct" as const,
        sampleSize: 12,
        url: "https://pubmed.ncbi.nlm.nih.gov/34433275/",
      },
    ],
    faqs: [
      {
        question: "SS-31 é aprovado para alguma condição?",
        answer: "Não. O elamipretide (SS-31) está em desenvolvimento clínico pela Stealth BioTherapeutics. Recebeu designação de droga órfã para Síndrome de Barth e miopatia mitocondrial primária, mas ainda não tem aprovação regulatória em nenhum país.",
        order: 1,
      },
    ],
  },
  {
    name: "MOTS-c",
    slug: "mots-c",
    aliases: ["Mitochondrial ORF of the 12S rRNA Type-c"],
    category: "performance" as const,
    description:
      "Peptídeo codificado pelo DNA mitocondrial que atua como hormônio do exercício (exercise mimetic). Regula metabolismo de glicose, sensibilidade à insulina e homeostase energética. Considerado um dos peptídeos mitocondriais mais promissores para metabolismo e longevidade.",
    mechanism:
      "MOTS-c é um peptídeo de 16 aminoácidos codificado pelo gene 12S rRNA do DNA mitocondrial. Atua como um mitoquina — hormônio secretado pela mitocôndria que age sistemicamente. Ativa a via AMPK, melhora captação de glicose muscular, aumenta metabolismo de ácidos graxos e regula a via do folato. Em resposta ao estresse metabólico, transloca para o núcleo celular onde regula expressão gênica.",
    researchPhase: "phase1" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Mimetiza exercício físico",
        evidence: "research",
        description:
          "Estudos em camundongos demonstram que MOTS-c ativa vias metabólicas similares ao exercício, incluindo ativação de AMPK e melhora na captação de glicose muscular.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/25738459/",
      },
      {
        name: "Sensibilidade à insulina",
        evidence: "research",
        description:
          "Melhora resistência à insulina induzida por dieta em modelos animais. Primeiro estudo clínico em humanos (fase 1) foi publicado em 2023.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/36791613/",
      },
      {
        name: "Proteção contra obesidade",
        evidence: "research",
        description:
          "Previne ganho de peso induzido por dieta hipercalórica em camundongos. Aumenta gasto energético e oxidação de ácidos graxos.",
      },
    ],
    risks: [
      {
        name: "Dados clínicos muito limitados",
        severity: "medium" as const,
        frequency: "Desconhecido",
        description:
          "Apenas um estudo clínico de fase 1 publicado em humanos (2023, n=10). Perfil de segurança de longo prazo completamente desconhecido.",
      },
    ],
    internetVsScience: [
      {
        claim: "Substitui exercício físico",
        whatTheySay: "Chamado de 'exercise in a pill' — toma MOTS-c e não precisa treinar.",
        actualEvidence: "Ativa algumas vias similares ao exercício em modelos animais, mas não replica todos os benefícios do exercício (cardiovascular, mental, ósseo). Apenas 1 estudo em humanos publicado. Não substitui exercício.",
        verdict: "false" as const,
      },
    ],
    studies: [
      {
        title: "The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis and Reduces Obesity and Insulin Resistance",
        authors: "Lee C, Zeng J, Drew BG, et al.",
        journal: "Cell Metabolism",
        year: 2015,
        pubmedId: "25738459",
        doi: "10.1016/j.cmet.2015.02.009",
        keyFindings: "Identificação do MOTS-c como peptídeo mitocondrial que regula metabolismo de glicose via ativação de AMPK. Previne obesidade e resistência à insulina em camundongos.",
        studyType: "animal" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/25738459/",
      },
      {
        title: "MOTS-c is an Exercise-Induced Mitochondrial-Encoded Regulator of Age-Dependent Physical Decline and Muscle Homeostasis",
        authors: "Reynolds JC, Lai RW, Woodhead JST, et al.",
        journal: "Nature Communications",
        year: 2021,
        pubmedId: "33767141",
        keyFindings: "MOTS-c é induzido por exercício em humanos e camundongos. Melhora performance física e homeostase muscular em camundongos idosos.",
        studyType: "animal" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/33767141/",
      },
    ],
    faqs: [
      {
        question: "MOTS-c é natural do corpo?",
        answer: "Sim. MOTS-c é naturalmente produzido pelas mitocôndrias humanas e seus níveis circulantes diminuem com a idade. É o primeiro peptídeo hormonal codificado pelo DNA mitocondrial (não nuclear) a ser identificado.",
        order: 1,
      },
    ],
  },
  {
    name: "Epithalon",
    slug: "epithalon",
    aliases: ["Epitalon", "Epithalone", "AEDG"],
    category: "neuroprotective" as const,
    description:
      "Tetrapeptídeo sintético (Ala-Glu-Asp-Gly) baseado na epithalamina, peptídeo natural produzido pela glândula pineal. Pesquisado por seus efeitos na ativação da telomerase e potencial anti-aging. Desenvolvido pelo gerontologista russo Vladimir Khavinson.",
    mechanism:
      "Epithalon ativa a telomerase, enzima que alonga os telômeros — as capas protetoras dos cromossomos que encurtam com cada divisão celular. Telômeros mais longos estão associados a maior longevidade celular. Também regula a produção de melatonina pela glândula pineal e modula expressão gênica relacionada ao envelhecimento.",
    researchPhase: "preclinical" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Ativação da telomerase",
        evidence: "research",
        description:
          "Estudos in vitro demonstram ativação da telomerase e alongamento de telômeros em células humanas. Estudos in vivo em modelos animais confirmam o efeito.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/14501183/",
      },
      {
        name: "Regulação de melatonina",
        evidence: "research",
        description:
          "Estudos em primatas e humanos idosos mostram restauração do ritmo circadiano e produção de melatonina pela pineal.",
      },
      {
        name: "Aumento de longevidade em animais",
        evidence: "research",
        description:
          "Estudos em ratos e camundongos por Khavinson et al. demonstraram aumento de 25-30% no tempo de vida.",
      },
    ],
    risks: [
      {
        name: "Estudos majoritariamente russos",
        severity: "medium" as const,
        frequency: "N/A",
        description:
          "Quase toda a pesquisa foi conduzida pelo mesmo grupo na Rússia (Khavinson). Faltam replicações independentes e estudos clínicos robustos fora da Rússia.",
      },
      {
        name: "Risco teórico de câncer",
        severity: "medium" as const,
        frequency: "Desconhecido",
        description:
          "Ativação da telomerase é uma característica de células cancerígenas. Embora estudos em animais não tenham mostrado aumento de câncer, o risco teórico existe e não foi adequadamente avaliado em humanos.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reverte o envelhecimento biológico",
        whatTheySay: "Epithalon é a fonte da juventude — alonga telômeros e reverte o relógio biológico.",
        actualEvidence: "Ativa telomerase em laboratório, mas alongar telômeros não é sinônimo de reverter envelhecimento. O envelhecimento é multifatorial. Estudos de longevidade em animais são promissores mas conduzidos apenas por um grupo. Nenhum estudo clínico de fase 3 em humanos.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Peptide Promotes Overcoming of the Division Limit in Human Somatic Cell",
        authors: "Khavinson VK, Bondarev IE, Butyugov AA",
        journal: "Bulletin of Experimental Biology and Medicine",
        year: 2003,
        pubmedId: "14501183",
        keyFindings: "Epithalon induziu ativação da telomerase em fibroblastos humanos e promoveu divisões celulares além do limite de Hayflick.",
        studyType: "in_vitro" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/14501183/",
      },
    ],
    faqs: [
      {
        question: "Epithalon pode causar câncer?",
        answer: "É uma preocupação teórica legítima, já que a telomerase é ativada em 85-90% dos cânceres humanos. No entanto, os estudos em animais de Khavinson não mostraram aumento na incidência de tumores — na verdade, alguns mostraram redução. Mas esses estudos não foram projetados para avaliar risco oncológico e não foram replicados independentemente.",
        order: 1,
      },
    ],
  },
  {
    name: "PT-141",
    slug: "pt-141",
    aliases: ["Bremelanotide", "Vyleesi"],
    category: "performance" as const,
    description:
      "Peptídeo agonista do receptor de melanocortina MC4R, aprovado pelo FDA para tratamento do Transtorno do Desejo Sexual Hipoativo (HSDD) em mulheres pré-menopáusicas. Único medicamento aprovado que atua no sistema nervoso central para aumentar desejo sexual.",
    mechanism:
      "PT-141 (bremelanotide) ativa o receptor de melanocortina MC4R no sistema nervoso central, especificamente em áreas do hipotálamo associadas à resposta sexual. Diferente de medicamentos como sildenafil (Viagra), que atua no fluxo sanguíneo, o PT-141 atua diretamente nos circuitos cerebrais do desejo sexual.",
    researchPhase: "approved" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "approved" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Tratamento de HSDD em mulheres",
        evidence: "proven",
        description:
          "Estudos RECONNECT (fase 3) demonstraram aumento significativo no desejo sexual e redução do distress em mulheres com HSDD. Aprovado pelo FDA em 2019.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/31141449/",
      },
      {
        name: "Disfunção erétil em homens",
        evidence: "research",
        description:
          "Estudos de fase 2 mostraram eficácia em disfunção erétil masculina, mas o desenvolvimento foi descontinuado em favor do mercado feminino.",
      },
    ],
    risks: [
      {
        name: "Náusea",
        severity: "medium" as const,
        frequency: "40% dos pacientes",
        description: "Efeito colateral mais comum. Pode ser significativo e é motivo de descontinuação em alguns pacientes.",
      },
      {
        name: "Aumento da pressão arterial",
        severity: "medium" as const,
        frequency: "Transitório",
        description: "Eleva pressão arterial transitoriamente. Contraindicado em hipertensão não controlada e doença cardiovascular.",
      },
      {
        name: "Hiperpigmentação",
        severity: "low" as const,
        frequency: "Incomum",
        description: "Pode causar escurecimento da pele em áreas expostas, devido à ativação de receptores de melanocortina na pele.",
      },
    ],
    internetVsScience: [
      {
        claim: "Viagra feminino",
        whatTheySay: "PT-141 é o Viagra para mulheres — toma e resolve.",
        actualEvidence: "Aprovado pelo FDA para HSDD feminino, mas o mecanismo é completamente diferente do Viagra. Atua no cérebro (desejo) e não no fluxo sanguíneo (ereção). Eficácia é modesta — NNT de ~8 (precisa tratar 8 mulheres para 1 ter benefício clinicamente significativo). Efeitos colaterais significativos.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Bremelanotide for Hypoactive Sexual Desire Disorder (RECONNECT)",
        authors: "Kingsberg SA, Clayton AH, Portman D, et al.",
        journal: "Obstetrics & Gynecology",
        year: 2019,
        pubmedId: "31141449",
        doi: "10.1097/AOG.0000000000003360",
        keyFindings: "Bremelanotide melhorou significativamente desejo sexual e reduziu distress em mulheres com HSDD em dois estudos de fase 3 (n=1,247).",
        studyType: "rct" as const,
        sampleSize: 1247,
        url: "https://pubmed.ncbi.nlm.nih.gov/31141449/",
      },
    ],
    faqs: [
      {
        question: "PT-141 é legal no Brasil?",
        answer: "O Vyleesi (bremelanotide) não é registrado na ANVISA. Nos EUA, é aprovado pelo FDA desde 2019 para HSDD em mulheres pré-menopáusicas. É administrado via injeção subcutânea autoaplicável.",
        order: 1,
      },
    ],
  },
  {
    name: "KPV",
    slug: "kpv",
    aliases: ["Lys-Pro-Val"],
    category: "immune" as const,
    description:
      "Tripeptídeo derivado do hormônio alfa-MSH (alfa-melanócito estimulante) com potente efeito anti-inflamatório. Pesquisado para doenças inflamatórias intestinais, dermatite e inflamação sistêmica. Popular na comunidade de biohacking por seu perfil anti-inflamatório sem imunossupressão.",
    mechanism:
      "KPV é composto pelos três aminoácidos C-terminais do alfa-MSH (Lisina-Prolina-Valina). Inibe a ativação do NF-κB, principal via de sinalização inflamatória, e reduz a produção de citocinas pró-inflamatórias (TNF-α, IL-6, IL-1β). Diferente de imunossupressores, modula a inflamação sem suprimir a resposta imune adaptativa.",
    researchPhase: "preclinical" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Anti-inflamatório potente",
        evidence: "research",
        description:
          "Estudos in vitro e em animais demonstram inibição significativa de NF-κB e redução de citocinas inflamatórias sem imunossupressão.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/11568977/",
      },
      {
        name: "Proteção intestinal",
        evidence: "research",
        description:
          "Estudos em modelos animais de colite mostram redução da inflamação intestinal e proteção da mucosa. Potencial para doença de Crohn e colite ulcerativa.",
      },
      {
        name: "Cicatrização de feridas",
        evidence: "research",
        description:
          "Acelera cicatrização em modelos animais via redução da inflamação local e modulação de macrófagos.",
      },
    ],
    risks: [
      {
        name: "Sem estudos em humanos",
        severity: "high" as const,
        frequency: "Desconhecido",
        description:
          "Zero ensaios clínicos em humanos publicados. Toda a evidência é pré-clínica (in vitro e animal).",
      },
    ],
    internetVsScience: [
      {
        claim: "Cura doenças intestinais",
        whatTheySay: "KPV oral cura leaky gut, IBS, Crohn e colite — o anti-inflamatório perfeito.",
        actualEvidence: "Efeitos anti-inflamatórios reais demonstrados em modelos animais de colite, mas ZERO estudos em humanos. Biodisponibilidade oral de peptídeos é geralmente muito baixa. Não existe evidência de que 'cura' qualquer condição.",
        verdict: "unknown" as const,
      },
    ],
    studies: [
      {
        title: "The tripeptide KPV inhibits NF-κB in vitro and in vivo",
        authors: "Brzoska T, Luger TA, Maaser C, et al.",
        journal: "Journal of Biological Chemistry",
        year: 2001,
        pubmedId: "11568977",
        keyFindings: "KPV inibe ativação de NF-κB tanto in vitro quanto in vivo, com efeito anti-inflamatório comparável ao alfa-MSH completo apesar de ser apenas um fragmento de 3 aminoácidos.",
        studyType: "animal" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/11568977/",
      },
    ],
    faqs: [],
  },
  {
    name: "Sermorelin",
    slug: "sermorelin",
    aliases: ["Geref", "GRF 1-29"],
    category: "growth_hormone" as const,
    description:
      "Análogo do hormônio liberador de GH (GHRH) correspondente aos primeiros 29 aminoácidos do GHRH natural. Foi aprovado pelo FDA de 1997 a 2008 para deficiência de GH em crianças. Agora disponível via farmácias de manipulação. Um dos secretagogos de GH mais estudados.",
    mechanism:
      "Sermorelin se liga aos receptores de GHRH na hipófise anterior, estimulando a síntese e liberação pulsátil de hormônio de crescimento. Preserva o feedback negativo natural do eixo GH-IGF-1, diferente do GH exógeno que suprime a produção endógena.",
    researchPhase: "approved" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "compounding_only" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Aumento de GH fisiológico",
        evidence: "proven",
        description:
          "Aprovado pelo FDA (1997-2008) para deficiência de GH. Estimula liberação natural de GH mantendo padrão pulsátil fisiológico.",
      },
      {
        name: "Melhora da composição corporal",
        evidence: "proven",
        description:
          "Estudos clínicos demonstram aumento de massa magra e redução de gordura corporal com uso prolongado.",
      },
      {
        name: "Melhora da qualidade do sono",
        evidence: "research",
        description:
          "Relatos clínicos de melhora no sono profundo (slow-wave sleep), fase em que o GH é naturalmente mais liberado.",
      },
    ],
    risks: [
      {
        name: "Dor no local da injeção",
        severity: "low" as const,
        frequency: "Comum",
        description: "Efeito colateral mais relatado. Geralmente leve.",
      },
      {
        name: "Rubor facial",
        severity: "low" as const,
        frequency: "Incomum",
        description: "Flushing transitório após injeção.",
      },
    ],
    internetVsScience: [
      {
        claim: "Melhor que HGH e mais seguro",
        whatTheySay: "Sermorelin dá todos os benefícios do HGH sem os riscos.",
        actualEvidence: "Estimula GH natural (mais seguro que GH exógeno que suprime produção endógena), mas os níveis de GH atingidos são menores. Foi FDA-aprovado, o que lhe dá mais credibilidade que muitos peptídeos. Descontinuado comercialmente por razões de mercado, não de segurança.",
        verdict: "partial" as const,
      },
    ],
    studies: [],
    faqs: [
      {
        question: "Por que o Geref foi descontinuado?",
        answer: "O fabricante (Serono/EMD) descontinuou voluntariamente o Geref em 2008 por razões comerciais (mercado pequeno), não por problemas de segurança ou eficácia. O peptídeo continua disponível via farmácias de manipulação nos EUA.",
        order: 1,
      },
    ],
  },
  {
    name: "Tesamorelin",
    slug: "tesamorelin",
    aliases: ["Egrifta"],
    category: "growth_hormone" as const,
    description:
      "Análogo do GHRH aprovado pelo FDA para redução de gordura visceral em pacientes HIV com lipodistrofia. Único secretagogo de GH com aprovação FDA ativa atualmente. Também pesquisado para esteatose hepática (fígado gorduroso) e declínio cognitivo.",
    mechanism:
      "Tesamorelin é um análogo modificado do GHRH com adição de um ácido trans-3-hexenóico na posição N-terminal, aumentando sua estabilidade e potência. Estimula liberação de GH pela hipófise de forma fisiológica, reduzindo seletivamente gordura visceral sem afetar gordura subcutânea na mesma proporção.",
    researchPhase: "approved" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "approved" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Redução de gordura visceral",
        evidence: "proven",
        description:
          "Aprovado pelo FDA (2010). Estudos demonstraram redução de 15-18% na gordura visceral (trunk fat) em pacientes HIV com lipodistrofia.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/21091436/",
      },
      {
        name: "Redução de gordura hepática",
        evidence: "research",
        description:
          "Estudos mostram redução significativa de gordura no fígado (NAFLD/NASH) em pacientes HIV e não-HIV.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/31525603/",
      },
      {
        name: "Benefícios cognitivos",
        evidence: "research",
        description:
          "Estudos em adultos com comprometimento cognitivo leve mostram melhora em memória e função executiva.",
      },
    ],
    risks: [
      {
        name: "Artralgias",
        severity: "low" as const,
        frequency: "13% dos pacientes",
        description: "Dor articular é o efeito colateral mais comum. Geralmente leve a moderado.",
      },
      {
        name: "Edema periférico",
        severity: "low" as const,
        frequency: "6% dos pacientes",
        description: "Inchaço leve nas extremidades, relacionado ao aumento de GH/IGF-1.",
      },
    ],
    internetVsScience: [
      {
        claim: "Derrete gordura abdominal",
        whatTheySay: "Tesamorelin é o melhor peptídeo para eliminar barriga — aprovado pelo FDA para isso.",
        actualEvidence: "FDA-aprovado para redução de gordura visceral em HIV-lipodistrofia (15-18% de redução). Eficaz, mas aprovado para uma população específica. Uso off-label para gordura abdominal em geral é comum mas não é indicação aprovada.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Effects of Tesamorelin on Abdominal Fat in HIV-infected Patients",
        authors: "Falutz J, Allas S, Blot K, et al.",
        journal: "New England Journal of Medicine",
        year: 2007,
        pubmedId: "17687130",
        doi: "10.1056/NEJMoa074658",
        keyFindings: "Tesamorelin reduziu gordura visceral em 15.2% vs aumento de 5% com placebo em 26 semanas em pacientes HIV com lipodistrofia.",
        studyType: "rct" as const,
        sampleSize: 412,
        url: "https://pubmed.ncbi.nlm.nih.gov/17687130/",
      },
    ],
    faqs: [
      {
        question: "Tesamorelin pode ser usado para emagrecer?",
        answer: "A aprovação FDA é especificamente para lipodistrofia associada ao HIV, não para emagrecimento geral. Uso off-label existe, mas não é indicação aprovada. Para obesidade, semaglutida e tirzepatida têm muito mais evidência.",
        order: 1,
      },
    ],
  },
  {
    name: "LL-37",
    slug: "ll-37",
    aliases: ["Catelicidina", "hCAP18"],
    category: "immune" as const,
    description:
      "Único peptídeo antimicrobiano da família das catelicidinas encontrado em humanos. Atua como primeira linha de defesa imune inata contra bactérias, vírus e fungos. Pesquisado para infecções resistentes a antibióticos e modulação imunológica.",
    mechanism:
      "LL-37 é um peptídeo de 37 aminoácidos clivado da proteína precursora hCAP18. Possui atividade antimicrobiana direta — rompe membranas bacterianas formando poros. Também atua como imunomodulador, recrutando células imunes, estimulando angiogênese e promovendo cicatrização. Produzido naturalmente por neutrófilos, macrófagos e células epiteliais.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Atividade antimicrobiana ampla",
        evidence: "proven",
        description:
          "Demonstrada atividade contra bactérias gram-positivas, gram-negativas, vírus envelopados e fungos in vitro. Ativo contra biofilmes bacterianos.",
      },
      {
        name: "Imunomodulação",
        evidence: "research",
        description:
          "Recruta células imunes, modula inflamação e promove cicatrização. Estudos clínicos de fase 1/2 para úlceras venosas mostraram resultados positivos.",
      },
    ],
    risks: [
      {
        name: "Toxicidade em altas doses",
        severity: "medium" as const,
        frequency: "Dose-dependente",
        description: "Em concentrações altas, LL-37 pode ser citotóxico para células humanas (mesmo mecanismo de ruptura de membrana que usa contra bactérias).",
      },
    ],
    internetVsScience: [
      {
        claim: "Antibiótico natural que substitui medicamentos",
        whatTheySay: "LL-37 mata bactérias, vírus e fungos naturalmente — pode substituir antibióticos.",
        actualEvidence: "Tem atividade antimicrobiana real e comprovada in vitro, mas as concentrações necessárias in vivo são difíceis de atingir sem toxicidade. Não substitui antibióticos para infecções estabelecidas. Pesquisa focada em uso tópico para feridas.",
        verdict: "partial" as const,
      },
    ],
    studies: [],
    faqs: [],
  },
  {
    name: "Melanotan II",
    slug: "melanotan-ii",
    aliases: ["MT-2", "MT-II"],
    category: "cosmetic" as const,
    description:
      "Análogo sintético do hormônio alfa-MSH que estimula produção de melanina (bronzeamento) e tem efeitos na função sexual. Amplamente usado no mercado underground para bronzeamento sem sol. Não aprovado por nenhuma agência reguladora. Associado a riscos significativos.",
    mechanism:
      "Melanotan II ativa múltiplos receptores de melanocortina (MC1R-MC5R). Via MC1R, estimula melanócitos a produzir melanina, causando bronzeamento sem exposição UV. Via MC4R, afeta centros de desejo sexual no hipotálamo (mesmo receptor do PT-141/Vyleesi). Via MC3R/MC4R, pode suprimir apetite.",
    researchPhase: "phase2" as const,
    anvisaStatus: "banned" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "banned" as const,
    benefits: [
      {
        name: "Bronzeamento sem UV",
        evidence: "proven",
        description:
          "Estudos clínicos de fase 2 confirmam aumento significativo de melanina e bronzeamento da pele sem exposição solar.",
      },
      {
        name: "Efeito na função sexual",
        evidence: "research",
        description:
          "Efeito colateral observado que levou ao desenvolvimento do PT-141 (bremelanotide/Vyleesi) como medicamento separado.",
      },
    ],
    risks: [
      {
        name: "Nevos atípicos / melanoma",
        severity: "high" as const,
        frequency: "Relatos de caso",
        description:
          "Relatos de aparecimento de nevos atípicos (pintas irregulares) e potencial transformação maligna. Estimulação de melanócitos pode promover melanoma em indivíduos predispostos.",
      },
      {
        name: "Náusea severa",
        severity: "medium" as const,
        frequency: "Muito comum",
        description: "Náusea intensa é o efeito colateral mais frequente, especialmente nas primeiras doses.",
      },
      {
        name: "Aumento de pressão arterial",
        severity: "medium" as const,
        frequency: "Comum",
        description: "Hipertensão transitória relatada em estudos clínicos.",
      },
      {
        name: "Contaminação de produtos",
        severity: "high" as const,
        frequency: "Variável",
        description: "Produtos vendidos online frequentemente contaminados ou com dosagem incorreta. Sem controle de qualidade.",
      },
    ],
    internetVsScience: [
      {
        claim: "Bronzeamento seguro sem sol",
        whatTheySay: "MT-2 dá bronzeado perfeito sem risco de queimadura solar. Mais seguro que tomar sol.",
        actualEvidence: "Causa bronzeamento real, mas NÃO é seguro. Associado a aparecimento de nevos atípicos e risco teórico de melanoma. Proibido na Europa e Austrália. Produtos do mercado negro frequentemente contaminados. Não aprovado em nenhum país.",
        verdict: "false" as const,
      },
    ],
    studies: [],
    faqs: [
      {
        question: "Melanotan II é legal?",
        answer: "Não. Melanotan II é proibido para venda como produto de consumo na maioria dos países. A TGA (Austrália) e MHRA (Reino Unido) emitiram alertas contra seu uso. A ANVISA não o aprova. Produtos vendidos online operam ilegalmente.",
        order: 1,
      },
      {
        question: "Qual a diferença entre Melanotan II e PT-141?",
        answer: "O PT-141 (bremelanotide/Vyleesi) foi desenvolvido a partir do Melanotan II, mas modificado para atuar predominantemente no receptor MC4R (função sexual) com menor efeito no MC1R (melanina). O PT-141 é aprovado pelo FDA; o Melanotan II não é aprovado em nenhum país.",
        order: 2,
      },
    ],
  },
  {
    name: "Dihexa",
    slug: "dihexa",
    aliases: ["N-hexanoic-Tyr-Ile-(6) aminohexanoic amide"],
    category: "neuroprotective" as const,
    description:
      "Peptídeo nootrópico derivado da angiotensina IV com potência 10 milhões de vezes maior que o BDNF na formação de novas conexões neurais (sinaptogênese). Pesquisado para Alzheimer e declínio cognitivo. Extremamente potente mas com dados clínicos muito limitados.",
    mechanism:
      "Dihexa se liga ao receptor HGF (Hepatocyte Growth Factor) / c-Met, potencializando a sinalização de HGF no cérebro. Isso promove sinaptogênese (formação de novas sinapses), neurogênese e sobrevivência neuronal. É estável oralmente, o que é raro para peptídeos.",
    researchPhase: "preclinical" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Sinaptogênese potente",
        evidence: "research",
        description:
          "Estudo seminal demonstrou potência 10^7 vezes maior que BDNF na formação de novas sinapses in vitro. Restaurou função cognitiva em ratos com demência induzida.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/23333169/",
      },
      {
        name: "Biodisponibilidade oral",
        evidence: "research",
        description:
          "Diferente da maioria dos peptídeos, é estável e ativo quando administrado oralmente em modelos animais.",
      },
    ],
    risks: [
      {
        name: "Risco oncológico teórico",
        severity: "high" as const,
        frequency: "Desconhecido",
        description:
          "Ativa a via HGF/c-Met, que é um oncogene conhecido. Superativação desta via está associada a crescimento e metástase tumoral. Risco de longo prazo completamente desconhecido.",
      },
      {
        name: "Zero dados em humanos",
        severity: "high" as const,
        frequency: "N/A",
        description:
          "Toda a evidência vem de um único laboratório (Universidade de Washington). Nenhum estudo em humanos publicado.",
      },
    ],
    internetVsScience: [
      {
        claim: "O nootrópico mais potente que existe",
        whatTheySay: "Dihexa é 10 milhões de vezes mais potente que BDNF — o superpeptídeo para o cérebro.",
        actualEvidence: "A potência in vitro é real (publicada em revista peer-reviewed), mas potência in vitro ≠ eficácia clínica. Zero estudos em humanos. Risco oncológico real via c-Met. Usar um ativador de oncogene como nootrópico é extremamente arriscado sem dados de segurança.",
        verdict: "unknown" as const,
      },
    ],
    studies: [
      {
        title: "Discovery of an Orally Active Small Molecule Potentiator of HGF/Met",
        authors: "McCoy AT, Benoist CC, Wright JW, et al.",
        journal: "ACS Medicinal Chemistry Letters",
        year: 2013,
        pubmedId: "23333169",
        keyFindings: "Dihexa demonstrou potência 10^7 vezes maior que BDNF para sinaptogênese in vitro e restaurou déficits cognitivos em ratos via ativação de HGF/c-Met.",
        studyType: "animal" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/23333169/",
      },
    ],
    faqs: [],
  },
  {
    name: "DSIP",
    slug: "dsip",
    aliases: ["Delta Sleep-Inducing Peptide"],
    category: "neuroprotective" as const,
    description:
      "Neuropeptídeo descoberto em 1977 que modula o sono delta (sono profundo de ondas lentas). Pesquisado para insônia, manejo de estresse e regulação do ritmo circadiano. Encontrado naturalmente no cérebro humano.",
    mechanism:
      "DSIP é um nonapeptídeo (9 aminoácidos) que modula a atividade GABAérgica e serotoninérgica no tronco cerebral e hipotálamo. Promove sono de ondas lentas (delta sleep), reduz níveis de cortisol e modula a liberação de hormônio de crescimento durante o sono. Também influencia a produção de LH e o eixo hipotálamo-hipófise-adrenal.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Melhora do sono profundo",
        evidence: "research",
        description:
          "Estudos clínicos pequenos demonstram aumento do sono de ondas lentas e melhora subjetiva da qualidade do sono em pacientes com insônia.",
      },
      {
        name: "Redução de estresse",
        evidence: "research",
        description:
          "Estudos mostram redução dos níveis de cortisol e normalização da resposta ao estresse em modelos animais e pequenos estudos humanos.",
      },
    ],
    risks: [
      {
        name: "Estudos clínicos limitados",
        severity: "medium" as const,
        frequency: "N/A",
        description:
          "Estudos clínicos são antigos (1980s-1990s), pequenos e com metodologia questionável pelos padrões atuais.",
      },
      {
        name: "Meia-vida muito curta",
        severity: "low" as const,
        frequency: "N/A",
        description:
          "Degradado rapidamente no sangue (meia-vida ~7-8 minutos), questionando eficácia de administração periférica.",
      },
    ],
    internetVsScience: [
      {
        claim: "Cura insônia naturalmente",
        whatTheySay: "DSIP é o peptídeo natural do sono — toma e dorme como um bebê, sem efeitos de soníferos.",
        actualEvidence: "Modula sono profundo em alguns estudos, mas evidência é fraca e antiga. Meia-vida extremamente curta questiona se chega ao cérebro em quantidades eficazes. Não é substituto para higiene do sono ou tratamento médico de insônia.",
        verdict: "unknown" as const,
      },
    ],
    studies: [],
    faqs: [],
  },
  {
    name: "Cerebrolysin",
    slug: "cerebrolysin",
    aliases: ["FPF 1070"],
    category: "neuroprotective" as const,
    description:
      "Mistura de peptídeos de baixo peso molecular e aminoácidos derivada de cérebro suíno purificado. Aprovada em mais de 40 países para AVC, demência e traumatismo craniano. Não aprovada nos EUA. Um dos neurotroficos mais estudados clinicamente, com mais de 200 estudos clínicos.",
    mechanism:
      "Cerebrolysin contém fragmentos peptídicos que mimetizam a ação de fatores neurotróficos naturais (BDNF, GDNF, NGF, CNTF). Promove neuroplasticidade, neuroproteção, neurogênese e sinaptogênese. Atua em múltiplas vias simultaneamente, diferente de moléculas únicas que agem em um alvo só.",
    researchPhase: "approved" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Recuperação de AVC",
        evidence: "proven",
        description:
          "Meta-análises de ensaios clínicos demonstram melhora na recuperação funcional pós-AVC quando administrado nas primeiras 72 horas. Aprovado para esta indicação em 40+ países.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/28133704/",
      },
      {
        name: "Demência e Alzheimer",
        evidence: "research",
        description:
          "Estudos clínicos mostram melhora modesta em função cognitiva em pacientes com Alzheimer leve a moderado. Resultados mistos em meta-análises.",
      },
      {
        name: "Traumatismo craniano",
        evidence: "research",
        description:
          "Estudos clínicos em TBI mostram potencial neuroprotetor, mas evidência ainda insuficiente para recomendação definitiva.",
      },
    ],
    risks: [
      {
        name: "Reação alérgica",
        severity: "medium" as const,
        frequency: "Raro",
        description: "Por ser derivado de cérebro suíno, pode causar reações alérgicas em indivíduos sensíveis.",
      },
      {
        name: "Vertigem e agitação",
        severity: "low" as const,
        frequency: "Incomum",
        description: "Efeitos colaterais neurológicos leves relatados em estudos clínicos.",
      },
    ],
    internetVsScience: [
      {
        claim: "Super droga para o cérebro",
        whatTheySay: "Cerebrolysin regenera neurônios e cura danos cerebrais.",
        actualEvidence: "Tem mais de 200 estudos clínicos e aprovação em 40+ países — muito mais evidência que a maioria dos peptídeos. Eficácia real em recuperação de AVC. Mas não 'regenera' neurônios perdidos e resultados em Alzheimer são modestos. Não aprovado pelo FDA por questões de padronização do produto biológico.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Cerebrolysin in Acute Ischemic Stroke: A Systematic Review",
        authors: "Bornstein NM, Guekht A, Vester J, et al.",
        journal: "Stroke",
        year: 2018,
        pubmedId: "28133704",
        keyFindings: "Meta-análise de 6 RCTs demonstrou que Cerebrolysin melhora significativamente a recuperação funcional global em pacientes com AVC isquêmico agudo.",
        studyType: "meta_analysis" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/28133704/",
      },
    ],
    faqs: [
      {
        question: "Por que Cerebrolysin não é aprovado nos EUA?",
        answer: "O FDA exige padronização rigorosa de composição para aprovação. Como Cerebrolysin é uma mistura complexa de peptídeos derivados de cérebro suíno, cada lote pode ter composição ligeiramente diferente, tornando difícil atender aos critérios do FDA. Está aprovado em mais de 40 países incluindo Alemanha, Rússia, China e Coreia do Sul.",
        order: 1,
      },
    ],
  },
];

async function main() {
  console.log("Seeding additional peptides...\n");

  for (const data of peptides) {
    const { studies, faqs, ...peptideData } = data;

    // Delete existing studies/faqs if re-running
    const existing = await prisma.peptide.findUnique({
      where: { slug: peptideData.slug },
    });
    if (existing) {
      await prisma.study.deleteMany({ where: { peptideId: existing.id } });
      await prisma.peptideFaq.deleteMany({ where: { peptideId: existing.id } });
    }

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

    for (const study of studies) {
      await prisma.study.create({
        data: { ...study, peptideId: peptide.id },
      });
    }
    if (studies.length > 0) console.log(`    + ${studies.length} studies`);

    for (const faq of faqs) {
      await prisma.peptideFaq.create({
        data: { ...faq, peptideId: peptide.id },
      });
    }
    if (faqs.length > 0) console.log(`    + ${faqs.length} FAQs`);
  }

  const total = await prisma.peptide.count();
  console.log(`\nDone! Total peptides in database: ${total}`);
}

main()
  .then(() => { prisma.$disconnect(); pool.end(); })
  .catch((e) => { console.error(e); prisma.$disconnect(); pool.end(); process.exit(1); });

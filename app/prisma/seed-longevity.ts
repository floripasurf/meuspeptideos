import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const compounds = [
  {
    name: "NMN",
    slug: "nmn",
    aliases: ["Nicotinamida Mononucleotídeo", "Nicotinamide Mononucleotide", "β-NMN"],
    category: "longevity" as const,
    description:
      "IMPORTANTE: NMN não é um peptídeo, é um nucleotídeo — precursor direto do NAD+ (nicotinamida adenina dinucleotídeo), uma coenzima essencial para metabolismo celular. Listado nesta base por ser frequentemente associado ao mercado de longevidade. Os níveis de NAD+ caem com a idade, e NMN é pesquisado para reverter esse declínio.",
    mechanism:
      "NMN é convertido em NAD+ no organismo via enzima NMNAT. NAD+ é cofator essencial para enzimas envolvidas em produção de energia mitocondrial, reparo de DNA, ativação de sirtuínas (proteínas associadas à longevidade) e regulação do metabolismo. A teoria é que aumentar NAD+ pode contrarregular o declínio metabólico do envelhecimento.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Aumento dos níveis de NAD+",
        evidence: "proven",
        description: "Estudos clínicos confirmam que NMN oral aumenta significativamente os níveis sanguíneos de NAD+ em humanos.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/34526400/",
      },
      {
        name: "Sensibilidade à insulina",
        evidence: "research",
        description: "Estudo clínico em mulheres pós-menopausa pré-diabéticas mostrou melhora da sensibilidade à insulina muscular após 10 semanas.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/33888596/",
      },
      {
        name: "Performance física",
        evidence: "research",
        description: "Estudos em humanos mostram modesta melhora em capacidade aeróbica e função muscular em adultos de meia-idade.",
      },
      {
        name: "Anti-aging",
        evidence: "unproven",
        description: "Estudos em camundongos mostram efeitos anti-aging promissores, mas a tradução para humanos ainda não foi demonstrada em ensaios clínicos longos.",
      },
    ],
    risks: [
      {
        name: "Status regulatório nos EUA",
        severity: "medium" as const,
        frequency: "N/A",
        description: "Em 2022, o FDA reclassificou NMN como medicamento experimental (não suplemento), proibindo sua venda como suplemento alimentar nos EUA. Status legal em outros países varia.",
      },
      {
        name: "Pureza variável",
        severity: "medium" as const,
        frequency: "Variável",
        description: "Análises independentes mostraram que muitos produtos comerciais de NMN têm pureza significativamente menor que a declarada no rótulo.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reverte o envelhecimento",
        whatTheySay: "NMN é a fonte da juventude — toma e seu corpo rejuvenece anos.",
        actualEvidence: "Aumenta NAD+ comprovadamente, mas 'reverter envelhecimento' é exagero. Estudos em humanos mostram benefícios modestos em alguns marcadores. Efeitos de longo prazo em longevidade humana são desconhecidos.",
        verdict: "partial" as const,
      },
      {
        claim: "É um peptídeo",
        whatTheySay: "Frequentemente vendido junto com peptídeos no mercado de biohacking.",
        actualEvidence: "NMN é um nucleotídeo, não um peptídeo. Peptídeos são cadeias de aminoácidos; nucleotídeos são compostos de uma base nitrogenada, açúcar e fosfato.",
        verdict: "false" as const,
      },
    ],
    studies: [
      {
        title: "Chronic nicotinamide mononucleotide supplementation elevates blood NAD+ levels and aerobic capacity in healthy middle-aged adults",
        authors: "Yoshino M, Yoshino J, Kayser BD, et al.",
        journal: "Science",
        year: 2021,
        pubmedId: "33888596",
        keyFindings: "NMN melhorou sensibilidade à insulina muscular em mulheres pós-menopausa pré-diabéticas em 10 semanas.",
        studyType: "rct" as const,
        sampleSize: 25,
        url: "https://pubmed.ncbi.nlm.nih.gov/33888596/",
      },
      {
        title: "Effect of 12-Week Intake of Nicotinamide Mononucleotide on Sleep Quality, Fatigue, and Physical Performance in Older Japanese Adults",
        authors: "Kim M, Seol J, Sato T, et al.",
        journal: "Nutrients",
        year: 2022,
        pubmedId: "35276903",
        keyFindings: "Suplementação com 250mg/dia de NMN por 12 semanas melhorou marcadores de qualidade do sono e função física em adultos idosos japoneses.",
        studyType: "rct" as const,
        sampleSize: 108,
        url: "https://pubmed.ncbi.nlm.nih.gov/35276903/",
      },
    ],
    faqs: [
      {
        question: "NMN é mesmo legal no Brasil?",
        answer: "NMN não é regulamentado especificamente pela ANVISA no Brasil. Diferente dos EUA, onde foi reclassificado como medicamento experimental, no Brasil é vendido como suplemento alimentar. Verifique a procedência e pureza do produto.",
        order: 1,
      },
    ],
  },
  {
    name: "NR (Nicotinamide Riboside)",
    slug: "nr-nicotinamide-riboside",
    aliases: ["Niagen", "Ribósido de Nicotinamida"],
    category: "longevity" as const,
    description:
      "IMPORTANTE: NR não é um peptídeo, é um nucleosídeo — outro precursor do NAD+, similar ao NMN mas com perfil regulatório e biodisponibilidade ligeiramente diferentes. Comercializado como Niagen pela ChromaDex, é o precursor de NAD+ com mais estudos clínicos publicados.",
    mechanism:
      "NR é convertido em NMN e depois em NAD+ via via de salvação. Diferente do NMN, NR atravessa a membrana celular mais facilmente e tem mais dados de farmacocinética em humanos. Aumenta NAD+ em sangue e tecidos, ativando sirtuínas e melhorando função mitocondrial.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "approved" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Aumento de NAD+ comprovado",
        evidence: "proven",
        description: "Múltiplos ensaios clínicos confirmam que NR oral aumenta NAD+ em sangue e tecidos em humanos.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/29163528/",
      },
      {
        name: "Função cardiovascular",
        evidence: "research",
        description: "Estudos clínicos mostram redução de pressão arterial sistólica e melhora de rigidez arterial em adultos de meia-idade.",
      },
      {
        name: "Saúde metabólica",
        evidence: "research",
        description: "Estudos sugerem benefícios em sensibilidade à insulina e marcadores de saúde metabólica.",
      },
    ],
    risks: [
      {
        name: "Eventos adversos leves",
        severity: "low" as const,
        frequency: "Incomum",
        description: "Náusea, fadiga e dor de cabeça relatados em alguns estudos clínicos. Geralmente leves.",
      },
    ],
    internetVsScience: [
      {
        claim: "Melhor que NMN",
        whatTheySay: "NR é superior ao NMN porque tem mais estudos clínicos.",
        actualEvidence: "NR tem mais estudos publicados que NMN, mas isso não significa que é necessariamente 'melhor'. Comparações head-to-head entre NR e NMN ainda são limitadas. Ambos aumentam NAD+ em humanos.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Nicotinamide riboside is uniquely and orally bioavailable in mice and humans",
        authors: "Trammell SAJ, Schmidt MS, Weidemann BJ, et al.",
        journal: "Nature Communications",
        year: 2016,
        pubmedId: "27721479",
        keyFindings: "Demonstrou que NR é eficientemente absorvido oralmente e aumenta NAD+ em sangue de humanos saudáveis.",
        studyType: "rct" as const,
        sampleSize: 12,
        url: "https://pubmed.ncbi.nlm.nih.gov/27721479/",
      },
      {
        title: "Chronic nicotinamide riboside supplementation is well-tolerated and elevates NAD+ in healthy middle-aged and older adults",
        authors: "Martens CR, Denman BA, Mazzo MR, et al.",
        journal: "Nature Communications",
        year: 2018,
        pubmedId: "29163528",
        keyFindings: "Suplementação com 1g/dia de NR por 6 semanas aumentou NAD+ em 60% e reduziu pressão arterial sistólica em adultos de meia-idade.",
        studyType: "rct" as const,
        sampleSize: 24,
        url: "https://pubmed.ncbi.nlm.nih.gov/29163528/",
      },
    ],
    faqs: [],
  },
  {
    name: "NAC",
    slug: "nac",
    aliases: ["N-Acetilcisteína", "N-Acetyl Cysteine", "Fluimucil"],
    category: "longevity" as const,
    description:
      "IMPORTANTE: NAC não é um peptídeo, é um derivado de aminoácido (cisteína acetilada). É um precursor da glutationa, o principal antioxidante endógeno do organismo. Uso médico estabelecido como mucolítico (expectorante) e antídoto para intoxicação por paracetamol. Popularizado no biohacking pelo potencial antioxidante e anti-inflamatório.",
    mechanism:
      "NAC é convertido em cisteína no organismo, que é o aminoácido limitante para síntese de glutationa (GSH). Glutationa é o principal antioxidante intracelular, neutralizando radicais livres e protegendo células do estresse oxidativo. NAC também tem propriedades mucolíticas (rompe ligações de muco) e modula vias inflamatórias.",
    researchPhase: "approved" as const,
    anvisaStatus: "approved" as const,
    fdaStatus: "approved" as const,
    emaStatus: "approved" as const,
    benefits: [
      {
        name: "Antídoto para paracetamol",
        evidence: "proven",
        description: "Tratamento padrão para overdose de paracetamol/acetaminofeno. Salva vidas quando administrado precocemente.",
      },
      {
        name: "Mucolítico",
        evidence: "proven",
        description: "Aprovado e amplamente usado para fluidificar secreções pulmonares em DPOC, fibrose cística e bronquite crônica.",
      },
      {
        name: "Saúde mental",
        evidence: "research",
        description: "Múltiplos estudos clínicos mostram benefícios em transtorno obsessivo-compulsivo, transtorno bipolar e tricotilomania.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/27640403/",
      },
      {
        name: "Saúde reprodutiva masculina",
        evidence: "research",
        description: "Estudos mostram melhora em qualidade espermática e fertilidade masculina.",
      },
    ],
    risks: [
      {
        name: "Náusea e desconforto gastrointestinal",
        severity: "low" as const,
        frequency: "Comum",
        description: "Efeito colateral mais comum, especialmente em doses altas. Tomar com alimentos ajuda.",
      },
      {
        name: "Sabor e odor desagradáveis",
        severity: "low" as const,
        frequency: "Universal",
        description: "NAC tem sabor sulfuroso característico (cheiro de ovo podre). Cápsulas e sachês contornam isso.",
      },
    ],
    internetVsScience: [
      {
        claim: "Cura long COVID",
        whatTheySay: "NAC cura sintomas pós-COVID e fadiga crônica.",
        actualEvidence: "Alguns estudos pequenos sugerem benefícios sintomáticos, mas evidência ainda é limitada e não conclusiva. NAC não 'cura' long COVID.",
        verdict: "unknown" as const,
      },
      {
        claim: "Detoxifica o corpo de metais pesados",
        whatTheySay: "NAC remove mercúrio e metais pesados do organismo.",
        actualEvidence: "Tem propriedades quelantes leves, mas não é tratamento de primeira linha para intoxicação por metais pesados. Uso para 'detox' não é validado cientificamente.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "N-acetylcysteine for the treatment of psychiatric disorders: A review of current evidence",
        authors: "Deepmala, Slattery J, Kumar N, et al.",
        journal: "Neuroscience & Biobehavioral Reviews",
        year: 2015,
        pubmedId: "26577244",
        keyFindings: "Revisão de 40+ ensaios clínicos demonstrando eficácia de NAC em transtornos psiquiátricos como TOC, esquizofrenia, depressão bipolar e adições.",
        studyType: "review" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/26577244/",
      },
    ],
    faqs: [
      {
        question: "Posso comprar NAC sem receita no Brasil?",
        answer: "Sim. NAC é vendido sem prescrição médica no Brasil sob nomes como Fluimucil, NAC e outros. É amplamente usado como mucolítico.",
        order: 1,
      },
    ],
  },
  {
    name: "Resveratrol",
    slug: "resveratrol",
    aliases: ["3,5,4'-trihidroxiestilbeno"],
    category: "longevity" as const,
    description:
      "IMPORTANTE: Resveratrol não é um peptídeo, é um polifenol natural encontrado em uvas vermelhas, vinho tinto, amendoim e algumas frutas. Ganhou fama nos anos 2000 quando estudos em camundongos sugeriram que ativava sirtuínas (proteínas associadas à longevidade). É um dos compostos mais estudados em pesquisa de envelhecimento.",
    mechanism:
      "Resveratrol ativa SIRT1, uma das sirtuínas associadas à longevidade. Mimetiza alguns efeitos da restrição calórica. Tem propriedades antioxidantes, anti-inflamatórias e melhora função mitocondrial. Atravessa a barreira hematoencefálica e atinge múltiplos tecidos.",
    researchPhase: "phase3" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Saúde cardiovascular",
        evidence: "research",
        description: "Estudos clínicos mostram melhora modesta em função endotelial, pressão arterial e marcadores inflamatórios.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/24882515/",
      },
      {
        name: "Sensibilidade à insulina",
        evidence: "research",
        description: "Meta-análises sugerem melhora modesta em controle glicêmico em pacientes com diabetes tipo 2.",
      },
      {
        name: "Anti-inflamatório",
        evidence: "research",
        description: "Reduz marcadores inflamatórios sistêmicos em vários estudos clínicos.",
      },
      {
        name: "Longevidade humana",
        evidence: "unproven",
        description: "Estudos em camundongos sugeriram aumento de longevidade, mas o efeito não foi replicado em outros estudos animais. Sem evidência de longevidade aumentada em humanos.",
      },
    ],
    risks: [
      {
        name: "Biodisponibilidade muito baixa",
        severity: "low" as const,
        frequency: "Universal",
        description: "Resveratrol é rapidamente metabolizado e tem biodisponibilidade oral muito baixa, levantando questões sobre sua eficácia em doses comerciais.",
      },
      {
        name: "Interações medicamentosas",
        severity: "medium" as const,
        frequency: "Variável",
        description: "Pode interagir com anticoagulantes e medicamentos metabolizados pelo citocromo P450.",
      },
    ],
    internetVsScience: [
      {
        claim: "Beber vinho tinto te dá os benefícios do resveratrol",
        whatTheySay: "Vinho tinto é saudável por causa do resveratrol.",
        actualEvidence: "A quantidade de resveratrol no vinho tinto é tão pequena que você precisaria beber centenas de garrafas por dia para atingir doses estudadas. Os possíveis benefícios cardiovasculares do vinho tinto vêm de outros compostos (e o álcool tem riscos).",
        verdict: "false" as const,
      },
      {
        claim: "Sirtuin Activator que reverte envelhecimento",
        whatTheySay: "Resveratrol ativa sirtuínas e reverte o envelhecimento (popularizado por David Sinclair).",
        actualEvidence: "Ativa SIRT1 in vitro. Em humanos, os benefícios são modestos e o efeito sobre longevidade nunca foi demonstrado. Estudos em camundongos foram inconsistentes.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Resveratrol: From Animal to Human Studies",
        authors: "Tomé-Carneiro J, Larrosa M, González-Sarrías A, et al.",
        journal: "Annual Review of Food Science and Technology",
        year: 2013,
        pubmedId: "23550776",
        keyFindings: "Revisão abrangente mostrando que enquanto resveratrol mostra benefícios consistentes em estudos animais, a tradução para humanos é limitada por baixa biodisponibilidade.",
        studyType: "review" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/23550776/",
      },
    ],
    faqs: [],
  },
  {
    name: "Rapamicina",
    slug: "rapamicina",
    aliases: ["Sirolimus", "Rapamune"],
    category: "longevity" as const,
    description:
      "IMPORTANTE: Rapamicina não é um peptídeo, é um macrolídeo (composto natural produzido pela bactéria Streptomyces hygroscopicus, descoberta em solo da Ilha de Páscoa — Rapa Nui). Originalmente desenvolvida como imunossupressor para transplantes, é hoje a substância mais promissora em pesquisa de longevidade — única droga consistentemente comprovada a prolongar vida em mamíferos.",
    mechanism:
      "Rapamicina inibe a proteína mTOR (mechanistic Target Of Rapamycin), um regulador central de crescimento celular, metabolismo e autofagia. Inibição parcial de mTOR ativa autofagia (reciclagem celular), mimetiza efeitos de jejum e restrição calórica, e tem efeitos anti-envelhecimento em múltiplos tecidos.",
    researchPhase: "approved" as const,
    anvisaStatus: "approved" as const,
    fdaStatus: "approved" as const,
    emaStatus: "approved" as const,
    benefits: [
      {
        name: "Aumento de longevidade em mamíferos",
        evidence: "proven",
        description: "Único composto consistentemente comprovado a aumentar tempo de vida em camundongos, ratos e outros modelos animais. Aumento de 9-26% no tempo de vida em camundongos.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/19587680/",
      },
      {
        name: "Imunossupressão (uso aprovado)",
        evidence: "proven",
        description: "Aprovado para prevenção de rejeição em transplantes de órgãos. Único uso oficialmente aprovado.",
      },
      {
        name: "Função imune em idosos",
        evidence: "research",
        description: "Estudo PEARL e outros mostraram que doses baixas intermitentes melhoram resposta imune a vacinas em idosos sem causar imunossupressão significativa.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/25540326/",
      },
      {
        name: "Longevidade humana",
        evidence: "unproven",
        description: "Apesar da evidência em animais, o efeito sobre longevidade humana ainda não foi demonstrado em ensaios clínicos. Estudos em andamento.",
      },
    ],
    risks: [
      {
        name: "Imunossupressão",
        severity: "high" as const,
        frequency: "Dose-dependente",
        description: "Em doses contínuas (transplantes), suprime o sistema imune, aumentando risco de infecções e câncer. Doses baixas intermitentes para longevidade têm risco menor mas não desconhecido.",
      },
      {
        name: "Distúrbios metabólicos",
        severity: "medium" as const,
        frequency: "Comum",
        description: "Pode causar resistência à insulina, dislipidemia e intolerância à glicose, paradoxalmente aumentando risco de diabetes.",
      },
      {
        name: "Aftas e mucosite",
        severity: "low" as const,
        frequency: "30%",
        description: "Úlceras orais são efeito colateral comum, mesmo em doses baixas.",
      },
      {
        name: "Uso off-label",
        severity: "medium" as const,
        frequency: "N/A",
        description: "Uso para longevidade é off-label (fora da indicação aprovada). Requer prescrição médica e acompanhamento. Não é vendido sem receita.",
      },
    ],
    internetVsScience: [
      {
        claim: "Pílula da longevidade",
        whatTheySay: "Rapamicina é a pílula que prolonga a vida — aprovada por médicos de longevidade.",
        actualEvidence: "É o composto mais promissor em pesquisa de longevidade animal, com evidência sólida em camundongos. Mas a evidência em humanos ainda é limitada e há riscos reais. Não é uma 'pílula da juventude' livre de consequências.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Rapamycin fed late in life extends lifespan in genetically heterogeneous mice",
        authors: "Harrison DE, Strong R, Sharp ZD, et al.",
        journal: "Nature",
        year: 2009,
        pubmedId: "19587680",
        doi: "10.1038/nature08221",
        keyFindings: "Estudo seminal: rapamicina aumentou longevidade em camundongos mesmo quando administrada tarde na vida (equivalente a humanos de 60 anos). Aumento de 9% (machos) e 14% (fêmeas) no tempo de vida.",
        studyType: "animal" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/19587680/",
      },
      {
        title: "mTOR inhibition improves immune function in the elderly",
        authors: "Mannick JB, Del Giudice G, Lattanzi M, et al.",
        journal: "Science Translational Medicine",
        year: 2014,
        pubmedId: "25540326",
        keyFindings: "Inibição de mTOR com everolimo (análogo da rapamicina) por 6 semanas melhorou resposta imune à vacina contra influenza em idosos.",
        studyType: "rct" as const,
        sampleSize: 218,
        url: "https://pubmed.ncbi.nlm.nih.gov/25540326/",
      },
    ],
    faqs: [
      {
        question: "Como conseguir rapamicina para longevidade no Brasil?",
        answer: "Rapamicina (Rapamune, sirolimus) é um medicamento controlado, aprovado pela ANVISA para imunossupressão em transplantes. Uso para longevidade é off-label e requer prescrição médica. Apenas alguns médicos especializados em longevidade prescrevem.",
        order: 1,
      },
    ],
  },
  {
    name: "Metformina",
    slug: "metformina",
    aliases: ["Glifage", "Glucophage"],
    category: "longevity" as const,
    description:
      "IMPORTANTE: Metformina não é um peptídeo, é uma biguanida derivada da planta Galega officinalis. É o medicamento de primeira linha para diabetes tipo 2 há décadas, com bilhões de prescrições. Ganhou enorme atenção em longevidade após estudos sugerirem que diabéticos tomando metformina vivem mais que não-diabéticos. O estudo TAME está testando se prolonga vida humana saudável.",
    mechanism:
      "Metformina ativa AMPK (sensor energético celular), inibe gliconeogênese hepática, melhora sensibilidade à insulina e tem efeitos diretos na microbiota intestinal. Mecanismos adicionais incluem redução de inflamação sistêmica, modulação de mTOR e potencial efeito direto em vias do envelhecimento.",
    researchPhase: "approved" as const,
    anvisaStatus: "approved" as const,
    fdaStatus: "approved" as const,
    emaStatus: "approved" as const,
    benefits: [
      {
        name: "Diabetes tipo 2",
        evidence: "proven",
        description: "Tratamento de primeira linha há décadas. Reduz HbA1c em 1-2%, com perfil de segurança excelente e baixo custo.",
      },
      {
        name: "Prevenção de diabetes",
        evidence: "proven",
        description: "Estudo DPP demonstrou redução de 31% na incidência de diabetes em pessoas pré-diabéticas tratadas com metformina.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/11832527/",
      },
      {
        name: "Possível efeito anti-câncer",
        evidence: "research",
        description: "Estudos observacionais sugerem que diabéticos em metformina têm menor incidência de vários tipos de câncer. Mecanismo ainda em investigação.",
      },
      {
        name: "Longevidade",
        evidence: "research",
        description: "Estudos epidemiológicos sugerem que diabéticos em metformina vivem mais que não-diabéticos. Estudo TAME (em andamento) testará se metformina retarda envelhecimento em humanos não-diabéticos.",
      },
    ],
    risks: [
      {
        name: "Desconforto gastrointestinal",
        severity: "low" as const,
        frequency: "20-30%",
        description: "Náusea, diarreia e desconforto abdominal são comuns, especialmente no início. Geralmente diminui com o tempo. Versão XR (liberação prolongada) é melhor tolerada.",
      },
      {
        name: "Deficiência de B12",
        severity: "medium" as const,
        frequency: "Uso longo prazo",
        description: "Uso prolongado pode reduzir absorção de vitamina B12. Suplementação periódica recomendada.",
      },
      {
        name: "Acidose láctica (raro)",
        severity: "high" as const,
        frequency: "Muito raro",
        description: "Complicação rara mas grave, especialmente em pacientes com insuficiência renal. Contraindicada em insuficiência renal severa.",
      },
    ],
    internetVsScience: [
      {
        claim: "Pílula anti-aging para todos",
        whatTheySay: "Toda pessoa acima de 40 deveria tomar metformina para envelhecer mais devagar.",
        actualEvidence: "Evidência de longevidade vem de estudos observacionais em diabéticos, não em pessoas saudáveis. Estudos em atletas saudáveis sugerem que metformina pode na verdade reduzir benefícios do exercício. Estudo TAME em andamento responderá essa questão.",
        verdict: "unknown" as const,
      },
      {
        claim: "Reduz benefícios do exercício",
        whatTheySay: "Metformina cancela ganhos de força e adaptação ao exercício.",
        actualEvidence: "Verdadeiro em estudos. Em adultos não-diabéticos saudáveis, metformina atenuou ganhos em força e aptidão cardiorrespiratória induzidos por treinamento. Para atletas, pode ser contraproducente.",
        verdict: "true" as const,
      },
    ],
    studies: [
      {
        title: "Reduction in the Incidence of Type 2 Diabetes with Lifestyle Intervention or Metformin",
        authors: "Diabetes Prevention Program Research Group",
        journal: "New England Journal of Medicine",
        year: 2002,
        pubmedId: "11832527",
        keyFindings: "Metformina reduziu incidência de diabetes em 31% em pessoas com pré-diabetes ao longo de 2.8 anos.",
        studyType: "rct" as const,
        sampleSize: 3234,
        url: "https://pubmed.ncbi.nlm.nih.gov/11832527/",
      },
      {
        title: "Metformin inhibits mitochondrial adaptations to aerobic exercise training in older adults",
        authors: "Konopka AR, Laurin JL, Schoenberg HM, et al.",
        journal: "Aging Cell",
        year: 2019,
        pubmedId: "30548390",
        keyFindings: "Metformina atenuou adaptações mitocondriais e ganhos de aptidão cardiorrespiratória induzidos por exercício aeróbico em adultos mais velhos.",
        studyType: "rct" as const,
        sampleSize: 53,
        url: "https://pubmed.ncbi.nlm.nih.gov/30548390/",
      },
    ],
    faqs: [
      {
        question: "Posso tomar metformina mesmo sem ser diabético?",
        answer: "No Brasil, metformina requer prescrição médica. Uso off-label para longevidade ou pré-diabetes é decisão entre paciente e médico. O estudo TAME (em andamento) testará se metformina prolonga vida saudável em não-diabéticos.",
        order: 1,
      },
    ],
  },
  {
    name: "Espermidina",
    slug: "espermidina",
    aliases: ["Spermidine"],
    category: "longevity" as const,
    description:
      "IMPORTANTE: Espermidina não é um peptídeo, é uma poliamina natural encontrada em todas as células vivas. Presente em alta concentração em germe de trigo, queijo envelhecido (especialmente cheddar maduro), cogumelos, soja e nattō. Ativa autofagia (reciclagem celular) e mostrou aumentar longevidade em modelos animais. Em humanos, está associada a redução de mortalidade cardiovascular.",
    mechanism:
      "Espermidina é um indutor potente de autofagia — o processo celular de reciclar componentes danificados. Inibe acetiltransferases de histonas, modulando expressão gênica. Reduz inflamação, melhora função mitocondrial e cardíaca, e mimetiza efeitos da restrição calórica em vários sistemas.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Indução de autofagia",
        evidence: "proven",
        description: "Demonstrada em múltiplos estudos in vitro e in vivo. Considerada um dos indutores naturais mais potentes de autofagia.",
      },
      {
        name: "Saúde cardiovascular",
        evidence: "research",
        description: "Estudos populacionais associam consumo dietético alto de espermidina com menor mortalidade cardiovascular e por todas as causas.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/29955838/",
      },
      {
        name: "Função cognitiva",
        evidence: "research",
        description: "Estudo SmartAge mostrou melhora modesta em memória em adultos idosos com declínio cognitivo subjetivo após 3 meses de suplementação.",
      },
      {
        name: "Longevidade animal",
        evidence: "research",
        description: "Aumento de tempo de vida demonstrado em leveduras, vermes, moscas, camundongos e cardiomiócitos humanos in vitro.",
      },
    ],
    risks: [
      {
        name: "Estudos clínicos limitados",
        severity: "low" as const,
        frequency: "N/A",
        description: "Existe na dieta há sempre, então perfil de segurança é favorável. Mas estudos clínicos com doses suplementares ainda são limitados.",
      },
    ],
    internetVsScience: [
      {
        claim: "Comer queijo cheddar te faz viver mais",
        whatTheySay: "Queijo envelhecido tem espermidina e por isso prolonga vida.",
        actualEvidence: "Verdadeiro que cheddar maduro contém espermidina. Estudos populacionais associam consumo dietético maior com longevidade. Mas atribuir longevidade a um único componente do queijo é simplificação — a dieta como um todo importa.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Higher spermidine intake is linked to lower mortality: a prospective population-based study",
        authors: "Kiechl S, Pechlaner R, Willeit P, et al.",
        journal: "American Journal of Clinical Nutrition",
        year: 2018,
        pubmedId: "29955838",
        keyFindings: "Estudo Bruneck: maior consumo dietético de espermidina associado a 21% de redução em mortalidade geral, principalmente cardiovascular.",
        studyType: "cohort" as const,
        sampleSize: 829,
        url: "https://pubmed.ncbi.nlm.nih.gov/29955838/",
      },
    ],
    faqs: [],
  },
  {
    name: "Fisetina",
    slug: "fisetina",
    aliases: ["Fisetin"],
    category: "longevity" as const,
    description:
      "IMPORTANTE: Fisetina não é um peptídeo, é um flavonoide (polifenol) encontrado em frutas e vegetais como morangos (a fonte mais rica), maçãs, caquis, uvas e cebolas. Ganhou destaque na pesquisa de longevidade como senolítico — composto que elimina seletivamente células senescentes ('zumbis') que se acumulam com a idade e contribuem para inflamação crônica.",
    mechanism:
      "Fisetina é classificada como senolítico — induz apoptose seletiva em células senescentes (células velhas que pararam de se dividir mas não morrem, secretando moléculas inflamatórias). Também tem propriedades antioxidantes, anti-inflamatórias e neuroprotetoras. Atravessa a barreira hematoencefálica.",
    researchPhase: "phase2" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Atividade senolítica",
        evidence: "research",
        description: "Demonstrada em estudos in vitro e em camundongos. Foi identificada como o senolítico mais potente entre flavonoides testados.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/30279143/",
      },
      {
        name: "Aumento de longevidade em camundongos",
        evidence: "research",
        description: "Camundongos tratados com fisetina tarde na vida tiveram aumento de 10% no tempo de vida e redução de marcadores de senescência.",
      },
      {
        name: "Neuroproteção",
        evidence: "research",
        description: "Estudos em modelos animais de Alzheimer e Parkinson mostram efeitos neuroprotetores e melhora cognitiva.",
      },
    ],
    risks: [
      {
        name: "Biodisponibilidade muito baixa",
        severity: "medium" as const,
        frequency: "Universal",
        description: "Fisetina tem absorção oral muito baixa. Doses suplementares precisam ser bem maiores que as obtidas naturalmente da dieta.",
      },
      {
        name: "Sem estudos humanos completos",
        severity: "medium" as const,
        frequency: "N/A",
        description: "Ensaios clínicos em humanos estão em fase 1/2 (ex: estudo na Mayo Clinic). Eficácia em humanos ainda não foi confirmada.",
      },
    ],
    internetVsScience: [
      {
        claim: "Mata células zumbis e te rejuvenesce",
        whatTheySay: "Fisetina é o senolítico natural que limpa células velhas e reverte envelhecimento.",
        actualEvidence: "Atividade senolítica é real em laboratório e em camundongos. Mas o efeito 'rejuvenescedor' em humanos ainda não foi demonstrado em ensaios clínicos. Pesquisa promissora, mas não conclusiva.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Fisetin is a senotherapeutic that extends health and lifespan",
        authors: "Yousefzadeh MJ, Zhu Y, McGowan SJ, et al.",
        journal: "EBioMedicine",
        year: 2018,
        pubmedId: "30279143",
        keyFindings: "Fisetina foi identificada como o flavonoide senolítico mais potente. Em camundongos idosos, restaurou homeostase tecidual, reduziu patologias relacionadas à idade e estendeu mediana de tempo de vida.",
        studyType: "animal" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/30279143/",
      },
    ],
    faqs: [],
  },
  {
    name: "Glutationa",
    slug: "glutationa",
    aliases: ["Glutathione", "GSH"],
    category: "immune" as const,
    description:
      "Diferente de NMN/NAC/Resveratrol, Glutationa É TECNICAMENTE UM PEPTÍDEO — um tripeptídeo composto por glutamato, cisteína e glicina (γ-Glu-Cys-Gly). É o principal antioxidante intracelular do organismo e desempenha papel central em desintoxicação hepática, função imune e proteção contra estresse oxidativo. Os níveis caem com a idade.",
    mechanism:
      "Glutationa atua como sequestrador de radicais livres, regenera outros antioxidantes (vitaminas C e E), conjuga toxinas no fígado para excreção, e modula função imune. A enzima glutationa peroxidase usa GSH para neutralizar peróxido de hidrogênio. Também regula sinalização celular e expressão gênica via reações redox.",
    researchPhase: "phase3" as const,
    anvisaStatus: "approved" as const,
    fdaStatus: "approved" as const,
    emaStatus: "approved" as const,
    benefits: [
      {
        name: "Antioxidante intracelular",
        evidence: "proven",
        description: "Comprovadamente o principal antioxidante endógeno. Níveis de GSH são marcador de saúde celular.",
      },
      {
        name: "Suporte hepático",
        evidence: "proven",
        description: "Essencial para fase 2 da desintoxicação hepática. Usado clinicamente em hepatopatias e intoxicações.",
      },
      {
        name: "Suplementação oral",
        evidence: "research",
        description: "Forma lipossomal aumenta níveis de GSH em humanos. Suplementação convencional tem absorção limitada — NAC é frequentemente preferido por aumentar GSH endógeno indiretamente.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/29347432/",
      },
      {
        name: "Clareamento de pele",
        evidence: "research",
        description: "Popular em clínicas estéticas para clareamento de pele. Evidência clínica é limitada e mecanismo controverso.",
      },
    ],
    risks: [
      {
        name: "Absorção oral baixa",
        severity: "low" as const,
        frequency: "Forma convencional",
        description: "Glutationa oral convencional é degradada no intestino. Formas lipossomais ou administração intravenosa são alternativas, mas custo é maior.",
      },
      {
        name: "Uso intravenoso para clareamento",
        severity: "medium" as const,
        frequency: "Variável",
        description: "Uso IV de glutationa para clareamento de pele tem riscos: reações alérgicas, problemas renais e infecções por má prática. ANVISA emitiu alerta contra uso off-label.",
      },
    ],
    internetVsScience: [
      {
        claim: "Glutationa intravenosa clareia a pele permanentemente",
        whatTheySay: "Aplicação IV de glutationa em clínicas estéticas para 'clareamento da pele'.",
        actualEvidence: "Evidência clínica é limitada e a ANVISA não aprova uso para clareamento. Há relatos de eventos adversos. Efeitos são temporários quando ocorrem.",
        verdict: "partial" as const,
      },
      {
        claim: "Tomar glutationa oral aumenta seus níveis",
        whatTheySay: "Cápsulas de glutationa aumentam glutationa no corpo.",
        actualEvidence: "Glutationa oral convencional tem biodisponibilidade muito baixa — é degradada no intestino. Formas lipossomais têm melhor absorção. NAC (precursor) é frequentemente mais eficaz para aumentar GSH endógeno.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Liposomal glutathione supplementation restores TH1 cytokine response and impairs immune defenses in HIV-infected individuals",
        authors: "Ly J, Lagman M, Saing T, et al.",
        journal: "Journal of Interferon & Cytokine Research",
        year: 2018,
        pubmedId: "29347432",
        keyFindings: "Suplementação com glutationa lipossomal aumentou níveis de GSH e melhorou função imune em pacientes HIV.",
        studyType: "rct" as const,
        sampleSize: 30,
        url: "https://pubmed.ncbi.nlm.nih.gov/29347432/",
      },
    ],
    faqs: [
      {
        question: "Glutationa é mesmo um peptídeo?",
        answer: "Sim. Glutationa é tecnicamente um tripeptídeo (3 aminoácidos: glutamato, cisteína, glicina). Diferente de NMN, NAC ou resveratrol, ela se enquadra na definição de peptídeo. Está classificada nesta base como peptídeo imunológico.",
        order: 1,
      },
    ],
  },
  {
    name: "Urolitina A",
    slug: "urolitina-a",
    aliases: ["Urolithin A", "Mitopure"],
    category: "longevity" as const,
    description:
      "IMPORTANTE: Urolitina A não é um peptídeo, é um metabólito produzido pela microbiota intestinal a partir de elagitaninos encontrados em romã, framboesa, morango e nozes. Apenas 30-40% das pessoas têm bactérias intestinais que produzem urolitina A naturalmente — o resto precisa suplementar. Único composto comprovado clinicamente a induzir mitofagia (reciclagem de mitocôndrias) em humanos.",
    mechanism:
      "Urolitina A induz mitofagia — o processo de reciclagem seletiva de mitocôndrias danificadas. Mitocôndrias disfuncionais acumulam-se com a idade, contribuindo para sarcopenia e declínio metabólico. Ao remover essas mitocôndrias 'velhas', urolitina A melhora qualidade do pool mitocondrial e função celular.",
    researchPhase: "phase3" as const,
    anvisaStatus: "not_regulated" as const,
    fdaStatus: "not_regulated" as const,
    emaStatus: "not_regulated" as const,
    benefits: [
      {
        name: "Indução de mitofagia em humanos",
        evidence: "proven",
        description: "Único composto demonstrado clinicamente a induzir mitofagia em humanos. Estudo confirmou aumento de marcadores de mitofagia em sangue após 28 dias.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/31178679/",
      },
      {
        name: "Função muscular",
        evidence: "research",
        description: "Estudos clínicos demonstraram melhora em força muscular e endurance em adultos de meia-idade e idosos.",
        studyUrl: "https://pubmed.ncbi.nlm.nih.gov/35145277/",
      },
      {
        name: "Saúde mitocondrial",
        evidence: "research",
        description: "Melhora marcadores de função mitocondrial e biogênese em estudos clínicos.",
      },
    ],
    risks: [
      {
        name: "Perfil de segurança favorável",
        severity: "low" as const,
        frequency: "Raro",
        description: "Estudos clínicos mostram perfil de segurança excelente. Eventos adversos são raros e leves (gastrointestinais).",
      },
      {
        name: "Custo elevado",
        severity: "low" as const,
        frequency: "N/A",
        description: "Mitopure (única forma estudada clinicamente) tem custo significativo, equivalente a US$ 60-90/mês.",
      },
    ],
    internetVsScience: [
      {
        claim: "Pílula da longevidade muscular",
        whatTheySay: "Urolitina A te dá músculos jovens sem treinar.",
        actualEvidence: "Melhora função mitocondrial e marcadores musculares, mas não substitui exercício. Os benefícios são modestos (melhora ~12% em endurance muscular). Não é mágica.",
        verdict: "partial" as const,
      },
    ],
    studies: [
      {
        title: "Urolithin A induces mitophagy and prolongs lifespan in C. elegans and increases muscle function in rodents",
        authors: "Ryu D, Mouchiroud L, Andreux PA, et al.",
        journal: "Nature Medicine",
        year: 2016,
        pubmedId: "27400265",
        keyFindings: "Estudo pioneiro: urolitina A induziu mitofagia e prolongou vida em C. elegans, e melhorou função muscular em camundongos jovens e idosos.",
        studyType: "animal" as const,
        url: "https://pubmed.ncbi.nlm.nih.gov/27400265/",
      },
      {
        title: "Urolithin A improves muscle strength, exercise performance, and biomarkers of mitochondrial health in a randomized trial in middle-aged adults",
        authors: "Liu S, D'Amico D, Shankland E, et al.",
        journal: "JAMA Network Open",
        year: 2022,
        pubmedId: "35145277",
        keyFindings: "Suplementação com 1g/dia de urolitina A por 4 meses melhorou força muscular dos extensores de joelho e ATP mitocondrial em adultos de meia-idade.",
        studyType: "rct" as const,
        sampleSize: 88,
        url: "https://pubmed.ncbi.nlm.nih.gov/35145277/",
      },
    ],
    faqs: [
      {
        question: "Posso obter urolitina A naturalmente?",
        answer: "Apenas 30-40% das pessoas têm a microbiota intestinal capaz de converter elagitaninos (de romã, nozes, framboesas) em urolitina A. Para os outros 60-70%, a suplementação direta é a única forma de obtê-la. Um teste de urina pode determinar se você é produtor natural.",
        order: 1,
      },
    ],
  },
];

async function main() {
  console.log("Seeding longevity compounds...\n");

  for (const data of compounds) {
    const { studies, faqs, ...peptideData } = data;

    const existing = await prisma.peptide.findUnique({
      where: { slug: peptideData.slug },
    });
    if (existing) {
      await prisma.study.deleteMany({ where: { peptideId: existing.id } });
      await prisma.peptideFaq.deleteMany({ where: { peptideId: existing.id } });
    }

    const peptide = await prisma.peptide.upsert({
      where: { slug: peptideData.slug },
      update: { ...peptideData, published: true, publishedAt: new Date() },
      create: { ...peptideData, published: true, publishedAt: new Date() },
    });

    console.log(`  ✓ ${peptide.name}`);

    for (const study of studies) {
      await prisma.study.create({ data: { ...study, peptideId: peptide.id } });
    }
    if (studies.length > 0) console.log(`    + ${studies.length} studies`);

    for (const faq of faqs) {
      await prisma.peptideFaq.create({ data: { ...faq, peptideId: peptide.id } });
    }
    if (faqs.length > 0) console.log(`    + ${faqs.length} FAQs`);
  }

  const total = await prisma.peptide.count();
  console.log(`\nDone! Total compounds in database: ${total}`);
}

main()
  .then(() => { prisma.$disconnect(); pool.end(); })
  .catch((e) => { console.error(e); prisma.$disconnect(); pool.end(); process.exit(1); });

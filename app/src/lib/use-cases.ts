// Use cases (intent-based collections of peptides)
// Used for /uso/[slug] programmatic SEO pages

export type UseCase = {
  slug: string;
  label: string;
  shortDescription: string;
  longDescription: string;
  peptideSlugs: string[]; // ordered by relevance
  searchKeywords: string[];
};

export const useCases: UseCase[] = [
  {
    slug: "emagrecimento",
    label: "Peptídeos para Emagrecimento",
    shortDescription:
      "Os peptídeos mais pesquisados e eficazes para perda de peso, do Ozempic ao AOD-9604.",
    longDescription:
      "A categoria de peptídeos para emagrecimento foi revolucionada pelos agonistas GLP-1, com semaglutida e tirzepatida demonstrando perdas de peso de 15-22% em ensaios clínicos. Outros peptídeos com pesquisa em emagrecimento incluem AOD-9604 (fragmento de hormônio de crescimento), tesamorelin (gordura visceral) e MOTS-c (metabolismo). Para todos, a indicação correta requer avaliação médica.",
    peptideSlugs: [
      "semaglutida",
      "tirzepatida",
      "tesamorelin",
      "aod-9604",
      "mots-c",
      "metformina",
    ],
    searchKeywords: ["emagrecer", "perder peso", "obesidade", "queimar gordura"],
  },
  {
    slug: "longevidade",
    label: "Peptídeos e Compostos para Longevidade",
    shortDescription:
      "Os compostos mais promissores em pesquisa de longevidade: rapamicina, NMN, espermidina e mais.",
    longDescription:
      "A pesquisa em longevidade explorou dezenas de compostos. Rapamicina é o único consistentemente comprovado a aumentar tempo de vida em mamíferos. NMN, NR e NAD+ atuam como precursores da coenzima essencial para metabolismo celular. Espermidina induz autofagia. Fisetina é senolítica. Resveratrol ativa sirtuínas. Esta página agrega todos os principais compostos da pesquisa de longevidade — peptídeos e não-peptídeos.",
    peptideSlugs: [
      "rapamicina",
      "nmn",
      "nr-nicotinamide-riboside",
      "espermidina",
      "fisetina",
      "metformina",
      "ss-31",
      "mots-c",
      "urolitina-a",
      "epithalon",
    ],
    searchKeywords: [
      "anti-aging",
      "antienvelhecimento",
      "viver mais",
      "rejuvenescimento",
    ],
  },
  {
    slug: "recuperacao-muscular",
    label: "Peptídeos para Recuperação e Lesões",
    shortDescription:
      "Peptídeos pesquisados para cicatrização de tendões, músculos e tecidos.",
    longDescription:
      "BPC-157 e TB-500 são os peptídeos mais populares na comunidade atlética para recuperação. Ambos têm evidência robusta em modelos animais mas zero estudos clínicos em humanos publicados. Cerebrolysin e SS-31 também têm aplicações em recuperação tecidual. Importante: nenhum desses peptídeos é aprovado para uso atlético, e produtos vendidos sem prescrição podem ser contaminados.",
    peptideSlugs: ["bpc-157", "tb-500", "ghk-cu", "ss-31"],
    searchKeywords: [
      "lesão",
      "tendão",
      "recuperação atletas",
      "cicatrização",
    ],
  },
  {
    slug: "anti-aging",
    label: "Peptídeos Anti-Aging",
    shortDescription:
      "Peptídeos e compostos pesquisados para retardar marcadores do envelhecimento.",
    longDescription:
      "Anti-aging é um termo amplo que inclui peptídeos cosméticos para pele (GHK-Cu), compostos para regeneração mitocondrial (SS-31, MOTS-c, urolitina A), senolíticos (fisetina), e drogas off-label como rapamicina. O GHK-Cu tem a evidência clínica mais robusta para uso tópico. Para anti-aging sistêmico, a pesquisa ainda é majoritariamente animal.",
    peptideSlugs: [
      "ghk-cu",
      "epithalon",
      "ss-31",
      "fisetina",
      "rapamicina",
      "urolitina-a",
      "espermidina",
    ],
    searchKeywords: ["pele", "rugas", "envelhecimento", "colágeno"],
  },
  {
    slug: "cognicao",
    label: "Peptídeos para Cognição e Memória",
    shortDescription:
      "Peptídeos nootrópicos: Selank, Cerebrolysin, Dihexa, Semax e mais.",
    longDescription:
      "Peptídeos nootrópicos atuam no sistema nervoso central para melhorar memória, foco ou função cognitiva. Cerebrolysin tem aprovação em 40+ países para AVC e demência. Selank é aprovado na Rússia como ansiolítico. Dihexa tem potência impressionante in vitro mas zero estudos humanos. Importante: declínio cognitivo merece avaliação médica adequada.",
    peptideSlugs: ["selank", "dihexa", "ss-31", "espermidina", "nmn"],
    searchKeywords: ["nootrópico", "memória", "foco", "cérebro"],
  },
  {
    slug: "imunidade",
    label: "Peptídeos para Sistema Imunológico",
    shortDescription:
      "Peptídeos imunomoduladores: Thymosin Alpha-1, KPV, LL-37 e Glutationa.",
    longDescription:
      "Peptídeos que modulam a resposta imune sem causar imunossupressão. Thymosin Alpha-1 tem mais evidência clínica e aprovação em 30+ países para hepatite. KPV é anti-inflamatório potente em modelos animais. LL-37 é antimicrobiano. Glutationa é o principal antioxidante intracelular.",
    peptideSlugs: ["thymosin-alpha-1", "kpv", "ll-37", "glutationa", "nac"],
    searchKeywords: ["imunidade", "sistema imune", "infecção", "inflamação"],
  },
  {
    slug: "sono",
    label: "Peptídeos para Sono",
    shortDescription:
      "Peptídeos pesquisados para melhorar qualidade do sono e ritmo circadiano.",
    longDescription:
      "DSIP (Delta Sleep-Inducing Peptide) é o peptídeo mais associado a sono profundo. Selank tem efeitos ansiolíticos que indiretamente beneficiam sono. NMN mostrou melhora em qualidade subjetiva do sono em estudo japonês. Epithalon regula produção de melatonina pela glândula pineal. Estudos clínicos para todos esses são limitados.",
    peptideSlugs: ["dsip", "selank", "nmn", "epithalon"],
    searchKeywords: ["dormir melhor", "insônia", "sono profundo", "melatonina"],
  },
  {
    slug: "diabetes",
    label: "Peptídeos para Diabetes Tipo 2",
    shortDescription:
      "Peptídeos GLP-1 e outros tratamentos modernos para diabetes tipo 2.",
    longDescription:
      "Os agonistas GLP-1 (semaglutida, tirzepatida) são os tratamentos mais inovadores para diabetes tipo 2 nos últimos 10 anos. Reduzem HbA1c em 1.5-2.4% e oferecem benefícios cardiovasculares adicionais. Metformina continua sendo primeira linha. Esta página agrega todas as opções com evidência sólida.",
    peptideSlugs: ["semaglutida", "tirzepatida", "metformina", "nmn"],
    searchKeywords: ["diabetes", "glicose", "insulina", "HbA1c"],
  },
];

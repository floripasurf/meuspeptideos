// Use cases (intent-based collections of peptides)
// Used for /uso/[slug] programmatic SEO pages

export type RankedPeptide = {
  slug: string;
  rationale: string; // brief reason for the rank
};

export type UseCase = {
  slug: string;
  label: string;
  shortDescription: string;
  longDescription: string;
  peptides: RankedPeptide[]; // ordered by rank (1st = best)
  searchKeywords: string[];
  emoji: string;
};

export const useCases: UseCase[] = [
  {
    slug: "emagrecimento",
    label: "Peptídeos para Emagrecimento",
    shortDescription:
      "Os peptídeos mais pesquisados e eficazes para perda de peso, do Ozempic ao AOD-9604.",
    longDescription:
      "A categoria de peptídeos para emagrecimento foi revolucionada pelos agonistas GLP-1, com semaglutida e tirzepatida demonstrando perdas de peso de 15-22% em ensaios clínicos. Outros peptídeos com pesquisa em emagrecimento incluem AOD-9604 (fragmento de hormônio de crescimento), tesamorelin (gordura visceral) e MOTS-c (metabolismo). Para todos, a indicação correta requer avaliação médica.",
    emoji: "⚖️",
    searchKeywords: ["emagrecer", "perder peso", "obesidade", "queimar gordura"],
    peptides: [
      {
        slug: "tirzepatida",
        rationale:
          "Maior eficácia comprovada para perda de peso em estudos clínicos: até 22.5% do peso corporal em 72 semanas (estudo SURMOUNT-1). Agonista duplo GIP+GLP-1.",
      },
      {
        slug: "semaglutida",
        rationale:
          "Padrão-ouro atual para tratamento medicamentoso da obesidade: perda média de 15% do peso. Aprovado pela ANVISA, FDA e EMA. Disponível no Brasil.",
      },
      {
        slug: "tesamorelin",
        rationale:
          "Único peptídeo aprovado pelo FDA especificamente para redução de gordura visceral (15-18% em estudos). Indicação original em lipodistrofia HIV.",
      },
      {
        slug: "metformina",
        rationale:
          "Não é peptídeo, mas frequentemente combinado com GLP-1s. Reduz absorção de glicose e tem perfil de segurança décadas validado.",
      },
      {
        slug: "aod-9604",
        rationale:
          "Fragmento sintético do GH com efeito lipolítico. Estudos modestos em humanos. Eficácia clínica menor que GLP-1s.",
      },
      {
        slug: "mots-c",
        rationale:
          "Mimetiza efeitos do exercício no metabolismo. Promissor mas com apenas 1 estudo clínico em humanos publicado.",
      },
    ],
  },
  {
    slug: "longevidade",
    label: "Peptídeos e Compostos para Longevidade",
    shortDescription:
      "Os compostos mais promissores em pesquisa de longevidade: rapamicina, NMN, espermidina e mais.",
    longDescription:
      "A pesquisa em longevidade explorou dezenas de compostos. Rapamicina é o único consistentemente comprovado a aumentar tempo de vida em mamíferos. NMN, NR e NAD+ atuam como precursores da coenzima essencial para metabolismo celular. Espermidina induz autofagia. Fisetina é senolítica. Resveratrol ativa sirtuínas. Esta página agrega todos os principais compostos da pesquisa de longevidade — peptídeos e não-peptídeos.",
    emoji: "♾️",
    searchKeywords: ["anti-aging", "antienvelhecimento", "viver mais", "rejuvenescimento"],
    peptides: [
      {
        slug: "rapamicina",
        rationale:
          "Único composto consistentemente comprovado a aumentar tempo de vida em mamíferos (camundongos: +9-26%). Inibidor de mTOR, mimetiza restrição calórica. Requer prescrição médica.",
      },
      {
        slug: "metformina",
        rationale:
          "Estudos epidemiológicos sugerem que diabéticos em metformina vivem mais que não-diabéticos. Estudo TAME (em andamento) testa em não-diabéticos.",
      },
      {
        slug: "espermidina",
        rationale:
          "Induz autofagia (reciclagem celular). Estudo Bruneck associou alto consumo dietético a 21% menor mortalidade. Naturalmente presente no germe de trigo.",
      },
      {
        slug: "nmn",
        rationale:
          "Precursor de NAD+. Estudos clínicos confirmam aumento de NAD+ e melhora em sensibilidade à insulina. Status legal cinza nos EUA.",
      },
      {
        slug: "nr-nicotinamide-riboside",
        rationale:
          "Outro precursor de NAD+, mais estudos clínicos publicados que NMN. Status FDA aprovado como suplemento.",
      },
      {
        slug: "fisetina",
        rationale:
          "Senolítico — elimina células senescentes ('zumbis'). Estudos em camundongos mostram +10% no tempo de vida. Fase 1/2 em humanos.",
      },
      {
        slug: "ss-31",
        rationale:
          "Único peptídeo que atua diretamente na membrana mitocondrial. Fase 3 para doenças mitocondriais. Promissor para envelhecimento celular.",
      },
      {
        slug: "urolitina-a",
        rationale:
          "Único composto comprovado clinicamente a induzir mitofagia em humanos. Melhora função muscular em adultos de meia-idade.",
      },
      {
        slug: "mots-c",
        rationale:
          "Mitocôndrial-derived peptide que mimetiza exercício. Naturalmente decai com idade.",
      },
      {
        slug: "epithalon",
        rationale:
          "Ativa telomerase em laboratório. Estudos majoritariamente russos. Riscos teóricos de oncogênese pela ativação de telomerase.",
      },
    ],
  },
  {
    slug: "recuperacao-muscular",
    label: "Peptídeos para Recuperação e Lesões",
    shortDescription:
      "Peptídeos pesquisados para cicatrização de tendões, músculos e tecidos.",
    longDescription:
      "BPC-157 e TB-500 são os peptídeos mais populares na comunidade atlética para recuperação. Ambos têm evidência robusta em modelos animais mas zero estudos clínicos em humanos publicados. Cerebrolysin e SS-31 também têm aplicações em recuperação tecidual. Importante: nenhum desses peptídeos é aprovado para uso atlético, e produtos vendidos sem prescrição podem ser contaminados.",
    emoji: "💪",
    searchKeywords: ["lesão", "tendão", "recuperação atletas", "cicatrização"],
    peptides: [
      {
        slug: "bpc-157",
        rationale:
          "O peptídeo de recuperação mais popular. Centenas de estudos animais em cicatrização de tendões, ossos e tecido gástrico. Zero estudos humanos publicados.",
      },
      {
        slug: "tb-500",
        rationale:
          "Versão sintética da timosina beta-4. Estudos animais robustos para cicatrização cardíaca e cutânea. Frequentemente combinado com BPC-157.",
      },
      {
        slug: "ghk-cu",
        rationale:
          "Peptídeo cobre. Tem evidência clínica mais robusta (uso tópico). Estimula colágeno e cicatrização cutânea.",
      },
      {
        slug: "ss-31",
        rationale:
          "Foco em recuperação mitocondrial pós-exercício. Promove regeneração energética celular.",
      },
    ],
  },
  {
    slug: "anti-aging",
    label: "Peptídeos Anti-Aging",
    shortDescription:
      "Peptídeos e compostos pesquisados para retardar marcadores do envelhecimento.",
    longDescription:
      "Anti-aging é um termo amplo que inclui peptídeos cosméticos para pele (GHK-Cu), compostos para regeneração mitocondrial (SS-31, MOTS-c, urolitina A), senolíticos (fisetina), e drogas off-label como rapamicina. O GHK-Cu tem a evidência clínica mais robusta para uso tópico. Para anti-aging sistêmico, a pesquisa ainda é majoritariamente animal.",
    emoji: "✨",
    searchKeywords: ["pele", "rugas", "envelhecimento", "colágeno"],
    peptides: [
      {
        slug: "ghk-cu",
        rationale:
          "O peptídeo anti-aging mais estudado. Comprovadamente estimula colágeno tipo I e III em uso tópico. Modula 4.000+ genes.",
      },
      {
        slug: "rapamicina",
        rationale:
          "Anti-aging sistêmico via inibição de mTOR. Único composto que aumenta longevidade em mamíferos. Requer prescrição.",
      },
      {
        slug: "fisetina",
        rationale:
          "Senolítico — elimina células velhas que causam inflamação crônica. Estudos em humanos em fase 1/2.",
      },
      {
        slug: "ss-31",
        rationale:
          "Anti-aging mitocondrial. Reverte declínio energético celular relacionado à idade em modelos animais.",
      },
      {
        slug: "epithalon",
        rationale:
          "Ativa telomerase. Estudos sugerem efeito anti-aging via alongamento de telômeros, mas evidência limitada.",
      },
      {
        slug: "espermidina",
        rationale:
          "Induz autofagia (limpeza celular). Estudos populacionais associam a longevidade aumentada.",
      },
      {
        slug: "urolitina-a",
        rationale:
          "Mitofagia comprovada em humanos. Melhora função muscular relacionada à idade.",
      },
    ],
  },
  {
    slug: "cognicao",
    label: "Peptídeos para Cognição e Memória",
    shortDescription:
      "Peptídeos nootrópicos: Selank, Cerebrolysin, Dihexa, Semax e mais.",
    longDescription:
      "Peptídeos nootrópicos atuam no sistema nervoso central para melhorar memória, foco ou função cognitiva. Cerebrolysin tem aprovação em 40+ países para AVC e demência. Selank é aprovado na Rússia como ansiolítico. Dihexa tem potência impressionante in vitro mas zero estudos humanos. Importante: declínio cognitivo merece avaliação médica adequada.",
    emoji: "🧠",
    searchKeywords: ["nootrópico", "memória", "foco", "cérebro"],
    peptides: [
      {
        slug: "cerebrolysin",
        rationale:
          "Aprovado em 40+ países. Mais de 200 estudos clínicos. Eficácia comprovada em recuperação de AVC e demência.",
      },
      {
        slug: "selank",
        rationale:
          "Aprovado na Rússia para ansiedade. Efeitos nootrópicos sem sedação ou dependência. Análogo da tuftsina.",
      },
      {
        slug: "dihexa",
        rationale:
          "Potência sináptica 10^7x maior que BDNF in vitro. Promissor mas zero estudos em humanos. Risco oncológico via c-Met.",
      },
      {
        slug: "ss-31",
        rationale:
          "Proteção mitocondrial cerebral. Pesquisado para Alzheimer e neurodegeneração.",
      },
      {
        slug: "espermidina",
        rationale:
          "Estudo SmartAge mostrou melhora modesta em memória em adultos com declínio cognitivo subjetivo.",
      },
      {
        slug: "nmn",
        rationale:
          "Precursor de NAD+ atravessa barreira hematoencefálica. Estudos sugerem benefícios cognitivos modestos.",
      },
    ],
  },
  {
    slug: "imunidade",
    label: "Peptídeos para Sistema Imunológico",
    shortDescription:
      "Peptídeos imunomoduladores: Thymosin Alpha-1, KPV, LL-37 e Glutationa.",
    longDescription:
      "Peptídeos que modulam a resposta imune sem causar imunossupressão. Thymosin Alpha-1 tem mais evidência clínica e aprovação em 30+ países para hepatite. KPV é anti-inflamatório potente em modelos animais. LL-37 é antimicrobiano. Glutationa é o principal antioxidante intracelular.",
    emoji: "🛡️",
    searchKeywords: ["imunidade", "sistema imune", "infecção", "inflamação"],
    peptides: [
      {
        slug: "thymosin-alpha-1",
        rationale:
          "Aprovado em 30+ países para hepatite B. O peptídeo imunomodulador com mais evidência clínica robusta.",
      },
      {
        slug: "glutationa",
        rationale:
          "Principal antioxidante intracelular. Suporta função imune e desintoxicação. Único nesta lista que é tecnicamente um peptídeo (tripeptídeo).",
      },
      {
        slug: "nac",
        rationale:
          "Precursor de glutationa. Aprovado pela ANVISA. Múltiplos estudos em saúde mental e respiratória.",
      },
      {
        slug: "ll-37",
        rationale:
          "Único peptídeo antimicrobiano humano. Atua contra bactérias resistentes. Pesquisado para infecções de feridas.",
      },
      {
        slug: "kpv",
        rationale:
          "Anti-inflamatório potente derivado do α-MSH. Inibe NF-κB sem imunossupressão. Apenas estudos animais.",
      },
    ],
  },
  {
    slug: "sono",
    label: "Peptídeos para Sono",
    shortDescription:
      "Peptídeos pesquisados para melhorar qualidade do sono e ritmo circadiano.",
    longDescription:
      "DSIP (Delta Sleep-Inducing Peptide) é o peptídeo mais associado a sono profundo. Selank tem efeitos ansiolíticos que indiretamente beneficiam sono. NMN mostrou melhora em qualidade subjetiva do sono em estudo japonês. Epithalon regula produção de melatonina pela glândula pineal.",
    emoji: "🌙",
    searchKeywords: ["dormir melhor", "insônia", "sono profundo", "melatonina"],
    peptides: [
      {
        slug: "dsip",
        rationale:
          "Delta Sleep-Inducing Peptide — diretamente associado a sono delta (profundo). Estudos antigos mas com base mecanística sólida.",
      },
      {
        slug: "selank",
        rationale:
          "Efeito ansiolítico sem sedação. Reduz ansiedade que prejudica sono. Aprovado na Rússia.",
      },
      {
        slug: "epithalon",
        rationale:
          "Regula produção de melatonina pela glândula pineal. Estudos em primatas mostram restauração do ritmo circadiano.",
      },
      {
        slug: "nmn",
        rationale:
          "Estudo japonês com 250mg/dia mostrou melhora subjetiva na qualidade do sono em idosos.",
      },
    ],
  },
  {
    slug: "diabetes",
    label: "Peptídeos para Diabetes Tipo 2",
    shortDescription:
      "Peptídeos GLP-1 e outros tratamentos modernos para diabetes tipo 2.",
    longDescription:
      "Os agonistas GLP-1 (semaglutida, tirzepatida) são os tratamentos mais inovadores para diabetes tipo 2 nos últimos 10 anos. Reduzem HbA1c em 1.5-2.4% e oferecem benefícios cardiovasculares adicionais. Metformina continua sendo primeira linha. Esta página agrega todas as opções com evidência sólida.",
    emoji: "🩸",
    searchKeywords: ["diabetes", "glicose", "insulina", "HbA1c"],
    peptides: [
      {
        slug: "tirzepatida",
        rationale:
          "Reduz HbA1c em até 2.4% — superior à semaglutida em estudo head-to-head SURPASS-2.",
      },
      {
        slug: "semaglutida",
        rationale:
          "Reduz HbA1c em 1.5-1.8%. Benefícios cardiovasculares comprovados (estudo SUSTAIN-6). Aprovado pela ANVISA.",
      },
      {
        slug: "metformina",
        rationale:
          "Primeira linha para diabetes tipo 2 há décadas. Custo baixo, segurança excelente, benefícios cardiovasculares.",
      },
      {
        slug: "nmn",
        rationale:
          "Estudo Yoshino (2021) mostrou melhora em sensibilidade à insulina muscular em mulheres pré-diabéticas.",
      },
    ],
  },
  // === NEW USE CASES ===
  {
    slug: "saude-cardiovascular",
    label: "Peptídeos para Saúde Cardiovascular",
    shortDescription:
      "Peptídeos com evidência de proteção cardiovascular, redução de pressão arterial e melhora de função endotelial.",
    longDescription:
      "Doença cardiovascular é a principal causa de morte no Brasil e no mundo. Vários peptídeos têm demonstrado benefícios cardiovasculares — alguns como efeito secundário (semaglutida no estudo SELECT) e outros como mecanismo primário (espermidina, NR). Esta lista agrega os compostos com melhor evidência cardiovascular.",
    emoji: "❤️",
    searchKeywords: [
      "coração",
      "pressão alta",
      "colesterol",
      "infarto",
      "AVC",
    ],
    peptides: [
      {
        slug: "semaglutida",
        rationale:
          "Estudo SELECT (2023): redução de 20% em eventos cardiovasculares maiores em pacientes com obesidade sem diabetes. Maior estudo cardiovascular já feito com GLP-1.",
      },
      {
        slug: "espermidina",
        rationale:
          "Estudo Bruneck: maior consumo dietético associado a 21% redução em mortalidade cardiovascular. Induz autofagia cardíaca.",
      },
      {
        slug: "nr-nicotinamide-riboside",
        rationale:
          "Estudos clínicos mostram redução de pressão arterial sistólica e melhora de rigidez arterial em adultos de meia-idade.",
      },
      {
        slug: "tirzepatida",
        rationale:
          "Estudos em andamento sobre eventos cardiovasculares. Mecanismo similar ao GLP-1, com benefícios metabólicos amplos.",
      },
      {
        slug: "ss-31",
        rationale:
          "Pesquisado para insuficiência cardíaca. Estudo PROGRESS-HF não atingiu endpoint primário, mas mostrou sinais positivos.",
      },
      {
        slug: "metformina",
        rationale:
          "Décadas de evidência mostram redução de eventos cardiovasculares em diabéticos. Benefícios além do controle glicêmico.",
      },
    ],
  },
  {
    slug: "libido-funcao-sexual",
    label: "Peptídeos para Libido e Função Sexual",
    shortDescription:
      "Peptídeos pesquisados para função sexual feminina e masculina, incluindo o Vyleesi (PT-141).",
    longDescription:
      "Função sexual envolve fatores hormonais, neurológicos e psicológicos. PT-141 (bremelanotide) é o único medicamento aprovado pelo FDA que atua diretamente em centros cerebrais do desejo sexual. Outros peptídeos têm efeitos indiretos via energia, hormônios ou bem-estar geral. Procurar avaliação médica especializada é essencial para questões sexuais.",
    emoji: "💞",
    searchKeywords: [
      "libido",
      "disfunção erétil",
      "desejo sexual",
      "viagra",
      "bremelanotide",
    ],
    peptides: [
      {
        slug: "pt-141",
        rationale:
          "Único peptídeo aprovado pelo FDA (2019) para Transtorno do Desejo Sexual Hipoativo em mulheres. Atua no sistema nervoso central via MC4R.",
      },
      {
        slug: "ipamorelin",
        rationale:
          "Aumenta GH naturalmente, melhorando energia, recuperação e bem-estar geral — fatores indiretamente relacionados à função sexual.",
      },
      {
        slug: "cjc-1295",
        rationale:
          "Frequentemente combinado com Ipamorelin para potencializar liberação de GH. Mesmos benefícios indiretos.",
      },
      {
        slug: "tesamorelin",
        rationale:
          "Reduz gordura visceral, melhora composição corporal e energia. Efeitos indiretos em libido via melhor saúde metabólica.",
      },
    ],
  },
  {
    slug: "pele-e-cabelo",
    label: "Peptídeos para Pele e Cabelo",
    shortDescription:
      "Peptídeos cosméticos para colágeno, anti-rugas, cicatrização da pele e estímulo capilar.",
    longDescription:
      "A categoria cosmética é onde os peptídeos têm a evidência mais consistente — décadas de uso em dermatologia. GHK-Cu é o mais estudado, com modulação documentada de mais de 4.000 genes envolvidos em regeneração da pele. Outros compostos como fisetina (senolítico) e espermidina também têm aplicações dermatológicas.",
    emoji: "🌸",
    searchKeywords: [
      "rugas",
      "colágeno",
      "queda de cabelo",
      "pele jovem",
      "cicatriz",
    ],
    peptides: [
      {
        slug: "ghk-cu",
        rationale:
          "O peptídeo cosmético mais estudado. Estimula colágeno tipo I e III. Aplicação tópica em séruns e cremes. Evidência clínica robusta.",
      },
      {
        slug: "fisetina",
        rationale:
          "Senolítico que elimina células senescentes da pele. Pesquisado para anti-aging cutâneo.",
      },
      {
        slug: "espermidina",
        rationale:
          "Induz autofagia em fibroblastos cutâneos. Pesquisada em produtos cosméticos para envelhecimento da pele.",
      },
      {
        slug: "tb-500",
        rationale:
          "Promove cicatrização cutânea. Estudos clínicos em úlceras venosas mostraram resultados positivos.",
      },
      {
        slug: "bpc-157",
        rationale:
          "Cicatrização tecidual em modelos animais. Aplicações experimentais em dermatologia regenerativa.",
      },
    ],
  },
  {
    slug: "ansiedade-e-bem-estar",
    label: "Peptídeos para Ansiedade e Bem-estar Mental",
    shortDescription:
      "Peptídeos com efeitos ansiolíticos, neuroprotetores e de modulação do humor.",
    longDescription:
      "Saúde mental é uma área onde peptídeos começam a mostrar potencial real, especialmente em ansiedade e modulação do humor. Selank é aprovado na Rússia como ansiolítico. NAC tem evidência sólida em transtornos psiquiátricos. Cerebrolysin é usado em depressão refratária em alguns países. Importante: transtornos mentais merecem avaliação psiquiátrica adequada.",
    emoji: "🧘",
    searchKeywords: [
      "ansiedade",
      "depressão",
      "estresse",
      "bem-estar",
      "saúde mental",
    ],
    peptides: [
      {
        slug: "selank",
        rationale:
          "Aprovado na Rússia para ansiedade generalizada. Eficácia comparável a benzodiazepínicos sem sedação ou dependência.",
      },
      {
        slug: "nac",
        rationale:
          "Múltiplos estudos clínicos demonstram benefícios em TOC, transtorno bipolar, depressão e tricotilomania. Disponível sem receita no Brasil.",
      },
      {
        slug: "cerebrolysin",
        rationale:
          "Usado em depressão refratária em vários países. Pesquisado por efeitos neurotróficos similares a BDNF.",
      },
      {
        slug: "dsip",
        rationale:
          "Reduz cortisol e ansiedade indiretamente via melhora do sono profundo.",
      },
      {
        slug: "espermidina",
        rationale:
          "Indução de autofagia neuronal. Estudos sugerem efeitos protetivos em saúde mental relacionada ao envelhecimento.",
      },
    ],
  },
  {
    slug: "performance-esportiva",
    label: "Peptídeos para Performance Esportiva",
    shortDescription:
      "Peptídeos pesquisados por atletas para força, resistência e composição corporal.",
    longDescription:
      "A comunidade atlética foi uma das primeiras a adotar peptídeos. Secretagogos de GH (Ipamorelin, CJC-1295, Sermorelin) são populares para composição corporal. BPC-157 e TB-500 para recuperação. MOTS-c mimetiza efeitos do exercício. Importante: a maioria desses peptídeos é proibida pela WADA (Agência Mundial Antidoping) em competições oficiais.",
    emoji: "🏃",
    searchKeywords: [
      "performance",
      "força",
      "resistência",
      "atleta",
      "musculação",
    ],
    peptides: [
      {
        slug: "ipamorelin",
        rationale:
          "Secretagogo de GH mais seletivo. Aumenta liberação natural de hormônio de crescimento sem afetar cortisol.",
      },
      {
        slug: "cjc-1295",
        rationale:
          "Análogo de GHRH com meia-vida prolongada. Frequentemente combinado com Ipamorelin para efeito sinérgico.",
      },
      {
        slug: "bpc-157",
        rationale:
          "Recuperação de tendões e tecidos moles. Popular entre atletas de elite, apesar de zero estudos humanos.",
      },
      {
        slug: "tb-500",
        rationale:
          "Recuperação muscular sistêmica. Evidência animal robusta.",
      },
      {
        slug: "tesamorelin",
        rationale:
          "Reduz gordura visceral e melhora composição corporal. Único secretagogo de GH com aprovação FDA.",
      },
      {
        slug: "sermorelin",
        rationale:
          "Análogo do GHRH original (29 aminoácidos). Foi aprovado pelo FDA até 2008.",
      },
      {
        slug: "mots-c",
        rationale:
          "Mimetiza vias metabólicas do exercício. Naturalmente induzido por treinamento físico.",
      },
      {
        slug: "ss-31",
        rationale:
          "Recuperação mitocondrial pós-exercício. Restaura função energética celular.",
      },
    ],
  },
  {
    slug: "saude-metabolica",
    label: "Peptídeos para Saúde Metabólica",
    shortDescription:
      "Peptídeos para sensibilidade à insulina, metabolismo e síndrome metabólica.",
    longDescription:
      "Síndrome metabólica afeta milhões de brasileiros — combinação de obesidade abdominal, resistência à insulina, hipertensão e dislipidemia. Peptídeos GLP-1 transformaram o tratamento. NMN, MOTS-c e metformina também atuam em vias metabólicas centrais. Esta é uma das categorias mais ricas em evidência clínica.",
    emoji: "🔬",
    searchKeywords: [
      "metabolismo",
      "resistência à insulina",
      "síndrome metabólica",
      "gordura abdominal",
    ],
    peptides: [
      {
        slug: "semaglutida",
        rationale:
          "Melhora glicemia, sensibilidade à insulina e perda de peso simultaneamente. Padrão atual em síndrome metabólica.",
      },
      {
        slug: "tirzepatida",
        rationale:
          "Agonista duplo GIP+GLP-1. Maior eficácia metabólica em estudos clínicos.",
      },
      {
        slug: "metformina",
        rationale:
          "Primeira linha clássica. Ativa AMPK, reduz gliconeogênese hepática, melhora sensibilidade à insulina.",
      },
      {
        slug: "tesamorelin",
        rationale:
          "Reduz gordura visceral e gordura hepática. Estudos clínicos em NAFLD/NASH.",
      },
      {
        slug: "nmn",
        rationale:
          "Aumenta NAD+ e melhora sensibilidade muscular à insulina em humanos.",
      },
      {
        slug: "mots-c",
        rationale:
          "Mimetiza efeitos metabólicos do exercício. Promissor para resistência à insulina.",
      },
      {
        slug: "nr-nicotinamide-riboside",
        rationale:
          "Outro precursor de NAD+. Estudos sugerem benefícios em saúde metabólica geral.",
      },
    ],
  },
];

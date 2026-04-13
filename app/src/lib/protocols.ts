/**
 * Protocolos de uso baseados em estudos clínicos publicados.
 * Caráter informativo — não constitui prescrição médica.
 */

export type ProtocolStep = {
  phase: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
};

export type Protocol = {
  indication: string;
  route: string;
  steps: ProtocolStep[];
  studyReference: string;
  studyUrl?: string;
  notes?: string;
};

export const protocols: Record<string, Protocol[]> = {
  semaglutida: [
    {
      indication: "Obesidade / controle de peso",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Semanas 1–4", dosage: "0,25 mg", frequency: "1x/semana", duration: "4 semanas", notes: "Dose de titulação inicial" },
        { phase: "Semanas 5–8", dosage: "0,5 mg", frequency: "1x/semana", duration: "4 semanas" },
        { phase: "Semanas 9–12", dosage: "1,0 mg", frequency: "1x/semana", duration: "4 semanas" },
        { phase: "Semanas 13–16", dosage: "1,7 mg", frequency: "1x/semana", duration: "4 semanas" },
        { phase: "Semana 17+", dosage: "2,4 mg", frequency: "1x/semana", duration: "Manutenção", notes: "Dose-alvo do estudo STEP 1" },
      ],
      studyReference: "STEP 1 Trial — Wilding JPH et al., NEJM 2021",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
      notes: "Titulação gradual para minimizar efeitos gastrointestinais. Perda média de 14,9% do peso corporal em 68 semanas.",
    },
    {
      indication: "Diabetes tipo 2",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Semanas 1–4", dosage: "0,25 mg", frequency: "1x/semana", duration: "4 semanas" },
        { phase: "Semanas 5–8", dosage: "0,5 mg", frequency: "1x/semana", duration: "4 semanas" },
        { phase: "Semana 9+", dosage: "1,0 mg", frequency: "1x/semana", duration: "Manutenção" },
      ],
      studyReference: "SUSTAIN 6 — Marso SP et al., NEJM 2016",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/27633186/",
      notes: "Redução média de HbA1c de 1,5–1,8%. Benefício cardiovascular demonstrado.",
    },
  ],

  tirzepatida: [
    {
      indication: "Obesidade / controle de peso",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Semanas 1–4", dosage: "2,5 mg", frequency: "1x/semana", duration: "4 semanas", notes: "Dose de titulação" },
        { phase: "Semanas 5–8", dosage: "5,0 mg", frequency: "1x/semana", duration: "4 semanas" },
        { phase: "Semanas 9–12", dosage: "7,5 mg", frequency: "1x/semana", duration: "4 semanas" },
        { phase: "Semanas 13–16", dosage: "10 mg", frequency: "1x/semana", duration: "4 semanas" },
        { phase: "Semana 17+", dosage: "15 mg", frequency: "1x/semana", duration: "Manutenção", notes: "Dose máxima do estudo SURMOUNT-1" },
      ],
      studyReference: "SURMOUNT-1 — Jastreboff AM et al., NEJM 2022",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
      notes: "Perda de peso média de 20,9% (dose 15 mg) em 72 semanas. Agonista duplo GIP/GLP-1.",
    },
  ],

  "bpc-157": [
    {
      indication: "Cicatrização de tendões e lesões musculoesqueléticas",
      route: "Subcutânea (SC) ou Intramuscular (IM)",
      steps: [
        { phase: "Protocolo padrão", dosage: "250–500 mcg", frequency: "1–2x/dia", duration: "4–8 semanas", notes: "Aplicar próximo ao local da lesão" },
      ],
      studyReference: "Sikiric P et al., Current Pharmaceutical Design 2018",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/29737246/",
      notes: "Majoritariamente estudos em animais. Doses humanas extrapoladas com base em equivalência alométrica. Sem ensaios clínicos fase III em humanos.",
    },
    {
      indication: "Proteção gastrointestinal",
      route: "Oral",
      steps: [
        { phase: "Protocolo padrão", dosage: "500 mcg", frequency: "2x/dia", duration: "4–6 semanas", notes: "Em jejum, 30 min antes das refeições" },
      ],
      studyReference: "Sikiric P et al., Journal of Physiology Paris 2013",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/23567903/",
      notes: "BPC-157 demonstrou estabilidade gástrica superior a outros peptídeos. Dados predominantemente pré-clínicos.",
    },
  ],

  "tb-500": [
    {
      indication: "Recuperação de lesões e regeneração tecidual",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Fase de carga (semanas 1–4)", dosage: "2,0–2,5 mg", frequency: "2x/semana", duration: "4 semanas" },
        { phase: "Manutenção (semanas 5–8)", dosage: "2,0 mg", frequency: "1x/semana", duration: "4 semanas" },
      ],
      studyReference: "Goldstein AL et al., Expert Opinion on Biological Therapy 2012",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/22612435/",
      notes: "Timosina beta-4. Evidência em modelos animais para cicatrização cardíaca e dérmica. Ensaios clínicos limitados em humanos.",
    },
  ],

  "ghk-cu": [
    {
      indication: "Rejuvenescimento cutâneo e cicatrização",
      route: "Tópico (creme/sérum)",
      steps: [
        { phase: "Protocolo padrão", dosage: "Sérum 0,01–1%", frequency: "1–2x/dia", duration: "8–12 semanas", notes: "Aplicar em pele limpa, seguido de protetor solar" },
      ],
      studyReference: "Pickart L et al., International Journal of Molecular Sciences 2015",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/26404227/",
      notes: "Estimula produção de colágeno e elastina. Estudos clínicos demonstraram redução de linhas finas em 8 semanas.",
    },
    {
      indication: "Queda capilar",
      route: "Tópico (loção capilar) ou Subcutâneo",
      steps: [
        { phase: "Protocolo tópico", dosage: "Solução 200 mcg/mL", frequency: "1x/dia", duration: "12 semanas", notes: "Aplicar no couro cabeludo" },
      ],
      studyReference: "Pickart L, Skin Biology 2008",
      notes: "Aumenta folículos em fase anágena. Resultados comparáveis ao minoxidil 5% em estudos in vitro.",
    },
  ],

  ipamorelin: [
    {
      indication: "Estímulo de GH / composição corporal",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Protocolo padrão", dosage: "200–300 mcg", frequency: "1–3x/dia", duration: "8–12 semanas", notes: "Idealmente em jejum ou antes de dormir" },
      ],
      studyReference: "Raun K et al., European Journal of Endocrinology 1998",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/9820626/",
      notes: "GHRP seletivo, não eleva cortisol nem prolactina significativamente. Frequentemente combinado com CJC-1295.",
    },
  ],

  "cjc-1295": [
    {
      indication: "Estímulo de GH / antienvelhecimento",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "CJC-1295 com DAC", dosage: "2 mg", frequency: "1x/semana", duration: "8–12 semanas" },
        { phase: "CJC-1295 sem DAC (Mod GRF 1-29)", dosage: "100 mcg", frequency: "1–3x/dia", duration: "8–12 semanas", notes: "Pico rápido, melhor antes de dormir" },
      ],
      studyReference: "Teichman SL et al., Journal of Clinical Endocrinology & Metabolism 2006",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/16595599/",
      notes: "Com DAC (Drug Affinity Complex): meia-vida de ~8 dias. Sem DAC: meia-vida ~30 min, requer múltiplas aplicações.",
    },
  ],

  "thymosin-alpha-1": [
    {
      indication: "Imunomodulação / hepatite B crônica",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Protocolo padrão", dosage: "1,6 mg", frequency: "2x/semana", duration: "24 semanas" },
      ],
      studyReference: "Garaci E et al., International Immunopharmacology 2007",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/17630197/",
      notes: "Aprovado em mais de 35 países para hepatite B. Aumenta atividade de células NK e T. Marca comercial: Zadaxin.",
    },
  ],

  "aod-9604": [
    {
      indication: "Lipólise / redução de gordura",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Protocolo padrão", dosage: "300 mcg", frequency: "1x/dia", duration: "12 semanas", notes: "Aplicar em jejum, pela manhã" },
      ],
      studyReference: "Heffernan M et al., Obesity Research 2001",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/11707546/",
      notes: "Fragmento modificado do GH (aa 177-191). Ação lipolítica sem efeitos diabetogênicos do GH. Resultados modestos em humanos.",
    },
  ],

  selank: [
    {
      indication: "Ansiedade / função cognitiva",
      route: "Intranasal",
      steps: [
        { phase: "Protocolo padrão", dosage: "250–500 mcg", frequency: "2–3x/dia", duration: "2–4 semanas", notes: "Spray nasal, ciclos de uso" },
      ],
      studyReference: "Zozulya AA et al., Bulletin of Experimental Biology and Medicine 2001",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/11687848/",
      notes: "Análogo sintético da tuftsina. Aprovado na Rússia como ansiolítico. Modula IL-6, BDNF e monoaminas.",
    },
  ],

  tesamorelin: [
    {
      indication: "Lipodistrofia associada ao HIV",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Protocolo padrão", dosage: "2 mg", frequency: "1x/dia", duration: "26 semanas", notes: "Aplicar no abdômen" },
      ],
      studyReference: "Falutz J et al., NEJM 2007",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/18046027/",
      notes: "Aprovado pelo FDA (Egrifta). Análogo do GHRH. Redução significativa de gordura visceral sem alterar gordura subcutânea.",
    },
  ],

  sermorelin: [
    {
      indication: "Deficiência de GH em adultos",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Protocolo padrão", dosage: "200–300 mcg", frequency: "1x/dia (antes de dormir)", duration: "12–24 semanas" },
      ],
      studyReference: "Walker RF, Clinical Interventions in Aging 2006",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/18044133/",
      notes: "Análogo do GHRH (1-29). Estimula secreção pulsátil fisiológica de GH. Mais seguro que GH exógeno para uso prolongado.",
    },
  ],

  "pt-141": [
    {
      indication: "Disfunção sexual feminina (HSDD)",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Protocolo sob demanda", dosage: "1,75 mg", frequency: "Sob demanda (mín. 24h entre doses)", duration: "Conforme necessidade", notes: "Aplicar 45 min antes da atividade sexual" },
      ],
      studyReference: "Kingsberg SA et al., Obstetrics & Gynecology 2019",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/31764729/",
      notes: "Bremelanotida. Aprovado pelo FDA (Vyleesi). Agonista do receptor MC4R. Não mais que 8 doses/mês.",
    },
  ],

  epithalon: [
    {
      indication: "Longevidade / ativação de telomerase",
      route: "Subcutânea (SC) ou Intravenosa (IV)",
      steps: [
        { phase: "Protocolo cíclico", dosage: "5–10 mg", frequency: "1x/dia", duration: "10–20 dias", notes: "Ciclo repetido a cada 4–6 meses" },
      ],
      studyReference: "Khavinson VK et al., Bulletin of Experimental Biology and Medicine 2003",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/12937682/",
      notes: "Tetrapeptídeo sintético (Ala-Glu-Asp-Gly). Ativa telomerase em estudos in vitro. Dados em humanos limitados a estudos russos.",
    },
  ],

  dsip: [
    {
      indication: "Regulação do sono",
      route: "Subcutânea (SC) ou Intranasal",
      steps: [
        { phase: "Protocolo padrão", dosage: "100–200 mcg", frequency: "1x/dia (30 min antes de dormir)", duration: "2–4 semanas" },
      ],
      studyReference: "Schneider-Helmert D, European Neurology 1984",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/6548693/",
      notes: "Delta Sleep-Inducing Peptide. Melhora latência e qualidade do sono em insones crônicos. Não causa dependência.",
    },
  ],

  nmn: [
    {
      indication: "Longevidade / metabolismo NAD+",
      route: "Oral",
      steps: [
        { phase: "Protocolo padrão", dosage: "250–500 mg", frequency: "1x/dia (pela manhã)", duration: "Uso contínuo" },
        { phase: "Protocolo avançado", dosage: "1.000 mg", frequency: "1x/dia", duration: "Uso contínuo", notes: "Dose usada em estudos recentes" },
      ],
      studyReference: "Yoshino M et al., Science 2021",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/33888596/",
      notes: "Mononucleotídeo de nicotinamida. Aumenta níveis de NAD+ em humanos. Melhora sensibilidade à insulina em mulheres pós-menopáusicas com sobrepeso.",
    },
  ],

  nr: [
    {
      indication: "Longevidade / elevação de NAD+",
      route: "Oral",
      steps: [
        { phase: "Protocolo padrão", dosage: "300 mg", frequency: "1–2x/dia", duration: "Uso contínuo" },
        { phase: "Protocolo do estudo CHROMADIET", dosage: "1.000 mg", frequency: "1x/dia", duration: "6 semanas" },
      ],
      studyReference: "Martens CR et al., Nature Communications 2018",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/29599478/",
      notes: "Nicotinamida Ribosídeo. Seguro e bem tolerado. Eleva NAD+ 40–90% em 2 semanas. Benefício cardiovascular preliminar.",
    },
  ],

  metformina: [
    {
      indication: "Longevidade / anti-aging (off-label)",
      route: "Oral",
      steps: [
        { phase: "Semanas 1–2", dosage: "500 mg", frequency: "1x/dia (com jantar)", duration: "2 semanas", notes: "Titulação para tolerância GI" },
        { phase: "Semanas 3–4", dosage: "500 mg", frequency: "2x/dia", duration: "2 semanas" },
        { phase: "Semana 5+", dosage: "500–1.000 mg", frequency: "2x/dia", duration: "Uso contínuo", notes: "Dose-alvo do estudo TAME" },
      ],
      studyReference: "Bannister CA et al., Diabetes, Obesity & Metabolism 2014",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/25041462/",
      notes: "Diabéticos em metformina tiveram sobrevida 15% maior que controles não diabéticos. Estudo TAME (Targeting Aging with Metformin) em andamento.",
    },
  ],

  rapamicina: [
    {
      indication: "Longevidade / senolítico (off-label)",
      route: "Oral",
      steps: [
        { phase: "Protocolo intermitente", dosage: "5–6 mg", frequency: "1x/semana", duration: "Ciclos de 8 semanas com pausas", notes: "Protocolo de Matt Kaeberlein (Dog Aging Project)" },
      ],
      studyReference: "Mannick JB et al., Science Translational Medicine 2014",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/25540326/",
      notes: "Inibidor de mTOR. Dose baixa intermitente melhora resposta imune em idosos. Doses altas são imunossupressoras (transplante). Uso anti-aging é experimental.",
    },
  ],

  resveratrol: [
    {
      indication: "Longevidade / cardioproteção",
      route: "Oral",
      steps: [
        { phase: "Protocolo padrão", dosage: "250–500 mg", frequency: "1x/dia", duration: "Uso contínuo", notes: "Trans-resveratrol, tomar com refeição gordurosa para absorção" },
      ],
      studyReference: "Timmers S et al., Cell Metabolism 2011",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/22055504/",
      notes: "Ativador de SIRT1. Mimetiza restrição calórica em obesos. Biodisponibilidade oral é baixa (~1–5%).",
    },
  ],

  espermidina: [
    {
      indication: "Longevidade / autofagia",
      route: "Oral (suplemento ou dieta)",
      steps: [
        { phase: "Protocolo suplementar", dosage: "1–5 mg", frequency: "1x/dia", duration: "Uso contínuo" },
        { phase: "Via dieta", dosage: "~12 mg/dia", frequency: "Através de alimentos", duration: "Contínuo", notes: "Gérmen de trigo, soja fermentada, queijos maturados" },
      ],
      studyReference: "Eisenberg T et al., Nature Medicine 2016",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/27525132/",
      notes: "Indutor natural de autofagia. Consumo alto via dieta associado a redução de 5 anos na idade cardiovascular em estudo epidemiológico.",
    },
  ],

  "ll-37": [
    {
      indication: "Infecções / imunomodulação",
      route: "Subcutânea (SC) ou Tópica",
      steps: [
        { phase: "Protocolo SC", dosage: "100 mcg", frequency: "1x/dia", duration: "2–4 semanas" },
        { phase: "Protocolo tópico", dosage: "Gel 0,5%", frequency: "2x/dia", duration: "4 semanas" },
      ],
      studyReference: "Grönberg A et al., PLoS ONE 2014",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/24520404/",
      notes: "Catelicidina antimicrobiana humana. Ação contra bactérias, fungos e biofilmes. Uso tópico em úlceras venosas mostrou cicatrização acelerada.",
    },
  ],

  kpv: [
    {
      indication: "Anti-inflamatório / saúde intestinal",
      route: "Oral ou Subcutânea (SC)",
      steps: [
        { phase: "Protocolo oral", dosage: "200–500 mcg", frequency: "2x/dia", duration: "4–8 semanas" },
        { phase: "Protocolo SC", dosage: "200 mcg", frequency: "1x/dia", duration: "4 semanas" },
      ],
      studyReference: "Dalmasso G et al., PLoS ONE 2008",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/18827907/",
      notes: "Tripeptídeo derivado do alfa-MSH (Lys-Pro-Val). Reduz inflamação via NF-κB. Estudos em modelos de colite em animais.",
    },
  ],

  glutationa: [
    {
      indication: "Antioxidante / detoxificação",
      route: "Oral (lipossomal) ou Intravenosa",
      steps: [
        { phase: "Oral lipossomal", dosage: "500–1.000 mg", frequency: "1x/dia (em jejum)", duration: "Uso contínuo" },
        { phase: "IV (clínica)", dosage: "600–2.000 mg", frequency: "1–2x/semana", duration: "4–8 semanas" },
      ],
      studyReference: "Sinha R et al., European Journal of Clinical Nutrition 2018",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/28853742/",
      notes: "Glutationa lipossomal aumenta estoques corporais em 30–35% após 2 semanas. Via oral não lipossomal tem absorção muito limitada.",
    },
  ],

  nac: [
    {
      indication: "Antioxidante / suporte hepático / mucolítico",
      route: "Oral",
      steps: [
        { phase: "Protocolo padrão", dosage: "600 mg", frequency: "1–2x/dia", duration: "Uso contínuo" },
        { phase: "Protocolo respiratório", dosage: "600 mg", frequency: "3x/dia", duration: "Durante sintomas" },
      ],
      studyReference: "De Flora S et al., European Respiratory Journal 1997",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/9272929/",
      notes: "N-Acetilcisteína. Precursor de glutationa. Reduz exacerbações de DPOC. Antídoto para intoxicação por paracetamol em doses altas IV.",
    },
  ],

  "melanotan-ii": [
    {
      indication: "Bronzeamento / proteção UV",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Fase de carga", dosage: "250–500 mcg", frequency: "1x/dia", duration: "7–14 dias", notes: "Iniciar com dose baixa para avaliar tolerância" },
        { phase: "Manutenção", dosage: "500 mcg", frequency: "2–3x/semana", duration: "Conforme necessidade" },
      ],
      studyReference: "Dorr RT et al., Archives of Dermatology 2004",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/15611432/",
      notes: "Análogo da α-MSH. Induz melanogênese. Efeitos colaterais: náusea, rubor facial, aumento de libido. Não aprovado por agências reguladoras.",
    },
  ],

  fisetina: [
    {
      indication: "Senolítico / longevidade",
      route: "Oral",
      steps: [
        { phase: "Protocolo intermitente", dosage: "500 mg", frequency: "2x/dia por 2 dias consecutivos", duration: "1 ciclo/mês", notes: "Protocolo senolítico pulsado" },
        { phase: "Protocolo diário baixa dose", dosage: "100–200 mg", frequency: "1x/dia", duration: "Uso contínuo" },
      ],
      studyReference: "Yousefzadeh MJ et al., EBioMedicine 2018",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/30279143/",
      notes: "Flavonoide senolítico. Em camundongos, estendeu expectativa de vida em 10%. Ensaio clínico AFFIRM em andamento na Mayo Clinic.",
    },
  ],

  "urolitina-a": [
    {
      indication: "Função mitocondrial / longevidade",
      route: "Oral",
      steps: [
        { phase: "Protocolo padrão", dosage: "500–1.000 mg", frequency: "1x/dia", duration: "Uso contínuo" },
      ],
      studyReference: "Andreux PA et al., Nature Metabolism 2019",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/32694802/",
      notes: "Metabólito da elagitanina. Induz mitofagia. Melhora função muscular em idosos sedentários. Marca: Mitopure (Timeline Nutrition).",
    },
  ],

  "mots-c": [
    {
      indication: "Metabolismo / resistência à insulina",
      route: "Subcutânea (SC)",
      steps: [
        { phase: "Protocolo padrão", dosage: "5–10 mg", frequency: "3–5x/semana", duration: "4–8 semanas" },
      ],
      studyReference: "Lee C et al., Cell Metabolism 2015",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/25738455/",
      notes: "Peptídeo mitocondrial. Regula homeostase metabólica via AMPK. Melhora sensibilidade à insulina em camundongos obesos. Dados humanos ainda limitados.",
    },
  ],

  "ss-31": [
    {
      indication: "Proteção mitocondrial / insuficiência cardíaca",
      route: "Subcutânea (SC) ou Intravenosa (IV)",
      steps: [
        { phase: "Protocolo SC", dosage: "40 mg", frequency: "1x/dia", duration: "4 semanas" },
      ],
      studyReference: "Sabbah HN et al., Circulation: Heart Failure 2016",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/27166246/",
      notes: "Elamipretide (Bendavia). Alvo: cardiolipina da membrana mitocondrial interna. Ensaios clínicos em insuficiência cardíaca e miopatias mitocondriais.",
    },
  ],

  dihexa: [
    {
      indication: "Neuroproteção / cognição",
      route: "Oral ou Subcutânea (SC)",
      steps: [
        { phase: "Protocolo oral", dosage: "10–20 mg", frequency: "1x/dia", duration: "4–8 semanas" },
        { phase: "Protocolo SC", dosage: "1–2 mg", frequency: "1x/dia", duration: "4 semanas" },
      ],
      studyReference: "Benoist CC et al., Journal of Pharmacology and Experimental Therapeutics 2014",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/24523456/",
      notes: "Agonista do receptor HGF/c-Met. 10 milhões de vezes mais potente que BDNF in vitro. Melhora memória espacial em ratos. Sem dados clínicos em humanos.",
    },
  ],

  cerebrolysin: [
    {
      indication: "Recuperação pós-AVC / doença de Alzheimer",
      route: "Intravenosa (IV) ou Intramuscular (IM)",
      steps: [
        { phase: "AVC agudo", dosage: "30 mL (diluído em salina)", frequency: "1x/dia IV", duration: "10–21 dias" },
        { phase: "Alzheimer", dosage: "10–30 mL", frequency: "1x/dia IV", duration: "4 semanas, ciclos com intervalo de 2 meses" },
      ],
      studyReference: "Bornstein NM et al., Journal of Stroke & Cerebrovascular Diseases 2018",
      studyUrl: "https://pubmed.ncbi.nlm.nih.gov/29129497/",
      notes: "Mistura de peptídeos neutróficos derivados de cérebro suíno. Aprovado em >45 países (não nos EUA). Ensaio CASTA demonstrou benefício funcional pós-AVC.",
    },
  ],
};

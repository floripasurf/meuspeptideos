import type {
  CompoundTranslation,
  CompoundTranslations,
} from "@/lib/compound-translations";

const translations: CompoundTranslations = {
  "aod-9604": {
    description:
      "Modified fragment of human growth hormone (amino acids 177-191) specifically developed for lipolytic (fat-burning) effects without the side effects of full HGH. Approved in Australia as a dietary supplement.",
    mechanism:
      "AOD-9604 corresponds to the C-terminal region of growth hormone, which is responsible for its lipolytic effect. It stimulates lipolysis (fat breakdown) and inhibits lipogenesis (fat formation) without affecting IGF-1 levels or causing insulin resistance — unlike full HGH.",
    benefits: [
      {
        name: "Lipolytic effect",
        description:
          "Animal studies and phase 2 human trials demonstrated fat reduction effects, but clinical results in humans were modest.",
      },
      {
        name: "No effect on IGF-1",
        description:
          "Unlike HGH, it does not increase IGF-1 or cause insulin resistance, which reduces its risk profile.",
      },
    ],
    risks: [
      {
        name: "Uncertain efficacy",
        frequency: "N/A",
        description:
          "The phase 2b trial in obese humans did not reach the primary endpoint of significant weight loss. Its efficacy as an anti-obesity agent is questionable.",
      },
    ],
    internetVsScience: [
      {
        claim: "Burns fat without dieting",
        whatTheySay:
          "Promoted as a peptide that eliminates abdominal fat without the need for diet or exercise.",
        actualEvidence:
          "Clinical studies in humans showed modest results. The phase 2b trial failed to demonstrate clinically significant weight loss. Far inferior to semaglutide/tirzepatide.",
      },
    ],
    faqs: [],
  },

  "bpc-157": {
    description:
      "Peptide derived from a protein found in human gastric juice. Extensively studied in animal models for tissue regeneration, wound healing, and gastrointestinal protection. Extremely popular in the biohacking community, but no published human clinical studies exist.",
    mechanism:
      "BPC-157 is a pentadecapeptide (15 amino acids) that appears to act through multiple mechanisms: it stimulates angiogenesis (new blood vessel formation), modulates the nitric oxide system, interacts with the dopaminergic system, and promotes the expression of growth factors. In animal models, it has been shown to accelerate healing of tendons, muscles, bones, skin, and gastrointestinal mucosa.",
    benefits: [
      {
        name: "Tendon and ligament healing",
        description:
          "Multiple rat studies demonstrated accelerated Achilles tendon and ligament healing. No published human studies.",
      },
      {
        name: "Gastrointestinal protection",
        description:
          "In animal models, it protects against gastric ulcers, colitis, and NSAID-induced intestinal damage. Derived from a natural gastric protein.",
      },
      {
        name: "Muscle healing",
        description:
          "Rat studies showed accelerated recovery from muscle injuries. Promising results but limited to animal models.",
      },
    ],
    risks: [
      {
        name: "Unknown safety in humans",
        frequency: "Unknown",
        description:
          "No published human clinical trials. The safety profile is based solely on animal studies, which are not directly transferable to humans.",
      },
      {
        name: "Product contamination",
        frequency: "Variable",
        description:
          "Products sold as 'research chemicals' frequently do not undergo rigorous quality control. Risk of contamination, incorrect dosing, or adulteration.",
      },
    ],
    internetVsScience: [
      {
        claim: "Heals any injury",
        whatTheySay:
          "Online communities promote BPC-157 as a universal cure for muscle, tendon, joint, and even brain injuries.",
        actualEvidence:
          "Animal results are promising for wound healing, but ZERO human clinical studies have been published. Extrapolating results from rats to humans is scientifically inadequate.",
      },
      {
        claim: "It's completely safe because it's natural",
        whatTheySay:
          "Because it's derived from a human stomach protein, influencers consider it safe.",
        actualEvidence:
          "Being derived from a human protein does not guarantee safety. Many natural peptides can have unexpected effects at pharmacological doses. Without human safety studies, it is impossible to claim it is safe.",
      },
    ],
    faqs: [
      {
        question: "Is BPC-157 legal in Brazil?",
        answer:
          "BPC-157 is not a medication approved by ANVISA. There is no specific regulation for its therapeutic use in Brazil. Products sold as 'for research' operate in a regulatory gray area.",
      },
      {
        question: "Why are there no human studies?",
        answer:
          "Human clinical trials are expensive and complex. Since BPC-157 is a natural peptide that cannot be easily patented, there is little economic incentive for pharmaceutical companies to invest in phase 1-3 clinical studies.",
      },
    ],
  },

  "cjc-1295": {
    description:
      "Synthetic analog of growth hormone-releasing hormone (GHRH) with an extended half-life. Frequently combined with ipamorelin to potentiate GH release. Available in versions with and without DAC (Drug Affinity Complex).",
    mechanism:
      "CJC-1295 mimics natural GHRH, binding to receptors in the anterior pituitary to stimulate growth hormone synthesis and release. The DAC version binds to serum albumin, extending the half-life from minutes to days. It amplifies the natural GH pulses without suppressing the hypothalamic-pituitary axis.",
    benefits: [
      {
        name: "Sustained increase in GH and IGF-1",
        description:
          "A human study demonstrated a 2-10x increase in GH levels and a 1.5-3x increase in IGF-1 levels after a single dose.",
      },
    ],
    risks: [
      {
        name: "Injection site reaction",
        frequency: "Common",
        description:
          "Redness, swelling, or pain at the subcutaneous injection site.",
      },
      {
        name: "Water retention",
        frequency: "Variable",
        description:
          "Mild edema may occur, related to increased GH/IGF-1 levels.",
      },
    ],
    internetVsScience: [],
    faqs: [],
  },

  cagrisema: {
    description:
      "CagriSema is a fixed-dose combination of cagrilintide (a long-acting amylin analog) and semaglutide (a GLP-1 receptor agonist) developed by Novo Nordisk. The therapy combines two complementary mechanisms in a single weekly subcutaneous injection, achieving approximately 20% weight loss over 68 weeks in clinical trials — superior to semaglutide alone. It is in phase 3 clinical development (REDEFINE program) with FDA response pending for 2026.",
    mechanism:
      "CagriSema combines two peptides with complementary mechanisms. Semaglutide activates the GLP-1 receptor, stimulating insulin secretion, suppressing glucagon, and reducing appetite via hypothalamic satiety centers. Cagrilintide is a long-acting analog of amylin, a hormone co-secreted with insulin by pancreatic beta cells. Amylin delays gastric emptying, suppresses glucagon secretion, and activates brain regions different from GLP-1 to promote satiety. The combination of both mechanisms — GLP-1 acting predominantly in the hypothalamus and amylin in the area postrema — creates a synergistic effect on appetite reduction, resulting in significantly greater weight loss than either component alone.",
    benefits: [
      {
        name: "Superior weight loss (~20%)",
        description:
          "In REDEFINE studies, participants lost approximately 20% of body weight over 68 weeks — superior to semaglutide 2.4 mg alone (~16%). The combination of mechanisms explains the additional efficacy.",
      },
      {
        name: "Synergistic dual mechanism",
        description:
          "The amylin + GLP-1 combination acts on complementary neural satiety pathways. Cagrilintide adds appetite suppression via the area postrema, while semaglutide acts on the hypothalamus, generating an additive effect.",
      },
      {
        name: "Glycemic control",
        description:
          "Studies in patients with type 2 diabetes show robust HbA1c reduction. Amylin complements the GLP-1 action on glucose metabolism, with additional postprandial glycemia reduction.",
      },
      {
        name: "Potential in NASH/hepatic steatosis",
        description:
          "The substantial weight loss (~20%) suggests significant benefits in non-alcoholic hepatic steatosis. Specific studies for NASH are being planned.",
      },
    ],
    risks: [
      {
        name: "Nausea",
        frequency: "35-45% of patients",
        description:
          "Most frequent side effect, especially during titration. The combination of two peptides may intensify gastrointestinal symptoms early in treatment. Gradual titration is essential.",
      },
      {
        name: "Injection site reactions",
        frequency: "10-15% of patients",
        description:
          "Redness, swelling, or mild pain at the application site. Generally transient and self-limiting. Injection site rotation is recommended.",
      },
      {
        name: "Risk of pancreatitis",
        frequency: "Rare (<1%)",
        description:
          "Class risk of GLP-1 agonists and amylin analogs. Rare but serious cases of acute pancreatitis have been reported. Discontinue immediately if severe persistent abdominal pain occurs. Contraindicated in patients with a history of pancreatitis.",
      },
    ],
    internetVsScience: [
      {
        claim: "CagriSema is the best weight loss drug in the world",
        whatTheySay:
          "With 20% weight loss, CagriSema surpasses all other available treatments.",
        actualEvidence:
          "CagriSema did demonstrate ~20% weight loss, surpassing semaglutide alone (~16%). However, retatrutide (triple agonist) achieved ~24% in phase 2 studies. Moreover, CagriSema has not yet been approved — the results are from controlled clinical trials. Comparing different studies has limitations.",
      },
      {
        claim: "It's safer than Ozempic because it uses two drugs at lower doses",
        whatTheySay:
          "Because it combines two drugs, each at a lower dose, the side effects are reduced.",
        actualEvidence:
          "Not exactly. The semaglutide in CagriSema is used at the same 2.4 mg dose as Wegovy, with the addition of cagrilintide. Gastrointestinal effects (nausea, vomiting) tend to be similar or slightly more frequent than semaglutide alone. The overall safety profile is comparable.",
      },
      {
        claim: "CagriSema is already available at clinics in Brazil",
        whatTheySay:
          "Some weight loss clinics already offer the compounded cagrilintide + semaglutide combination.",
        actualEvidence:
          "CagriSema has NOT been approved by any regulatory agency (FDA, ANVISA, EMA). Cagrilintide alone also has no approval. Any offer of 'CagriSema' or a similar combination is illegal and unregulated. The components require specific manufacturing conditions that cannot be replicated at compounding pharmacies.",
      },
      {
        claim: "CagriSema replaces bariatric surgery",
        whatTheySay:
          "With 20% weight loss, bariatric surgery is no longer necessary.",
        actualEvidence:
          "Bariatric surgery results in 25-35% sustained weight loss over decades, plus diabetes remission in 60-80% of cases. CagriSema (~20%) approaches but is still inferior, and the effects depend on continuous use. For class III obesity (BMI > 40) or multiple comorbidities, surgery may remain the more effective option. The decision should be individualized with a physician.",
      },
    ],
    faqs: [
      {
        question: "What exactly is CagriSema?",
        answer:
          "CagriSema is a fixed-dose combination of two peptides in a single weekly injection: cagrilintide (a long-acting amylin analog) and semaglutide (a GLP-1 receptor agonist, the same active ingredient in Ozempic/Wegovy). Novo Nordisk is developing the product as an evolution of standalone semaglutide.",
      },
      {
        question: "What is the difference between CagriSema and Amycretin?",
        answer:
          "They are different products from Novo Nordisk. CagriSema combines two separate peptides (cagrilintide + semaglutide) in one injection. Amycretin is a single molecule that integrates GLP-1 and amylin activity in the same peptide — it is at an earlier stage of development. Both exploit the amylin + GLP-1 synergy but with distinct molecular approaches.",
      },
      {
        question: "When will CagriSema be approved?",
        answer:
          "Novo Nordisk submitted CagriSema to the FDA with a response expected in the second half of 2026. If approved in the US, the ANVISA submission will likely follow within 6-12 months, with Brazilian approval estimated for 2028-2029.",
      },
      {
        question: "Is it better than Wegovy (semaglutide)?",
        answer:
          "In clinical trials, yes: CagriSema (~20% weight loss) outperformed semaglutide alone (~16%). The dual mechanism (amylin + GLP-1) explains the superior efficacy. However, CagriSema may have higher costs and is not yet commercially available. For many patients, semaglutide alone may be sufficient.",
      },
      {
        question: "Can I use cagrilintide separately along with my Ozempic?",
        answer:
          "No. Cagrilintide (amylin analog) is not commercially available as a standalone product. The CagriSema combination was developed with specific proportions and careful titration. Combining medications on your own is dangerous and can cause severe hypoglycemia or other serious adverse effects. Never combine medications without medical guidance.",
      },
    ],
  },

  cerebrolysin: {
    description:
      "Mixture of low molecular weight peptides and amino acids derived from purified porcine brain. Approved in more than 40 countries for stroke, dementia, and traumatic brain injury. Not approved in the US. One of the most clinically studied neurotrophics, with over 200 clinical studies.",
    mechanism:
      "Cerebrolysin contains peptide fragments that mimic the action of natural neurotrophic factors (BDNF, GDNF, NGF, CNTF). It promotes neuroplasticity, neuroprotection, neurogenesis, and synaptogenesis. It acts on multiple pathways simultaneously, unlike single molecules that target only one.",
    benefits: [
      {
        name: "Stroke recovery",
        description:
          "Meta-analyses of clinical trials demonstrate improved functional recovery post-stroke when administered within the first 72 hours. Approved for this indication in 40+ countries.",
      },
      {
        name: "Dementia and Alzheimer's",
        description:
          "Clinical studies show modest improvement in cognitive function in patients with mild to moderate Alzheimer's. Mixed results in meta-analyses.",
      },
      {
        name: "Traumatic brain injury",
        description:
          "Clinical studies in TBI show neuroprotective potential, but evidence is still insufficient for a definitive recommendation.",
      },
    ],
    risks: [
      {
        name: "Allergic reaction",
        frequency: "Rare",
        description:
          "Being derived from porcine brain, it may cause allergic reactions in sensitive individuals.",
      },
      {
        name: "Dizziness and agitation",
        frequency: "Uncommon",
        description:
          "Mild neurological side effects reported in clinical studies.",
      },
    ],
    internetVsScience: [
      {
        claim: "Super brain drug",
        whatTheySay:
          "Cerebrolysin regenerates neurons and cures brain damage.",
        actualEvidence:
          "It has over 200 clinical studies and approval in 40+ countries — far more evidence than most peptides. Real efficacy in stroke recovery. But it does not 'regenerate' lost neurons and results in Alzheimer's are modest. Not FDA-approved due to issues with standardization of the biological product.",
      },
    ],
    faqs: [
      {
        question: "Why isn't Cerebrolysin approved in the US?",
        answer:
          "The FDA requires rigorous standardization of composition for approval. Since Cerebrolysin is a complex mixture of peptides derived from porcine brain, each batch may have slightly different composition, making it difficult to meet FDA criteria. It is approved in over 40 countries including Germany, Russia, China, and South Korea.",
      },
    ],
  },

  dsip: {
    description:
      "Neuropeptide discovered in 1977 that modulates delta sleep (deep slow-wave sleep). Researched for insomnia, stress management, and circadian rhythm regulation. Found naturally in the human brain.",
    mechanism:
      "DSIP is a nonapeptide (9 amino acids) that modulates GABAergic and serotonergic activity in the brainstem and hypothalamus. It promotes slow-wave sleep (delta sleep), reduces cortisol levels, and modulates growth hormone release during sleep. It also influences LH production and the hypothalamic-pituitary-adrenal axis.",
    benefits: [
      {
        name: "Improved deep sleep",
        description:
          "Small clinical studies demonstrate increased slow-wave sleep and subjective improvement in sleep quality in patients with insomnia.",
      },
      {
        name: "Stress reduction",
        description:
          "Studies show reduced cortisol levels and normalization of the stress response in animal models and small human studies.",
      },
    ],
    risks: [
      {
        name: "Limited clinical studies",
        frequency: "N/A",
        description:
          "Clinical studies are outdated (1980s-1990s), small, and with questionable methodology by current standards.",
      },
      {
        name: "Very short half-life",
        frequency: "N/A",
        description:
          "Rapidly degraded in the blood (half-life ~7-8 minutes), questioning the efficacy of peripheral administration.",
      },
    ],
    internetVsScience: [
      {
        claim: "Cures insomnia naturally",
        whatTheySay:
          "DSIP is the natural sleep peptide — take it and sleep like a baby, without sleeping pill effects.",
        actualEvidence:
          "Modulates deep sleep in some studies, but the evidence is weak and outdated. Extremely short half-life raises questions about whether it reaches the brain in effective quantities. Not a substitute for sleep hygiene or medical treatment of insomnia.",
      },
    ],
    faqs: [],
  },

  dihexa: {
    description:
      "Nootropic peptide derived from angiotensin IV with a potency 10 million times greater than BDNF for the formation of new neural connections (synaptogenesis). Researched for Alzheimer's and cognitive decline. Extremely potent but with very limited clinical data.",
    mechanism:
      "Dihexa binds to the HGF (Hepatocyte Growth Factor) / c-Met receptor, potentiating HGF signaling in the brain. This promotes synaptogenesis (formation of new synapses), neurogenesis, and neuronal survival. It is orally stable, which is rare for peptides.",
    benefits: [
      {
        name: "Potent synaptogenesis",
        description:
          "A seminal study demonstrated 10^7 times greater potency than BDNF in forming new synapses in vitro. It restored cognitive function in rats with induced dementia.",
      },
      {
        name: "Oral bioavailability",
        description:
          "Unlike most peptides, it is stable and active when administered orally in animal models.",
      },
    ],
    risks: [
      {
        name: "Theoretical oncological risk",
        frequency: "Unknown",
        description:
          "Activates the HGF/c-Met pathway, which is a known oncogene. Overactivation of this pathway is associated with tumor growth and metastasis. Long-term risk is completely unknown.",
      },
      {
        name: "Zero human data",
        frequency: "N/A",
        description:
          "All evidence comes from a single laboratory (University of Washington). No published human studies.",
      },
    ],
    internetVsScience: [
      {
        claim: "The most potent nootropic in existence",
        whatTheySay:
          "Dihexa is 10 million times more potent than BDNF — the super peptide for the brain.",
        actualEvidence:
          "The in vitro potency is real (published in a peer-reviewed journal), but in vitro potency does not equal clinical efficacy. Zero human studies. Real oncological risk via c-Met. Using an oncogene activator as a nootropic is extremely risky without safety data.",
      },
    ],
    faqs: [],
  },

  epithalon: {
    description:
      "Synthetic tetrapeptide (Ala-Glu-Asp-Gly) based on epithalamin, a natural peptide produced by the pineal gland. Researched for its effects on telomerase activation and anti-aging potential. Developed by Russian gerontologist Vladimir Khavinson.",
    mechanism:
      "Epithalon activates telomerase, the enzyme that lengthens telomeres — the protective caps on chromosomes that shorten with each cell division. Longer telomeres are associated with greater cellular longevity. It also regulates melatonin production by the pineal gland and modulates gene expression related to aging.",
    benefits: [
      {
        name: "Telomerase activation",
        description:
          "In vitro studies demonstrate telomerase activation and telomere lengthening in human cells. In vivo studies in animal models confirm the effect.",
      },
      {
        name: "Melatonin regulation",
        description:
          "Studies in primates and elderly humans show restoration of the circadian rhythm and melatonin production by the pineal gland.",
      },
      {
        name: "Increased lifespan in animals",
        description:
          "Studies in rats and mice by Khavinson et al. demonstrated a 25-30% increase in lifespan.",
      },
    ],
    risks: [
      {
        name: "Predominantly Russian studies",
        frequency: "N/A",
        description:
          "Nearly all research was conducted by the same group in Russia (Khavinson). Independent replications and robust clinical studies outside Russia are lacking.",
      },
      {
        name: "Theoretical cancer risk",
        frequency: "Unknown",
        description:
          "Telomerase activation is a hallmark of cancer cells. Although animal studies did not show increased cancer, the theoretical risk exists and has not been adequately assessed in humans.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reverses biological aging",
        whatTheySay:
          "Epithalon is the fountain of youth — it lengthens telomeres and reverses the biological clock.",
        actualEvidence:
          "It activates telomerase in the lab, but lengthening telomeres is not synonymous with reversing aging. Aging is multifactorial. Animal longevity studies are promising but conducted by only one group. No phase 3 human clinical trial.",
      },
    ],
    faqs: [
      {
        question: "Can Epithalon cause cancer?",
        answer:
          "This is a legitimate theoretical concern, as telomerase is activated in 85-90% of human cancers. However, Khavinson's animal studies did not show increased tumor incidence — in fact, some showed a reduction. But these studies were not designed to evaluate oncological risk and have not been independently replicated.",
      },
    ],
  },

  espermidina: {
    description:
      "IMPORTANT: Spermidine is not a peptide; it is a natural polyamine found in all living cells. Present in high concentrations in wheat germ, aged cheese (especially mature cheddar), mushrooms, soy, and natto. It activates autophagy (cellular recycling) and has been shown to increase lifespan in animal models. In humans, it is associated with reduced cardiovascular mortality.",
    mechanism:
      "Spermidine is a potent inducer of autophagy — the cellular process of recycling damaged components. It inhibits histone acetyltransferases, modulating gene expression. It reduces inflammation, improves mitochondrial and cardiac function, and mimics the effects of caloric restriction across various systems.",
    benefits: [
      {
        name: "Autophagy induction",
        description:
          "Demonstrated in multiple in vitro and in vivo studies. Considered one of the most potent natural inducers of autophagy.",
      },
      {
        name: "Cardiovascular health",
        description:
          "Population studies associate high dietary spermidine intake with lower cardiovascular and all-cause mortality.",
      },
      {
        name: "Cognitive function",
        description:
          "The SmartAge study showed modest memory improvement in older adults with subjective cognitive decline after 3 months of supplementation.",
      },
      {
        name: "Animal longevity",
        description:
          "Lifespan extension demonstrated in yeast, worms, flies, mice, and human cardiomyocytes in vitro.",
      },
    ],
    risks: [
      {
        name: "Limited clinical studies",
        frequency: "N/A",
        description:
          "Has been present in the diet forever, so the safety profile is favorable. But clinical studies with supplemental doses are still limited.",
      },
    ],
    internetVsScience: [
      {
        claim: "Eating cheddar cheese makes you live longer",
        whatTheySay:
          "Aged cheese contains spermidine and therefore prolongs life.",
        actualEvidence:
          "True that mature cheddar contains spermidine. Population studies associate higher dietary intake with longevity. But attributing longevity to a single cheese component is an oversimplification — the overall diet matters.",
      },
    ],
    faqs: [],
  },

  "foxo4-dri": {
    description:
      "Senolytic peptide developed by Peter de Keizer at Utrecht University (2017). FOXO4-DRI is a D-retro-inverso peptide designed to selectively eliminate senescent cells — so-called 'zombie cells' that accumulate with aging and secrete harmful inflammatory factors. In aged mice studies, the peptide restored physical vigor, fur density, and kidney function, making it one of the most discussed anti-aging compounds in the scientific community.",
    mechanism:
      "FOXO4-DRI works by disrupting the interaction between the FOXO4 and p53 proteins within senescent cells. Normally, FOXO4 binds to p53 in the nucleus of senescent cells, preventing p53 from activating the apoptosis (programmed cell death) pathway. The FOXO4-DRI peptide competes with endogenous FOXO4 for this binding, displacing p53 to the cytoplasm. Once free in the cytoplasm, p53 activates the mitochondrial apoptosis cascade, leading to selective death of the senescent cell. Healthy cells are unaffected because they do not depend on the FOXO4-p53 interaction for survival. The D-retro-inverso structure (D-amino acids in reversed sequence) confers resistance to protease degradation, increasing the peptide's in vivo half-life.",
    benefits: [
      {
        name: "Elimination of senescent cells",
        description:
          "In aged and genetically modified mice, FOXO4-DRI significantly reduced the senescent cell burden in multiple tissues, including liver, kidney, and intestine.",
      },
      {
        name: "Anti-aging potential",
        description:
          "Mice treated with FOXO4-DRI showed improvements in physical activity, overall appearance, and aging markers. Senolysis is considered one of the most promising strategies against biological aging.",
      },
      {
        name: "Fur regeneration in aged mice",
        description:
          "Naturally aged mice treated with FOXO4-DRI showed significant fur regeneration, indicating hair follicle rejuvenation after the elimination of senescent cells.",
      },
      {
        name: "Improved kidney function",
        description:
          "Treated mice showed improved kidney function, measured by reduced plasma urea levels, suggesting that eliminating senescent cells in the kidneys may partially restore organ function.",
      },
    ],
    risks: [
      {
        name: "Extremely high cost",
        frequency: "Always",
        description:
          "FOXO4-DRI synthesis is complex and expensive due to its D-retro-inverso structure (48 D-amino acids). Estimated cost per dose is thousands of dollars, making it inaccessible to most people.",
      },
      {
        name: "Unknown long-term effects",
        frequency: "Unknown",
        description:
          "No long-term studies exist, not even in animals. The effects of chronic senescent cell elimination over years are completely unknown.",
      },
      {
        name: "Risk of eliminating beneficial senescent cells",
        frequency: "Theoretical",
        description:
          "Not all senescent cells are harmful. Some play important roles in wound healing, tumor suppression, and embryonic development. Indiscriminate elimination may have unexpected consequences.",
      },
      {
        name: "Complete absence of human data",
        frequency: "N/A",
        description:
          "No human clinical trial exists. All evidence comes from mice. Translating results from murine models to humans frequently fails, especially in anti-aging interventions.",
      },
    ],
    internetVsScience: [
      {
        claim: "FOXO4-DRI reverses aging",
        whatTheySay:
          "The peptide rejuvenates the entire body, reversing years of aging in just a few weeks.",
        actualEvidence:
          "In mice, there were improvements in specific aging markers (fur, kidney function, physical activity). This is not 'aging reversal' — it is the removal of one factor contributing to functional decline. Aging is multifactorial and no single compound 'reverses' it.",
      },
      {
        claim: "Already available for human use",
        whatTheySay:
          "Longevity clinics and peptide suppliers offer FOXO4-DRI for human administration.",
        actualEvidence:
          "There is NO completed or ongoing human clinical trial. Any use in humans is completely experimental, without established safety data, pharmacokinetics, or dosing for our species.",
      },
      {
        claim: "FOXO4-DRI cures cancer",
        whatTheySay:
          "Since it eliminates old and damaged cells, the peptide can cure or prevent cancer.",
        actualEvidence:
          "The relationship between cellular senescence and cancer is complex. Senescent cells can both suppress and promote tumors (via SASP — senescence-associated secretory phenotype). Eliminating senescent cells may reduce the pro-tumoral microenvironment but also remove a barrier against the proliferation of pre-malignant cells. There is no evidence that FOXO4-DRI prevents or treats cancer.",
      },
    ],
    faqs: [
      {
        question: "What are senescent cells and why eliminate them?",
        answer:
          "Senescent cells are cells that have stopped dividing but do not die. They accumulate with age and secrete inflammatory substances (called SASP) that damage neighboring tissues, contributing to cardiovascular disease, neurodegeneration, arthritis, and other age-associated conditions. Eliminating these 'zombie cells' is one of the most promising strategies in anti-aging medicine.",
      },
      {
        question: "Can I use FOXO4-DRI in humans today?",
        answer:
          "There is no human safety data. No clinical trials have been completed or are underway. Dosing, pharmacokinetics, and side effects in humans are completely unknown. Any use is experimental and risky. Additionally, synthesis costs are prohibitive — thousands of dollars per dose.",
      },
      {
        question:
          "What is the difference between FOXO4-DRI and other senolytics like dasatinib + quercetin?",
        answer:
          "Dasatinib + quercetin (D+Q) are small molecules already approved for other uses (dasatinib is a chemotherapy drug) and are much more accessible. FOXO4-DRI is a peptide specifically designed for senolysis with a more selective mechanism (blocks FOXO4-p53). In practice, D+Q has more human clinical data, while FOXO4-DRI remains restricted to animal studies.",
      },
      {
        question: "Do the mouse results translate to humans?",
        answer:
          "Not always. Aging biology in mice differs significantly from humans. Mice live ~2 years, so changes in aging markers are easier to detect. Many promising anti-aging interventions in mice have failed when tested in humans. FOXO4-DRI still needs rigorous clinical trials to determine whether the benefits observed in rodents apply to people.",
      },
    ],
  },

  fisetina: {
    description:
      "IMPORTANT: Fisetin is not a peptide; it is a flavonoid (polyphenol) found in fruits and vegetables such as strawberries (the richest source), apples, persimmons, grapes, and onions. It gained prominence in longevity research as a senolytic — a compound that selectively eliminates senescent ('zombie') cells that accumulate with age and contribute to chronic inflammation.",
    mechanism:
      "Fisetin is classified as a senolytic — it induces selective apoptosis in senescent cells (old cells that stopped dividing but do not die, secreting inflammatory molecules). It also has antioxidant, anti-inflammatory, and neuroprotective properties. It crosses the blood-brain barrier.",
    benefits: [
      {
        name: "Senolytic activity",
        description:
          "Demonstrated in in vitro studies and in mice. It was identified as the most potent senolytic among flavonoids tested.",
      },
      {
        name: "Increased lifespan in mice",
        description:
          "Mice treated with fisetin late in life had a 10% increase in lifespan and reduced senescence markers.",
      },
      {
        name: "Neuroprotection",
        description:
          "Studies in animal models of Alzheimer's and Parkinson's show neuroprotective effects and cognitive improvement.",
      },
    ],
    risks: [
      {
        name: "Very low bioavailability",
        frequency: "Universal",
        description:
          "Fisetin has very low oral absorption. Supplemental doses need to be much higher than those obtained naturally from the diet.",
      },
      {
        name: "No completed human studies",
        frequency: "N/A",
        description:
          "Human clinical trials are in phase 1/2 (e.g., Mayo Clinic study). Efficacy in humans has not yet been confirmed.",
      },
    ],
    internetVsScience: [
      {
        claim: "Kills zombie cells and rejuvenates you",
        whatTheySay:
          "Fisetin is the natural senolytic that clears old cells and reverses aging.",
        actualEvidence:
          "Senolytic activity is real in the lab and in mice. But the 'rejuvenating' effect in humans has not yet been demonstrated in clinical trials. Promising research, but not conclusive.",
      },
    ],
    faqs: [],
  },

  "ghk-cu": {
    description:
      "Tripeptide naturally present in blood plasma that binds to copper. Extensively researched for its anti-aging effects on skin, including collagen stimulation, wound healing, and wrinkle reduction. One of the few peptides with well-studied topical application.",
    mechanism:
      "GHK-Cu (glycyl-L-histidyl-L-lysine copper) is found naturally in human blood, but its levels decline with age. The copper-peptide complex activates genes involved in the synthesis of collagen, elastin, and glycosaminoglycans. It also has antioxidant and anti-inflammatory effects and stimulates extracellular matrix remodeling.",
    benefits: [
      {
        name: "Collagen stimulation",
        description:
          "Multiple in vitro and clinical studies confirm increased production of type I and III collagen when applied topically.",
      },
      {
        name: "Wrinkle and fine line reduction",
        description:
          "Small clinical studies demonstrated improved skin texture and wrinkle reduction after topical use of GHK-Cu creams.",
      },
      {
        name: "Wound healing",
        description:
          "Evidence of accelerated healing in animal studies and small clinical studies.",
      },
    ],
    risks: [
      {
        name: "Skin irritation",
        frequency: "Uncommon",
        description:
          "May cause mild irritation on sensitive skin when used topically.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reverses aging",
        whatTheySay:
          "Promoted as a 'miraculous anti-aging' that reverses years of skin aging.",
        actualEvidence:
          "Proven improvement in skin quality and collagen, but does not 'reverse' aging. Effects are modest and gradual. Topical use has more evidence than injectable.",
      },
    ],
    faqs: [
      {
        question: "Does GHK-Cu work better topically or as an injection?",
        answer:
          "Most clinical studies used GHK-Cu in topical formulations (creams and serums). Topical application has more scientific evidence than injectable for skin effects.",
      },
    ],
  },

  glutationa: {
    description:
      "Unlike NMN/NAC/Resveratrol, glutathione IS TECHNICALLY A PEPTIDE — a tripeptide composed of glutamate, cysteine, and glycine (gamma-Glu-Cys-Gly). It is the primary intracellular antioxidant in the body and plays a central role in hepatic detoxification, immune function, and protection against oxidative stress. Levels decline with age.",
    mechanism:
      "Glutathione acts as a free radical scavenger, regenerates other antioxidants (vitamins C and E), conjugates toxins in the liver for excretion, and modulates immune function. The enzyme glutathione peroxidase uses GSH to neutralize hydrogen peroxide. It also regulates cell signaling and gene expression via redox reactions.",
    benefits: [
      {
        name: "Intracellular antioxidant",
        description:
          "Proven to be the primary endogenous antioxidant. GSH levels are a marker of cellular health.",
      },
      {
        name: "Liver support",
        description:
          "Essential for phase 2 hepatic detoxification. Used clinically in liver diseases and intoxications.",
      },
      {
        name: "Oral supplementation",
        description:
          "Liposomal form increases GSH levels in humans. Conventional supplementation has limited absorption — NAC is often preferred as it indirectly increases endogenous GSH.",
      },
      {
        name: "Skin lightening",
        description:
          "Popular in aesthetic clinics for skin lightening. Clinical evidence is limited and the mechanism is controversial.",
      },
    ],
    risks: [
      {
        name: "Low oral absorption",
        frequency: "Conventional form",
        description:
          "Conventional oral glutathione is degraded in the intestine. Liposomal forms or intravenous administration are alternatives, but cost is higher.",
      },
      {
        name: "Intravenous use for skin lightening",
        frequency: "Variable",
        description:
          "IV glutathione use for skin lightening carries risks: allergic reactions, kidney problems, and infections from poor practice. ANVISA has issued a warning against off-label use.",
      },
    ],
    internetVsScience: [
      {
        claim: "Intravenous glutathione permanently lightens the skin",
        whatTheySay:
          "IV glutathione application at aesthetic clinics for 'skin lightening'.",
        actualEvidence:
          "Clinical evidence is limited and ANVISA does not approve use for lightening. There are reports of adverse events. Effects are temporary when they occur.",
      },
      {
        claim: "Taking oral glutathione increases your levels",
        whatTheySay:
          "Glutathione capsules increase glutathione in the body.",
        actualEvidence:
          "Conventional oral glutathione has very low bioavailability — it is degraded in the intestine. Liposomal forms have better absorption. NAC (a precursor) is often more effective at increasing endogenous GSH.",
      },
    ],
    faqs: [
      {
        question: "Is glutathione really a peptide?",
        answer:
          "Yes. Glutathione is technically a tripeptide (3 amino acids: glutamate, cysteine, glycine). Unlike NMN, NAC, or resveratrol, it fits the definition of a peptide. It is classified in this database as an immunological peptide.",
      },
    ],
  },

  ipamorelin: {
    description:
      "Growth hormone secretagogue peptide that stimulates GH release from the pituitary gland. Considered one of the most selective secretagogues, with fewer side effects than others in the same class. Frequently combined with CJC-1295.",
    mechanism:
      "Ipamorelin is a pentapeptide that acts as a ghrelin receptor (GHSR) agonist in the anterior pituitary, stimulating pulsatile growth hormone release. Unlike other secretagogues, it does not significantly affect cortisol or prolactin levels, making it more selective.",
    benefits: [
      {
        name: "GH increase",
        description:
          "Clinical studies confirm a dose-dependent increase in growth hormone release in healthy humans.",
      },
      {
        name: "Selectivity (fewer side effects)",
        description:
          "Does not significantly raise cortisol or prolactin, unlike other secretagogues such as GHRP-6.",
      },
    ],
    risks: [
      {
        name: "Headache",
        frequency: "Common",
        description: "Side effect frequently reported in clinical studies.",
      },
      {
        name: "Water retention",
        frequency: "Variable",
        description: "Mild swelling may occur due to increased GH.",
      },
    ],
    internetVsScience: [
      {
        claim: "Replaces HGH injections",
        whatTheySay:
          "Promoted as a safer and cheaper alternative to synthetic growth hormone.",
        actualEvidence:
          "Stimulates natural GH release, but the levels achieved are significantly lower than with exogenous HGH. It is not equivalent.",
      },
    ],
    faqs: [],
  },

  kpv: {
    description:
      "Tripeptide derived from the alpha-MSH (alpha-melanocyte-stimulating hormone) with potent anti-inflammatory effects. Researched for inflammatory bowel disease, dermatitis, and systemic inflammation. Popular in the biohacking community for its anti-inflammatory profile without immunosuppression.",
    mechanism:
      "KPV consists of the three C-terminal amino acids of alpha-MSH (Lysine-Proline-Valine). It inhibits NF-kappaB activation, the main inflammatory signaling pathway, and reduces the production of pro-inflammatory cytokines (TNF-alpha, IL-6, IL-1beta). Unlike immunosuppressants, it modulates inflammation without suppressing the adaptive immune response.",
    benefits: [
      {
        name: "Potent anti-inflammatory",
        description:
          "In vitro and animal studies demonstrate significant NF-kappaB inhibition and reduction of inflammatory cytokines without immunosuppression.",
      },
      {
        name: "Intestinal protection",
        description:
          "Animal models of colitis show reduced intestinal inflammation and mucosal protection. Potential for Crohn's disease and ulcerative colitis.",
      },
      {
        name: "Wound healing",
        description:
          "Accelerates healing in animal models through local inflammation reduction and macrophage modulation.",
      },
    ],
    risks: [
      {
        name: "No human studies",
        frequency: "Unknown",
        description:
          "Zero published human clinical trials. All evidence is preclinical (in vitro and animal).",
      },
    ],
    internetVsScience: [
      {
        claim: "Cures intestinal diseases",
        whatTheySay:
          "Oral KPV cures leaky gut, IBS, Crohn's, and colitis — the perfect anti-inflammatory.",
        actualEvidence:
          "Real anti-inflammatory effects demonstrated in animal models of colitis, but ZERO human studies. Oral bioavailability of peptides is generally very low. There is no evidence that it 'cures' any condition.",
      },
    ],
    faqs: [],
  },

  "ll-37": {
    description:
      "The only antimicrobial peptide of the cathelicidin family found in humans. Acts as a first line of innate immune defense against bacteria, viruses, and fungi. Researched for antibiotic-resistant infections and immune modulation.",
    mechanism:
      "LL-37 is a 37-amino acid peptide cleaved from the precursor protein hCAP18. It has direct antimicrobial activity — it disrupts bacterial membranes by forming pores. It also acts as an immunomodulator, recruiting immune cells, stimulating angiogenesis, and promoting wound healing. Naturally produced by neutrophils, macrophages, and epithelial cells.",
    benefits: [
      {
        name: "Broad-spectrum antimicrobial activity",
        description:
          "Demonstrated activity against gram-positive and gram-negative bacteria, enveloped viruses, and fungi in vitro. Active against bacterial biofilms.",
      },
      {
        name: "Immunomodulation",
        description:
          "Recruits immune cells, modulates inflammation, and promotes wound healing. Phase 1/2 clinical studies for venous ulcers showed positive results.",
      },
    ],
    risks: [
      {
        name: "Toxicity at high doses",
        frequency: "Dose-dependent",
        description:
          "At high concentrations, LL-37 can be cytotoxic to human cells (the same membrane-disrupting mechanism it uses against bacteria).",
      },
    ],
    internetVsScience: [
      {
        claim: "Natural antibiotic that replaces medications",
        whatTheySay:
          "LL-37 naturally kills bacteria, viruses, and fungi — it can replace antibiotics.",
        actualEvidence:
          "It has real and proven antimicrobial activity in vitro, but the concentrations needed in vivo are difficult to achieve without toxicity. It does not replace antibiotics for established infections. Research is focused on topical use for wounds.",
      },
    ],
    faqs: [],
  },

  "mots-c": {
    description:
      "Peptide encoded by mitochondrial DNA that acts as an exercise hormone (exercise mimetic). Regulates glucose metabolism, insulin sensitivity, and energy homeostasis. Considered one of the most promising mitochondrial peptides for metabolism and longevity.",
    mechanism:
      "MOTS-c is a 16-amino acid peptide encoded by the mitochondrial DNA 12S rRNA gene. It acts as a mitokine — a hormone secreted by mitochondria that acts systemically. It activates the AMPK pathway, improves muscular glucose uptake, increases fatty acid metabolism, and regulates the folate pathway. In response to metabolic stress, it translocates to the cell nucleus where it regulates gene expression.",
    benefits: [
      {
        name: "Mimics physical exercise",
        description:
          "Mouse studies demonstrate that MOTS-c activates metabolic pathways similar to exercise, including AMPK activation and improved muscular glucose uptake.",
      },
      {
        name: "Insulin sensitivity",
        description:
          "Improves diet-induced insulin resistance in animal models. The first human clinical study (phase 1) was published in 2023.",
      },
      {
        name: "Obesity protection",
        description:
          "Prevents diet-induced weight gain in mice on hypercaloric diets. Increases energy expenditure and fatty acid oxidation.",
      },
    ],
    risks: [
      {
        name: "Very limited clinical data",
        frequency: "Unknown",
        description:
          "Only one phase 1 clinical study published in humans (2023, n=10). Long-term safety profile completely unknown.",
      },
    ],
    internetVsScience: [
      {
        claim: "Replaces physical exercise",
        whatTheySay:
          "Called 'exercise in a pill' — take MOTS-c and skip the gym.",
        actualEvidence:
          "Activates some exercise-like pathways in animal models but does not replicate all benefits of exercise (cardiovascular, mental, bone). Only 1 published human study. Does not replace exercise.",
      },
    ],
    faqs: [
      {
        question: "Is MOTS-c natural to the body?",
        answer:
          "Yes. MOTS-c is naturally produced by human mitochondria and its circulating levels decline with age. It is the first hormonal peptide encoded by mitochondrial DNA (not nuclear) to be identified.",
      },
    ],
  },

  "melanotan-ii": {
    description:
      "Synthetic analog of alpha-MSH hormone that stimulates melanin production (tanning) and affects sexual function. Widely used in the underground market for sunless tanning. Not approved by any regulatory agency. Associated with significant risks.",
    mechanism:
      "Melanotan II activates multiple melanocortin receptors (MC1R-MC5R). Via MC1R, it stimulates melanocytes to produce melanin, causing tanning without UV exposure. Via MC4R, it affects sexual desire centers in the hypothalamus (same receptor as PT-141/Vyleesi). Via MC3R/MC4R, it may suppress appetite.",
    benefits: [
      {
        name: "Tanning without UV",
        description:
          "Phase 2 clinical studies confirm significant increase in melanin and skin tanning without sun exposure.",
      },
      {
        name: "Effect on sexual function",
        description:
          "Observed side effect that led to the development of PT-141 (bremelanotide/Vyleesi) as a separate medication.",
      },
    ],
    risks: [
      {
        name: "Atypical nevi / melanoma",
        frequency: "Case reports",
        description:
          "Reports of atypical nevi (irregular moles) appearing and potential malignant transformation. Melanocyte stimulation may promote melanoma in predisposed individuals.",
      },
      {
        name: "Severe nausea",
        frequency: "Very common",
        description:
          "Intense nausea is the most frequent side effect, especially with the first doses.",
      },
      {
        name: "Increased blood pressure",
        frequency: "Common",
        description: "Transient hypertension reported in clinical studies.",
      },
      {
        name: "Product contamination",
        frequency: "Variable",
        description:
          "Products sold online are frequently contaminated or have incorrect dosing. No quality control.",
      },
    ],
    internetVsScience: [
      {
        claim: "Safe tanning without sun",
        whatTheySay:
          "MT-2 gives a perfect tan without the risk of sunburn. Safer than sunbathing.",
        actualEvidence:
          "Causes real tanning, but is NOT safe. Associated with atypical nevi and theoretical melanoma risk. Banned in Europe and Australia. Black market products are frequently contaminated. Not approved in any country.",
      },
    ],
    faqs: [
      {
        question: "Is Melanotan II legal?",
        answer:
          "No. Melanotan II is banned for consumer sale in most countries. The TGA (Australia) and MHRA (UK) have issued warnings against its use. ANVISA does not approve it. Products sold online operate illegally.",
      },
      {
        question: "What is the difference between Melanotan II and PT-141?",
        answer:
          "PT-141 (bremelanotide/Vyleesi) was developed from Melanotan II, but modified to act predominantly on the MC4R receptor (sexual function) with less effect on MC1R (melanin). PT-141 is FDA-approved; Melanotan II is not approved in any country.",
      },
    ],
  },

  metformina: {
    description:
      "IMPORTANT: Metformin is not a peptide; it is a biguanide derived from the plant Galega officinalis. It has been the first-line medication for type 2 diabetes for decades, with billions of prescriptions. It gained enormous attention in the longevity field after studies suggested that diabetics taking metformin live longer than non-diabetics. The TAME study is testing whether it extends healthy human lifespan.",
    mechanism:
      "Metformin activates AMPK (cellular energy sensor), inhibits hepatic gluconeogenesis, improves insulin sensitivity, and has direct effects on gut microbiota. Additional mechanisms include reducing systemic inflammation, modulating mTOR, and potential direct effects on aging pathways.",
    benefits: [
      {
        name: "Type 2 diabetes",
        description:
          "First-line treatment for decades. Reduces HbA1c by 1-2%, with an excellent safety profile and low cost.",
      },
      {
        name: "Diabetes prevention",
        description:
          "The DPP study demonstrated a 31% reduction in diabetes incidence in pre-diabetic individuals treated with metformin.",
      },
      {
        name: "Possible anti-cancer effect",
        description:
          "Observational studies suggest that diabetics on metformin have a lower incidence of various cancer types. Mechanism still under investigation.",
      },
      {
        name: "Longevity",
        description:
          "Epidemiological studies suggest that diabetics on metformin live longer than non-diabetics. The ongoing TAME study will test whether metformin delays aging in non-diabetic humans.",
      },
    ],
    risks: [
      {
        name: "Gastrointestinal discomfort",
        frequency: "20-30%",
        description:
          "Nausea, diarrhea, and abdominal discomfort are common, especially at the start. Generally decreases over time. The XR (extended-release) version is better tolerated.",
      },
      {
        name: "Vitamin B12 deficiency",
        frequency: "Long-term use",
        description:
          "Prolonged use may reduce vitamin B12 absorption. Periodic supplementation is recommended.",
      },
      {
        name: "Lactic acidosis (rare)",
        frequency: "Very rare",
        description:
          "Rare but serious complication, especially in patients with renal insufficiency. Contraindicated in severe renal failure.",
      },
    ],
    internetVsScience: [
      {
        claim: "Anti-aging pill for everyone",
        whatTheySay:
          "Everyone over 40 should take metformin to age more slowly.",
        actualEvidence:
          "Longevity evidence comes from observational studies in diabetics, not in healthy people. Studies in healthy athletes suggest metformin may actually reduce exercise benefits. The ongoing TAME study will answer this question.",
      },
      {
        claim: "Reduces exercise benefits",
        whatTheySay:
          "Metformin cancels strength gains and exercise adaptation.",
        actualEvidence:
          "True in studies. In healthy non-diabetic adults, metformin attenuated strength and cardiorespiratory fitness gains induced by training. For athletes, it may be counterproductive.",
      },
    ],
    faqs: [
      {
        question: "Can I take metformin even without being diabetic?",
        answer:
          "In Brazil, metformin requires a medical prescription. Off-label use for longevity or pre-diabetes is a decision between patient and physician. The ongoing TAME study will test whether metformin extends healthy lifespan in non-diabetics.",
      },
    ],
  },

  nac: {
    description:
      "IMPORTANT: NAC is not a peptide; it is an amino acid derivative (acetylated cysteine). It is a precursor of glutathione, the body's primary endogenous antioxidant. It has established medical use as a mucolytic (expectorant) and an antidote for acetaminophen/paracetamol poisoning. Popularized in biohacking for its antioxidant and anti-inflammatory potential.",
    mechanism:
      "NAC is converted to cysteine in the body, which is the rate-limiting amino acid for glutathione (GSH) synthesis. Glutathione is the primary intracellular antioxidant, neutralizing free radicals and protecting cells from oxidative stress. NAC also has mucolytic properties (breaks mucus bonds) and modulates inflammatory pathways.",
    benefits: [
      {
        name: "Acetaminophen antidote",
        description:
          "Standard treatment for acetaminophen/paracetamol overdose. Saves lives when administered early.",
      },
      {
        name: "Mucolytic",
        description:
          "Approved and widely used to thin pulmonary secretions in COPD, cystic fibrosis, and chronic bronchitis.",
      },
      {
        name: "Mental health",
        description:
          "Multiple clinical studies show benefits in obsessive-compulsive disorder, bipolar disorder, and trichotillomania.",
      },
      {
        name: "Male reproductive health",
        description:
          "Studies show improvement in sperm quality and male fertility.",
      },
    ],
    risks: [
      {
        name: "Nausea and gastrointestinal discomfort",
        frequency: "Common",
        description:
          "Most common side effect, especially at high doses. Taking with food helps.",
      },
      {
        name: "Unpleasant taste and odor",
        frequency: "Universal",
        description:
          "NAC has a characteristic sulfurous taste (rotten egg smell). Capsules and sachets work around this.",
      },
    ],
    internetVsScience: [
      {
        claim: "Cures long COVID",
        whatTheySay:
          "NAC cures post-COVID symptoms and chronic fatigue.",
        actualEvidence:
          "Some small studies suggest symptomatic benefits, but evidence is still limited and inconclusive. NAC does not 'cure' long COVID.",
      },
      {
        claim: "Detoxifies the body of heavy metals",
        whatTheySay: "NAC removes mercury and heavy metals from the body.",
        actualEvidence:
          "Has mild chelating properties, but is not the first-line treatment for heavy metal poisoning. Use for 'detox' is not scientifically validated.",
      },
    ],
    faqs: [
      {
        question: "Can I buy NAC without a prescription in Brazil?",
        answer:
          "Yes. NAC is sold over the counter in Brazil under names such as Fluimucil, NAC, and others. It is widely used as a mucolytic.",
      },
    ],
  },

  nmn: {
    description:
      "IMPORTANT: NMN is not a peptide; it is a nucleotide — a direct precursor of NAD+ (nicotinamide adenine dinucleotide), a coenzyme essential for cellular metabolism. Listed in this database because it is frequently associated with the longevity market. NAD+ levels decline with age, and NMN is researched to reverse this decline.",
    mechanism:
      "NMN is converted to NAD+ in the body via the NMNAT enzyme. NAD+ is an essential cofactor for enzymes involved in mitochondrial energy production, DNA repair, sirtuin activation (proteins associated with longevity), and metabolic regulation. The theory is that increasing NAD+ may counteract the metabolic decline of aging.",
    benefits: [
      {
        name: "Increased NAD+ levels",
        description:
          "Clinical studies confirm that oral NMN significantly increases blood NAD+ levels in humans.",
      },
      {
        name: "Insulin sensitivity",
        description:
          "A clinical study in postmenopausal pre-diabetic women showed improved muscle insulin sensitivity after 10 weeks.",
      },
      {
        name: "Physical performance",
        description:
          "Human studies show modest improvement in aerobic capacity and muscle function in middle-aged adults.",
      },
      {
        name: "Anti-aging",
        description:
          "Mouse studies show promising anti-aging effects, but translation to humans has not yet been demonstrated in long-term clinical trials.",
      },
    ],
    risks: [
      {
        name: "Regulatory status in the US",
        frequency: "N/A",
        description:
          "In 2022, the FDA reclassified NMN as an investigational drug (not a supplement), banning its sale as a dietary supplement in the US. Legal status varies in other countries.",
      },
      {
        name: "Variable purity",
        frequency: "Variable",
        description:
          "Independent analyses have shown that many commercial NMN products have significantly lower purity than stated on the label.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reverses aging",
        whatTheySay:
          "NMN is the fountain of youth — take it and your body rejuvenates years.",
        actualEvidence:
          "It provably increases NAD+, but 'reversing aging' is an exaggeration. Human studies show modest benefits in some markers. Long-term effects on human longevity are unknown.",
      },
      {
        claim: "It's a peptide",
        whatTheySay:
          "Frequently sold alongside peptides in the biohacking market.",
        actualEvidence:
          "NMN is a nucleotide, not a peptide. Peptides are chains of amino acids; nucleotides are compounds of a nitrogenous base, sugar, and phosphate.",
      },
    ],
    faqs: [
      {
        question: "Is NMN actually legal in Brazil?",
        answer:
          "NMN is not specifically regulated by ANVISA in Brazil. Unlike in the US, where it was reclassified as an investigational drug, it is sold as a dietary supplement in Brazil. Verify the origin and purity of the product.",
      },
    ],
  },

  "nr-nicotinamide-riboside": {
    description:
      "IMPORTANT: NR is not a peptide; it is a nucleoside — another NAD+ precursor, similar to NMN but with slightly different regulatory profile and bioavailability. Marketed as Niagen by ChromaDex, it is the NAD+ precursor with the most published clinical studies.",
    mechanism:
      "NR is converted to NMN and then to NAD+ via the salvage pathway. Unlike NMN, NR crosses cell membranes more easily and has more human pharmacokinetic data. It increases NAD+ in blood and tissues, activating sirtuins and improving mitochondrial function.",
    benefits: [
      {
        name: "Proven NAD+ increase",
        description:
          "Multiple clinical trials confirm that oral NR increases NAD+ in human blood and tissues.",
      },
      {
        name: "Cardiovascular function",
        description:
          "Clinical studies show reduced systolic blood pressure and improved arterial stiffness in middle-aged adults.",
      },
      {
        name: "Metabolic health",
        description:
          "Studies suggest benefits in insulin sensitivity and metabolic health markers.",
      },
    ],
    risks: [
      {
        name: "Mild adverse events",
        frequency: "Uncommon",
        description:
          "Nausea, fatigue, and headache reported in some clinical studies. Generally mild.",
      },
    ],
    internetVsScience: [
      {
        claim: "Better than NMN",
        whatTheySay:
          "NR is superior to NMN because it has more clinical studies.",
        actualEvidence:
          "NR has more published studies than NMN, but this does not mean it is necessarily 'better'. Head-to-head comparisons between NR and NMN are still limited. Both increase NAD+ in humans.",
      },
    ],
    faqs: [],
  },

  orforglipron: {
    description:
      "Orforglipron (Foundayo) is the first oral GLP-1 receptor agonist in small molecule format approved by the FDA. Unlike injectable peptides such as semaglutide and tirzepatide, orforglipron is a tablet taken once daily, without dietary or water intake restrictions. Developed by Eli Lilly, it represents a paradigm shift in the treatment of obesity and type 2 diabetes, eliminating the need for subcutaneous injections.",
    mechanism:
      "Orforglipron is a non-peptidic small molecule that activates the GLP-1 receptor similarly to injectable peptide agonists. By binding to the GLP-1 receptor in the pancreas, it stimulates glucose-dependent insulin secretion and suppresses glucagon release. In the central nervous system, it acts on hypothalamic satiety centers, reducing appetite and caloric intake. Being a small molecule rather than a peptide, it resists gastrointestinal degradation, allowing effective oral absorption without fasting or water restrictions — a significant advantage over Rybelsus (oral semaglutide), which requires a 30-minute fast.",
    benefits: [
      {
        name: "Significant weight loss",
        description:
          "In the ACHIEVE studies, participants without diabetes lost an average of 14-15% of body weight over 36-72 weeks. Results comparable to injectable GLP-1 agonists.",
      },
      {
        name: "Robust glycemic control",
        description:
          "In patients with type 2 diabetes, it reduced HbA1c by up to 2.1% over 26 weeks. Efficacy comparable to injectable semaglutide in glycemic control.",
      },
      {
        name: "Convenience of oral administration",
        description:
          "Once-daily oral tablet, with no need for fasting, water restrictions, or upright position after ingestion. Eliminates the injection barrier, which is a limiting factor for many patients.",
      },
      {
        name: "Potential cardiovascular benefit",
        description:
          "Cardiovascular outcome studies are underway. Weight loss and metabolic improvement suggest cardiovascular benefits, but definitive data are still being collected.",
      },
    ],
    risks: [
      {
        name: "Nausea",
        frequency: "30-40% of patients",
        description:
          "Most common side effect, especially during dose titration. Generally mild to moderate and transient, decreasing after the first weeks of treatment.",
      },
      {
        name: "Diarrhea",
        frequency: "15-20% of patients",
        description:
          "Second most frequent gastrointestinal effect. Generally self-limiting and manageable with dietary adjustments.",
      },
      {
        name: "Constipation",
        frequency: "10-15% of patients",
        description:
          "Common gastrointestinal side effect of GLP-1 agonists. Adequate hydration and dietary fiber help manage it.",
      },
      {
        name: "Biliary events",
        frequency: "Rare (<2%)",
        description:
          "Cholelithiasis (gallstones) reported in a small percentage of patients, associated with rapid weight loss. Monitoring is recommended for patients with a history of biliary disease.",
      },
    ],
    internetVsScience: [
      {
        claim: "Orforglipron is as effective as injectable Ozempic",
        whatTheySay:
          "A simple tablet achieves the same results as a weekly semaglutide injection.",
        actualEvidence:
          "In the ACHIEVE studies, weight loss with orforglipron (~14-15%) was slightly less than with injectable semaglutide 2.4 mg (~16%). For glycemic control, results are comparable. The oral convenience may compensate for the modest efficacy difference for many patients.",
      },
      {
        claim: "Has no side effects because it's a pill",
        whatTheySay:
          "Being oral and not injectable, orforglipron has fewer side effects than Ozempic and Mounjaro.",
        actualEvidence:
          "Gastrointestinal side effects (nausea, diarrhea, vomiting) are similar to injectable GLP-1 agonists. The route of administration is different, but the mechanism of action is the same, resulting in a similar adverse effect profile.",
      },
      {
        claim: "Will replace all injectables",
        whatTheySay:
          "With orforglipron's approval, no one will need injectable Ozempic or Mounjaro anymore.",
        actualEvidence:
          "Orforglipron is an excellent option for those who prefer oral administration, but next-generation injectables (tirzepatide, retatrutide) demonstrate superior weight loss (20-24%). Patients needing maximum efficacy may still prefer injectables. Additionally, daily oral adherence may be lower than weekly injection for some patient profiles.",
      },
      {
        claim: "It's safe to buy imported generics online",
        whatTheySay:
          "Generic versions of orforglipron are already available at international online pharmacies.",
        actualEvidence:
          "Orforglipron (Foundayo) was approved by the FDA in May 2026, but does NOT have ANVISA approval. Products sold online without a prescription and without local regulation have no guarantee of authenticity, purity, or dosage. Always consult a physician and purchase only through regulated channels.",
      },
    ],
    faqs: [
      {
        question: "Is orforglipron a peptide?",
        answer:
          "No. Unlike semaglutide, tirzepatide, and other GLP-1 agonists, orforglipron is a synthetic small molecule (non-peptidic). This allows it to be absorbed orally without being destroyed by the digestive system, eliminating the need for injections.",
      },
      {
        question: "Do I need to take it on an empty stomach like Rybelsus?",
        answer:
          "No. One of the major advantages of orforglipron is that it can be taken at any time, without fasting, water intake, or body position restrictions. Rybelsus (oral semaglutide) requires a 30-minute fast and a limited glass of water, which makes adherence difficult.",
      },
      {
        question: "When will Foundayo be available in Brazil?",
        answer:
          "Orforglipron (Foundayo) was approved by the FDA in the US in May 2026. Eli Lilly has not yet submitted its registration application to ANVISA. Based on precedent, the Brazilian regulatory process may take 12 to 24 months after submission. Optimistic estimate: 2028.",
      },
      {
        question: "Is it better than Ozempic and Mounjaro?",
        answer:
          "It depends on the criterion. In pure weight loss efficacy, the latest-generation injectables (tirzepatide ~21%, retatrutide ~24%) surpass orforglipron (~14-15%). However, for patients who refuse injections or prefer the convenience of a daily pill, orforglipron is a transformative option. Talk to your doctor about the most suitable profile.",
      },
      {
        question: "What are the most common side effects?",
        answer:
          "The main adverse effects are gastrointestinal: nausea (30-40%), diarrhea (15-20%), and constipation (10-15%). These effects are more intense at the start of treatment and during dose titration, tending to decrease over time. Gradual titration is essential to minimize discomfort.",
      },
    ],
  },

  "pt-141": {
    description:
      "Peptide melanocortin MC4R receptor agonist, FDA-approved for the treatment of Hypoactive Sexual Desire Disorder (HSDD) in premenopausal women. The only approved medication that acts on the central nervous system to increase sexual desire.",
    mechanism:
      "PT-141 (bremelanotide) activates the melanocortin MC4R receptor in the central nervous system, specifically in hypothalamic areas associated with sexual response. Unlike medications such as sildenafil (Viagra), which acts on blood flow, PT-141 acts directly on the brain circuits of sexual desire.",
    benefits: [
      {
        name: "HSDD treatment in women",
        description:
          "RECONNECT studies (phase 3) demonstrated a significant increase in sexual desire and reduction in distress in women with HSDD. FDA-approved in 2019.",
      },
      {
        name: "Erectile dysfunction in men",
        description:
          "Phase 2 studies showed efficacy in male erectile dysfunction, but development was discontinued in favor of the female market.",
      },
    ],
    risks: [
      {
        name: "Nausea",
        frequency: "40% of patients",
        description:
          "Most common side effect. Can be significant and is a reason for discontinuation in some patients.",
      },
      {
        name: "Blood pressure increase",
        frequency: "Transient",
        description:
          "Transiently raises blood pressure. Contraindicated in uncontrolled hypertension and cardiovascular disease.",
      },
      {
        name: "Hyperpigmentation",
        frequency: "Uncommon",
        description:
          "May cause skin darkening in exposed areas due to melanocortin receptor activation in the skin.",
      },
    ],
    internetVsScience: [
      {
        claim: "Female Viagra",
        whatTheySay:
          "PT-141 is Viagra for women — take it and it's solved.",
        actualEvidence:
          "FDA-approved for female HSDD, but the mechanism is completely different from Viagra. It acts on the brain (desire), not blood flow (erection). Efficacy is modest — NNT of ~8 (need to treat 8 women for 1 to have clinically significant benefit). Significant side effects.",
      },
    ],
    faqs: [
      {
        question: "Is PT-141 legal in Brazil?",
        answer:
          "Vyleesi (bremelanotide) is not registered with ANVISA. In the US, it has been FDA-approved since 2019 for HSDD in premenopausal women. It is administered via self-administered subcutaneous injection.",
      },
    ],
  },

  rapamicina: {
    description:
      "IMPORTANT: Rapamycin is not a peptide; it is a macrolide (natural compound produced by the bacterium Streptomyces hygroscopicus, discovered in soil from Easter Island — Rapa Nui). Originally developed as an immunosuppressant for transplants, it is now the most promising substance in longevity research — the only drug consistently proven to extend lifespan in mammals.",
    mechanism:
      "Rapamycin inhibits the mTOR protein (mechanistic Target Of Rapamycin), a central regulator of cell growth, metabolism, and autophagy. Partial mTOR inhibition activates autophagy (cellular recycling), mimics the effects of fasting and caloric restriction, and has anti-aging effects across multiple tissues.",
    benefits: [
      {
        name: "Increased lifespan in mammals",
        description:
          "The only compound consistently proven to increase lifespan in mice, rats, and other animal models. 9-26% lifespan increase in mice.",
      },
      {
        name: "Immunosuppression (approved use)",
        description:
          "Approved for organ transplant rejection prevention. The only officially approved use.",
      },
      {
        name: "Immune function in the elderly",
        description:
          "The PEARL study and others showed that low intermittent doses improve immune response to vaccines in the elderly without causing significant immunosuppression.",
      },
      {
        name: "Human longevity",
        description:
          "Despite animal evidence, the effect on human longevity has not yet been demonstrated in clinical trials. Studies are underway.",
      },
    ],
    risks: [
      {
        name: "Immunosuppression",
        frequency: "Dose-dependent",
        description:
          "At continuous doses (transplants), it suppresses the immune system, increasing the risk of infections and cancer. Low intermittent doses for longevity carry lower but not negligible risk.",
      },
      {
        name: "Metabolic disturbances",
        frequency: "Common",
        description:
          "May cause insulin resistance, dyslipidemia, and glucose intolerance, paradoxically increasing the risk of diabetes.",
      },
      {
        name: "Mouth sores and mucositis",
        frequency: "30%",
        description:
          "Oral ulcers are a common side effect, even at low doses.",
      },
      {
        name: "Off-label use",
        frequency: "N/A",
        description:
          "Use for longevity is off-label (outside the approved indication). Requires medical prescription and monitoring. Not sold over the counter.",
      },
    ],
    internetVsScience: [
      {
        claim: "Longevity pill",
        whatTheySay:
          "Rapamycin is the pill that extends life — approved by longevity doctors.",
        actualEvidence:
          "It is the most promising compound in animal longevity research, with solid evidence in mice. But human evidence is still limited and there are real risks. It is not a consequence-free 'youth pill'.",
      },
    ],
    faqs: [
      {
        question: "How to obtain rapamycin for longevity in Brazil?",
        answer:
          "Rapamycin (Rapamune, sirolimus) is a controlled medication, approved by ANVISA for immunosuppression in transplants. Use for longevity is off-label and requires a medical prescription. Only a few physicians specialized in longevity prescribe it.",
      },
    ],
  },

  resveratrol: {
    description:
      "IMPORTANT: Resveratrol is not a peptide; it is a natural polyphenol found in red grapes, red wine, peanuts, and some fruits. It gained fame in the 2000s when mouse studies suggested it activated sirtuins (proteins associated with longevity). It is one of the most studied compounds in aging research.",
    mechanism:
      "Resveratrol activates SIRT1, one of the sirtuins associated with longevity. It mimics some effects of caloric restriction. It has antioxidant, anti-inflammatory properties and improves mitochondrial function. It crosses the blood-brain barrier and reaches multiple tissues.",
    benefits: [
      {
        name: "Cardiovascular health",
        description:
          "Clinical studies show modest improvement in endothelial function, blood pressure, and inflammatory markers.",
      },
      {
        name: "Insulin sensitivity",
        description:
          "Meta-analyses suggest modest improvement in glycemic control in patients with type 2 diabetes.",
      },
      {
        name: "Anti-inflammatory",
        description:
          "Reduces systemic inflammatory markers in several clinical studies.",
      },
      {
        name: "Human longevity",
        description:
          "Mouse studies suggested increased longevity, but the effect was not replicated in other animal studies. No evidence of increased longevity in humans.",
      },
    ],
    risks: [
      {
        name: "Very low bioavailability",
        frequency: "Universal",
        description:
          "Resveratrol is rapidly metabolized and has very low oral bioavailability, raising questions about its efficacy at commercial doses.",
      },
      {
        name: "Drug interactions",
        frequency: "Variable",
        description:
          "May interact with anticoagulants and drugs metabolized by cytochrome P450.",
      },
    ],
    internetVsScience: [
      {
        claim: "Drinking red wine gives you resveratrol benefits",
        whatTheySay: "Red wine is healthy because of resveratrol.",
        actualEvidence:
          "The amount of resveratrol in red wine is so small that you would need to drink hundreds of bottles per day to reach studied doses. The possible cardiovascular benefits of red wine come from other compounds (and alcohol carries risks).",
      },
      {
        claim: "Sirtuin activator that reverses aging",
        whatTheySay:
          "Resveratrol activates sirtuins and reverses aging (popularized by David Sinclair).",
        actualEvidence:
          "It activates SIRT1 in vitro. In humans, benefits are modest and the effect on longevity has never been demonstrated. Mouse studies were inconsistent.",
      },
    ],
    faqs: [],
  },

  retatrutida: {
    description:
      "Triple agonist of GIP, GLP-1, and glucagon receptors developed by Eli Lilly. It is the first of its class to act on all three receptors simultaneously, resulting in weight loss superior to any other medication in clinical studies to date — up to 24% of body weight in 48 weeks.",
    mechanism:
      "Retatrutide activates three hormonal receptors simultaneously: GLP-1 (suppresses appetite and stimulates insulin), GIP (potentiates the GLP-1 effect and improves lipid metabolism), and glucagon (increases energy expenditure and promotes hepatic lipolysis). This triple action creates a synergistic effect: GLP-1 reduces caloric intake, glucagon accelerates fat burning, and GIP amplifies both effects. The result is significantly greater weight loss than single (semaglutide) or dual (tirzepatide) agonists.",
    benefits: [
      {
        name: "Record weight loss",
        description:
          "In the TRIUMPH-2 study, participants lost up to 24.2% of body weight over 48 weeks at the 12 mg dose — the greatest weight loss ever recorded in clinical obesity trials.",
      },
      {
        name: "Hepatic fat reduction (MASLD/NASH)",
        description:
          "Reduced hepatic fat by up to 86% in patients with hepatic steatosis. 93% of patients achieved complete steatosis resolution at the highest dose.",
      },
      {
        name: "Improvement of obstructive sleep apnea",
        description:
          "Ongoing phase 3 studies (TRIUMPH-3) are investigating efficacy in obesity-associated sleep apnea. Positive preliminary results from significant weight reduction.",
      },
      {
        name: "Glycemic control in type 2 diabetes",
        description:
          "Reduced HbA1c by up to 2.2% over 36 weeks in the TRIUMPH-1 study, with 78% of patients reaching HbA1c < 5.7% (non-diabetic range).",
      },
      {
        name: "Lipid profile improvement",
        description:
          "Significant reduction in triglycerides (-30 to -50%), LDL, and VLDL. Modest HDL increase. Cardiovascular benefit under investigation.",
      },
    ],
    risks: [
      {
        name: "Nausea",
        frequency: "43-50% of patients",
        description:
          "Most frequent side effect, mainly during titration. Generally transient and decreases after the first weeks at each dose.",
      },
      {
        name: "Diarrhea",
        frequency: "25-35% of patients",
        description:
          "Second most common gastrointestinal effect. Generally mild to moderate, resolves spontaneously.",
      },
      {
        name: "Vomiting",
        frequency: "15-20% of patients",
        description:
          "More common during titration phases. Reduced with slow titration and smaller meals.",
      },
      {
        name: "Increased heart rate",
        frequency: "~10% of patients",
        description:
          "Average increase of 2-4 bpm observed in studies. Effect of the glucagon component. Clinical significance is still being evaluated in cardiovascular outcome studies.",
      },
      {
        name: "Pancreatitis",
        frequency: "Rare (<1%)",
        description:
          "Class risk of GLP-1 agonists. Rare cases reported. Discontinue immediately if severe persistent abdominal pain occurs.",
      },
      {
        name: "Muscle mass loss",
        frequency: "Common with rapid weight loss",
        description:
          "Pronounced weight loss may include lean mass. Resistance exercise and adequate protein intake are recommended to mitigate this.",
      },
    ],
    internetVsScience: [
      {
        claim: "Retatrutide causes 25% weight loss",
        whatTheySay:
          "It's the most powerful weight loss drug ever created, nearly as effective as bariatric surgery.",
        actualEvidence:
          "The maximum mean loss was 24.2% over 48 weeks (12 mg dose). It is indeed the greatest weight loss in clinical trials, but individual results vary (5-35%). Bariatric surgery results in ~25-30% loss, so the comparison is plausible.",
      },
      {
        claim: "It's better than Ozempic and Mounjaro",
        whatTheySay:
          "Retatrutide is clearly superior to semaglutide and tirzepatide because it acts on 3 receptors.",
        actualEvidence:
          "In non-comparative (cross-study) analysis, weight loss with retatrutide 12 mg (~24%) exceeded historical results for semaglutide 2.4 mg (~16%) and tirzepatide 15 mg (~21%). However, there is no direct head-to-head comparison study. Cross-study comparisons have methodological limitations.",
      },
      {
        claim: "Already available for purchase",
        whatTheySay:
          "You can buy retatrutide at compounding pharmacies or research suppliers.",
        actualEvidence:
          "Retatrutide is still in phase 3 clinical trials. It has NOT been approved by the FDA, EMA, or ANVISA. Any sale is illegal and unregulated. Products sold as 'retatrutide research chemical' have no guarantee of purity or dosage.",
      },
      {
        claim: "Cures diabetes and hepatic steatosis",
        whatTheySay:
          "Retatrutide completely reverses type 2 diabetes and eliminates liver fat.",
        actualEvidence:
          "The data are impressive: 78% of T2D patients reached non-diabetic HbA1c, and 93% had hepatic steatosis resolution. But 'cure' is imprecise — the effects depend on continued use. There are no long-term data on durability after discontinuation.",
      },
    ],
    faqs: [
      {
        question: "When will retatrutide be approved?",
        answer:
          "Eli Lilly is conducting phase 3 studies (TRIUMPH program) with results expected between 2025-2026. FDA submission will likely occur in 2026, with possible approval in 2027. In Brazil, ANVISA approval generally takes an additional 12-18 months after the FDA.",
      },
      {
        question:
          "What is the difference between retatrutide, semaglutide, and tirzepatide?",
        answer:
          "Semaglutide (Ozempic) acts on 1 receptor (GLP-1). Tirzepatide (Mounjaro) acts on 2 receptors (GIP + GLP-1). Retatrutide acts on 3 receptors (GIP + GLP-1 + glucagon). Each additional receptor potentiates the effect: ~16% weight loss with semaglutide, ~21% with tirzepatide, ~24% with retatrutide.",
      },
      {
        question: "Can I buy retatrutide now?",
        answer:
          "No. Retatrutide is in the experimental phase and has NOT been approved by any regulatory agency (FDA, ANVISA, EMA). Any product sold as retatrutide is unregulated, has no purity guarantee, and is potentially dangerous. Wait for the completion of clinical trials and regulatory approval.",
      },
      {
        question: "Are the side effects worse than Ozempic's?",
        answer:
          "Gastrointestinal effects (nausea, diarrhea, vomiting) appear similar or slightly more frequent than semaglutide in phase 2 studies. The glucagon component may cause a mild increase in heart rate (~2-4 bpm). Gradual titration is essential for tolerability. Long-term safety data are still being collected in phase 3 studies.",
      },
      {
        question: "Does retatrutide work for type 2 diabetes?",
        answer:
          "Yes, the results are very promising. In the TRIUMPH-1 study, 78% of patients reached HbA1c < 5.7% (non-diabetic range) at the highest dose. Eli Lilly is developing retatrutide for both obesity and type 2 diabetes.",
      },
    ],
  },

  "ss-31": {
    description:
      "Mitochondria-targeted peptide that penetrates directly into the inner mitochondrial membrane, stabilizing cardiolipin and restoring cellular energy production. One of the most researched peptides for mitochondrial diseases and cellular aging.",
    mechanism:
      "SS-31 is a tetrapeptide (D-Arg-Dmt-Lys-Phe-NH2) that selectively concentrates in the inner mitochondrial membrane, binding to cardiolipin. This interaction stabilizes the electron transport chain, reduces reactive oxygen species (ROS) production, and restores cellular bioenergetics. Unlike conventional antioxidants, it acts directly at the source of oxidative stress.",
    benefits: [
      {
        name: "Mitochondrial protection",
        description:
          "Multiple clinical studies demonstrate improved mitochondrial function. Reduces oxidative stress directly at the source (mitochondria).",
      },
      {
        name: "Cardioprotection",
        description:
          "Phase 2 studies in heart failure (EMBRACE) showed improved ventricular function. Phase 3 (PROGRESS-HF) did not reach the primary endpoint but showed positive signals.",
      },
      {
        name: "Cellular anti-aging",
        description:
          "Animal model studies demonstrate reversal of age-associated mitochondrial dysfunction. Improves kidney, cardiac, and muscle function in aged animals.",
      },
    ],
    risks: [
      {
        name: "Injection site reaction",
        frequency: "Common",
        description:
          "Pain, redness, or swelling at the subcutaneous injection site. Generally mild.",
      },
      {
        name: "Uncertain clinical efficacy",
        frequency: "N/A",
        description:
          "The phase 3 PROGRESS-HF study for heart failure did not reach the primary endpoint, raising questions about translational clinical efficacy.",
      },
    ],
    internetVsScience: [
      {
        claim: "Reverses cellular aging",
        whatTheySay:
          "Promoted as the most potent anti-aging peptide, capable of reversing decades of mitochondrial damage.",
        actualEvidence:
          "Demonstrates real mitochondrial protection in studies, but 'reversing aging' is an exaggeration. Improves mitochondrial function in aged animal models, but clinical results in humans are mixed.",
      },
    ],
    faqs: [
      {
        question: "Is SS-31 approved for any condition?",
        answer:
          "No. Elamipretide (SS-31) is in clinical development by Stealth BioTherapeutics. It received orphan drug designation for Barth Syndrome and primary mitochondrial myopathy, but has no regulatory approval in any country.",
      },
    ],
  },

  selank: {
    description:
      "Anxiolytic and nootropic peptide developed in Russia by the Institute of Molecular Genetics of the Russian Academy of Sciences. Approved in Russia as a medication for anxiety and neurasthenia. Synthetic analog of tuftsin, a natural immunomodulatory peptide.",
    mechanism:
      "Selank is a heptapeptide analog of tuftsin with an added stabilizing sequence. It modulates GABAergic, serotonergic, and dopaminergic systems. It influences BDNF (brain-derived neurotrophic factor) expression and enkephalinase activity. It has an anxiolytic effect without sedation or dependence, unlike benzodiazepines.",
    benefits: [
      {
        name: "Anxiolytic effect",
        description:
          "Approved in Russia for anxiety treatment. Russian clinical studies demonstrated efficacy comparable to benzodiazepines without sedative effects.",
      },
      {
        name: "Cognitive improvement",
        description:
          "Animal studies and some clinical trials suggest improvements in memory and concentration. Increases BDNF expression.",
      },
      {
        name: "Immunomodulation",
        description:
          "As a tuftsin analog, it has documented immunomodulatory properties in preclinical studies.",
      },
    ],
    risks: [
      {
        name: "Predominantly Russian studies",
        frequency: "N/A",
        description:
          "Most clinical studies were conducted in Russia, with methodological limitations and publication in Russian journals. Internationally replicated studies are lacking.",
      },
    ],
    internetVsScience: [
      {
        claim: "Replaces anxiolytics without side effects",
        whatTheySay:
          "Promoted as a natural alternative to benzodiazepines without risk of dependence.",
        actualEvidence:
          "Approved in Russia as an anxiolytic without sedation, but studies were conducted under different standards than Western ones. The claim of zero side effects is exaggerated. Not approved by the FDA or EMA.",
      },
    ],
    faqs: [
      {
        question: "Is Selank approved in any country?",
        answer:
          "Yes, Selank is approved in Russia as a medication for generalized anxiety and neurasthenia, marketed as a nasal spray. It is not approved in the US, Europe, or Brazil.",
      },
    ],
  },

  semaglutida: {
    description:
      "GLP-1 receptor agonist used in the treatment of type 2 diabetes and obesity. It is the active ingredient in Ozempic (injectable for diabetes) and Wegovy (injectable for obesity). One of the most prescribed and studied medications of the past decade.",
    mechanism:
      "Semaglutide mimics the GLP-1 hormone (glucagon-like peptide-1), which is naturally released by the intestine after meals. It binds to GLP-1 receptors in the pancreas, stimulating insulin release and suppressing glucagon when glucose is elevated. In the brain, it acts on hypothalamic satiety centers, reducing appetite. It also delays gastric emptying, prolonging the feeling of fullness.",
    benefits: [
      {
        name: "Significant weight loss",
        description:
          "STEP studies demonstrated an average weight loss of 15-17% of body weight over 68 weeks with semaglutide 2.4 mg.",
      },
      {
        name: "Glycemic control in type 2 diabetes",
        description:
          "Average HbA1c reduction of 1.5-1.8% in the SUSTAIN studies, superior to other antidiabetic agents.",
      },
      {
        name: "Cardiovascular event reduction",
        description:
          "The SELECT study showed a 20% reduction in major adverse cardiovascular events (MACE) in patients with obesity without diabetes.",
      },
      {
        name: "Neuroprotection / Alzheimer's",
        description:
          "Preclinical studies and the phase 3 EVOKE trial are investigating neuroprotective potential in Alzheimer's. Preliminary results are promising but not conclusive.",
      },
    ],
    risks: [
      {
        name: "Nausea",
        frequency: "40-44% of patients",
        description:
          "Most common side effect. Generally transient, decreases over time. More intense in the first weeks and during dose increases.",
      },
      {
        name: "Diarrhea",
        frequency: "30% of patients",
        description:
          "Second most common gastrointestinal effect. Generally mild to moderate.",
      },
      {
        name: "Pancreatitis",
        frequency: "Rare (<1%)",
        description:
          "Small but serious risk of pancreatic inflammation. Requires immediate medical attention if severe abdominal pain occurs.",
      },
      {
        name: "Muscle mass loss",
        frequency: "Common",
        description:
          "Some of the weight lost may be lean mass (up to 40% in some studies). Resistance exercise is recommended during treatment.",
      },
    ],
    internetVsScience: [
      {
        claim: "Lose 20 kg effortlessly",
        whatTheySay:
          "Influencers promote it as a magic solution to lose weight without diet or exercise.",
        actualEvidence:
          "Studies show an average loss of 15-17% of body weight (e.g., ~15 kg for a 100 kg person), but combined with diet and exercise. Without lifestyle changes, the effect is smaller.",
      },
      {
        claim: "Causes thyroid cancer",
        whatTheySay:
          "Label warnings and social media posts generate fear about thyroid cancer.",
        actualEvidence:
          "Thyroid tumors were observed in rodents, but not in humans in clinical studies. The risk in humans has not been confirmed, but it is contraindicated in patients with a history of medullary thyroid carcinoma.",
      },
      {
        claim: "Rebound effect — you regain all the weight",
        whatTheySay:
          "When you stop the medication, you regain all the lost weight.",
        actualEvidence:
          "The STEP 4 study showed that two-thirds of the weight lost was regained after 1 year off the medication. Long-term maintenance likely requires continuous use or significant lifestyle changes.",
      },
    ],
    faqs: [
      {
        question: "Is semaglutide approved in Brazil?",
        answer:
          "Yes. ANVISA approved Ozempic (semaglutide 0.25 mg, 0.5 mg, and 1 mg) for type 2 diabetes and Wegovy (semaglutide 2.4 mg) for obesity. A medical prescription is required.",
      },
      {
        question: "What is the difference between Ozempic and Wegovy?",
        answer:
          "Both contain semaglutide, but at different doses. Ozempic (up to 1 mg) is indicated for type 2 diabetes. Wegovy (2.4 mg) is indicated specifically for weight management in patients with obesity or overweight with comorbidities.",
      },
      {
        question: "Is a medical prescription required?",
        answer:
          "Yes. Since April 2025, ANVISA requires retention of a medical prescription for dispensing semaglutide, liraglutide, tirzepatide, and other GLP-1 agonists.",
      },
    ],
  },

  semax: {
    description:
      "Synthetic nootropic peptide developed in Russia in the 1980s, derived from the ACTH(4-10) fragment with the addition of the Pro-Gly-Pro (PGP) tripeptide at the C-terminus to increase stability. Approved in Russia and some CIS countries for clinical use in neurological conditions, including ischemic stroke and cognitive dysfunction. Administered intranasally, Semax is one of the few nootropic peptides with substantial clinical data — although most comes from Russian studies not replicated in the West.",
    mechanism:
      "Semax acts through multiple neuroprotective mechanisms. It modulates the melanocortinergic system through MC3 and MC4 receptors, increasing BDNF (brain-derived neurotrophic factor) and NGF (nerve growth factor) expression in the hippocampus and cortex. The increase in BDNF promotes synaptic plasticity, neurogenesis, and neuronal survival. Additionally, Semax inhibits enzymes involved in enkephalin degradation (DPPIV and others), prolonging the action of endogenous opioid peptides that modulate mood and pain. The PGP fragment confers anti-inflammatory activity by inhibiting neutrophil migration. In the context of stroke, it reduces oxidative stress, inhibits the inflammatory cascade, and reduces the ischemic penumbra area.",
    benefits: [
      {
        name: "Cognitive improvement",
        description:
          "Russian clinical trials demonstrated improvements in attention, memory, and processing speed in patients with mild cognitive dysfunction and in healthy volunteers. Approved in Russia as a nootropic since the 1990s.",
      },
      {
        name: "Neuroprotection after stroke",
        description:
          "Clinical studies in Russia showed that Semax administered intranasally within the first hours after ischemic stroke reduced neurological deficit and improved functional recovery. It is approved as adjunct stroke treatment in Russia.",
      },
      {
        name: "BDNF increase",
        description:
          "Multiple studies have demonstrated that Semax significantly increases BDNF levels and its TrkB receptors in the brain, one of the central mechanisms behind its nootropic and neuroprotective effects.",
      },
      {
        name: "Anxiety reduction",
        description:
          "Preclinical studies and clinical reports suggest a mild anxiolytic effect, possibly mediated by melanocortinergic and opioidergic system modulation. Robust clinical data are still limited for this specific indication.",
      },
    ],
    risks: [
      {
        name: "Nasal irritation",
        frequency: "10-15% of patients",
        description:
          "Being administered intranasally, it may cause local irritation, dryness, or nasal discomfort. Generally mild and transient.",
      },
      {
        name: "Headache",
        frequency: "5-10% of patients",
        description:
          "Mild headaches have been reported by some users, especially at the start of use. They tend to resolve with continued treatment.",
      },
      {
        name: "Theoretical risk of hair loss",
        frequency: "Rare/Theoretical",
        description:
          "As an ACTH analog, there is a theoretical concern about effects on the hypothalamic-pituitary-adrenal axis that could affect the hair cycle. In practice, reports are rare and not confirmed in controlled studies.",
      },
    ],
    internetVsScience: [
      {
        claim: "Semax is the most potent nootropic available",
        whatTheySay:
          "Semax drastically increases IQ, memory, and focus, being superior to any other nootropic on the market.",
        actualEvidence:
          "Russian clinical trials show modest but statistically significant improvements in attention and memory. It is not a 'dramatic intelligence enhancer'. The effects are more evident in people with pre-existing cognitive deficits. In healthy individuals, improvements are subtle.",
      },
      {
        claim: "Semax has no side effects",
        whatTheySay:
          "It is completely safe and has no adverse effects, and can be used indefinitely.",
        actualEvidence:
          "The safety profile is indeed favorable in the available studies, with generally mild side effects (nasal irritation, headache). However, the absence of long-term studies (> 1 year) and the lack of replication of Russian data in independent Western studies mean that long-term safety is not fully established.",
      },
      {
        claim: "Semax cures ADHD and depression",
        whatTheySay:
          "It can replace ADHD medications and antidepressants because it is more natural and has no side effects.",
        actualEvidence:
          "No controlled clinical trials demonstrate Semax efficacy for ADHD or depression as a primary treatment. Some mechanisms (increased BDNF, dopaminergic modulation) are relevant to these conditions, but this does not constitute clinical evidence. It should not replace established treatments.",
      },
      {
        claim:
          "It's approved as a medication, so it's safe for anyone",
        whatTheySay:
          "Since it's approved in Russia, it has been thoroughly tested and is safe for anyone to use.",
        actualEvidence:
          "Regulatory approval in Russia followed different standards than those required by the FDA, EMA, or ANVISA. Many Russian Semax studies have not been internationally replicated and are not available in English with detailed methodology. Approval in one country does not guarantee universal safety — that is why it is not approved in the West.",
      },
    ],
    faqs: [
      {
        question: "How is Semax administered?",
        answer:
          "Semax is administered intranasally (nasal drops or spray). The most common formulation is the 1% (0.1%) solution. In the approved Russian protocol, the typical dose is 200-600 mcg per day, divided into 2-3 nasal applications. The intranasal route allows the peptide to reach the brain directly through the olfactory mucosa, avoiding gastrointestinal degradation.",
      },
      {
        question: "Is Semax approved by ANVISA or the FDA?",
        answer:
          "No. Semax is approved only in Russia and some Commonwealth of Independent States (CIS) countries. It does not have FDA (US), EMA (Europe), or ANVISA (Brazil) approval. The clinical studies supporting its Russian approval have not been replicated under Western regulatory standards.",
      },
      {
        question: "How long does it take to feel the effects of Semax?",
        answer:
          "According to clinical reports and user accounts, acute effects (improved focus and attention) can be perceived within 15-30 minutes after intranasal administration. Long-term effects on neuroprotection and synaptic plasticity require consistent use for weeks. Important: these reports come predominantly from Russian literature and biohacking communities, not from controlled Western studies.",
      },
      {
        question: "Can I combine Semax with other nootropics?",
        answer:
          "There are no controlled studies on Semax interactions with other nootropics or psychoactive medications. Theoretically, the increase in BDNF and dopaminergic modulation may interact with antidepressants (especially SSRIs), stimulants, and other nootropics. Consult a physician before combining neuroactive substances.",
      },
      {
        question:
          "Why isn't Semax approved in the West if it works in Russia?",
        answer:
          "Regulatory standards differ significantly. The FDA and EMA require multicenter, randomized, double-blind phase 3 clinical trials with large samples. Many Russian Semax studies have small samples, are not published in high-impact international journals, and do not follow all ICH-GCP criteria. To obtain Western approval, Semax would need new expensive clinical trials, and no Western pharmaceutical company has funded these studies to date.",
      },
    ],
  },

  sermorelin: {
    description:
      "GH-releasing hormone (GHRH) analog corresponding to the first 29 amino acids of natural GHRH. Was FDA-approved from 1997 to 2008 for GH deficiency in children. Now available through compounding pharmacies. One of the most studied GH secretagogues.",
    mechanism:
      "Sermorelin binds to GHRH receptors in the anterior pituitary, stimulating the synthesis and pulsatile release of growth hormone. It preserves the natural negative feedback of the GH-IGF-1 axis, unlike exogenous GH which suppresses endogenous production.",
    benefits: [
      {
        name: "Physiological GH increase",
        description:
          "FDA-approved (1997-2008) for GH deficiency. Stimulates natural GH release while maintaining the physiological pulsatile pattern.",
      },
      {
        name: "Improved body composition",
        description:
          "Clinical studies demonstrate increased lean mass and reduced body fat with prolonged use.",
      },
      {
        name: "Improved sleep quality",
        description:
          "Clinical reports of improved deep sleep (slow-wave sleep), the phase during which GH is naturally released the most.",
      },
    ],
    risks: [
      {
        name: "Injection site pain",
        frequency: "Common",
        description: "Most reported side effect. Generally mild.",
      },
      {
        name: "Facial flushing",
        frequency: "Uncommon",
        description: "Transient flushing after injection.",
      },
    ],
    internetVsScience: [
      {
        claim: "Better and safer than HGH",
        whatTheySay:
          "Sermorelin gives all the benefits of HGH without the risks.",
        actualEvidence:
          "Stimulates natural GH (safer than exogenous GH which suppresses endogenous production), but the GH levels achieved are lower. It was FDA-approved, which gives it more credibility than many peptides. Commercially discontinued for market reasons, not safety concerns.",
      },
    ],
    faqs: [
      {
        question: "Why was Geref discontinued?",
        answer:
          "The manufacturer (Serono/EMD) voluntarily discontinued Geref in 2008 for commercial reasons (small market), not due to safety or efficacy problems. The peptide remains available through compounding pharmacies in the US.",
      },
    ],
  },

  "tb-500": {
    description:
      "Synthetic version of thymosin beta-4, a protein naturally present in nearly all cells in the human body. Researched for its effects on tissue healing, inflammation reduction, and cell regeneration. Popular among athletes, but with limited clinical evidence.",
    mechanism:
      "Thymosin beta-4 is a 43-amino acid protein that regulates actin, an essential component of the cell cytoskeleton. It promotes cell migration, new blood vessel formation, and reduces inflammation. It also regulates the expression of genes involved in tissue repair.",
    benefits: [
      {
        name: "Wound healing",
        description:
          "Phase 2 clinical studies in skin ulcers showed promising results. RegeneRx Biopharmaceuticals conducted trials for dermal ulcers.",
      },
      {
        name: "Cardiac regeneration",
        description:
          "Preclinical studies demonstrated that TB-4 can activate cardiac progenitor cells and promote regeneration after myocardial infarction in animal models.",
      },
    ],
    risks: [
      {
        name: "Limited safety data",
        frequency: "Unknown",
        description:
          "Few completed human clinical studies. Long-term safety profile unknown.",
      },
    ],
    internetVsScience: [
      {
        claim: "Recovers sports injuries in days",
        whatTheySay:
          "Athletes report dramatic recovery from muscle and tendon injuries.",
        actualEvidence:
          "Animal evidence supports a healing effect, but there are no clinical studies confirming efficacy in sports injuries in humans. Anecdotal reports are not scientific evidence.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between TB-500 and Thymosin Beta-4?",
        answer:
          "TB-500 is the commercial name for a synthetic version of a fragment of thymosin beta-4. The molecule is not identical to the complete thymosin beta-4, although it shares the active region responsible for the biological effects.",
      },
    ],
  },

  tesamorelin: {
    description:
      "GHRH analog approved by the FDA for visceral fat reduction in HIV patients with lipodystrophy. Currently the only GH secretagogue with active FDA approval. Also researched for hepatic steatosis (fatty liver) and cognitive decline.",
    mechanism:
      "Tesamorelin is a modified GHRH analog with the addition of a trans-3-hexenoic acid at the N-terminal position, increasing its stability and potency. It stimulates physiological GH release from the pituitary, selectively reducing visceral fat without proportionally affecting subcutaneous fat.",
    benefits: [
      {
        name: "Visceral fat reduction",
        description:
          "FDA-approved (2010). Studies demonstrated a 15-18% reduction in visceral fat (trunk fat) in HIV patients with lipodystrophy.",
      },
      {
        name: "Hepatic fat reduction",
        description:
          "Studies show significant reduction in liver fat (NAFLD/NASH) in both HIV and non-HIV patients.",
      },
      {
        name: "Cognitive benefits",
        description:
          "Studies in adults with mild cognitive impairment show improvement in memory and executive function.",
      },
    ],
    risks: [
      {
        name: "Arthralgias",
        frequency: "13% of patients",
        description:
          "Joint pain is the most common side effect. Generally mild to moderate.",
      },
      {
        name: "Peripheral edema",
        frequency: "6% of patients",
        description:
          "Mild swelling in the extremities, related to increased GH/IGF-1.",
      },
    ],
    internetVsScience: [
      {
        claim: "Melts abdominal fat",
        whatTheySay:
          "Tesamorelin is the best peptide for eliminating belly fat — FDA-approved for that.",
        actualEvidence:
          "FDA-approved for visceral fat reduction in HIV lipodystrophy (15-18% reduction). Effective, but approved for a specific population. Off-label use for general abdominal fat is common but is not an approved indication.",
      },
    ],
    faqs: [
      {
        question: "Can tesamorelin be used for weight loss?",
        answer:
          "FDA approval is specifically for HIV-associated lipodystrophy, not for general weight loss. Off-label use exists but is not an approved indication. For obesity, semaglutide and tirzepatide have much more evidence.",
      },
    ],
  },

  "thymosin-alpha-1": {
    description:
      "Immunomodulatory peptide naturally produced by the thymus. Approved as a medication in more than 30 countries (not in the US) for hepatitis B and C, immunodeficiencies, and as a vaccine adjuvant. One of the peptides with the most clinical evidence outside of GLP-1.",
    mechanism:
      "Thymosin alpha-1 modulates the immune system by stimulating T cell maturation, natural killer (NK) cell activity, and cytokine production. It also stimulates dendritic cells and macrophages, improving both innate and adaptive immunity.",
    benefits: [
      {
        name: "Chronic hepatitis B treatment",
        description:
          "Approved in over 30 countries for hepatitis B. Meta-analyses confirm efficacy in viral suppression and seroconversion.",
      },
      {
        name: "Immunomodulation",
        description:
          "Documented stimulation of T cells, NK cells, and adaptive immune response across multiple clinical studies.",
      },
      {
        name: "Vaccine adjuvant",
        description:
          "Clinical studies show enhanced immune response when administered alongside vaccines, especially in immunocompromised patients.",
      },
    ],
    risks: [
      {
        name: "Injection site pain",
        frequency: "Common",
        description:
          "Most reported side effect. Generally mild and transient.",
      },
    ],
    internetVsScience: [
      {
        claim: "Prevents all immune diseases",
        whatTheySay:
          "Promoted as a 'super boost' for the immune system that prevents everything.",
        actualEvidence:
          "It is a proven immunomodulator, but does not prevent all diseases. Primary efficacy is in hepatitis and as an adjuvant. It is not a universal 'cure' for immune problems.",
      },
    ],
    faqs: [
      {
        question: "Why isn't it approved in the US/Brazil?",
        answer:
          "Zadaxin (thymosin alpha-1) is approved in over 30 countries, but SciClone Pharmaceuticals did not complete the FDA approval process. In Brazil, there is no ANVISA registration. In Feb/2026, the FDA reclassified it to Category 1, allowing compounding by pharmacies.",
      },
    ],
  },

  tirzepatida: {
    description:
      "Dual agonist of GIP and GLP-1 receptors, representing a new class of medications for type 2 diabetes and obesity. It has demonstrated superior efficacy to semaglutide in some weight loss studies.",
    mechanism:
      "Tirzepatide is unique in activating two incretin receptors simultaneously: GIP (glucose-dependent insulinotropic polypeptide) and GLP-1. This dual action potentiates insulin secretion, suppresses glucagon, delays gastric emptying, and reduces appetite through action on brain satiety centers. GIP receptor activation adds metabolic benefits beyond what GLP-1 alone provides.",
    benefits: [
      {
        name: "Superior weight loss",
        description:
          "The SURMOUNT-1 study demonstrated an average weight loss of 22.5% of body weight at the highest dose (15 mg) over 72 weeks — the greatest ever recorded with a medication.",
      },
      {
        name: "Potent glycemic control",
        description:
          "In the SURPASS studies, it reduced HbA1c by up to 2.4%, superior to semaglutide in a direct comparison (SURPASS-2).",
      },
      {
        name: "Improved sleep apnea",
        description:
          "The SURMOUNT-OSA study demonstrated a significant reduction in apnea events per hour in patients with obesity and obstructive sleep apnea.",
      },
    ],
    risks: [
      {
        name: "Nausea",
        frequency: "25-33% of patients",
        description:
          "Most common gastrointestinal effect. Generally transient and dose-dependent.",
      },
      {
        name: "Diarrhea",
        frequency: "17-23% of patients",
        description: "Second most common gastrointestinal effect.",
      },
      {
        name: "Pancreatitis",
        frequency: "Rare",
        description: "Risk similar to semaglutide. Requires monitoring.",
      },
    ],
    internetVsScience: [
      {
        claim: "It's better than Ozempic for weight loss",
        whatTheySay:
          "Tirzepatide is 'turbocharged Ozempic', it loses more weight.",
        actualEvidence:
          "Indirect comparisons suggest greater weight loss with tirzepatide (22.5% vs 15-17%), but there is no published head-to-head study specifically for obesity. In diabetes, SURPASS-2 showed superiority.",
      },
    ],
    faqs: [
      {
        question: "Is tirzepatide available in Brazil?",
        answer:
          "Mounjaro (tirzepatide) is in the ANVISA registration process. It is not yet officially available for sale in Brazil, but may be imported with a medical prescription in specific cases.",
      },
    ],
  },

  "urolitina-a": {
    description:
      "IMPORTANT: Urolithin A is not a peptide; it is a metabolite produced by gut microbiota from ellagitannins found in pomegranate, raspberry, strawberry, and walnuts. Only 30-40% of people have the gut bacteria that naturally produce urolithin A — the rest need to supplement. The only compound clinically proven to induce mitophagy (mitochondrial recycling) in humans.",
    mechanism:
      "Urolithin A induces mitophagy — the process of selectively recycling damaged mitochondria. Dysfunctional mitochondria accumulate with age, contributing to sarcopenia and metabolic decline. By removing these 'old' mitochondria, urolithin A improves the quality of the mitochondrial pool and cellular function.",
    benefits: [
      {
        name: "Mitophagy induction in humans",
        description:
          "The only compound clinically demonstrated to induce mitophagy in humans. A study confirmed increased mitophagy markers in blood after 28 days.",
      },
      {
        name: "Muscle function",
        description:
          "Clinical studies demonstrated improvement in muscle strength and endurance in middle-aged and elderly adults.",
      },
      {
        name: "Mitochondrial health",
        description:
          "Improves markers of mitochondrial function and biogenesis in clinical studies.",
      },
    ],
    risks: [
      {
        name: "Favorable safety profile",
        frequency: "Rare",
        description:
          "Clinical studies show an excellent safety profile. Adverse events are rare and mild (gastrointestinal).",
      },
      {
        name: "High cost",
        frequency: "N/A",
        description:
          "Mitopure (the only clinically studied form) has significant cost, equivalent to $60-90/month.",
      },
    ],
    internetVsScience: [
      {
        claim: "Muscle longevity pill",
        whatTheySay:
          "Urolithin A gives you young muscles without working out.",
        actualEvidence:
          "Improves mitochondrial function and muscle markers, but does not replace exercise. Benefits are modest (approximately 12% improvement in muscle endurance). Not magic.",
      },
    ],
    faqs: [
      {
        question: "Can I obtain urolithin A naturally?",
        answer:
          "Only 30-40% of people have the gut microbiota capable of converting ellagitannins (from pomegranate, walnuts, raspberries) into urolithin A. For the other 60-70%, direct supplementation is the only way to obtain it. A urine test can determine whether you are a natural producer.",
      },
    ],
  },
};

export default translations;

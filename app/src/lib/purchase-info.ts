/**
 * Purchase/CTA configuration per compound.
 * type determines which CTA to show on the compound page.
 */

export type PurchaseType = "supplement" | "compounding" | "prescription" | "experimental";

export type PurchaseInfo = {
  type: PurchaseType;
  links?: { label: string; url: string; tag?: string }[];
};

export const purchaseInfo: Record<string, PurchaseInfo> = {
  // =============================================
  // SUPPLEMENTS — affiliate links
  // =============================================
  nmn: {
    type: "supplement",
    links: [
      { label: "iHerb", url: "https://br.iherb.com/c/nmn-nicotinamide-mononucleotide", tag: "iherb" },
      { label: "Vitaminas Brasil", url: "https://www.vitaminasbrasil.com/complexo-nmn-com-trans-resveratrol-quercetina-apigenina-e-luteolina-60-capsulas-super-nutrition", tag: "vitbr" },
      { label: "Amazon", url: "https://www.amazon.com.br/nmn/s?k=nmn", tag: "amz" },
    ],
  },
  "nr-nicotinamide-riboside": {
    type: "supplement",
    links: [
      { label: "iHerb", url: "https://br.iherb.com/c/nicotinamide-riboside", tag: "iherb" },
      { label: "Amazon", url: "https://www.amazon.com.br/s?k=nicotinamide+riboside", tag: "amz" },
    ],
  },
  resveratrol: {
    type: "supplement",
    links: [
      { label: "iHerb", url: "https://br.iherb.com/c/resveratrol", tag: "iherb" },
      { label: "Amazon", url: "https://www.amazon.com.br/s?k=resveratrol", tag: "amz" },
    ],
  },
  fisetina: {
    type: "supplement",
    links: [
      { label: "iHerb", url: "https://br.iherb.com/c/fisetin", tag: "iherb" },
      { label: "Amazon", url: "https://www.amazon.com.br/s?k=fisetin", tag: "amz" },
    ],
  },
  espermidina: {
    type: "supplement",
    links: [
      { label: "iHerb", url: "https://br.iherb.com/c/spermidine", tag: "iherb" },
      { label: "Amazon", url: "https://www.amazon.com.br/s?k=spermidine", tag: "amz" },
    ],
  },
  nac: {
    type: "supplement",
    links: [
      { label: "iHerb", url: "https://br.iherb.com/c/nac-n-acetyl-cysteine", tag: "iherb" },
      { label: "Amazon", url: "https://www.amazon.com.br/s?k=nac+n-acetilcisteina", tag: "amz" },
    ],
  },
  glutationa: {
    type: "supplement",
    links: [
      { label: "iHerb", url: "https://br.iherb.com/c/l-glutathione", tag: "iherb" },
      { label: "Amazon", url: "https://www.amazon.com.br/s?k=glutationa+lipossomal", tag: "amz" },
    ],
  },
  "urolitina-a": {
    type: "supplement",
    links: [
      { label: "Timeline (Mitopure)", url: "https://www.timelinenutrition.com", tag: "timeline" },
      { label: "Amazon", url: "https://www.amazon.com.br/s?k=urolithin+a", tag: "amz" },
    ],
  },

  // =============================================
  // COMPOUNDING PHARMACY — lead → pharmacy partner
  // =============================================
  "ghk-cu": { type: "compounding" },
  ipamorelin: { type: "compounding" },
  "cjc-1295": { type: "compounding" },
  sermorelin: { type: "compounding" },
  "aod-9604": { type: "compounding" },
  "pt-141": { type: "compounding" },
  "bpc-157": { type: "compounding" },
  "tb-500": { type: "compounding" },
  "thymosin-alpha-1": { type: "compounding" },
  epithalon: { type: "compounding" },
  dsip: { type: "compounding" },
  kpv: { type: "compounding" },
  "ll-37": { type: "compounding" },
  selank: { type: "compounding" },
  "melanotan-ii": { type: "compounding" },

  // =============================================
  // PRESCRIPTION — lead → doctor/telemedicine
  // =============================================
  semaglutida: { type: "prescription" },
  tirzepatida: { type: "prescription" },
  metformina: { type: "prescription" },
  rapamicina: { type: "prescription" },
  tesamorelin: { type: "prescription" },
  cerebrolysin: { type: "prescription" },

  // =============================================
  // EXPERIMENTAL — newsletter only
  // =============================================
  retatrutida: { type: "experimental" },
  orforglipron: { type: "experimental" },
  cagrisema: { type: "experimental" },
  "foxo4-dri": { type: "experimental" },
  dihexa: { type: "experimental" },
  "ss-31": { type: "experimental" },
  "mots-c": { type: "experimental" },
  semax: { type: "experimental" },
};

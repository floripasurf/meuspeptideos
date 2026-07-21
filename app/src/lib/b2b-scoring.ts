export type ProspectScoringInput = {
  name?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  website?: string | null;
  googleRating?: number | null;
  googleReviews?: number | null;
  city?: string | null;
  state?: string | null;
  compounds?: string[] | null;
  notes?: string | null;
};

export type ProspectScore = {
  fitScore: number;
  riskScore: number;
  riskFlags: string[];
};

const riskyTerms = [
  "sem receita",
  "sem prescricao",
  "sem prescrição",
  "garantido",
  "antes e depois",
  "milagre",
  "uso estetico garantido",
  "uso estético garantido",
];

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function normalizedText(input: ProspectScoringInput) {
  return [
    input.name,
    input.email,
    input.website,
    input.notes,
    ...(input.compounds ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function scorePharmacyProspect(input: ProspectScoringInput): ProspectScore {
  let fitScore = 20;
  let riskScore = 0;
  const riskFlags: string[] = [];

  if (input.email) fitScore += 15;
  if (input.whatsapp) fitScore += 12;
  if (input.website) fitScore += 10;
  if (input.city && input.state) fitScore += 10;

  const reviews = Number(input.googleReviews ?? 0);
  if (reviews >= 250) fitScore += 16;
  else if (reviews >= 75) fitScore += 10;
  else if (reviews >= 20) fitScore += 5;

  const rating = Number(input.googleRating ?? 0);
  if (rating >= 4.6) fitScore += 12;
  else if (rating >= 4.2) fitScore += 8;
  else if (rating > 0 && rating < 3.8) {
    riskScore += 15;
    riskFlags.push("low_rating");
  }

  const compounds = input.compounds ?? [];
  if (compounds.length >= 4) fitScore += 10;
  else if (compounds.length >= 1) fitScore += 5;

  const text = normalizedText(input);
  for (const term of riskyTerms) {
    if (text.includes(term)) {
      riskScore += 18;
      riskFlags.push(`risky_claim:${term}`);
    }
  }

  if (!input.email && !input.whatsapp) {
    riskScore += 20;
    riskFlags.push("missing_direct_contact");
  }

  if (input.website && !/^https?:\/\//i.test(input.website)) {
    riskScore += 8;
    riskFlags.push("website_without_protocol");
  }

  return {
    fitScore: clampScore(fitScore - Math.min(riskScore, 35)),
    riskScore: clampScore(riskScore),
    riskFlags: Array.from(new Set(riskFlags)),
  };
}

export function prospectStatusFromScore(score: ProspectScore) {
  if (score.riskScore >= 60) return "rejected" as const;
  if (score.fitScore >= 65) return "qualified" as const;
  return "discovered" as const;
}

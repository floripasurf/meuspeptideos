export type SocialTarget =
  | "patient_quote"
  | "doctor_signup"
  | "pharmacy_partner"
  | "clinic_directory"
  | "education"
  | "radar";

export type SocialAttributionInput = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  landingPath?: string | null;
  target?: string | null;
};

const allowedTargets = new Set<SocialTarget>([
  "patient_quote",
  "doctor_signup",
  "pharmacy_partner",
  "clinic_directory",
  "education",
  "radar",
]);

function clean(value: string | null | undefined, fallback = "") {
  const text = typeof value === "string" ? value.trim() : "";
  return (text || fallback).slice(0, 240);
}

export function normalizeSocialAttribution(input: SocialAttributionInput) {
  const target = allowedTargets.has(input.target as SocialTarget)
    ? (input.target as SocialTarget)
    : "education";

  return {
    campaignSlug: clean(input.utm_campaign, "instagram-topo-funil"),
    source: clean(input.utm_source, "instagram"),
    medium: clean(input.utm_medium, "social"),
    content: clean(input.utm_content) || null,
    term: clean(input.utm_term) || null,
    landingPath: clean(input.landingPath, "/pt/instagram"),
    target,
  };
}

export function targetPath(lang: string, target: SocialTarget) {
  const prefix = `/${lang}`;
  const paths: Record<SocialTarget, string> = {
    patient_quote: `${prefix}/radar`,
    doctor_signup: `${prefix}/radar`,
    pharmacy_partner: `${prefix}/radar`,
    clinic_directory: `${prefix}/radar`,
    education: `${prefix}/regulamentacao`,
    radar: `${prefix}/radar`,
  };
  return paths[target];
}

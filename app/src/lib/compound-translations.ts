/**
 * Translated compound content keyed by slug.
 * Falls back to Portuguese DB content when translation is missing.
 */

export type CompoundTranslation = {
  description: string;
  mechanism: string;
  benefits: { name: string; description: string }[];
  risks: { name: string; frequency: string; description: string }[];
  internetVsScience: {
    claim: string;
    whatTheySay: string;
    actualEvidence: string;
  }[];
  faqs: { question: string; answer: string }[];
};

export type CompoundTranslations = Record<string, CompoundTranslation>;

// Lazy-load per locale to keep bundle small
const translationLoaders = {
  en: () => import("@/translations/compounds-en").then((m) => m.default),
  es: () => import("@/translations/compounds-es").then((m) => m.default),
};

export async function getCompoundTranslation(
  slug: string,
  locale: string
): Promise<CompoundTranslation | null> {
  if (locale === "pt") return null; // PT is the DB source language
  const loader = translationLoaders[locale as keyof typeof translationLoaders];
  if (!loader) return null;
  const translations = await loader();
  return translations[slug] ?? null;
}

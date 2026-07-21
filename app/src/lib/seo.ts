import type { Metadata } from "next";

export const siteUrl = "https://meuspeptideos.com.br";

export const hreflangLocales = {
  "pt-BR": "pt",
  "en-US": "en",
  "es-419": "es",
} as const;

/**
 * Canonical + hreflang for a lang-prefixed page. `path` is the path AFTER the
 * locale prefix, starting with "/" (or "" for the locale home).
 */
export function langAlternates(
  lang: string,
  path: string = ""
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const [tag, locale] of Object.entries(hreflangLocales)) {
    languages[tag] = `${siteUrl}/${locale}${path}`;
  }
  languages["x-default"] = `${siteUrl}/pt${path}`;
  return {
    canonical: `${siteUrl}/${lang}${path}`,
    languages,
  };
}

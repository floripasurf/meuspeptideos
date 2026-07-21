import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { useCases } from "@/lib/use-cases";
import { comparisons } from "@/lib/comparisons";
import { cities } from "@/lib/cities";
import { PeptideCategory } from "@/generated/prisma/enums";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

const allCategories: PeptideCategory[] = [
  "glp1",
  "growth_hormone",
  "healing",
  "neuroprotective",
  "cosmetic",
  "immune",
  "performance",
  "longevity",
];

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

type PathDef = {
  path: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
};

// One sitemap entry per locale, each carrying the full hreflang group.
function localized(def: PathDef): MetadataRoute.Sitemap {
  const languages = {
    "pt-BR": `${siteUrl}/pt${def.path}`,
    "en-US": `${siteUrl}/en${def.path}`,
    "es-419": `${siteUrl}/es${def.path}`,
  };
  return locales.map((lang) => ({
    url: `${siteUrl}/${lang}${def.path}`,
    lastModified: def.lastModified,
    changeFrequency: def.changeFrequency,
    priority: def.priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [peptides, posts] = await Promise.all([
    prisma.peptide.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const now = new Date();

  const defs: PathDef[] = [
    { path: "", lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { path: "/blog", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { path: "/sobre", lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { path: "/metodologia", lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { path: "/regulamentacao", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { path: "/uso", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...peptides.map((p) => ({
      path: `/peptideo/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...allCategories.map((cat) => ({
      path: `/categoria/${cat}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...useCases.map((u) => ({
      path: `/uso/${u.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...comparisons.map((c) => ({
      path: `/comparar/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Local SEO: peptide × city combinations
    ...peptides.flatMap((p) =>
      cities.map((city) => ({
        path: `/${p.slug}/${city.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    ),
  ];

  return defs.flatMap(localized);
}

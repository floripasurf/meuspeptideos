import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { useCases } from "@/lib/use-cases";
import { comparisons } from "@/lib/comparisons";
import { cities } from "@/lib/cities";
import { PeptideCategory } from "@/generated/prisma/enums";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://meuspeptideos.com.br";

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

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/metodologia`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const peptideRoutes: MetadataRoute.Sitemap = peptides.map((p) => ({
    url: `${baseUrl}/peptideo/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = allCategories.map((cat) => ({
    url: `${baseUrl}/categoria/${cat}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const useCaseRoutes: MetadataRoute.Sitemap = useCases.map((u) => ({
    url: `${baseUrl}/uso/${u.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${baseUrl}/comparar/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Local SEO: peptide × city combinations
  const localRoutes: MetadataRoute.Sitemap = peptides.flatMap((p) =>
    cities.map((city) => ({
      url: `${baseUrl}/${p.slug}/${city.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    ...staticRoutes,
    ...peptideRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...useCaseRoutes,
    ...comparisonRoutes,
    ...localRoutes,
  ];
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ResearchPhaseBadge } from "@/components/research-phase-badge";
import { CategoryBadge } from "@/components/category-badge";
import { PeptideCategory } from "@/generated/prisma/enums";

export const dynamic = "force-dynamic";

const categoryMeta: Record<
  PeptideCategory,
  { label: string; description: string; longDescription: string }
> = {
  glp1: {
    label: "GLP-1",
    description:
      "Agonistas do receptor GLP-1: semaglutida, tirzepatida e outros peptídeos para diabetes e obesidade.",
    longDescription:
      "Os agonistas do receptor GLP-1 (peptídeo semelhante ao glucagon-1) revolucionaram o tratamento de diabetes tipo 2 e obesidade. Estes peptídeos imitam o hormônio GLP-1 natural, estimulando a liberação de insulina, suprimindo o glucagon e reduzindo o apetite. O mercado global é projetado em US$ 48 bilhões até 2030.",
  },
  growth_hormone: {
    label: "Hormônio de Crescimento",
    description:
      "Secretagogos de GH: ipamorelin, CJC-1295, sermorelin, tesamorelin e mais.",
    longDescription:
      "Peptídeos que estimulam a liberação natural de hormônio de crescimento (GH) pela hipófise. Diferente do HGH exógeno, preservam o ritmo pulsátil natural e o feedback fisiológico do eixo GH-IGF-1.",
  },
  healing: {
    label: "Recuperação e Cicatrização",
    description:
      "Peptídeos para regeneração de tecidos: BPC-157, TB-500 e outros.",
    longDescription:
      "Peptídeos pesquisados por suas propriedades regenerativas em tendões, músculos, ossos e mucosas. Populares na comunidade atlética, mas com evidência clínica em humanos ainda limitada.",
  },
  neuroprotective: {
    label: "Neuroproteção",
    description:
      "Peptídeos para função cognitiva e proteção neuronal: Selank, Cerebrolysin, SS-31, Dihexa.",
    longDescription:
      "Peptídeos que atuam no sistema nervoso central, com efeitos ansiolíticos, nootrópicos ou neuroprotetores. Pesquisados para Alzheimer, AVC, traumatismo craniano e declínio cognitivo.",
  },
  cosmetic: {
    label: "Cosméticos",
    description:
      "Peptídeos para pele e cabelo: GHK-Cu e outros peptídeos cosmecêuticos.",
    longDescription:
      "Peptídeos com aplicação tópica para anti-aging, estímulo de colágeno e regeneração da pele. Têm evidência clínica mais consistente que muitos peptídeos injetáveis devido ao uso histórico em dermatologia.",
  },
  immune: {
    label: "Imunológicos",
    description:
      "Peptídeos imunomoduladores: Thymosin Alpha-1, KPV, LL-37, Glutationa.",
    longDescription:
      "Peptídeos que modulam a resposta imune. Alguns são aprovados em vários países (Thymosin Alpha-1 para hepatite). Outros estão em pesquisa para doenças autoimunes e infecções.",
  },
  performance: {
    label: "Performance",
    description:
      "Peptídeos para metabolismo e performance física: MOTS-c, AOD-9604, PT-141.",
    longDescription:
      "Peptídeos pesquisados para melhorar metabolismo energético, composição corporal ou função sexual. Inclui o PT-141 (único aprovado para HSDD feminino) e MOTS-c (peptídeo mitocondrial).",
  },
  longevity: {
    label: "Longevidade",
    description:
      "Compostos de longevidade: NMN, NAD+, NAC, rapamicina, resveratrol e outros.",
    longDescription:
      "Compostos populares no mercado de longevidade e biohacking. Inclui nucleotídeos (NMN, NR), antioxidantes (NAC, glutationa), polifenóis (resveratrol, fisetina), poliaminas (espermidina) e drogas off-label como rapamicina e metformina. Atenção: a maioria destes compostos NÃO são tecnicamente peptídeos — cada página explica exatamente o que é.",
  },
};

const validCategories = Object.keys(categoryMeta) as PeptideCategory[];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!validCategories.includes(slug as PeptideCategory)) return {};
  const meta = categoryMeta[slug as PeptideCategory];
  return {
    title: `${meta.label} — Peptídeos`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!validCategories.includes(slug as PeptideCategory)) notFound();

  const category = slug as PeptideCategory;
  const meta = categoryMeta[category];

  const peptides = await prisma.peptide.findMany({
    where: { published: true, category },
    orderBy: { name: "asc" },
    select: {
      name: true,
      slug: true,
      category: true,
      researchPhase: true,
      description: true,
      aliases: true,
      _count: { select: { studies: true } },
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <CategoryBadge category={category} />
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {meta.label}
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-zinc-600">
          {meta.longDescription}
        </p>
      </header>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900">
          {peptides.length} composto{peptides.length !== 1 ? "s" : ""}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {peptides.map((p) => (
          <Link
            key={p.slug}
            href={`/peptideo/${p.slug}`}
            className="group rounded-2xl border border-zinc-200/60 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-emerald-600">
                {p.name}
              </h3>
              <ResearchPhaseBadge phase={p.researchPhase} />
            </div>
            {p.aliases.length > 0 && (
              <p className="mt-1 text-xs text-zinc-400">
                {p.aliases.join(", ")}
              </p>
            )}
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">
              {p.description}
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3">
              <span className="text-xs text-zinc-400">
                {p._count.studies} estudo{p._count.studies !== 1 ? "s" : ""}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
        >
          ← Ver todos os peptídeos
        </Link>
      </div>
    </div>
  );
}

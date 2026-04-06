import { PeptideCategory } from "@/generated/prisma/enums";

const categoryConfig: Record<
  PeptideCategory,
  { label: string; color: string; icon: string }
> = {
  glp1: {
    label: "GLP-1",
    color: "bg-purple-50 text-purple-700 ring-1 ring-purple-200/80",
    icon: "~",
  },
  growth_hormone: {
    label: "Hormônio de Crescimento",
    color: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/80",
    icon: "^",
  },
  healing: {
    label: "Recuperação",
    color: "bg-green-50 text-green-700 ring-1 ring-green-200/80",
    icon: "+",
  },
  neuroprotective: {
    label: "Neuroprotetor",
    color: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/80",
    icon: "*",
  },
  cosmetic: {
    label: "Cosmético",
    color: "bg-pink-50 text-pink-700 ring-1 ring-pink-200/80",
    icon: "~",
  },
  immune: {
    label: "Imunológico",
    color: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/80",
    icon: "#",
  },
  performance: {
    label: "Performance",
    color: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200/80",
    icon: ">",
  },
};

export function CategoryBadge({ category }: { category: PeptideCategory }) {
  const config = categoryConfig[category];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

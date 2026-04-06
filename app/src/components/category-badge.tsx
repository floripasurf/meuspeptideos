import { PeptideCategory } from "@/generated/prisma/enums";

const categoryConfig: Record<PeptideCategory, { label: string; color: string }> =
  {
    glp1: { label: "GLP-1", color: "bg-purple-100 text-purple-700" },
    growth_hormone: {
      label: "Hormônio de Crescimento",
      color: "bg-blue-100 text-blue-700",
    },
    healing: { label: "Recuperação", color: "bg-green-100 text-green-700" },
    neuroprotective: {
      label: "Neuroprotetor",
      color: "bg-indigo-100 text-indigo-700",
    },
    cosmetic: { label: "Cosmético", color: "bg-pink-100 text-pink-700" },
    immune: { label: "Imunológico", color: "bg-amber-100 text-amber-700" },
    performance: {
      label: "Performance",
      color: "bg-cyan-100 text-cyan-700",
    },
  };

export function CategoryBadge({ category }: { category: PeptideCategory }) {
  const config = categoryConfig[category];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

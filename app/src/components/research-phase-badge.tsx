import { ResearchPhase } from "@/generated/prisma/enums";

const phaseConfig: Record<
  ResearchPhase,
  { label: string; color: string; level: number }
> = {
  preclinical: {
    label: "Pré-clínico",
    color: "bg-red-100 text-red-700",
    level: 1,
  },
  phase1: {
    label: "Fase 1",
    color: "bg-orange-100 text-orange-700",
    level: 2,
  },
  phase2: {
    label: "Fase 2",
    color: "bg-yellow-100 text-yellow-700",
    level: 3,
  },
  phase3: {
    label: "Fase 3",
    color: "bg-blue-100 text-blue-700",
    level: 4,
  },
  approved: {
    label: "Aprovado",
    color: "bg-emerald-100 text-emerald-700",
    level: 5,
  },
};

export function ResearchPhaseBadge({ phase }: { phase: ResearchPhase }) {
  const config = phaseConfig[phase];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

export function ResearchPhaseBar({ phase }: { phase: ResearchPhase }) {
  const config = phaseConfig[phase];
  const phases = [
    "preclinical",
    "phase1",
    "phase2",
    "phase3",
    "approved",
  ] as const;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {phases.map((p, i) => (
          <div
            key={p}
            className={`h-2 flex-1 rounded-full ${
              i < config.level ? "bg-emerald-500" : "bg-zinc-200"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>Pré-clínico</span>
        <span className="font-medium text-zinc-900">{config.label}</span>
        <span>Aprovado</span>
      </div>
    </div>
  );
}

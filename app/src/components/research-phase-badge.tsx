import { ResearchPhase } from "@/generated/prisma/enums";

const phaseConfig: Record<
  ResearchPhase,
  { label: string; color: string; barColor: string; dotColor: string; level: number }
> = {
  preclinical: {
    label: "Pré-clínico",
    color: "bg-red-50 text-red-700 ring-1 ring-red-200",
    barColor: "bg-red-400",
    dotColor: "bg-red-400",
    level: 1,
  },
  phase1: {
    label: "Fase 1",
    color: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
    barColor: "bg-orange-400",
    dotColor: "bg-orange-400",
    level: 2,
  },
  phase2: {
    label: "Fase 2",
    color: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
    barColor: "bg-yellow-400",
    dotColor: "bg-yellow-400",
    level: 3,
  },
  phase3: {
    label: "Fase 3",
    color: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    barColor: "bg-blue-500",
    dotColor: "bg-blue-500",
    level: 4,
  },
  approved: {
    label: "Aprovado",
    color: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    barColor: "bg-emerald-500",
    dotColor: "bg-emerald-500",
    level: 5,
  },
};

export function ResearchPhaseBadge({ phase }: { phase: ResearchPhase }) {
  const config = phaseConfig[phase];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.color}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}

export function ResearchPhaseBar({ phase }: { phase: ResearchPhase }) {
  const config = phaseConfig[phase];
  const phases = [
    { key: "preclinical", label: "Pré-clínico" },
    { key: "phase1", label: "Fase 1" },
    { key: "phase2", label: "Fase 2" },
    { key: "phase3", label: "Fase 3" },
    { key: "approved", label: "Aprovado" },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      {/* Progress bar */}
      <div className="flex items-center gap-1.5">
        {phases.map((p, i) => {
          const isActive = i < config.level;
          const isCurrent = i === config.level - 1;
          return (
            <div key={p.key} className="relative flex-1">
              <div
                className={`phase-segment h-2.5 rounded-full ${
                  isActive ? config.barColor : "bg-navy-100"
                } ${isCurrent ? "ring-2 ring-offset-1 ring-brand-400/30" : ""}`}
              />
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between">
        {phases.map((p, i) => {
          const isActive = i < config.level;
          const isCurrent = i === config.level - 1;
          return (
            <span
              key={p.key}
              className={`text-xs ${
                isCurrent
                  ? "font-semibold text-navy-900"
                  : isActive
                    ? "font-medium text-navy-600"
                    : "text-navy-400"
              }`}
            >
              {p.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

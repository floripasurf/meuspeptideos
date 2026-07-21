"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { targetPath, type SocialTarget } from "@/lib/social-funnel";

const choices: Array<{
  id: string;
  target: SocialTarget;
  audience?: string;
  title: string;
  body: string;
  cta: string;
}> = [
  {
    id: "education",
    target: "education",
    title: "Quero entender regras e riscos",
    body: "Conteúdo regulatório e educacional para separar evidência de promessa.",
    cta: "Ver guia",
  },
  {
    id: "consumer-radar",
    target: "radar",
    audience: "consumer",
    title: "Quero acompanhar novidades",
    body: "Resumo de estudos e mudanças regulatórias para leitores.",
    cta: "Conhecer o Radar",
  },
  {
    id: "professional-radar",
    target: "radar",
    audience: "professional",
    title: "Sou profissional de saúde",
    body: "Briefings com fontes verificáveis para acompanhar o setor.",
    cta: "Participar do piloto",
  },
  {
    id: "organization-radar",
    target: "radar",
    audience: "organization",
    title: "Represento uma organização",
    body: "Inteligência agregada para clínicas, farmácias e empresas do setor.",
    cta: "Validar o Radar B2B",
  },
];

function visitorId() {
  if (typeof window === "undefined") return "";
  const key = "mp_social_visitor";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const value = crypto.randomUUID();
  window.localStorage.setItem(key, value);
  return value;
}

export function InstagramFunnel({ lang }: { lang: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

  async function trackAndGo(choice: (typeof choices)[number]) {
    const landingPath = `/${lang}/instagram`;
    await fetch("/api/track/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        ...params,
        landingPath,
        target: choice.target,
        segment: choice.audience,
        visitorId: visitorId(),
        referrer: document.referrer,
      }),
    }).catch(() => undefined);
    const path = targetPath(lang, choice.target);
    router.push(choice.audience ? `${path}?audience=${choice.audience}` : path);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          onClick={() => trackAndGo(choice)}
          className="rounded-lg border border-zinc-200 bg-white p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50/40"
        >
          <span className="block text-sm font-semibold text-zinc-950">{choice.title}</span>
          <span className="mt-2 block text-sm leading-relaxed text-zinc-600">{choice.body}</span>
          <span className="mt-4 inline-flex text-sm font-semibold text-emerald-700">
            {choice.cta}
          </span>
        </button>
      ))}
    </div>
  );
}

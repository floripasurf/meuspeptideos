"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { targetPath, type SocialTarget } from "@/lib/social-funnel";

const choices: Array<{
  target: SocialTarget;
  title: string;
  body: string;
  cta: string;
}> = [
  {
    target: "education",
    title: "Quero entender regras e riscos",
    body: "Conteudo regulatorio e educacional para separar evidencia de promessa.",
    cta: "Ver guia",
  },
  {
    target: "patient_quote",
    title: "Tenho prescricao e quero orcamento",
    body: "Pedido privado para farmacia parceira responder no WhatsApp.",
    cta: "Solicitar orcamento",
  },
  {
    target: "doctor_signup",
    title: "Sou medico",
    body: "Cadastro discreto para receber pacientes qualificados por regiao.",
    cta: "Cadastrar perfil",
  },
  {
    target: "pharmacy_partner",
    title: "Sou farmacia de manipulacao",
    body: "Entrar na fila B2B para receber pedidos qualificados.",
    cta: "Avaliar parceria",
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

  async function trackAndGo(target: SocialTarget) {
    const landingPath = `/${lang}/instagram`;
    await fetch("/api/track/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        ...params,
        landingPath,
        target,
        visitorId: visitorId(),
        referrer: document.referrer,
      }),
    }).catch(() => undefined);
    router.push(targetPath(lang, target));
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {choices.map((choice) => (
        <button
          key={choice.target}
          type="button"
          onClick={() => trackAndGo(choice.target)}
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

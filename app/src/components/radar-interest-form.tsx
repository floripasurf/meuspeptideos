"use client";

import { useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type Audience = "consumer" | "pharmacy" | "clinic" | "professional" | "supplier";
type Plan = "consumer-monthly" | "b2b-radar" | "data-license";

const audienceLabels: Record<Audience, string> = {
  consumer: "Leitor ou paciente",
  pharmacy: "Farmácia",
  clinic: "Clínica",
  professional: "Profissional de saúde",
  supplier: "Fornecedor ou empresa do setor",
};

export function RadarInterestForm({
  sourcePage,
  initialAudience = "consumer",
}: {
  sourcePage: string;
  initialAudience?: Audience;
}) {
  const [audience, setAudience] = useState<Audience>(initialAudience);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const plan: Plan = audience === "consumer" ? "consumer-monthly" : "b2b-radar";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/radar-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience,
          plan,
          name,
          organization,
          email,
          whatsapp,
          sourcePage,
          consentCommercial: consent,
          website: String(formData.get("website") || ""),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Erro ao registrar interesse");

      if (newsletter) {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: `radar_${audience}`, consentNewsletter: true }),
        });
      }

      trackAnalyticsEvent("radar_interest", { audience, plan, source_page: sourcePage });
      setStatus("success");
      setMessage(newsletter ? "Interesse registrado. Confira seu email para confirmar a newsletter." : data.message);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Erro ao enviar. Tente novamente.");
    }
  }

  if (status === "success") {
    return <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">{message}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
      <label className="block text-xs font-semibold text-zinc-700" htmlFor="radar-audience">Seu perfil</label>
      <select
        id="radar-audience"
        value={audience}
        onChange={(event) => setAudience(event.target.value as Audience)}
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900"
      >
        {Object.entries(audienceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Seu nome" className="rounded-lg border border-zinc-300 px-3 py-2.5 text-sm" />
        <input value={organization} onChange={(event) => setOrganization(event.target.value)} placeholder="Empresa (opcional)" className="rounded-lg border border-zinc-300 px-3 py-2.5 text-sm" />
      </div>
      <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm" />
      <input value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} placeholder="WhatsApp (opcional)" className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm" />
      <label className="flex items-start gap-2 text-xs leading-relaxed text-zinc-600">
        <input required type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5" />
        Autorizo o contato do Meus Peptídeos sobre o piloto do Radar. Este cadastro não será usado para encaminhamento médico ou farmacêutico.
      </label>
      <label className="flex items-start gap-2 text-xs leading-relaxed text-zinc-600">
        <input type="checkbox" checked={newsletter} onChange={(event) => setNewsletter(event.target.checked)} className="mt-0.5" />
        Também quero receber atualizações editoriais por email, após confirmação.
      </label>
      <button disabled={status === "loading"} className="w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60">
        {status === "loading" ? "Registrando..." : "Entrar na lista do piloto"}
      </button>
      {status === "error" ? <p role="alert" className="text-xs text-red-700">{message}</p> : null}
    </form>
  );
}

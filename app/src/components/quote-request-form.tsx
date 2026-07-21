"use client";

import { useState } from "react";

const UFS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

type Props = {
  compoundSlug: string;
  compoundName: string;
  sourcePage: string;
};

export function QuoteRequestForm({
  compoundSlug,
  compoundName,
  sourcePage,
}: Props) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [state, setState] = useState("");
  const [hasPrescription, setHasPrescription] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const website = String(formData.get("website") || "");

    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          state: state || null,
          compoundSlug,
          hasPrescription,
          consentLgpd: consent,
          sourcePage,
          website,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
        Pedido enviado. Uma farmacia de manipulacao parceira responde no seu WhatsApp.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-3">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          required
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="WhatsApp (com DDD)"
          className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-navy-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="">Estado (opcional)</option>
        {UFS.map((uf) => (
          <option key={uf} value={uf}>
            {uf}
          </option>
        ))}
      </select>
      <label className="flex items-start gap-2 text-xs text-navy-600">
        <input
          type="checkbox"
          checked={hasPrescription}
          onChange={(e) => setHasPrescription(e.target.checked)}
          className="mt-0.5"
        />
        Ja tenho prescricao medica para {compoundName}
      </label>
      <label className="flex items-start gap-2 text-xs text-navy-600">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        Autorizo o envio dos meus dados a uma farmacia de manipulacao parceira para receber um orcamento (LGPD).
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Enviando..." : "Solicitar orcamento sem custo pelo site"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600">Erro ao enviar. Tente novamente.</p>
      )}
      <p className="text-[11px] leading-relaxed text-navy-400">
        Manipulados exigem prescricao medica. Se voce ainda nao tem, procure avaliacao com um profissional habilitado antes de solicitar a manipulacao.
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";

const compoundOptions = [
  "semaglutida",
  "tirzepatida",
  "bpc-157",
  "tb-500",
  "ghk-cu",
  "ipamorelin",
  "cjc-1295",
  "sermorelin",
  "tesamorelin",
  "nmn",
];

export function PartnerApplicationForm({ sourcePage }: { sourcePage: string }) {
  const [form, setForm] = useState({
    pharmacyName: "",
    contactName: "",
    email: "",
    whatsapp: "",
    city: "",
    state: "",
    partnerWebsite: "",
    monthlyDemand: "",
    notes: "",
    websiteTrap: "",
    compounds: [] as string[],
    consentCommercial: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function toggleCompound(slug: string) {
    setForm((current) => ({
      ...current,
      compounds: current.compounds.includes(slug)
        ? current.compounds.filter((item) => item !== slug)
        : [...current.compounds, slug],
    }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const res = await fetch("/api/partner/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sourcePage }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setStatus("success");
      return;
    }
    setStatus("error");
    setMessage(data.error || "Erro ao enviar cadastro.");
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
        Cadastro recebido. Vamos revisar o perfil, checar aderencia regulatoria e responder
        com os proximos passos da parceria.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div aria-hidden="true" className="absolute -left-[9999px] opacity-0">
        <label htmlFor="websiteTrap">Website</label>
        <input
          id="websiteTrap"
          tabIndex={-1}
          autoComplete="off"
          value={form.websiteTrap}
          onChange={(e) => setForm({ ...form, websiteTrap: e.target.value })}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          placeholder="Nome da farmacia"
          value={form.pharmacyName}
          onChange={(e) => setForm({ ...form, pharmacyName: e.target.value })}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
        <input
          required
          placeholder="Responsavel"
          value={form.contactName}
          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
        <input
          required
          type="email"
          placeholder="email@farmacia.com.br"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="WhatsApp comercial"
          value={form.whatsapp}
          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="Cidade"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="UF"
          maxLength={2}
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value.toUpperCase() })}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
        <input
          placeholder="https://site-da-farmacia.com.br"
          value={form.partnerWebsite}
          onChange={(e) => setForm({ ...form, partnerWebsite: e.target.value })}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm sm:col-span-2"
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-zinc-700">Compostos que manipula</p>
        <div className="flex flex-wrap gap-2">
          {compoundOptions.map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => toggleCompound(slug)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                form.compounds.includes(slug)
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-zinc-200 bg-white text-zinc-600"
              }`}
            >
              {slug}
            </button>
          ))}
        </div>
      </div>

      <select
        value={form.monthlyDemand}
        onChange={(e) => setForm({ ...form, monthlyDemand: e.target.value })}
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
      >
        <option value="">Volume mensal aproximado</option>
        <option value="ate-10">Ate 10 pedidos/mes</option>
        <option value="10-50">10 a 50 pedidos/mes</option>
        <option value="50-150">50 a 150 pedidos/mes</option>
        <option value="150+">150+ pedidos/mes</option>
      </select>

      <textarea
        placeholder="Observacoes sobre envio, receita, area atendida ou operacao"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="min-h-24 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
      />

      <label className="flex items-start gap-2 text-xs leading-relaxed text-zinc-600">
        <input
          required
          type="checkbox"
          checked={form.consentCommercial}
          onChange={(e) => setForm({ ...form, consentCommercial: e.target.checked })}
          className="mt-0.5"
        />
        Autorizo contato comercial do Meus Peptideos para avaliar parceria B2B e
        entendo que qualquer atendimento deve respeitar prescricao, regras da Anvisa e LGPD.
      </label>

      <button
        disabled={status === "loading"}
        className="w-full rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Quero avaliar parceria"}
      </button>
      {status === "error" && <p className="text-xs text-red-600">{message}</p>}
    </form>
  );
}

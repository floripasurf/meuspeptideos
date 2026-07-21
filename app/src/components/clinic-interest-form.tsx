"use client";

import { useState } from "react";

export function ClinicInterestForm({ sourcePage }: { sourcePage: string }) {
  const [clinicName, setClinicName] = useState("");
  const [city, setCity] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clinicName,
          email,
          whatsapp,
          city,
          peptideInterest: [],
          sourcePage,
          contactMethod: "clinic-directory",
        }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) {
        setClinicName("");
        setCity("");
        setWhatsapp("");
        setEmail("");
        setConsent(false);
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
        Interesse recebido. Entraremos em contato para validar cidade,
        especialidade e disponibilidade.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        value={clinicName}
        onChange={(e) => setClinicName(e.target.value)}
        placeholder="Nome da clinica"
        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900"
      />
      <input
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Cidade"
        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900"
      />
      <input
        required
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        placeholder="WhatsApp"
        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900"
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@clinica.com.br"
        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900"
      />
      <label className="flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        Autorizo contato comercial do Meus Peptideos sobre o diretorio pago
        para clinicas.
      </label>
      <button
        disabled={status === "loading"}
        className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Quero avaliar minha cidade"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600">Erro ao enviar. Tente novamente.</p>
      )}
    </form>
  );
}

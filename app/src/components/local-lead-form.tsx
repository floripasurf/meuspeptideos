"use client";

import { useState } from "react";

type Props = {
  peptideName: string;
  cityName: string;
  cityState: string;
  peptideSlug: string;
  citySlug: string;
};

export function LocalLeadForm({
  peptideName,
  cityName,
  cityState,
  peptideSlug,
  citySlug,
}: Props) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [consentDoctorShare, setConsentDoctorShare] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          city: cityName,
          state: cityState,
          peptideInterest: [peptideSlug],
          sourcePage: `/${peptideSlug}/${citySlug}`,
          contactMethod: "form",
          consentDoctorShare,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setWhatsapp("");
        setEmail("");
        setConsentDoctorShare(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-emerald-600"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-zinc-900">
          Solicitação recebida!
        </h3>
        <p className="mt-2 text-sm text-zinc-600">
          Em breve enviaremos uma indicação de profissional em {cityName} que
          pode orientar você sobre {peptideName}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-zinc-900">
          Encontre um médico em {cityName}
        </h3>
        <p className="mt-1 text-sm text-zinc-600">
          Receba uma indicação de profissional em {cityName} que pode orientar
          você sobre {peptideName}. Sem custo, sem compromisso.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <input
            type="tel"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="WhatsApp (com DDD)"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <label className="flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
          <input
            type="checkbox"
            required
            checked={consentDoctorShare}
            onChange={(e) => setConsentDoctorShare(e.target.checked)}
            className="mt-0.5"
          />
          Autorizo o compartilhamento dos meus dados com um medico parceiro para
          contato sobre esta solicitacao.
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : "Receber indicação gratuita"}
        </button>
        {status === "error" && (
          <p className="text-xs text-red-500">
            Erro ao enviar. Tente novamente.
          </p>
        )}
        <p className="text-xs text-zinc-400">
          Seus dados sao confidenciais e serao usados somente para esta
          indicacao. A indicacao e informativa e nao substitui consulta medica.
        </p>
      </form>
    </div>
  );
}

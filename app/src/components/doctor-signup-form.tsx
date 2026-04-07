"use client";

import { useState } from "react";

const specialties = [
  "Endocrinologia",
  "Medicina Funcional",
  "Medicina de Longevidade",
  "Nutrologia",
  "Medicina Esportiva",
  "Geriatria",
  "Dermatologia",
  "Medicina Estética",
  "Clínica Médica",
  "Ginecologia",
  "Urologia",
  "Ortopedia",
  "Outra",
];

const peptideOptions = [
  { slug: "semaglutida", name: "Semaglutida" },
  { slug: "tirzepatida", name: "Tirzepatida" },
  { slug: "bpc-157", name: "BPC-157" },
  { slug: "tb-500", name: "TB-500" },
  { slug: "ghk-cu", name: "GHK-Cu" },
  { slug: "ipamorelin", name: "Ipamorelin" },
  { slug: "cjc-1295", name: "CJC-1295" },
  { slug: "thymosin-alpha-1", name: "Thymosin Alpha-1" },
  { slug: "sermorelin", name: "Sermorelin" },
  { slug: "tesamorelin", name: "Tesamorelin" },
  { slug: "nmn", name: "NMN" },
  { slug: "rapamicina", name: "Rapamicina" },
  { slug: "metformina", name: "Metformina" },
];

export function DoctorSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [crm, setCrm] = useState("");
  const [crmState, setCrmState] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [peptides, setPeptides] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function togglePeptide(slug: string) {
    setPeptides((prev) =>
      prev.includes(slug) ? prev.filter((p) => p !== slug) : [...prev, slug]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          crm,
          crmState,
          specialty,
          city,
          state,
          yearsExperience,
          peptidesPrescribed: peptides,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-600">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-zinc-900">
          Cadastro recebido!
        </h3>
        <p className="mt-2 text-sm text-zinc-600">
          Entraremos em contato em até 48h para validar seu cadastro e iniciar
          o envio de leads na sua região.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            Nome completo *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            WhatsApp
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="(11) 99999-9999"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            Especialidade *
          </label>
          <select
            required
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Selecione</option>
            {specialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            CRM
          </label>
          <input
            type="text"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            placeholder="123456"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            UF do CRM
          </label>
          <input
            type="text"
            value={crmState}
            onChange={(e) => setCrmState(e.target.value.toUpperCase())}
            placeholder="SP"
            maxLength={2}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            Cidade
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="São Paulo"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            Estado
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
            placeholder="SP"
            maxLength={2}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            Anos de experiência
          </label>
          <input
            type="number"
            min="0"
            max="60"
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-zinc-700">
          Quais peptídeos você prescreve? (selecione todos que se aplicam)
        </label>
        <div className="flex flex-wrap gap-2">
          {peptideOptions.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => togglePeptide(p.slug)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                peptides.includes(p.slug)
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Cadastrar e receber leads"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500">Erro ao cadastrar. Tente novamente.</p>
      )}
    </form>
  );
}

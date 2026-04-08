"use client";

import Link from "next/link";
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
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [crm, setCrm] = useState("");
  const [crmState, setCrmState] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [peptides, setPeptides] = useState<string[]>([]);
  const [consentLgpd, setConsentLgpd] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "rate_limited">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function togglePeptide(slug: string) {
    setPeptides((prev) =>
      prev.includes(slug) ? prev.filter((p) => p !== slug) : [...prev, slug]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consentLgpd) {
      setErrorMessage("Você precisa concordar com a política de privacidade.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          whatsapp,
          crm,
          crmState,
          specialty,
          address,
          city,
          state,
          yearsExperience,
          peptidesPrescribed: peptides,
          consentLgpd,
          website, // honeypot
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
      } else if (res.status === 429) {
        setStatus("rate_limited");
        setErrorMessage(data.error || "Muitas tentativas.");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Erro ao cadastrar.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão. Tente novamente.");
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
          Enviamos um email de confirmação para <strong>{email}</strong>.
          Verifique sua caixa de entrada (e spam) e clique no link para ativar
          seu cadastro.
        </p>
        <p className="mt-3 text-xs text-zinc-500">
          Após confirmação, entraremos em contato em até 48h para validar e
          iniciar o envio de leads na sua região.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden field for bots */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <label htmlFor="website">Website (deixe em branco)</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

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
            Telefone (consultório)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(11) 3333-3333"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            WhatsApp *
          </label>
          <input
            type="tel"
            required
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
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            Endereço do consultório
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua, número, complemento, bairro"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-700">
            Cidade *
          </label>
          <input
            type="text"
            required
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

      {/* LGPD Consent */}
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consentLgpd}
            onChange={(e) => setConsentLgpd(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-xs leading-relaxed text-zinc-700">
            Concordo com a{" "}
            <Link
              href="/privacidade-medicos"
              target="_blank"
              className="font-medium text-emerald-600 underline hover:text-emerald-700"
            >
              Política de Privacidade para Médicos (LGPD)
            </Link>
            . Meus dados serão armazenados com segurança em servidores
            brasileiros, jamais expostos publicamente, e usados exclusivamente
            para conectar pacientes interessados em peptídeos a profissionais
            qualificados na sua região. Posso solicitar exclusão a qualquer
            momento.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Cadastrar e receber leads"}
      </button>
      {(status === "error" || status === "rate_limited") && errorMessage && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-xs text-red-700">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}

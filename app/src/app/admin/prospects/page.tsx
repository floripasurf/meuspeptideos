"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Prospect = {
  id: string;
  name: string;
  email: string | null;
  whatsapp: string | null;
  website: string | null;
  city: string | null;
  state: string | null;
  compounds: string[];
  source: string;
  status: string;
  fitScore: number;
  riskScore: number;
  riskFlags: string[];
  outreachNotes: string | null;
  nextFollowUpAt: string | null;
  convertedPharmacy?: { name: string; slug: string } | null;
  _count?: { outreachEvents: number; applications: number };
};

const emptyForm = {
  name: "",
  email: "",
  whatsapp: "",
  website: "",
  city: "",
  state: "",
  googleRating: "",
  googleReviews: "",
  compounds: "",
  source: "manual",
  notes: "",
};

const statuses = [
  "discovered",
  "qualified",
  "contacted",
  "negotiating",
  "partner",
  "rejected",
  "opted_out",
];

function fmtDate(value: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("pt-BR");
}

export default function AdminProspectsPage() {
  const router = useRouter();
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/admin/prospects?${params}`);
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setProspects(data.prospects || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function createProspect(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Salvando...");
    const res = await fetch("/api/admin/prospects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        googleRating: form.googleRating === "" ? null : Number(form.googleRating),
        googleReviews: form.googleReviews === "" ? null : Number(form.googleReviews),
        outreachNotes: form.notes,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.error || "Erro ao salvar prospect");
      return;
    }
    setForm(emptyForm);
    setMessage("Prospect salvo");
    await load();
  }

  async function patchProspect(id: string, body: Record<string, unknown>) {
    const res = await fetch("/api/admin/prospects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...body }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.error || "Erro ao atualizar");
      return;
    }
    setMessage("Atualizado");
    await load();
  }

  if (loading) {
    return <p className="p-6 text-navy-400">Carregando prospects...</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Prospects de farmácias</h1>
          <p className="mt-1 text-sm text-navy-400">
            Pipeline B2B para mapear, qualificar e converter farmácias de manipulação.
          </p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-navy-600 bg-navy-900 px-3 py-2 text-sm text-white"
        >
          <option value="">Todos os status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <form
        onSubmit={createProspect}
        className="mb-6 grid gap-3 rounded-xl border border-navy-700 bg-navy-900 p-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        <input required placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white" />
        <input placeholder="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white" />
        <input placeholder="WhatsApp" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white" />
        <input placeholder="Cidade" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white" />
        <input placeholder="UF" maxLength={2} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value.toUpperCase() })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white" />
        <input placeholder="https://site.com.br" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white sm:col-span-2" />
        <input placeholder="Compostos" value={form.compounds} onChange={(e) => setForm({ ...form, compounds: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white sm:col-span-2" />
        <input placeholder="Rating" type="number" step="0.1" min="0" max="5" value={form.googleRating} onChange={(e) => setForm({ ...form, googleRating: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white" />
        <input placeholder="Reviews" type="number" min="0" value={form.googleReviews} onChange={(e) => setForm({ ...form, googleReviews: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white" />
        <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white">
          {["manual", "csv", "google_maps", "inbound", "instagram", "partnership"].map((source) => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
        <input placeholder="Notas" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white lg:col-span-2" />
        <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500">
          Criar prospect
        </button>
        {message && <p className="text-xs text-navy-300 lg:col-span-5">{message}</p>}
      </form>

      <div className="overflow-x-auto rounded-xl border border-navy-700 bg-navy-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-700 text-left">
              <th className="px-4 py-3 text-navy-400">Prospect</th>
              <th className="px-4 py-3 text-navy-400">Score</th>
              <th className="px-4 py-3 text-navy-400">Compostos</th>
              <th className="px-4 py-3 text-navy-400">Status</th>
              <th className="px-4 py-3 text-navy-400">Follow-up</th>
              <th className="px-4 py-3 text-navy-400">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((prospect) => (
              <tr key={prospect.id} className="border-b border-navy-800 align-top">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{prospect.name}</p>
                  <p className="text-xs text-navy-400">{prospect.email || prospect.whatsapp || "-"}</p>
                  <p className="text-xs text-navy-500">
                    {prospect.city || "-"} {prospect.state ? `/${prospect.state}` : ""} · {prospect.source}
                  </p>
                  {prospect.convertedPharmacy && (
                    <p className="mt-1 text-xs text-emerald-300">
                      Parceira: {prospect.convertedPharmacy.name}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="text-navy-200">Fit {prospect.fitScore}</p>
                  <p className={prospect.riskScore >= 60 ? "text-red-300" : "text-navy-400"}>
                    Risco {prospect.riskScore}
                  </p>
                  {prospect.riskFlags.length > 0 && (
                    <p className="mt-1 max-w-48 text-xs text-amber-300">
                      {prospect.riskFlags.join(", ")}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-navy-300">
                  {prospect.compounds.length ? prospect.compounds.join(", ") : "-"}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={prospect.status}
                    onChange={(e) => patchProspect(prospect.id, { status: e.target.value })}
                    className="rounded-lg border border-navy-700 bg-navy-800 px-2 py-1 text-xs text-white"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-navy-300">
                  <p>{fmtDate(prospect.nextFollowUpAt)}</p>
                  <input
                    type="date"
                    onChange={(e) => patchProspect(prospect.id, { nextFollowUpAt: e.target.value })}
                    className="mt-2 rounded border border-navy-700 bg-navy-800 px-2 py-1 text-xs text-white"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => patchProspect(prospect.id, { status: "contacted", lastContactedAt: new Date().toISOString() })}
                      className="rounded-lg border border-navy-600 px-3 py-1 text-xs font-medium text-navy-200 hover:bg-navy-800"
                    >
                      Marcar contato
                    </button>
                    <button
                      onClick={() => patchProspect(prospect.id, { action: "convert" })}
                      disabled={prospect.status === "partner"}
                      className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-500 disabled:opacity-40"
                    >
                      Converter
                    </button>
                    <button
                      onClick={() => patchProspect(prospect.id, { optedOut: true })}
                      className="rounded-lg border border-red-800 px-3 py-1 text-xs font-medium text-red-300 hover:bg-red-950/30"
                    >
                      Opt-out
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

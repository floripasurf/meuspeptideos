"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Pharmacy = {
  id: string;
  name: string;
  slug: string;
  email: string;
  whatsapp: string | null;
  city: string | null;
  state: string | null;
  shipsNationwide: boolean;
  compounds: string[];
  commissionPct: number;
  leadPrice: number | null;
  isActive: boolean;
  notes: string | null;
  _count?: { quotes: number };
};

const emptyForm = {
  name: "",
  slug: "",
  email: "",
  whatsapp: "",
  city: "",
  state: "",
  compounds: "",
  commissionPct: "10",
  leadPrice: "",
  notes: "",
  shipsNationwide: true,
};

export default function AdminPharmaciesPage() {
  const router = useRouter();
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/pharmacies");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setPharmacies(data.pharmacies || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createPharmacy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Salvando...");
    const res = await fetch("/api/admin/pharmacies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        compounds: form.compounds,
        commissionPct: Number(form.commissionPct),
        leadPrice: form.leadPrice === "" ? null : Number(form.leadPrice),
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.error || "Erro ao salvar farmácia");
      return;
    }
    setForm(emptyForm);
    setMessage("Farmácia criada");
    await load();
  }

  async function toggleActive(pharmacy: Pharmacy) {
    const res = await fetch("/api/admin/pharmacies", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pharmacy.id, isActive: !pharmacy.isActive }),
    });
    if (res.ok) await load();
  }

  if (loading) {
    return <p className="p-6 text-navy-400">Carregando farmácias...</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Farmácias parceiras</h1>
        <p className="mt-1 text-sm text-navy-400">
          Cadastro operacional para roteamento de pedidos de orçamento.
        </p>
      </div>

      <form
        onSubmit={createPharmacy}
        className="mb-6 grid gap-3 rounded-xl border border-navy-700 bg-navy-900 p-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <input
          required
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white"
        />
        <input
          required
          placeholder="slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white"
        />
        <input
          required
          type="email"
          placeholder="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white"
        />
        <input
          placeholder="WhatsApp"
          value={form.whatsapp}
          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white"
        />
        <input
          placeholder="Cidade"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white"
        />
        <input
          placeholder="UF"
          maxLength={2}
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value.toUpperCase() })}
          className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white"
        />
        <input
          placeholder="Compostos, separados por virgula"
          value={form.compounds}
          onChange={(e) => setForm({ ...form, compounds: e.target.value })}
          className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white lg:col-span-2"
        />
        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="Comissão %"
          value={form.commissionPct}
          onChange={(e) => setForm({ ...form, commissionPct: e.target.value })}
          className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white"
        />
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Preco fixo lead"
          value={form.leadPrice}
          onChange={(e) => setForm({ ...form, leadPrice: e.target.value })}
          className="rounded-lg border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-white"
        />
        <label className="flex items-center gap-2 text-sm text-navy-300">
          <input
            type="checkbox"
            checked={form.shipsNationwide}
            onChange={(e) => setForm({ ...form, shipsNationwide: e.target.checked })}
          />
          Envia nacionalmente
        </label>
        <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500">
          Criar farmácia
        </button>
        {message && <p className="text-xs text-navy-300 lg:col-span-4">{message}</p>}
      </form>

      <div className="overflow-x-auto rounded-xl border border-navy-700 bg-navy-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-700 text-left">
              <th className="px-4 py-3 text-navy-400">Nome</th>
              <th className="px-4 py-3 text-navy-400">UF</th>
              <th className="px-4 py-3 text-navy-400">Compostos</th>
              <th className="px-4 py-3 text-navy-400">Comissão</th>
              <th className="px-4 py-3 text-navy-400">Orcamentos</th>
              <th className="px-4 py-3 text-navy-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((pharmacy) => (
              <tr key={pharmacy.id} className="border-b border-navy-800">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{pharmacy.name}</p>
                  <p className="text-xs text-navy-400">{pharmacy.email}</p>
                </td>
                <td className="px-4 py-3 text-navy-300">
                  {pharmacy.city || "-"} {pharmacy.state ? `/${pharmacy.state}` : ""}
                </td>
                <td className="px-4 py-3 text-xs text-navy-300">
                  {pharmacy.compounds.length ? pharmacy.compounds.join(", ") : "todos"}
                </td>
                <td className="px-4 py-3 text-navy-300">
                  {pharmacy.commissionPct}%{pharmacy.leadPrice ? ` ou R$ ${pharmacy.leadPrice}` : ""}
                </td>
                <td className="px-4 py-3 text-navy-300">{pharmacy._count?.quotes ?? 0}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(pharmacy)}
                    className={`rounded-lg px-3 py-1 text-xs font-medium ${
                      pharmacy.isActive
                        ? "bg-emerald-900/40 text-emerald-300"
                        : "bg-navy-700 text-navy-300"
                    }`}
                  >
                    {pharmacy.isActive ? "Ativa" : "Inativa"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

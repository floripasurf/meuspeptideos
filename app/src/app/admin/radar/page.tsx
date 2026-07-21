"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Interest = {
  id: string;
  audience: string;
  name: string | null;
  organization: string | null;
  email: string;
  whatsapp: string | null;
  plan: string;
  sourcePage: string;
  status: string;
  createdAt: string;
};

const statuses = ["new", "contacted", "interview", "qualified", "pilot", "won", "lost", "opted_out"];

export default function AdminRadarPage() {
  const router = useRouter();
  const [interests, setInterests] = useState<Interest[]>([]);
  const [subscriberCounts, setSubscriberCounts] = useState({ total: 0, confirmed: 0 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    const response = await fetch("/api/admin/radar");
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await response.json();
    setInterests(data.interests || []);
    setSubscriberCounts({ total: data.totalSubscribers || 0, confirmed: data.confirmedSubscribers || 0 });
    setLoading(false);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateStatus(id: string, status: string) {
    setMessage("Atualizando...");
    const response = await fetch("/api/admin/radar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(data.error || "Erro ao atualizar estágio");
      return;
    }
    setMessage("Estágio atualizado");
    await load();
  }

  if (loading) return <p className="p-6 text-navy-400">Carregando Radar...</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">Radar</h1>
        <p className="mt-1 text-sm text-navy-400">Interesses comerciais, entrevistas e conversão do piloto.</p>
      </header>

      <section className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-navy-700 bg-navy-900 p-4"><p className="text-xs text-navy-400">Interesses</p><p className="mt-1 text-2xl font-semibold text-white">{interests.length}</p></div>
        <div className="rounded-lg border border-navy-700 bg-navy-900 p-4"><p className="text-xs text-navy-400">Newsletter confirmada</p><p className="mt-1 text-2xl font-semibold text-white">{subscriberCounts.confirmed}</p></div>
        <div className="rounded-lg border border-navy-700 bg-navy-900 p-4"><p className="text-xs text-navy-400">Confirmação pendente</p><p className="mt-1 text-2xl font-semibold text-white">{Math.max(0, subscriberCounts.total - subscriberCounts.confirmed)}</p></div>
      </section>

      {message ? <p className="mb-3 text-sm text-emerald-300">{message}</p> : null}
      <section className="overflow-x-auto rounded-lg border border-navy-700 bg-navy-900">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="border-b border-navy-700 text-navy-400"><tr><th className="px-4 py-3">Contato</th><th className="px-4 py-3">Perfil</th><th className="px-4 py-3">Plano</th><th className="px-4 py-3">Origem</th><th className="px-4 py-3">Data</th><th className="px-4 py-3">Estágio</th></tr></thead>
          <tbody>
            {interests.map((interest) => (
              <tr key={interest.id} className="border-b border-navy-800 align-top">
                <td className="px-4 py-3"><p className="font-medium text-white">{interest.name || interest.organization || "Sem nome"}</p><a href={`mailto:${interest.email}`} className="text-xs text-emerald-300">{interest.email}</a>{interest.whatsapp ? <p className="text-xs text-navy-400">{interest.whatsapp}</p> : null}</td>
                <td className="px-4 py-3 text-navy-300">{interest.audience}</td>
                <td className="px-4 py-3 text-navy-300">{interest.plan}</td>
                <td className="max-w-52 truncate px-4 py-3 text-navy-400">{interest.sourcePage}</td>
                <td className="px-4 py-3 text-navy-400">{new Date(interest.createdAt).toLocaleDateString("pt-BR")}</td>
                <td className="px-4 py-3"><select aria-label={`Estágio de ${interest.email}`} value={interest.status} onChange={(event) => updateStatus(interest.id, event.target.value)} className="rounded-md border border-navy-600 bg-navy-950 px-2 py-1.5 text-navy-100">{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
              </tr>
            ))}
          </tbody>
        </table>
        {interests.length === 0 ? <p className="p-6 text-sm text-navy-400">Nenhum interesse registrado.</p> : null}
      </section>
    </div>
  );
}

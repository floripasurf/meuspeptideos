"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Campaign = {
  id: string;
  slug: string;
  name: string;
  channel: string;
  landingPath: string;
  objective: string;
  status: string;
  _count?: { ideas: number; events: number };
};

type Idea = {
  id: string;
  externalId: string | null;
  pillar: string;
  format: string;
  hook: string;
  angle: string;
  target: string;
  cta: string;
  status: string;
};

type Event = {
  id: string;
  source: string;
  medium: string | null;
  content: string | null;
  target: string;
  landingPath: string;
  createdAt: string;
  campaign?: { slug: string } | null;
};

export default function AdminSocialPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [seedCount, setSeedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/social");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setCampaigns(data.campaigns || []);
    setIdeas(data.ideas || []);
    setEvents(data.recentEvents || []);
    setSeedCount(data.seedCount || 0);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function seedIdeas() {
    setMessage("Semeando ideias...");
    const res = await fetch("/api/admin/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "seed-initial-ideas" }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.error || "Erro ao semear ideias");
      return;
    }
    setMessage(`${data.seeded} ideias semeadas`);
    await load();
  }

  if (loading) return <p className="p-6 text-navy-400">Carregando social...</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Social e Instagram</h1>
          <p className="mt-1 text-sm text-navy-400">
            Campanhas, ideias de conteúdo e eventos UTM do topo de funil.
          </p>
        </div>
        <button
          onClick={seedIdeas}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
        >
          Semear {seedCount} ideias
        </button>
      </div>
      {message && <p className="mb-4 text-sm text-navy-300">{message}</p>}

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="rounded-xl border border-navy-700 bg-navy-900 p-4">
            <p className="text-xs uppercase tracking-wide text-navy-500">{campaign.channel}</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{campaign.name}</h2>
            <p className="mt-2 text-sm text-navy-400">{campaign.objective}</p>
            <p className="mt-3 text-xs text-navy-300">
              {campaign.landingPath} · {campaign._count?.ideas ?? 0} ideias · {campaign._count?.events ?? 0} eventos
            </p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="overflow-x-auto rounded-xl border border-navy-700 bg-navy-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700 text-left">
                <th className="px-4 py-3 text-navy-400">Ideia</th>
                <th className="px-4 py-3 text-navy-400">Pilar</th>
                <th className="px-4 py-3 text-navy-400">Destino</th>
                <th className="px-4 py-3 text-navy-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <tr key={idea.id} className="border-b border-navy-800 align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{idea.hook}</p>
                    <p className="mt-1 text-xs text-navy-400">{idea.angle}</p>
                    <p className="mt-1 text-xs text-emerald-300">{idea.cta}</p>
                  </td>
                  <td className="px-4 py-3 text-navy-300">{idea.pillar}</td>
                  <td className="px-4 py-3 text-navy-300">{idea.target}</td>
                  <td className="px-4 py-3 text-navy-300">{idea.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-xl border border-navy-700 bg-navy-900 p-4">
          <h2 className="text-lg font-semibold text-white">Eventos recentes</h2>
          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <div key={event.id} className="border-b border-navy-800 pb-3">
                <p className="text-sm font-medium text-navy-100">
                  {event.target} · {event.source}/{event.medium || "-"}
                </p>
                <p className="mt-1 text-xs text-navy-400">
                  {event.campaign?.slug || "-"} · {event.content || "-"}
                </p>
                <p className="mt-1 text-xs text-navy-500">
                  {new Date(event.createdAt).toLocaleString("pt-BR")}
                </p>
              </div>
            ))}
            {events.length === 0 && (
              <p className="text-sm text-navy-400">Nenhum evento registrado ainda.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

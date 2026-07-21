"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["new", "sent", "quoted", "converted", "paid", "lost"];

type Quote = {
  id: string;
  name: string;
  email: string | null;
  whatsapp: string;
  city: string | null;
  state: string | null;
  compoundSlug: string;
  status: string;
  orderValue: number | null;
  commissionValue: number | null;
  paidAt: string | null;
  createdAt: string;
  pharmacy: { id: string; name: string; commissionPct: number } | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function waLink(value: string) {
  const digits = value.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("55") && digits.length >= 12 ? digits : `55${digits}`}`;
}

export default function AdminQuotesPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Partial<Quote>>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/quotes");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setQuotes(data.quotes || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCommission = useMemo(() => {
    return quotes
      .filter((quote) => quote.status === "converted" || quote.status === "paid")
      .reduce((sum, quote) => sum + (quote.commissionValue || 0), 0);
  }, [quotes]);

  function getDraft(quote: Quote) {
    return { ...quote, ...(drafts[quote.id] || {}) };
  }

  function setDraft(id: string, field: keyof Quote, value: string | number | null) {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value },
    }));
  }

  async function save(quote: Quote) {
    const draft = getDraft(quote);
    setMessage("Salvando...");
    const res = await fetch("/api/admin/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: quote.id,
        status: draft.status,
        orderValue: draft.orderValue,
        commissionValue: draft.commissionValue,
        paidAt: draft.paidAt,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.error || "Erro ao salvar");
      return;
    }
    setMessage("Salvo");
    await load();
  }

  if (loading) return <p className="p-6 text-navy-400">Carregando orçamentos...</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Pipeline de orçamentos</h1>
          <p className="mt-1 text-sm text-navy-400">
            Acompanhe pedidos enviados a farmácias e comissões registradas.
          </p>
        </div>
        <div className="rounded-xl border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-navy-200">
          Comissão registrada:{" "}
          <span className="font-semibold text-emerald-300">
            R$ {totalCommission.toFixed(2)}
          </span>
        </div>
      </div>

      {message && <p className="mb-3 text-xs text-navy-300">{message}</p>}

      <div className="overflow-x-auto rounded-xl border border-navy-700 bg-navy-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-700 text-left">
              <th className="px-4 py-3 text-navy-400">Data</th>
              <th className="px-4 py-3 text-navy-400">Lead</th>
              <th className="px-4 py-3 text-navy-400">Composto</th>
              <th className="px-4 py-3 text-navy-400">Farmácia</th>
              <th className="px-4 py-3 text-navy-400">Status</th>
              <th className="px-4 py-3 text-navy-400">Pedido</th>
              <th className="px-4 py-3 text-navy-400">Comissão</th>
              <th className="px-4 py-3 text-navy-400">Pago em</th>
              <th className="px-4 py-3 text-navy-400">Acao</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => {
              const draft = getDraft(quote);
              return (
                <tr key={quote.id} className="border-b border-navy-800">
                  <td className="px-4 py-3 text-xs text-navy-400 whitespace-nowrap">
                    {formatDate(quote.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{quote.name}</p>
                    <a
                      href={waLink(quote.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-300 hover:underline"
                    >
                      {quote.whatsapp}
                    </a>
                    <p className="text-xs text-navy-400">
                      {quote.city || "-"} {quote.state ? `/${quote.state}` : ""}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-navy-300">{quote.compoundSlug}</td>
                  <td className="px-4 py-3 text-navy-300">
                    {quote.pharmacy?.name || "fila manual"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={draft.status || quote.status}
                      onChange={(e) => setDraft(quote.id, "status", e.target.value)}
                      className="rounded-lg border border-navy-600 bg-navy-800 px-2 py-1 text-xs text-white"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={draft.orderValue ?? ""}
                      onChange={(e) =>
                        setDraft(
                          quote.id,
                          "orderValue",
                          e.target.value === "" ? null : Number(e.target.value)
                        )
                      }
                      className="w-24 rounded-lg border border-navy-600 bg-navy-800 px-2 py-1 text-xs text-white"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={draft.commissionValue ?? ""}
                      onChange={(e) =>
                        setDraft(
                          quote.id,
                          "commissionValue",
                          e.target.value === "" ? null : Number(e.target.value)
                        )
                      }
                      className="w-24 rounded-lg border border-navy-600 bg-navy-800 px-2 py-1 text-xs text-white"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="date"
                      value={draft.paidAt ? String(draft.paidAt).slice(0, 10) : ""}
                      onChange={(e) => setDraft(quote.id, "paidAt", e.target.value || null)}
                      className="rounded-lg border border-navy-600 bg-navy-800 px-2 py-1 text-xs text-white"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => save(quote)}
                      className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500"
                    >
                      Salvar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

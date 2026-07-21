"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────

interface Doctor {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  crm: string | null;
  crmState: string | null;
  specialty: string | null;
  city: string | null;
  state: string | null;
  emailVerified: boolean;
  consentLgpd: boolean;
  verified: boolean;
  active: boolean;
  acceptsPartnership: boolean;
  createdAt: string;
}

interface LeadDelivery {
  id: string;
  price: number;
  deliveredAt: string;
  doctor: { name: string };
}

interface Lead {
  id: string;
  name: string | null;
  email: string | null;
  whatsapp: string | null;
  city: string | null;
  state: string | null;
  peptideInterest: string[];
  sourcePage: string;
  contactMethod: string;
  status: string;
  consentDoctorShare: boolean;
  createdAt: string;
  clinic?: { name: string } | null;
  deliveries: LeadDelivery[];
}

// ── Helpers ────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  const colors: Record<string, string> = {
    green: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
    red: "bg-red-900/40 text-red-300 border-red-700/50",
    yellow: "bg-yellow-900/40 text-yellow-300 border-yellow-700/50",
    blue: "bg-blue-900/40 text-blue-300 border-blue-700/50",
    gray: "bg-navy-700/40 text-navy-300 border-navy-600/50",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${colors[color] || colors.gray}`}>
      {children}
    </span>
  );
}

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: "Novo", color: "blue" },
  contacted: { label: "Contactado", color: "yellow" },
  matched: { label: "Conectado", color: "green" },
  converted: { label: "Convertido", color: "green" },
  lost: { label: "Perdido", color: "red" },
};

// ── Component ──────────────────────────────────────────

export default function AdminDoctorsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"doctors" | "leads">("doctors");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctorByLead, setSelectedDoctorByLead] = useState<Record<string, string>>({});
  const [priceByLead, setPriceByLead] = useState<Record<string, string>>({});
  const [deliveryStatus, setDeliveryStatus] = useState<Record<string, string>>({});

  // Filters
  const [filterCity, setFilterCity] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterVerified, setFilterVerified] = useState<"" | "yes" | "no">("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [dRes, lRes] = await Promise.all([
          fetch("/api/admin/doctors"),
          fetch("/api/admin/leads"),
        ]);

        if (dRes.status === 401 || lRes.status === 401) {
          router.push("/admin/login");
          return;
        }

        setDoctors(await dRes.json());
        setLeads(await lRes.json());
      } catch {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  // ── Filtered data ──

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      if (filterCity && !d.city?.toLowerCase().includes(filterCity.toLowerCase())) return false;
      if (filterVerified === "yes" && !d.emailVerified) return false;
      if (filterVerified === "no" && d.emailVerified) return false;
      return true;
    });
  }, [doctors, filterCity, filterVerified]);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (filterCity && !l.city?.toLowerCase().includes(filterCity.toLowerCase())) return false;
      if (filterStatus && l.status !== filterStatus) return false;
      return true;
    });
  }, [leads, filterCity, filterStatus]);

  // ── Unique cities for quick reference ──

  const allCities = useMemo(() => {
    const cities = new Set<string>();
    doctors.forEach((d) => d.city && cities.add(d.city));
    leads.forEach((l) => l.city && cities.add(l.city));
    return Array.from(cities).sort();
  }, [doctors, leads]);

  const eligibleDoctors = useMemo(() => {
    return doctors.filter(
      (d) => d.emailVerified && d.verified && d.active && d.acceptsPartnership
    );
  }, [doctors]);

  // ── Logout ──

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  // ── Export CSV ──

  function handleExport() {
    const type = tab === "doctors" ? "doctors" : "leads";
    window.open(`/api/admin/export?type=${type}`, "_blank");
  }

  async function handleDeliverLead(leadId: string) {
    const doctorId = selectedDoctorByLead[leadId] || eligibleDoctors[0]?.id;
    const price = Number(priceByLead[leadId] || 40);

    if (!doctorId || Number.isNaN(price)) {
      setDeliveryStatus((prev) => ({ ...prev, [leadId]: "Selecione medico e preco" }));
      return;
    }

    setDeliveryStatus((prev) => ({ ...prev, [leadId]: "Enviando..." }));

    try {
      const res = await fetch("/api/admin/leads/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, doctorId, price }),
      });
      const data = await res.json();

      if (!res.ok) {
        setDeliveryStatus((prev) => ({
          ...prev,
          [leadId]: data.error || "Erro ao entregar",
        }));
        return;
      }

      const doctor = doctors.find((d) => d.id === doctorId);
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId
            ? {
                ...lead,
                status: "matched",
                deliveries: [
                  {
                    id: data.delivery.id,
                    price: data.delivery.price,
                    deliveredAt: data.delivery.deliveredAt,
                    doctor: { name: doctor?.name || "Medico" },
                  },
                  ...(lead.deliveries || []),
                ],
              }
            : lead
        )
      );
      setDeliveryStatus((prev) => ({ ...prev, [leadId]: "Entregue" }));
    } catch {
      setDeliveryStatus((prev) => ({ ...prev, [leadId]: "Erro ao entregar" }));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-navy-400">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
          <p className="text-navy-400 text-sm mt-0.5">
            {doctors.length} médicos &middot; {leads.length} leads
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-navy-400 hover:text-white transition-colors"
        >
          Sair
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5">
        <button
          onClick={() => setTab("doctors")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "doctors"
              ? "bg-brand-600 text-white"
              : "bg-navy-800 text-navy-300 hover:bg-navy-700"
          }`}
        >
          Médicos ({doctors.length})
        </button>
        <button
          onClick={() => setTab("leads")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "leads"
              ? "bg-brand-600 text-white"
              : "bg-navy-800 text-navy-300 hover:bg-navy-700"
          }`}
        >
          Leads ({leads.length})
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Filtrar por cidade..."
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-navy-800 border border-navy-600 text-sm text-white placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-brand-500 w-48"
          list="cities-list"
        />
        <datalist id="cities-list">
          {allCities.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        {tab === "doctors" && (
          <select
            value={filterVerified}
            onChange={(e) => setFilterVerified(e.target.value as "" | "yes" | "no")}
            className="px-3 py-1.5 rounded-lg bg-navy-800 border border-navy-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Todos (verificação)</option>
            <option value="yes">Email verificado</option>
            <option value="no">Não verificado</option>
          </select>
        )}

        {tab === "leads" && (
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-navy-800 border border-navy-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Todos os status</option>
            <option value="new">Novo</option>
            <option value="contacted">Contactado</option>
            <option value="matched">Conectado</option>
            <option value="converted">Convertido</option>
            <option value="lost">Perdido</option>
          </select>
        )}

        <button
          onClick={handleExport}
          className="ml-auto px-4 py-1.5 rounded-lg bg-navy-800 border border-navy-600 text-sm text-navy-300 hover:text-white hover:border-navy-500 transition-colors"
        >
          Exportar CSV
        </button>
      </div>

      {/* Doctors Table */}
      {tab === "doctors" && (
        <div className="overflow-x-auto rounded-xl border border-navy-700 bg-navy-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700 text-left">
                <th className="px-4 py-3 text-navy-400 font-medium">Nome</th>
                <th className="px-4 py-3 text-navy-400 font-medium">CRM</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Especialidade</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Cidade/UF</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Email</th>
                <th className="px-4 py-3 text-navy-400 font-medium">WhatsApp</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Verificação</th>
                <th className="px-4 py-3 text-navy-400 font-medium">LGPD</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-navy-500">
                    Nenhum médico encontrado
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((d) => (
                  <tr key={d.id} className="border-b border-navy-800 hover:bg-navy-800/50">
                    <td className="px-4 py-3 text-white font-medium">{d.name}</td>
                    <td className="px-4 py-3 text-navy-300">
                      {d.crm ? `${d.crm}/${d.crmState || "?"}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-navy-300">{d.specialty || "—"}</td>
                    <td className="px-4 py-3 text-navy-300">
                      {d.city || "—"}{d.state ? `/${d.state}` : ""}
                    </td>
                    <td className="px-4 py-3 text-navy-300 text-xs">{d.email}</td>
                    <td className="px-4 py-3 text-navy-300 text-xs">{d.whatsapp || "—"}</td>
                    <td className="px-4 py-3">
                      <Badge color={d.emailVerified ? "green" : "red"}>
                        {d.emailVerified ? "Verificado" : "Pendente"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={d.consentLgpd ? "green" : "gray"}>
                        {d.consentLgpd ? "Sim" : "Não"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-navy-400 text-xs whitespace-nowrap">
                      {formatDate(d.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Leads Table */}
      {tab === "leads" && (
        <div className="overflow-x-auto rounded-xl border border-navy-700 bg-navy-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700 text-left">
                <th className="px-4 py-3 text-navy-400 font-medium">Nome</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Email</th>
                <th className="px-4 py-3 text-navy-400 font-medium">WhatsApp</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Cidade</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Peptídeos</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Origem</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Status</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Criado em</th>
                <th className="px-4 py-3 text-navy-400 font-medium">Entrega</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-navy-500">
                    Nenhum lead encontrado
                  </td>
                </tr>
              ) : (
                filteredLeads.map((l) => (
                  <tr key={l.id} className="border-b border-navy-800 hover:bg-navy-800/50">
                    <td className="px-4 py-3 text-white font-medium">{l.name || "—"}</td>
                    <td className="px-4 py-3 text-navy-300 text-xs">{l.email || "—"}</td>
                    <td className="px-4 py-3 text-navy-300 text-xs">{l.whatsapp || "—"}</td>
                    <td className="px-4 py-3 text-navy-300">
                      {l.city || "—"}{l.state ? `/${l.state}` : ""}
                    </td>
                    <td className="px-4 py-3 text-navy-300 text-xs">
                      {l.peptideInterest.length > 0
                        ? l.peptideInterest.join(", ")
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-navy-400 text-xs max-w-[200px] truncate">
                      {l.sourcePage}
                    </td>
                    <td className="px-4 py-3">
                      {(() => {
                        const s = statusLabels[l.status] || { label: l.status, color: "gray" };
                        return <Badge color={s.color}>{s.label}</Badge>;
                      })()}
                    </td>
                    <td className="px-4 py-3 text-navy-400 text-xs whitespace-nowrap">
                      {formatDate(l.createdAt)}
                    </td>
                    <td className="px-4 py-3 min-w-[280px]">
                      {!l.consentDoctorShare ? (
                        <Badge color="gray">Sem consentimento</Badge>
                      ) : (
                        <div className="space-y-2">
                          {l.deliveries?.length > 0 && (
                            <p className="text-xs text-emerald-300">
                              Entregue: {l.deliveries.map((d) => d.doctor.name).join(", ")}
                            </p>
                          )}
                          <form
                            className="flex flex-wrap items-center gap-2"
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleDeliverLead(l.id);
                            }}
                          >
                            <select
                              value={selectedDoctorByLead[l.id] || eligibleDoctors[0]?.id || ""}
                              onChange={(e) =>
                                setSelectedDoctorByLead((prev) => ({
                                  ...prev,
                                  [l.id]: e.target.value,
                                }))
                              }
                              className="h-8 min-w-36 rounded-lg border border-navy-600 bg-navy-800 px-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                              {eligibleDoctors.length === 0 ? (
                                <option value="">Sem medicos</option>
                              ) : (
                                eligibleDoctors.map((doctor) => (
                                  <option key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                  </option>
                                ))
                              )}
                            </select>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={priceByLead[l.id] ?? "40"}
                              onChange={(e) =>
                                setPriceByLead((prev) => ({
                                  ...prev,
                                  [l.id]: e.target.value,
                                }))
                              }
                              className="h-8 w-20 rounded-lg border border-navy-600 bg-navy-800 px-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                            <button
                              type="submit"
                              disabled={eligibleDoctors.length === 0}
                              className="h-8 rounded-lg bg-brand-600 px-3 text-xs font-medium text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Enviar
                            </button>
                          </form>
                          {deliveryStatus[l.id] && (
                            <p className="text-xs text-navy-300">{deliveryStatus[l.id]}</p>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer count */}
      <p className="text-navy-500 text-xs mt-3">
        Exibindo {tab === "doctors" ? filteredDoctors.length : filteredLeads.length} de{" "}
        {tab === "doctors" ? doctors.length : leads.length} registros
      </p>
    </div>
  );
}

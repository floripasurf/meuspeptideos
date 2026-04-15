import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDate(d: Date | string | null): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("pt-BR") + " " + date.toLocaleTimeString("pt-BR");
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get("type");

  if (type === "doctors") {
    const doctors = await prisma.doctor.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Nome", "Email", "WhatsApp", "CRM", "UF CRM", "Especialidade",
      "Cidade", "Estado", "Peptídeos", "Exp. Anos", "Email Verificado",
      "LGPD", "Verificado Admin", "Ativo", "Criado em",
    ];

    const rows = doctors.map((d) => [
      d.name, d.email, d.whatsapp, d.crm, d.crmState, d.specialty,
      d.city, d.state, d.peptidesPrescribed.join("; "), d.yearsExperience,
      d.emailVerified ? "Sim" : "Não", d.consentLgpd ? "Sim" : "Não",
      d.verified ? "Sim" : "Não", d.active ? "Sim" : "Não",
      formatDate(d.createdAt),
    ]);

    const csv = [
      headers.map(escapeCsv).join(","),
      ...rows.map((r) => r.map(escapeCsv).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="medicos-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  if (type === "leads") {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Nome", "Email", "WhatsApp", "Cidade", "Estado",
      "Peptídeos Interesse", "Página Origem", "Método Contato",
      "Status", "Criado em",
    ];

    const rows = leads.map((l) => [
      l.name, l.email, l.whatsapp, l.city, l.state,
      l.peptideInterest.join("; "), l.sourcePage, l.contactMethod,
      l.status, formatDate(l.createdAt),
    ]);

    const csv = [
      headers.map(escapeCsv).join(","),
      ...rows.map((r) => r.map(escapeCsv).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
}

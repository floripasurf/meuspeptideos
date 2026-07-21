# Receita Imediata — Implementation Plan

> **SUPERADO EM 2026-07-21:** os fluxos de comissão farmacêutica, venda de leads médicos e ranking pago foram desativados após revisão regulatória. Não reativar sem parecer jurídico escrito. O plano vigente está em `docs/monetizacao/2026-07-21-plano-validacao-90-dias.md`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Ativar as 3 fontes de receita imediata do Meus Peptídeos: (A) orçamentos comissionados com farmácias de manipulação, (B) venda de leads para médicos cadastrados, (C) diretório premium de clínicas nas páginas locais.

**Architecture:** Tudo dentro do app Next.js existente (`app/`). Novos modelos Prisma (`Pharmacy`, `QuoteRequest`, `LeadDelivery` + campos públicos em `Clinic`), uma API de orçamento com roteamento por matching puro (testável), formulário client-side no CTA "compounding" já existente das páginas de peptídeo, e extensões do admin protegido por senha que já existe. E-mails via Resend seguindo o padrão de `src/lib/email.ts`.

**Tech Stack:** Next.js 16 (App Router, Turbopack), Prisma 7 (`prisma-client` generator, output custom `src/generated/prisma`), Neon Postgres, Resend, Tailwind 4, Vitest (já configurado, só para lógica pura).

## Execution Status — 2026-07-21

Implementado, commitado e pushado em `main`.

- Commits principais: `3955a82`, `e73e6e6`, `cf51cfe`, `969d461`, `0e0f157`, `647b168`, `3411fd2`, `e7425f6`.
- Migration aplicada em produção: `20260721123000_lead_doctor_share_consent`; `npx prisma migrate status` retornou `Database schema is up to date!`.
- Env de produção adicionado: `ADMIN_EMAIL`.
- Deploy de produção: `dpl_4mPUBZdvgLye9FkkC7PtnpBYkg4v`, URL Vercel `https://meuspeptideoscom-pimwnsjfr-floripasurfs-projects.vercel.app`, alias principal validado em `https://meuspeptideos.com.br`.
- Smoke produção validado: `/pt/para-clinicas`, `/pt/peptideo/bpc-157`, `/pt/semaglutida/sao-paulo`, honeypot de `/api/orcamento`, validação de consentimento, POST válido de orçamento e POST válido de lead com limpeza dos registros de teste.
- Observação operacional: `vercel inspect` também mostra o alias `https://pulse-rh.vercel.app` preso a este projeto/deployment. Não removido nesta execução para evitar impacto fora do escopo; vale revisar no Vercel.

## Global Constraints

- **Working dir:** `/Users/raphaellages/projects/meuspeptideos/meuspeptideos/app` (todos os paths abaixo são relativos a ele).
- **Prisma 7:** migrations interativas falham — criar manualmente em `prisma/migrations/{timestamp}_{name}/migration.sql` e rodar `npx prisma migrate deploy`.
- **Regra de índice em migration:** índice que depende de coluna NOVA vem DEPOIS do `ALTER TABLE`, nunca junto do batch de `CREATE TABLE` (incidente Finep 2026-06-03).
- **Copy compliance:** páginas informacionais não usam "comprar/vender/tratar". O formulário de orçamento usa exclusivamente "solicitar orçamento" + aviso de prescrição obrigatória. Farmácia de manipulação não pode ser anunciada com preço/produto (RDC 67/2007) — o site capta a intenção e encaminha; quem orça é a farmácia.
- **LGPD:** todo form que compartilha dados com terceiro (farmácia/médico) exige checkbox de consentimento explícito, gravado com timestamp implícito (`createdAt`) e IP.
- **Tailwind 4:** classes custom `@theme inline` não fazem bundle no Vercel — gradientes via classes padrão (`bg-gradient-to-br from-blue-50 to-white`), como o código existente já faz.
- **Deploy:** manual — `npx vercel --yes --prod`. ANTES de qualquer deploy/env: `cat .vercel/project.json` e confirmar `"projectName":"meuspeptideos.com.br"` (esta pasta já esteve linkada por engano ao projeto do Chamei).
- **Git:** commit + push após cada task (regra global do Raphael).
- **Strings:** componentes novos com copy hardcoded em PT-BR (padrão do `LocalLeadForm`); dicionários i18n ficam para depois (YAGNI).
- **Env pendente:** `ADMIN_EMAIL` precisa existir em produção para os alertas (Task 10 cobre).
- **Estado atual do repo em 2026-07-21:** plano implementado. Leads antigos sem `consentDoctorShare=true` continuam inelegíveis para entrega a médicos.

## File Structure

```
app/
├── prisma/
│   ├── schema.prisma                          (modify: +Pharmacy, +QuoteRequest, +QuoteStatus, +LeadDelivery, Clinic público)
│   └── migrations/20260721120000_revenue_models/migration.sql   (create)
├── vitest.config.ts                           (create)
├── src/
│   ├── lib/
│   │   ├── quote-routing.ts                   (create: matching puro farmácia×pedido)
│   │   ├── quote-routing.test.ts              (create)
│   │   └── email.ts                           (modify: +3 funções)
│   ├── components/
│   │   ├── quote-request-form.tsx             (create: form de orçamento)
│   │   └── clinic-directory.tsx               (create: bloco de clínicas premium)
│   ├── app/
│   │   ├── api/
│   │   │   ├── orcamento/route.ts             (create: POST público)
│   │   │   └── admin/
│   │   │       ├── quotes/route.ts            (create: GET list + PATCH status/comissão)
│   │   │       ├── pharmacies/route.ts        (create: GET/POST/PATCH)
│   │   │       └── leads/deliver/route.ts     (create: POST entrega lead→médico)
│   │   ├── admin/
│   │   │   ├── quotes/page.tsx                (create: pipeline de orçamentos)
│   │   │   └── pharmacies/page.tsx            (create: CRUD farmácias)
│   │   └── [lang]/
│   │       ├── peptideo/[slug]/page.tsx       (modify: CTA compounding → QuoteRequestForm)
│   │       ├── [peptide]/[city]/page.tsx      (modify: +ClinicDirectory)
│   │       └── para-clinicas/page.tsx         (create: venda do diretório)
```

Fases: Tasks 1–2 são fundação; Tasks 3–6 = Receita A (farmácias); Task 7 = Receita B (médicos); Tasks 8–9 = Receita C (diretório); Task 10 = deploy/validação. Receitas A, B e C são independentes entre si após a Task 2.

---

### Task 1: Vitest para lógica pura — DONE

**Files:**
- Modify: `package.json` (script `test`)
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: comando `npm test` (usado nas Tasks 3+).

- [x] **Step 1: Instalar e configurar**

```bash
cd /Users/raphaellages/projects/meuspeptideos/meuspeptideos/app
npm install -D vitest
```

Criar `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
```

Em `package.json`, adicionar em `"scripts"`: `"test": "vitest run"`.

- [x] **Step 2: Smoke test roda (e falha por não haver testes — ok)**

Run: `npm test`
Expected: `No test files found` (exit não-zero é aceitável neste passo; Task 3 cria o primeiro teste).

- [x] **Step 3: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest for pure-logic tests"
```

---

### Task 2: Modelos de receita no schema + migration manual — DONE

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/20260721120000_revenue_models/migration.sql`

**Interfaces:**
- Produces: modelos Prisma `Pharmacy`, `QuoteRequest` (enum `QuoteStatus`), `LeadDelivery`; campos novos em `Clinic`: `isPublic: boolean`, `premiumUntil: DateTime?`, `bookingUrl: string?`. Relações: `Lead.deliveries`, `Doctor.deliveries`.

- [x] **Step 1: Adicionar ao `prisma/schema.prisma`**

Novos modelos (colocar após `model Clinic`):

```prisma
// Farmácias de manipulação parceiras — recebem pedidos de orçamento, pagam comissão
model Pharmacy {
  id              String   @id @default(cuid())
  name            String
  slug            String   @unique
  email           String // recebe os pedidos de orçamento
  whatsapp        String?
  city            String?
  state           String?
  shipsNationwide Boolean  @default(true)
  compounds       String[] // slugs que manipula; vazio = todos
  commissionPct   Float    @default(10) // % sobre pedido convertido
  leadPrice       Float? // alternativa: preço fixo por lead (R$)
  isActive        Boolean  @default(true)
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  quotes          QuoteRequest[]
}

model QuoteRequest {
  id              String      @id @default(cuid())
  name            String
  email           String?
  whatsapp        String
  city            String?
  state           String?
  compoundSlug    String
  hasPrescription Boolean     @default(false)
  message         String?
  sourcePage      String
  consentLgpd     Boolean     @default(false)
  submittedFromIp String?
  status          QuoteStatus @default(new)
  pharmacyId      String?
  pharmacy        Pharmacy?   @relation(fields: [pharmacyId], references: [id])
  sentAt          DateTime?
  orderValue      Float? // valor do pedido reportado pela farmácia
  commissionValue Float? // comissão devida/registrada
  paidAt          DateTime? // comissão recebida
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

enum QuoteStatus {
  new
  sent
  quoted
  converted
  paid
  lost
}

// Entrega de lead a um médico (Receita B) — registro de cobrança
model LeadDelivery {
  id          String    @id @default(cuid())
  leadId      String
  lead        Lead      @relation(fields: [leadId], references: [id])
  doctorId    String
  doctor      Doctor    @relation(fields: [doctorId], references: [id])
  price       Float // R$ combinado por lead
  deliveredAt DateTime  @default(now())
  paidAt      DateTime?
  notes       String?

  @@unique([leadId, doctorId])
}
```

Em `model Lead`, adicionar a linha: `deliveries LeadDelivery[]`
Em `model Doctor`, adicionar a linha: `deliveries LeadDelivery[]`
Em `model Clinic`, adicionar:

```prisma
  isPublic     Boolean   @default(false) // aparece no diretório público
  premiumUntil DateTime? // assinatura de destaque ativa até
  bookingUrl   String? // link de agendamento exibido no diretório
```

- [x] **Step 2: Criar a migration manual**

`prisma/migrations/20260721120000_revenue_models/migration.sql`:

```sql
-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('new', 'sent', 'quoted', 'converted', 'paid', 'lost');

-- CreateTable
CREATE TABLE "Pharmacy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "city" TEXT,
    "state" TEXT,
    "shipsNationwide" BOOLEAN NOT NULL DEFAULT true,
    "compounds" TEXT[],
    "commissionPct" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "leadPrice" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Pharmacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "whatsapp" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "compoundSlug" TEXT NOT NULL,
    "hasPrescription" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "sourcePage" TEXT NOT NULL,
    "consentLgpd" BOOLEAN NOT NULL DEFAULT false,
    "submittedFromIp" TEXT,
    "status" "QuoteStatus" NOT NULL DEFAULT 'new',
    "pharmacyId" TEXT,
    "sentAt" TIMESTAMP(3),
    "orderValue" DOUBLE PRECISION,
    "commissionValue" DOUBLE PRECISION,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadDelivery" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deliveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),
    "notes" TEXT,
    CONSTRAINT "LeadDelivery_pkey" PRIMARY KEY ("id")
);

-- AlterTable (colunas novas SEMPRE antes dos índices que dependem delas)
ALTER TABLE "Clinic" ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Clinic" ADD COLUMN "premiumUntil" TIMESTAMP(3);
ALTER TABLE "Clinic" ADD COLUMN "bookingUrl" TEXT;

-- Indexes (depois de todos os CREATE/ALTER)
CREATE UNIQUE INDEX "Pharmacy_slug_key" ON "Pharmacy"("slug");
CREATE UNIQUE INDEX "LeadDelivery_leadId_doctorId_key" ON "LeadDelivery"("leadId", "doctorId");
CREATE INDEX "QuoteRequest_status_idx" ON "QuoteRequest"("status");
CREATE INDEX "QuoteRequest_pharmacyId_idx" ON "QuoteRequest"("pharmacyId");

-- FKs
ALTER TABLE "QuoteRequest" ADD CONSTRAINT "QuoteRequest_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "Pharmacy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LeadDelivery" ADD CONSTRAINT "LeadDelivery_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "LeadDelivery" ADD CONSTRAINT "LeadDelivery_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```

- [x] **Step 3: Aplicar e regenerar**

Run:
```bash
npx prisma migrate deploy && npx prisma generate && npx tsc --noEmit
```
Expected: migration `20260721120000_revenue_models` aplicada; generate ok; tsc sem erros.

- [x] **Step 4: Verificar no banco**

Run: `npx prisma db execute --stdin <<< "SELECT count(*) FROM \"Pharmacy\";"`
Expected: retorna 0 sem erro (tabela existe).

- [x] **Step 5: Commit**

```bash
git add prisma/
git commit -m "feat(db): Pharmacy, QuoteRequest, LeadDelivery models + public Clinic fields"
git push
```

---

### Task 3: Roteamento de orçamento (lógica pura, TDD)

**Files:**
- Create: `src/lib/quote-routing.ts`
- Test: `src/lib/quote-routing.test.ts`

**Interfaces:**
- Produces: `matchPharmacies(pharmacies: PharmacyMatchInput[], compoundSlug: string, state: string | null, limit?: number): PharmacyMatchInput[]` e o tipo `PharmacyMatchInput = { id: string; state: string | null; shipsNationwide: boolean; compounds: string[]; isActive: boolean }`. Usado pela Task 5.

Regras de negócio: só ativas; `compounds` vazio = manipula tudo; mesmo estado primeiro; depois quem envia nacionalmente; máx. `limit` (default **2** — lead exclusivo demais não cria competição, espalhado demais vira spam e desvaloriza).

- [x] **Step 1: Escrever os testes (falhando)**

`src/lib/quote-routing.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { matchPharmacies, type PharmacyMatchInput } from "./quote-routing";

const ph = (over: Partial<PharmacyMatchInput>): PharmacyMatchInput => ({
  id: over.id ?? "x",
  state: over.state ?? null,
  shipsNationwide: over.shipsNationwide ?? true,
  compounds: over.compounds ?? [],
  isActive: over.isActive ?? true,
});

describe("matchPharmacies", () => {
  it("exclui inativas", () => {
    const out = matchPharmacies([ph({ id: "a", isActive: false })], "bpc-157", "SP");
    expect(out).toEqual([]);
  });

  it("exclui quem não manipula o composto (compounds não-vazio)", () => {
    const out = matchPharmacies(
      [ph({ id: "a", compounds: ["semaglutida"] }), ph({ id: "b", compounds: [] })],
      "bpc-157",
      "SP"
    );
    expect(out.map((p) => p.id)).toEqual(["b"]);
  });

  it("prioriza mesmo estado, depois envio nacional", () => {
    const out = matchPharmacies(
      [
        ph({ id: "nacional", state: "PR", shipsNationwide: true }),
        ph({ id: "local", state: "SP", shipsNationwide: false }),
      ],
      "bpc-157",
      "SP"
    );
    expect(out.map((p) => p.id)).toEqual(["local", "nacional"]);
  });

  it("exclui de outro estado sem envio nacional", () => {
    const out = matchPharmacies(
      [ph({ id: "a", state: "PR", shipsNationwide: false })],
      "bpc-157",
      "SP"
    );
    expect(out).toEqual([]);
  });

  it("limita a 2 por padrão", () => {
    const out = matchPharmacies(
      [ph({ id: "a" }), ph({ id: "b" }), ph({ id: "c" })],
      "bpc-157",
      null
    );
    expect(out).toHaveLength(2);
  });

  it("sem estado do lead: qualquer ativa com envio nacional serve", () => {
    const out = matchPharmacies(
      [ph({ id: "a", state: "PR", shipsNationwide: true })],
      "bpc-157",
      null
    );
    expect(out.map((p) => p.id)).toEqual(["a"]);
  });
});
```

- [x] **Step 2: Rodar e ver falhar**

Run: `npm test`
Expected: FAIL — `Cannot find module './quote-routing'`.

- [x] **Step 3: Implementar**

`src/lib/quote-routing.ts`:

```ts
export type PharmacyMatchInput = {
  id: string;
  state: string | null;
  shipsNationwide: boolean;
  compounds: string[];
  isActive: boolean;
};

/**
 * Seleciona as farmácias que recebem um pedido de orçamento.
 * Mesmo estado primeiro; depois envio nacional. Máx `limit` (default 2).
 */
export function matchPharmacies<T extends PharmacyMatchInput>(
  pharmacies: T[],
  compoundSlug: string,
  state: string | null,
  limit = 2
): T[] {
  return pharmacies
    .filter((p) => p.isActive)
    .filter((p) => p.compounds.length === 0 || p.compounds.includes(compoundSlug))
    .filter((p) => p.shipsNationwide || (state !== null && p.state === state))
    .sort((a, b) => {
      const aLocal = state !== null && a.state === state ? 0 : 1;
      const bLocal = state !== null && b.state === state ? 0 : 1;
      return aLocal - bLocal;
    })
    .slice(0, limit);
}
```

- [x] **Step 4: Rodar e ver passar**

Run: `npm test`
Expected: 6 passed.

- [x] **Step 5: Commit**

```bash
git add src/lib/quote-routing.ts src/lib/quote-routing.test.ts
git commit -m "feat: pharmacy matching logic for quote routing"
```

---

### Task 4: E-mails de orçamento e entrega de lead

**Files:**
- Modify: `src/lib/email.ts` (append ao final)

**Interfaces:**
- Consumes: `resend`, `FROM`, `ADMIN_EMAIL`, `SITE_URL` já definidos no topo de `email.ts`.
- Produces: `sendQuoteToPharmacy(pharmacyEmail: string, pharmacyName: string, quote: QuoteEmailData)`, `sendQuoteAdminAlert(quote: QuoteEmailData, routedTo: string[])`, `sendLeadToDoctor(doctorEmail: string, doctorName: string, lead: LeadEmailData)`. Tipos exportados `QuoteEmailData`, `LeadEmailData`. Usados nas Tasks 5 e 7.

- [x] **Step 1: Implementar (append em `src/lib/email.ts`)**

```ts
export type QuoteEmailData = {
  id: string;
  name: string;
  email: string | null;
  whatsapp: string;
  city: string | null;
  state: string | null;
  compoundSlug: string;
  hasPrescription: boolean;
  message: string | null;
};

export async function sendQuoteToPharmacy(
  pharmacyEmail: string,
  pharmacyName: string,
  quote: QuoteEmailData
) {
  if (!resend) return { ok: false as const, reason: "no-resend" };
  const { error } = await resend.emails.send({
    from: FROM,
    to: pharmacyEmail,
    subject: `Novo pedido de orçamento — ${quote.compoundSlug} (${quote.city ?? "cidade n/i"})`,
    html: `
      <h2>Novo pedido de orçamento via Meus Peptídeos</h2>
      <p>Olá, ${pharmacyName}. Um interessado pediu orçamento:</p>
      <ul>
        <li><b>Composto:</b> ${quote.compoundSlug}</li>
        <li><b>Nome:</b> ${quote.name}</li>
        <li><b>WhatsApp:</b> ${quote.whatsapp}</li>
        <li><b>E-mail:</b> ${quote.email ?? "não informado"}</li>
        <li><b>Cidade/UF:</b> ${quote.city ?? "n/i"} / ${quote.state ?? "n/i"}</li>
        <li><b>Tem receita:</b> ${quote.hasPrescription ? "Sim" : "Ainda não"}</li>
        ${quote.message ? `<li><b>Mensagem:</b> ${quote.message}</li>` : ""}
      </ul>
      <p>Responda em até 24h — leads respondidos rápido convertem mais.</p>
      <p style="color:#888;font-size:12px">Ref: ${quote.id} · Parceria Meus Peptídeos (${SITE_URL})</p>
    `,
  });
  return error ? { ok: false as const, reason: error.message } : { ok: true as const };
}

export async function sendQuoteAdminAlert(quote: QuoteEmailData, routedTo: string[]) {
  if (!resend || !ADMIN_EMAIL) return { ok: false as const, reason: "no-admin-email" };
  const { error } = await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[MP] Orçamento: ${quote.compoundSlug} → ${routedTo.length ? routedTo.join(", ") : "SEM FARMÁCIA (fila manual)"}`,
    html: `<p>${quote.name} (${quote.whatsapp}) pediu orçamento de <b>${quote.compoundSlug}</b> em ${quote.city ?? "?"}/${quote.state ?? "?"}. Roteado para: ${routedTo.join(", ") || "ninguém — cadastrar farmácia parceira!"}</p><p>Admin: ${SITE_URL}/admin/quotes</p>`,
  });
  return error ? { ok: false as const, reason: error.message } : { ok: true as const };
}

export type LeadEmailData = {
  name: string | null;
  email: string | null;
  whatsapp: string | null;
  city: string | null;
  state: string | null;
  peptideInterest: string[];
  sourcePage: string;
};

export async function sendLeadToDoctor(
  doctorEmail: string,
  doctorName: string,
  lead: LeadEmailData
) {
  if (!resend) return { ok: false as const, reason: "no-resend" };
  const { error } = await resend.emails.send({
    from: FROM,
    to: doctorEmail,
    subject: `Novo paciente interessado — ${lead.peptideInterest.join(", ") || "peptídeos"} (${lead.city ?? "cidade n/i"})`,
    html: `
      <h2>Indicação de paciente via Meus Peptídeos</h2>
      <p>Dr(a). ${doctorName}, um paciente da sua região demonstrou interesse:</p>
      <ul>
        <li><b>Nome:</b> ${lead.name ?? "não informado"}</li>
        <li><b>WhatsApp:</b> ${lead.whatsapp ?? "não informado"}</li>
        <li><b>E-mail:</b> ${lead.email ?? "não informado"}</li>
        <li><b>Cidade/UF:</b> ${lead.city ?? "n/i"} / ${lead.state ?? "n/i"}</li>
        <li><b>Interesse:</b> ${lead.peptideInterest.join(", ") || "n/i"}</li>
      </ul>
      <p>Recomendamos contato em até 24h. Este paciente consentiu (LGPD) em ser contatado por um médico parceiro.</p>
      <p style="color:#888;font-size:12px">Parceria Meus Peptídeos (${SITE_URL})</p>
    `,
  });
  return error ? { ok: false as const, reason: error.message } : { ok: true as const };
}
```

- [x] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [x] **Step 3: Commit**

```bash
git add src/lib/email.ts
git commit -m "feat: quote + lead-delivery email templates"
```

---

### Task 5: API pública `POST /api/orcamento`

**Files:**
- Create: `src/app/api/orcamento/route.ts`

**Interfaces:**
- Consumes: `matchPharmacies` (Task 3), `sendQuoteToPharmacy`/`sendQuoteAdminAlert` (Task 4), `checkRateLimit(ip, endpoint, max, windowMin)` e `getClientIp(headers)` de `src/lib/rate-limit.ts`.
- Produces: endpoint `POST /api/orcamento` com body `{ name, whatsapp, email?, city?, state?, compoundSlug, hasPrescription?, message?, sourcePage?, consentLgpd, website? }`. Usado pelo form da Task 6.

- [x] **Step 1: Implementar**

`src/app/api/orcamento/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { matchPharmacies } from "@/lib/quote-routing";
import { sendQuoteToPharmacy, sendQuoteAdminAlert } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const body = await request.json();

    // Honeypot: campo invisível preenchido = bot. Finge sucesso.
    if (body.website) return NextResponse.json({ message: "ok" });

    const { name, whatsapp, email, city, state, compoundSlug, hasPrescription, message, sourcePage, consentLgpd } = body;

    if (!name || !whatsapp || !compoundSlug) {
      return NextResponse.json({ error: "Nome, WhatsApp e composto são obrigatórios" }, { status: 400 });
    }
    if (!consentLgpd) {
      return NextResponse.json({ error: "É necessário autorizar o compartilhamento com a farmácia parceira" }, { status: 400 });
    }

    const rl = await checkRateLimit(ip, "orcamento", 5, 60);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Muitas solicitações. Tente novamente em 1 hora." }, { status: 429 });
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        name: String(name).trim(),
        whatsapp: String(whatsapp).trim(),
        email: email ? String(email).toLowerCase().trim() : null,
        city: city || null,
        state: state || null,
        compoundSlug,
        hasPrescription: Boolean(hasPrescription),
        message: message ? String(message).slice(0, 1000) : null,
        sourcePage: sourcePage || "unknown",
        consentLgpd: true,
        submittedFromIp: ip,
      },
    });

    const pharmacies = await prisma.pharmacy.findMany({ where: { isActive: true } });
    const matched = matchPharmacies(pharmacies, compoundSlug, state || null);

    const emailData = { id: quote.id, name: quote.name, email: quote.email, whatsapp: quote.whatsapp, city: quote.city, state: quote.state, compoundSlug: quote.compoundSlug, hasPrescription: quote.hasPrescription, message: quote.message };

    for (const ph of matched) {
      await sendQuoteToPharmacy(ph.email, ph.name, emailData);
    }
    if (matched.length > 0) {
      await prisma.quoteRequest.update({
        where: { id: quote.id },
        data: { status: "sent", sentAt: new Date(), pharmacyId: matched[0].id },
      });
    }
    await sendQuoteAdminAlert(emailData, matched.map((p) => p.name));

    return NextResponse.json({ message: "Pedido enviado! A farmácia parceira responde em até 24h no seu WhatsApp." });
  } catch (e) {
    console.error("Quote request error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
```

Nota: no estado atual do repo, `checkRateLimit` já grava `RateLimitEntry` quando permite a requisição. Não adicionar `prisma.rateLimitEntry.create` nesta rota, senão cada orçamento conta duas vezes contra o limite.

- [x] **Step 2: Verificação manual local**

```bash
npm run dev &
sleep 8
# honeypot -> finge ok, não cria registro
curl -s -X POST localhost:3000/api/orcamento -H 'Content-Type: application/json' -d '{"website":"spam"}'
# sem consentimento -> 400
curl -s -X POST localhost:3000/api/orcamento -H 'Content-Type: application/json' -d '{"name":"Teste","whatsapp":"48999990000","compoundSlug":"bpc-157"}'
# válido -> 200
curl -s -X POST localhost:3000/api/orcamento -H 'Content-Type: application/json' -d '{"name":"Teste","whatsapp":"48999990000","compoundSlug":"bpc-157","state":"SC","consentLgpd":true,"sourcePage":"/pt/peptideo/bpc-157"}'
```
Expected: `{"message":"ok"}`, depois erro 400 de consentimento, depois mensagem de sucesso. Conferir: `npx prisma db execute --stdin <<< "SELECT name, status FROM \"QuoteRequest\" ORDER BY \"createdAt\" DESC LIMIT 1;"` → `Teste | new` (sem farmácia cadastrada ainda → status `new`).

- [x] **Step 3: Commit**

```bash
git add src/app/api/orcamento/route.ts
git commit -m "feat: public quote-request endpoint with pharmacy routing"
```

---

### Task 6: Formulário de orçamento no CTA "compounding"

**Files:**
- Create: `src/components/quote-request-form.tsx`
- Modify: `src/app/[lang]/peptideo/[slug]/page.tsx` (bloco `if (info.type === "compounding")`, ~linha 1085)

**Interfaces:**
- Consumes: `POST /api/orcamento` (Task 5).
- Produces: `<QuoteRequestForm compoundSlug={slug} compoundName={name} sourcePage={string} />`.

- [x] **Step 1: Criar o componente**

`src/components/quote-request-form.tsx` (padrão do `local-lead-form.tsx`: client component, useState, fetch):

```tsx
"use client";

import { useState } from "react";

const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

type Props = { compoundSlug: string; compoundName: string; sourcePage: string };

export function QuoteRequestForm({ compoundSlug, compoundName, sourcePage }: Props) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [state, setState] = useState("");
  const [hasPrescription, setHasPrescription] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const website = String(formData.get("website") || "");
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, state: state || null, compoundSlug, hasPrescription, consentLgpd: consent, sourcePage, website }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
        Pedido enviado! Uma farmácia de manipulação parceira responde no seu WhatsApp em até 24h.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-3">
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className="rounded-xl border border-blue-200 px-4 py-3 text-sm" />
        <input required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp (com DDD)" className="rounded-xl border border-blue-200 px-4 py-3 text-sm" />
      </div>
      <select value={state} onChange={(e) => setState(e.target.value)} className="w-full rounded-xl border border-blue-200 px-4 py-3 text-sm text-navy-600">
        <option value="">Estado (opcional)</option>
        {UFS.map((uf) => (<option key={uf} value={uf}>{uf}</option>))}
      </select>
      <label className="flex items-start gap-2 text-xs text-navy-600">
        <input type="checkbox" checked={hasPrescription} onChange={(e) => setHasPrescription(e.target.checked)} className="mt-0.5" />
        Já tenho prescrição médica para {compoundName}
      </label>
      <label className="flex items-start gap-2 text-xs text-navy-600">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
        Autorizo o envio dos meus dados a uma farmácia de manipulação parceira para receber um orçamento (LGPD).
      </label>
      <button type="submit" disabled={status === "loading"} className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-60 sm:w-auto">
        {status === "loading" ? "Enviando..." : "Solicitar orçamento sem custo pelo site"}
      </button>
      {status === "error" && <p className="text-xs text-red-600">Erro ao enviar. Tente novamente.</p>}
      <p className="text-[11px] leading-relaxed text-navy-400">
        Manipulados exigem prescrição médica. Se você ainda não tem, procure avaliação com um profissional habilitado antes de solicitar a manipulação.
      </p>
    </form>
  );
}
```

- [x] **Step 2: Integrar na página de peptídeo**

Em `src/app/[lang]/peptideo/[slug]/page.tsx`:
1. Adicionar import no topo: `import { QuoteRequestForm } from "@/components/quote-request-form";`
2. No bloco `if (info.type === "compounding")`, substituir o `<div className="mt-5">…</div>` que contém o link `href={`/${lang}/para-medicos`}` por:

```tsx
        <div className="mt-5">
          <QuoteRequestForm
            compoundSlug={slug}
            compoundName={name}
            sourcePage={`/${lang}/peptideo/${slug}`}
          />
        </div>
```

(As variáveis `slug`, `name` e `lang` já são props do componente `PurchaseSection` — conferir os nomes exatos na assinatura, ~linha 1030.)

- [x] **Step 3: Verificar build + manual**

Run: `npm run build`
Expected: sem erros. Depois `npm run dev`, abrir `localhost:3000/pt/peptideo/bpc-157`, preencher o form, verificar registro novo em `QuoteRequest`.

- [x] **Step 4: Commit**

```bash
git add src/components/quote-request-form.tsx "src/app/[lang]/peptideo/[slug]/page.tsx"
git commit -m "feat: quote request form on compounding CTA"
git push
```

---

### Task 7: Receita B — entrega de leads a médicos (admin)

**Files:**
- Modify: `prisma/schema.prisma` (`Lead` + consentimento de compartilhamento)
- Create: `prisma/migrations/20260721123000_lead_doctor_share_consent/migration.sql`
- Modify: `src/components/local-lead-form.tsx`
- Modify: `src/app/api/lead/route.ts`
- Create: `src/app/api/admin/leads/deliver/route.ts`
- Modify: `src/app/admin/doctors/page.tsx` (seção de leads: adicionar coluna/ação "Enviar a médico")

**Interfaces:**
- Consumes: `isAuthenticated()` de `src/lib/admin-auth.ts`; `sendLeadToDoctor` (Task 4).
- Produces: `POST /api/admin/leads/deliver` body `{ leadId: string, doctorId: string, price: number }` → só entrega leads com consentimento explícito, cria `LeadDelivery`, envia e-mail, marca `Lead.status = "matched"`.

- [x] **Step 0: Consentimento explícito para vender/entregar lead médico**

Adicionar ao `model Lead`:

```prisma
  consentDoctorShare   Boolean   @default(false) // autorizou compartilhar dados com médico parceiro
  consentDoctorShareAt DateTime?
  submittedFromIp      String?

  @@index([submittedFromIp, createdAt])
```

Criar migration manual:

```sql
ALTER TABLE "Lead" ADD COLUMN "consentDoctorShare" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Lead" ADD COLUMN "consentDoctorShareAt" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN "submittedFromIp" TEXT;
CREATE INDEX "Lead_submittedFromIp_createdAt_idx" ON "Lead"("submittedFromIp", "createdAt");
```

Atualizar `src/components/local-lead-form.tsx`:
- adicionar checkbox obrigatório: "Autorizo o compartilhamento dos meus dados com um médico parceiro para contato sobre esta solicitação."
- enviar `consentDoctorShare: true` no body do `POST /api/lead`;
- ajustar o texto final para não dizer "Não compartilhamos com terceiros sem sua autorização" sem coletar autorização.

Atualizar `src/app/api/lead/route.ts`:
- usar `getClientIp(request.headers)`;
- recusar `400` se `consentDoctorShare !== true`;
- gravar `consentDoctorShare: true`, `consentDoctorShareAt: new Date()`, `submittedFromIp: ip`;
- considerar `checkRateLimit(ip, "lead_capture", 5, 60)` para alinhar com os endpoints públicos existentes.

**Importante:** leads antigos com `consentDoctorShare=false` não podem ser vendidos/entregues a médicos. Eles podem continuar existindo como demanda agregada, mas não como lead individual compartilhável.

- [x] **Step 1: API de entrega**

`src/app/api/admin/leads/deliver/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/admin-auth";
import { sendLeadToDoctor } from "@/lib/email";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  try {
    const { leadId, doctorId, price } = await request.json();
    if (!leadId || !doctorId || typeof price !== "number" || price < 0) {
      return NextResponse.json({ error: "leadId, doctorId e price são obrigatórios" }, { status: 400 });
    }

    const [lead, doctor] = await Promise.all([
      prisma.lead.findUnique({ where: { id: leadId } }),
      prisma.doctor.findUnique({ where: { id: doctorId } }),
    ]);
    if (!lead || !doctor) return NextResponse.json({ error: "Lead ou médico não encontrado" }, { status: 404 });
    if (!lead.consentDoctorShare) {
      return NextResponse.json({ error: "Lead sem consentimento explícito para compartilhamento" }, { status: 400 });
    }
    if (!doctor.emailVerified || !doctor.verified || !doctor.active || !doctor.acceptsPartnership) {
      return NextResponse.json({ error: "Médico não verificado/ativo ou sem parceria ativa" }, { status: 400 });
    }

    const delivery = await prisma.leadDelivery.create({
      data: { leadId, doctorId, price },
    });

    const sent = await sendLeadToDoctor(doctor.email, doctor.name, {
      name: lead.name, email: lead.email, whatsapp: lead.whatsapp,
      city: lead.city, state: lead.state,
      peptideInterest: lead.peptideInterest, sourcePage: lead.sourcePage,
    });

    await prisma.lead.update({ where: { id: leadId }, data: { status: "matched" } });

    return NextResponse.json({ delivery, emailSent: sent.ok });
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "code" in e && (e as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "Este lead já foi entregue a este médico" }, { status: 409 });
    }
    console.error("Lead delivery error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
```

- [x] **Step 2: UI no admin**

Em `src/app/admin/doctors/page.tsx` (é o painel existente com tabela de leads e já é client component): atualizar os tipos locais `Doctor` e `Lead` para incluir `acceptsPartnership` e `consentDoctorShare`. Na linha de cada lead, adicionar um form compacto com: `<select>` de médicos elegíveis (`doctor.emailVerified && doctor.verified && doctor.active && doctor.acceptsPartnership`), input numérico de preço (default 40), botão "Enviar". Desabilitar/ocultar a ação quando `lead.consentDoctorShare !== true` e mostrar "sem consentimento". Submit → `fetch("/api/admin/leads/deliver", { method: "POST", body: JSON.stringify({ leadId, doctorId, price }) })` → em sucesso, mostrar "Entregue ✓". Seguir o estilo visual/tabela já usado na página (ler a página antes; ela já lista leads e doctors — reutilizar os dados que ela já busca).

- [x] **Step 3: Verificação manual**

`npm run dev` → login em `/admin/login` → entregar um lead de teste a um médico de teste (criar médico verificado via SQL se necessário:
`npx prisma db execute --stdin <<< "UPDATE \"Doctor\" SET \"emailVerified\"=true, verified=true, active=true, \"acceptsPartnership\"=true WHERE email='SEU_TESTE';"`).
Expected: registro em `LeadDelivery`, lead `status=matched`, e-mail disparado (ver log do Resend; sem `RESEND_API_KEY` local o retorno é `{ok:false,reason:"no-resend"}` — aceitável em dev). Também testar um lead antigo/sem consentimento e confirmar erro 400 sem envio.

- [x] **Step 4: Commit**

```bash
git add prisma/ src/app/api/lead/route.ts src/components/local-lead-form.tsx src/app/api/admin/leads/deliver/ src/app/admin/doctors/
git commit -m "feat(admin): deliver lead to doctor with billing record"
git push
```

---

### Task 8: Admin de farmácias e pipeline de orçamentos

**Files:**
- Create: `src/app/api/admin/pharmacies/route.ts` (GET lista, POST cria, PATCH edita)
- Create: `src/app/api/admin/quotes/route.ts` (GET lista, PATCH status/valores)
- Create: `src/app/admin/pharmacies/page.tsx`
- Create: `src/app/admin/quotes/page.tsx`

**Interfaces:**
- Consumes: `isAuthenticated()`.
- Produces: CRUD mínimo. `PATCH /api/admin/quotes` body `{ id, status?, orderValue?, commissionValue?, paidAt? }`. `POST /api/admin/pharmacies` body = campos do model `Pharmacy` (name, slug, email, whatsapp?, city?, state?, shipsNationwide, compounds[], commissionPct, leadPrice?, notes?).

- [x] **Step 1: APIs**

`src/app/api/admin/pharmacies/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/admin-auth";

async function guard() {
  return (await isAuthenticated()) ? null : NextResponse.json({ error: "Não autorizado" }, { status: 401 });
}

export async function GET() {
  const g = await guard(); if (g) return g;
  const pharmacies = await prisma.pharmacy.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { quotes: true } } } });
  return NextResponse.json({ pharmacies });
}

export async function POST(request: NextRequest) {
  const g = await guard(); if (g) return g;
  const b = await request.json();
  if (!b.name || !b.slug || !b.email) return NextResponse.json({ error: "name, slug e email obrigatórios" }, { status: 400 });
  const pharmacy = await prisma.pharmacy.create({
    data: {
      name: b.name, slug: b.slug, email: b.email,
      whatsapp: b.whatsapp || null, city: b.city || null, state: b.state || null,
      shipsNationwide: b.shipsNationwide ?? true, compounds: b.compounds ?? [],
      commissionPct: b.commissionPct ?? 10, leadPrice: b.leadPrice ?? null, notes: b.notes || null,
    },
  });
  return NextResponse.json({ pharmacy });
}

export async function PATCH(request: NextRequest) {
  const g = await guard(); if (g) return g;
  const { id, ...data } = await request.json();
  if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });
  const pharmacy = await prisma.pharmacy.update({ where: { id }, data });
  return NextResponse.json({ pharmacy });
}
```

`src/app/api/admin/quotes/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { pharmacy: { select: { name: true } } },
  });
  return NextResponse.json({ quotes });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const { id, status, orderValue, commissionValue, paidAt, pharmacyId } = await request.json();
  if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });
  const quote = await prisma.quoteRequest.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(orderValue !== undefined && { orderValue }),
      ...(commissionValue !== undefined && { commissionValue }),
      ...(paidAt !== undefined && { paidAt: paidAt ? new Date(paidAt) : null }),
      ...(pharmacyId !== undefined && { pharmacyId }),
    },
  });
  return NextResponse.json({ quote });
}
```

- [x] **Step 2: Páginas admin**

Seguir o padrão visual de `src/app/admin/doctors/page.tsx` (mesma auth: a page redireciona se `!isAuthenticated()` — copiar o guard do topo daquela página).

`src/app/admin/pharmacies/page.tsx`: tabela (nome, UF, compostos, comissão %, leads recebidos, ativa) + form de criação com os campos do POST acima (client component simples com fetch, padrão do restante do admin).

`src/app/admin/quotes/page.tsx`: tabela do pipeline (data, nome, whatsapp — link `https://wa.me/55{numero}` —, composto, farmácia, status como `<select>` com as opções do enum `new/sent/quoted/converted/paid/lost`, inputs de `orderValue`/`commissionValue`, botão salvar → PATCH). Rodapé com soma: `commissionValue` onde `status in (converted, paid)` = comissão a receber/recebida.

Adicionar links "Farmácias" e "Orçamentos" na navegação de `src/app/admin/layout.tsx` (se houver nav; senão, links no topo da página doctors).

- [x] **Step 3: Verificação manual**

`npm run dev` → `/admin/pharmacies`: criar farmácia de teste (`{"name":"Farmácia Teste","slug":"farmacia-teste","email":"teste@example.com","state":"SC","compounds":[]}`). Repetir o curl válido da Task 5 → agora o quote deve nascer e ir a `sent` com `pharmacyId` preenchido. `/admin/quotes`: mudar status para `converted` com `orderValue=800`, `commissionValue=80` → salvar → recarregar e conferir persistência.

- [x] **Step 4: Commit**

```bash
git add src/app/api/admin/pharmacies/ src/app/api/admin/quotes/ src/app/admin/pharmacies/ src/app/admin/quotes/ src/app/admin/layout.tsx
git commit -m "feat(admin): pharmacy CRUD + quote pipeline with commission tracking"
git push
```

---

### Task 9: Receita C — diretório de clínicas nas páginas locais + página de venda

**Files:**
- Create: `src/components/clinic-directory.tsx`
- Modify: `prisma/schema.prisma` (comentário do bloco `Clinic`, sem migration)
- Modify: `src/app/[lang]/[peptide]/[city]/page.tsx`
- Create: `src/app/[lang]/para-clinicas/page.tsx`

**Interfaces:**
- Consumes: `Clinic` com `isPublic`, `premiumUntil`, `bookingUrl` (Task 2); `POST /api/lead` existente (para o form de interesse de clínicas, com `contactMethod: "clinic-directory"`).
- Produces: `<ClinicDirectory clinics={ClinicCardData[]} cityName={string} />` com `ClinicCardData = { id, name, neighborhood, googleRating, googleReviews, phone, whatsapp, website, bookingUrl }`.

- [x] **Step 0: Corrigir comentário do `model Clinic`**

Trocar o comentário antigo:

```prisma
// INTERNAL ONLY: Secret Clinic Catalog
// Never exposed publicly. These are our future clients.
```

por:

```prisma
// Clinic catalog.
// Default is private/internal; only rows with isPublic=true and active premiumUntil
// may be rendered in the public paid directory.
```

Sem migration: é só documentação do schema para evitar regressão operacional.

- [x] **Step 1: Componente do diretório**

`src/components/clinic-directory.tsx` (server component, sem estado):

```tsx
export type ClinicCardData = {
  id: string;
  name: string;
  neighborhood: string | null;
  googleRating: number | null;
  googleReviews: number | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  bookingUrl: string | null;
};

export function ClinicDirectory({ clinics, cityName }: { clinics: ClinicCardData[]; cityName: string }) {
  if (clinics.length === 0) return null;
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-navy-900">Clínicas em destaque em {cityName}</h2>
      <p className="mt-1 text-sm text-navy-500">Clínicas cadastradas no diretório pago do Meus Peptídeos.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {clinics.map((c) => (
          <div key={c.id} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-navy-900">{c.name}</h3>
            {c.neighborhood && <p className="text-xs text-navy-500">{c.neighborhood}</p>}
            {c.googleRating && (
              <p className="mt-1 text-xs text-amber-600">★ {c.googleRating.toFixed(1)} ({c.googleReviews ?? 0} avaliações)</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {c.whatsapp && (
                <a href={`https://wa.me/55${c.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">WhatsApp</a>
              )}
              {(c.bookingUrl || c.website) && (
                <a href={c.bookingUrl ?? c.website ?? "#"} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:border-zinc-400">Agendar</a>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-navy-400">Listagem paga. A presença aqui não constitui recomendação médica, garantia de resultado ou validação de conduta clínica.</p>
    </section>
  );
}
```

- [x] **Step 2: Query + render na página de cidade**

Em `src/app/[lang]/[peptide]/[city]/page.tsx`, dentro do componente da página (depois de obter `city`), adicionar:

```tsx
  const partnerClinics = await prisma.clinic.findMany({
    where: {
      isPublic: true,
      isActive: true,
      premiumUntil: { gte: new Date() },
      city: city.name,
    },
    orderBy: [{ premiumUntil: "desc" }, { googleRating: "desc" }],
    take: 4,
    select: { id: true, name: true, neighborhood: true, googleRating: true, googleReviews: true, phone: true, whatsapp: true, website: true, bookingUrl: true },
  });
```

E renderizar `<ClinicDirectory clinics={partnerClinics} cityName={city.name} />` acima do `LocalLeadForm` existente (import no topo: `import { ClinicDirectory } from "@/components/clinic-directory";`).

- [x] **Step 3: Página de venda `/para-clinicas`**

`src/app/[lang]/para-clinicas/page.tsx` — server component seguindo o padrão de `sobre/page.tsx` (mesmo guard `hasLocale` + `generateMetadata` com `langAlternates(lang, "/para-clinicas")` — importar de `@/lib/seo`). Conteúdo:
- H1: "Apareça para pacientes que já procuram sua especialidade"
- 3 bullets de valor: ~30 mil buscas/mês no nicho; páginas por cidade já ranqueando; leads com interesse declarado.
- Oferta: destaque na sua cidade por R$ 297/mês (texto: "planos a partir de"), sem contrato de fidelidade.
- Form de interesse (client component inline `ClinicInterestForm` no mesmo padrão do `QuoteRequestForm`, campos: nome da clínica, cidade, WhatsApp, e-mail) → `POST /api/lead` com `contactMethod: "clinic-directory"`, `sourcePage: "/para-clinicas"`, `peptideInterest: []`, e o nome da clínica no campo `name`.
- `robots: { index: true }` (é página de venda B2B, pode indexar).

- [x] **Step 4: Verificação manual**

```bash
# marcar uma clínica de teste como premium
npx prisma db execute --stdin <<< "UPDATE \"Clinic\" SET \"isPublic\"=true, \"premiumUntil\"=NOW() + INTERVAL '30 days' WHERE city='São Paulo' AND \"isActive\"=true AND id IN (SELECT id FROM \"Clinic\" WHERE city='São Paulo' LIMIT 2);"
npm run build
```
Expected: build ok. Em dev, `localhost:3000/pt/semaglutida/sao-paulo` mostra o bloco "Clínicas parceiras em São Paulo" com 2 cards; `/pt/para-clinicas` renderiza e o form grava `Lead` com `contactMethod='clinic-directory'`.

- [x] **Step 5: Commit**

```bash
git add prisma/schema.prisma src/components/clinic-directory.tsx "src/app/[lang]/[peptide]/[city]/page.tsx" "src/app/[lang]/para-clinicas/"
git commit -m "feat: premium clinic directory on local pages + clinic sales page"
git push
```

---

### Task 10: Env de produção, deploy e validação

**Files:** nenhum (operacional).

- [x] **Step 1: Confirmar projeto Vercel correto**

Run: `cat .vercel/project.json`
Expected: `"projectName":"meuspeptideos.com.br"` e `projectId prj_jTKxIXWhqBXLYl7X7m2eB6VB9Avp`. **Se não for, PARAR e relinkar antes de qualquer coisa.**

- [x] **Step 2: Setar `ADMIN_EMAIL`**

```bash
printf '%s' 'lages.raphael@gmail.com' | npx vercel env add ADMIN_EMAIL production
```
(Confirmar com Raphael se prefere outro e-mail para alertas operacionais.)

- [x] **Step 3: Migration em produção**

O `DATABASE_URL` local aponta para o MESMO Neon de produção (ep-sparkling-shape) — a migration da Task 2 já foi aplicada. Confirmar:
Run: `npx prisma migrate status`
Expected: `Database schema is up to date!`

- [x] **Step 4: Deploy + smoke test**

```bash
npx vercel --yes --prod
sleep 30
curl -s -X POST https://meuspeptideos.com.br/api/orcamento -H 'Content-Type: application/json' -d '{"website":"bot"}'
curl -s -o /dev/null -w '%{http_code}\n' https://meuspeptideos.com.br/pt/para-clinicas
curl -s -o /dev/null -w '%{http_code}\n' https://meuspeptideos.com.br/pt/peptideo/bpc-157
```
Expected: `{"message":"ok"}`, `200`, `200`. Depois teste real: 1 orçamento via form em produção → conferir e-mail de alerta no ADMIN_EMAIL e registro no `/admin/quotes`.

- [x] **Step 5: Commit final de docs**

Marcar checkboxes deste plano e:
```bash
git add docs/superpowers/plans/2026-07-21-receita-imediata.md
git commit -m "docs: check off receita-imediata plan"
git push
```

---

## Fora de código (operacional, sem isso não há receita)

1. **Recrutar 2-3 farmácias de manipulação parceiras** (pré-requisito da Receita A). Alvo: farmácias magistrais com e-commerce e atendimento nacional. Pitch: "leads qualificados de {composto} com WhatsApp, sem custo fixo — comissão só sobre pedido convertido (10%) ou R$ X/lead". Formalizar por escrito o % e o reporte de conversão (relatório mensal simples).
2. **Preço de referência:** lead médico R$ 40 (faixa 25-50 já validada no plano original); comissão farmácia 10% do pedido (manipulados de peptídeo: tíquete típico R$ 400-1.500); diretório R$ 297/mês por clínica/cidade.
3. **Cobrança manual (YAGNI):** Pix + planilha/admin no primeiro trimestre. Gateway de assinatura só quando o diretório tiver >10 clínicas pagantes.
4. **LGPD:** os dados só vão à farmácia/médico após o consentimento explícito nos forms. Task 5 cobre farmácia; Task 7 precisa adicionar consentimento específico para médico antes de qualquer entrega. Não vender o mesmo lead médico para >1 médico sem deixar isso explícito no consentimento.
5. **Meta 90 dias:** 30 orçamentos/mês roteados, 2 farmácias ativas, 10 leads médicos entregues, 3 clínicas no diretório ≈ R$ 2-4k/mês recorrente inicial.

## Self-Review (feita)

- **Cobertura:** Receita A = Tasks 3-6+8; Receita B = Task 7 com pré-requisito de consentimento; Receita C = Task 9; fundação 1-2 já feita; deploy 10. ✓
- **Placeholders:** Steps de UI admin (Task 7.2, 8.2) e `/para-clinicas` (9.3) descrevem componentes a seguir por padrão existente com campos e payloads exatos — aceitável porque o padrão visual está no repo; toda lógica, APIs, schema e forms têm código completo. ✓
- **Consistência de tipos:** `matchPharmacies` (T3) consumida em T5 com mesma assinatura; `QuoteEmailData`/`LeadEmailData` (T4) batem com os campos de `QuoteRequest`/`Lead` (T2); `ClinicCardData` (T9) bate com o `select` da query. ✓

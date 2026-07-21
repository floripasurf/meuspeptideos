# Monetizacao B2B — Implementation Plan

> **For agentic workers:** implement task-by-task. Use checkbox syntax for tracking. Keep regulatory claims conservative and verify live production before deploy.

**Goal:** transformar o Meus Peptideos em um funil B2B de receita recorrente e transacional para farmacias de manipulacao, medicos e clinicas, sem criar fluxo de venda direta de medicamento.

**North Star:** receita inicial validada com 3 canais:

1. **Farmacias parceiras:** receber solicitacoes qualificadas de orcamento, mediante prescricao, com cobranca por lead/comissao/assinatura.
2. **Medicos e clinicas:** comprar leads consentidos ou assinatura de destaque local.
3. **Inteligencia de demanda:** relatorios agregados por cidade/composto/categoria, sem dados pessoais.
4. **Instagram/topo de funil:** usar o `social-engine` para publicar conteudo educativo review-first, gerar demanda qualificada e alimentar os fluxos de lead/orcamento/B2B.

## Guardrails

- Nao usar copy publica de "comprar peptideos", "vender peptideos", "sem receita", "tratamento garantido" ou preco de medicamento manipulado.
- Posicionamento correto para farmacias: **"receber solicitacoes qualificadas de orcamento mediante prescricao"**.
- Qualquer compartilhamento de dados pessoais exige consentimento explicito, IP, timestamp e finalidade clara.
- Leads antigos sem consentimento especifico nao podem ser vendidos/entregues individualmente.
- Dados agregados podem virar produto de inteligencia, desde que sem identificacao pessoal.
- Toda automacao de outbound deve ter opt-out e deve comecar manual/semi-manual antes de escala.
- Midea social deve ser educativa: sem aconselhamento medico individual, sem antes/depois, sem prometer resultado, sem "onde comprar", sem preco de medicamento e sem incentivo a uso sem prescricao.
- Conteudo social precisa passar por revisao humana antes de publicar. O `social-engine` deve rodar review-first; publicacao automatica sem aprovacao fica fora do MVP.
- Antes de qualquer deploy: confirmar `app/.vercel/project.json` com `"projectName":"meuspeptideos.com.br"`.
- Observacao pendente do plano anterior: `vercel inspect` mostrou alias `pulse-rh.vercel.app` ligado ao projeto. Revisar antes de novos deploys, mas nao remover sem decisao explicita.

## Product Strategy

### Oferta 1 — Rede de Farmacias Parceiras

**Cliente:** farmacias de manipulacao com operacao digital ou atendimento nacional/regional.

**Oferta inicial:** leads qualificados sem custo fixo, cobranca por conversao ou preco fixo por lead.

**Planos possiveis:**

- `Starter`: pagamento por lead entregue.
- `Performance`: comissao sobre pedido convertido.
- `Priority`: mensalidade para prioridade de roteamento por UF/categoria.
- `Exclusive`: exclusividade limitada por cidade/composto, com minimo mensal.

### Oferta 2 — Profissionais e Clinicas

**Cliente:** medicos e clinicas que atendem demanda relacionada.

**Oferta inicial:** lead consentido + diretorio premium local.

**Planos possiveis:**

- `Lead avulso`: R$ 25-50 por lead consentido.
- `Local Premium`: R$ 297/mes por cidade.
- `Clinic Growth`: R$ 497-997/mes com destaque, relatorio e prioridade.

### Oferta 3 — Radar de Demanda

**Cliente:** farmacias, clinicas, medicos, fornecedores e operadores do setor.

**Oferta:** relatorio agregado mensal sem PII:

- compostos mais buscados;
- cidades com demanda;
- taxa de conversao por pagina;
- tendencias por categoria;
- mapa de oferta parceira vs demanda.

### Canal 4 — Instagram educativo

**Objetivo:** criar demanda qualificada no topo do funil e levar o usuario para paginas do Meus Peptideos com consentimento capturado no site.

**Publicos:**

- pacientes pesquisando informacao;
- medicos/clinicas interessados em demanda local;
- farmacias de manipulacao interessadas em leads qualificados;
- audiencia geral de longevidade/metabolismo/performance com cuidado regulatorio.

**Pilares de conteudo:**

- `mito-vs-evidencia`: confrontar claims populares com estudo/status regulatorio.
- `status-brasil`: explicar aprovado, pesquisa, manipulacao mediante prescricao, riscos.
- `perguntas-comuns`: FAQs educativas sem orientar uso individual.
- `sinais-de-alerta`: como evitar mercado cinza, promessa milagrosa e "sem receita".
- `medico-parceiro`: chamada para profissionais se cadastrarem.
- `farmacia-parceira`: chamada B2B para receber solicitacoes de orcamento com prescricao.
- `radar-demanda`: insights agregados, sem dados pessoais.

**CTAs permitidos:**

- "Leia a ficha completa"
- "Veja o status no Brasil"
- "Receba indicacao de profissional"
- "Cadastre sua clinica"
- "Farmacia: avalie parceria"
- "Assine o radar de demanda" (futuro)

**CTAs proibidos:**

- "Compre"
- "Fale com farmacia para comprar"
- "Use sem receita"
- "Comece tratamento"
- "Resultado garantido"

## Architecture

Tudo dentro do app Next.js existente (`app/`), usando Prisma/Neon/Resend já presentes.

Novos dominios:

- `PharmacyProspect`: farmacias mapeadas antes de virar parceiras.
- `ProspectSource`: origem/evidencia do dado.
- `OutreachCampaign`: campanhas comerciais.
- `OutreachEvent`: historico de contato, follow-up e opt-out.
- `PartnerApplication`: formulario inbound para farmacias/clinicas.
- `DemandSnapshot`: metricas agregadas diarias/semanais para relatorios.
- `PartnerReport`: relatorios gerados para parceiros.
- `ComplianceFlag`: risco operacional/regulatorio associado a prospect/parceiro.
- `SocialFunnelCampaign`: campanhas de topo de funil e UTMs.
- `SocialAttributionEvent`: cliques/visitas declaradas vindas de Instagram/landing.
- `SocialContentIdea`: espelho local de ideias aprovadas para enviar ao `social-engine`.

Integracao externa:

- `social-engine` canonical path: `/Users/raphaellages/projects/social-engine`.
- Runtime: host-first no Mac Mini, engine em `http://127.0.0.1:8790`, LaunchAgent `com.raphaellages.social-engine.engine`.
- Fluxo de publicacao: gerar midia, passar guardrails/quality score, revisar, aprovar, publicar via Instagram Graph API.
- Midia precisa estar em HTTPS publico via `PUBLIC_MEDIA_BASE_URL`, pois a Meta busca o asset antes de publicar.

## File Structure

Paths relativos a `app/`.

```text
prisma/
  schema.prisma
  migrations/{timestamp}_b2b_monetization_pipeline/migration.sql
src/
  lib/
    b2b-scoring.ts
    b2b-scoring.test.ts
    demand-snapshot.ts
    outreach-copy.ts
    social-funnel.ts
    social-funnel.test.ts
  app/
    api/
      admin/
        prospects/route.ts
        outreach/route.ts
        demand/route.ts
        social/route.ts
      partner/apply/route.ts
      track/social/route.ts
    admin/
      prospects/page.tsx
      outreach/page.tsx
      demand/page.tsx
      social/page.tsx
    [lang]/
      instagram/page.tsx
      para-farmacias/page.tsx
  components/
    partner-application-form.tsx
    prospect-score-badge.tsx
    instagram-funnel-form.tsx
scripts/
  import-pharmacy-prospects.ts
  generate-demand-snapshot.ts
  export-social-engine-ideas.ts
```

---

## Task 1 — Schema B2B e migration manual

**Files:**

- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/{timestamp}_b2b_monetization_pipeline/migration.sql`

**Models:**

```prisma
model PharmacyProspect {
  id              String   @id @default(cuid())
  name            String
  slug            String?  @unique
  email           String?
  whatsapp        String?
  phone           String?
  website         String?
  city            String?
  state           String?
  address         String?
  googlePlaceId   String?  @unique
  googleRating    Float?
  googleReviews   Int?
  source          String
  status          ProspectStatus @default(new)
  score           Int      @default(0)
  riskScore       Int      @default(0)
  shipsNationwide Boolean?
  categories      String[]
  notes           String?
  optedOutAt      DateTime?
  convertedPharmacyId String?
  convertedPharmacy   Pharmacy? @relation(fields: [convertedPharmacyId], references: [id])
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  sources         ProspectSource[]
  outreachEvents  OutreachEvent[]
  complianceFlags ComplianceFlag[]

  @@index([status, score])
  @@index([state, city])
}

model ProspectSource {
  id         String @id @default(cuid())
  prospectId String
  prospect   PharmacyProspect @relation(fields: [prospectId], references: [id], onDelete: Cascade)
  sourceType String
  url        String?
  capturedAt DateTime @default(now())
  raw        Json?
}

model OutreachCampaign {
  id          String @id @default(cuid())
  name        String
  channel     String
  audience    String
  status      String @default("draft")
  createdAt   DateTime @default(now())
  events      OutreachEvent[]
}

model OutreachEvent {
  id          String @id @default(cuid())
  prospectId  String?
  prospect    PharmacyProspect? @relation(fields: [prospectId], references: [id], onDelete: SetNull)
  campaignId  String?
  campaign    OutreachCampaign? @relation(fields: [campaignId], references: [id], onDelete: SetNull)
  channel     String
  eventType   String
  subject     String?
  body        String?
  response    String?
  nextFollowUpAt DateTime?
  createdAt   DateTime @default(now())
}

model PartnerApplication {
  id          String @id @default(cuid())
  partnerType String
  name        String
  contactName String?
  email       String?
  whatsapp    String?
  city        String?
  state       String?
  website     String?
  message     String?
  consentCommercial Boolean @default(false)
  submittedFromIp String?
  status      String @default("new")
  createdAt   DateTime @default(now())
}

model DemandSnapshot {
  id          String @id @default(cuid())
  periodStart DateTime
  periodEnd   DateTime
  city        String?
  state       String?
  compoundSlug String?
  category    String?
  quoteCount  Int @default(0)
  leadCount   Int @default(0)
  pagePath    String?
  createdAt   DateTime @default(now())

  @@index([periodStart, periodEnd])
  @@index([state, city])
  @@index([compoundSlug])
}

model PartnerReport {
  id          String @id @default(cuid())
  title       String
  audience    String
  periodStart DateTime
  periodEnd   DateTime
  payload      Json
  createdAt    DateTime @default(now())
}

model ComplianceFlag {
  id          String @id @default(cuid())
  prospectId  String?
  prospect    PharmacyProspect? @relation(fields: [prospectId], references: [id], onDelete: Cascade)
  entityType  String
  entityId    String?
  severity    String
  reason      String
  evidenceUrl String?
  resolvedAt  DateTime?
  createdAt   DateTime @default(now())
}

model SocialFunnelCampaign {
  id          String @id @default(cuid())
  name        String
  platform    String @default("instagram")
  objective   String
  targetUrl   String
  utmCampaign String
  status      String @default("draft")
  startedAt   DateTime?
  endedAt     DateTime?
  createdAt   DateTime @default(now())
  ideas       SocialContentIdea[]
  events      SocialAttributionEvent[]
}

model SocialContentIdea {
  id          String @id @default(cuid())
  campaignId  String?
  campaign    SocialFunnelCampaign? @relation(fields: [campaignId], references: [id], onDelete: SetNull)
  projectKey  String @default("meuspeptideos")
  format      String
  pillar      String
  hook        String
  claim       String?
  evidenceUrl String?
  targetPath  String
  cta         String
  complianceStatus String @default("draft")
  socialEngineReviewId String?
  publishedAt DateTime?
  providerPostId String?
  createdAt   DateTime @default(now())
}

model SocialAttributionEvent {
  id          String @id @default(cuid())
  campaignId  String?
  campaign    SocialFunnelCampaign? @relation(fields: [campaignId], references: [id], onDelete: SetNull)
  platform    String @default("instagram")
  eventType   String
  path        String?
  utmSource   String?
  utmMedium   String?
  utmCampaign String?
  referrer    String?
  submittedFromIp String?
  createdAt   DateTime @default(now())

  @@index([utmCampaign, createdAt])
}

enum ProspectStatus {
  new
  enriched
  qualified
  contacted
  negotiating
  partner
  rejected
  opted_out
}
```

**Validation:**

- `npx prisma migrate deploy`
- `npx prisma generate`
- `npx tsc --noEmit`

---

## Task 2 — Scoring de prospects e risco regulatorio

**Files:**

- Create: `src/lib/b2b-scoring.ts`
- Create: `src/lib/b2b-scoring.test.ts`

**Rules:**

`score` positivo:

- tem WhatsApp/email/site;
- atende nacionalmente ou mais de uma UF;
- site profissional;
- boa avaliacao publica;
- menciona manipulacao magistral/categorias compativeis;
- esta em cidade com demanda no Meus Peptideos.

`riskScore`:

- copy publica com "sem receita", "compre", "preco de medicamento manipulado";
- promessas de resultado;
- produto manipulado padronizado em vitrine publica;
- claims agressivos de emagrecimento/performance;
- historico manual de alerta.

**Output:**

```ts
type ProspectScoringInput = {
  hasEmail: boolean;
  hasWhatsapp: boolean;
  hasWebsite: boolean;
  shipsNationwide?: boolean | null;
  googleRating?: number | null;
  googleReviews?: number | null;
  demandCityScore?: number;
  publicCopy?: string | null;
};

type ProspectScore = {
  score: number;
  riskScore: number;
  flags: string[];
};
```

**Validation:**

- `npm test`

---

## Task 3 — Importador de prospects

**Files:**

- Create: `scripts/import-pharmacy-prospects.ts`
- Create: `docs/superpowers/templates/pharmacy-prospects.csv`

**Scope inicial:**

Import manual via CSV. Nao automatizar scraping agressivo nesta fase.

CSV columns:

```csv
name,email,whatsapp,phone,website,city,state,address,googlePlaceId,googleRating,googleReviews,source,shipsNationwide,categories,notes
```

**Behavior:**

- upsert por `googlePlaceId`, depois por `website`, depois por nome+cidade+UF;
- normalizar telefone/WhatsApp;
- rodar scoring;
- criar `ProspectSource`;
- nunca enviar contato automaticamente.

**Validation:**

- importar CSV de 5 linhas de teste;
- confirmar upsert idempotente;
- remover dados de teste.

---

## Task 4 — Admin CRM de prospects

**Files:**

- Create: `src/app/api/admin/prospects/route.ts`
- Create: `src/app/admin/prospects/page.tsx`
- Modify: `src/app/admin/layout.tsx`

**Features:**

- tabela com filtros: status, UF, score, riskScore, cidade;
- detalhe inline: contatos, site, notas, flags;
- update de status;
- registrar nota;
- marcar opt-out;
- converter prospect em `Pharmacy`;
- botao "proximo follow-up".

**Guardrails:**

- prospects com `riskScore >= 60` nao podem ser convertidos sem resolver flags;
- prospects `opted_out` nao aparecem em campanhas.

**Validation:**

- criar prospect de teste via API;
- editar status;
- converter em `Pharmacy`;
- verificar relacao `convertedPharmacyId`;
- limpar teste.

---

## Task 5 — Pagina B2B para farmacias

**Files:**

- Create: `src/app/[lang]/para-farmacias/page.tsx`
- Create: `src/components/partner-application-form.tsx`
- Create: `src/app/api/partner/apply/route.ts`

**Copy:**

H1: `Receba solicitacoes qualificadas de orcamento com prescricao`

Subcopy:

- "O Meus Peptideos conecta demanda informada a farmacias parceiras."
- "Nao anunciamos medicamento manipulado nem exibimos preco de produto."
- "A farmacia avalia cada solicitacao conforme prescricao e capacidade tecnica."

**Form fields:**

- tipo: farmacia/clinica/medico;
- nome;
- contato;
- email;
- WhatsApp;
- cidade/UF;
- site;
- mensagem;
- checkbox de contato comercial.

**Validation:**

- pagina 200 em `/pt/para-farmacias`;
- POST cria `PartnerApplication`;
- rate limit e honeypot.

---

## Task 6 — Outreach semi-manual com Resend

**Files:**

- Create: `src/lib/outreach-copy.ts`
- Create: `src/app/api/admin/outreach/route.ts`
- Create: `src/app/admin/outreach/page.tsx`

**MVP:**

- selecionar prospects qualificados;
- gerar copy personalizada;
- revisar antes de enviar;
- enviar 1 a 1 ou lote pequeno;
- registrar `OutreachEvent`.

**Template inicial:**

Assunto: `Parceria para receber solicitacoes de orcamento com prescricao`

Mensagem curta:

- apresentar Meus Peptideos;
- explicar demanda qualificada;
- dizer que nao ha anuncio publico de medicamento/preco;
- oferecer piloto com pagamento por lead ou comissao;
- incluir opt-out.

**Validation:**

- enviar para email interno de teste;
- registrar evento;
- bloquear envio para opted-out.

---

## Task 7 — Roteamento por performance

**Files:**

- Modify: `src/lib/quote-routing.ts`
- Modify: `src/lib/quote-routing.test.ts`
- Modify: `src/app/api/orcamento/route.ts`

**New inputs:**

- conversao historica;
- SLA de resposta;
- limite diario;
- prioridade paga;
- risco/compliance;
- cobertura por UF.

**Rules:**

- farmacia inativa ou com flag critica nao recebe lead;
- parceiro pago tem boost, mas nao passa por cima de risco;
- farmacia com SLA ruim perde prioridade;
- limite padrao: 2 farmacias por pedido.

**Validation:**

- testes unitarios para prioridade, limite e risco;
- smoke com farmacia de teste.

---

## Task 8 — Demand snapshots e Radar B2B

**Files:**

- Create: `src/lib/demand-snapshot.ts`
- Create: `scripts/generate-demand-snapshot.ts`
- Create: `src/app/api/admin/demand/route.ts`
- Create: `src/app/admin/demand/page.tsx`

**Metrics:**

- quoteCount por composto/UF/cidade;
- leadCount por composto/UF/cidade;
- top pages;
- cidades sem parceiro;
- demanda por categoria.

**Output:**

- painel admin;
- payload JSON para `PartnerReport`;
- export CSV.

**Validation:**

- gerar snapshot com dados atuais;
- conferir agregados contra queries diretas.

---

## Task 9 — Relatorio comercial para parceiros

**Files:**

- Create: `src/app/api/admin/reports/route.ts`
- Create: `src/app/admin/reports/page.tsx`

**MVP:**

- escolher periodo;
- gerar relatorio agregado;
- salvar `PartnerReport`;
- exportar JSON/CSV;
- futuramente PDF.

**Produtos vendidos:**

- `Radar Cidade`: demanda por cidade.
- `Radar Composto`: demanda por composto/categoria.
- `White Space`: cidades com demanda e sem parceiro.

---

## Task 10 — Metricas de monetizacao

**Files:**

- Modify: `src/app/admin/quotes/page.tsx`
- Modify: `src/app/admin/doctors/page.tsx`
- Create: `src/app/admin/revenue/page.tsx`

**Metrics:**

- MRR de diretorio;
- leads vendidos;
- comissao registrada;
- comissao recebida;
- prospects por etapa;
- taxa contato -> reuniao -> parceiro;
- tempo medio ate primeiro pagamento.

**Validation:**

- numeros batem com `QuoteRequest`, `LeadDelivery`, `Clinic`, `PharmacyProspect`.

---

## Task 11 — Instagram/topo de funil com social-engine

**Files no Meus Peptideos:**

- Create: `src/lib/social-funnel.ts`
- Create: `src/lib/social-funnel.test.ts`
- Create: `src/app/api/admin/social/route.ts`
- Create: `src/app/api/track/social/route.ts`
- Create: `src/app/admin/social/page.tsx`
- Create: `src/app/[lang]/instagram/page.tsx`
- Create: `src/components/instagram-funnel-form.tsx`
- Create: `scripts/export-social-engine-ideas.ts`

**Files no social-engine:**

- Add brand pack/seed for `meuspeptideos`.
- Add curated idea bank entries for `meuspeptideos`.
- Do not change production publishing behavior without verifying `curl http://127.0.0.1:8790/health`.

**MVP:**

1. Criar landing `/pt/instagram` com 3 caminhos:
   - paciente: "entender um peptideo";
   - profissional/clinica: "receber leads";
   - farmacia: "avaliar parceria".
2. Criar `SocialFunnelCampaign` para cada pilar.
3. Criar 30 ideias iniciais:
   - 10 mito-vs-evidencia;
   - 8 status regulatorio;
   - 6 sinais de alerta;
   - 3 chamadas para clinicas/medicos;
   - 3 chamadas para farmacias parceiras.
4. Exportar ideias aprovadas para `social-engine`.
5. Criar Brand Pack `meuspeptideos` no `social-engine`.
6. Gerar previews `static` e `carousel`.
7. Rodar review-first: aprovar manualmente antes de publicar.
8. Publicar no maximo 1 post/dia nos primeiros 14 dias.
9. Medir cliques/visitas com UTM e `SocialAttributionEvent`.

**UTM convention:**

```text
utm_source=instagram
utm_medium=social
utm_campaign=mp_{pillar}_{yyyymm}
utm_content={idea_slug}
```

**Landing routes:**

- `/pt/instagram?utm_source=instagram...`
- `/pt/peptideo/{slug}?utm_source=instagram...`
- `/pt/para-medicos?utm_source=instagram...`
- `/pt/para-clinicas?utm_source=instagram...`
- `/pt/para-farmacias?utm_source=instagram...`

**Compliance checks for every idea:**

- no buying/selling language;
- no product price;
- no individualized instruction;
- no guaranteed outcome;
- no before/after;
- cite source/evidence URL when making scientific claim;
- CTA must route to informational page or consented form.

**Social-engine verification:**

```bash
cd /Users/raphaellages/projects/social-engine
docker compose ps
curl http://127.0.0.1:8790/health
cd engine
pnpm test
pnpm build
pnpm brand:validate -- --project meuspeptideos
pnpm preview:static
pnpm preview:carousel
```

Before publishing:

```bash
curl -I "$PUBLIC_MEDIA_BASE_URL/media/<arquivo>"
```

Expected:

- HTTPS public URL returns 200;
- review receipt created;
- media only published after explicit approval.

**Success metrics:**

- 14 posts approved/published in 14 days;
- 3%+ profile/link click rate from Instagram;
- 20+ landing visits;
- 3+ consented patient leads;
- 1+ B2B application from clinic/farmacia.

---

## Task 12 — Deploy e smoke tests

**Pre-flight:**

```bash
cat .vercel/project.json
npx prisma migrate status
npm test
npx tsc --noEmit
npm run build
```

**Deploy:**

```bash
npx vercel --yes --prod
```

**Smoke production:**

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://meuspeptideos.com.br/pt/para-farmacias
curl -s -o /dev/null -w '%{http_code}\n' https://meuspeptideos.com.br/admin/prospects
curl -s -X POST https://meuspeptideos.com.br/api/partner/apply \
  -H 'Content-Type: application/json' \
  -d '{"website":"bot"}'
```

Expected:

- pages return 200/redirect to login where applicable;
- honeypot returns fake success;
- no unexpected lead sharing.

---

## Operational Playbook

### Week 1 — Build CRM, import 100 prospects and prepare Instagram

- Implement Tasks 1-4.
- Start Task 11 setup: `/pt/instagram`, Brand Pack draft and 30 idea seeds.
- Import 100 farmacias manually from public sources.
- Qualify top 30.
- Reject/high-risk anything with aggressive public claims.
- Generate first 5 Instagram previews, review only, no publishing yet.

### Week 2 — First outbound pilot + first social posts

- Implement Tasks 5-6.
- Contact 20 qualified prospects manually/semi-manually.
- Target: 5 calls, 2 pilot partners.
- Publish 3-5 reviewed Instagram posts.
- Route all social traffic to `/pt/instagram` or specific informational pages with UTM.

### Week 3 — Performance routing + content cadence

- Implement Task 7.
- Route only to pilot partners.
- Measure response time, quoted rate, converted rate.
- Publish 1 reviewed Instagram post/day.
- Use questions/comments as idea input, but do not give individualized medical advice in comments/DM.

### Week 4 — Sell intelligence and use social proof

- Implement Tasks 8-9.
- Generate first `Radar Cidade` and `White Space` reports.
- Use reports in partner sales calls.
- Package early Instagram funnel metrics into sales deck: reach, clicks, landing visits, consented leads.

## Go / No-Go Gates

- **Go for outbound:** at least 30 qualified prospects with riskScore < 40.
- **Go for paid pilot:** partner accepts written terms for lead/comissao and confirms prescription-only handling.
- **Go for scaling:** at least 2 partners respond to leads within 24h.
- **Go for Instagram publishing:** Brand Pack approved, 5 reviewed posts pass guardrails, `PUBLIC_MEDIA_BASE_URL` public HTTPS verified.
- **No-go:** any partner asks to advertise manipulated product publicly with price, "sem receita", or outcome promise.
- **No-go social:** content requires medical claim without source, suggests individual use, or points to product purchase.

## First Revenue Targets

30 days:

- 100 prospects imported;
- 20 contacted;
- 14 Instagram posts approved/published;
- 100 landing visits from Instagram;
- 2 pharmacy partners;
- 10 quote requests routed;
- 5 consented patient leads from social;
- 2 B2B applications from social;
- R$ 500-1.500 in initial revenue or committed pipeline.

90 days:

- 500 prospects imported;
- 60 Instagram posts published;
- 1,000 landing visits from Instagram;
- 8 pharmacy partners;
- 3 clinic directory clients;
- 30 quote requests/month;
- 10 doctor leads/month;
- 5 B2B applications/month from Instagram;
- R$ 2k-5k MRR/equivalent mixed revenue.

## Notes

- This plan extends `2026-07-21-receita-imediata.md`; do not rebuild features already shipped unless a task explicitly modifies them.
- Keep the public site informational. Monetization should happen through consented forms, admin workflows and B2B contracts.

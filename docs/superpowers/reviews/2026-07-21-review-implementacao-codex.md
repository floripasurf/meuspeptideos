# Review — Implementação Codex (Tasks 3-9, da00285..e7f26eb)

Revisor: Claude (whole-branch review, 2026-07-21). Veredito: **Needs fixes** — spec essencialmente completa, fundamentos de segurança verificados OK (guards admin, consent+IP, honeypot, rate limit real, escapeHtml), mas 3 Importants no caminho de receita.

## Important (corrigir antes de operar)

1. **Copy sem acentos em TODO o texto novo público.** `para-clinicas/page.tsx:34` ("Apareca", "ja"), `quote-request-form.tsx:133-157` ("orcamento", "prescricao", "manipulacao"), `clinic-directory.tsx:35-77` ("Clinicas", "avaliacoes"), `clinic-interest-form.tsx`, `local-lead-form.tsx:131-135`, e-mails novos. Página de venda B2B e form principal de conversão sem diacríticos = mata credibilidade. Fix: restaurar acentuação em todas as strings públicas + templates de e-mail.

2. **Quote vira `sent` mesmo se nenhum e-mail foi entregue.** `api/orcamento/route.ts:83-99` — `sentTo` é construído com os resultados por farmácia e depois ignorado; update `status:"sent"` dispara com `matched.length > 0`. Se o Resend falhar, o lead morre invisível marcado como enviado. Fix: gatear em `sentTo.length > 0` e gravar `pharmacyId` de farmácia que de fato recebeu; falhas ficam `new` (fila manual).

3. **`compoundSlug` não validado → relay de spam para farmácias parceiras.** `api/orcamento/route.ts:27-46` — qualquer slug arbitrário dispara e-mails automáticos a até 2 farmácias + admin; `compoundSlug` vai sem escape no **subject**; campos sem limite de tamanho. Fix: validar slug contra `prisma.peptide.findUnique` (400 se desconhecido) + `.slice(0, 120)` em name/whatsapp/city/email.

## Minor

4. `api/admin/pharmacies/route.ts:39` — P2002 (slug duplicado) sem try/catch → 500 HTML → admin trava em "Salvando...". Retornar 409 `{error}`.
5. `clinic-interest-form.tsx:84-93` — checkbox de consentimento comercial não é enviado/persistido (só required no client). Persistir para trilha LGPD.
6. wa.me quebra para DDD 55 (`admin/quotes/page.tsx:34-37`, `clinic-directory.tsx:13-16`): prefixar `55` só se `digits.length < 12`.
7. `api/lead/route.ts:7-13` — rate limit consome cota ANTES da validação (5 submits inválidos bloqueiam usuário legítimo 1h). Mover para depois da validação, como o /api/orcamento faz.
8. Lockfiles duplos (package-lock.json + pnpm-lock.yaml) — padronizar em pnpm (Vercel usa pnpm) e remover/ignorar o npm.
9. `GET /api/admin/doctors` retorna `verificationToken` ao client (pré-existente; usar `select`).

## Pendência da Task 2 (minha, bug herdado do plano)

- **Drift schema×migration:** `migration.sql` cria `QuoteRequest_status_idx`, mas o model `QuoteRequest` não tem `@@index([status])`. Próximo `prisma migrate dev` vai propor DROP do índice. Fix de 1 linha no schema. (Não aplicado ainda: schema.prisma está com edições não-commitadas do Codex — aplicar junto da migration B2B dele.)
- Idem (menor): considerar `@@index([doctorId])` em `LeadDelivery`.

## Pontos fortes (reconhecimento)

- `escapeHtml()` em todos os campos de usuário nos e-mails (endureceu além do plano, que tinha injection).
- Carve-out `clinic-directory` no /api/lead: lead B2B nunca ganha `consentDoctorShare=true` — falha segura contra spoofing de `contactMethod`.
- Migration de consent com índice depois dos ALTERs (regra do incidente Finep respeitada).
- Gate de elegibilidade do médico ampliado (4 flags) e espelhado na UI.
- Pegou o risco dos lockfiles duplos (e7425f6) antes de quebrar o build da Vercel.
- Edições no plano só FORTALECERAM requisitos (consent Step 0, copy RDC-safer); nenhum requisito enfraquecido.

## Nota sobre o plano B2B novo (monetizacao-b2b-expansao.md)

Consistente com a implementação atual; guardrails até mais estritos. Task 1 dele já está em implementação (migration `20260721140000_b2b_monetization_pipeline` no working tree).

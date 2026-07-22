# Decisão do Raphael (2026-07-21): cadastro aberto, entrega gateada

**Contexto:** o pivot compliance (commits a9c18a2/dcf5817/7e006fa) gateou tanto a ENTREGA de leads quanto o CADASTRO de médicos/farmácias. Raphael decidiu separar as duas coisas.

**Decisão (não reverter sem novo alinhamento com o Raphael):**

1. **Cadastro SEMPRE aberto** — objetivo é construir o catálogo/rede AGORA:
   - `/api/doctor` (médicos, com verificação de e-mail + aprovação manual) — sem gate.
   - `/api/partner/apply` (farmácias → `PharmacyProspect`, scoring inbound) — sem gate.
   - Páginas `/para-medicos` e `/para-farmacias` montam os forms com copy de **lista de espera** ("encaminhamento ainda não está ativo; começa após revisão regulatória e com volume; cadastrados são avisados primeiro").
2. **Entrega/roteamento continuam gateados** pelas flags (default off), como no pivot:
   - `/api/orcamento` ← `ENABLE_PHARMACY_QUOTE_PARTNERS`
   - `/api/admin/leads/deliver` ← `ENABLE_PATIENT_ROUTING`
3. **Racional de risco:** cadastrar profissional/empresa interessada em parceria é relacionamento B2B com consentimento próprio (LGPD ok) — não é publicidade de manipulado (RDC 67) nem intermediação de paciente. O risco mora no encaminhamento, que segue desligado até parecer jurídico.
4. Copy de "Limites do serviço" em /para-medicos ajustada para não afirmar impossibilidade permanente ("hoje não há encaminhamento ativo" em vez de "não remunera indicações") — evita contradição pública quando as flags ligarem.

Implementado no commit `5fe0ec0`, deployado em produção 2026-07-21 (validação: /api/doctor e /api/partner/apply respondem 400 de validação; /api/orcamento segue 410; páginas exibem seção de lista de espera).

# Plano de Crescimento — Meus Peptídeos

**Objetivo:** Tornar-se o maior portal brasileiro de peptídeos.

**Princípio central:** SEO orgânico é o canal #1. Google/Meta restringem ads pagos para peptídeos, então tráfego orgânico é praticamente o único caminho viável. A boa notícia: a competição em português é quase zero.

---

## Fase 1: Fundação SEO (Semana 1-2)

Quick wins técnicos:

1. **Sitemap dinâmico** (`sitemap.ts`) — listar todos os 22 peptídeos + 4 blog posts + páginas estáticas
2. **robots.txt** com referência ao sitemap
3. **Structured data JSON-LD** em cada página:
   - `MedicalWebPage` schema nas páginas de peptídeo
   - `Article` schema nos blog posts
   - `FAQPage` para os FAQs
   - `BreadcrumbList` para navegação
4. **Meta tags Open Graph + Twitter Cards** completas
5. **Submeter ao Google Search Console + Bing Webmaster Tools**
6. **Página /sobre** com bios da equipe editorial (E-E-A-T)
7. **Página /metodologia** explicando como classificamos evidência

**Resultado esperado:** Indexação completa em ~2 semanas.

---

## Fase 2: Conteúdo programático (Semana 2-4)

A base do tráfego de cauda longa.

### Páginas de comparação (alta intenção de busca)
- "Ozempic vs Mounjaro: qual é melhor?"
- "Semaglutida vs Tirzepatida: comparação completa"
- "BPC-157 vs TB-500: diferenças"
- "Ipamorelin vs CJC-1295: combinação ou separados"

### Páginas por uso/benefício
- `/uso/emagrecimento` — todos peptídeos para emagrecer
- `/uso/recuperacao-muscular`
- `/uso/anti-aging`
- `/uso/cognicao`
- `/uso/sono`
- `/uso/imunidade`

### Páginas por categoria
- `/categoria/glp1`
- `/categoria/healing`
- `/categoria/cosmetic`
- etc.

### Glossário de termos
- `/glossario` — cada termo (HbA1c, GLP-1, telomerase, etc.) é uma página

### Calculadoras interativas
- "Calculadora de IMC + qual peptídeo pode ser indicado"
- "Quanto custa a semaglutida vs tirzepatida por mês"

**Volume esperado:** ~150-200 páginas indexáveis em 30 dias.

---

## Fase 3: Conteúdo editorial (contínuo)

**1 artigo de blog por semana** abordando:

- **Notícias:** "ANVISA aprova primeiro genérico de semaglutida"
- **Estudos novos:** "Novo estudo mostra X sobre tirzepatida"
- **Polêmicas:** "RFK Jr. e a reclassificação de peptídeos: o que muda"
- **Listas:** "10 peptídeos que devem dominar 2027"
- **Entrevistas:** com médicos, pesquisadores
- **Casos:** "Como a semaglutida transformou o tratamento da obesidade"

**Hook:** Cada artigo termina com newsletter signup + CTA "encontre um médico próximo a você" (lead gen).

---

## Fase 4: SEO de cauda longa local (Semana 4-8)

Pages SEO programáticas por cidade:
- `/[peptide]/[cidade]` — "Semaglutida em São Paulo" → conteúdo educacional + form de lead
- 22 peptídeos × 27 capitais = **594 páginas**
- Cada uma captura busca local de baixa concorrência

Motor que o Chamei já provou funcionar.

---

## Fase 5: Multi-idiomas (Mês 2-3)

**Ordem de prioridade por ROI:**

1. **Espanhol** — segunda maior comunidade hispano-falante, competição zero
   - Mercado: México, Argentina, Espanha
   - Mesmo conteúdo, tradução por Claude/DeepL + revisão
2. **Inglês** — competição alta (Examine.com, etc.) mas tráfego potencial enorme
3. **Alemão** — mercado europeu de longevidade muito forte

**Stack:** Next.js i18n com `[locale]` route. Subpastas: `/en`, `/es`, `/de`.

**Importante:** Multi-idioma DOBRA o trabalho. Só fazer depois do português estar consolidado (3+ meses).

---

## Fase 6: Social Media (paralelo, contínuo)

### Instagram (@meuspeptideos)
- Carrosséis educacionais — "5 fatos sobre semaglutida que você não sabia"
- Reels de fact-check — "A internet diz X, a ciência diz Y"
- Stories diárias com curiosidades
- Foco: conteúdo "saveable" que vira referência

### YouTube
- Vídeos longos (10-15min) — explicações aprofundadas de cada peptídeo
- SEO duplo: ranqueia no YouTube E no Google
- Embedded em todas páginas relevantes do site (aumenta tempo na página)

### TikTok
- Versões curtas dos vídeos do YouTube
- Foco em mitos e fact-checks (alto engajamento)

### LinkedIn
- Conteúdo mais técnico, voltado para médicos e profissionais
- **Aqui está a chave para encontrar os médicos** — médicos consomem LinkedIn, podemos atraí-los para o cadastro privado de prescritores

### X/Twitter
- Threads educacionais
- Engajamento com pesquisadores e community de longevidade

---

## Fase 7: Backlinks e autoridade (Mês 2-6)

E-E-A-T é crítico para conteúdo de saúde.

1. **Conseguir um médico revisor** (pago como consultor) com CRM público
   - Cada artigo passa a ter "Revisado por Dr. X, CRM XXX"
2. **Guest posts** em blogs de saúde, medicina funcional, longevidade
3. **PR digital** — release sobre "primeiro portal brasileiro com fact-check científico de peptídeos"
4. **Parcerias com universidades** — convidar pesquisadores brasileiros para escrever
5. **Wikipedia em português** — criar/melhorar entradas de peptídeos
6. **HARO/Connectively** — responder a jornalistas

---

## Fase 8: Email marketing (Mês 1+)

1. **Welcome sequence** — 5 emails automáticos para novos cadastros
2. **Newsletter semanal** — resumo de novidades
3. **Segmentação** — emails específicos por interesse
4. **Conteúdo exclusivo** — relatórios PDF baixáveis em troca de email

**Stack:** Resend ou ConvertKit (free até 1k subscribers).

---

## Fase 9: Lead gen reverso (médicos)

Página `/para-medicos` privada para captar prescritores.

Marketing através de:
- LinkedIn ads mirados em médicos brasileiros
- Anúncios em revistas médicas digitais
- Networking direto em congressos de medicina funcional

---

## Métricas de sucesso (90 dias)

| Métrica | 30 dias | 60 dias | 90 dias |
|---|---|---|---|
| Páginas indexadas | 50 | 200 | 800 |
| Visitantes orgânicos/dia | 100 | 500 | 2.000 |
| Newsletter subscribers | 100 | 500 | 1.500 |
| Leads (pacientes) | 20 | 100 | 400 |
| Médicos cadastrados (privado) | 5 | 25 | 75 |
| Backlinks de qualidade | 3 | 15 | 50 |
| Domain Authority | 5 | 15 | 25 |

---

## Próximas ações imediatas (esta semana)

1. Sitemap + structured data
2. Páginas de categoria
3. 5 páginas de comparação de alta busca
4. Submeter ao Google Search Console
5. Criar conta @meuspeptideos no Instagram
6. Página /sobre + /metodologia

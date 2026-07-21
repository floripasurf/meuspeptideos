# Monetização responsável — plano de validação em 90 dias

## Objetivo

Validar receita recorrente sem intermediar consulta, prescrição ou compra de medicamento. As ofertas iniciais são produtos informacionais:

1. `Radar Essencial`: resumo editorial para leitores.
2. `Radar Profissional`: briefing para profissionais e organizações.
3. `Licença de dados`: catálogo editorial e regulatório estruturado, sem dados pessoais.

Venda de leads médicos, comissão farmacêutica e ranking pago permanecem desativados. As flags `ENABLE_PATIENT_ROUTING` e `ENABLE_PHARMACY_QUOTE_PARTNERS` não devem ser habilitadas sem parecer jurídico escrito e nova revisão técnica.

## Métrica principal

Receita recorrente validada só existe quando há pagamento real e uso recorrente. Cadastro em lista de espera não conta como venda.

Metas para o primeiro ciclo:

- 30 entrevistas concluídas: 10 farmácias, 8 clínicas, 6 profissionais e 6 fornecedores/empresas.
- 100 interessados no Radar com consentimento válido.
- 15 demonstrações do piloto.
- 5 pilotos pagos, sem desconto superior a 50% da hipótese de preço.
- Retenção de pelo menos 60% dos pilotos no segundo ciclo.

## Fase 1 — dias 1 a 14: segurança e problema

- Obter parecer jurídico sobre publicidade médica, intermediação, dados de saúde, RDC 67 e comunicação B2B.
- Auditar as 37 fichas por status regulatório e despublicar alegações sem fonte primária.
- Entrevistar 12 organizações usando o roteiro deste diretório.
- Registrar interesse e estágio em `/admin/radar`; não usar planilhas paralelas com dados pessoais.
- Testar três problemas: monitor regulatório, briefing editorial e API/licença de dados.

Gate: avançar apenas se pelo menos 6 entrevistados relatarem o mesmo problema recorrente e 3 aceitarem discutir preço.

## Fase 2 — dias 15 a 30: protótipo concierge

- Produzir manualmente uma edição semanal do Radar em PDF/email.
- Incluir fonte, data, resumo, impacto possível e limite de interpretação em cada item.
- Criar três amostras separadas: profissional, farmácia e clínica/fornecedor.
- Apresentar a 10 entrevistados e medir leitura, utilidade e decisões apoiadas.
- Testar preços como hipótese, sem checkout automático: B2C R$ 19–39/mês; B2B R$ 299–990/mês; licença sob proposta.

Gate: pelo menos 5 usuários solicitam nova edição e 3 aceitam piloto pago.

## Fase 3 — dias 31 a 60: pilotos pagos

- Fechar termo simples de piloto com escopo, fontes, frequência, limites e cancelamento.
- Cobrar manualmente por Pix ou link de pagamento, emitindo documento fiscal aplicável.
- Entregar quatro edições e conduzir revisão quinzenal com cada conta.
- Medir abertura, leitura, itens úteis, tempo economizado e intenção de renovação.
- Não aceitar pedido para promover produto, alterar classificação ou fornecer contato de paciente.

Gate: cinco pilotos pagos e três renovações ou cartas de intenção para o ciclo seguinte.

## Fase 4 — dias 61 a 90: produto mínimo

- Automatizar coleta de fontes somente depois de validar o formato manual.
- Manter revisão humana antes de publicar qualquer alerta.
- Adicionar cobrança recorrente apenas para a oferta com renovação comprovada.
- Criar histórico de edições, filtros por tema e exportação conforme o plano contratado.
- Preparar termos comerciais e política de correções para dados B2B.

## Instagram e conteúdo

- Usar a landing `/pt/instagram` e UTMs por peça.
- Distribuição semanal sugerida: 2 carrosséis de evidência, 1 alerta regulatório e 1 conteúdo de metodologia/privacidade.
- CTAs permitidos: ler fonte, ver metodologia, acompanhar o Radar e participar do piloto.
- Não publicar doses, protocolos, disponibilidade, preço de medicamento, indicação de profissional ou promessa de resultado.
- Métricas: visita qualificada, cadastro confirmado, entrevista agendada e piloto pago. Curtida isolada não é KPI de monetização.

## Mapeamento de farmácias e laboratórios

O CRM de prospects pode mapear contatos empresariais públicos para pesquisa e venda do Radar B2B. Não deve ser usado para oferecer encaminhamento de pacientes ou comissão por medicamento.

Começar com 20 contatos manuais, registrar fonte pública e oferecer opt-out. Só ampliar para centenas depois de medir resposta, reclamações e qualidade dos dados, e após validação jurídica da base legal e da abordagem.

## Painel semanal

Registrar toda segunda-feira:

- visitantes do Instagram;
- consentimentos de Analytics;
- interessados no Radar por perfil;
- newsletters pendentes e confirmadas;
- entrevistas agendadas e concluídas;
- propostas, pilotos pagos, receita e renovação;
- recusas, opt-outs e reclamações;
- itens editoriais corrigidos ou despublicados.

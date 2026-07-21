import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: "Política de Privacidade para Médicos — LGPD",
    description:
      "Como tratamos os dados pessoais dos médicos cadastrados no Meus Peptídeos, conforme a Lei Geral de Proteção de Dados (LGPD).",
    alternates: langAlternates(lang, "/privacidade-medicos"),
  };
}

type Props = { params: Promise<{ lang: string }> };

export default async function PrivacidadeMedicosPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          LGPD compliant
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Política de Privacidade — Médicos Parceiros
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          Última atualização: abril de 2026
        </p>
      </header>

      <div className="prose prose-zinc prose-lg max-w-none">
        <h2>1. Quais dados coletamos</h2>
        <p>Quando você se cadastra como médico parceiro, coletamos:</p>
        <ul>
          <li><strong>Identificação:</strong> nome completo, email, telefone, WhatsApp</li>
          <li><strong>Profissional:</strong> CRM, UF do CRM, especialidade, anos de experiência</li>
          <li><strong>Localização:</strong> endereço do consultório, cidade, estado</li>
          <li><strong>Preferências:</strong> peptídeos que você prescreve</li>
          <li><strong>Técnico:</strong> endereço IP do cadastro (para fins de auditoria e segurança), data e hora</li>
        </ul>

        <h2>2. Por que coletamos</h2>
        <p>Os dados são coletados exclusivamente para:</p>
        <ol>
          <li><strong>Conectar pacientes a você:</strong> quando um paciente interessado em peptídeos solicita uma indicação na sua região, encaminhamos os dados desse paciente para você.</li>
          <li><strong>Verificar sua identidade:</strong> validamos o CRM e o email antes de ativar seu cadastro.</li>
          <li><strong>Comunicação operacional:</strong> envio de leads, atualizações sobre o serviço, faturamento.</li>
          <li><strong>Auditoria e segurança:</strong> registro de IP e timestamps para detectar e prevenir fraudes.</li>
        </ol>

        <h2>3. Onde os dados ficam armazenados</h2>
        <p>
          Seus dados são armazenados em <strong>servidores Neon PostgreSQL na região
          sa-east-1 (São Paulo, Brasil)</strong>, hospedados pela AWS. Toda comunicação
          entre seu navegador e nossos servidores é criptografada via TLS/SSL com
          channel binding obrigatório.
        </p>
        <p>
          A escolha por servidores brasileiros é deliberada — atendemos integralmente
          aos requisitos de armazenamento da LGPD para dados pessoais sensíveis.
        </p>

        <h2>4. Quem tem acesso</h2>
        <p>
          Apenas a equipe administrativa do Meus Peptídeos tem acesso aos dados,
          mediante credenciais protegidas. Especificamente:
        </p>
        <ul>
          <li>Acesso é limitado e registrado (audit log)</li>
          <li>Senhas armazenadas com hash criptográfico (nunca em texto plano)</li>
          <li>Dois fatores de autenticação para painéis administrativos</li>
        </ul>
        <p>
          <strong>Seus dados NUNCA são expostos publicamente no site.</strong> A página
          de cadastro e este documento são as únicas referências a médicos no site —
          e mesmo aqui, nenhum nome individual é mostrado.
        </p>

        <h2>5. Compartilhamento com terceiros</h2>
        <p>
          Compartilhamos seus dados com pacientes <strong>somente quando você consentir
          explicitamente</strong> ao receber e aceitar um lead específico. O paciente
          recebe seu nome, especialidade, endereço de consultório e meios de contato
          (telefone/WhatsApp).
        </p>
        <p>
          <strong>Não vendemos seus dados a terceiros.</strong> Não usamos seus dados
          para publicidade direcionada de outros serviços.
        </p>
        <p>
          Em casos excepcionais (ordem judicial, investigação do Conselho Federal de
          Medicina, fraude), podemos ser legalmente obrigados a compartilhar dados —
          nesses casos, você será notificado quando juridicamente possível.
        </p>

        <h2>6. Período de retenção</h2>
        <p>
          Mantemos seus dados enquanto seu cadastro estiver ativo. Se você cancelar
          o cadastro:
        </p>
        <ul>
          <li>Dados pessoais são removidos do banco de dados em até 30 dias</li>
          <li>Backups são purgados em até 90 dias</li>
          <li>Mantemos apenas dados anonimizados para fins estatísticos (sem identificação)</li>
        </ul>

        <h2>7. Seus direitos (LGPD)</h2>
        <p>
          Conforme a LGPD (Lei 13.709/2018), você tem direito a:
        </p>
        <ul>
          <li><strong>Acessar</strong> seus dados a qualquer momento</li>
          <li><strong>Corrigir</strong> dados incompletos, inexatos ou desatualizados</li>
          <li><strong>Deletar</strong> seus dados (direito ao esquecimento)</li>
          <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado</li>
          <li><strong>Revogar consentimento</strong> a qualquer momento</li>
          <li><strong>Saber com quem</strong> compartilhamos seus dados</li>
          <li><strong>Reclamar</strong> à ANPD (Autoridade Nacional de Proteção de Dados)</li>
        </ul>
        <p>
          Para exercer qualquer desses direitos, envie um email para{" "}
          <a href="mailto:privacidade@meuspeptideos.com.br">
            privacidade@meuspeptideos.com.br
          </a>{" "}
          ou responda a qualquer email que recebeu de nós. Atendemos solicitações
          em até 15 dias úteis.
        </p>

        <h2>8. Segurança técnica</h2>
        <ul>
          <li>Todos os dados em trânsito: TLS 1.3 obrigatório</li>
          <li>Dados em repouso: AES-256 (criptografia padrão Neon/AWS)</li>
          <li>Rate limiting nos endpoints públicos contra abuso</li>
          <li>Honeypot anti-spam no formulário</li>
          <li>Confirmação de email obrigatória antes da ativação</li>
          <li>Logs de auditoria para todos os acessos administrativos</li>
        </ul>

        <h2>9. Cookies e rastreamento</h2>
        <p>
          O Meus Peptídeos usa Google Analytics 4 para análise de tráfego agregado
          e anônimo. Não rastreamos médicos individualmente. Você pode bloquear
          cookies analíticos no seu navegador sem afetar o funcionamento do
          cadastro.
        </p>

        <h2>10. Alterações nesta política</h2>
        <p>
          Se atualizarmos esta política de forma significativa, notificaremos você
          por email com pelo menos 30 dias de antecedência. Mudanças menores são
          comunicadas via banner na próxima visita ao site.
        </p>

        <h2>11. Contato e DPO</h2>
        <p>
          Encarregado de Proteção de Dados (DPO): equipe Meus Peptídeos<br />
          Email:{" "}
          <a href="mailto:privacidade@meuspeptideos.com.br">
            privacidade@meuspeptideos.com.br
          </a>
        </p>
        <p>
          Esta política está em conformidade com a Lei Geral de Proteção de Dados
          Pessoais (Lei 13.709/2018).
        </p>
      </div>

      <div className="mt-10 flex gap-3">
        <Link
          href={`/${lang}/para-medicos`}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Voltar ao cadastro
        </Link>
        <Link
          href={`/${lang}`}
          className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
        >
          Página inicial
        </Link>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPreferencesButton } from "@/components/analytics-consent";
import { hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Política de Privacidade",
    description: "Como o Meus Peptídeos trata dados pessoais e preferências de privacidade.",
    alternates: langAlternates(lang, "/privacidade"),
    robots: { index: lang === "pt", follow: true },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase text-emerald-700">Atualizada em julho de 2026</p>
      <h1 className="mt-3 text-4xl font-bold text-zinc-950">Política de Privacidade</h1>
      <p className="mt-5 leading-relaxed text-zinc-600">
        Esta política explica como o Meus Peptídeos trata dados pessoais enviados voluntariamente no site. O conteúdo público pode ser acessado sem cadastro.
      </p>

      <div className="mt-10 space-y-9 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-xl font-semibold text-zinc-950">Dados coletados e finalidade</h2>
          <p className="mt-2">Na newsletter, tratamos email, origem do cadastro, confirmação, data e IP para enviar conteúdo solicitado e demonstrar o consentimento. No piloto do Radar, também podemos tratar nome, organização, WhatsApp, perfil e plano de interesse para pesquisa de produto e contato comercial autorizado.</p>
          <p className="mt-2">Registros técnicos de segurança e limitação de abuso podem incluir IP, data e endpoint acessado.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-zinc-950">Bases legais e escolhas</h2>
          <p className="mt-2">Newsletter e contato sobre o Radar dependem de consentimento específico. Você pode negar ou revogar a autorização sem perder acesso ao conteúdo público. Registros estritamente necessários à segurança e operação podem ser tratados com base no legítimo interesse, com acesso restrito.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-zinc-950">Fornecedores</h2>
          <p className="mt-2">Usamos Vercel para hospedagem, Neon para banco de dados e Resend para envio de emails. Esses fornecedores podem processar dados fora do Brasil conforme suas infraestruturas e contratos. O Google Analytics só é carregado após autorização explícita no aviso de privacidade.</p>
          <div className="mt-3"><PrivacyPreferencesButton /></div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-zinc-950">Compartilhamento e retenção</h2>
          <p className="mt-2">Não vendemos dados pessoais e os cadastros atuais não são usados para encaminhar pacientes a médicos, clínicas ou farmácias. Mantemos os dados enquanto necessários para a finalidade informada, obrigações legais, prevenção de fraude ou defesa de direitos, e os excluímos ou anonimizamos quando deixam de ser necessários.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-zinc-950">Seus direitos</h2>
          <p className="mt-2">Você pode solicitar confirmação de tratamento, acesso, correção, informação sobre compartilhamento, portabilidade quando aplicável, revogação do consentimento e exclusão de dados tratados com consentimento. A newsletter também oferece cancelamento pelo link enviado por email.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-zinc-950">Contato</h2>
          <p className="mt-2">Envie solicitações para <a className="font-semibold text-emerald-700 underline" href="mailto:privacidade@meuspeptideos.com.br">privacidade@meuspeptideos.com.br</a>. Podemos pedir informações adicionais para confirmar a identidade antes de atender uma solicitação.</p>
        </section>
      </div>
    </article>
  );
}

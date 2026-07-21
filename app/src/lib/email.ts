import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.EMAIL_FROM || "Meus Peptídeos <noreply@meuspeptideos.com.br>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://meuspeptideos.com.br";

export async function sendDoctorVerificationEmail(
  to: string,
  name: string,
  token: string
): Promise<void> {
  if (!resend) {
    console.warn("[email] Resend not configured — skipping verification email");
    return;
  }

  const verifyUrl = `${SITE_URL}/api/doctor/verify?token=${token}`;

  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: "Confirme seu cadastro — Meus Peptídeos",
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, Inter, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
  <div style="background: #0f172a; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
    <h1 style="color: white; margin: 0; font-size: 22px;">Meus Peptídeos</h1>
  </div>

  <h2 style="color: #0f172a; font-size: 20px;">Olá, Dr(a). ${escapeHtml(name)}</h2>

  <p style="color: #475569; line-height: 1.6;">
    Recebemos seu cadastro como médico parceiro do Meus Peptídeos. Para confirmar
    seu email e ativar seu cadastro, clique no botão abaixo:
  </p>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${verifyUrl}"
       style="background: #059669; color: white; padding: 14px 28px;
              text-decoration: none; border-radius: 8px; font-weight: 600;
              display: inline-block;">
      Confirmar cadastro
    </a>
  </div>

  <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
    Se você não fez este cadastro, simplesmente ignore este email — nenhum dado
    será mantido em nossos sistemas.
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

  <p style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
    O cadastro profissional está pausado para revisão. Você pode solicitar
    acesso, correção ou exclusão respondendo este email.
  </p>

  <p style="color: #94a3b8; font-size: 12px;">
    Se o botão não funcionar, copie e cole este link no navegador:<br>
    <a href="${verifyUrl}" style="color: #059669; word-break: break-all;">${verifyUrl}</a>
  </p>
</div>
      `,
    });
  } catch (e) {
    console.error("[email] Failed to send verification:", e);
  }
}

export async function sendAdminNotification(doctor: {
  name: string;
  email: string;
  specialty?: string | null;
  city?: string | null;
  state?: string | null;
  crm?: string | null;
}): Promise<void> {
  if (!resend || !ADMIN_EMAIL) {
    console.warn("[email] Resend or ADMIN_EMAIL not configured — skipping notification");
    return;
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `Novo médico cadastrado: ${doctor.name}`,
      html: `
<div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h2 style="color: #0f172a;">Novo cadastro de médico</h2>

  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; color: #64748b;">Nome:</td><td><strong>${doctor.name}</strong></td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td>${doctor.email}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Especialidade:</td><td>${doctor.specialty || "-"}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">Cidade:</td><td>${doctor.city || "-"}, ${doctor.state || "-"}</td></tr>
    <tr><td style="padding: 8px 0; color: #64748b;">CRM:</td><td>${doctor.crm || "-"}</td></tr>
  </table>

  <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
    Aguardando confirmação por email. Acesse o painel admin para validar e ativar.
  </p>
</div>
      `,
    });
  } catch (e) {
    console.error("[email] Failed to send admin notification:", e);
  }
}

export async function sendSubscriberConfirmationEmail(
  to: string,
  token: string,
  unsubscribeToken: string
) {
  if (!resend) return { ok: false as const, reason: "no-resend" };

  const confirmUrl = `${SITE_URL}/api/subscribe/confirm?token=${encodeURIComponent(token)}`;
  const unsubscribeUrl = `${SITE_URL}/api/subscribe/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: "Confirme sua inscrição - Meus Peptídeos",
    html: `
<div style="font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px">
  <h1 style="color:#0f172a;font-size:22px">Confirme sua inscrição</h1>
  <p style="color:#475569;line-height:1.6">Use o botão abaixo para confirmar que deseja receber atualizações editoriais e regulatórias do Meus Peptídeos.</p>
  <p style="margin:28px 0"><a href="${escapeHtml(confirmUrl)}" style="display:inline-block;background:#047857;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">Confirmar inscrição</a></p>
  <p style="color:#64748b;font-size:13px;line-height:1.5">Se você não solicitou esta inscrição, ignore esta mensagem. O endereço não será incluído em envios até a confirmação.</p>
  <p style="color:#94a3b8;font-size:12px"><a href="${escapeHtml(unsubscribeUrl)}" style="color:#64748b">Cancelar e remover meu email</a></p>
</div>`,
  });

  return error ? { ok: false as const, reason: error.message } : { ok: true as const };
}

export type RadarInterestEmailData = {
  audience: string;
  name: string | null;
  organization: string | null;
  email: string;
  whatsapp: string | null;
  plan: string;
  sourcePage: string;
};

export async function sendRadarInterestAdminAlert(interest: RadarInterestEmailData) {
  if (!resend || !ADMIN_EMAIL) return { ok: false as const, reason: "no-admin-email" };

  const { error } = await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[MP] Interesse no Radar - ${emailSubjectPart(interest.audience)}`,
    html: `
<div style="font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;max-width:620px;margin:0 auto;padding:24px">
  <h2 style="color:#0f172a">Novo interesse comercial no Radar</h2>
  <ul>
    <li><b>Público:</b> ${escapeHtml(interest.audience)}</li>
    <li><b>Plano:</b> ${escapeHtml(interest.plan)}</li>
    <li><b>Nome:</b> ${escapeHtml(interest.name) || "não informado"}</li>
    <li><b>Organização:</b> ${escapeHtml(interest.organization) || "não informada"}</li>
    <li><b>Email:</b> ${escapeHtml(interest.email)}</li>
    <li><b>WhatsApp:</b> ${escapeHtml(interest.whatsapp) || "não informado"}</li>
    <li><b>Origem:</b> ${escapeHtml(interest.sourcePage)}</li>
  </ul>
</div>`,
  });

  return error ? { ok: false as const, reason: error.message } : { ok: true as const };
}

function escapeHtml(value: string | null | undefined): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailSubjectPart(value: string | null | undefined, fallback = "n/i"): string {
  const clean = String(value ?? fallback)
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, 120);
  return clean || fallback;
}

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
    subject: `Novo pedido de orçamento - ${emailSubjectPart(quote.compoundSlug)} (${emailSubjectPart(quote.city, "cidade n/i")})`,
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, Inter, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px;">
  <h2 style="color:#0f172a;">Novo pedido de orçamento via Meus Peptídeos</h2>
  <p>Olá, ${escapeHtml(pharmacyName)}. Um interessado pediu orçamento:</p>
  <ul>
    <li><b>Composto:</b> ${escapeHtml(quote.compoundSlug)}</li>
    <li><b>Nome:</b> ${escapeHtml(quote.name)}</li>
    <li><b>WhatsApp:</b> ${escapeHtml(quote.whatsapp)}</li>
    <li><b>E-mail:</b> ${escapeHtml(quote.email) || "não informado"}</li>
    <li><b>Cidade/UF:</b> ${escapeHtml(quote.city) || "n/i"} / ${escapeHtml(quote.state) || "n/i"}</li>
    <li><b>Tem prescrição:</b> ${quote.hasPrescription ? "Sim" : "Ainda não"}</li>
    ${quote.message ? `<li><b>Mensagem:</b> ${escapeHtml(quote.message)}</li>` : ""}
  </ul>
  <p>Responda em até 24h. Leads respondidos rápido tendem a converter melhor.</p>
  <p style="color:#64748b;font-size:12px">Ref: ${escapeHtml(quote.id)} - Parceria Meus Peptídeos (${SITE_URL})</p>
</div>
    `,
  });

  return error ? { ok: false as const, reason: error.message } : { ok: true as const };
}

export async function sendQuoteAdminAlert(
  quote: QuoteEmailData,
  routedTo: string[]
) {
  if (!resend || !ADMIN_EMAIL) return { ok: false as const, reason: "no-admin-email" };

  const routedText = routedTo.length ? routedTo.join(", ") : "SEM FARMÁCIA (fila manual)";
  const { error } = await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[MP] Orçamento: ${emailSubjectPart(quote.compoundSlug)} -> ${emailSubjectPart(routedText, "fila manual")}`,
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, Inter, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px;">
  <p>${escapeHtml(quote.name)} (${escapeHtml(quote.whatsapp)}) pediu orçamento de <b>${escapeHtml(quote.compoundSlug)}</b> em ${escapeHtml(quote.city) || "?"}/${escapeHtml(quote.state) || "?"}.</p>
  <p>Roteado para: ${escapeHtml(routedText)}</p>
  <p><a href="${SITE_URL}/admin/quotes">Abrir pipeline de orçamentos</a></p>
</div>
    `,
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

  const interest = lead.peptideInterest.join(", ") || "peptídeos";
  const { error } = await resend.emails.send({
    from: FROM,
    to: doctorEmail,
    subject: `Novo paciente interessado - ${emailSubjectPart(interest)} (${emailSubjectPart(lead.city, "cidade n/i")})`,
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, Inter, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px;">
  <h2 style="color:#0f172a;">Indicação de paciente via Meus Peptídeos</h2>
  <p>Dr(a). ${escapeHtml(doctorName)}, um paciente da sua região demonstrou interesse:</p>
  <ul>
    <li><b>Nome:</b> ${escapeHtml(lead.name) || "não informado"}</li>
    <li><b>WhatsApp:</b> ${escapeHtml(lead.whatsapp) || "não informado"}</li>
    <li><b>E-mail:</b> ${escapeHtml(lead.email) || "não informado"}</li>
    <li><b>Cidade/UF:</b> ${escapeHtml(lead.city) || "n/i"} / ${escapeHtml(lead.state) || "n/i"}</li>
    <li><b>Interesse:</b> ${escapeHtml(interest)}</li>
  </ul>
  <p>Recomendamos contato em até 24h. Este paciente consentiu (LGPD) em ser contatado por um médico parceiro.</p>
  <p style="color:#64748b;font-size:12px">Parceria Meus Peptídeos (${SITE_URL})</p>
</div>
    `,
  });

  return error ? { ok: false as const, reason: error.message } : { ok: true as const };
}

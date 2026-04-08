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

  <h2 style="color: #0f172a; font-size: 20px;">Olá, Dr(a). ${name}</h2>

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
    Seus dados são confidenciais e armazenados com segurança em nossos servidores
    no Brasil (LGPD compliant). Você pode solicitar exclusão a qualquer momento
    respondendo este email.
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

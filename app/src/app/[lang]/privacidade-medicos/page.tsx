import { redirect } from "next/navigation";

export default async function LegacyPrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}/privacidade`);
}

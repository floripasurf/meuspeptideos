import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";

const localeMap: Record<string, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-419",
};

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: {
      default: dict.meta.title,
      template: "%s | Meus Peptídeos",
    },
    description: dict.meta.description,
    openGraph: {
      locale: localeMap[lang],
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang as Locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang as Locale} dict={dict} />
      <AnalyticsConsent />
    </>
  );
}

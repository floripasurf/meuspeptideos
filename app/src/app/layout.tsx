import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const GA_ID = "G-ZQ5MZYG58G";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Meus Peptídeos — A ciência por trás dos compostos da nova medicina",
    template: "%s | Meus Peptídeos",
  },
  description:
    "A ciência por trás dos compostos da nova medicina: peptídeos, nootrópicos, senolíticos e compostos de longevidade. Benefícios comprovados, riscos, protocolos de uso e regulamentação no Brasil.",
  metadataBase: new URL("https://meuspeptideos.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Meus Peptídeos",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-surface text-navy-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

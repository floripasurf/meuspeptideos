import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { InstagramFunnel } from "@/components/instagram-funnel";
import { hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Instagram - Meus Peptideos",
    description:
      "Ponto de entrada para quem chegou pelo Instagram e quer entender peptideos, orcamentos, medicos ou parcerias B2B.",
    alternates: langAlternates(lang, "/instagram"),
    robots: { index: false, follow: true },
  };
}

export default async function InstagramPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Meus Peptideos no Instagram
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
          Escolha o proximo passo certo para voce
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
          Organizamos informacao sobre peptideos, riscos, prescricao e caminhos
          comerciais sem vender promessa. Cada clique abaixo ajuda a direcionar
          o conteudo e medir o funil social.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-48 rounded-lg border border-zinc-200 bg-zinc-50" />}>
            <InstagramFunnel lang={lang} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

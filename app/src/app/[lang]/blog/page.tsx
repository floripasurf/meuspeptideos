import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NewsletterForm } from "@/components/newsletter-form";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { langAlternates } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: "Blog — Artigos sobre Peptídeos",
    description:
      "Artigos sobre peptídeos: inovações, regulamentação, pesquisas promissoras e o futuro da medicina peptídica no Brasil.",
    alternates: langAlternates(lang, "/blog"),
  };
}

type Props = { params: Promise<{ lang: string }> };

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      tags: true,
      author: true,
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Blog
        </h1>
        <p className="mt-2 text-lg text-zinc-600">
          Artigos sobre inovações, regulamentação e pesquisas em peptídeos.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-zinc-500">Artigos em preparação.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-zinc-200/60 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
                {post.publishedAt && (
                  <span className="text-xs text-zinc-400">
                    {post.publishedAt.toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
              <Link href={`/${lang}/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-zinc-900 transition-colors group-hover:text-emerald-600">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {post.excerpt}
              </p>
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Ler artigo
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      )}

      <section className="mt-16 rounded-2xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #f0f9ff 50%, #f5f3ff 100%)" }}>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          Receba novos artigos
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Atualizações sobre peptídeos, regulamentação e novas pesquisas.
        </p>
        <NewsletterForm source="blog" />
      </section>
    </div>
  );
}

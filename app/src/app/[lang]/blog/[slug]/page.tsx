import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { NewsletterForm } from "@/components/newsletter-form";
import { getDictionary, hasLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  });
  if (!post) return { title: "Artigo não encontrado" };
  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Meus Peptídeos",
      url: "https://meuspeptideos.com.br",
    },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: "pt-BR",
    url: `https://meuspeptideos.com.br/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-zinc-500">
          <span>Por {post.author}</span>
          {post.reviewerName && (
            <>
              <span>·</span>
              <span>
                Revisado por {post.reviewerName}
                {post.reviewerCrm && ` (${post.reviewerCrm})`}
              </span>
            </>
          )}
          {post.publishedAt && (
            <>
              <span>·</span>
              <span>
                {post.publishedAt.toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </>
          )}
        </div>
      </header>

      <div
        className="prose prose-zinc prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Disclaimer */}
      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">
          <strong>Aviso:</strong> Este conteúdo tem caráter exclusivamente
          informativo e educacional. Não substitui orientação médica
          profissional. Consulte sempre um médico antes de iniciar qualquer
          tratamento.
        </p>
      </div>

      {/* Newsletter */}
      <section className="mt-10 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #f0f9ff 50%, #f5f3ff 100%)" }}>
        <h2 className="text-xl font-semibold text-zinc-900">
          Gostou? Receba mais artigos
        </h2>
        <NewsletterForm source={`blog_${post.slug}`} />
      </section>

      <div className="mt-8">
        <Link
          href={`/${lang}/blog`}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
        >
          ← Voltar ao blog
        </Link>
      </div>
    </article>
  );
}

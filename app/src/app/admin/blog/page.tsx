"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  reviewerName: string | null;
  reviewerCrm: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
};

const inputCls =
  "w-full rounded-lg border border-navy-700 bg-navy-900 px-3 py-2 text-sm text-navy-100 placeholder:text-navy-500";

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState<Record<string, Partial<Post>>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setPosts(data.posts || []);
    setDraft({});
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function field(p: Post, key: keyof Post) {
    const d = draft[p.id];
    return (d && key in d ? (d as Record<string, unknown>)[key] : p[key]) as string;
  }
  function set(id: string, key: keyof Post, value: string) {
    setDraft((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  }

  async function save(p: Post, publish: boolean) {
    setMessage("");
    const d = draft[p.id] || {};
    const payload: Record<string, unknown> = { id: p.id, ...d };
    if (typeof payload.tags === "string") {
      payload.tags = (payload.tags as string).split(",").map((t) => t.trim()).filter(Boolean);
    }
    if (publish) payload.published = true;
    const res = await fetch("/api/admin/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(`⚠️ ${data.error || "erro ao salvar"}`);
      return;
    }
    setMessage(publish ? `✅ Publicado: ${p.slug}` : `💾 Salvo: ${p.slug}`);
    load();
  }

  async function unpublish(p: Post) {
    await fetch("/api/admin/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, published: false }),
    });
    load();
  }

  async function remove(p: Post) {
    if (!confirm(`Excluir rascunho "${p.title}"?`)) return;
    await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id }),
    });
    load();
  }

  const drafts = posts.filter((p) => !p.published);
  const published = posts.filter((p) => p.published);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-white">Blog</h1>
      <p className="mt-1 text-sm text-navy-400">
        O cron semanal <strong>publica automaticamente</strong> os artigos aprovados pelo revisor
        adversarial de IA. Use esta tela para a revisão ao vivo: corrigir texto, despublicar ou
        excluir. O revisor (nome + CRM) é <strong>opcional</strong> — preencha quando um médico
        cadastrado assinar o artigo.
      </p>
      {message && <p className="mt-3 rounded-lg bg-navy-800 px-3 py-2 text-sm text-navy-100">{message}</p>}
      {loading && <p className="mt-6 text-navy-400">Carregando…</p>}

      <h2 className="mt-8 text-lg font-semibold text-amber-300">Rascunhos ({drafts.length})</h2>
      <div className="mt-3 space-y-6">
        {drafts.map((p) => (
          <PostCard
            key={p.id}
            p={p}
            field={field}
            set={set}
            onSave={() => save(p, false)}
            onPublish={() => save(p, true)}
            onDelete={() => remove(p)}
          />
        ))}
        {!loading && drafts.length === 0 && (
          <p className="text-sm text-navy-500">Nenhum rascunho no momento.</p>
        )}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-emerald-300">Publicados ({published.length})</h2>
      <div className="mt-3 space-y-6">
        {published.map((p) => (
          <PostCard
            key={p.id}
            p={p}
            published
            field={field}
            set={set}
            onSave={() => save(p, false)}
            onPublish={() => unpublish(p)}
            onDelete={() => remove(p)}
          />
        ))}
        {!loading && published.length === 0 && (
          <p className="text-sm text-navy-500">Nenhum artigo publicado ainda.</p>
        )}
      </div>
    </div>
  );
}

function PostCard({
  p,
  field,
  set,
  onSave,
  onPublish,
  onDelete,
  published = false,
}: {
  p: Post;
  field: (p: Post, key: keyof Post) => string;
  set: (id: string, key: keyof Post, value: string) => void;
  onSave: () => void;
  onPublish: () => void;
  onDelete: () => void;
  published?: boolean;
}) {
  return (
    <div className="rounded-xl border border-navy-700 bg-navy-900/60 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs text-navy-400">Título</span>
          <input className={inputCls} value={field(p, "title")} onChange={(e) => set(p.id, "title", e.target.value)} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs text-navy-400">Resumo (excerpt)</span>
          <input className={inputCls} value={field(p, "excerpt")} onChange={(e) => set(p.id, "excerpt", e.target.value)} />
        </label>
        <label className="block">
          <span className="text-xs text-navy-400">Revisor (nome)</span>
          <input className={inputCls} placeholder="Dr. Fulano" value={field(p, "reviewerName") || ""} onChange={(e) => set(p.id, "reviewerName", e.target.value)} />
        </label>
        <label className="block">
          <span className="text-xs text-navy-400">Revisor (CRM)</span>
          <input className={inputCls} placeholder="CRM/SP 123456" value={field(p, "reviewerCrm") || ""} onChange={(e) => set(p.id, "reviewerCrm", e.target.value)} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs text-navy-400">Tags (separadas por vírgula)</span>
          <input className={inputCls} value={Array.isArray(field(p, "tags")) ? (field(p, "tags") as unknown as string[]).join(", ") : field(p, "tags")} onChange={(e) => set(p.id, "tags", e.target.value)} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs text-navy-400">Conteúdo (HTML)</span>
          <textarea className={`${inputCls} h-64 font-mono text-xs`} value={field(p, "content")} onChange={(e) => set(p.id, "content", e.target.value)} />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600" onClick={onSave}>
          Salvar
        </button>
        {published ? (
          <button className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600" onClick={onPublish}>
            Despublicar
          </button>
        ) : (
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500" onClick={onPublish}>
            Publicar
          </button>
        )}
        <a className="rounded-lg border border-navy-700 px-4 py-2 text-sm text-navy-200 hover:bg-navy-800" href={`/pt/blog/${p.slug}`} target="_blank" rel="noreferrer">
          Preview
        </a>
        <button className="ml-auto text-sm text-red-400 hover:text-red-300" onClick={onDelete}>
          Excluir
        </button>
      </div>
    </div>
  );
}

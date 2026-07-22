import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: [{ published: "asc" }, { createdAt: "desc" }],
    take: 200,
  });

  return NextResponse.json({ posts });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { id, title, excerpt, content, tags, reviewerName, reviewerCrm, published } = body;
  if (!id) return NextResponse.json({ error: "id obrigatorio" }, { status: 400 });

  const existing = await prisma.blogPost.findUnique({ where: { id: String(id) } });
  if (!existing) return NextResponse.json({ error: "post nao encontrado" }, { status: 404 });

  // Revisor médico é opcional (assinatura futura). Posts publicados indexam
  // mesmo sem revisor; a checagem anti-alucinação é feita no pipeline.
  const willPublish = published === true;

  const post = await prisma.blogPost.update({
    where: { id: String(id) },
    data: {
      ...(title !== undefined && { title: String(title) }),
      ...(excerpt !== undefined && { excerpt: String(excerpt) }),
      ...(content !== undefined && { content: String(content) }),
      ...(tags !== undefined && {
        tags: Array.isArray(tags)
          ? tags.map(String)
          : String(tags).split(",").map((t) => t.trim()).filter(Boolean),
      }),
      ...(reviewerName !== undefined && { reviewerName: reviewerName || null }),
      ...(reviewerCrm !== undefined && { reviewerCrm: reviewerCrm || null }),
      ...(published !== undefined && {
        published: willPublish,
        publishedAt: willPublish ? existing.publishedAt ?? new Date() : existing.publishedAt,
      }),
    },
  });

  return NextResponse.json({ post });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "id obrigatorio" }, { status: 400 });
  await prisma.blogPost.delete({ where: { id: String(id) } });
  return NextResponse.json({ ok: true });
}

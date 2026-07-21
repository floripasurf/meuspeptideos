import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (token) {
    await prisma.subscriber.deleteMany({ where: { unsubscribeToken: token } });
  }

  return NextResponse.redirect(new URL("/pt/radar?newsletter=unsubscribed", request.url));
}

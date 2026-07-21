import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/pt/radar?newsletter=invalid", request.url));
  }

  const subscriber = await prisma.subscriber.findUnique({
    where: { confirmationToken: token },
    select: { id: true },
  });
  if (!subscriber) {
    return NextResponse.redirect(new URL("/pt/radar?newsletter=invalid", request.url));
  }

  await prisma.subscriber.update({
    where: { id: subscriber.id },
    data: { confirmed: true, confirmedAt: new Date(), confirmationToken: null },
  });

  return NextResponse.redirect(new URL("/pt/radar?newsletter=confirmed", request.url));
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/para-medicos?verify=invalid", request.url)
    );
  }

  const doctor = await prisma.doctor.findUnique({
    where: { verificationToken: token },
  });

  if (!doctor) {
    return NextResponse.redirect(
      new URL("/para-medicos?verify=invalid", request.url)
    );
  }

  if (doctor.emailVerified) {
    return NextResponse.redirect(
      new URL("/para-medicos?verify=already", request.url)
    );
  }

  await prisma.doctor.update({
    where: { id: doctor.id },
    data: {
      emailVerified: true,
      verifiedAt: new Date(),
      verificationToken: null, // burn the token
    },
  });

  return NextResponse.redirect(
    new URL("/para-medicos?verify=success", request.url)
  );
}

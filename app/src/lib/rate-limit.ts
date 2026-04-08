import { prisma } from "@/lib/prisma";

/**
 * Rate limiting via Postgres.
 * Tracks IP submissions per endpoint with a time window.
 */
export async function checkRateLimit(
  ip: string,
  endpoint: string,
  maxRequests: number,
  windowMinutes: number
): Promise<{ allowed: boolean; remaining: number }> {
  if (!ip || ip === "unknown") {
    // If we can't determine IP, allow but log it
    return { allowed: true, remaining: maxRequests };
  }

  const since = new Date(Date.now() - windowMinutes * 60 * 1000);

  const count = await prisma.rateLimitEntry.count({
    where: {
      ip,
      endpoint,
      createdAt: { gte: since },
    },
  });

  if (count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  // Record this request
  await prisma.rateLimitEntry.create({
    data: { ip, endpoint },
  });

  return { allowed: true, remaining: maxRequests - count - 1 };
}

/**
 * Extract IP from Next.js request headers.
 * Vercel sets x-forwarded-for or x-real-ip.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return headers.get("x-real-ip") || "unknown";
}

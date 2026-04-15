import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "mp_admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

/**
 * Creates a session token from the admin password.
 * Token = HMAC(password, secret). If password matches env, token is valid.
 */
function generateToken(password: string): string {
  const secret = process.env.ADMIN_SECRET || "mp-default-secret-change-me";
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD env var not set");
  return generateToken(password);
}

export function validatePassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export function createSessionToken(): string {
  return getExpectedToken();
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);
    if (!session?.value) return false;
    return session.value === getExpectedToken();
  } catch {
    return false;
  }
}

export { COOKIE_NAME, SESSION_DURATION };

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);

export async function signToken(payload: Record<string, string>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies(); // ✅ FIX HERE
  return cookieStore.get('admin_token')?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  if (!token) return false;

  const payload = await verifyToken(token);
  return !!payload;
}
// src/lib/ip-hash.ts
import crypto from 'crypto';

export function hashIP(ip: string | null): string | null {
  if (!ip) return null;
  return crypto.createHash('sha256').update(ip).digest('hex');
}

export function getClientIP(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

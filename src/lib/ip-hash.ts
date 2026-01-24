// src/lib/ip-hash.ts

// 浏览器端简化的哈希函数
export function hashIP(input: string | null): string | null {
  if (!input) return null;
  
  // 简单的哈希函数（用于客户端）
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

// 生成基于浏览器指纹的唯一标识
export function getBrowserFingerprint(): string {
  // 组合多个浏览器特征
  const features = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset().toString(),
    screen.colorDepth.toString(),
    screen.width + 'x' + screen.height,
  ];
  
  return hashIP(features.join('|')) || 'unknown';
}

// 服务器端使用（仅用于 API 路由）
export function getClientIP(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

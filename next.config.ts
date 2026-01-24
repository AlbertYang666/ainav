import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // 注意：移除 output: 'export' 以支持 API 路由
  // Vercel 会自动优化静态页面
  images: {
    unoptimized: true,
  },
  // 禁用 trailingSlash，因为它会导致 NextAuth API 路由出错
  // NextAuth 需要 /api/auth/session 而不是 /api/auth/session/
  trailingSlash: false,
};

export default nextConfig;


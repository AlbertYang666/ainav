import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // 注意：移除 output: 'export' 以支持 API 路由
  // Vercel 会自动优化静态页面
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;


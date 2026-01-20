import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export', // 静态导出
  images: {
    unoptimized: true, // 静态导出时需要禁用图片优化
  },
  // 可选：配置路径别名
  trailingSlash: true, // 添加尾部斜杠，对SEO友好
};

export default nextConfig;


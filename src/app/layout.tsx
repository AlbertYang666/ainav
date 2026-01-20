import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { generateSEO } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = generateSEO();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  AI导航
                </Link>
                <div className="flex items-center gap-6">
                  <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    首页
                  </Link>
                  <Link href="/search" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    搜索
                  </Link>
                  <Link 
                    href="/submit" 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    提交工具
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 mt-20">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-gray-600 dark:text-gray-400">
                <p className="mb-2">© 2026 ainav.space - 精选优质AI工具导航</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <Link href="/submit" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    提交工具
                  </Link>
                  <span>•</span>
                  <a href="https://github.com/AlbertYang666/ainav" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

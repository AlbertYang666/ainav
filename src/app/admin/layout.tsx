'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LayoutDashboard, MessageSquare, Bot, FileText, Menu, X, LogOut, ExternalLink, ShieldAlert, ChevronRight, Mail, Users, Inbox } from 'lucide-react';

const navItems = [
  { href: '/admin', label: '仪表盘', icon: LayoutDashboard },
  { href: '/admin/reviews', label: '评论管理', icon: MessageSquare },
  { href: '/admin/services', label: '服务管理', icon: Bot },
  { href: '/admin/submissions', label: '提交审核', icon: FileText },
  { href: '/admin/emails', label: '邮件营销', icon: Mail },
  { href: '/admin/mailbox', label: '邮箱管理', icon: Inbox },
  { href: '/admin/subscribers', label: '订阅者', icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user?.isAdmin) {
      // Redirect to signin with callbackUrl to return to admin after login
      const callbackUrl = encodeURIComponent(pathname || '/admin');
      router.push(`/auth/signin?callbackUrl=${callbackUrl}`);
    }
  }, [session, status, router, pathname]);

  const closeSidebar = () => setSidebarOpen(false);

  // 加载中
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 未授权
  if (!session?.user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-md w-full">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">访问被拒绝</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
             此区域仅限管理员访问。如果您认为这是个错误，请联系系统管理员。
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:opacity-90 transition-all w-full"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* 桌面端侧边栏 */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700/50">
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700/50">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:rotate-6 transition-transform">
              A
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              AI Nav
            </span>
            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">Admin</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-700/50">
           <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                 {session.user.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{session.user.name || 'Admin'}</p>
                 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.user.email}</p>
              </div>
           </div>
           <Link
              href="/"
              className="flex items-center gap-2 justify-center w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              退出后台
            </Link>
        </div>
      </aside>

      {/* 移动端侧边栏遮罩 */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* 移动端侧边栏 */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out lg:hidden border-r border-gray-200 dark:border-gray-700 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
         <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-700">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={closeSidebar} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
         </div>
         <div className="p-4 space-y-1">
            {navItems.map((item) => {
               const isActive = pathname === item.href;
               return (
                 <Link
                   key={item.href}
                   href={item.href}
                   onClick={closeSidebar}
                   className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                     isActive
                       ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                       : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                   }`}
                 >
                   <item.icon className="w-5 h-5" />
                   {item.label}
                 </Link>
               );
             })}
         </div>
         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-700">
             <Link
                href="/"
                className="flex items-center gap-2 w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white justify-center"
              >
                <ExternalLink className="w-4 h-4" />
                返回前台
              </Link>
         </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-30 lg:hidden">
           <div className="flex items-center justify-between px-4 h-full">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <span className="font-semibold text-gray-900 dark:text-white">Admin Dashboard</span>
              <div className="w-8"></div> {/* Spacer */}
           </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

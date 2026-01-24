'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        登录
      </button>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2">
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
            {session.user?.name?.charAt(0) || 'U'}
          </div>
        )}
      </button>

      {/* 下拉菜单 */}
      <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {session.user?.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {session.user?.email}
          </p>
          {session.user?.isAdmin && (
            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
              管理员
            </span>
          )}
        </div>

        {session.user?.isAdmin && (
          <Link
            href="/admin"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ⚙️ 管理后台
          </Link>
        )}

        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          退出登录
        </button>
      </div>
    </div>
  );
}

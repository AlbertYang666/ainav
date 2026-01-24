"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  lang: string;
  labels: {
    home: string;
    search: string;
  };
}

export default function NavLinks({ lang, labels }: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === `/${lang}` && pathname === `/${lang}`) return true;
    if (path !== `/${lang}` && pathname?.startsWith(path)) return true;
    return false;
  };

  const activeClasses = "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm";
  const inactiveClasses = "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50";

  return (
    <div className="hidden md:flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-full border border-gray-200/50 dark:border-gray-700/50 mr-2">
      <Link
        href={`/${lang}`}
        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
          isActive(`/${lang}`) ? activeClasses : inactiveClasses
        }`}
      >
        {labels.home}
      </Link>
      <Link
        href={`/${lang}/search`}
        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
          isActive(`/${lang}/search`) ? activeClasses : inactiveClasses
        }`}
      >
        {labels.search}
      </Link>
    </div>
  );
}

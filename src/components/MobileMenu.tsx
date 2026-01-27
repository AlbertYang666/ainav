'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Search, Plus, Bookmark, Info } from 'lucide-react';

interface MobileMenuProps {
  lang: string;
  labels: {
    home: string;
    search: string;
    about: string;
    submit: string;
    bookmarks: string;
  };
}

export default function MobileMenu({ lang, labels }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === `/${lang}` && pathname === `/${lang}`) return true;
    if (path !== `/${lang}` && pathname?.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    { href: `/${lang}`, label: labels.home, icon: Home },
    { href: `/${lang}/search`, label: labels.search, icon: Search },
    { href: `/${lang}/about`, label: labels.about, icon: Info },
    { href: `/${lang}/bookmarks`, label: labels.bookmarks, icon: Bookmark },
    { href: `/${lang}/submit`, label: labels.submit, icon: Plus },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg z-50 md:hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        active
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

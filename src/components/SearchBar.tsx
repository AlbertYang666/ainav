"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface SearchBarProps {
  locale: Locale;
  placeholder: string;
  buttonText: string;
}

export default function SearchBar({ locale, placeholder, buttonText }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative z-20">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-8 py-5 text-lg rounded-full focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all shadow-xl placeholder-gray-400 dark:placeholder-gray-500 border border-gray-100 dark:border-gray-700"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-full transition-all shadow-md hover:shadow-lg transform active:scale-95"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  );
}

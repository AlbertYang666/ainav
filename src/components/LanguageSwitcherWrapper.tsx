"use client";

import { Suspense } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { Locale } from '@/lib/i18n';

export default function LanguageSwitcherWrapper({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={
      <div className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      </div>
    }>
      <LanguageSwitcher locale={locale} />
    </Suspense>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO } from '@/lib/seo';
import { getDictionary, Locale, locales } from '@/lib/i18n';
import LanguageSwitcherWrapper from '@/components/LanguageSwitcherWrapper';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = getDictionary(lang as Locale);

  return generateSEO({
    locale: lang as Locale,
    title: dictionary.siteName,
    description: dictionary.siteDescription,
    url: `/${lang}`,
  });
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = getDictionary(lang as Locale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <Logo className="w-8 h-8" />
              <span>{dictionary.brand}</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-4 md:gap-6">
                <Link
                  href={`/${lang}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {dictionary.nav.home}
                </Link>
                <Link
                  href={`/${lang}/search`}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {dictionary.nav.search}
                </Link>
                <Link
                  href={`/${lang}/submit`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  {dictionary.nav.submit}
                </Link>
              </div>
              <div className="sm:hidden flex items-center gap-2">
                <Link
                  href={`/${lang}/search`}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={dictionary.nav.search}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
                <Link
                  href={`/${lang}/submit`}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={dictionary.nav.submit}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Link>
              </div>
              <ThemeToggle />
              <LanguageSwitcherWrapper locale={lang as Locale} />
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">{dictionary.footer.copyright}</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link href={`/${lang}/submit`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {dictionary.footer.submit}
              </Link>
              <span>•</span>
              <a
                href="https://github.com/AlbertYang666/ainav"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {dictionary.footer.github}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

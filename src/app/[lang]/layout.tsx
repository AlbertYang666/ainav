import type { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO } from '@/lib/seo';
import { getDictionary, Locale, locales } from '@/lib/i18n';
import LanguageSwitcherWrapper from '@/components/LanguageSwitcherWrapper';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import CompareProvider from '@/components/CompareProvider';
import CompareBar from '@/components/CompareBar';
import { Search, Plus, Github } from 'lucide-react';
import NavLinks from '@/components/NavLinks';

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
    <CompareProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-2.5 group"
            >
              <div className="group-hover:rotate-12 transition-transform duration-300">
                <Logo className="w-8 h-8" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                {dictionary.brand}
              </span>
            </Link>
            
            <div className="flex items-center gap-3">
              <NavLinks 
                lang={lang} 
                labels={{
                  home: dictionary.nav.home,
                  search: dictionary.nav.search
                }} 
              />

              <Link
                href={`/${lang}/submit`}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-gray-200/50 dark:shadow-none"
              >
                <Plus className="w-4 h-4" />
                <span>{dictionary.nav.submit}</span>
              </Link>
              
              <div className="md:hidden flex items-center gap-2">
                <Link
                  href={`/${lang}/search`}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </Link>
              </div>

              <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1"></div>
              
              <ThemeToggle />
              <LanguageSwitcherWrapper locale={lang as Locale} />
            </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-20 pb-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link href={`/${lang}`} className="flex items-center gap-2 mb-4">
                <Logo className="w-6 h-6 grayscale opacity-80" />
                <span className="font-bold text-gray-900 dark:text-white">{dictionary.brand}</span>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {dictionary.footer.copyright}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href={`/${lang}`} className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
                <li><Link href={`/${lang}/search`} className="hover:text-blue-600 dark:hover:text-blue-400">Search</Link></li>
                <li><Link href={`/${lang}/submit`} className="hover:text-blue-600 dark:hover:text-blue-400">Submit Tool</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/AlbertYang666/ainav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
                <a
                  href="https://www.producthunt.com/products/ai-directory-4?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-ai-directory-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
                  aria-label="Product Hunt"
                >
                  <svg viewBox="0 0 40 40" fill="currentColor" className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-[#FF6154] transition-colors" fillRule="evenodd" clipRule="evenodd">
                    <path d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20M22.667 20H17v-6h5.667a3 3 0 0 1 0 6m0-10H13v20h4v-6h5.667a7 7 0 1 0 0-14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <CompareBar locale={lang as Locale} />
    </div>
    </CompareProvider>
  );
}

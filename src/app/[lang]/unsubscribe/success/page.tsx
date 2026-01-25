import { Suspense } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle } from 'lucide-react';
import { getDictionary, Locale } from '@/lib/i18n';

function UnsubscribeContent({
  searchParams,
  dict,
  lang,
}: {
  searchParams: { email?: string };
  dict: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
}) {
  const email = searchParams.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {dict.unsubscribe.successTitle}
          </h1>

          {/* Email Display */}
          {email && (
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <span className="font-medium text-gray-900 dark:text-white">{email}</span>
              <br />
              {dict.unsubscribe.emailRemoved}
            </p>
          )}

          {/* Message */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {dict.unsubscribe.noMoreEmails}
            </p>
          </div>

          {/* Change Mind */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {dict.unsubscribe.changedMind}
          </div>

          {/* Resubscribe Link */}
          <Link
            href={`/${lang}`}
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {dict.unsubscribe.returnHome}
          </Link>

          {/* Additional Info */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
            {dict.unsubscribe.safetyNote}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function UnsubscribeSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const queryParams = await searchParams;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnsubscribeContent searchParams={queryParams} dict={dict} lang={lang} />
    </Suspense>
  );
}

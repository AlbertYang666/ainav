import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import { FileText, AlertTriangle, CheckCircle, XCircle, Shield, Calendar } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  
  return {
    title: dict.terms?.metaTitle,
    description: dict.terms?.metaDescription,
    keywords: dict.terms?.keywords,
    openGraph: {
      title: dict.terms?.metaTitle,
      description: dict.terms?.metaDescription,
      type: 'website',
    },
  };
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  if (!dict.terms) {
    return <div>Terms of service not available</div>;
  }

  const terms = dict.terms;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400 font-medium">{terms.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {terms.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {terms.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{terms.lastUpdated}: 2026-01-27</span>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-4 bg-white dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{terms.quickNav}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="#acceptance" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              {terms.sections.acceptance.title}
            </a>
            <a href="#services" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              {terms.sections.services.title}
            </a>
            <a href="#user-conduct" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              {terms.sections.userConduct.title}
            </a>
            <a href="#content" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              {terms.sections.content.title}
            </a>
            <a href="#intellectual-property" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              {terms.sections.intellectual.title}
            </a>
            <a href="#disclaimer" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              {terms.sections.disclaimer.title}
            </a>
            <a href="#termination" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              {terms.sections.termination.title}
            </a>
            <a href="#changes" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              {terms.sections.changes.title}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {terms.introduction}
            </p>
          </div>

          {/* 1. Acceptance of Terms */}
          <div id="acceptance" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {terms.sections.acceptance.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {terms.sections.acceptance.description}
            </p>
          </div>

          {/* 2. Description of Services */}
          <div id="services" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {terms.sections.services.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {terms.sections.services.description}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {terms.sections.services.items.map((item: { title: string; description: string }, index: number) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. User Conduct */}
          <div id="user-conduct" className="scroll-mt-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {terms.sections.userConduct.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {terms.sections.userConduct.description}
                </p>
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {terms.sections.userConduct.prohibited.title}
              </h3>
              <div className="space-y-3">
                {terms.sections.userConduct.prohibited.items.map((item: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. User-Generated Content */}
          <div id="content" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {terms.sections.content.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {terms.sections.content.description}
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {terms.sections.content.ownership.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {terms.sections.content.ownership.description}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {terms.sections.content.moderation.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {terms.sections.content.moderation.description}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {terms.sections.content.responsibility.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {terms.sections.content.responsibility.description}
                </p>
              </div>
            </div>
          </div>

          {/* 5. Intellectual Property */}
          <div id="intellectual-property" className="scroll-mt-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {terms.sections.intellectual.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {terms.sections.intellectual.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {terms.sections.intellectual.aiTools}
                </p>
              </div>
            </div>
          </div>

          {/* 6. Disclaimer of Warranties */}
          <div id="disclaimer" className="scroll-mt-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {terms.sections.disclaimer.title}
                </h2>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {terms.sections.disclaimer.description}
              </p>
              <ul className="space-y-2">
                {terms.sections.disclaimer.items.map((point: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    • {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 7. Limitation of Liability */}
          <div id="liability" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {terms.sections.liability.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {terms.sections.liability.description}
            </p>
            <ul className="space-y-2">
              {terms.sections.liability.limitations.map((limitation: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 8. Termination */}
          <div id="termination" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {terms.sections.termination.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {terms.sections.termination.description}
            </p>
            <ul className="space-y-2 mb-4">
              {terms.sections.termination.reasons.map((reason: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span className="text-gray-600 dark:text-gray-300">{reason}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              {terms.sections.termination.effect}
            </p>
          </div>

          {/* 9. Changes to Terms */}
          <div id="changes" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {terms.sections.changes.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {terms.sections.changes.content}
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">{terms.sections.contact.title}</h2>
            <p className="mb-4 text-purple-100">
              {terms.sections.contact.description}
            </p>
            <a 
              href="mailto:legal@ainav.space" 
              className="inline-block px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              legal@ainav.space
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}

import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import { Shield, Database, Cookie, Users, Eye, Lock, Globe, Mail, Calendar } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  
  return {
    title: dict.privacy?.metaTitle,
    description: dict.privacy?.metaDescription,
    keywords: dict.privacy?.keywords,
    openGraph: {
      title: dict.privacy?.metaTitle,
      description: dict.privacy?.metaDescription,
      type: 'website',
    },
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  if (!dict.privacy) {
    return <div>Privacy policy not available</div>;
  }

  const privacy = dict.privacy;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">{privacy.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {privacy.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {privacy.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{privacy.lastUpdated}: 2026-01-27</span>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-4 bg-white dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{privacy.quickNav}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="#data-collection" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {privacy.sections.dataCollection.title}
            </a>
            <a href="#data-usage" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {privacy.sections.dataUsage.title}
            </a>
            <a href="#data-security" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {privacy.sections.dataSecurity.title}
            </a>
            <a href="#user-rights" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {privacy.sections.yourRights.title}
            </a>
            <a href="#cookies" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {privacy.sections.cookies.title}
            </a>
            <a href="#third-party" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {privacy.sections.thirdParty.title}
            </a>
            <a href="#international" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {privacy.sections.international.title}
            </a>
            <a href="#contact" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {privacy.sections.contact.title}
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
              {privacy.introduction}
            </p>
          </div>

          {/* 1. Data Collection */}
          <div id="data-collection" className="scroll-mt-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.dataCollection.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {privacy.sections.dataCollection.description}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.dataCollection.items.account.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {privacy.sections.dataCollection.items.account.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.dataCollection.items.newsletter.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {privacy.sections.dataCollection.items.newsletter.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.dataCollection.items.submission.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {privacy.sections.dataCollection.items.submission.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.dataCollection.items.usage.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {privacy.sections.dataCollection.items.usage.description}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Data Usage */}
          <div id="data-usage" className="scroll-mt-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.dataUsage.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {privacy.sections.dataUsage.description}
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {privacy.sections.dataUsage.purposes.map((purpose: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{purpose}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Data Security */}
          <div id="data-security" className="scroll-mt-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.dataSecurity.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {privacy.sections.dataSecurity.description}
                </p>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 space-y-3">
              {privacy.sections.dataSecurity.measures.map((measure: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{measure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Your Rights */}
          <div id="your-rights" className="scroll-mt-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-shrink-0">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.yourRights.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {privacy.sections.yourRights.description}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {privacy.sections.yourRights.rights.map((right: { title: string; description: string }, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{right.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{right.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Cookies */}
          <div id="cookies" className="scroll-mt-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex-shrink-0">
                <Cookie className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.cookies.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {privacy.sections.cookies.description}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {privacy.sections.cookies.types.map((type: { name: string; purpose: string }, index: number) => (
                <div key={index} className="border-l-4 border-yellow-400 dark:border-yellow-600 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{type.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Third-Party Services */}
          <div id="third-party" className="scroll-mt-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex-shrink-0">
                <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {privacy.sections.thirdParty.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {privacy.sections.thirdParty.description}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {privacy.sections.thirdParty.services.map((service: { name: string; purpose: string; link: string }, index: number) => (
                <div key={index} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{service.purpose}</p>
                    </div>
                    <a 
                      href={service.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap ml-4"
                    >
                      {privacy.sections.thirdParty.viewPolicy}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. International Transfers */}
          <div id="international" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {privacy.sections.international.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {privacy.sections.international.description}
            </p>
          </div>

          {/* 8. Contact */}
          <div id="contact" className="scroll-mt-20">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-8 h-8" />
                <h2 className="text-2xl font-bold">{privacy.sections.contact.title}</h2>
              </div>
              <p className="mb-4 text-blue-100">
                {privacy.sections.contact.description}
              </p>
              <a 
                href="mailto:privacy@ainav.space" 
                className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                privacy@ainav.space
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

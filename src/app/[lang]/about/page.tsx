import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import { Building2, Scale, Users, Target, Heart, Shield, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.about?.metaTitle,
    description: dict.about?.metaDescription,
    keywords: dict.about?.keywords,
    openGraph: {
      title: dict.about?.metaTitle,
      description: dict.about?.metaDescription,
      type: 'website',
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  if (!dict.about) {
    return <div>About page not available</div>;
  }

  const about = dict.about;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {about.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {about.subtitle}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 font-medium">{about.missionLabel}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {about.missionTitle}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
                {about.missionText1}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {about.missionText2}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-blue-100">{about.stats.tools}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">16+</div>
                <div className="text-purple-100">{about.stats.categories}</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">100K+</div>
                <div className="text-green-100">{about.stats.users}</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">5+</div>
                <div className="text-orange-100">{about.stats.languages}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {about.valuesTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {about.valuesSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {about.values.community.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {about.values.community.description}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {about.values.quality.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {about.values.quality.description}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {about.values.innovation.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {about.values.innovation.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400 font-medium">{about.businessLabel}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {about.businessTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {about.businessDescription}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                {about.business.free.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {about.business.free.description}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                {about.business.premium.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {about.business.premium.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Privacy */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
              <Scale className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <span className="text-orange-600 dark:text-orange-400 font-medium">{about.legalLabel}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {about.legalTitle}
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {about.legal.privacy.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                {about.legal.privacy.description}
              </p>
              <Link 
                href={`/${lang}/privacy`}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                {about.legal.privacy.link}
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {about.legal.dataProtection.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {about.legal.dataProtection.description}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {about.legal.terms.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                {about.legal.terms.description}
              </p>
              <Link 
                href={`/${lang}/terms`}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                {about.legal.terms.link}
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {about.legal.disclaimer.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {about.legal.disclaimer.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <Heart className="w-12 h-12 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">
              {about.contactTitle}
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              {about.contactDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${lang}/submit`}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                {about.submitTool}
              </a>
              <a
                href="mailto:contact@ainav.space"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors border-2 border-white/30"
              >
                {about.contactUs}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

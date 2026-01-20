import SubmitForm from '@/components/SubmitForm';
import { generateSEO } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: '提交新工具',
  description: '向 AI 导航提交您发现的优质 AI 工具，帮助更多人发现好用的 AI 应用',
  url: '/submit',
});

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            提交新的 AI 工具
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            发现了好用的 AI 工具？分享给大家吧！
          </p>
        </div>

        {/* 提交表单 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <SubmitForm />
        </div>

        {/* 提交流程说明 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            提交流程
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  填写工具信息
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  完整填写 AI 工具的名称、网址、描述等基本信息
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  提交到 GitHub
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  点击提交按钮后，系统会打开 GitHub Issue 页面，请确认信息后提交
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  等待审核
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  我们会尽快审核您提交的工具，通过后会添加到网站中
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 提交要求 */}
        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            📋 提交要求
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>必须是正常运行的 AI 工具或服务</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>提供准确的工具信息和有效的访问链接</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>描述清晰，准确反映工具的主要功能</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>不包含违法、违规或恶意内容</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>优先收录有实际价值和用户口碑的工具</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

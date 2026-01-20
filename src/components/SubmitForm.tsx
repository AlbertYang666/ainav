'use client';

import { useState, FormEvent } from 'react';

export default function SubmitForm() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: 'chat',
    pricing: 'freemium',
    tags: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 使用 GitHub Issue 作为提交方式
      const issueTitle = `[新工具] ${formData.name}`;
      const issueBody = `
### 工具信息

**名称**: ${formData.name}
**网址**: ${formData.url}
**描述**: ${formData.description}
**分类**: ${formData.category}
**定价**: ${formData.pricing}
**标签**: ${formData.tags}
**提交者邮箱**: ${formData.email}

---
_此工具由用户通过 ainav.space 提交_
      `.trim();

      // 构造 GitHub Issue URL
      const githubUrl = new URL('https://github.com/YOUR_USERNAME/ainav/issues/new');
      githubUrl.searchParams.set('title', issueTitle);
      githubUrl.searchParams.set('body', issueBody);
      githubUrl.searchParams.set('labels', 'new-tool');

      // 打开 GitHub Issue 页面
      window.open(githubUrl.toString(), '_blank');

      setSubmitStatus('success');
      
      // 重置表单
      setFormData({
        name: '',
        url: '',
        description: '',
        category: 'chat',
        pricing: 'freemium',
        tags: '',
        email: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* 工具名称 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          工具名称 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="例如: ChatGPT"
        />
      </div>

      {/* 网址 */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          网址 <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="https://example.com"
        />
      </div>

      {/* 描述 */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          简介 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="请简要描述这个 AI 工具的功能和特点..."
        />
      </div>

      {/* 分类和定价 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            分类 <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="chat">AI 对话</option>
            <option value="image">AI 绘画</option>
            <option value="video">AI 视频</option>
            <option value="writing">AI 写作</option>
            <option value="coding">AI 编程</option>
            <option value="voice">AI 语音</option>
            <option value="search">AI 搜索</option>
            <option value="productivity">AI 效率</option>
          </select>
        </div>

        <div>
          <label htmlFor="pricing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            定价模式 <span className="text-red-500">*</span>
          </label>
          <select
            id="pricing"
            required
            value={formData.pricing}
            onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="free">免费</option>
            <option value="freemium">部分免费</option>
            <option value="paid">付费</option>
          </select>
        </div>
      </div>

      {/* 标签 */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          标签
        </label>
        <input
          type="text"
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="用逗号分隔，例如: 对话, 写作, 编程"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          多个标签请用逗号分隔
        </p>
      </div>

      {/* 邮箱 */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          您的邮箱 <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="your@email.com"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          我们可能会通过邮箱联系您以确认工具信息
        </p>
      </div>

      {/* 提交按钮 */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? '提交中...' : '提交工具'}
        </button>
      </div>

      {/* 提交状态提示 */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200">
            ✅ 感谢提交！我们会在 GitHub Issue 中审核您的工具。
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">
            ❌ 提交失败，请稍后重试。
          </p>
        </div>
      )}

      {/* 说明 */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>提示：</strong>点击"提交工具"后，系统会在新窗口中打开 GitHub Issue 页面。
          请在 GitHub 上完成提交，我们会尽快审核并添加到网站。
        </p>
      </div>
    </form>
  );
}

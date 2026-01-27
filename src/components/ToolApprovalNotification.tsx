'use client';

import { useState } from 'react';
import { Send, CheckCircle, XCircle, Mail } from 'lucide-react';

export default function ToolApprovalNotification() {
  const [toolName, setToolName] = useState('');
  const [toolUrl, setToolUrl] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSendNotification = async () => {
    if (!toolName.trim() || !toolUrl.trim() || !submitterEmail.trim()) {
      setResult({
        success: false,
        message: '请填写所有必填字段',
      });
      return;
    }

    // Simple email validation
    if (!submitterEmail.includes('@')) {
      setResult({
        success: false,
        message: '请输入有效的邮箱地址',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/notify-tool-approved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolName,
          toolUrl,
          submitterEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || '通知邮件发送成功！',
        });
        // Clear form
        setToolName('');
        setToolUrl('');
        setSubmitterEmail('');
      } else {
        setResult({
          success: false,
          message: data.error || '发送失败',
        });
      }
    } catch {
      setResult({
        success: false,
        message: '网络错误，请重试',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            工具批准通知
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            向提交者发送工具批准通知邮件
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            工具名称 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            placeholder="Fast Image AI"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            工具网址 <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={toolUrl}
            onChange={(e) => setToolUrl(e.target.value)}
            placeholder="https://fastimage.ai"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            提交者邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={submitterEmail}
            onChange={(e) => setSubmitterEmail(e.target.value)}
            placeholder="submitter@example.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          onClick={handleSendNotification}
          disabled={loading || !toolName.trim() || !toolUrl.trim() || !submitterEmail.trim()}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Send className="w-5 h-5" />
          {loading ? '发送中...' : '发送批准通知'}
        </button>

        {result && (
          <div
            className={`flex items-start gap-3 p-4 rounded-lg ${
              result.success
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}
          >
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <p
              className={`font-medium ${
                result.success
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-red-800 dark:text-red-300'
              }`}
            >
              {result.message}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>📧 邮件内容：</strong> 将发送一封包含祝贺信息的英文邮件，通知提交者其工具已被批准并上线。
        </p>
      </div>
    </div>
  );
}

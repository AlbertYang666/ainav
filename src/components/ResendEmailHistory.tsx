'use client';

import { useState, useEffect } from 'react';
import { Mail, RefreshCw, CheckCircle, XCircle, Clock, Send, Eye } from 'lucide-react';

interface ResendEmail {
  id: string;
  from: string;
  to: string[];
  subject: string;
  created_at: string;
  last_event: string;
}

export default function ResendEmailHistory() {
  const [emails, setEmails] = useState<ResendEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<ResendEmail | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/resend-emails');
      const data = await response.json();
      if (data.success) {
        setEmails(data.emails);
      }
    } catch (error) {
      console.error('Failed to fetch emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailDetails = async (emailId: string) => {
    try {
      const response = await fetch('/api/admin/resend-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailId }),
      });
      const data = await response.json();
      if (data.success) {
        setSelectedEmail(data.email);
        setShowDetails(true);
      }
    } catch (error) {
      console.error('Failed to fetch email details:', error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'bounced':
      case 'complained':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'sent':
        return <Send className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      bounced: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      complained: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };

    return colors[status?.toLowerCase()] || colors.default;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2 text-gray-500">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>加载邮件历史...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Resend 邮件历史</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  共 {emails.length} 封邮件
                </p>
              </div>
            </div>
            <button
              onClick={fetchEmails}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              刷新
            </button>
          </div>
        </div>

        {emails.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">暂无邮件记录</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    收件人
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    主题
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    发送时间
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {emails.map((email) => (
                  <tr
                    key={email.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(email.last_event)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(email.last_event)}`}>
                          {email.last_event || 'pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {email.to[0]}
                      </div>
                      {email.to.length > 1 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{email.to.length - 1} 更多
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white max-w-md truncate">
                        {email.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(email.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => fetchEmailDetails(email.id)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Email Details Modal */}
      {showDetails && selectedEmail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">邮件详情</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">邮件 ID</label>
                <p className="text-sm text-gray-900 dark:text-white font-mono">{selectedEmail.id}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">发件人</label>
                <p className="text-sm text-gray-900 dark:text-white">{selectedEmail.from}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">收件人</label>
                <p className="text-sm text-gray-900 dark:text-white">{selectedEmail.to?.join(', ')}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">主题</label>
                <p className="text-sm text-gray-900 dark:text-white">{selectedEmail.subject}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">状态</label>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(selectedEmail.last_event)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedEmail.last_event)}`}>
                    {selectedEmail.last_event || 'pending'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">创建时间</label>
                <p className="text-sm text-gray-900 dark:text-white">{formatDate(selectedEmail.created_at)}</p>
              </div>
              {selectedEmail.html && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">邮件内容预览</label>
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg max-h-96 overflow-y-auto">
                    <div dangerouslySetInnerHTML={{ __html: selectedEmail.html }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

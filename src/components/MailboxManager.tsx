'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Mail, 
  RefreshCw, 
  Inbox, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  User,
  AtSign,
  Activity
} from 'lucide-react';

interface MailboxAccount {
  id: string;
  name: string;
  email: string;
  provider: string;
}

interface Email {
  id: string;
  from: string;
  to: string[];
  subject: string;
  created_at: string;
  last_event: string;
  html?: string;
  text?: string;
}

interface WebhookEvent {
  id: string;
  event_type: string;
  email_id: string;
  from_email: string;
  to_emails: string[];
  subject: string;
  created_at: string;
}

export default function MailboxManager() {
  const [accounts, setAccounts] = useState<MailboxAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [mailType, setMailType] = useState<'sent' | 'received'>('sent');
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [showWebhookEvents, setShowWebhookEvents] = useState(false);

  // Fetch mailbox accounts
  const fetchAccounts = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/mailbox');
      const data = await response.json();
      if (data.success) {
        setAccounts(data.accounts);
        if (data.accounts.length > 0 && !selectedAccount) {
          setSelectedAccount(data.accounts[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  }, [selectedAccount]);

  // Fetch emails for selected account
  const fetchEmails = useCallback(async () => {
    if (!selectedAccount) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/mailbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          accountId: selectedAccount,
          type: mailType,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setEmails(data.emails);
        if (mailType === 'sent') {
          setSentCount(data.emails.length);
        } else {
          setReceivedCount(data.emails.length);
        }
      }
    } catch (error) {
      console.error('Failed to fetch emails:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedAccount, mailType]);

  // Fetch webhook events
  const fetchWebhookEvents = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/webhook-events');
      const data = await response.json();
      if (data.success) {
        setWebhookEvents(data.events);
      }
    } catch (error) {
      console.error('Failed to fetch webhook events:', error);
    }
  }, []);

  // Fetch email details
  const fetchEmailDetails = async (emailId: string, existingEmail?: Email) => {
    // For received emails, data is already loaded from Supabase — use it directly
    if (mailType === 'received' && existingEmail) {
      setSelectedEmail(existingEmail);
      setShowDetails(true);
      return;
    }

    // For sent emails, fetch details from Resend API
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
    fetchAccounts();
    fetchWebhookEvents();
  }, [fetchAccounts, fetchWebhookEvents]);

  useEffect(() => {
    if (selectedAccount) {
      fetchEmails();
    }
  }, [selectedAccount, mailType, fetchEmails]);

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'bounced':
      case 'complained':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'sent':
        return <Send className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
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

  const currentAccount = accounts.find(acc => acc.id === selectedAccount);
  const [sentCount, setSentCount] = useState(0);
  const [receivedCount, setReceivedCount] = useState(0);

  return (
    <div className="space-y-6">
      {/* 账户选择和统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 账户选择 */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">邮箱账户</h3>
          </div>
          <div className="space-y-2">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => setSelectedAccount(account.id)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedAccount === account.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AtSign className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {account.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {account.email}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                    {account.provider}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">已发送</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sentCount}
                </p>
              </div>
            </div>
            {currentAccount && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {currentAccount.email}
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Inbox className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">已接收</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {receivedCount}
                </p>
              </div>
            </div>
            {currentAccount && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                需要配置 Webhook
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 邮件列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {mailType === 'sent' ? '已发送邮件' : '已接收邮件'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentAccount?.name} - {emails.length} 封邮件
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* 邮件类型切换 */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setMailType('sent')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    mailType === 'sent'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Send className="w-4 h-4 inline mr-1" />
                  已发送
                </button>
                <button
                  onClick={() => setMailType('received')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    mailType === 'received'
                      ? 'bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Inbox className="w-4 h-4 inline mr-1" />
                  已接收
                </button>
              </div>

              <button
                onClick={fetchEmails}
                disabled={loading}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                刷新
              </button>

              <button
                onClick={() => setShowWebhookEvents(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Webhook 事件
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2 text-gray-500">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>加载中...</span>
            </div>
          </div>
        ) : emails.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {mailType === 'sent' ? '暂无已发送邮件' : '暂无已接收邮件'}
            </p>
            {mailType === 'received' && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                接收邮件需要配置 Resend Webhook
              </p>
            )}
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
                    {mailType === 'sent' ? '收件人' : '发件人'}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    主题
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    时间
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
                        {mailType === 'sent' ? email.to[0] : email.from}
                      </div>
                      {mailType === 'sent' && email.to.length > 1 && (
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
                        onClick={() => fetchEmailDetails(email.id, email)}
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

      {/* 邮件详情模态框 */}
      {showDetails && selectedEmail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">邮件详情</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
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
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">邮件内容</label>
                {selectedEmail.html ? (
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-600">
                    <div dangerouslySetInnerHTML={{ __html: selectedEmail.html }} />
                  </div>
                ) : selectedEmail.text ? (
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-600">
                    <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-sans">{selectedEmail.text}</pre>
                  </div>
                ) : (
                  <div className="mt-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      {mailType === 'sent'
                        ? 'Resend API 不提供已发送邮件的正文内容，仅支持查看元数据。'
                        : '此邮件没有可预览的正文内容。'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Events Modal */}
      {showWebhookEvents && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-5xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Webhook 事件历史</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">最近 100 条事件记录</p>
                </div>
              </div>
              <button
                onClick={() => setShowWebhookEvents(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              {webhookEvents.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">暂无 Webhook 事件</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    请确保已在 Resend 控制台配置 Webhook
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                          事件类型
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                          邮件 ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                          发件人
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                          收件人
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                          主题
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                          时间
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {webhookEvents.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(event.event_type.replace('email.', ''))}
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(event.event_type.replace('email.', ''))}`}>
                                {event.event_type}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <code className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                              {event.email_id.substring(0, 16)}...
                            </code>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {event.from_email}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            {event.to_emails[0]}
                            {event.to_emails.length > 1 && (
                              <span className="text-xs ml-1">+{event.to_emails.length - 1}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                            {event.subject || '-'}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(event.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 提示信息 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
          💡 使用说明
        </h3>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          <p>
            <strong>• 已发送邮件：</strong> 通过 Resend API 自动获取，显示所有从该账户发送的邮件。
          </p>
          <p>
            <strong>• 已接收邮件：</strong> 需要配置 Resend Webhook 来接收入站邮件事件。
          </p>
          <p>
            <strong>• 多账户管理：</strong> 可以为不同用途配置多个邮箱账户（如通知、营销、客服等）。
          </p>
          <p className="pt-2 border-t border-blue-300 dark:border-blue-700">
            <strong>配置 Webhook：</strong> 在 Resend 控制台设置 Webhook URL 为：
            <code className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded">
              {typeof window !== 'undefined' ? window.location.origin : ''}/api/webhooks/resend
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}

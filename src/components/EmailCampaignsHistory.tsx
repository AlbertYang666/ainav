'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar, CheckCircle, XCircle, Users, TrendingUp, RefreshCw } from 'lucide-react';

interface EmailCampaign {
  id: string;
  subject: string;
  recipient_count: number;
  successful_count: number;
  failed_count: number;
  sent_by: string;
  sent_at: string;
  campaign_type: string;
}

export default function EmailCampaignsHistory() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/email-campaigns');
      const data = await response.json();
      if (data.success) {
        setCampaigns(data.campaigns);
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSuccessRate = (campaign: EmailCampaign) => {
    if (campaign.recipient_count === 0) return 0;
    return ((campaign.successful_count / campaign.recipient_count) * 100).toFixed(1);
  };

  const getCampaignTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      newsletter: '订阅推送',
      announcement: '公告通知',
      promotion: '营销推广',
    };
    return types[type] || type;
  };

  const getCampaignTypeBadge = (type: string) => {
    const badges: Record<string, string> = {
      newsletter: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
      announcement: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
      promotion: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    };
    return badges[type] || 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2 text-gray-500">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>加载中...</span>
        </div>
      </div>
    );
  }

  // Calculate summary stats
  const totalSent = campaigns.reduce((sum, c) => sum + c.recipient_count, 0);
  const totalSuccess = campaigns.reduce((sum, c) => sum + c.successful_count, 0);
  const totalFailed = campaigns.reduce((sum, c) => sum + c.failed_count, 0);
  const overallSuccessRate = totalSent > 0 ? ((totalSuccess / totalSent) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">邮件发送记录</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                共 {campaigns.length} 次发送活动
              </p>
            </div>
          </div>

          <button
            onClick={fetchCampaigns}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            刷新
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: '总发送数', value: totalSent, icon: Mail, color: 'blue' },
            { label: '成功发送', value: totalSuccess, icon: CheckCircle, color: 'green' },
            { label: '发送失败', value: totalFailed, icon: XCircle, color: 'red' },
            { label: '成功率', value: `${overallSuccessRate}%`, icon: TrendingUp, color: 'purple' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">暂无邮件发送记录</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    邮件主题
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    类型
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    收件人
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    成功/失败
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    成功率
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    发送者
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    发送时间
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {campaign.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCampaignTypeBadge(campaign.campaign_type)}`}>
                        {getCampaignTypeLabel(campaign.campaign_type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        {campaign.recipient_count}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          {campaign.successful_count}
                        </div>
                        {campaign.failed_count > 0 && (
                          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                            <XCircle className="w-4 h-4" />
                            {campaign.failed_count}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-20">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getSuccessRate(campaign)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {getSuccessRate(campaign)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {campaign.sent_by}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {formatDate(campaign.sent_at)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

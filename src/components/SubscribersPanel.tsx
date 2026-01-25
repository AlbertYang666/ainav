'use client';

import { useState, useEffect } from 'react';
import { Users, Download, RefreshCw, Send, Trash2, Calendar, Globe } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  source: string | null;
  language: string | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
  last_sent_at: string | null;
}

export default function SubscribersPanel() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/subscribers');
      const data = await response.json();
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Filter subscribers based on status
  const filteredSubscribers = subscribers.filter(s => {
    if (statusFilter === 'all') return true;
    return s.status === statusFilter;
  });

  const activeCount = subscribers.filter(s => s.status === 'active').length;
  const unsubscribedCount = subscribers.filter(s => s.status === 'unsubscribed').length;

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredSubscribers.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredSubscribers.map(s => s.email));
    }
  };

  const handleSelectEmail = (email: string) => {
    setSelectedEmails(prev =>
      prev.includes(email)
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const handleExportCSV = async () => {
    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format: 'csv' }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleSendToSelected = () => {
    if (selectedEmails.length === 0) {
      alert('请先选择订阅者');
      return;
    }
    // Navigate to email campaign page with selected emails
    const emailsParam = encodeURIComponent(selectedEmails.join(','));
    window.location.href = `/admin/emails?emails=${emailsParam}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">订阅者管理</h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                活跃 {activeCount} / 退订 {unsubscribedCount} / 共 {subscribers.length}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={fetchSubscribers}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">刷新</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">导出</span>
            </button>
            <button
              onClick={handleSendToSelected}
              disabled={selectedEmails.length === 0}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">发送</span>
              <span className="sm:hidden">({selectedEmails.length})</span>
              <span className="hidden sm:inline">({selectedEmails.length})</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: 'all', label: '全部', count: subscribers.length },
            { key: 'active', label: '活跃', count: activeCount },
            { key: 'unsubscribed', label: '退订', count: unsubscribedCount },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as typeof statusFilter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                statusFilter === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: '当前显示', value: filteredSubscribers.length, icon: Users, color: 'blue' },
            { label: '本周新增', value: subscribers.filter(s => new Date(s.subscribed_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: Calendar, color: 'green' },
            { label: '已选择', value: selectedEmails.length, icon: Trash2, color: 'purple' },
            { label: '多语言', value: new Set(filteredSubscribers.map(s => s.language)).size, icon: Globe, color: 'orange' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-1.5 sm:p-2 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-lg`}>
                  <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredSubscribers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {statusFilter === 'all' ? '暂无订阅者' : `暂无${statusFilter === 'active' ? '活跃' : '退订'}订阅者`}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="block lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between sticky top-0">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedEmails.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                  />
                  全选
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  已选 {selectedEmails.length}/{filteredSubscribers.length}
                </span>
              </div>
              
              {filteredSubscribers.map((subscriber) => (
                <div key={subscriber.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(subscriber.email)}
                      onChange={() => handleSelectEmail(subscriber.email)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {subscriber.email}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              subscriber.status === 'active'
                                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                                : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}>
                              {subscriber.status === 'active' ? '活跃' : '退订'}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                              {subscriber.source || 'unknown'}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <Globe className="w-3 h-3" />
                              {subscriber.language || 'en'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">订阅时间</p>
                          <p className="text-gray-900 dark:text-white font-medium mt-0.5">
                            {formatDate(subscriber.subscribed_at)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            {subscriber.status === 'unsubscribed' ? '退订时间' : '最后发送'}
                          </p>
                          <p className="text-gray-900 dark:text-white font-medium mt-0.5">
                            {subscriber.status === 'unsubscribed'
                              ? (subscriber.unsubscribed_at ? formatDate(subscriber.unsubscribed_at) : '-')
                              : (subscriber.last_sent_at ? formatDate(subscriber.last_sent_at) : '-')
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmails.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  邮箱
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  来源
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  语言
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  订阅时间
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  最后发送/退订时间
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSubscribers.map((subscriber) => (
                <tr
                  key={subscriber.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(subscriber.email)}
                      onChange={() => handleSelectEmail(subscriber.email)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {subscriber.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      subscriber.status === 'active'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {subscriber.status === 'active' ? '活跃' : '退订'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                      {subscriber.source || 'unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Globe className="w-4 h-4" />
                      {subscriber.language || 'en'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(subscriber.subscribed_at)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {subscriber.status === 'unsubscribed'
                      ? (subscriber.unsubscribed_at ? formatDate(subscriber.unsubscribed_at) : '-')
                      : (subscriber.last_sent_at ? formatDate(subscriber.last_sent_at) : '-')
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

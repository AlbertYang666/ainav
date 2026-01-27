import { Metadata } from 'next';
import EmailCampaignPanel from '@/components/EmailCampaignPanel';
import EmailCampaignsHistory from '@/components/EmailCampaignsHistory';
import ToolApprovalNotification from '@/components/ToolApprovalNotification';

export const metadata: Metadata = {
  title: '邮件管理 - Admin Panel',
  description: '发送工具推荐邮件和批准通知',
};

export default function EmailCampaignPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📧 邮件管理
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          向用户发送AI工具推荐邮件和批准通知
        </p>
      </div>

      {/* Tool Approval Notification */}
      <ToolApprovalNotification />

      {/* Tool Recommendations */}
      <EmailCampaignPanel />

      {/* Email Campaigns History */}
      <EmailCampaignsHistory />

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-3">
          ⚙️ 邮件系统配置
        </h3>
        <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-400">
          <p>
            <strong>邮件服务：</strong> Resend (需要配置 RESEND_API_KEY)
          </p>
          <p>
            <strong>发件人：</strong> {process.env.EMAIL_FROM || 'noreply@ainav.space'}
          </p>
          <p>
            <strong>通知地址：</strong> {process.env.ADMIN_EMAIL || 'admin@ainav.space'}
          </p>
          <p className="mt-4 pt-4 border-t border-yellow-300 dark:border-yellow-700">
            <strong>自动通知功能：</strong>
          </p>
          <ul className="ml-4 space-y-1">
            <li>✅ 新评论提交时自动通知管理员</li>
            <li>✅ 新工具提交时自动通知管理员</li>
            <li>✅ 工具批准通知支持手动发送</li>
            <li>📧 工具推荐邮件支持手动发送</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

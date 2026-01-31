import { Metadata } from 'next';
import MailboxManager from '@/components/MailboxManager';

export const metadata: Metadata = {
  title: '邮箱管理 - Admin Panel',
  description: '管理多个邮箱账户的收发邮件',
};

export default function MailboxPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📬 邮箱管理
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          查看和管理不同邮箱账户的收发邮件记录
        </p>
      </div>

      <MailboxManager />
    </div>
  );
}

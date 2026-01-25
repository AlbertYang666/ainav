import SubscribersPanel from '@/components/SubscribersPanel';

export const metadata = {
  title: '订阅者管理 - 后台管理',
  description: 'Manage newsletter subscribers',
};

export default function SubscribersPage() {
  return (
    <div className="p-8">
      <SubscribersPanel />
    </div>
  );
}

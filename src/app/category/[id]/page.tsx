import { redirect } from 'next/navigation';
import { getAllCategories } from '@/lib/data';

export function generateStaticParams() {
  const categories = getAllCategories('zh');
  return categories.map((category) => ({
    id: category.id,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/zh/category/${id}`);
}

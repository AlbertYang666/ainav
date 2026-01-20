import SearchBar from '@/components/SearchBar';
import AIServiceCard from '@/components/AIServiceCard';
import CategoryCard from '@/components/CategoryCard';
import { getAllAIServices, getAllCategories, getFeaturedAIServices, getAIServicesByCategory } from '@/lib/data';

export default function Home() {
  const categories = getAllCategories();
  const featuredServices = getFeaturedAIServices();
  const allServices = getAllAIServices();

  // 计算每个分类的工具数量
  const categoryCounts = categories.map(category => ({
    ...category,
    count: getAIServicesByCategory(category.id).length,
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          探索最好的 AI 工具
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          精选优质 AI 网站，助你高效探索人工智能世界
        </p>
        <SearchBar />
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {allServices.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300">AI 工具</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {categories.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300">分类</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {featuredServices.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300">精选推荐</div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          浏览分类
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryCounts.map((category) => (
            <CategoryCard key={category.id} category={category} count={category.count} />
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          精选推荐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <AIServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}


import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/ui/core/CategoryCard';
import { getAllCategories } from '@/services/Category';
import { ICategory } from '@/types';
import Link from 'next/link';

const Category = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5 my-12 lg:my-16">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Category</h2>
        <Link href="/products">
          <Button className="rounded-full font-semibold" variant="outline">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories
          ?.slice(0, 6)
          ?.map((category: ICategory, index: number) => (
            <CategoryCard key={index} category={category} />
          ))}
      </div>
    </div>
  );
};

export default Category;

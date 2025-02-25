import Categories from '@/components/modules/products/Categories';
import NMBanner from '@/components/ui/core/NMBanner';
import { getAllCategories } from '@/services/Category';

const AllProductsPage = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div>
      <NMBanner title="All Products" path="Home - Products" />
      <Categories categories={categories} />
    </div>
  );
};

export default AllProductsPage;

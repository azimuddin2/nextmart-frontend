import AllProducts from '@/components/modules/products';
import Categories from '@/components/modules/products/Categories';
import NMBanner from '@/components/ui/core/NMBanner';
import { getAllCategories } from '@/services/Category';
import { getAllProducts } from '@/services/Product';

const AllProductsPage = async () => {
  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts();

  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
      <NMBanner title="All Products" path="Home - Products" />
      <Categories categories={categories} />
      <AllProducts products={products} />
    </div>
  );
};

export default AllProductsPage;

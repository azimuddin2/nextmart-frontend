import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ui/core/ProductCard';
import { getAllProducts } from '@/services/Product';
import { IProduct } from '@/types';
import Link from 'next/link';

const FeaturedProducts = async () => {
  const { data: products } = await getAllProducts();

  return (
    <div className="bg-[#f7f7f7] my-12 lg:my-16 py-20">
      <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Featured Products</h2>
          <Link href="/products">
            <Button className="rounded-full font-semibold" variant="outline">
              All Collection
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products
            ?.slice(0, 4)
            ?.map((product: IProduct, index: number) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;

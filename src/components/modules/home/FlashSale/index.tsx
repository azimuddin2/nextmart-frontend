import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ui/core/ProductCard';
import { getFlashSaleProducts } from '@/services/FlashSale';
import { IProduct } from '@/types';
import Link from 'next/link';

const FlashSale = async () => {
  const { data: products } = await getFlashSaleProducts();

  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5 my-12 lg:my-16 py-14">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Flash Sale</h2>
        <Link href="/products">
          <Button className="rounded-full font-semibold" variant="outline">
            All Collection
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.map((product: IProduct, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;

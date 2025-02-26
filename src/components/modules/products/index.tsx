import ProductCard from '@/components/ui/core/ProductCard';
import { IProduct } from '@/types';
import React from 'react';
import FilterSidebar from './FilterSidebar';

const AllProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="my-20">
      <div className="flex gap-6 mt-10">
        <div>
          <FilterSidebar />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

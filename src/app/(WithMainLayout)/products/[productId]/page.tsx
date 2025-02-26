import ProductDetails from '@/components/modules/products/ProductDetails';
import NMBanner from '@/components/ui/core/NMBanner';
import { getSingleProduct } from '@/services/Product';

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);

  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
      <NMBanner
        title="Product Details"
        path="Home - Products - Product Details"
      />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;

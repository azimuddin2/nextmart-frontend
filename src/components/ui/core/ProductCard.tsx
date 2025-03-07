'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../button';
import { IProduct } from '@/types';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/features/cartSlice';
import { toast } from 'sonner';

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
    toast.success('Product successfully added to cart.');
  };

  return (
    <Card className="p-4">
      <CardHeader className="relative p-0">
        <div className="h-1/2">
          <Image
            src={
              product?.imageUrls[0] ||
              'https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png'
            }
            width={500}
            height={500}
            alt="product image"
            className="rounded-sm h-full"
          />
        </div>
        {product?.stock === 0 && (
          <div className="absolute left-2 text-base top-0 bg-red-500 text-white px-2 rounded-full">
            Out of Stock
          </div>
        )}
      </CardHeader>

      <CardContent className=" p-0 mt-2">
        <Link href={`/products/${product?._id}`} passHref>
          <CardTitle
            title={product?.name}
            className="font-semibold cursor-pointer text-sm"
          >
            {product?.name.length > 30
              ? product?.name?.slice(0, 30) + '...'
              : product?.name}
          </CardTitle>
        </Link>

        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-gray-600">
            {product?.offerPrice ? (
              <>
                <span className="font-semibold mr-2 text-orange-400">
                  ${product?.offerPrice}
                </span>
                <del className="font-semibold text-sm">${product?.price}</del>
              </>
            ) : (
              <span className="font-semibold text-sm">${product?.price}</span>
            )}
          </p>

          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
            <span className="text-sm font-medium text-gray-700">
              {product?.averageRating}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="block p-0">
        <div className="flex gap-2 items-center justify-between">
          <Button disabled={product?.stock === 0} size="sm" className="w-32">
            Buy Now
          </Button>
          <Button
            onClick={() => handleAddToCart(product)}
            disabled={product?.stock === 0}
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
          >
            <ShoppingCart />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
          >
            <Heart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

'use client';

import { Button } from '@/components/ui/button';
import { ICartProduct } from '@/redux/features/cartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const CartProductCard = ({ product }: { product: ICartProduct }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-lg flex p-5 gap-5">
      <div className="h-full w-32 rounded-md overflow-hidden">
        <Image
          src={product?.imageUrls?.[0]}
          height={200}
          width={200}
          alt="product"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="lg:text-xl font-semibold">{product?.name}</h1>
        <div className="flex gap-5 my-2">
          <p>
            <span className="text-gray-500">Color:</span>{' '}
            <span className="font-semibold">Black</span>
          </p>
          <p>
            <span className="text-gray-500">Stock Availability:</span>{' '}
            <span className="font-semibold">{product?.stock}</span>
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>
            Price:
            {product.offerPrice ? product.offerPrice : product.price}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold">Quantity</p>
            <Button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-medium text-lg p-2">{product.orderQuantity}</p>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Plus />
            </Button>
            <Button variant="outline" className="size-8 rounded-sm">
              <Trash2 className="text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;

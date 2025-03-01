'use client';

import Image from 'next/image';
import React from 'react';
import CartProductCard from './CartProductCard';
import emptyCart from '@/assets/images/empty-cart.png';
import { useAppSelector } from '@/redux/hooks';
import {
  ICartProduct,
  orderedProductsSelector,
} from '@/redux/features/cartSlice';

const CartProducts = () => {
  const products = useAppSelector(orderedProductsSelector);

  return (
    <div className="border-2 grid grid-cols-1 border-white bg-background brightness-105 rounded-md col-span-8 h-full row-span-3 p-3 lg:p-6 space-y-5">
      {products.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Looks like your cart is on vacation—bring it back to work by adding
            some items!
          </p>
          <div className="flex justify-center items-center ">
            <Image src={emptyCart} alt="empty cart" />
          </div>
        </div>
      ) : (
        <div>
          {products.map((product: ICartProduct) => (
            <CartProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartProducts;

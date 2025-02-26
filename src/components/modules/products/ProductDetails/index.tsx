'use client';

import { Button } from '@/components/ui/button';
import { IProduct } from '@/types';
import { Minus, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [selectedImage, setSelectedImage] = useState(product?.imageUrls[0]);
  const [selectedColor, setSelectedColor] = useState(
    product?.availableColors[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [isReadMore, setIsReadMore] = useState<boolean>(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="my-8 bg-[#F7F7F7] border-2 border-white rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
      {/* Product Image Section */}
      <div>
        <div className="bg-gray-100 rounded-lg flex items-center justify-center h-[400px] relative">
          <Image
            src={selectedImage}
            alt="Product Image"
            width={400}
            height={400}
            className="rounded-lg object-contain"
          />
        </div>
        <div className="gap-3 mt-4 flex justify-center">
          {product?.imageUrls?.map((image, index) => (
            <button
              key={index}
              className={`border-2 rounded-md p-1 ${
                selectedImage === image ? 'border-black' : 'border-gray-300'
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt="Thumbnail"
                width={60}
                height={60}
                className="rounded-md"
              />
            </button>
          ))}
        </div>
      </div>
      {/* Product Info */}
      <div className="bg-white rounded-lg p-5">
        <h2 className="font-bold text-xl mb-4">{product?.name}</h2>
        <p className="text-justify text-gray-500 font-light text-sm">
          {isReadMore
            ? product?.description.slice(0, 200) + '...'
            : product?.description}
          <span onClick={toggleReadMore} className="inline">
            {isReadMore ? (
              <span className="link font-semibold text-primary cursor-pointer">
                more?
              </span>
            ) : (
              <span className="link font-semibold text-primary ms-1 cursor-pointer">
                less
              </span>
            )}
          </span>
        </p>
        <div className="flex items-center justify-between my-5 text-gray-500 text-xs">
          <p className="rounded-full px-4 py-1 bg-gray-100 flex items-center justify-center gap-1">
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
            {product?.averageRating} Ratings
          </p>
          <p className="rounded-full px-4 py-1 bg-gray-100">
            Stock: {product?.stock}
          </p>
          <p className="rounded-full px-4 py-1 bg-gray-100">
            Brand: {product?.brand?.name}
          </p>
          <p className="rounded-full px-4 py-1 bg-gray-100">
            Category: {product?.category?.name}
          </p>
        </div>
        <hr />
        <p className="my-2 font-bold">
          Price:{' '}
          {product?.offerPrice ? (
            <>
              <span className="font-semibold mr-2 text-orange-400">
                ${product?.offerPrice}
              </span>
              <del className="font-semibold text-xs">${product?.price}</del>
            </>
          ) : (
            <span className="font-semibold">${product?.price}</span>
          )}
        </p>
        <hr />
        {/* Color Options */}
        <div className="mt-4">
          <p className="font-medium text-gray-700 text-sm">
            Color:{' '}
            {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
          </p>
          <div className="flex gap-2 mt-2">
            {product.availableColors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-md border ${
                  selectedColor === color
                    ? 'border-2 border-[#693AF8] scale-110'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
        {/* Quantity & Stock */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-gray-600 text-sm mr-2">Quantity </p>
            <Button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              variant="outline"
              className="size-8 rounded-sm bg-white"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <p className="font-medium text-lg p-2">{quantity}</p>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              variant="outline"
              className="size-8 rounded-sm bg-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-gray-700 text-sm">
            Stock Available: {product?.stock}
          </span>
        </div>
        <Button variant="outline" className="w-full mt-5 mb-3">
          Add To Cart
        </Button>
        <Button className="w-full">Buy Now</Button>
      </div>
    </div>
  );
};

export default ProductDetails;

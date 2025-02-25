'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { NMTable } from '@/components/ui/core/NMTable';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { IProduct } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import DiscountModal from './DiscountModal';

type TProductsProps = {
  products: IProduct[];
};

const ManageProducts = ({ products }: TProductsProps) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

  const columns: ColumnDef<IProduct>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds(
                selectedIds.filter((id) => id !== row.original._id),
              );
            }

            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
      cell: ({ row }) => <span>{row.original.brand.name}</span>,
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: 'offerPrice',
      header: 'Offer Price',
      cell: ({ row }) => (
        <span>
          $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : '0'}
        </span>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Eye
                  onClick={() =>
                    router.push(
                      `/user/shop/products/view-product/${row.original._id}`,
                    )
                  }
                  size={20}
                  className="text-blue-500"
                />
              </TooltipTrigger>
              <TooltipContent>View</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaRegEdit
                  onClick={() =>
                    router.push(
                      `/user/shop/products/update-product/${row.original._id}`,
                    )
                  }
                  size={20}
                  className="text-green-500"
                />
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Trash2
                  // onClick={() => handleDelete(row.original)}
                  size={20}
                  className="text-red-500"
                />
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-medium">Manage Products</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/user/shop/products/add-product')}
            size="sm"
          >
            <Plus /> Add Product
          </Button>
          <DiscountModal
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </div>
      <NMTable columns={columns} data={products || []} />
    </div>
  );
};

export default ManageProducts;

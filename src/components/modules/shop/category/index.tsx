'use client';

import { ICategory } from '@/types';
import CreateCategoryModal from './CreateCategoryModal';
import { NMTable } from '@/components/ui/core/NMTable';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

type TCategoriesProps = {
  categories: ICategory[];
};

const ManageCategories = ({ categories }: TCategoriesProps) => {
  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: 'name',
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.icon}
            alt={row.original.name}
            width={50}
            height={50}
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'isActive',
      header: () => <div>IsActive</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          // onClick={() => handleDelete(row.original)}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="lg:text-2xl font-medium">Manage Categories</h2>
        <CreateCategoryModal />
      </div>
      <NMTable data={categories} columns={columns} />
    </div>
  );
};

export default ManageCategories;

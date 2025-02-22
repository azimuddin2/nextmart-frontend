'use client';

import { IBrand } from '@/types';
import CreateBrandModal from './CreateBrandModal';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { FaRegEdit } from 'react-icons/fa';
import { NMTable } from '@/components/ui/core/NMTable';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { toast } from 'sonner';
import DeleteConfirmationModal from '@/components/ui/core/NMModal/DeleteConfirmationModal';
import { deleteBrand } from '@/services/Brand';

type TBrandsProps = {
  brands: IBrand[];
};

const ManageBrands = ({ brands }: TBrandsProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: IBrand) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteBrand(selectedId);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<IBrand>[] = [
    {
      accessorKey: 'name',
      header: () => <div>Brand Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.logo}
            alt={row.original.name}
            width={30}
            height={30}
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
            <Badge className="text-green-500 border bg-green-100 rounded-sm hover:bg-green-100">
              True
            </Badge>
          ) : (
            <Badge className="text-red-500 border bg-red-100 hover:bg-red-100 rounded-sm">
              False
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaRegEdit
                  // onClick={() => handleUpdate(row.original)}
                  size={20}
                  className="text-green-500 mr-2"
                />
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Trash2
                  onClick={() => handleDelete(row.original)}
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
        <h2 className="text-xl font-medium">Manage Brands</h2>
        <CreateBrandModal />
      </div>
      <NMTable data={brands} columns={columns} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageBrands;

'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { addFlashSale } from '@/services/FlashSale';

type TDiscountModalProps = {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[] | []>>;
};

const DiscountModal = ({
  selectedIds,
  setSelectedIds,
}: TDiscountModalProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const form = useForm({
    //   resolver: zodResolver(createCategorySchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      products: [...selectedIds],
      discountPercentage: parseFloat(data?.discountPercentage),
    };

    try {
      const res = await addFlashSale(modifiedData);

      if (res?.success) {
        toast.success(res?.message);
        setSelectedIds([]);
        setModalOpen(false);
        form.reset();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error('Something went wrong.');
      console.error(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button disabled={!selectedIds.length}>
          <Plus />
          <span>Add Flash Sale</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Flash Sale</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0F0E0E]">
                      Discount Percentage
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isSubmitting ? 'Adding....' : 'Add'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountModal;

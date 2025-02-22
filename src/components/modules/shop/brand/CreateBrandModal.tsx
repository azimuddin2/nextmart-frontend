'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createBrandSchema } from './brandValidation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ImagePreviewer from '@/components/ui/core/NMImageUploader/ImagePreviewer';
import NMImageUploader from '@/components/ui/core/NMImageUploader';
import { createBrand } from '@/services/Brand';
import { toast } from 'sonner';
import { IoMdAdd } from 'react-icons/io';

const CreateBrandModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({
    resolver: zodResolver(createBrandSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('logo', imageFiles[0]);

      const res = await createBrand(formData);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        setModalOpen(false);
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
        <Button>
          <span>Create Brand</span>
          <IoMdAdd size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Brand</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center items-center">
                {imagePreview.length > 0 ? (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="mx-auto"
                  />
                ) : (
                  <NMImageUploader
                    label="Upload Logo"
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0F0E0E]">Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isSubmitting ? 'Saveing....' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBrandModal;

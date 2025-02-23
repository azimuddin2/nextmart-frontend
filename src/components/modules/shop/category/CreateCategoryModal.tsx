'use client';

import { Button } from '@/components/ui/button';
import NMImageUploader from '@/components/ui/core/NMImageUploader';
import ImagePreviewer from '@/components/ui/core/NMImageUploader/ImagePreviewer';
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
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createCategorySchema } from './categoryValidation';
import { createCategory } from '@/services/Category';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

const CreateCategoryModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({
    resolver: zodResolver(createCategorySchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('icon', imageFiles[0]);

      const res = await createCategory(formData);
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
          <span>Create Category</span>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0F0E0E]">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-36"
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="lg:mt-8">
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
              </div>
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

export default CreateCategoryModal;

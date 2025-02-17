'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import logo from '@/assets/icons/logo.svg';
import NMImageUploader from '@/components/ui/core/NMImageUploader';
import { useState } from 'react';
import ImagePreviewer from '@/components/ui/core/NMImageUploader/ImagePreviewer';
import { zodResolver } from '@hookform/resolvers/zod';
import { createShopSchema } from './createShopValidation';
import { createShop } from '@/services/Shop';
import { toast } from 'sonner';

const CreateShopForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({
    resolver: zodResolver(createShopSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const servicesOffered = data?.servicesOffered
      .split(',')
      .map((service: string) => service.trim())
      .filter((service: string) => service !== '');

    const modifiedData = {
      ...data,
      servicesOffered,
      establishedYear: Number(data.establishedYear),
    };
    console.log(modifiedData);

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(modifiedData));
      formData.append('logo', imageFiles[0]);

      const res = await createShop(formData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="border-4 border-gray-100 rounded-xl flex-grow max-w-3xl p-5 my-8">
      <div className="flex items-center space-x-4 border-b mb-4 pb-3">
        <Image src={logo} alt="Logo" width="80" height="80" />
        <div>
          <h1 className="text-xl font-semibold">Create Your Shop</h1>
          <p className="font-extralight text-sm text-gray-500">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-[#0F0E0E]">Shop Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0F0E0E]">
                    Business License Number
                  </FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0F0E0E]">Address</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0F0E0E]">
                    Contact Number
                  </FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0F0E0E]">Website</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0F0E0E]">
                    Established Year
                  </FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxIdentificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0F0E0E]">
                    Tax Identification Number
                  </FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0F0E0E]">Facebook</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0F0E0E]">Twitter</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0F0E0E]">Instagram</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
            <div className="md:col-span-3">
              <FormField
                control={form.control}
                name="servicesOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0F0E0E]">
                      Services Offered
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36 rounded-[12px]"
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

          <Button type="submit" className="mt-5 w-full">
            {isSubmitting ? 'Saveing....' : 'Save'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateShopForm;

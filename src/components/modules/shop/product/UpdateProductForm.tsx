'use client';

import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import logo from '@/assets/icons/logo.svg';
import Image from 'next/image';
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
import NMImageUploader from '@/components/ui/core/NMImageUploader';
import ImagePreviewer from '@/components/ui/core/NMImageUploader/ImagePreviewer';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IBrand, ICategory, IProduct } from '@/types';
import { getAllCategories } from '@/services/Category';
import { getAllBrands } from '@/services/Brand';
import { updateProduct } from '@/services/Product';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const UpdateProductForm = ({ product }: { product: IProduct }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(
    product?.imageUrls || [],
  );
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [brands, setBrands] = useState<IBrand[] | []>([]);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
      category: product?.category?.name || '',
      brand: product?.brand?.name || '',
      stock: product?.stock || '',
      weight: product?.weight || '',

      availableColors: product?.availableColors?.map((color) => ({
        value: color,
      })) || [{ value: '' }],

      keyFeatures: product?.keyFeatures?.map((feature) => ({
        value: feature,
      })) || [{ value: '' }],

      specification: Object.entries(product?.specification || {}).map(
        ([key, value]) => ({ key, value }),
      ) || [{ key: '', value: '' }],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, brandsData] = await Promise.all([
        getAllCategories(),
        getAllBrands(),
      ]);

      setCategories(categoriesData?.data);
      setBrands(brandsData?.data);
    };

    fetchData();
  }, []);

  // Dynamic Color Input Fields
  const { append: appendColor, fields: colorFields } = useFieldArray({
    control: form.control,
    name: 'availableColors',
  });

  const addColor = () => {
    appendColor({ value: '' });
  };

  // Dynamic KeyFeatures Input Fields
  const { append: appendKeyFeatures, fields: keyFeaturesFields } =
    useFieldArray({
      control: form.control,
      name: 'keyFeatures',
    });

  const addKeyFeatures = () => {
    appendKeyFeatures({ value: '' });
  };

  // Dynamic Specification Input Fields
  const { append: appendSpecification, fields: specificationFields } =
    useFieldArray({
      control: form.control,
      name: 'specification',
    });

  const addSpecification = () => {
    appendSpecification({ key: '', value: '' });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const availableColors = data?.availableColors.map(
      (color: { value: string }) => color.value,
    );

    const keyFeatures = data?.keyFeatures.map(
      (feature: { value: string }) => feature.value,
    );

    const specification: { [key: string]: string } = {};

    data?.specification.forEach(
      (item: { key: string; value: string }) =>
        (specification[item.key] = item.value),
    );

    const modifiedData = {
      ...data,
      availableColors,
      keyFeatures,
      specification,
      price: parseFloat(data?.price),
      stock: parseInt(data?.stock),
      weight: parseFloat(data?.weight),
    };

    const formData = new FormData();

    formData.append('data', JSON.stringify(modifiedData));

    for (const file of imageFiles) {
      formData.append('images', file);
    }

    try {
      const res = await updateProduct(product._id, formData);
      if (res?.success) {
        toast.success(res?.message);
        router.push('/user/shop/products');
      } else {
        toast.error(res?.message);
        console.log(res);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl flex-grow max-w-3xl p-5">
      <div className="flex items-center space-x-4 border-b mb-4 pb-3">
        <Image src={logo} alt="Logo" width="80" height="80" />
        <div>
          <h1 className="text-2xl font-semibold">Update Product</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-b py-3 my-5">
            <p className="text-primary font-semibold text-xl">
              Basic Information
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-white">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category?._id} value={category?._id}>
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-white">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands?.map((brand) => (
                        <SelectItem key={brand?._id} value={brand?._id}>
                          {brand?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none bg-white"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-semibold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-semibold text-xl">
                Available Colors
              </p>
              <Button
                className="size-8 bg-primary"
                onClick={addColor}
                type="button"
              >
                <Plus className="text-white" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {colorFields.map((colorField, index) => (
                <div key={colorField.id}>
                  <FormField
                    control={form.control}
                    name={`availableColors.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color {index + 1}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ''}
                            className="bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-semibold text-xl">Key Features</p>
              <Button
                onClick={addKeyFeatures}
                className="size-8 bg-primary"
                type="button"
              >
                <Plus className="text-white" />
              </Button>
            </div>
            <div className="my-5">
              {keyFeaturesFields.map((featureField, index) => (
                <div key={featureField.id}>
                  <FormField
                    control={form.control}
                    name={`keyFeatures.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel>Key Feature {index + 1}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ''}
                            className="bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-semibold text-xl">
                Specification
              </p>
              <Button
                onClick={addSpecification}
                className="size-8 bg-primary"
                type="button"
              >
                <Plus className="text-white" />
              </Button>
            </div>

            {specificationFields.map((specificationField, index) => (
              <div
                key={specificationField.id}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5"
              >
                <FormField
                  control={form.control}
                  name={`specification.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature name {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specification.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature Description {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Updating Product....' : 'Update Product'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProductForm;

'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const addProduct = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      method: 'POST',
      headers: {
        Authorization: (await cookies()).get('accessToken')!.value,
      },
      body: data,
    });

    revalidateTag('PRODUCT');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      next: {
        tags: ['PRODUCT'],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleProduct = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`,
      {
        next: {
          tags: ['PRODUCT'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProduct = async (
  id: string,
  data: FormData,
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        body: data,
      },
    );

    revalidateTag('PRODUCT');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteProduct = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
      },
    );

    revalidateTag('PRODUCT');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

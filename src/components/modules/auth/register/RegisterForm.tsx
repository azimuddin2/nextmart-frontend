'use client';
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
import Image from 'next/image';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import logo from '@/assets/icons/logo.svg';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from './registerValidation';
import { registerUser } from '@/services/AuthService';
import { toast } from 'sonner';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch('password');
  const passwordConfirm = form.watch('passwordConfirm');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res.success) {
        toast.success(res.message);
        form.reset();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg flex-grow bg-white p-6 lg:p-8 rounded-[12px]">
      <div className="flex items-center space-x-4 border-b mb-4 pb-3">
        <Link href="/">
          <Image src={logo} alt="Logo" width="80" height="80" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-500">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-[#0F0E0E]">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-[#0F0E0E]">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
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
            name="password"
            render={({ field }) => (
              <FormItem className="mb-3 relative">
                <FormLabel className="text-[#0F0E0E]">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      value={field.value || ''}
                      className="bg-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-[#0F0E0E]">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    value={field.value || ''}
                    className="bg-white"
                  />
                </FormControl>
                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            disabled={
              (passwordConfirm && password !== passwordConfirm) as boolean
            }
            type="submit"
            className="w-full mt-2"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-500 text-center mt-5">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-medium">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

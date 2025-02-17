'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import logo from '@/assets/icons/logo.svg';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './LoginValidation';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // const res = await registerUser(data);
      // if (res.success) {
      //     toast.success(res.message);
      // } else {
      //     toast.error(res.message);
      // }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg flex-grow bg-white p-8 rounded-[12px]">
      <div className="flex items-center space-x-4 border-b mb-4 pb-3">
        <Link href="/">
          <Image src={logo} alt="Logo" width="80" height="80" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-500">
            Enter your email address to sign in!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

          <div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Remember Me</Label>
            </div>
          </div>

          <Button type="submit" className="w-full mt-2">
            {isSubmitting ? 'Logging...' : 'Login'}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-500 text-center mt-5">
        Do not have any account?{' '}
        <Link href="/register" className="text-primary font-medium">
          Please Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

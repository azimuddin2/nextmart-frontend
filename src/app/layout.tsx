import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Providers from '@/providers/Providers';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Mart App',
  description: 'Generated by next mart app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${geistMono.className} antialiased`}
        >
          <Toaster richColors position="top-right" />
          {children}
        </body>
      </html>
    </Providers>
  );
}

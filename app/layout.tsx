import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CodeCanvas — Next.js Studio & Visual Page Builder',
  description: 'Design visually with instant Next.js & Tailwind CSS code generation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#09090b] text-zinc-100 antialiased overflow-hidden font-sans">
        {children}
      </body>
    </html>
  );
}

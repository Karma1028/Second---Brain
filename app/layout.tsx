import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Second Brain OS',
  description: 'The operating system for your mind.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background-dark text-slate-100 antialiased overflow-hidden h-screen flex`} suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
          {children}
        </main>
      </body>
    </html>
  );
}

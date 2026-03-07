import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';
import StoreInitializer from '@/components/StoreInitializer';

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background-dark text-foreground antialiased overflow-hidden h-screen flex`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <StoreInitializer>
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
              {children}
            </main>
          </StoreInitializer>
        </ThemeProvider>
      </body>
    </html>
  );
}

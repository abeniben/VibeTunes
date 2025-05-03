'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AudioProvider } from '@/components/providers/audio-provider';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideUI = pathname === '/not-found'; // adjust based on your actual 404 route

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AudioProvider>
        <div className="min-h-screen flex flex-col">
          {!hideUI && <Navbar />}
          <main className="flex-grow">{children}</main>
          {!hideUI && <Footer />}
        </div>
      </AudioProvider>
    </ThemeProvider>
  );
}

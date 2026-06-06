import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';

interface LayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
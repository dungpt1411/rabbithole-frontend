import type { Metadata } from 'next';
import './globals.css';
import { RootLayout as Layout } from '@/components/layout/RootLayout';

export const metadata: Metadata = {
  title: 'Internet Rabbit Hole | Curiosity, Not Clickbait',
  description: 'Explore the internet beyond algorithms. An AI-powered curiosity engine for serendipitous discovery and knowledge graph traversal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
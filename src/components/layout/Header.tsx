'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-lg">
              Rabbit Hole
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/explore"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Explore
            </Link>
            <Link
              href="/daily"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Daily
            </Link>
          </nav>
        </div>

        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Could add search here */}
          </div>
          <nav className="flex items-center space-x-2">
            <Link href="/explore">
		<Button variant="ghost" size="sm">Start Exploring</Button>
	    </Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-border"
        >
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/explore" className="px-3 py-2 rounded-md hover:bg-accent">
              Explore
            </Link>
            <Link href="/daily" className="px-3 py-2 rounded-md hover:bg-accent">
              Daily Discovery
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

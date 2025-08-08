'use client';

import { Logo } from '@/app/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold">CryptoSim</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link href="#features" className="text-muted-foreground/60 transition-colors hover:text-muted-foreground/80">
              Features
            </Link>
            <Link href="#stats" className="text-muted-foreground/60 transition-colors hover:text-muted-foreground/80">
              Stats
            </Link>
            <Link href="#reviews" className="text-muted-foreground/60 transition-colors hover:text-muted-foreground/80">
              Reviews
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
            <Button asChild variant="outline">
                <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}

import { Logo } from '@/app/components/icons';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} CryptoSim. All rights reserved.
            </p>
        </div>
        <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground/60 transition-colors hover:text-muted-foreground/80">Terms of Service</Link>
            <Link href="#" className="text-sm text-muted-foreground/60 transition-colors hover:text-muted-foreground/80">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

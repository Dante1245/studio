import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            Finance the Future. Trade Beyond Earth.
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            From Earth to Mars, our platform provides the financial OS for the future of humanity.
            Execute trades with interplanetary speed and neural-link precision. The future is now.
          </p>
          <div className="flex gap-4">
            <Link href="/signup">
                <Button size="lg" className="shadow-glow-primary">
                    Join the Mission
                </Button>
            </Link>
            <Link href="#features">
                <Button variant="outline" size="lg">
                    View Tech Specs
                </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
            <Image 
                src="https://cdn.jsdelivr.net/gh/radix-ui/icons@radix-ui/website@0.3.0/public/front/git-dark.svg"
                alt="Futuristic Git visualization"
                width={600}
                height={400}
                className="rounded-lg border-2 border-border shadow-2xl"
                data-ai-hint="futuristic tech"
            />
        </div>
      </div>
    </section>
  );
}

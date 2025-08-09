import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            The Ultimate Crypto Trading Simulator
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Experience the thrill of cryptocurrency trading without the risk. Practice your strategies,
            learn the markets, and become a pro trader with our hyper-realistic simulator.
          </p>
          <div className="flex gap-4">
            <Link href="/signup">
                <Button size="lg" className="shadow-glow-primary">
                    Get Started Free
                </Button>
            </Link>
            <Link href="#features">
                <Button variant="outline" size="lg">
                    Learn More
                </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
            <Image 
                src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/btc.svg"
                alt="Crypto trading simulator interface"
                width={400}
                height={400}
                className="rounded-lg"
                data-ai-hint="crypto trading"
            />
        </div>
      </div>
    </section>
  );
}

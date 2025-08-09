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
                <span>Get Started Free</span>
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                <span>Learn More</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
            <Image 
                src="https://i.cnn.net/money/dam/assets/180207102447-elon-musk-spacex-falcon-heavy-780x439.jpg"
                alt="Elon Musk with SpaceX and Tesla logos"
                width={600}
                height={400}
                className="rounded-lg border-2 border-border shadow-2xl"
                data-ai-hint="elon musk"
            />
        </div>
      </div>
    </section>
  );
}

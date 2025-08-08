import { Header } from '@/app/components/landing/header';
import { Hero } from '@/app/components/landing/hero';
import { Features } from '@/app/components/landing/features';
import { Stats } from '@/app/components/landing/stats';
import { Footer } from '@/app/components/landing/footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

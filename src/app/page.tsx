import { Header } from "@/app/components/landing/header";
import { Hero } from "@/app/components/landing/hero";
import { Features } from "@/app/components/landing/features";
import { Stats } from "@/app/components/landing/stats";
import { Reviews } from "@/app/components/landing/reviews";
import { Footer } from "@/app/components/landing/footer";
import { SupportBot } from "@/app/components/support-bot";
import { LivePrices } from "@/app/components/landing/live-prices";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <main className="flex-1">
        <Hero />
        <LivePrices />
        <Stats />
        <Features />
        <Reviews />
      </main>
      <Footer />
      <SupportBot />
    </div>
  );
}

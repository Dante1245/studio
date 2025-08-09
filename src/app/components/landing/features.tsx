import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, BrainCircuit, Zap } from 'lucide-react';

const features = [
    {
        icon: <Rocket className="h-8 w-8 text-primary" />,
        title: 'Interplanetary Markets',
        description: 'Trade assets across multiple planets. Our Starlink integration ensures zero-latency transactions.'
    },
    {
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
        title: 'Neural-Linked Trading',
        description: 'Connect your mind directly to the market. Execute trades at the speed of thought with our Neuralink API.'
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: 'Electrify Your Portfolio',
        description: 'Leverage our advanced AI to optimize your holdings and power your financial future. Fully autonomous.'
    }
]

export function Features() {
  return (
    <section id="features" className="container space-y-6 bg-slate-50/50 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          First Principles of Future Finance
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          We build from the ground up. The most advanced technology for the most ambitious goals.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((feature, i) => (
            <Card key={i}>
                <CardHeader>
                    {feature.icon}
                </CardHeader>
                <CardContent className="space-y-2">
                    <CardTitle>{feature.title}</CardTitle>
                    <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </section>
  );
}

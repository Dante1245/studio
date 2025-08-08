import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, BarChart, Zap } from 'lucide-react';

const features = [
    {
        icon: <BarChart className="h-8 w-8 text-primary" />,
        title: 'Real-Time Market Data',
        description: 'Trade with up-to-the-minute prices from major exchanges. Our simulation is as real as it gets.'
    },
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: 'Risk-Free Virtual Portfolio',
        description: 'Start with a virtual balance and learn to manage your portfolio without risking real money.'
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: 'Advanced Trading Tools',
        description: 'Utilize professional-grade charting tools, indicators, and order types to hone your skills.'
    }
]

export function Features() {
  return (
    <section id="features" className="container space-y-6 bg-slate-50/50 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Why Choose CryptoSim?
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          We provide the most realistic and feature-rich environment for aspiring crypto traders.
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

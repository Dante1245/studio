
'use client';

import * as React from 'react';
import { assets as cryptoAssets } from '@/lib/data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

const stocks = [
    { name: 'Tesla', ticker: 'TSLA', price: 183.01, change: 2.5, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/tsla.svg' },
    { name: 'Apple', ticker: 'AAPL', price: 214.29, change: -1.2, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/aapl.svg' },
    { name: 'NVIDIA', ticker: 'NVDA', price: 121.79, change: 3.1, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/nvda.svg' },
    { name: 'Amazon', ticker: 'AMZN', price: 185.57, change: 0.8, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/amzn.svg' },
    { name: 'Meta', ticker: 'META', price: 494.78, change: -0.5, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c258d5/svg/color/meta.svg' },
];

type PriceItem = {
    name: string;
    ticker: string;
    price: number;
    change: number;
    icon: string;
};

export function LivePrices() {
    const [prices, setPrices] = React.useState<PriceItem[]>([]);

    React.useEffect(() => {
        const combinedAssets = [
            ...cryptoAssets.map(c => ({ name: c.name, ticker: c.ticker, price: c.price, change: c.change24h, icon: c.icon })),
            ...stocks
        ];

        setPrices(combinedAssets);

        const interval = setInterval(() => {
            setPrices(prevPrices =>
                prevPrices.map(item => {
                    const randomChange = (Math.random() - 0.5) * 0.05; // Smaller, more frequent changes
                    const newPrice = item.price * (1 + randomChange);
                    return { ...item, price: newPrice, change: item.change + randomChange };
                })
            );
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const duplicatedPrices = [...prices, ...prices];

    return (
        <section className="w-full py-4 border-y border-border/40 bg-background/50 overflow-hidden">
            <div className="relative">
                <div className="flex animate-scroll-x">
                    {duplicatedPrices.map((item, index) => (
                        <div key={index} className="flex-shrink-0 flex items-center mx-4">
                             <Image src={item.icon} alt={item.name} width={24} height={24} className="mr-3" />
                            <span className="font-semibold text-foreground">{item.ticker}</span>
                            <span className="ml-3 text-muted-foreground">${item.price.toFixed(2)}</span>
                            <span className={cn(
                                "ml-2 flex items-center text-sm",
                                item.change >= 0 ? "text-green-500" : "text-red-500"
                            )}>
                                {item.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                                {item.change.toFixed(2)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

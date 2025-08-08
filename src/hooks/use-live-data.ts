'use client';

import * as React from 'react';
import { assets as initialAssets } from '@/lib/data';

export interface Asset {
  name: string;
  ticker: string;
  icon: string;
  balance: number;
  price: number;
  change24h: number;
}

export function useLiveData() {
  const [assets, setAssets] = React.useState<Asset[]>(() => {
    if (typeof window === 'undefined') {
      return initialAssets;
    }
    const storedAssets = localStorage.getItem('crypto-assets');
    return storedAssets ? JSON.parse(storedAssets) : initialAssets;
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets => {
        const newAssets = prevAssets.map(asset => {
          if (asset.ticker === 'USDT') return asset;
          
          const change = (Math.random() - 0.5) * 0.02; // Small random change
          const newPrice = asset.price * (1 + change);
          const newChange24h = (newPrice / (asset.price / (1 + asset.change24h/100)))*100 - 100;

          return { ...asset, price: newPrice, change24h: newChange24h };
        });
        
        if (typeof window !== 'undefined') {
            localStorage.setItem('crypto-assets', JSON.stringify(newAssets));
        }

        return newAssets;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const updateBalance = (ticker: string, amount: number) => {
    setAssets(prevAssets => {
        const newAssets = prevAssets.map(asset => {
            if(asset.ticker === ticker) {
                return { ...asset, balance: asset.balance + amount };
            }
            return asset;
        });

        if (typeof window !== 'undefined') {
            localStorage.setItem('crypto-assets', JSON.stringify(newAssets));
        }
        return newAssets;
    })
  }

  return { assets, updateBalance };
}

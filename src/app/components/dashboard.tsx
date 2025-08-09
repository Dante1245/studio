'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowUp, ArrowDown, Wallet } from 'lucide-react';
import { MarketNews } from './market-news';
import { PortfolioChart } from './portfolio-chart';
import { useLiveData } from '@/hooks/use-live-data';

export function Dashboard() {
  const { assets } = useLiveData();
  
  const portfolioValue = assets.reduce((acc, asset) => acc + asset.balance * asset.price, 0);
  const usdtBalance = assets.find(asset => asset.ticker === 'USDT')?.balance || 0;

  const sortedByChange = [...assets].sort((a, b) => a.change24h - b.change24h);
  const bestPerformer = sortedByChange[sortedByChange.length - 1];
  const worstPerformer = sortedByChange[0];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground">Here's your financial overview for today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
            <p className="text-xs text-muted-foreground">+0.0% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available to Withdraw</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usdtBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
            <p className="text-xs text-muted-foreground">USDT Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performer (24h)</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bestPerformer?.ticker}</div>
            <p className={`text-xs ${bestPerformer?.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {bestPerformer?.change24h.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Worst Performer (24h)</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{worstPerformer?.ticker}</div>
            <p className={`text-xs ${worstPerformer?.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
               {worstPerformer?.change24h.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>
        <div className="lg:col-span-1">
          <MarketNews />
        </div>
      </div>
    </div>
  );
}

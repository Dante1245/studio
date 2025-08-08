'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { type Asset } from '@/hooks/use-live-data';

interface PortfolioProps {
  assets: Asset[];
}

export function Portfolio({ assets }: PortfolioProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const totalValue = assets
    .filter(asset => asset.balance > 0)
    .reduce((acc, asset) => acc + asset.balance * asset.price, 0);

  const filteredAssets = assets.filter(
    asset =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Portfolio</h1>
        <p className="text-muted-foreground">An overview of your crypto assets.</p>
      </div>

      <Card>
        <CardHeader className="flex-col items-start gap-4 lg:flex-row lg:items-center">
          <div className="flex-1">
            <CardTitle>Total Balance</CardTitle>
            <CardDescription>
              <span className="text-3xl font-bold text-foreground">
                {totalValue.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </CardDescription>
          </div>
          <div className="relative w-full lg:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assets..."
              className="w-full appearance-none bg-background pl-8 shadow-none lg:w-64"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead className="text-right">Value (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map(asset => (
                <TableRow key={asset.ticker}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={asset.icon}
                        alt={asset.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {asset.balance > 0
                      ? `${asset.balance.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${asset.ticker}`
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {asset.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: asset.price < 1 ? 4 : 2,
                    })}
                  </TableCell>
                  <TableCell
                    className={asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}
                  >
                    {asset.change24h.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {(asset.balance * asset.price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

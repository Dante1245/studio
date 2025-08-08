'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { assets as initialAssets } from '@/lib/data';
import Image from 'next/image';

export function Portfolio() {
  const totalValue = initialAssets.reduce(
    (acc, asset) => acc + asset.balance * asset.price,
    0
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Portfolio</h1>
        <p className="text-muted-foreground">An overview of your crypto assets.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
          <CardDescription>
            <span className="text-3xl font-bold text-foreground">
              {totalValue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </CardDescription>
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
              {initialAssets.map(asset => (
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
                  <TableCell>{asset.balance.toLocaleString()} {asset.ticker}</TableCell>
                  <TableCell>
                    {asset.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </TableCell>
                  <TableCell
                    className={asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}
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

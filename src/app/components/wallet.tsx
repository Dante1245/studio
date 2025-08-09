'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { assets as initialAssets } from '@/lib/data';
import { Label } from '@/components/ui/label';

const defaultAddresses = initialAssets.reduce((acc, asset) => {
    acc[asset.ticker] = `0x...${asset.ticker.toLowerCase()}DefaultAddress...`;
    return acc;
}, {} as Record<string, string>);

export function Wallet() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [walletAddresses, setWalletAddresses] = useState<Record<string, string>>(defaultAddresses);
  const [selectedAsset, setSelectedAsset] = useState('BTC');

  useEffect(() => {
     const storedAddresses = localStorage.getItem('main-wallet-addresses');
      if (storedAddresses) {
        setWalletAddresses(JSON.parse(storedAddresses));
      }
    const handleStorageChange = () => {
      const storedAddresses = localStorage.getItem('main-wallet-addresses');
      if (storedAddresses) {
        setWalletAddresses(JSON.parse(storedAddresses));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const currentAddress = walletAddresses[selectedAsset] || '';

  const handleCopy = () => {
    if (!currentAddress) return;
    navigator.clipboard.writeText(currentAddress).then(() => {
      setCopied(true);
      toast({
        description: "Address copied to clipboard!",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentAddress}`;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Deposit Funds</h1>
        <p className="text-muted-foreground">
          Send crypto to your wallet address below.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Your Deposit Address</CardTitle>
          <CardDescription>
            Select an asset and send it to the address below. Sending any other asset may result in permanent loss.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="asset-select">Select Asset to Deposit</Label>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger id="asset-select">
                <SelectValue placeholder="Select an asset" />
              </SelectTrigger>
              <SelectContent>
                {initialAssets.map(asset => (
                  <SelectItem key={asset.ticker} value={asset.ticker}>
                    <div className="flex items-center gap-2">
                        <Image src={asset.icon} alt={asset.name} width={20} height={20} />
                        <span>{asset.name} ({asset.ticker})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
            <Image
              src={qrCodeUrl}
              alt="QR Code"
              width={150}
              height={150}
              data-ai-hint="qr code"
              key={currentAddress} // Re-render image when address changes
            />
            <div className="relative w-full">
              <Input readOnly value={currentAddress} className="pr-12 text-center md:text-left"/>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={handleCopy}
                aria-label="Copy address"
                disabled={!currentAddress}
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

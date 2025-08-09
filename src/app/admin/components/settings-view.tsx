'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { assets } from '@/lib/data';
import Image from 'next/image';

interface SettingsViewProps {
    walletAddresses: Record<string, string>;
    setWalletAddresses: (addresses: Record<string, string>) => void;
}

export function SettingsView({ walletAddresses, setWalletAddresses }: SettingsViewProps) {
    const [addresses, setAddresses] = React.useState(walletAddresses);
    const { toast } = useToast();

    const handleAddressChange = (ticker: string, value: string) => {
        setAddresses(prev => ({
            ...prev,
            [ticker]: value
        }));
    };

    const handleSave = () => {
        setWalletAddresses(addresses);
        toast({
            title: 'Settings Saved',
            description: 'The deposit wallet addresses have been updated.',
        });
    };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Application Settings</h1>
        <p className="text-muted-foreground">Manage global deposit wallet addresses for the brokerage.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Crypto Deposit Wallets</CardTitle>
          <CardDescription>
            Manage the primary deposit addresses for each supported cryptocurrency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                {assets.map(asset => (
                    <div key={asset.ticker} className="space-y-3 rounded-md border p-4">
                         <Label htmlFor={`wallet-address-${asset.ticker}`} className="flex items-center gap-2 font-semibold">
                            <Image src={asset.icon} alt={asset.name} width={20} height={20} />
                            {asset.name} ({asset.ticker}) Address
                        </Label>
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <Image
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${addresses[asset.ticker] || ''}`}
                                alt={`${asset.name} QR Code`}
                                width={100}
                                height={100}
                                data-ai-hint="qr code"
                                key={addresses[asset.ticker] || asset.ticker}
                            />
                            <Input 
                                id={`wallet-address-${asset.ticker}`} 
                                value={addresses[asset.ticker] || ''} 
                                onChange={(e) => handleAddressChange(asset.ticker, e.target.value)} 
                                placeholder="Enter wallet address..."
                                className="flex-1"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={handleSave}>Save All Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SettingsViewProps {
    walletAddress: string;
    setWalletAddress: (address: string) => void;
}

export function SettingsView({ walletAddress, setWalletAddress }: SettingsViewProps) {
    const [address, setAddress] = React.useState(walletAddress);
    const { toast } = useToast();

    const handleSave = () => {
        setWalletAddress(address);
        toast({
            title: 'Settings Saved',
            description: 'The main deposit wallet address has been updated.',
        });
    };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Application Settings</h1>
        <p className="text-muted-foreground">Manage global settings for the brokerage.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Main Wallet</CardTitle>
          <CardDescription>
            This is the primary deposit address for the entire application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="wallet-address">Deposit Wallet Address (ERC20)</Label>
                <Input 
                    id="wallet-address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="0x..."
                />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}

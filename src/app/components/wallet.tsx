'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

// This component now needs to get the wallet address from its parent,
// but since we can't easily pass props from the admin page to here,
// we will use localStorage as a temporary bridge for this simulation.
export function Wallet() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState('0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B');

  // A real app would use a global state manager (like Redux or Zustand)
  // or a server-side fetch to get this value. For this demo, we'll
  // listen for changes that the admin panel might make.
  useEffect(() => {
     const handleStorageChange = () => {
      const storedAddress = localStorage.getItem('main-wallet-address');
      if (storedAddress) {
        setWalletAddress(storedAddress);
      }
    };
    
    handleStorageChange(); // Initial check
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      toast({
        description: "Address copied to clipboard!",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${walletAddress}`;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Deposit Funds</h1>
        <p className="text-muted-foreground">
          Send crypto to your CryptoSim wallet address below.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Your Deposit Address</CardTitle>
          <CardDescription>
            Only send USDT (ERC20) to this address. Sending any other asset may result in
            permanent loss.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
            <Image
              src={qrCodeUrl}
              alt="QR Code"
              width={150}
              height={150}
              data-ai-hint="qr code"
              key={walletAddress} // Re-render image when address changes
            />
            <div className="relative w-full">
              <Input readOnly value={walletAddress} className="pr-12 text-center md:text-left"/>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={handleCopy}
                aria-label="Copy address"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-md border border-yellow-200 bg-yellow-50/50 p-4">
            <div className="mt-1 h-4 w-4 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <div>
                <h3 className="font-semibold text-yellow-800">Important</h3>
                <p className="text-sm text-yellow-700">This is a simulated brokerage. Do not send real funds to this address. All transactions are for demonstration purposes only.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

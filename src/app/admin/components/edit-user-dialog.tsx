'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type User } from '@/lib/admin-data';
import { type Asset } from '@/hooks/use-live-data';
import Image from 'next/image';

interface EditUserDialogProps {
  user: User;
  assets: Asset[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User, balances: Record<string, number>) => void;
}

export function EditUserDialog({ user, assets, isOpen, onClose, onSave }: EditUserDialogProps) {
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [balances, setBalances] = React.useState<Record<string, number>>(() => {
    return assets.reduce((acc, asset) => {
      acc[asset.ticker] = asset.balance;
      return acc;
    }, {} as Record<string, number>);
  });

  const handleBalanceChange = (ticker: string, value: string) => {
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      setBalances(prev => ({ ...prev, [ticker]: numberValue }));
    }
  };

  const handleSave = () => {
    onSave({ ...user, name, email }, balances);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User: {user.name}</DialogTitle>
          <DialogDescription>
            Modify user details and asset balances below. Changes are saved directly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Portfolio Balances</h3>
            <div className="grid max-h-64 grid-cols-1 gap-4 overflow-y-auto rounded-md border p-4 sm:grid-cols-2">
              {assets.map(asset => (
                <div key={asset.ticker} className="space-y-2">
                  <Label htmlFor={`balance-${asset.ticker}`} className="flex items-center gap-2">
                    <Image src={asset.icon} alt={asset.name} width={20} height={20} />
                    {asset.name} ({asset.ticker})
                  </Label>
                  <Input
                    id={`balance-${asset.ticker}`}
                    type="number"
                    value={balances[asset.ticker] || 0}
                    onChange={(e) => handleBalanceChange(asset.ticker, e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

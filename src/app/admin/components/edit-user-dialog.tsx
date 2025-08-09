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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { type Transaction } from '@/lib/data';

interface EditUserDialogProps {
  user: User;
  assets: Asset[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User, balances: Record<string, number>) => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export function EditUserDialog({
  user,
  assets,
  isOpen,
  onClose,
  onSave,
  onAddTransaction,
}: EditUserDialogProps) {
  const { toast } = useToast();
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [balances, setBalances] = React.useState<Record<string, number>>(() => {
    return assets.reduce((acc, asset) => {
      acc[asset.ticker] = asset.balance;
      return acc;
    }, {} as Record<string, number>);
  });

  // State for new transaction form
  const [txType, setTxType] = React.useState<Transaction['type']>('Deposit');
  const [txAsset, setTxAsset] = React.useState('BTC');
  const [txAmount, setTxAmount] = React.useState('');
  const [txStatus, setTxStatus] = React.useState<Transaction['status']>('Completed');

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

  const handleAddTransaction = () => {
    const amount = parseFloat(txAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid positive number for the transaction amount.',
        variant: 'destructive',
      });
      return;
    }

    onAddTransaction({
      type: txType,
      asset: txAsset,
      amount: amount,
      status: txStatus,
    });

    toast({
      title: 'Transaction Added',
      description: `Successfully added a ${txType} of ${amount} ${txAsset} for ${user.name}.`,
    });

    // Reset form
    setTxType('Deposit');
    setTxAsset('BTC');
    setTxAmount('');
    setTxStatus('Completed');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit User: {user.name}</DialogTitle>
          <DialogDescription>
            Modify user details, asset balances, and transaction history.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[70vh] grid-cols-1 gap-8 overflow-y-auto p-1 md:grid-cols-2">
          {/* Left Column: User Details & Balances */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Balances</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                        onChange={e => handleBalanceChange(asset.ticker, e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Add Transaction */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Transaction</CardTitle>
                <DialogDescription>Manually add a transaction to this user's history.</DialogDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tx-type">Type</Label>
                  <Select value={txType} onValueChange={v => setTxType(v as any)}>
                    <SelectTrigger id="tx-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Deposit">Deposit</SelectItem>
                      <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                      <SelectItem value="Bonus">Bonus</SelectItem>
                      <SelectItem value="Trade">Trade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tx-asset">Asset</Label>
                  <Select value={txAsset} onValueChange={setTxAsset}>
                    <SelectTrigger id="tx-asset">
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      {assets.map(asset => (
                        <SelectItem key={asset.ticker} value={asset.ticker}>
                          {asset.name} ({asset.ticker})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tx-amount">Amount</Label>
                  <Input
                    id="tx-amount"
                    type="number"
                    value={txAmount}
                    onChange={e => setTxAmount(e.target.value)}
                    placeholder="e.g., 0.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tx-status">Status</Label>
                  <Select value={txStatus} onValueChange={v => setTxStatus(v as any)}>
                    <SelectTrigger id="tx-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddTransaction} className="w-full">
                  Add Transaction Record
                </Button>
              </CardContent>
            </Card>
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

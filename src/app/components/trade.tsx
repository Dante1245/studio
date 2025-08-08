'use client';

import * as React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { type Transaction } from '@/lib/data';
import { type Asset } from '@/hooks/use-live-data';
import { ArrowLeftRight, Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const formSchema = z.object({
    fromAsset: z.string(),
    toAsset: z.string(),
    fromAmount: z.coerce.number().positive(),
}).refine(data => data.fromAsset !== data.toAsset, {
    message: "Cannot trade the same asset",
    path: ["toAsset"],
});

interface TradeProps {
  assets: Asset[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateBalance: (ticker: string, amount: number) => void;
}

export function Trade({ assets, addTransaction, updateBalance }: TradeProps) {
  const { toast } = useToast();
  const usdtBalance = assets.find(a => a.ticker === 'USDT')?.balance || 0;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromAsset: 'USDT',
      toAsset: 'BTC',
      fromAmount: undefined,
    },
  });

  const fromAssetTicker = useWatch({ control: form.control, name: 'fromAsset' });
  const toAssetTicker = useWatch({ control: form.control, name: 'toAsset' });
  const fromAmount = useWatch({ control: form.control, name: 'fromAmount' });

  const fromAsset = assets.find(a => a.ticker === fromAssetTicker);
  const toAsset = assets.find(a => a.ticker === toAssetTicker);

  const toAmount = fromAsset && toAsset && fromAmount > 0 
    ? (fromAmount * fromAsset.price) / toAsset.price 
    : 0;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const fromAssetData = assets.find(a => a.ticker === values.fromAsset);
    if (!fromAssetData || fromAssetData.balance < values.fromAmount) {
        form.setError("fromAmount", { message: "Insufficient balance." });
        return;
    }

    updateBalance(values.fromAsset, -values.fromAmount);
    updateBalance(values.toAsset, toAmount);

    addTransaction({
      type: 'Trade',
      asset: `${values.fromAsset} to ${values.toAsset}`,
      amount: values.fromAmount,
      status: 'Completed',
    });
    
    toast({
      title: 'Trade Successful',
      description: `You traded ${values.fromAmount.toLocaleString()} ${values.fromAsset} for ${toAmount.toLocaleString()} ${values.toAsset}.`,
    });

    form.reset();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trade Assets</h1>
        <p className="text-muted-foreground">Instantly swap between cryptocurrencies.</p>
      </div>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>New Trade</CardTitle>
          <CardDescription>
            Your USDT balance: {usdtBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fromAsset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <AssetSelector assets={assets} value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fromAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center py-2">
                <Button variant="ghost" size="icon" type="button" onClick={() => {
                    form.setValue('fromAsset', toAssetTicker);
                    form.setValue('toAsset', fromAssetTicker);
                }}>
                    <ArrowLeftRight className="size-4" />
                </Button>
              </div>

              <FormField
                control={form.control}
                name="toAsset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <AssetSelector assets={assets} value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormControl>
                    <Input type="number" placeholder="0.00" readOnly value={toAmount > 0 ? toAmount.toFixed(8) : ''} />
                </FormControl>
              </FormItem>
              
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Executing...' : 'Execute Trade'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function AssetSelector({ assets, value, onChange }: { assets: Asset[], value: string, onChange: (value: string) => void }) {
    const [open, setOpen] = React.useState(false);
    const selectedAsset = assets.find(a => a.ticker === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selectedAsset ? (
                        <div className="flex items-center gap-2">
                            <Image src={selectedAsset.icon} alt={selectedAsset.name} width={20} height={20} />
                            {selectedAsset.name} ({selectedAsset.ticker})
                        </div>
                    ) : "Select asset..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search asset..." />
                    <CommandList>
                        <CommandEmpty>No asset found.</CommandEmpty>
                        <CommandGroup>
                            {assets.map((asset) => (
                            <CommandItem
                                key={asset.ticker}
                                value={asset.ticker}
                                onSelect={(currentValue) => {
                                    onChange(currentValue.toUpperCase());
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === asset.ticker ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                <div className="flex items-center gap-2">
                                    <Image src={asset.icon} alt={asset.name} width={20} height={20} />
                                    {asset.name} ({asset.ticker})
                                </div>
                            </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

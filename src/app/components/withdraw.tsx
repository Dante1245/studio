'use client';

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

const formSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: 'Please enter a valid amount.' })
    .positive('Amount must be positive.'),
  asset: z.string().min(1, 'Please select an asset.'),
  address: z.string().min(10, 'Please enter a valid wallet address.'),
});

interface WithdrawProps {
  assets: Asset[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateBalance: (ticker: string, amount: number) => void;
}

export function Withdraw({ assets, addTransaction, updateBalance }: WithdrawProps) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      asset: 'USDT',
      address: '',
    },
  });

  const selectedAssetTicker = useWatch({ control: form.control, name: 'asset' });
  const selectedAsset = assets.find(a => a.ticker === selectedAssetTicker);
  const totalBalance = assets.reduce((acc, asset) => acc + (asset.balance * asset.price), 0);
  
  const customFormSchema = formSchema.refine(data => {
    const asset = assets.find(a => a.ticker === data.asset);
    return !asset || data.amount <= asset.balance;
  }, {
    message: "You can't withdraw more than your balance.",
    path: ['amount'],
  });

  form.trigger(); // Reruns validation when selected asset changes

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateBalance(values.asset, -values.amount);
    
    addTransaction({
      type: 'Withdrawal',
      asset: values.asset,
      amount: values.amount,
      status: 'Pending',
    });

    toast({
      title: 'Withdrawal Request Submitted',
      description: `Your request to withdraw ${values.amount} ${values.asset} is being processed. An email confirmation has been sent.`,
      variant: 'default',
    });

    form.reset();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Request Withdrawal</h1>
        <p className="text-muted-foreground">
          Withdraw funds to your external wallet. Requests are processed within 24 hours.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Withdrawal Form</CardTitle>
          <CardDescription>
            Your current available balance for withdrawal is {totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="asset"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-48">
                      <FormLabel>Asset</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select asset" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {assets.filter(a => a.balance > 0).map(asset => (
                            <SelectItem key={asset.ticker} value={asset.ticker}>
                              {asset.ticker} ({asset.balance.toFixed(4)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Withdrawal Address ({selectedAsset?.name || '...'} Network)</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Submit Withdrawal Request'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

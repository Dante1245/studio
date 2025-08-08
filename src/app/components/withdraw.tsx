'use client';

import { useForm } from 'react-hook-form';
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

const formSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: 'Please enter a valid amount.' })
    .positive('Amount must be positive.')
    .max(200, "You can't withdraw more than your $200 bonus."),
  asset: z.string().min(1, 'Please select an asset.'),
  address: z.string().min(10, 'Please enter a valid wallet address.'),
});

interface WithdrawProps {
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export function Withdraw({ addTransaction }: WithdrawProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      asset: 'USDT',
      address: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
            Your current available balance for withdrawal is $200.00 USDT.
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
                    <FormItem className="w-full sm:w-40">
                      <FormLabel>Asset</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select asset" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USDT">USDT</SelectItem>
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
                    <FormLabel>Withdrawal Address (ERC20)</FormLabel>
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

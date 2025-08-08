'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/components/app-sidebar';
import { Header } from '@/app/components/header';
import { Dashboard } from '@/app/components/dashboard';
import { Portfolio } from '@/app/components/portfolio';
import { Wallet } from '@/app/components/wallet';
import { Withdraw } from '@/app/components/withdraw';
import { History } from '@/app/components/history';
import { type Transaction } from '@/lib/data';
import { NotificationHandler } from '@/app/components/notification-handler';
import { useToast } from '@/hooks/use-toast';
import { SupportBot } from '@/app/components/support-bot';

export type View = 'dashboard' | 'portfolio' | 'wallet' | 'withdraw' | 'history';

export default function BrokerPage() {
  const [view, setView] = React.useState<View>('dashboard');
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    // Check if the effect has already run
    if (typeof window !== 'undefined' && !localStorage.getItem('bonus-awarded')) {
      const bonusTransaction: Omit<Transaction, 'id' | 'date'> = {
        type: 'Bonus',
        asset: 'USDT',
        amount: 200,
        status: 'Completed',
      };
      addTransaction(bonusTransaction);
      toast({
        title: 'Welcome!',
        description: 'You have received a $200 sign-up bonus.',
      });
      localStorage.setItem('bonus-awarded', 'true');
    }
  }, [toast]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    setTransactions(prev => [
      { ...transaction, id: `tx_${Date.now()}`, date: new Date().toISOString().split('T')[0] },
      ...prev,
    ]);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard />;
      case 'portfolio':
        return <Portfolio />;
      case 'wallet':
        return <Wallet />;
      case 'withdraw':
        return <Withdraw addTransaction={addTransaction} />;
      case 'history':
        return <History transactions={transactions} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar activeView={view} setView={setView} />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header>
          <SidebarTrigger />
        </Header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </SidebarInset>
      <NotificationHandler />
      <SupportBot />
    </SidebarProvider>
  );
}

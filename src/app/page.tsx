'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { Header } from './components/header';
import { Dashboard } from './components/dashboard';
import { Portfolio } from './components/portfolio';
import { Wallet } from './components/wallet';
import { Withdraw } from './components/withdraw';
import { History } from './components/history';
import { type Transaction } from '@/lib/data';
import { NotificationHandler } from './components/notification-handler';

export type View = 'dashboard' | 'portfolio' | 'wallet' | 'withdraw' | 'history';

export default function BrokerPage() {
  const [view, setView] = React.useState<View>('dashboard');
  const [transactions, setTransactions] = React.useState<Transaction[]>([
    {
      id: 'tx_bonus',
      date: new Date().toISOString().split('T')[0],
      type: 'Bonus',
      asset: 'USDT',
      amount: 200,
      status: 'Completed',
    },
  ]);

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
    </SidebarProvider>
  );
}

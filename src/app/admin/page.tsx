
'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { Header } from './components/header';
import { AdminDashboard } from './components/admin-dashboard';
import { UsersView } from './components/users-view';
import { SupportBot } from '@/app/components/support-bot';
import { SettingsView } from './components/settings-view';
import { assets } from '@/lib/data';
import { type Transaction } from '@/lib/data';

export type View = 'dashboard' | 'users' | 'settings';

const initialAddresses = assets.reduce((acc, asset) => {
    // Placeholder addresses, replace with real defaults if necessary
    acc[asset.ticker] = `0x...${asset.ticker.toLowerCase()}DefaultAddress...`;
    return acc;
}, {} as Record<string, string>);


export default function AdminPage() {
  const [view, setView] = React.useState<View>('dashboard');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [walletAddresses, setWalletAddresses] = React.useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') {
        return initialAddresses;
    }
    const savedAddresses = localStorage.getItem('main-wallet-addresses');
    return savedAddresses ? JSON.parse(savedAddresses) : initialAddresses;
  });

  const [transactions, setTransactions] = React.useState<Transaction[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    const savedTransactions = localStorage.getItem('crypto-transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });


  React.useEffect(() => {
    localStorage.setItem('main-wallet-addresses', JSON.stringify(walletAddresses));
  }, [walletAddresses]);

  React.useEffect(() => {
    localStorage.setItem('crypto-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    setTransactions(prev => [
      { ...transaction, id: `tx_${Date.now()}`, date: new Date().toISOString().split('T')[0] },
      ...prev,
    ]);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UsersView searchTerm={searchTerm} addTransaction={addTransaction} />;
      case 'settings':
        return <SettingsView walletAddresses={walletAddresses} setWalletAddresses={setWalletAddresses} />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar activeView={view} setView={setView} />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} setView={setView}>
          <SidebarTrigger />
        </Header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </SidebarInset>
      <SupportBot />
    </SidebarProvider>
  );
}

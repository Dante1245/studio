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

export type View = 'dashboard' | 'users' | 'settings';

export default function AdminPage() {
  const [view, setView] = React.useState<View>('dashboard');

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <AdminDashboard />;
      // Add other views here later
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
        <Header>
          <SidebarTrigger />
        </Header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

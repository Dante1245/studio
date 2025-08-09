
'use client';

import type { View } from '@/app/admin/page';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/app/components/icons';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

interface AppSidebarProps {
  activeView: View;
  setView: (view: View) => void;
}

export function AppSidebar({ activeView, setView }: AppSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="size-7 text-accent" />
          <span className="text-lg font-semibold">CryptoSim Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map(item => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setView(item.id as View)}
                isActive={activeView === item.id}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-1" />
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton tooltip="Logout" asChild>
              <Link href="/">
                <LogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

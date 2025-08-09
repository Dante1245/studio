'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { users as mockUsers, type User } from '@/lib/admin-data';
import { useLiveData } from '@/hooks/use-live-data';
import { EditUserDialog } from './edit-user-dialog';
import { type Transaction } from '@/lib/data';

interface UsersViewProps {
    searchTerm: string;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export function UsersView({ searchTerm, addTransaction }: UsersViewProps) {
    const { assets, updateBalance } = useLiveData();
    const [users, setUsers] = React.useState<User[]>(mockUsers);
    const [editingUser, setEditingUser] = React.useState<User | null>(null);
    
    // In a real app, this would be a fetch call. For the simulation, we create a user object.
    const liveUser: User = {
        id: 'usr_live_001',
        name: 'Live User',
        email: 'user@example.com',
        avatar: 'https://placehold.co/100x100.png',
        joined: new Date().toISOString().split('T')[0],
        balance: assets.reduce((acc, asset) => acc + asset.balance * asset.price, 0),
        status: 'Active',
    };

    const allUsers = [...users, liveUser];

    const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusVariant = (status: User['status']) => {
        switch (status) {
        case 'Active':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Blocked':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    
    const handleSaveChanges = (updatedUser: User, updatedBalances: Record<string, number>) => {
        // In a real app, you would make an API call here.
        // For now, we just log it and update the local state for balances.
        console.log('Updated user:', updatedUser);
        console.log('Updated balances:', updatedBalances);

        Object.entries(updatedBalances).forEach(([ticker, newBalance]) => {
            const currentAsset = assets.find(a => a.ticker === ticker);
            if (currentAsset) {
                const diff = newBalance - currentAsset.balance;
                if (diff !== 0) {
                    updateBalance(ticker, diff);
                }
            }
        });

        setEditingUser(null);
    };

  return (
    <>
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">View and manage all registered users.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            A list of all users in the system. Found {filteredUsers.length} of {allUsers.length} users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusVariant(user.status)}`}>
                        {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.balance.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setEditingUser(user)}>Edit User</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    {editingUser && (
        <EditUserDialog
            user={editingUser}
            assets={assets}
            isOpen={!!editingUser}
            onClose={() => setEditingUser(null)}
            onSave={handleSaveChanges}
            onAddTransaction={addTransaction}
        />
    )}
    </>
  );
}

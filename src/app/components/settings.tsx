
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function Settings() {
    const { toast } = useToast();

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account and application settings.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive updates about your account and new features.</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get real-time alerts on your devices.</p>
                        </div>
                        <Switch id="push-notifications" />
                    </div>
                    <Button onClick={() => toast({ title: 'Settings Saved' })}>Save Preferences</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                        </div>
                        <Switch id="dark-mode" defaultChecked disabled />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

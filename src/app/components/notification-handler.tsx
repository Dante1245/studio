'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { NotificationToast } from './notification-toast';
import { getPurchaseNotification } from '@/app/actions';

const mockLocations = [
  // Rich countries from prompt
  'USA',
  'Switzerland',
  'UAE',
  'Norway',
  'Germany',
  // Other countries to ensure some calls don't trigger notification
  'Japan',
  'Canada',
  'Australia',
  'Brazil',
  'India',
];

export function NotificationHandler() {
  const { toast } = useToast();

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const randomCountry = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      
      const notification = await getPurchaseNotification({ country: randomCountry });

      if (notification.showNotification && notification.country) {
        toast({
          // @ts-ignore
          description: (
            <NotificationToast
              country={notification.country}
              crypto={notification.crypto}
              amount={notification.amount}
            />
          ),
          duration: 5000,
        });
      }
    }, 8000); // Check every 8 seconds

    return () => clearInterval(interval);
  }, [toast]);

  return null;
}

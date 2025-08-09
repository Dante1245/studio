
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
  const [language, setLanguage] = React.useState('en');

  React.useEffect(() => {
    if (typeof window !== 'undefined' && navigator.language) {
      setLanguage(navigator.language.split('-')[0]);
    }

    const interval = setInterval(async () => {
      const randomCountry = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      
      const notification = await getPurchaseNotification({ country: randomCountry, language });

      if (notification.showNotification && notification.country && notification.name) {
        toast({
          // @ts-ignore
          description: (
            <NotificationToast
              country={notification.country}
              crypto={notification.crypto}
              amount={notification.amount}
              name={notification.name}
            />
          ),
          duration: 5000,
        });
      }
    }, 8000); // Check every 8 seconds

    return () => clearInterval(interval);
  }, [toast, language]);

  return null;
}

'use server';

import { purchaseProbability } from '@/ai/flows/purchase-probability-model';
import { summarizeNews } from '@/ai/flows/summarize-news-flow';
import { z } from 'zod';

const mockCrypto = ['BTC', 'ETH', 'SOL', 'DOGE', 'USDT'];

function getRandomAmount(crypto: string) {
  switch (crypto) {
    case 'BTC':
      return (Math.random() * 2 + 0.1).toFixed(2);
    case 'ETH':
      return (Math.random() * 15 + 1).toFixed(2);
    case 'USDT':
      return (Math.random() * 50000 + 1000).toFixed(0);
    default:
      return (Math.random() * 10000 + 50).toFixed(0);
  }
}

const getPurchaseNotificationInput = z.object({
  country: z.string(),
});

export async function getPurchaseNotification(input: z.infer<typeof getPurchaseNotificationInput>) {
  try {
    const validatedInput = getPurchaseNotificationInput.parse(input);

    const result = await purchaseProbability({
      country: validatedInput.country,
      isNewUser: true, // Assume new user to increase notification probability for demo
    });

    if (result.shouldSendNotification) {
      const crypto = mockCrypto[Math.floor(Math.random() * mockCrypto.length)];
      const amount = getRandomAmount(crypto);
      return {
        showNotification: true,
        country: validatedInput.country,
        crypto,
        amount,
      };
    }

    return { showNotification: false };
  } catch (error) {
    console.error('Error getting purchase notification:', error);
    return { showNotification: false };
  }
}

export async function getNewsSummary() {
  try {
    const result = await summarizeNews({ topic: 'cryptocurrency' });
    return result.articles;
  } catch (error) {
    console.error('Error getting news summary:', error);
    return [];
  }
}

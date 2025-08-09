
'use server';

/**
 * @fileOverview This file defines a Genkit flow for determining the probability of a user receiving a mock purchase notification.
 *
 * - purchaseProbability - A function that determines if a user should receive a mock purchase notification.
 * - PurchaseProbabilityInput - The input type for the purchaseProbability function.
 * - PurchaseProbabilityOutput - The return type for the purchaseProbability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const PurchaseProbabilityInputSchema = z.object({
  country: z.string().describe('The country of the user.'),
  isNewUser: z.boolean().describe('Whether the user is a new user or not.'),
});
export type PurchaseProbabilityInput = z.infer<typeof PurchaseProbabilityInputSchema>;

const PurchaseProbabilityOutputSchema = z.object({
  shouldSendNotification: z
    .boolean()
    .describe('Whether a mock purchase notification should be sent to the user.'),
});
export type PurchaseProbabilityOutput = z.infer<typeof PurchaseProbabilityOutputSchema>;

export async function purchaseProbability(input: PurchaseProbabilityInput): Promise<PurchaseProbabilityOutput> {
  return purchaseProbabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'purchaseProbabilityPrompt',
  model: googleAI.model('gemini-1.5-flash'),
  input: {schema: PurchaseProbabilityInputSchema},
  output: {schema: PurchaseProbabilityOutputSchema},
  prompt: `You are a marketing expert. Your goal is to determine whether to send a mock purchase notification to a user based on their country and if they are a new user.

  Only send a notification if the user meets the following criteria:
  1. The user is a new user (isNewUser is true).
  2. The user is from one of the following affluent countries: USA, Switzerland, UAE, Norway, Germany.

  Evaluate the following user data and set 'shouldSendNotification' to true only if both conditions are met.

  User Country: {{{country}}}
  Is New User: {{{isNewUser}}}
  `,
});

const purchaseProbabilityFlow = ai.defineFlow(
  {
    name: 'purchaseProbabilityFlow',
    inputSchema: PurchaseProbabilityInputSchema,
    outputSchema: PurchaseProbabilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

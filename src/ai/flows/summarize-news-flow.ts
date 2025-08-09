'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing cryptocurrency news.
 *
 * - summarizeNews - A function that returns a summary of recent crypto news.
 * - NewsSummaryInput - The input type for the summarizeNews function.
 * - NewsSummaryOutput - The return type for the summarizeNews function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewsArticleSchema = z.object({
  headline: z.string().describe('The headline of the news article.'),
  summary: z.string().describe('A one or two sentence summary of the news article.'),
  source: z.string().describe('The fictional news source (e.g., "Crypto News Daily").'),
});

const NewsSummaryInputSchema = z.object({
  topic: z.string().describe('The topic to get news about.'),
});
export type NewsSummaryInput = z.infer<typeof NewsSummaryInputSchema>;

const NewsSummaryOutputSchema = z.object({
  articles: z.array(NewsArticleSchema).describe('A list of recent news articles.'),
});
export type NewsSummaryOutput = z.infer<typeof NewsSummaryOutputSchema>;

export async function summarizeNews(input: NewsSummaryInput): Promise<NewsSummaryOutput> {
  return summarizeNewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNewsPrompt',
  input: { schema: NewsSummaryInputSchema },
  output: { schema: NewsSummaryOutputSchema },
  prompt: `You are a financial news correspondent for a major publication.
  
  Generate a list of 5 recent, realistic (but fictional) news article summaries about the topic: {{{topic}}}.
  
  For each article, provide a compelling headline, a one to two sentence summary, and a fictional news source.
  `,
});

const summarizeNewsFlow = ai.defineFlow(
  {
    name: 'summarizeNewsFlow',
    inputSchema: NewsSummaryInputSchema,
    outputSchema: NewsSummaryOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);

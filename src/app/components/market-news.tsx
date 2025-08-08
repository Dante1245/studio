'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type NewsSummaryOutput } from '@/ai/flows/summarize-news-flow';
import { Skeleton } from '@/components/ui/skeleton';

type Article = NewsSummaryOutput['articles'][0];

const mockArticles: Article[] = [
  {
    headline: 'Bitcoin Surges Past $70,000 as Institutional Interest Grows',
    summary: 'Bitcoin saw a significant price increase this week, breaking the $70,000 resistance level amid news of major institutional investments.',
    source: 'Crypto News Daily',
  },
  {
    headline: 'Ethereum "Dencun" Upgrade Successfully Deployed on Mainnet',
    summary: 'The latest Ethereum upgrade, Dencun, has been successfully deployed, promising lower transaction fees for layer-2 rollups.',
    source: 'ETH News',
  },
  {
    headline: 'Solana Ecosystem Sees Explosive Growth in Q3',
    summary: 'The Solana network has experienced a surge in developer activity and new projects, driving the price of SOL up by over 50% this quarter.',
    source: 'DeFi Times',
  },
  {
    headline: 'Global Regulators Propose New Framework for Crypto Assets',
    summary: 'An international regulatory body has proposed a unified framework for crypto assets, aiming to create consistent rules across jurisdictions.',
    source: 'Financial World News',
  },
];


export function MarketNews() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        // Using mock data to avoid API rate limit issues during development
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setArticles(mockArticles);
      } catch (error) {
        console.error('Failed to load news summary', error);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Market News</CardTitle>
        <CardDescription>AI-powered summaries of the latest crypto news.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))
            : articles.map((article, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs text-muted-foreground">{article.source}</p>
                  <h3 className="font-semibold">{article.headline}</h3>
                  <p className="text-sm text-muted-foreground">{article.summary}</p>
                </div>
              ))}
          {!loading && articles.length === 0 && (
            <p className="text-center text-muted-foreground">Could not load news.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

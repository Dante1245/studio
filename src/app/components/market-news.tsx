'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type NewsSummaryOutput } from '@/ai/flows/summarize-news-flow';
import { getNewsSummary } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

type Article = NewsSummaryOutput['articles'][0];

export function MarketNews() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        const newsArticles = await getNewsSummary();
        setArticles(newsArticles);
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

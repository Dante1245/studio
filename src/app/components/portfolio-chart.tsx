'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const chartData = [
  { date: '2024-01-01', value: 186 },
  { date: '2024-02-01', value: 305 },
  { date: '2024-03-01', value: 237 },
  { date: '2024-04-01', value: 273 },
  { date: '2024-05-01', value: 209 },
  { date: '2024-06-01', value: 214 },
  { date: '2024-07-01', value: 320 },
  { date: '2024-08-01', value: 350 },
  { date: '2024-09-01', value: 310 },
  { date: '2024-10-01', value: 400 },
  { date: '2024-11-01', value: 380 },
  { date: '2024-12-01', value: 450 },
];

const chartConfig = {
  value: {
    label: 'Portfolio Value',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function PortfolioChart() {
  const [activeChart, setActiveChart] = React.useState<'line' | 'area' | 'bar'>('area');
  const totalValue = chartData[chartData.length - 1]?.value ?? 0;
  const previousValue = chartData[chartData.length - 2]?.value ?? 0;
  const percentageChange = ((totalValue - previousValue) / previousValue) * 100;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-0">
        <div>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                {totalValue.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
              <span
                className={`text-sm font-medium ${
                  percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {percentageChange >= 0 ? '+' : ''}
                {percentageChange.toFixed(1)}%
              </span>
            </div>
          </CardDescription>
        </div>
        <Tabs
          defaultValue={activeChart}
          onValueChange={(value) => setActiveChart(value as 'line' | 'area' | 'bar')}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-2 pt-0 sm:p-4 sm:pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          {activeChart === 'area' && (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area dataKey="value" type="natural" fill="url(#fillValue)" stroke="var(--color-value)" />
            </AreaChart>
          )}
          {activeChart === 'line' && (
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="value" type="natural" stroke="var(--color-value)" strokeWidth={2} dot={false} />
            </LineChart>
          )}
          {activeChart === 'bar' && (
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

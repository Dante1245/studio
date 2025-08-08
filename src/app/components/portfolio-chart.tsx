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
  ComposedChart,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const chartData = [
    { date: "2024-07-01", open: 310.45, high: 325.80, low: 308.20, close: 320.75, volume: 18900000 },
    { date: "2024-07-02", open: 321.10, high: 330.50, low: 319.80, close: 328.90, volume: 21200000 },
    { date: "2024-07-03", open: 328.90, high: 335.20, low: 327.50, close: 333.40, volume: 19800000 },
    { date: "2024-07-04", open: 333.40, high: 334.90, low: 329.10, close: 330.80, volume: 17500000 },
    { date: "2024-07-05", open: 330.80, high: 340.10, low: 329.50, close: 339.60, volume: 22300000 },
    { date: "2024-07-06", open: 339.60, high: 345.30, low: 338.20, close: 342.10, volume: 20500000 },
    { date: "2024-07-07", open: 342.10, high: 348.90, low: 340.70, close: 348.50, volume: 23100000 },
    { date: "2024-07-08", open: 348.50, high: 352.00, low: 345.80, close: 350.20, volume: 19400000 },
    { date: "2024-07-09", open: 350.20, high: 355.60, low: 349.50, close: 351.80, volume: 21800000 },
    { date: "2024-07-10", open: 351.80, high: 358.20, low: 350.10, close: 357.90, volume: 24500000 },
    { date: "2024-07-11", open: 357.90, high: 362.40, low: 355.80, close: 360.50, volume: 22700000 },
    { date: "2024-07-12", open: 360.50, high: 365.00, low: 358.30, close: 363.20, volume: 25800000 },
    { date: "2024-07-13", open: 363.20, high: 368.70, low: 361.90, close: 367.80, volume: 26900000 },
    { date: "2024-07-14", open: 367.80, high: 372.10, low: 365.40, close: 370.40, volume: 23900000 },
    { date: "2024-07-15", open: 370.40, high: 375.00, low: 369.80, close: 374.60, volume: 24800000 },
    { date: "2024-07-16", open: 374.60, high: 380.20, low: 373.10, close: 379.80, volume: 27100000 },
    { date: "2024-07-17", open: 379.80, high: 385.50, low: 378.40, close: 382.90, volume: 28300000 },
    { date: "2024-07-18", open: 382.90, high: 388.00, low: 381.20, close: 386.70, volume: 26400000 },
    { date: "2024-07-19", open: 386.70, high: 392.30, low: 385.90, close: 390.10, volume: 25400000 },
    { date: "2024-07-20", open: 390.10, high: 401.80, low: 389.50, close: 400.00, volume: 30200000 },
    { date: "2024-07-21", open: 400.00, high: 410.20, low: 398.10, close: 408.30, volume: 31500000 },
    { date: "2024-07-22", open: 408.30, high: 415.70, low: 405.90, close: 412.50, volume: 29800000 },
    { date: "2024-07-23", open: 412.50, high: 418.90, low: 410.30, close: 417.80, volume: 27800000 },
    { date: "2024-07-24", open: 417.80, high: 422.60, low: 415.40, close: 420.10, volume: 26700000 },
    { date: "2024-07-25", open: 420.10, high: 428.30, low: 419.70, close: 427.90, volume: 28900000 },
    { date: "2024-07-26", open: 427.90, high: 435.00, low: 426.50, close: 433.20, volume: 30100000 },
    { date: "2024-07-27", open: 433.20, high: 440.10, low: 431.80, close: 438.70, volume: 31200000 },
    { date: "2024-07-28", open: 438.70, high: 445.60, low: 437.20, close: 442.30, volume: 29900000 },
    { date: "2024-07-29", open: 442.30, high: 452.80, low: 441.90, close: 450.90, volume: 33400000 },
    { date: "2024-07-30", open: 450.90, high: 455.00, low: 448.60, close: 453.40, volume: 28600000 },
];

const chartConfig = {
  value: {
    label: 'Portfolio Value',
    color: 'hsl(var(--chart-1))',
  },
  volume: {
    label: 'Volume',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const CandlestickShape = ({ x, y, width, height, low, high, close, open }: any) => {
  const isGrowing = close > open;
  const color = isGrowing ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))';
  const lineY = isGrowing ? close : open;
  const lineBottomY = isGrowing ? open : close;

  return (
    <>
      <path
        d={`M${x + width / 2},${y + height * (high - lineY) / (high-low)} L${x + width / 2},${y}`}
        stroke={color}
        strokeWidth="1"
      />
      <path
        d={`M${x + width / 2},${y + height * (low - lineY) / (high-low)} L${x + width / 2},${y + height}`}
        stroke={color}
        strokeWidth="1"
      />
      <rect x={x} y={y + height * (lineBottomY-lineY)/(high-low)} width={width} height={height * Math.abs(open - close) / (high-low)} fill={color} />
    </>
  );
};


export function PortfolioChart() {
  const [activeChart, setActiveChart] = React.useState<'line' | 'area' | 'bar' | 'candle'>('area');
  const totalValue = chartData[chartData.length - 1]?.close ?? 0;
  const previousValue = chartData[chartData.length - 2]?.close ?? 0;
  const percentageChange = ((totalValue - previousValue) / previousValue) * 100;

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-0 sm:items-center">
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
          onValueChange={(value) => setActiveChart(value as 'line' | 'area' | 'bar' | 'candle')}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="candle">Candle</TabsTrigger>
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
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
                domain={['dataMin - 20', 'dataMax + 20']}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area dataKey="close" type="natural" fill="url(#fillValue)" stroke="var(--color-value)" />
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
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
                domain={['dataMin - 20', 'dataMax + 20']}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="close" type="natural" stroke="var(--color-value)" strokeWidth={2} dot={false} />
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
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
                domain={['dataMin - 20', 'dataMax + 20']}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="close" fill="var(--color-value)" radius={4} />
            </BarChart>
          )}
          {activeChart === 'candle' && (
            <ComposedChart data={chartData}>
                <CartesianGrid vertical={false} />
                 <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `$${value}`}
                    domain={['dataMin - 20', 'dataMax + 20']}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(value, name, props) => {
                    if (name === 'candle' && typeof props.payload === 'object' && props.payload !== null) {
                      const { open, high, low, close } = props.payload as any;
                      return (
                        <div className="flex flex-col">
                          <span>Open: ${open}</span>
                          <span>High: ${high}</span>
                          <span>Low: ${low}</span>
                          <span>Close: ${close}</span>
                        </div>
                      )
                    }
                    return value;
                }} />} />
                <Bar dataKey="close" name="candle" shape={<CandlestickShape />} />
            </ComposedChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

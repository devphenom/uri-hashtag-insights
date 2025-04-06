// Types for trend data
export type SentimentData = {
  date: string;
  sentiment: number;
};

export type TrendData = {
  hashtag: string;
  range: string;
  trend: SentimentData[];
};

export interface HashtagTrendCardProps {
  data: TrendData | null | undefined;
  isLoading: boolean;
  error: string | null;
  trendDirection?: boolean;
  onRetry: () => void;
}

export interface SentimentChartProps {
  data: SentimentData[];
}

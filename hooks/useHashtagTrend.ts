import { useCallback, useMemo } from "react";

import { TrendData } from "@/lib/types";
import useSWR from "swr";

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
};

// Custom hook for fetching and managing hashtag trend data
export default function useHashtagTrend(hashtag: string) {
  // Create the API URL
  const apiUrl = hashtag ? `/api/trends/${hashtag}` : null;

  // Use SWR to fetch data
  const { data, error, isLoading, mutate } = useSWR<TrendData>(apiUrl, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30000, // Dedupe requests within 30 seconds
  });

  // Calculate if the trend is positive (true) or negative (false)
  const trendDirection = useMemo(() => {
    if (!data?.trend || data.trend.length < 2) return undefined;

    const firstSentiment = data.trend[data.trend.length - 2].sentiment;
    const lastSentiment = data.trend[data.trend.length - 1].sentiment;

    return lastSentiment > firstSentiment;
  }, [data]);

  // Function to retry fetching data
  const refetch = useCallback(() => {
    return mutate();
  }, [mutate]);

  return {
    data,
    isLoading,
    error: error ? (error instanceof Error ? error.message : "An unknown error occurred") : null,
    refetch,
    trendDirection,
  };
}

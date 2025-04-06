import type { NextApiRequest, NextApiResponse } from "next";

import { TrendData } from "@/types";

// Sample data for different hashtags
const trendsData: Record<string, TrendData> = {
  uri: {
    hashtag: "#uri",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: -0.2 },
      { date: "2025-04-02", sentiment: 0.0 },
      { date: "2025-04-03", sentiment: 0.1 },
      { date: "2025-04-04", sentiment: 0.3 },
      { date: "2025-04-05", sentiment: 0.2 },
      { date: "2025-04-06", sentiment: 0.4 },
      { date: "2025-04-07", sentiment: 0.5 },
    ],
  },
  nextjs: {
    hashtag: "#nextjs",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: 0.1 },
      { date: "2025-04-02", sentiment: 0.3 },
      { date: "2025-04-03", sentiment: 0.2 },
      { date: "2025-04-04", sentiment: 0.4 },
      { date: "2025-04-05", sentiment: 0.6 },
      { date: "2025-04-06", sentiment: 0.5 },
      { date: "2025-04-07", sentiment: 0.7 },
    ],
  },
  react: {
    hashtag: "#react",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: 0.3 },
      { date: "2025-04-02", sentiment: 0.2 },
      { date: "2025-04-03", sentiment: 0.1 },
      { date: "2025-04-04", sentiment: -0.1 },
      { date: "2025-04-05", sentiment: 0.0 },
      { date: "2025-04-06", sentiment: 0.2 },
      { date: "2025-04-07", sentiment: 0.4 },
    ],
  },
  uricreative: {
    hashtag: "#uricreative",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: 0.4 },
      { date: "2025-04-02", sentiment: 0.3 },
      { date: "2025-04-03", sentiment: 0.5 },
      { date: "2025-04-04", sentiment: 0.6 },
      { date: "2025-04-05", sentiment: 0.4 },
      { date: "2025-04-06", sentiment: 0.7 },
      { date: "2025-04-07", sentiment: 0.8 },
    ],
  },
  "material-ui": {
    hashtag: "#material-ui",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: 0.1 },
      { date: "2025-04-02", sentiment: 0.2 },
      { date: "2025-04-03", sentiment: 0.1 },
      { date: "2025-04-04", sentiment: 0.0 },
      { date: "2025-04-05", sentiment: -0.1 },
      { date: "2025-04-06", sentiment: 0.2 },
      { date: "2025-04-07", sentiment: 0.3 },
    ],
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<TrendData | { error: string }>) {
  // Add artificial delay to simulate network latency (500-1500ms)
  const delay = Math.floor(Math.random() * 1000) + 500;

  setTimeout(() => {
    try {
      // Extract hashtag from request
      const { hashtag } = req.query;
      const hashtagString = Array.isArray(hashtag) ? hashtag[0] : hashtag;

      if (!hashtagString) {
        return res.status(400).json({ error: "Hashtag parameter is required" });
      }

      // Get data for requested hashtag (case insensitive)
      const normalizedHashtag = hashtagString.toLowerCase();
      const data = trendsData[normalizedHashtag];

      if (!data) {
        // If no specific data, generate random sentiment data
        const randomTrend = Array.from({ length: 7 }, (_, i) => {
          return {
            date: `2025-04-0${i + 1}`,
            sentiment: (Math.random() * 1.6 - 0.8).toFixed(1) as unknown as number,
          };
        });

        return res.status(200).json({
          hashtag: `#${hashtagString}`,
          range: "Apr 1 - Apr 7, 2025",
          trend: randomTrend,
        });
      }

      res.status(200).json(data);
    } catch (err) {
      console.error("Error processing hashtag trend request:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }, delay);
}

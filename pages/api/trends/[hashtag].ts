import type { NextApiRequest, NextApiResponse } from "next";

import { TrendData } from "@/lib/types";
import trendsData from "@/mocks/trendsData";

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
            sentiment: Number((Math.random() * 1.6 - 0.8).toFixed(1)),
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

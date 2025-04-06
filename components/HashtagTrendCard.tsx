import { Box, Button, Card, CardContent, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useMemo } from "react";

import { HashtagTrendCardProps } from "@/lib/types";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SentimentChart from "./SentimentChart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const HashtagTrendCard: React.FC<HashtagTrendCardProps> = React.memo(({ data, error, trendDirection, onRetry }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const trendEmoji = useMemo(() => {
    if (trendDirection === undefined) return "";
    return trendDirection ? "📈" : "📉";
  }, [trendDirection]);

  // Error state
  if (error) {
    return (
      <Card elevation={3} sx={{ width: "100%", borderRadius: 2, overflow: "hidden" }}>
        <CardContent
          sx={{
            p: { xs: 1, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading Data
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
            {error || "Unable to load hashtag data"}
          </Typography>
          <Button variant="contained" color="primary" onClick={onRetry} startIcon={<TrendingUpIcon />}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (data) {
    return (
      <Card
        elevation={3}
        sx={{
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: isMobile ? "column" : "row",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                color="primary"
                sx={{
                  fontWeight: 700,
                  mb: 0.5,
                  fontSize: { xs: "1.75rem", md: "2.125rem" },
                }}
              >
                {data.hashtag} {trendEmoji}
              </Typography>
              <Typography color="text.secondary" variant="subtitle1">
                {data.range}
              </Typography>
            </Box>

            <Chip
              icon={trendDirection ? <TrendingUpIcon /> : <TrendingDownIcon />}
              label={trendDirection ? "Positive Trend" : "Negative Trend"}
              color={trendDirection ? "success" : "error"}
              variant="outlined"
              sx={{
                mt: isMobile ? 2 : 0,
                fontWeight: 500,
                borderWidth: 2,
              }}
            />
          </Box>

          <SentimentChart data={data.trend} />
        </CardContent>
      </Card>
    );
  }

  // return the loading state if !error and !data
  return <LoadingSkeleton />;
});

HashtagTrendCard.displayName = "HashtagTrendCard";

export default HashtagTrendCard;

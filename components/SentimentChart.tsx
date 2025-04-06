import { Box, useTheme } from "@mui/material";
import { ChartsTooltip, LineChart } from "@mui/x-charts";
import React, { useMemo } from "react";

import { SentimentChartProps } from "@/lib/types";

const SentimentChart: React.FC<SentimentChartProps> = React.memo(({ data }) => {
  const theme = useTheme();

  // Memoize the processed data to prevent unnecessary recalculations
  const { xValues, yValues } = useMemo(() => {
    const dates = data.map((item) => new Date(item.date));
    const sentiments = data.map((item) => item.sentiment);

    return {
      xValues: dates,
      yValues: sentiments,
    };
  }, [data]);

  // Chart colors based on sentiment trend
  const chartColors = useMemo(() => {
    const lastSentiment = yValues[yValues.length - 1];
    return {
      line: lastSentiment >= 0 ? theme.palette.success.main : theme.palette.error.main,
      gradient:
        lastSentiment >= 0
          ? `linear-gradient(180deg, ${theme.palette.success.light}40 0%, ${theme.palette.success.light}00 100%)`
          : `linear-gradient(180deg, ${theme.palette.error.light}40 0%, ${theme.palette.error.light}00 100%)`,
    };
  }, [yValues, theme.palette]);

  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        mt: 2,
        ".MuiChartsTooltip-table": {
          fontSize: "0.875rem",
        },
      }}
    >
      <LineChart
        xAxis={[
          {
            data: xValues,
            scaleType: "time",
            tickNumber: 7,
            min: xValues[0].getTime(),
            max: xValues[xValues.length - 1].getTime(),
            tickLabelStyle: {
              angle: 0,
              textAnchor: "middle",
            },
            valueFormatter: (date) => {
              return new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            },
          },
        ]}
        series={[
          {
            data: yValues,
            area: true,
            showMark: true,
            valueFormatter: (value) => `Sentiment: ${value ? value.toFixed(2) : "0.00"}`,
            color: chartColors.line,
          },
        ]}
        tooltip={{
          trigger: "item",
        }}
        slotProps={{
          legend: { hidden: true },
        }}
        sx={{
          ".MuiAreaElement-root": {
            fill: "url(#sentimentGradient)",
          },
        }}
        axisHighlight={{
          x: "line",
        }}
      >
        <defs>
          <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColors.line} stopOpacity={0.4} />
            <stop offset="100%" stopColor={chartColors.line} stopOpacity={0} />
          </linearGradient>
          <ChartsTooltip />
        </defs>
      </LineChart>
    </Box>
  );
});

SentimentChart.displayName = "SentimentChart";

export default SentimentChart;

import { Box, Breadcrumbs, Container, FormControl, IconButton, InputLabel, MenuItem, Link as MuiLink, Select, SelectChangeEvent, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { trendingHashtags, urbanist } from "@/lib/util";
import { useCallback, useMemo, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeToggle from "../../components/DarkModeToggle";
import Link from "next/link";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import MetaTags from "@/components/MetaTags";
import dynamic from "next/dynamic";
import useHashtagTrend from "../../hooks/useHashtagTrend";
import { useRouter } from "next/router";

// Lazy load the card component to improve initial page load
const HashtagTrendCard = dynamic(() => import("../../components/HashtagTrendCard"), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

export default function HashtagInsights() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { hashtag } = router.query;
  const hashtagString = Array.isArray(hashtag) ? hashtag[0] : hashtag || "";

  // State for dropdown hashtag selector
  const [selectedHashtag, setSelectedHashtag] = useState<string>(hashtagString);

  // Fetch data using our custom hook
  const { data, isLoading, error, refetch, trendDirection } = useHashtagTrend(hashtagString);

  // Handle changing the hashtag from dropdown
  const handleHashtagChange = useCallback(
    (event: SelectChangeEvent) => {
      const newHashtag = event.target.value;
      setSelectedHashtag(newHashtag);
      router.push(`/insights/${newHashtag}`, undefined, { shallow: true });
    },
    [router]
  );

  // Memoize the page title to prevent unnecessary re-renders
  const pageTitle = useMemo(() => {
    return `${hashtagString ? `#${hashtagString}` : "Hashtag"} Insights`;
  }, [hashtagString]);

  return (
    <>
      <MetaTags title={`${pageTitle} | URI Hashtag Insights`} description={`Sentiment analysis for ${hashtagString || "hashtags"}`} />

      <div className={`${urbanist.variable}`}>
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 3, sm: 4, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
            overflowX: "hidden", // Prevent horizontal scroll on mobile
          }}
        >
          {/* Header with back button */}
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Stack direction={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"} spacing={isMobile ? 1 : 1.5} sx={{ mb: isMobile ? 2 : 2.5 }}>
              <Link href="/">
                <IconButton
                  color="primary"
                  aria-label="back to home"
                  sx={{
                    ml: isMobile ? -1 : 0,
                    mb: isMobile ? 0.5 : 0,
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Link>

              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                  ".MuiBreadcrumbs-ol": {
                    flexWrap: isMobile ? "wrap" : "nowrap",
                  },
                  ".MuiBreadcrumbs-li": {
                    whiteSpace: "nowrap",
                  },
                }}
              >
                <Link href="/" legacyBehavior>
                  <MuiLink underline="hover" color="inherit">
                    Home
                  </MuiLink>
                </Link>
                <Typography color="text.primary">Insights</Typography>
                <Typography
                  color="primary"
                  fontWeight="medium"
                  sx={{
                    wordBreak: "break-word",
                    maxWidth: { xs: "160px", sm: "100%" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  #{hashtagString}
                </Typography>
              </Breadcrumbs>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={{ xs: 2, sm: 2, md: 3 }}
              sx={{ mb: { xs: 2, sm: 3 } }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                  lineHeight: 1.2,
                }}
              >
                Hashtag Sentiment Insights
              </Typography>

              <Stack width={{ xs: "100%", md: "unset" }} justifyContent={{ xs: "space-between", lg: "unset" }} direction={{ xs: "row", md: "row" }} spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
                {/* Dark mode toggle */}
                <DarkModeToggle />

                {/* Hashtag selector dropdown */}
                <FormControl
                  sx={{
                    minWidth: { xs: "130px", sm: "160px" },
                    flex: { xs: 1, md: "unset" },
                    maxWidth: { xs: "100%", sm: "200px" },
                  }}
                >
                  <InputLabel id="hashtag-select-label">Hashtag</InputLabel>
                  <Select
                    labelId="hashtag-select-label"
                    id="hashtag-select"
                    value={selectedHashtag}
                    label="Hashtag"
                    onChange={handleHashtagChange}
                    sx={{
                      ".MuiSelect-select": {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                  >
                    {trendingHashtags.map((tag) => (
                      <MenuItem
                        sx={{
                          fontFamily: '"Urbanist", "Urbanist Fallback", sans-serif',
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                        }}
                        key={tag}
                        value={tag}
                      >
                        #{tag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Box>

          {/* Main content - Trend Card */}
          <HashtagTrendCard data={data || null} isLoading={isLoading} error={error} trendDirection={trendDirection} onRetry={refetch} />
        </Container>
      </div>
    </>
  );
}

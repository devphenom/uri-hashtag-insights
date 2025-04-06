import { Box, Chip, Container, IconButton, InputAdornment, Link, OutlinedInput, Snackbar, Stack, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { trendingHashtags, urbanist } from "@/lib/util";

import DarkModeToggle from "../components/DarkModeToggle";
import MetaTags from "@/components/MetaTags";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [hashtag, setHashtag] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSearch = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (hashtag.trim()) {
      // Remove # if user included it
      const cleanHashtag = hashtag.trim().replace(/^#/, "");
      router.push(`/insights/${cleanHashtag}`);
    }
  };

  const handleTrendingHashtagClick = (tag: string) => {
    router.push(`/insights/${tag}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <MetaTags title="URI Hashtag Insights" description="Analyze sentiment trends for hashtags" />

      <div className={`${urbanist.variable}`}>
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Stack justifyContent="center" direction="column" sx={{ height: "100svh", py: { xs: 4, md: 0 } }}>
            <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6 }, px: { xs: 1, sm: 2 } }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <DarkModeToggle />
              </Box>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, rgb(205, 27, 120) 30%, rgb(236, 64, 122) 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
                }}
              >
                Hashtag Sentiment Insights
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  mb: 4,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Analyze social media sentiment trends for any hashtag
              </Typography>

              <OutlinedInput
                fullWidth
                placeholder="Please enter hashtag (e.g. uri)"
                value={hashtag}
                onChange={(e) => {
                  // Check for spaces in the input
                  if (e.target.value.includes(" ")) {
                    // Show snackbar notification instead of alert
                    setSnackbarMessage("Spaces are not allowed in hashtags");
                    setSnackbarOpen(true);
                    // Remove spaces from the input
                    setHashtag(e.target.value.replace(/\s/g, ""));
                  } else {
                    setHashtag(e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && hashtag.trim()) {
                    handleSearch();
                  }
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Box sx={{ color: "text.secondary" }}>#</Box>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton color="primary" onClick={handleSearch} disabled={!hashtag.trim()}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  mb: 2,
                  maxWidth: { xs: "100%", sm: 500 },
                  mx: "auto",
                  "&.MuiOutlinedInput-root": {
                    borderRadius: "2rem",
                  },
                }}
              />

              <Typography variant="body1" gutterBottom>
                Trending Hashtags:
              </Typography>
              <Stack direction="row" gap={0.5} justifyContent="center" flexWrap="wrap" sx={{ px: { xs: 1, sm: 2 } }}>
                {trendingHashtags.map((tag) => (
                  <Chip key={tag} label={`#${tag}`} onClick={() => handleTrendingHashtagClick(tag)} sx={{ m: 0.5 }} color="primary" variant="outlined" clickable />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" align="center">
                Built with Material UI and Next.js by{" "}
                <Link underline="hover" href="https://github.com/devphenom" target="_blank" rel="noopener">
                  Phenom❤️
                </Link>
              </Typography>
            </Box>
          </Stack>

          {/* Add Snackbar for notifications */}
          <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose} message={snackbarMessage} anchorOrigin={{ vertical: "top", horizontal: "center" }} />
        </Container>
      </div>
    </>
  );
}

import { Box, Button, Container, Link, Typography } from "@mui/material";

import Head from "next/head";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>URI Hashtag Insights</title>
        <meta name="description" content="Hashtag Insights application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${urbanist.variable}`}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Hello World
            </Typography>
            <Button variant="contained" color="primary">
              Search Hashtag
            </Button>
          </Box>

          <Box sx={{ mt: 8 }}>
            <Typography variant="body1" color="text.secondary" align="center">
              Built with Material UI and Next.js by{" "}
              <Link underline="hover" href="https://github.com/devphenom" target="_blank" rel="noopener">
                Phenom❤️
              </Link>
            </Typography>
          </Box>
        </Container>
      </div>
    </>
  );
}

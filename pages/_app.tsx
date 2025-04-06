import "@/styles/globals.css";

import { ColorModeProvider, createAppTheme, useColorMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import type { AppProps } from "next/app";
import { useMemo } from "react";

export default function App(props: AppProps) {
  return (
    <ColorModeProvider>
      <ThemedApp {...props} />
    </ColorModeProvider>
  );
}

// Separate component to use the color mode context
function ThemedApp({ Component, pageProps }: AppProps) {
  const { mode } = useColorMode();

  // Create theme based on current mode
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

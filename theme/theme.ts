import { PaletteMode, Theme, createTheme } from "@mui/material";

// Create theme based on the selected mode
export const createAppTheme = (mode: PaletteMode): Theme => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Light mode palette values
            primary: {
              main: "#2196F3",
            },
            background: {
              default: "#f8f9fa",
              paper: "#ffffff",
            },
          }
        : {
            // Dark mode palette values
            primary: {
              main: "#90CAF9",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
    typography: {
      fontFamily: "var(--font-urbanist), sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });
};

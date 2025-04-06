import { ReactNode, createContext, useContext, useMemo, useState } from "react";

// Typescript definitions
type ColorMode = "light" | "dark";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: ColorMode;
}

interface ColorModeProviderProps {
  children: ReactNode;
}

// Create a context for theme mode
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

// use color mode custom hook
export function useColorMode() {
  return useContext(ColorModeContext);
}

// Color mode context provider
export function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [mode, setMode] = useState<ColorMode>(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      const storageMode = localStorage.getItem("colorMode");
      // Validate the value is a valid ColorMode
      return storageMode === "dark" || storageMode === "light" ? storageMode : "light";
    }
    return "light";
  });

  // Create color mode context value
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const mode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("colorMode", mode);
          return mode;
        });
      },
      mode,
    }),
    [mode]
  );

  return <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>;
}

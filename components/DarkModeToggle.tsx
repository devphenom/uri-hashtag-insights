import { IconButton, Tooltip, useTheme } from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";
import { useColorMode } from "../theme";

const DarkModeToggle: React.FC = React.memo(() => {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <Tooltip sx={{ fontFamily: '"Urbanist", "Urbanist Fallback", sans-serif' }} title={theme.palette.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton
        onClick={colorMode.toggleColorMode}
        color="inherit"
        aria-label="toggle dark mode"
        sx={{
          p: 1,
          borderRadius: "50%",
          color: theme.palette.mode === "dark" ? "primary.light" : "primary.main",
          bgcolor: theme.palette.mode === "dark" ? "rgba(144, 202, 249, 0.1)" : "rgba(33, 150, 243, 0.1)",
          "&:hover": {
            bgcolor: theme.palette.mode === "dark" ? "rgba(144, 202, 249, 0.2)" : "rgba(33, 150, 243, 0.2)",
          },
        }}
      >
        {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
});

DarkModeToggle.displayName = "DarkModeToggle";

export default DarkModeToggle;

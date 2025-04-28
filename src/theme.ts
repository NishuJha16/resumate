import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const basePalette = {
  primary: {
    main: "rgb(245,124,6)",
  },
};

const lightPalette = {
  ...basePalette,
  mode: "light" as PaletteMode,
  background: {
    default: "#fafafa",
    paper: "#ffffff",
  },
  text: {
    primary: "#1a1a1a",
    secondary: "#4a4a4a",
  },
};

const darkPalette = {
  ...basePalette,
  mode: "dark" as PaletteMode,
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#ffffff",
    secondary: "#bbbbbb",
  },
};

export const lightTheme = createTheme({
  palette: lightPalette,
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
});

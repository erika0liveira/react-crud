import { createTheme } from "@mui/material";
import { cyan, teal } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      light: cyan[500],
      main: cyan[700],
      dark: cyan[800],
      contrastText: "#ffffff",
    },
    secondary: {
      light: teal[200],
      main: teal[300],
      dark: teal[400],
      contrastText: "#ffffff",
    },
    background: {
      default: "f7f6f3",
      paper: "ffffff",
    },
  },
});
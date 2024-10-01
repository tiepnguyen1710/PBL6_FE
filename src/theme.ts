import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          whiteSpace: "nowrap",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#54565A",
          fontWeight: 400,
        },
        h5: {
          fontSize: "1.5rem",
          fontWeight: 600,
          lineHeight: 1.2,
        },
        body2: {
          color: "rgba(84, 86, 90, 0.6)",
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#4A82C3",
      main: "#203A90",
      dark: "#102774",
    },
    secondary: {
      light: "rgba(84, 86, 90, 0.6)",
      main: "#54565A",
      dark: "#202124",
    },
    text: {
      primary: "#54565A",
      secondary: "rgba(84, 86, 90, 0.6)",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  spacing: 16,
});

export default theme;

import { createTheme } from "@mui/material/styles";

export const adereSUSTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0056b3", dark: "#003f84", light: "#3d7fc4" },
    secondary: { main: "#198754", dark: "#11643d", light: "#4aa477" },
    success: { main: "#198754" },
    error: { main: "#dc3545" },
    warning: { main: "#f59e0b" },
    background: { default: "#f6f8fb", paper: "#ffffff" },
    text: { primary: "#152538", secondary: "#5d6b7a" },
    divider: "#dce4ec",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, Arial, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 44 } },
    },
    MuiTextField: {
      defaultProps: { fullWidth: true, size: "medium" },
    },
    MuiCard: {
      styleOverrides: {
        root: { border: "1px solid #dce4ec", boxShadow: "0 22px 60px rgba(22, 46, 77, 0.12)" },
      },
    },
  },
});

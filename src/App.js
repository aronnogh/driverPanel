// App.jsx
import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "./assets/global/Theme-variable";
import ThemeRoutes from "./routes/Router";
import { AuthProvider } from "./components/Auth/AuthContext";

const App = () => {
  const routing = useRoutes(ThemeRoutes);
  const theme = baseTheme;

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{routing}</AuthProvider>
    </ThemeProvider>
  );
};

export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lander from './views/Lander'
import TopBar from './components/TopBar';
import { Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core';
import AdventureEntry from "./components/AdventureEntry";

const theme = createTheme({
  palette: {
    primary: {
      main: '#381e99'
    },
    secondary: {
      main: '#f4a2fd'
    }
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container>
          <TopBar theme={theme} />
          <AdventureEntry />
          <Routes>
            <Route
              path="/"
              element={<Lander />}
            />


          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>

  );
}

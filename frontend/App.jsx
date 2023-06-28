import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lander from './views/Lander'
import TopBar from './components/TopBar';
import { Container } from "@material-ui/core";
import Palette from "./views/Palette"
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#381e99'
    },
    secondary: {
      main: '#381e99'
    }
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container>
          <TopBar theme={theme}/>

          <Routes>
            <Route
              path="/"
              element={<Lander />}
            />
            {/* The below is to come back and keep track of the palette. Ask about this later */}
            <Route
              path="/palette"
              element={<Palette />}
            />

          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>

  );
}

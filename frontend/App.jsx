import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lander from './views/Lander'
import TopBar from './components/TopBar';
import { Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core';
import AdventureEntry from "./components/AdventureEntry";
import AdventureStory from "./components/AdventureStory";

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
          <Routes>
            <Route
              path="/"
              element={<AdventureEntry />}
            />
            <Route
              path="/story"
              element={<AdventureStory />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>

  );
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './context/Context';
import Lander from './views/Lander'
import TopBar from './components/TopBar';
import { Container } from "@material-ui/core";
import Palette from "./views/Palette"

export default function App() {
  return (

    <UserContextProvider>

      <BrowserRouter>
        <Container>
          <TopBar />

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


    </UserContextProvider>

  );
}

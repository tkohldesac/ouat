import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './context/userContext';
import Lander from './views/Lander'
import TopBar from './components/TopBar';
import { Container } from "@material-ui/core";

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


          </Routes>
        </Container>
      </BrowserRouter>


    </UserContextProvider>

  );
}

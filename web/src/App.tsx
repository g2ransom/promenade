import React, { Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Presale = lazy(() => import ("./pages/Presale"));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Box display="flex" justifyContent="center">Loading...</Box>}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/presale"
            element={<Presale />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

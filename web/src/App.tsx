import React, { Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GaRouteTracker from "./components/GaRouteTracker";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import ("./pages/About"));

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
            path="/about"
            element={<About />}
          />
        </Routes>
      </Suspense>
      <GaRouteTracker />
    </Router>
  );
}

export default App;

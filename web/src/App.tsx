import React, { Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GaRouteTracker from "./components/GaRouteTracker";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Presale = lazy(() => import("./pages/Presale"));
const WalletSandbox = lazy(() => import("./pages/WalletSandbox"));

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
          <Route
            path="/sandbox"
            element={<WalletSandbox />}
          />
        </Routes>
      </Suspense>
      <GaRouteTracker />
    </Router>
  );
}

export default App;

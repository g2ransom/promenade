import React, { Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GaRouteTracker from "./components/GaRouteTracker";
import { useWallet, PhantomProvider } from "./hooks/useWallet";
import { WalletContext } from "./context/WalletContext"; 
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Presale = lazy(() => import("./pages/Presale"));
const WalletSandbox = lazy(() => import("./pages/WalletSandbox"));

function App() {
  const wallet = useWallet();
  return (
    <Router>
      <WalletContext.Provider value={wallet}>
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
      </WalletContext.Provider>
    </Router>
  );
}

export default App;

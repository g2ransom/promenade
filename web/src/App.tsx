import React, { useState, useCallback, useEffect, Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { 
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import Header from "./components/Header";
import GaRouteTracker from "./components/GaRouteTracker";
import { PhantomProvider } from "./hooks/useWallet";
import { WalletContext } from "./context/WalletContext"; 
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Presale = lazy(() => import("./pages/Presale"));
const WalletSandbox = lazy(() => import("./pages/WalletSandbox"));

const NETWORK = clusterApiUrl("devnet");

const getProvider = (): PhantomProvider => {
  if ("solana" in window) {
    const anyWindow: any = window;
    const provider = anyWindow.solana;
    console.log("phantom provider isPhantom: ", provider.isPhantom);
    if (provider.isPhantom) {
      return provider;
    }
  } else {
    window.open("https://phantom.app/", "_blank");
    return {} as PhantomProvider; 
  }
  return {} as PhantomProvider;
}

function App() {
  const [provider, setWallet] = useState(getProvider());
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = useCallback(
    (log: string) => setLogs((logs) => [...logs, "> " + log]),
    []
  );

  const connection = new Connection(NETWORK);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    function fetchWallet() {
      if (!provider) {
        return;
      }
      provider.connect({ onlyIfTrusted: true }).catch((err) => {

      });
      provider.on("connect", (publicKey: PublicKey) => {
        setConnected(true);
        console.log("publicKey: ", publicKey);
        addLog("[connect] " + publicKey?.toBase58());
      });
      provider.on("disconnect", () => {
        setConnected(false);
        addLog("[disconnect] bye!");
      });
      provider.on("accountChanged", (publicKey: PublicKey | null) => {
        if (publicKey) {
          provider.publicKey = publicKey;
          setWallet(provider);
          addLog("[accountChanged] Switched account to " + publicKey?.toBase58());
        }
        else {
          addLog("[accountChanged] Switched to unknown account"  );
          provider
            .connect()
            .then(() => addLog("[accountChanged] Reconnected successfully"))
            .catch((err) => {
              addLog("[accountChanged] Failed to reconnect: " + err.message);
            });
        }
      });
      return () => {
        provider.disconnect();
      };
    }
    fetchWallet();
    console.log("provider", provider);
  }, [provider, addLog]);

  return (
    <Router>
      <WalletContext.Provider value={{ provider: provider, onUpdateProvider: setWallet }}>
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

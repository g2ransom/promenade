import React, { useState, useEffect, useCallback } from "react";
import { 
  Connection,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
}

// to do, addLogs function
interface PhantomProviderState extends PhantomProvider {
  logs: string[];
}

const NETWORK = clusterApiUrl("devnet");

const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    const anyWindow: any = window;
    const provider = anyWindow.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  window.open("https://phantom.app/", "_blank");
}

export const useWallet = (): PhantomProvider | undefined =>  {
  const provider = getProvider();
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = useCallback(
    (log: string) => setLogs((logs) => [...logs, "> " + log]),
    []
  );

  const connection = new Connection(NETWORK);
  const [connected, setConnected] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  useEffect(() => {
    function fetchWallet() {
      if (!provider) {
        return;
      }
      provider.connect({ onlyIfTrusted: true }).catch((err) => {

      });
      provider.on("connect", (publicKey: PublicKey) => {
        setPublicKey(publicKey);
        setConnected(true);
        addLog("[connect] " + publicKey?.toBase58());
      });
      provider.on("disconnect", () => {
        setPublicKey(null);
        setConnected(false);
        addLog("[disconnect] bye!");
      });
      provider.on("accountChanged", (publicKey: PublicKey | null) => {
        setPublicKey(publicKey);
        if (publicKey) {
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
  }, [provider, addLog]);

  return provider;
}
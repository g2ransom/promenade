import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Connection,
  Keypair,
  PublicKey,
  Transaction,
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

export interface PhantomProvider {
  publicKey: PublicKey;
  payer: Keypair;
  isConnected: boolean | null;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions(txs: Transaction[]): Promise<Transaction[]>
}

export interface AnchorWallet {
  publicKey: PublicKey;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
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
    console.log("phantom provider isPhantom: ", provider.isPhantom);
    if (provider.isPhantom) {
      return provider;
    }
  }
  window.open("https://phantom.app/", "_blank");
}

export const useWallet = (): PhantomProvider | undefined =>  {
  const { publicKey, payer, isConnected, connect, disconnect, on, signTransaction, signAllTransactions } = getProvider();
  console.log(provider);
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

  return useMemo(
        () =>
            publicKey && payer && isConnected && connect && disconnect && on && signTransaction && signAllTransactions
                ? { publicKey, payer, isConnected, connect, disconnect, on, signTransaction, signAllTransactions }
                : undefined,
        [publicKey, payer, isConnected, connect, disconnect, on, signTransaction, signAllTransactions]
    );
}

export function useAnchorWallet(): AnchorWallet | undefined {
    const { publicKey, signTransaction, signAllTransactions } = useContext(WalletContext);
    return useMemo(
        () =>
            publicKey && signTransaction && signAllTransactions
                ? { publicKey, signTransaction, signAllTransactions }
                : undefined,
        [publicKey, signTransaction, signAllTransactions]
    );
}
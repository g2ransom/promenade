import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import { 
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { WalletContext } from "../context/WalletContext";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomProvider {
  publicKey: PublicKey | null;
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


export default function useAnchorWallet(): AnchorWallet | undefined {
    const { provider: {publicKey, signTransaction, signAllTransactions}, onUpdateProvider } = useContext(WalletContext);
    return useMemo(
        () => {            
            return publicKey
                ? { publicKey, signTransaction, signAllTransactions }
                : undefined
          },
        [publicKey, signTransaction, signAllTransactions]
    );
}
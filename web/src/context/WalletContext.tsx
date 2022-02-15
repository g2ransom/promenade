import { createContext } from "react";
import { PhantomProvider } from "../hooks/useWallet";

export const WalletContext = createContext<PhantomProvider>({} as PhantomProvider);